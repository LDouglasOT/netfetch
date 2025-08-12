'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Download, 
  Loader2, 
  CheckCircle, 
  AlertCircle, 
  ExternalLink,
  Play,
  Music,
  Video,
  FileText,
  Copy,
  Link as LinkIcon
} from 'lucide-react'

interface VideoInfo {
  title: string
  thumbnail: string
  duration: string
  platform: string
  formats: VideoFormat[]
}

interface VideoFormat {
  quality: string
  format: string
  size: string
  url: string
  type: 'video' | 'audio'
}

export default function VideoDownloader() {
  const [url, setUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [videoInfo, setVideoInfo] = useState<VideoInfo | null>(null)
  const [error, setError] = useState('')
  const [downloading, setDownloading] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const detectPlatform = (url: string): string => {
    if (url.includes('youtube.com') || url.includes('youtu.be')) return 'YouTube'
    if (url.includes('vimeo.com')) return 'Vimeo'
    if (url.includes('twitter.com') || url.includes('x.com')) return 'Twitter'
    if (url.includes('facebook.com') || url.includes('fb.watch')) return 'Facebook'
    if (url.includes('tiktok.com')) return 'TikTok'
    if (url.includes('instagram.com')) return 'Instagram'
    if (url.includes('dailymotion.com')) return 'Dailymotion'
    if (url.includes('twitch.tv')) return 'Twitch'
    return 'Unknown Platform'
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!url.trim()) return

    setLoading(true)
    setError('')
    setVideoInfo(null)

    try {
      // Simulate API call - In real implementation, this would call your backend
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      const platform = detectPlatform(url)
      
      // Mock video info - replace with actual API response
      const mockVideoInfo: VideoInfo = {
        title: "Sample Video Title - Amazing Content You'll Love",
        thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
        duration: "3:24",
        platform,
        formats: [
          { quality: '1080p', format: 'MP4', size: '25.4 MB', url: '#', type: 'video' },
          { quality: '720p', format: 'MP4', size: '15.8 MB', url: '#', type: 'video' },
          { quality: '480p', format: 'MP4', size: '8.2 MB', url: '#', type: 'video' },
          { quality: 'Audio Only', format: 'MP3', size: '3.1 MB', url: '#', type: 'audio' },
        ]
      }
      
      setVideoInfo(mockVideoInfo)
    } catch (err) {
      setError('Failed to fetch video information. Please check the URL and try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleDownload = async (format: VideoFormat) => {
    setDownloading(format.quality)
    
    try {
      // Simulate download process
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // In real implementation, this would trigger the actual download
      const link = document.createElement('a')
      link.href = format.url
      link.download = `${videoInfo?.title || 'video'}.${format.format.toLowerCase()}`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      
    } catch (err) {
      setError('Download failed. Please try again.')
    } finally {
      setDownloading(null)
    }
  }

  const pasteFromClipboard = async () => {
    try {
      const text = await navigator.clipboard.readText()
      setUrl(text)
      inputRef.current?.focus()
    } catch (err) {
      console.error('Failed to read clipboard')
    }
  }

  const clearInput = () => {
    setUrl('')
    setVideoInfo(null)
    setError('')
    inputRef.current?.focus()
  }

  return (
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="glass rounded-3xl p-8 shadow-2xl"
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <LinkIcon className="w-6 h-6 text-gray-400" />
            </div>
            <input
              ref={inputRef}
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Paste video URL here (YouTube, Vimeo, Twitter, Facebook, etc.)"
              className="w-full pl-12 pr-24 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
              required
            />
            <div className="absolute inset-y-0 right-0 flex items-center space-x-2 pr-3">
              {url && (
                <button
                  type="button"
                  onClick={clearInput}
                  className="p-2 text-gray-400 hover:text-white transition-colors"
                >
                  ✕
                </button>
              )}
              <button
                type="button"
                onClick={pasteFromClipboard}
                className="p-2 text-gray-400 hover:text-white transition-colors"
                title="Paste from clipboard"
              >
                <Copy className="w-4 h-4" />
              </button>
            </div>
          </div>
          
          <motion.button
            type="submit"
            disabled={loading || !url.trim()}
            className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <Loader2 className="w-6 h-6 animate-spin mr-3" />
                Analyzing Video...
              </div>
            ) : (
              <div className="flex items-center justify-center">
                <Download className="w-6 h-6 mr-3" />
                Get Download Links
              </div>
            )}
          </motion.button>
        </form>
        
        <AnimatePresence mode="wait">
          {error && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mt-6 p-4 bg-red-500/20 border border-red-500/50 rounded-xl flex items-center"
            >
              <AlertCircle className="w-6 h-6 text-red-400 mr-3 flex-shrink-0" />
              <p className="text-red-200">{error}</p>
            </motion.div>
          )}
          
          {videoInfo && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mt-8 space-y-6"
            >
              <div className="glass rounded-2xl p-6">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="relative group">
                    <img
                      src={videoInfo.thumbnail}
                      alt={videoInfo.title}
                      className="w-full md:w-48 h-32 object-cover rounded-xl"
                    />
                    <div className="absolute inset-0 bg-black/40 rounded-xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <Play className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  
                  <div className="flex-1 space-y-3">
                    <h3 className="text-xl font-semibold text-white line-clamp-2">
                      {videoInfo.title}
                    </h3>
                    <div className="flex items-center gap-4 text-gray-300">
                      <span className="flex items-center">
                        <Video className="w-4 h-4 mr-1" />
                        {videoInfo.duration}
                      </span>
                      <span className="px-2 py-1 bg-blue-500/20 text-blue-300 rounded-md text-sm">
                        {videoInfo.platform}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-white flex items-center">
                  <Download className="w-5 h-5 mr-2" />
                  Download Options
                </h4>
                
                <div className="grid gap-3">
                  {videoInfo.formats.map((format, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="glass rounded-xl p-4 flex items-center justify-between hover:bg-white/15 transition-all duration-300"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="p-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg">
                          {format.type === 'video' ? (
                            <Video className="w-5 h-5 text-blue-400" />
                          ) : format.type === 'audio' ? (
                            <Music className="w-5 h-5 text-green-400" />
                          ) : (
                            <FileText className="w-5 h-5 text-gray-400" />
                          )}
                        </div>
                        
                        <div>
                          <div className="flex items-center space-x-3">
                            <span className="text-white font-medium">{format.quality}</span>
                            <span className="text-gray-400">•</span>
                            <span className="text-gray-300">{format.format}</span>
                            <span className="text-gray-400">•</span>
                            <span className="text-gray-300">{format.size}</span>
                          </div>
                        </div>
                      </div>
                      
                      <button
                        onClick={() => handleDownload(format)}
                        disabled={downloading === format.quality}
                        className="btn-secondary min-w-[100px] disabled:opacity-50"
                      >
                        {downloading === format.quality ? (
                          <Loader2 className="w-4 h-4 animate-spin mx-auto" />
                        ) : (
                          <span className="flex items-center">
                            <Download className="w-4 h-4 mr-2" />
                            Download
                          </span>
                        )}
                      </button>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}