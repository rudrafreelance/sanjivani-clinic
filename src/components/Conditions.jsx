const SPECIALTIES = [
  {
    title: 'Homeopathy',
    text: 'Gentle, classical remedies that treat the person as a whole.',
    icon: (
      <svg viewBox="0 0 48 48" className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M18 28c0-6 4-12 6-16 2 4 6 10 6 16 0 5-3 8-6 8s-6-3-6-8z" />
        <path d="M16 22c-3 1-6 4-6 8 0 5 4 9 8 9" />
        <path d="M32 22c3 1 6 4 6 8 0 5-4 9-8 9" />
      </svg>
    ),
  },
  {
    title: 'Kidney Stone Specialist',
    text: 'Natural support to dissolve stones and protect kidney health.',
    icon: (
      <svg viewBox="0 0 48 48" className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M30 9c7 2 11 11 9 20-2 10-10 16-18 14-5-1-8-7-5-13 1-3 4-5 5-8 1-5 3-11 9-13z" />
        <path d="M27 18c-2 3-4 7-4 12" />
        <path d="M30 22c-2 3-3 7-3 11" />
        <circle cx="22" cy="28" r="2.2" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    title: "Women's Health",
    text: 'PCOS, fertility, menstrual health, and gynaecological care.',
    icon: (
      <svg viewBox="0 0 48 48" className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth="1.6">
        <circle cx="24" cy="16" r="6" />
        <path d="M14 36c1-8 5-12 10-12s9 4 10 12" />
        <path d="M12 22c4-2 7-1 10 2" />
        <path d="M36 22c-4-2-7-1-10 2" />
      </svg>
    ),
  },
  {
    title: 'Digestive Care',
    text: 'Root-cause treatment for IBS, acidity, and gut imbalance.',
    icon: (
      <svg viewBox="0 0 48 48" className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M22 8v7" />
        <path d="M16 16c-7 3-8 12-3 18 4 5 12 7 18 4 6-3 9-10 6-16-2-5-8-8-14-5 1-4 5-7 10-6" />
        <path d="M37 34c2 3 2 6 0 8" />
      </svg>
    ),
  },
  {
    title: 'Skin & Hair Care',
    text: 'Eczema, psoriasis, acne, hair fall, and chronic skin issues.',
    icon: (
      <svg viewBox="0 0 48 48" className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M24 38c-8-4-10-12-8-20 6 2 10 8 8 20z" />
        <path d="M24 18c2-6 8-10 12-10-1 7-6 12-12 14" />
        <circle cx="28" cy="14" r="1.2" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    title: 'Nutrition & Wellness',
    text: 'Personalised diet plans for energy, weight, and vitality.',
    icon: (
      <svg viewBox="0 0 48 48" className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M10 22h28c0 10-6 16-14 16s-14-6-14-16z" />
        <path d="M12 22c1-7 5-12 12-12s11 5 12 12" />
        <path d="M18 16c0-4 2-7 4-8" />
        <path d="M26 15c1-3 3-5 6-6" />
        <path d="M20 26c1 3 3 5 4 5s3-2 4-5" />
      </svg>
    ),
  },
]

const CONDITIONS_TREATED = [
  {
    title: 'Piles / Hemorrhoids',
    text: 'Gentle, effective treatment for hemorrhoids and anal fissures without surgery.',
  },
  {
    title: 'Skin Disorders',
    text: 'Comprehensive care for eczema, psoriasis, acne, and chronic skin conditions.',
  },
  {
    title: 'Digestive Issues',
    text: 'Root-cause treatment for IBS, acidity, constipation, and gut health.',
  },
  {
    title: 'Kidney Stones',
    text: 'Homeopathic support to manage stones and reduce the chance of recurrence.',
  },
  {
    title: "Women's Health",
    text: 'PCOS, menstrual disorders, menopause, and reproductive health support.',
  },
  {
    title: "Children's Health",
    text: 'Safe, gentle remedies for common childhood ailments and growth support.',
  },
  {
    title: 'Joint Pain & Arthritis',
    text: 'Long-term relief from arthritis, joint stiffness, and musculoskeletal pain.',
  },
  {
    title: 'Respiratory Problems',
    text: 'Natural relief for asthma, allergies, chronic cough, and sinus issues.',
  },
]

const BEYOND_CLINIC = [
  {
    title: 'Diploma in Nutrition — Diet & Body Transformation',
    text: "Food is medicine — and the right diet is the foundation of every transformation. Holding a Diploma in Nutrition, Dr. Singada designs precise, science-backed diet plans for weight loss, weight gain, and muscle building. Every plan is tailored to your body type, metabolism, and goals — not a generic chart, but a structured nutritional roadmap that actually works.",
  },
  {
    title: 'Diploma in Personal Training — Scientific Muscle Building',
    text: 'Building a strong body is a science, not guesswork. With a Diploma in Personal Training, Dr. Singada brings precise knowledge of exercise physiology, progressive overload, recovery, and periodisation — a structured, evidence-based workout plan engineered to build muscle, strength, and performance the right way.',
  },
  {
    title: 'AAS Cycle Master Class — Competition & Hormonal Health',
    text: 'For serious athletes and competitive bodybuilders, Dr. Singada has completed a certified Anabolic Androgenic Steroid Cycle Master Class — providing in-depth, expert-level guidance on structuring cycles for peak competition performance while protecting long-term hormonal health.',
  },
]

const CLINIC_PHONE = import.meta.env.VITE_CLINIC_PHONE || '+917990131841'

export default function Conditions() {
  return (
    <>
      <section id="conditions" className="max-w-7xl mx-auto px-6 py-16 md:py-24">
        <div className="text-center mb-12">
          <p className="section-eyebrow">Our Specialties</p>
          <h2 className="section-heading">Healing Across Every Need</h2>
          <div className="section-underline mx-auto" />
          <p className="text-charcoal/70 max-w-2xl mx-auto mt-4">
            The same six pillars shown on our emblem — natural care, delivered personally.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5 mb-16">
          {SPECIALTIES.map((item) => (
            <div
              key={item.title}
              className="flex flex-col items-center text-center gap-3 group"
            >
              <div className="w-[4.5rem] h-[4.5rem] rounded-full border border-forest/70 text-forest flex items-center justify-center bg-white group-hover:border-gold group-hover:text-leaf group-hover:-translate-y-1 group-hover:shadow-md transition-all duration-300">
                {item.icon}
              </div>
              <h3 className="font-display font-bold text-forest text-sm leading-snug">{item.title}</h3>
              <p className="text-charcoal/60 text-xs leading-relaxed hidden sm:block">{item.text}</p>
            </div>
          ))}
        </div>

        <div className="text-center mb-12">
          <p className="section-eyebrow">Expert Homeopathic Care</p>
          <h2 className="section-heading">Conditions We Treat</h2>
          <div className="section-underline mx-auto" />
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CONDITIONS_TREATED.map((condition) => (
            <div
              key={condition.title}
              className="bg-white/80 border border-cream-dark rounded-xl2 p-6 card-lift hover:border-gold/40"
            >
              <div className="w-8 h-[2px] bg-gold mb-4" />
              <h3 className="font-display font-bold text-forest mb-2">
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
            Book a Consultation
          </a>
        </div>
      </section>

      <section className="bg-gradient-to-b from-cream to-white max-w-7xl mx-auto px-6 py-16 md:py-24">
        <div className="text-center mb-12">
          <p className="section-eyebrow">Beyond the Clinic — Fitness & Performance</p>
          <h2 className="section-heading">Specialized Expertise</h2>
          <div className="section-underline mx-auto" />
        </div>

        <div className="grid gap-6 mt-8">
          {BEYOND_CLINIC.map((item, idx) => (
            <div
              key={item.title}
              className="card flex gap-4 items-start card-lift hover:border-gold/40"
            >
              <div className="w-12 h-12 rounded-full border border-gold text-gold flex items-center justify-center font-display font-bold shrink-0">
                {String(idx + 1).padStart(2, '0')}
              </div>
              <div>
                <h3 className="font-display font-bold mb-2 text-forest">
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
