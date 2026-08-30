export default function CTABanner() {
  return (
    <section className="max-w-7xl mx-auto px-6 -mt-8 md:mt-0 md:py-12">
      <div className="card text-center max-w-3xl mx-auto py-12 bg-gradient-to-br from-white to-sage/10 hover:shadow-xl hover:border-clay/30 transition-all">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-clay/10 mb-6">
          <span className="text-2xl">✨</span>
        </div>
        <h2 className="text-2xl md:text-3xl font-display font-bold mb-3 text-charcoal">
          Ready to Begin Your Healing Journey?
        </h2>
        <p className="text-charcoal/70 mb-8 max-w-xl mx-auto leading-relaxed">
          Experience the difference that attentive, patient-centric homeopathic care
          can make in your life.
        </p>
        <a href="#appointment" className="btn-primary hover:scale-105 transition-transform">
          📅 Schedule Your Consultation
        </a>
      </div>
    </section>
  )
}
