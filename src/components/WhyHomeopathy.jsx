const FEATURES = [
  { icon: '🌿', title: 'Natural & Safe', text: 'Highly diluted natural substances with no side effects or dependency.' },
  { icon: '🎯', title: 'Root Cause Treatment', text: 'Addresses underlying causes rather than masking symptoms temporarily.' },
  { icon: '🛡️', title: 'Holistic Healing', text: 'Treats body, mind, and spirit as interconnected for complete wellness.' },
  { icon: '⏱️', title: 'Long-term Relief', text: 'Sustainable improvement that lasts beyond active treatment.' },
  { icon: '🤝', title: 'Personalized Care', text: 'Every prescription tailored to your unique constitution and symptoms.' },
  { icon: '✨', title: 'Gentle Yet Effective', text: 'Safe for all ages from infants to elderly, during pregnancy and chronic illness.' },
]

const WHY_CLINIC = [
  { num: '01', title: 'Expert Diagnosis', text: 'Comprehensive consultation to understand your complete health picture' },
  { num: '02', title: 'Classical Approach', text: 'Traditional homeopathic principles with modern health understanding' },
  { num: '03', title: 'Proven Results', text: 'Track record of success with chronic conditions and systemic health' },
  { num: '04', title: 'Clean & Welcoming', text: 'Hygienic clinic environment that reflects our commitment to care' },
]

export default function WhyHomeopathy() {
  return (
    <section id="why-homeopathy" className="bg-gradient-to-b from-sage/30 to-cream py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="section-eyebrow mb-2">The Power of Nature</p>
          <h2 className="section-heading mb-2">Why Choose Homeopathy?</h2>
          <div className="section-underline mx-auto mb-6" />
          <p className="text-charcoal/70 max-w-2xl mx-auto">
            A natural system of medicine that empowers your body's innate healing ability
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
          {FEATURES.map((f, idx) => (
            <div
              key={f.title}
              className="bg-white/70 border border-cream-dark rounded-xl2 p-6 hover:shadow-md hover:border-clay/30 transition-all group"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform group-hover:rotate-12">
                {f.icon}
              </div>
              <h3 className="font-display font-bold mb-2 text-charcoal group-hover:text-clay transition-colors">
                {f.title}
              </h3>
              <p className="text-charcoal/70 text-sm leading-relaxed">
                {f.text}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center mb-16">
          <p className="section-eyebrow mb-2">Our Commitment</p>
          <h2 className="section-heading mb-2">Why Sanjivani Clinic?</h2>
          <div className="section-underline mx-auto" />
        </div>

        <div className="grid sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {WHY_CLINIC.map((c) => (
            <div
              key={c.num}
              className="card flex gap-5 items-start hover:shadow-lg hover:border-clay/30 transition-all group"
            >
              <div className="flex-shrink-0">
                <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-clay to-clay-dark text-white font-display font-extrabold text-xl group-hover:scale-110 transition-transform">
                  {c.num}
                </span>
              </div>
              <div>
                <h3 className="font-display font-bold mb-1 text-charcoal group-hover:text-clay transition-colors">
                  {c.title}
                </h3>
                <p className="text-sm text-charcoal/70 leading-relaxed">
                  {c.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
