import { NextRequest, NextResponse } from 'next/server'
import ytdl from 'ytdl-core'

export async function POST(request: NextRequest) {
  try {
    const { url } = await request.json()
    
    if (!url) {
      return NextResponse.json({ error: 'URL is required' }, { status: 400 })
    }

    // Validate URL format
    if (!isValidURL(url)) {
      return NextResponse.json({ error: 'Invalid URL format' }, { status: 400 })
    }

    const platform = detectPlatform(url)
    
    let videoInfo
    
    switch (platform) {
      case 'YouTube':
        videoInfo = await getYouTubeInfo(url)
        break
      case 'Vimeo':
        videoInfo = await getVimeoInfo(url)
        break
      case 'Twitter':
        videoInfo = await getTwitterInfo(url)
        break
      case 'Facebook':
        videoInfo = await getFacebookInfo(url)
        break
      default:
        videoInfo = await getGenericInfo(url)
    }

    return NextResponse.json(videoInfo)
  } catch (error) {
    console.error('Download error:', error)
    return NextResponse.json(
      { error: 'Failed to process video URL' },
      { status: 500 }
    )
  }
}

function isValidURL(string: string): boolean {
  try {
    new URL(string)
    return true
  } catch (_) {
    return false
  }
}

function detectPlatform(url: string): string {
  if (url.includes('youtube.com') || url.includes('youtu.be')) return 'YouTube'
  if (url.includes('vimeo.com')) return 'Vimeo'
  if (url.includes('twitter.com') || url.includes('x.com')) return 'Twitter'
  if (url.includes('facebook.com') || url.includes('fb.watch')) return 'Facebook'
  if (url.includes('tiktok.com')) return 'TikTok'
  if (url.includes('instagram.com')) return 'Instagram'
  return 'Unknown'
}

async function getYouTubeInfo(url: string) {
  try {
    const info = await ytdl.getInfo(url)
    const formats = ytdl.filterFormats(info.formats, 'videoandaudio')
    
    return {
      title: info.videoDetails.title,
      thumbnail: info.videoDetails.thumbnails[info.videoDetails.thumbnails.length - 1].url,
      duration: formatDuration(parseInt(info.videoDetails.lengthSeconds)),
      platform: 'YouTube',
      formats: formats.map(format => ({
        quality: format.qualityLabel || 'Unknown',
        format: format.container?.toUpperCase() || 'MP4',
        size: estimateFileSize(format.contentLength),
        url: format.url,
        type: 'video'
      }))
    }
  } catch (error) {
    throw new Error('Failed to fetch YouTube video information')
  }
}

async function getVimeoInfo(url: string) {
  // Implementation for Vimeo API
  // This would require Vimeo API integration
  throw new Error('Vimeo support coming soon')
}

async function getTwitterInfo(url: string) {
  // Implementation for Twitter API
  // This would require Twitter API integration
  throw new Error('Twitter support coming soon')
}

async function getFacebookInfo(url: string) {
  // Implementation for Facebook API
  // This would require Facebook API integration
  throw new Error('Facebook support coming soon')
}

async function getGenericInfo(url: string) {
  // Generic implementation for other platforms
  // This would use web scraping or other APIs
  throw new Error('Platform not supported yet')
}

function formatDuration(seconds: number): string {
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const remainingSeconds = seconds % 60

  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
  }
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
}

function estimateFileSize(contentLength: string | undefined): string {
  if (!contentLength) return 'Unknown'
  
  const bytes = parseInt(contentLength)
  const mb = bytes / (1024 * 1024)
  
  if (mb < 1) {
    return `${(bytes / 1024).toFixed(1)} KB`
  }
  return `${mb.toFixed(1)} MB`
}

// app/sitemap.ts
import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://yoursite.com',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: 'https://yoursite.com/about',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: 'https://yoursite.com/privacy',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    {
      url: 'https://yoursite.com/terms',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
  ]
}
