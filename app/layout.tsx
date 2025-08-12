import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Universal Video Downloader - Download Videos from YouTube, Vimeo, Twitter & More',
  description: 'Free online video downloader supporting YouTube, Vimeo, Twitter, Facebook, TikTok and 100+ platforms. Download HD videos, audio, and files instantly with no registration required.',
  keywords: 'video downloader, youtube downloader, vimeo downloader, twitter video download, facebook video download, tiktok downloader, online video downloader, free video download',
  authors: [{ name: 'Universal Video Downloader' }],
  creator: 'Universal Video Downloader',
  publisher: 'Universal Video Downloader',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://yoursite.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Universal Video Downloader - Download Videos from Any Platform',
    description: 'Download videos from YouTube, Vimeo, Twitter, Facebook and 100+ platforms for free. High quality downloads with no registration required.',
    url: 'https://yoursite.com',
    siteName: 'Universal Video Downloader',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Universal Video Downloader',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Universal Video Downloader - Download Videos from Any Platform',
    description: 'Download videos from YouTube, Vimeo, Twitter, Facebook and 100+ platforms for free.',
    images: ['/twitter-image.jpg'],
    creator: '@yourtwitterhandle',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#3b82f6" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
