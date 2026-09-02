import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import { SAMPLE_VIDEOS } from '../data/demoContent'

export default function ProductVideos() {
  const [videos, setVideos] = useState(SAMPLE_VIDEOS)
  const [activeVideo, setActiveVideo] = useState(null)

  useEffect(() => {
    let active = true
    supabase
      .from('product_videos')
      .select('*')
      .order('sort_order', { ascending: true })
      .then(({ data, error }) => {
        if (!active) return
        if (error) console.error(error)
        setVideos(data?.length ? data : SAMPLE_VIDEOS)
      })
    return () => {
      active = false
    }
  }, [])

  if (videos.length === 0) return (
    <section className="bg-gradient-to-b from-white to-cream max-w-7xl mx-auto px-6 py-16 md:py-24">
      <div className="text-center mb-12">
        <p className="section-eyebrow">Watch</p>
        <h2 className="section-heading">Product Videos</h2>
        <div className="section-underline mx-auto" />
      </div>
      <div className="text-center py-16">
        <div className="inline-block bg-white/70 border border-cream-dark rounded-xl2 p-8 max-w-md">
          <p className="text-charcoal/60 text-lg mb-2">🎬 Coming Soon</p>
          <p className="text-charcoal/50">
            Product videos will appear here once added from the admin panel.
          </p>
        </div>
      </div>
    </section>
  )

  return (
    <section className="bg-gradient-to-b from-white to-cream max-w-7xl mx-auto px-6 py-16 md:py-24">
      <div className="text-center mb-12">
        <p className="section-eyebrow">Watch</p>
        <h2 className="section-heading">Product Videos</h2>
        <div className="section-underline mx-auto" />
        <p className="text-charcoal/70 max-w-xl mx-auto mt-4">
          Learn more about our natural homeopathic products and how to use them
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {videos.map((v) => (
          <button
            key={v.id}
            onClick={() => setActiveVideo(v)}
            className="text-left bg-white rounded-xl2 overflow-hidden border border-cream-dark card-lift hover:border-gold/40 group cursor-pointer"
          >
            <div className="aspect-video bg-gradient-to-br from-charcoal/80 to-charcoal/60 relative overflow-hidden">
              {v.thumbnail_url && (
                <img
                  src={v.thumbnail_url}
                  alt={v.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              )}
              <div className="absolute inset-0 flex items-center justify-center bg-charcoal/20 group-hover:bg-charcoal/40 transition-colors">
                <span className="w-16 h-16 rounded-full bg-forest hover:bg-forest-dark flex items-center justify-center text-gold text-2xl transition-colors transform group-hover:scale-110 transition-transform">
                  ▶
                </span>
              </div>
            </div>
            <div className="p-5">
              <p className="font-semibold text-forest group-hover:text-leaf transition-colors">
                {v.title}
              </p>
            </div>
          </button>
        ))}
      </div>

      {activeVideo && (
        <div
          className="fixed inset-0 bg-charcoal/95 z-50 flex items-center justify-center p-6 animate-fadeIn"
          onClick={() => setActiveVideo(null)}
        >
          <div className="max-w-3xl w-full" onClick={(e) => e.stopPropagation()}>
            <div className="relative">
              <video src={activeVideo.video_url} controls autoPlay className="w-full rounded-xl2" />
              <button
                onClick={() => setActiveVideo(null)}
                className="absolute top-4 right-4 bg-forest hover:bg-forest-dark text-white rounded-full w-10 h-10 flex items-center justify-center text-2xl transition-colors"
              >
                ✕
              </button>
            </div>
            <h3 className="text-white text-center mt-6 font-semibold">{activeVideo.title}</h3>
          </div>
        </div>
      )}
    </section>
  )
}
