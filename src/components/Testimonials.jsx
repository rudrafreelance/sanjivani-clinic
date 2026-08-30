import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState([])

  useEffect(() => {
    let active = true
    supabase
      .from('testimonials')
      .select('*')
      .order('sort_order', { ascending: true })
      .then(({ data, error }) => {
        if (!active) return
        if (error) console.error(error)
        setTestimonials(data || [])
      })
    return () => {
      active = false
    }
  }, [])

  return (
    <section id="testimonials" className="bg-gradient-to-b from-charcoal to-charcoal/95 text-cream py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <p className="text-clay-light font-semibold tracking-wide text-sm uppercase">Patient Voices</p>
          <h2 className="text-3xl md:text-4xl font-display font-bold">What Our Patients Say</h2>
          <div className="w-16 h-1 bg-clay rounded-full mt-3 mb-6 mx-auto" />
          <p className="text-cream/60 max-w-2xl mx-auto">
            Real experiences from patients who found healing at Sanjivani Clinic
          </p>
        </div>

        {testimonials.length === 0 ? (
          <div className="text-center py-12">
            <div className="inline-block bg-white/5 border border-white/10 rounded-xl2 p-8 max-w-md">
              <p className="text-cream/60 text-lg mb-2">✨ Coming Soon</p>
              <p className="text-cream/50">
                Patient testimonials will appear here once added from the admin panel.
              </p>
            </div>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div
                key={t.id}
                className="bg-white/5 border border-white/10 rounded-xl2 p-6 hover:bg-white/10 hover:border-clay/30 transition-all group"
              >
                <div className="flex gap-1 text-clay mb-4">
                  {Array.from({ length: t.rating || 5 }).map((_, i) => (
                    <span key={i} className="group-hover:scale-110 transition-transform" style={{transitionDelay: `${i * 50}ms`}}>★</span>
                  ))}
                </div>
                <p className="text-cream/80 mb-6 leading-relaxed text-sm italic">
                  &ldquo;{t.message}&rdquo;
                </p>
                <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                  {t.photo_url ? (
                    <img src={t.photo_url} alt={t.name} className="w-12 h-12 rounded-full object-cover border-2 border-clay/30" />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-clay to-clay-dark flex items-center justify-center text-white font-bold">
                      {t.name?.[0] || '?'}
                    </div>
                  )}
                  <div>
                    <p className="font-semibold text-sm">{t.name}</p>
                    {t.location && <p className="text-cream/50 text-xs">{t.location}</p>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
