import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import { SAMPLE_TESTIMONIALS } from '../data/demoContent'

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState(SAMPLE_TESTIMONIALS)

  useEffect(() => {
    let active = true
    supabase
      .from('testimonials')
      .select('*')
      .order('sort_order', { ascending: true })
      .then(({ data, error }) => {
        if (!active) return
        if (error) console.error(error)
        setTestimonials(data?.length ? data : SAMPLE_TESTIMONIALS)
      })
    return () => {
      active = false
    }
  }, [])

  return (
    <section id="testimonials" className="bg-forest text-cream py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <p className="text-gold font-semibold tracking-[0.22em] text-xs uppercase">Patient Voices</p>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-cream">What Our Patients Say</h2>
          <div className="w-16 h-[2px] bg-gold rounded-full mt-3 mb-6 mx-auto" />
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
                className="bg-white/5 border border-gold/20 rounded-xl2 p-6 card-lift hover:bg-white/10 hover:border-gold/50 group"
              >
                <div className="flex gap-1 text-gold mb-4">
                  {Array.from({ length: t.rating || 5 }).map((_, i) => (
                    <span key={i} className="group-hover:scale-110 transition-transform" style={{transitionDelay: `${i * 50}ms`}}>★</span>
                  ))}
                </div>
                <p className="text-cream/80 mb-6 leading-relaxed text-sm italic">
                  &ldquo;{t.message}&rdquo;
                </p>
                <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                  {t.photo_url ? (
                    <img src={t.photo_url} alt={t.name} className="w-12 h-12 rounded-full object-cover border-2 border-gold/40" />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-gold/20 border border-gold/40 flex items-center justify-center text-gold font-bold">
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
