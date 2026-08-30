import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

export default function PatientResults() {
  const [photos, setPhotos] = useState([])

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
    <section className="bg-gradient-to-b from-cream to-white max-w-7xl mx-auto px-6 py-16 md:py-24">
      <div className="text-center mb-12">
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
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
            {photos.map((p) => (
              <div
                key={p.id}
                className="aspect-square rounded-xl2 overflow-hidden bg-gradient-to-br from-sage to-cream-dark group cursor-default"
              >
                <img
                  src={p.photo_url}
                  alt={p.caption || 'Patient result'}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            ))}
          </div>
          <div className="text-center text-charcoal/60 text-sm">
            <p>📸 {photos.length}+ Documented Patient Results</p>
            <p className="text-charcoal/50 text-xs mt-1">
              Photos shared with patient consent. Results may vary.
            </p>
          </div>
        </>
      )}
    </section>
  )
}
