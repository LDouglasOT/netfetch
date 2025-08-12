export default function JsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Universal Video Downloader",
    "description": "Free online video downloader supporting YouTube, Vimeo, Twitter, Facebook, TikTok and 100+ platforms. Download HD videos, audio, and files instantly.",
    "url": "https://yoursite.com",
    "applicationCategory": "MultimediaApplication",
    "operatingSystem": "Any",
    "browserRequirements": "Requires JavaScript. Requires HTML5.",
    "softwareVersion": "1.0",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "featureList": [
      "Download videos from 100+ platforms",
      "Multiple quality options (4K, 1080p, 720p, 480p)",
      "Audio extraction to MP3",
      "No registration required",
      "Mobile optimized",
      "Free to use"
    ],
    "screenshot": "https://yoursite.com/screenshot.jpg",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "ratingCount": "10000"
    }
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}
