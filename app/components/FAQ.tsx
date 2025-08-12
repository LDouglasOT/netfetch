'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, HelpCircle } from 'lucide-react'

const faqs = [
  {
    question: 'Is this video downloader free to use?',
    answer: 'Yes, our video downloader is completely free to use. There are no hidden charges, subscription fees, or premium plans. You can download unlimited videos from supported platforms without any cost.'
  },
  {
    question: 'Which video platforms are supported?',
    answer: 'We support over 100+ platforms including YouTube, Vimeo, Twitter, Facebook, TikTok, Instagram, Twitch, Dailymotion, and many more. Our universal downloader can handle most video URLs you throw at it.'
  },
  {
    question: 'What video quality options are available?',
    answer: 'You can download videos in various qualities including 4K (2160p), 1080p Full HD, 720p HD, 480p, 360p, and 240p. We also offer audio-only downloads in MP3 format for music extraction.'
  },
  {
    question: 'Do I need to install any software?',
    answer: 'No installation required! Our video downloader works entirely in your web browser. Simply paste the video URL, select your preferred quality, and download directly to your device.'
  },
  {
    question: 'Is it legal to download videos?',
    answer: 'Downloading videos for personal use is generally legal, but you should respect copyright laws and terms of service of the platforms. Always ensure you have permission to download content, especially for commercial use.'
  },
  {
    question: 'Are there any download limits?',
    answer: 'We don\'t impose strict download limits for regular use. However, we may implement fair usage policies to prevent abuse and ensure service quality for all users.'
  },
  {
    question: 'How fast are the downloads?',
    answer: 'Download speeds depend on your internet connection and the video file size. Our servers are optimized for fast delivery, and most videos download within seconds to a few minutes.'
  },
  {
    question: 'Can I download private or restricted videos?',
    answer: 'No, we can only download publicly available videos. Private, restricted, or copyrighted content cannot be downloaded through our service, as we respect platform policies and copyright laws.'
  }
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="py-24 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl mb-6">
            <HelpCircle className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Frequently Asked <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Questions</span>
          </h2>
          <p className="text-xl text-gray-300">
            Everything you need to know about our video downloader service
          </p>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="glass rounded-2xl overflow-hidden"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-white/10 transition-all duration-300"
              >
                <h3 className="text-lg font-semibold text-white pr-8">
                  {faq.question}
                </h3>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex-shrink-0"
                >
                  <ChevronDown className="w-5 h-5 text-gray-400" />
                </motion.div>
              </button>
              
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-8 pb-6 text-gray-300 leading-relaxed">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}