'use client'

import { motion } from 'framer-motion'
import { 
  Youtube, 
  Twitter, 
  Facebook, 
  Instagram,
  Video,
  Music,
  Globe,
  Zap
} from 'lucide-react'

const platforms = [
  { name: 'YouTube', icon: Youtube, color: 'text-red-500', users: '2B+' },
  { name: 'Vimeo', icon: Video, color: 'text-blue-500', users: '200M+' },
  { name: 'Twitter', icon: Twitter, color: 'text-sky-500', users: '400M+' },
  { name: 'Facebook', icon: Facebook, color: 'text-blue-600', users: '3B+' },
  { name: 'TikTok', icon: Music, color: 'text-pink-500', users: '1B+' },
  { name: 'Instagram', icon: Instagram, color: 'text-purple-500', users: '2B+' },
  { name: 'Twitch', icon: Video, color: 'text-purple-400', users: '140M+' },
  { name: 'Dailymotion', icon: Globe, color: 'text-orange-500', users: '112M+' },
]

const additionalSites = [
  'SoundCloud', 'Bandcamp', 'Reddit', 'LinkedIn', 'Pinterest', 'Tumblr',
  'Flickr', 'VK', 'Odysee', 'BitChute', 'Rumble', 'Metacafe',
  'LiveLeak', '9GAG', 'Ted Talks', 'Coursera', 'Khan Academy', 'BBC iPlayer'
]

export default function SupportedSites() {
  return (
    <section className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-900/5 to-transparent"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Support for <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">100+ Platforms</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Download videos from all major social media platforms and video hosting sites with just one tool
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {platforms.map((platform, index) => (
            <motion.div
              key={platform.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5, scale: 1.05 }}
              className="glass rounded-2xl p-6 text-center hover:bg-white/15 transition-all duration-300 cursor-pointer group"
            >
              <div className="mb-4 flex justify-center">
                <div className="p-3 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl group-hover:scale-110 transition-transform">
                  <platform.icon className={`w-8 h-8 ${platform.color}`} />
                </div>
              </div>
              <h3 className="text-lg font-semibold text-white mb-1">{platform.name}</h3>
              <p className="text-gray-400 text-sm">{platform.users} users</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass rounded-3xl p-8"
        >
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-2xl mb-4">
              <Zap className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">And Many More!</h3>
            <p className="text-gray-300 mb-6">Our universal downloader works with any video URL from these platforms and more:</p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-3">
            {additionalSites.map((site, index) => (
              <motion.span
                key={site}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="px-4 py-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-white rounded-full text-sm border border-white/20 hover:bg-white/20 transition-all duration-300"
              >
                {site}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
