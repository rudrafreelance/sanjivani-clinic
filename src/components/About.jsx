export default function About() {
  return (
    <section id="about" className="bg-gradient-to-b from-white to-cream max-w-7xl mx-auto px-6 py-16 md:py-24">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div className="flex justify-center">
          <img
            src="/dr-jignesh-singada.jpg"
            alt="Dr. Jignesh B. Singada — Homeopath & Nutritionist, Sanjivani Clinic Godhra"
            className="w-full max-w-md aspect-[3/4] object-cover object-top rounded-xl2 shadow-[0_12px_40px_rgba(28,74,54,0.16)] ring-1 ring-gold/30"
          />
        </div>
        <div>
          <p className="section-eyebrow mb-2">Meet Our Expert</p>
          <h2 className="section-heading mb-2">About Dr. Jignesh B. Singada</h2>
          <div className="section-underline mb-3" />
          <p className="text-sm font-semibold tracking-wide text-gold-dark mb-6">
            PGDEMS, CCH, CGO, CSVD · Homeopath &amp; Nutritionist · Godhra
          </p>
          <p className="text-charcoal/70 mb-4 leading-relaxed">
            Dr. Jignesh B. Singada is a highly knowledgeable and trustworthy homeopathic
            doctor practicing classical homeopathy in Godhra, Gujarat. Known for his
            attentive listening and patient-centric approach, he has earned the trust
            of patients seeking lasting, natural solutions for chronic and complex
            health conditions.
          </p>
          <p className="text-charcoal/70 mb-6 leading-relaxed">
            A certified practitioner with a specialisation course in{' '}
            <strong>Gynaecology in Homeopathy</strong>, Dr. Singada treats a wide
            spectrum of conditions — from skin disorders and piles to kidney stones
            and infertility — helping patients avoid surgery and reclaim their health
            through the gentle power of nature.
          </p>
          <blockquote className="border-l-4 border-gold bg-leaf-light/50 rounded-r-xl2 p-6 italic text-charcoal/80 hover:shadow-md transition-shadow">
            &ldquo;Ignoring piles can silently affect your daily routine and quality of
            life. With timely homeopathic treatment, symptoms are managed at the root —
            no surgery, no side effects. At Sanjivani Clinic, lasting relief is
            possible.&rdquo;
            <footer className="mt-4 not-italic text-sm text-forest font-semibold">
              — Dr. Jignesh B. Singada, on Piles Treatment
            </footer>
          </blockquote>
        </div>
      </div>
    </section>
  )
}
