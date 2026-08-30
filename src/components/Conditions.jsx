const CONDITIONS_TREATED = [
  {
    icon: '🩸',
    title: 'Piles / Hemorrhoids',
    text: 'Gentle, effective treatment for hemorrhoids and anal fissures without surgery.',
  },
  {
    icon: '🧴',
    title: 'Skin Disorders',
    text: 'Comprehensive care for eczema, psoriasis, acne, and chronic skin conditions.',
  },
  {
    icon: '🤢',
    title: 'Digestive Issues',
    text: 'Root-cause treatment for IBS, acidity, constipation, and gut health.',
  },
  {
    icon: '💨',
    title: 'Respiratory Problems',
    text: 'Natural relief for asthma, allergies, chronic cough, and sinus issues.',
  },
  {
    icon: '⚡',
    title: 'Chronic Fatigue & Stress',
    text: 'Holistic approach to energy restoration and mental wellness.',
  },
  {
    icon: '👩‍⚕️',
    title: "Women's Health",
    text: 'PCOS, menstrual disorders, menopause, and reproductive health support.',
  },
  {
    icon: '👶',
    title: "Children's Health",
    text: 'Safe, gentle remedies for common childhood ailments and growth support.',
  },
  {
    icon: '🦴',
    title: 'Joint Pain & Arthritis',
    text: 'Long-term relief from arthritis, joint stiffness, and musculoskeletal pain.',
  },
]

const BEYOND_CLINIC = [
  {
    icon: '🥗',
    title: 'Diploma in Nutrition — Diet & Body Transformation',
    text: "Food is medicine — and the right diet is the foundation of every transformation. Holding a Diploma in Nutrition, Dr. Singada designs precise, science-backed diet plans for weight loss, weight gain, and muscle building. Every plan is tailored to your body type, metabolism, and goals — not a generic chart, but a structured nutritional roadmap that actually works.",
  },
  {
    icon: '🏋️',
    title: 'Diploma in Personal Training — Scientific Muscle Building',
    text: 'Building a strong body is a science, not guesswork. With a Diploma in Personal Training, Dr. Singada brings precise knowledge of exercise physiology, progressive overload, recovery, and periodisation — a structured, evidence-based workout plan engineered to build muscle, strength, and performance the right way.',
  },
  {
    icon: '🏆',
    title: 'AAS Cycle Master Class — Competition & Hormonal Health',
    text: 'For serious athletes and competitive bodybuilders, Dr. Singada has completed a certified Anabolic Androgenic Steroid Cycle Master Class — providing in-depth, expert-level guidance on structuring cycles for peak competition performance while protecting long-term hormonal health.',
  },
]

const CLINIC_PHONE = import.meta.env.VITE_CLINIC_PHONE || '+917990131841'

export default function Conditions() {
  return (
    <>
      {/* Conditions We Treat Section */}
      <section id="conditions" className="max-w-7xl mx-auto px-6 py-16 md:py-24">
        <div className="text-center mb-12">
          <p className="section-eyebrow">Expert Homeopathic Care</p>
          <h2 className="section-heading">Conditions We Treat</h2>
          <div className="section-underline mx-auto" />
          <p className="text-charcoal/70 max-w-2xl mx-auto mt-4">
            Expert homeopathic treatment for chronic conditions and systemic health concerns
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CONDITIONS_TREATED.map((condition) => (
            <div
              key={condition.title}
              className="bg-white/70 border border-cream-dark rounded-xl2 p-6 hover:shadow-md hover:border-clay/30 transition-all group cursor-default"
            >
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">
                {condition.icon}
              </div>
              <h3 className="font-display font-bold text-charcoal mb-2">
                {condition.title}
              </h3>
              <p className="text-charcoal/70 text-sm leading-relaxed">
                {condition.text}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <a href={`tel:${CLINIC_PHONE}`} className="btn-primary">
            📞 Book a Consultation
          </a>
        </div>
      </section>

      {/* Beyond the Clinic Section */}
      <section className="bg-gradient-to-b from-cream to-white max-w-7xl mx-auto px-6 py-16 md:py-24">
        <div className="text-center mb-12">
          <p className="section-eyebrow">Beyond the Clinic — Fitness & Performance</p>
          <h2 className="section-heading">Specialized Expertise</h2>
          <div className="section-underline mx-auto" />
        </div>

        <div className="grid gap-6 mt-8">
          {BEYOND_CLINIC.map((item) => (
            <div
              key={item.title}
              className="card flex gap-4 items-start hover:shadow-md hover:border-clay/30 transition-all"
            >
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-clay to-clay-dark flex items-center justify-center text-xl shrink-0 text-white">
                {item.icon}
              </div>
              <div>
                <h3 className="font-display font-bold mb-2 text-charcoal">
                  {item.title}
                </h3>
                <p className="text-charcoal/70 text-sm leading-relaxed">
                  {item.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
