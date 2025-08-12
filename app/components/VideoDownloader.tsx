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
  Link as LinkIcon,
  Flame,
  Zap,
  Timer
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
  downloadUrl?: string
}

export default function VideoDownloader() {
  const [url, setUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [videoInfo, setVideoInfo] = useState<VideoInfo | null>(null)
  const [error, setError] = useState('')
  const [downloading, setDownloading] = useState<string | null>(null)
  const [downloadProgress, setDownloadProgress] = useState<{ [key: string]: number }>({})
  const [downloadSpeed, setDownloadSpeed] = useState<{ [key: string]: string }>({})
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
      // Call your actual API endpoint
      const response = await fetch('/api/download', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: url.trim() })
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to fetch video information')
      }

      const videoData = await response.json()
      setVideoInfo(videoData)
    } catch (err: any) {
      setError(err.message || 'Failed to fetch video information. Please check the URL and try again.')
    } finally {
      setLoading(false)
    }
  }

  const simulateDownloadProgress = (formatKey: string) => {
    const speeds = ['12.4 MB/s', '8.7 MB/s', '15.2 MB/s', '23.1 MB/s', '31.5 MB/s']
    let progress = 0
    
    const interval = setInterval(() => {
      progress += Math.random() * 15 + 5 // Random progress increment
      
      if (progress >= 100) {
        progress = 100
        clearInterval(interval)
        setDownloading(null)
        setDownloadProgress(prev => ({ ...prev, [formatKey]: 0 }))
        setDownloadSpeed(prev => ({ ...prev, [formatKey]: '' }))
      }
      
      setDownloadProgress(prev => ({ ...prev, [formatKey]: progress }))
      setDownloadSpeed(prev => ({ 
        ...prev, 
        [formatKey]: speeds[Math.floor(Math.random() * speeds.length)]
      }))
    }, 200)
  }

  const handleDownload = async (format: VideoFormat) => {
    const formatKey = `${format.quality}-${format.format}`
    setDownloading(formatKey)
    
    try {
      // Start progress simulation
      simulateDownloadProgress(formatKey)
      
      // For actual implementation, you would:
      // 1. Get the real download URL from your backend
      // 2. Create a blob from the video stream
      // 3. Handle the actual file download
      
      // Simulated delay for demo purposes
      await new Promise(resolve => setTimeout(resolve, 100))
      
      // Create download link - In real implementation, this would be the processed video file
      const link = document.createElement('a')
      link.href = format.downloadUrl || format.url
      link.download = `${videoInfo?.title || 'video'}.${format.format.toLowerCase()}`
      link.target = '_blank'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      
    } catch (err) {
      setError('Download failed. Please try again.')
      setDownloading(null)
      setDownloadProgress(prev => ({ ...prev, [formatKey]: 0 }))
      setDownloadSpeed(prev => ({ ...prev, [formatKey]: '' }))
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
        className="bg-white/95 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-red-200/50 relative overflow-hidden"
      >
        {/* Fire-themed background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-red-500 via-orange-500 to-yellow-500"></div>
          <div className="absolute top-0 right-0 w-32 h-32 bg-red-500 rounded-full filter blur-3xl opacity-20 animate-pulse"></div>
          <div className="absolute bottom-0 left-0 w-40 h-40 bg-orange-500 rounded-full filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>
        
        <div className="relative z-10">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <LinkIcon className="w-6 h-6 text-red-500" />
              </div>
              <input
                ref={inputRef}
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Paste video URL here (YouTube, Vimeo, Twitter, Facebook, etc.)"
                className="w-full pl-12 pr-24 py-4 bg-gradient-to-r from-red-50 to-white border-2 border-red-200 rounded-xl text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-300 shadow-lg"
                required
              />
              <div className="absolute inset-y-0 right-0 flex items-center space-x-2 pr-3">
                {url && (
                  <button
                    type="button"
                    onClick={clearInput}
                    className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                  >
                    ✕
                  </button>
                )}
                <button
                  type="button"
                  onClick={pasteFromClipboard}
                  className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                  title="Paste from clipboard"
                >
                  <Copy className="w-4 h-4" />
                </button>
              </div>
            </div>
            
            <motion.button
              type="submit"
              disabled={loading || !url.trim()}
              className="w-full bg-gradient-to-r from-red-600 via-red-500 to-orange-500 hover:from-red-700 hover:via-red-600 hover:to-orange-600 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none relative overflow-hidden"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Fire animation background */}
              <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-red-500 opacity-0 hover:opacity-20 transition-opacity duration-300"></div>
              
              {loading ? (
                <div className="flex items-center justify-center relative z-10">
                  <div className="flex items-center space-x-2">
                    <Loader2 className="w-6 h-6 animate-spin" />
                    <Flame className="w-5 h-5 text-orange-300 animate-bounce" />
                  </div>
                  <span className="ml-3">Analyzing Video...</span>
                </div>
              ) : (
                <div className="flex items-center justify-center relative z-10">
                  <Flame className="w-6 h-6 mr-3 animate-pulse" />
                  Get Download Links
                  <Zap className="w-5 h-5 ml-3 text-yellow-300" />
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
                className="mt-6 p-4 bg-red-100 border border-red-300 rounded-xl flex items-center shadow-lg"
              >
                <AlertCircle className="w-6 h-6 text-red-500 mr-3 flex-shrink-0" />
                <p className="text-red-700">{error}</p>
              </motion.div>
            )}
            
            {videoInfo && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mt-8 space-y-6"
              >
                <div className="bg-gradient-to-r from-red-50 to-white rounded-2xl p-6 border border-red-200 shadow-lg">
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="relative group">
                      <img
                        src={videoInfo.thumbnail}
                        alt={videoInfo.title}
                        className="w-full md:w-48 h-32 object-cover rounded-xl shadow-lg border border-red-200"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-red-900/40 to-transparent rounded-xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <Play className="w-8 h-8 text-white drop-shadow-lg" />
                      </div>
                    </div>
                    
                    <div className="flex-1 space-y-3">
                      <h3 className="text-xl font-bold text-gray-800 line-clamp-2">
                        {videoInfo.title}
                      </h3>
                      <div className="flex items-center gap-4 text-gray-600">
                        <span className="flex items-center bg-red-100 px-3 py-1 rounded-lg">
                          <Timer className="w-4 h-4 mr-1 text-red-500" />
                          {videoInfo.duration}
                        </span>
                        <span className="px-3 py-1 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-lg text-sm font-medium shadow">
                          {videoInfo.platform}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h4 className="text-lg font-bold text-gray-800 flex items-center">
                    <Flame className="w-5 h-5 mr-2 text-red-500" />
                    Lightning Fast Downloads
                  </h4>
                  
                  <div className="grid gap-3">
                    {videoInfo.formats.map((format, index) => {
                      const formatKey = `${format.quality}-${format.format}`
                      const isDownloading = downloading === formatKey
                      const progress = downloadProgress[formatKey] || 0
                      const speed = downloadSpeed[formatKey] || ''
                      
                      return (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="bg-white rounded-xl p-4 flex items-center justify-between hover:bg-red-50 transition-all duration-300 border border-red-200 shadow-lg relative overflow-hidden"
                        >
                          {/* Progress bar background */}
                          {isDownloading && (
                            <div 
                              className="absolute inset-0 bg-gradient-to-r from-red-100 to-orange-100 transition-all duration-300"
                              style={{ width: `${progress}%` }}
                            />
                          )}
                          
                          <div className="flex items-center space-x-4 relative z-10">
                            <div className="p-3 bg-gradient-to-r from-red-500 to-orange-500 rounded-lg shadow-lg">
                              {format.type === 'video' ? (
                                <Video className="w-5 h-5 text-white" />
                              ) : format.type === 'audio' ? (
                                <Music className="w-5 h-5 text-white" />
                              ) : (
                                <FileText className="w-5 h-5 text-white" />
                              )}
                            </div>
                            
                            <div>
                              <div className="flex items-center space-x-3">
                                <span className="text-gray-800 font-semibold">{format.quality}</span>
                                <span className="text-gray-400">•</span>
                                <span className="text-gray-600">{format.format}</span>
                                <span className="text-gray-400">•</span>
                                <span className="text-gray-600">{format.size}</span>
                              </div>
                              {isDownloading && speed && (
                                <div className="flex items-center mt-1">
                                  <Zap className="w-4 h-4 text-orange-500 mr-1 animate-pulse" />
                                  <span className="text-sm text-orange-600 font-medium">{speed}</span>
                                  <span className="text-sm text-gray-500 ml-2">({Math.round(progress)}%)</span>
                                </div>
                              )}
                            </div>
                          </div>
                          
                          <button
                            onClick={() => handleDownload(format)}
                            disabled={isDownloading}
                            className="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 min-w-[120px] relative z-10"
                          >
                            {isDownloading ? (
                              <div className="flex items-center justify-center">
                                <Loader2 className="w-4 h-4 animate-spin mr-2" />
                                <Flame className="w-4 h-4 text-orange-200 animate-bounce" />
                              </div>
                            ) : (
                              <span className="flex items-center">
                                <Download className="w-4 h-4 mr-2" />
                                Download
                              </span>
                            )}
                          </button>
                        </motion.div>
                      )
                    })}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  )
}