'use client'

import { motion } from 'framer-motion'
import { 
  Zap, 
  Shield, 
  Globe, 
  Download, 
  Sparkles, 
  Clock,
  Smartphone,
  Headphones,
  Film,
  HardDrive
} from 'lucide-react'

const features = [
  {
    icon: Zap,
    title: 'Lightning Fast Downloads',
    description: 'Download videos in seconds with our optimized servers and advanced compression algorithms.',
    color: 'from-yellow-400 to-orange-500'
  },
  {
    icon: Shield,
    title: '100% Safe & Secure',
    description: 'No malware, no ads, no tracking. Your privacy and security are our top priorities.',
    color: 'from-green-400 to-emerald-500'
  },
  {
    icon: Globe,
    title: 'No Registration Required',
    description: 'Start downloading immediately without creating accounts or providing personal information.',
    color: 'from-blue-400 to-cyan-500'
  },
  {
    icon: Film,
    title: 'Multiple Quality Options',
    description: 'Choose from 4K, 1080p, 720p, 480p, or audio-only formats to suit your needs.',
    color: 'from-purple-400 to-pink-500'
  },
  {
    icon: Smartphone,
    title: 'Mobile Optimized',
    description: 'Works perfectly on all devices - desktop, tablet, and mobile phones.',
    color: 'from-indigo-400 to-purple-500'
  },
  {
    icon: Headphones,
    title: 'Audio Extraction',
    description: 'Extract high-quality MP3 audio from any video for your music collection.',
    color: 'from-pink-400 to-rose-500'
  }
]

const stats = [
  { number: '10M+', label: 'Videos Downloaded', icon: Download },
  { number: '100+', label: 'Supported Platforms', icon: Globe },
  { number: '99.9%', label: 'Uptime Guarantee', icon: Clock },
  { number: '24/7', label: 'Available Always', icon: Sparkles }
]

export default function Features() {
  return (
    <section className="py-24 relative">
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        <div className="absolute top-1/4 right-1/3 w-96 h-96 bg-blue-500/10 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Why Choose Our <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Video Downloader</span>?
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Experience the fastest, safest, and most reliable video downloading service available online
          </p>
        </motion.div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="glass rounded-2xl p-6 text-center hover:bg-white/15 transition-all duration-300"
            >
              <div className="mb-3 flex justify-center">
                <div className="p-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg">
                  <stat.icon className="w-6 h-6 text-blue-400" />
                </div>
              </div>
              <div className="text-3xl font-bold text-white mb-2">{stat.number}</div>
              <div className="text-gray-300 text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="glass rounded-2xl p-8 hover:bg-white/15 transition-all duration-300 group"
            >
              <div className="mb-6">
                <div className={`inline-flex p-3 bg-gradient-to-r ${feature.color} rounded-xl shadow-lg group-hover:scale-110 transition-transform`}>
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
              </div>
              
              <h3 className="text-xl font-semibold text-white mb-4 group-hover:text-blue-300 transition-colors">
                {feature.title}
              </h3>
              
              <p className="text-gray-300 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
