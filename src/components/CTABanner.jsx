export default function CTABanner() {
  return (
    <section className="max-w-7xl mx-auto px-6 -mt-8 md:mt-0 md:py-12">
      <div className="card text-center max-w-3xl mx-auto py-12 bg-white card-lift hover:border-gold/40">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-full border border-gold text-gold mb-6">
          <span className="font-display text-xl">S</span>
        </div>
        <h2 className="text-2xl md:text-3xl font-display font-bold mb-3 text-forest">
          Ready to Begin Your Healing Journey?
        </h2>
        <p className="text-charcoal/70 mb-8 max-w-xl mx-auto leading-relaxed">
          Experience the difference that attentive, patient-centric homeopathic care
          can make in your life.
        </p>
        <a href="#appointment" className="btn-primary hover:scale-105 transition-transform">
          Schedule Your Consultation
        </a>
      </div>
    </section>
  )
}
