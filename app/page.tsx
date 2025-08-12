'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Download, 
  Play, 
  Globe, 
  Zap, 
  Shield, 
  Sparkles,
  Youtube,
  Twitter,
  Facebook,
  Video,
  Music,
  FileText,
  CheckCircle,
  AlertCircle,
  Loader2,
  ExternalLink,
  Flame,
  Timer,
  TrendingUp
} from 'lucide-react'
import VideoDownloader from './components/VideoDownloader'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-900 via-red-800 to-orange-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-red-600/30 to-orange-600/30 animate-pulse"></div>
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-orange-500/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-red-500/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float" style={{ animationDelay: '2s' }}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial from-yellow-400/10 to-transparent rounded-full animate-pulse"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 py-20 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-red-600 via-red-500 to-orange-500 rounded-3xl mb-8 shadow-2xl relative"
            >
              <Flame className="w-12 h-12 text-white animate-pulse" />
              <div className="absolute -top-1 -right-1 w-6 h-6 bg-yellow-400 rounded-full animate-bounce">
                <Zap className="w-4 h-4 text-red-600 m-1" />
              </div>
            </motion.div>
            
            <h1 className="text-6xl md:text-8xl font-black text-white mb-6 leading-tight tracking-tight">
              <span className="bg-gradient-to-r from-white via-red-100 to-orange-100 bg-clip-text text-transparent drop-shadow-2xl">
                Blazing Fast
              </span>
              <br />
              <span className="bg-gradient-to-r from-red-400 via-orange-400 to-yellow-400 bg-clip-text text-transparent">
                Video Downloader
              </span>
            </h1>
            
            <p className="text-xl md:text-3xl text-red-100 mb-12 max-w-4xl mx-auto leading-relaxed font-medium">
              Download videos at <span className="text-orange-300 font-bold">lightning speed</span> from 
              <span className="text-white font-bold"> YouTube</span>, 
              <span className="text-red-300 font-bold"> Vimeo</span>, 
              <span className="text-white font-bold"> Twitter</span>, and 
              <span className="text-gradient bg-gradient-to-r from-orange-300 to-yellow-300 bg-clip-text text-transparent font-bold"> 100+ platforms</span>
            </p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap justify-center gap-6 mb-16"
            >
              <motion.div 
                className="flex items-center gap-3 bg-white/10 backdrop-blur-xl px-6 py-3 rounded-xl border border-white/20 shadow-lg"
                whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.15)" }}
              >
                <div className="p-2 bg-gradient-to-r from-red-500 to-orange-500 rounded-lg">
                  <TrendingUp className="w-5 h-5 text-white" />
                </div>
                <span className="text-white font-semibold">31.5 MB/s Speed</span>
              </motion.div>
              <motion.div 
                className="flex items-center gap-3 bg-white/10 backdrop-blur-xl px-6 py-3 rounded-xl border border-white/20 shadow-lg"
                whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.15)" }}
              >
                <div className="p-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg">
                  <Shield className="w-5 h-5 text-white" />
                </div>
                <span className="text-white font-semibold">100% Secure</span>
              </motion.div>
              <motion.div 
                className="flex items-center gap-3 bg-white/10 backdrop-blur-xl px-6 py-3 rounded-xl border border-white/20 shadow-lg"
                whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.15)" }}
              >
                <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg">
                  <Globe className="w-5 h-5 text-white" />
                </div>
                <span className="text-white font-semibold">No Registration</span>
              </motion.div>
            </motion.div>
          </motion.div>
          
          <VideoDownloader />
        </div>
      </section>
      
      {/* Supported Sites Section */}
      <section className="py-24 relative bg-gradient-to-b from-transparent via-black/20 to-transparent">
        <div className="absolute inset-0 bg-gradient-to-b from-red-900/50 to-orange-900/50"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-black text-white mb-6">
              <span className="bg-gradient-to-r from-white to-red-200 bg-clip-text text-transparent">Support for</span>
              <br />
              <span className="bg-gradient-to-r from-red-400 via-orange-400 to-yellow-400 bg-clip-text text-transparent">100+ Platforms</span>
            </h2>
            <p className="text-xl text-red-100 max-w-3xl mx-auto">
              Download videos from all major platforms with blazing fast speed and maximum quality
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {[
              { name: 'YouTube', icon: Youtube, color: 'from-red-500 to-red-600', users: '2B+' },
              { name: 'Vimeo', icon: Video, color: 'from-blue-500 to-blue-600', users: '200M+' },
              { name: 'Twitter', icon: Twitter, color: 'from-sky-500 to-sky-600', users: '400M+' },
              { name: 'Facebook', icon: Facebook, color: 'from-blue-600 to-blue-700', users: '3B+' },
              { name: 'TikTok', icon: Music, color: 'from-pink-500 to-pink-600', users: '1B+' },
              { name: 'Instagram', icon: Video, color: 'from-purple-500 to-purple-600', users: '2B+' },
              { name: 'Twitch', icon: Video, color: 'from-purple-400 to-purple-500', users: '140M+' },
              { name: 'Dailymotion', icon: Globe, color: 'from-orange-500 to-orange-600', users: '112M+' },
            ].map((platform, index) => (
              <motion.div
                key={platform.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5, scale: 1.05 }}
                className="bg-white/95 backdrop-blur-xl rounded-2xl p-6 text-center hover:bg-white transition-all duration-300 cursor-pointer group shadow-2xl border border-red-200/50"
              >
                <div className="mb-4 flex justify-center">
                  <div className={`p-4 bg-gradient-to-r ${platform.color} rounded-xl group-hover:scale-110 transition-transform shadow-lg`}>
                    <platform.icon className="w-8 h-8 text-white" />
                  </div>
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-1">{platform.name}</h3>
                <p className="text-gray-600 text-sm font-medium">{platform.users} users</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 relative">
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-red-500/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
          <div className="absolute top-1/4 right-1/3 w-96 h-96 bg-orange-500/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-black text-white mb-6">
              <span className="bg-gradient-to-r from-white to-red-200 bg-clip-text text-transparent">Why Choose Our</span>
              <br />
              <span className="bg-gradient-to-r from-red-400 via-orange-400 to-yellow-400 bg-clip-text text-transparent">Fire-Fast Downloader</span>?
            </h2>
            <p className="text-xl text-red-100 max-w-3xl mx-auto">
              Experience unprecedented download speeds with our blazing fast infrastructure
            </p>
          </motion.div>

          {/* Speed Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
            {[
              { number: '31.5 MB/s', label: 'Max Download Speed', icon: TrendingUp },
              { number: '100+', label: 'Supported Platforms', icon: Globe },
              { number: '10M+', label: 'Videos Downloaded', icon: Download },
              { number: '99.9%', label: 'Uptime Guarantee', icon: Flame }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/95 backdrop-blur-xl rounded-2xl p-6 text-center hover:bg-white transition-all duration-300 shadow-2xl border border-red-200/50"
              >
                <div className="mb-3 flex justify-center">
                  <div className="p-3 bg-gradient-to-r from-red-500 to-orange-500 rounded-xl shadow-lg">
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div className="text-3xl font-black text-gray-800 mb-2">{stat.number}</div>
                <div className="text-gray-600 text-sm font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: TrendingUp,
                title: 'Blazing Fast Downloads',
                description: 'Experience download speeds up to 31.5 MB/s with our fire-optimized servers and advanced algorithms.',
                color: 'from-red-500 to-orange-500'
              },
              {
                icon: Shield,
                title: 'Fort Knox Security',
                description: 'Military-grade encryption and zero-log policy ensures your downloads are completely private and secure.',
                color: 'from-green-500 to-emerald-500'
              },
              {
                icon: Globe,
                title: 'Universal Compatibility',
                description: 'Works with 100+ platforms including all major social media and video hosting sites worldwide.',
                color: 'from-blue-500 to-cyan-500'
              },
              {
                icon: Video,
                title: 'Ultra HD Quality',
                description: 'Download in 4K, 8K, 1080p, or any quality available. Perfect quality preservation guaranteed.',
                color: 'from-purple-500 to-pink-500'
              },
              {
                icon: Timer,
                title: 'Instant Processing',
                description: 'No waiting time! Our AI-powered system analyzes and prepares your downloads in milliseconds.',
                color: 'from-indigo-500 to-purple-500'
              },
              {
                icon: Music,
                title: 'Perfect Audio Extraction',
                description: 'Extract crystal-clear MP3 audio from any video with our advanced audio processing engine.',
                color: 'from-pink-500 to-rose-500'
              }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white/95 backdrop-blur-xl rounded-2xl p-8 hover:bg-white transition-all duration-300 group shadow-2xl border border-red-200/50"
              >
                <div className="mb-6">
                  <div className={`inline-flex p-4 bg-gradient-to-r ${feature.color} rounded-xl shadow-lg group-hover:scale-110 transition-transform`}>
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-gray-800 mb-4 group-hover:text-red-600 transition-colors">
                  {feature.title}
                </h3>
                
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-gradient-to-t from-black/80 to-red-900/50 backdrop-blur-sm border-t border-red-500/30">
        <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center items-center mb-6">
              <div className="p-3 bg-gradient-to-r from-red-600 to-orange-600 rounded-2xl mr-4 shadow-lg">
                <Flame className="w-8 h-8 text-white" />
              </div>
              <span className="text-3xl font-black text-white">Blazing Fast Video Downloader</span>
            </div>
            <p className="text-red-100 mb-6 max-w-2xl mx-auto text-lg">
              The fastest and most reliable way to download videos from any platform. 
              Lightning-fast speeds with 100+ websites supported.
            </p>
            <div className="border-t border-red-500/30 pt-6">
              <p className="text-red-300">&copy; 2024 Blazing Fast Video Downloader. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}