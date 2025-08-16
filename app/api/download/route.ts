import { NextRequest, NextResponse } from 'next/server';
import ytdl from '@distube/ytdl-core';
import fetch from 'node-fetch';
// New import statement
import { parse } from 'node-html-parser'; 

export async function POST(request: NextRequest) {
    try {
        const { url } = await request.json();
        
        if (!url) {
            return NextResponse.json({ error: 'URL is required' }, { status: 400 });
        }

        if (!isValidURL(url)) {
            return NextResponse.json({ error: 'Invalid URL format' }, { status: 400 });
        }

        const platform = detectPlatform(url);
        
        let videoInfo;
        
        switch (platform) {
            case 'YouTube':
                videoInfo = await getYouTubeInfo(url);
                break;
            case 'Vimeo':
                videoInfo = await getVimeoInfo(url);
                break;
            case 'Twitter':
                videoInfo = await getTwitterInfo(url);
                break;
            case 'Facebook':
                videoInfo = await getFacebookInfo(url);
                break;
            default:
                videoInfo = await getGenericInfo(url);
        }

        return NextResponse.json(videoInfo);
    } catch (error: any) {
        console.error('Download error:', error);
        return NextResponse.json(
            { error: error.message || 'Failed to process video URL' },
            { status: 500 }
        );
    }
}

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const videoUrl = searchParams.get('videoUrl');
        const format = searchParams.get('format');
        const quality = searchParams.get('quality');
        
        if (!videoUrl) {
            return NextResponse.json({ error: 'Video URL is required' }, { status: 400 });
        }

        const platform = detectPlatform(videoUrl);
        
        if (platform === 'YouTube') {
            return await downloadYouTubeVideo(videoUrl, quality || '720p', format || 'mp4');
        }
        
        return NextResponse.json({ error: 'Platform not supported for direct download' }, { status: 400 });
    } catch (error: any) {
        console.error('Direct download error:', error);
        return NextResponse.json(
            { error: 'Failed to download video' },
            { status: 500 }
        );
    }
}

function isValidURL(string: string): boolean {
    try {
        new URL(string);
        return true;
    } catch (_) {
        return false;
    }
}

function detectPlatform(url: string): string {
    if (url.includes('youtube.com') || url.includes('youtu.be')) return 'YouTube';
    if (url.includes('vimeo.com')) return 'Vimeo';
    if (url.includes('twitter.com') || url.includes('x.com')) return 'Twitter';
    if (url.includes('facebook.com') || url.includes('fb.watch')) return 'Facebook';
    if (url.includes('tiktok.com')) return 'TikTok';
    if (url.includes('instagram.com')) return 'Instagram';
    return 'Unknown';
}

async function getYouTubeInfo(url: string) {
    try {
        if (!ytdl.validateURL(url)) {
            throw new Error('Invalid YouTube URL');
        }

        const info = await ytdl.getInfo(url);
        const videoFormats = ytdl.filterFormats(info.formats, 'videoandaudio');
        const audioFormats = ytdl.filterFormats(info.formats, 'audioonly');
        
        const processedVideoFormats = videoFormats
            .filter(format => format.hasVideo && format.hasAudio)
            .sort((a, b) => (parseInt(b.height?.toString() || '0') - parseInt(a.height?.toString() || '0')))
            .map(format => ({
                quality: format.qualityLabel || `${format.height}p` || 'Unknown',
                format: format.container?.toUpperCase() || 'MP4',
                size: estimateFileSize(format.contentLength),
                url: format.url,
                downloadUrl: `/api/download?videoUrl=${encodeURIComponent(url)}&quality=${format.qualityLabel || format.height}&format=${format.container || 'mp4'}`,
                type: 'video' as const,
                itag: format.itag
            }));
        
        const processedAudioFormats = audioFormats
            .filter(format => format.hasAudio && !format.hasVideo)
            .sort((a, b) => (parseInt(b.audioBitrate?.toString() || '0') - parseInt(a.audioBitrate?.toString() || '0')))
            .slice(0, 2)
            .map(format => ({
                quality: `Audio (${format.audioBitrate || 128}kbps)`,
                format: 'MP3',
                size: estimateFileSize(format.contentLength),
                url: format.url,
                downloadUrl: `/api/download?videoUrl=${encodeURIComponent(url)}&quality=audio&format=mp3&itag=${format.itag}`,
                type: 'audio' as const,
                itag: format.itag
            }));
        
        return {
            title: info.videoDetails.title,
            thumbnail: info.videoDetails.thumbnails[info.videoDetails.thumbnails.length - 1].url,
            duration: formatDuration(parseInt(info.videoDetails.lengthSeconds)),
            platform: 'YouTube',
            formats: [...processedVideoFormats, ...processedAudioFormats]
        };
    } catch (error: any) {
        throw new Error(`Failed to fetch YouTube video: ${error.message}`);
    }
}

async function downloadYouTubeVideo(url: string, quality: string, format: string) {
    try {
        const info = await ytdl.getInfo(url);
        
        let selectedFormat;
        if (quality === 'audio') {
            selectedFormat = ytdl.chooseFormat(info.formats, { filter: 'audioonly', quality: 'highestaudio' });
        } else {
            selectedFormat = ytdl.chooseFormat(info.formats, { 
                filter: f => f.container === format && f.qualityLabel === quality,
                quality: 'highestvideo'
            });
        }

        if (!selectedFormat) {
            throw new Error('No suitable format found');
        }

        const videoStream = ytdl.downloadFromInfo(info, { format: selectedFormat });
        
        const chunks: Buffer[] = [];
        
        return new Promise<NextResponse>((resolve, reject) => {
            videoStream.on('data', (chunk: Buffer) => {
                chunks.push(chunk);
            });
            
            videoStream.on('end', () => {
                const buffer = Buffer.concat(chunks);
                const filename = `${info.videoDetails.title.replace(/[^\w\s]/gi, '')}.${format.toLowerCase()}`;
                
                resolve(new NextResponse(buffer, {
                    headers: {
                        'Content-Type': quality === 'audio' ? 'audio/mpeg' : 'video/mp4',
                        'Content-Disposition': `attachment; filename="${filename}"`,
                        'Content-Length': buffer.length.toString(),
                    },
                }));
            });
            
            videoStream.on('error', (error) => {
                reject(error);
            });
        });
    } catch (error: any) {
        throw new Error(`Download failed: ${error.message}`);
    }
}

async function getVimeoInfo(url: string) {
    try {
        const vimeoIdMatch = url.match(/vimeo\.com\/(\d+)/);
        if (!vimeoIdMatch) {
            throw new Error('Invalid Vimeo URL');
        }
        
        const videoId = vimeoIdMatch[1];
        const apiUrl = `https://vimeo.com/api/v2/video/${videoId}.json`;
        
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Failed to fetch Vimeo video data');
        }
        
        const data = await response.json();
        const videoData = data[0];
        
        return {
            title: videoData.title,
            thumbnail: videoData.thumbnail_large,
            duration: formatDuration(videoData.duration),
            platform: 'Vimeo',
            formats: [
                {
                    quality: 'HD',
                    format: 'MP4',
                    size: 'Unknown',
                    url: '#',
                    downloadUrl: '#',
                    type: 'video' as const
                }
            ]
        };
    } catch (error: any) {
        throw new Error(`Failed to fetch Vimeo video: ${error.message}`);
    }
}

async function getTwitterInfo(url: string) {
    try {
        const response = await fetch(url);
        const html = await response.text();
        // Use the new parser
        const root = parse(html);
        
        const title = root.querySelector('meta[property="og:title"]')?.getAttribute('content') || 'Twitter Video';
        const thumbnail = root.querySelector('meta[property="og:image"]')?.getAttribute('content') || '';
        
        return {
            title,
            thumbnail,
            duration: 'Unknown',
            platform: 'Twitter',
            formats: [
                {
                    quality: '720p',
                    format: 'MP4',
                    size: 'Unknown',
                    url: '#',
                    downloadUrl: '#',
                    type: 'video' as const
                }
            ]
        };
    } catch (error: any) {
        throw new Error(`Failed to fetch Twitter video: ${error.message}`);
    }
}

async function getFacebookInfo(url: string) {
    throw new Error('Facebook video downloading requires special API access');
}

async function getGenericInfo(url: string) {
    try {
        const response = await fetch(url);
        const html = await response.text();
        // Use the new parser
        const root = parse(html);
        
        const title = root.querySelector('meta[property="og:title"]')?.getAttribute('content') || 
                      root.querySelector('title')?.innerText || 
                      'Unknown Video';
        const thumbnail = root.querySelector('meta[property="og:image"]')?.getAttribute('content') || '';
        
        return {
            title,
            thumbnail,
            duration: 'Unknown',
            platform: 'Generic',
            formats: [
                {
                    quality: 'Original',
                    format: 'MP4',
                    size: 'Unknown',
                    url: url,
                    downloadUrl: url,
                    type: 'video' as const
                }
            ]
        };
    } catch (error: any) {
        throw new Error(`Failed to process URL: ${error.message}`);
    }
}

function formatDuration(seconds: number): string {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    if (hours > 0) {
        return `${hours}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}

function estimateFileSize(contentLength: string | undefined): string {
    if (!contentLength) return 'Unknown';
    
    const bytes = parseInt(contentLength);
    if (isNaN(bytes)) return 'Unknown';
    
    const mb = bytes / (1024 * 1024);
    const gb = bytes / (1024 * 1024 * 1024);
    
    if (gb >= 1) {
        return `${gb.toFixed(1)} GB`;
    } else if (mb >= 1) {
        return `${mb.toFixed(1)} MB`;
    } else {
        return `${(bytes / 1024).toFixed(1)} KB`;
    }
}