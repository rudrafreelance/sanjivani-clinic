import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { createPortal } from 'react-dom'
import { supabase } from '../lib/supabase'

const PREVIEW_COUNT = 10

function GalleryLightbox({ photos, index, onClose, onChange }) {
  const photo = photos[index]
  if (!photo) return null

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') onChange((index - 1 + photos.length) % photos.length)
      if (e.key === 'ArrowRight') onChange((index + 1) % photos.length)
    }
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
    }
  }, [index, photos.length, onClose, onChange])

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-charcoal/80 p-4 sm:p-6 animate-fadeIn"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={photo.caption || 'Patient result'}
    >
      <div
        className="relative w-full max-w-3xl max-h-[90dvh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute -top-1 right-0 sm:-right-2 z-20 w-10 h-10 rounded-full bg-white border border-cream-dark text-charcoal/70 hover:text-forest hover:border-forest transition-colors flex items-center justify-center shadow-sm"
          aria-label="Close"
        >
          ✕
        </button>

        <div className="bg-white rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90dvh]">
          <div className="relative bg-[#f5f2ea] flex items-center justify-center min-h-[240px] max-h-[min(70dvh,560px)] p-3 sm:p-5">
            <img
              src={photo.photo_url}
              alt={photo.caption || 'Patient result'}
              className="max-w-full max-h-[min(65dvh,520px)] w-auto h-auto object-contain"
            />

            {photos.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={() => onChange((index - 1 + photos.length) % photos.length)}
                  className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/95 border border-cream-dark text-forest font-bold shadow-sm hover:bg-forest hover:text-white transition-colors"
                  aria-label="Previous photo"
                >
                  ‹
                </button>
                <button
                  type="button"
                  onClick={() => onChange((index + 1) % photos.length)}
                  className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/95 border border-cream-dark text-forest font-bold shadow-sm hover:bg-forest hover:text-white transition-colors"
                  aria-label="Next photo"
                >
                  ›
                </button>
              </>
            )}
          </div>

          <div className="px-5 py-4 border-t border-cream-dark bg-white">
            {photo.caption ? (
              <p className="text-center font-semibold text-forest text-sm sm:text-base leading-snug">
                {photo.caption}
              </p>
            ) : (
              <p className="text-center text-charcoal/45 text-sm">Patient result</p>
            )}
            <p className="text-center text-xs text-charcoal/40 mt-1.5">
              {index + 1} / {photos.length}
            </p>
          </div>
        </div>
      </div>
    </div>,
    document.body
  )
}

/** @param {{ mode?: 'preview' | 'full' }} props */
export default function PatientResults({ mode = 'preview' }) {
  const [photos, setPhotos] = useState([])
  const [activeIndex, setActiveIndex] = useState(null)

  const isPreview = mode === 'preview'
  const visiblePhotos = isPreview ? photos.slice(0, PREVIEW_COUNT) : photos
  const hasMore = isPreview && photos.length > PREVIEW_COUNT

  useEffect(() => {
    let active = true
    supabase
      .from('patient_gallery')
      .select('*')
      .order('sort_order', { ascending: true })
      .then(({ data, error }) => {
        if (!active) return
        if (error) console.error(error)
        setPhotos(data || [])
      })
    return () => {
      active = false
    }
  }, [])

  return (
    <section id="results" className="bg-gradient-to-b from-cream to-white max-w-7xl mx-auto px-6 py-16 md:py-24">
      <div className="text-center mb-12">
        {!isPreview && (
          <Link
            to="/#results"
            className="inline-block mb-6 text-sm font-semibold text-forest hover:text-leaf transition-colors"
          >
            ← Back to home
          </Link>
        )}
        <p className="section-eyebrow">Real Transformations</p>
        <h2 className="section-heading">Patient Results</h2>
        <div className="section-underline mx-auto" />
        <p className="text-charcoal/70 max-w-xl mx-auto mt-4">
          Before and after photos from actual patients treated at Sanjivani Clinic.
          Results speak louder than words.
        </p>
      </div>

      {photos.length === 0 ? (
        <div className="text-center py-16">
          <div className="inline-block bg-white/70 border border-cream-dark rounded-xl2 p-8 max-w-md">
            <p className="text-charcoal/60 text-lg mb-2">✨ Gallery Coming Soon</p>
            <p className="text-charcoal/50">
              Patient result photos will appear here once added from the admin panel.
            </p>
          </div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {visiblePhotos.map((p) => {
              const fullIndex = photos.findIndex((photo) => photo.id === p.id)
              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setActiveIndex(fullIndex)}
                  className="text-left group rounded-xl2 overflow-hidden bg-white border border-cream-dark hover:border-gold/50 transition-all card-lift"
                >
                  <div className="aspect-square bg-gradient-to-br from-sage to-cream-dark overflow-hidden">
                    <img
                      src={p.photo_url}
                      alt={p.caption || 'Patient result'}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  {p.caption ? (
                    <p className="px-2.5 py-2 text-xs sm:text-sm font-medium text-charcoal/80 line-clamp-2 leading-snug">
                      {p.caption}
                    </p>
                  ) : (
                    <p className="px-2.5 py-2 text-xs text-charcoal/40">View photo</p>
                  )}
                </button>
              )
            })}
          </div>

          {hasMore && (
            <div className="mt-10 text-center">
              <Link
                to="/patient-results"
                className="inline-flex flex-col items-center gap-1 text-forest font-semibold tracking-wide hover:text-leaf transition-colors group"
              >
                <span className="text-sm sm:text-base">Explore more results</span>
                <span className="h-px w-full bg-gold group-hover:bg-forest transition-colors" />
              </Link>
              <p className="mt-2 text-xs text-charcoal/45">
                Showing {PREVIEW_COUNT} of {photos.length} photos
              </p>
            </div>
          )}
        </>
      )}

      {activeIndex !== null && (
        <GalleryLightbox
          photos={photos}
          index={activeIndex}
          onClose={() => setActiveIndex(null)}
          onChange={setActiveIndex}
        />
      )}
    </section>
  )
}
