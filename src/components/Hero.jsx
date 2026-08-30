const CLINIC_PHONE = import.meta.env.VITE_CLINIC_PHONE || '+917990131841'

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-gradient-to-b from-cream via-white to-sage/20">
      <div className="max-w-7xl mx-auto px-6 py-12 md:py-24 grid md:grid-cols-2 gap-12 items-center">
        <div className="animate-fadeIn">
          <div className="inline-flex items-center gap-2 bg-white/80 border border-cream-dark rounded-full px-4 py-2 text-sm font-medium mb-6 hover:shadow-md transition-shadow">
            <span className="text-clay text-lg">★</span>
            <span className="font-semibold">5.0 Rating</span>
            <span className="text-charcoal/30">•</span>
            <span className="text-charcoal/60">6 Reviews</span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-charcoal">
            Healing with
            <br />
            <span className="bg-gradient-to-r from-clay to-clay-dark bg-clip-text text-transparent">
              Nature&apos;s Wisdom
            </span>
          </h1>

          <p className="text-lg text-charcoal/70 mb-8 max-w-lg leading-relaxed">
            Classical homeopathy for chronic conditions and lasting wellness. Trust in nature's proven power to heal.
          </p>

          <div className="flex flex-wrap gap-4 mb-10">
            <a
              href={`tel:${CLINIC_PHONE}`}
              className="btn-primary text-base hover:scale-105 transition-transform"
            >
              📞 {CLINIC_PHONE.replace('+91', '0')}
            </a>
            <a
              href="#contact"
              className="btn-secondary text-base hover:scale-105 transition-transform"
            >
              📍 Visit Us
            </a>
          </div>

          <div className="flex flex-wrap gap-6 text-charcoal/60">
            <div className="flex items-center gap-2">
              <span className="text-lg">🕐</span>
              <span>Open Daily • Closes 7:30 PM</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-lg">📍</span>
              <span>Godhra, Gujarat</span>
            </div>
          </div>
        </div>

        <div className="card max-w-md md:ml-auto hover:shadow-lg hover:border-clay/30 transition-all group">
          <div className="flex items-center gap-4 mb-5 pb-5 border-b border-cream-dark">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-clay to-clay-dark flex items-center justify-center text-white font-display font-bold text-2xl group-hover:scale-110 transition-transform">
              Dr
            </div>
            <div>
              <p className="font-display font-bold text-lg text-charcoal">Dr. Jignesh Singada</p>
              <p className="text-sm text-charcoal/60">Homeopathic Physician</p>
              <p className="text-sm text-clay-dark font-medium">Classical Homeopathy Specialist</p>
            </div>
          </div>
          <p className="text-charcoal/70 mb-5 leading-relaxed">
            Known for attentive, patient-centric care. Patients trust Dr. Singada for
            serious chronic conditions including piles, skin disorders, and systemic
            complaints.
          </p>
          <div className="flex items-center gap-1.5 text-clay">
            <span className="text-xl">★★★★★</span>
            <span className="text-charcoal/50 text-sm ml-1 font-medium">(6 reviews)</span>
          </div>
        </div>
      </div>
    </section>
  )
}
