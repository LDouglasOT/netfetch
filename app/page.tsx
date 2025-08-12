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
  ExternalLink
} from 'lucide-react'
import VideoDownloader from './components/VideoDownloader'
import SupportedSites from './components/SupportedSites'
import Features from './components/Features'
import FAQ from './components/FAQ'
import JsonLd from './components/JsonLd'


export default function Home() {
  return (
    <div className="min-h-screen">
      <JsonLd />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 animate-gradient"></div>
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float" style={{ animationDelay: '2s' }}></div>
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
              className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl mb-8 shadow-2xl"
            >
              <Download className="w-10 h-10 text-white" />
            </motion.div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Universal Video
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                {" "}Downloader
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed">
              Download videos from <span className="text-blue-400 font-semibold">YouTube</span>, 
              <span className="text-purple-400 font-semibold"> Vimeo</span>, 
              <span className="text-blue-400 font-semibold"> Twitter</span>, 
              <span className="text-purple-400 font-semibold"> Facebook</span> and 
              <span className="text-gradient bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent font-semibold"> 100+ platforms</span> instantly
            </p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap justify-center gap-6 mb-16"
            >
              <div className="flex items-center gap-2 glass px-4 py-2 rounded-lg">
                <Zap className="w-5 h-5 text-yellow-400" />
                <span className="text-white">Lightning Fast</span>
              </div>
              <div className="flex items-center gap-2 glass px-4 py-2 rounded-lg">
                <Shield className="w-5 h-5 text-green-400" />
                <span className="text-white">100% Secure</span>
              </div>
              <div className="flex items-center gap-2 glass px-4 py-2 rounded-lg">
                <Globe className="w-5 h-5 text-blue-400" />
                <span className="text-white">No Registration</span>
              </div>
            </motion.div>
          </motion.div>
          
          <VideoDownloader />
        </div>
      </section>
      
      <SupportedSites />
      <Features />
      <FAQ />
      
      {/* Footer */}
      <footer className="bg-black/50 backdrop-blur-sm border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center items-center mb-6">
              <Download className="w-8 h-8 text-blue-400 mr-3" />
              <span className="text-2xl font-bold text-white">Universal Video Downloader</span>
            </div>
            <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
              The fastest and most reliable way to download videos from any platform. 
              Support for 100+ websites with high-quality downloads guaranteed.
            </p>
            <div className="border-t border-white/10 pt-6">
              <p className="text-gray-500">&copy; 2024 Universal Video Downloader. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
