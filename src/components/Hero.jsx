const CLINIC_PHONE = import.meta.env.VITE_CLINIC_PHONE || '+917990131841'

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-gradient-to-b from-white via-cream to-sage/40">
      <div className="max-w-7xl mx-auto px-6 py-12 md:py-20 grid md:grid-cols-2 gap-12 items-center">
        <div className="animate-fadeIn">
          <div className="inline-flex items-center gap-2 bg-white border border-gold/30 rounded-full px-4 py-2 text-sm font-medium mb-6 hover:shadow-md transition-shadow">
            <span className="text-gold text-lg">★</span>
            <span className="font-semibold text-forest">5.0 Rating</span>
          </div>

          <div className="mb-3 space-y-1">
            <p className="section-eyebrow !normal-case tracking-wide">
              Homeopathy Doctor in Godhra | Dr. Jignesh B. Singada
            </p>
            <p className="text-sm text-charcoal/65 font-medium">
              Homeopath &amp; Nutritionist
            </p>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-[3.4rem] font-bold leading-tight mb-4 text-forest">
            Healing Naturally,
            <br />
            <span className="text-gold-dark">Caring Personally</span>
          </h1>

          <p className="text-lg text-charcoal/70 mb-8 max-w-lg leading-relaxed">
            Classical homeopathy and nutrition for chronic conditions and lasting wellness —
            gentle, natural care guided by Dr. Jignesh B. Singada.
          </p>

          <div className="flex flex-wrap gap-4 mb-10">
            <a
              href={`tel:${CLINIC_PHONE}`}
              className="btn-primary text-base hover:scale-105 transition-transform"
            >
              {CLINIC_PHONE.replace('+91', '0')}
            </a>
            <a
              href="#appointment"
              className="btn-secondary text-base hover:scale-105 transition-transform"
            >
              Book an Appointment
            </a>
          </div>

          <div className="flex flex-wrap gap-6 text-charcoal/60 text-sm">
            <div className="flex items-center gap-2">
              <span className="text-leaf">●</span>
              <span>Mon–Sat · 10:00 AM–7:30 PM · Sunday holiday</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-leaf">●</span>
              <span>Godhra, Gujarat</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center md:items-end gap-6">
          <img
            src="/hero-homeopathy.jpg"
            alt="Natural homeopathic remedies with fresh medicinal herbs"
            className="w-full max-w-md aspect-square object-cover rounded-xl2 shadow-[0_12px_40px_rgba(28,74,54,0.18)] ring-1 ring-gold/30 animate-fadeInScale"
          />

          <div className="card w-full max-w-md card-lift hover:border-gold/40">
            <div className="mb-4 pb-4 border-b border-gold/20">
              <p className="font-display font-bold text-lg text-forest">Dr. Jignesh B. Singada</p>
              <p className="text-xs tracking-wide text-gold-dark font-semibold">PGDEMS, CCH, CGO, CSVD</p>
              <p className="text-sm text-charcoal/60">Homeopath & Nutritionist</p>
            </div>
            <p className="text-charcoal/70 leading-relaxed text-sm">
              Known for attentive, patient-centric care across homeopathy, kidney stone
              treatment, women&apos;s health, digestive care, skin &amp; hair, and nutrition.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
