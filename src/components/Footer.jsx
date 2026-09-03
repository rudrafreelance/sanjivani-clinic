import Logo from './Logo'

const CLINIC_PHONE = import.meta.env.VITE_CLINIC_PHONE || '+917990131841'

export default function Footer() {
  return (
    <footer className="bg-forest text-cream/70 py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-8 mb-8 pb-8 border-b border-gold/25">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Logo size={48} />
              <div>
                <p className="font-display font-bold text-cream tracking-wide">SANJIVANI</p>
                <p className="text-[10px] text-gold tracking-[0.32em] font-semibold">CLINIC</p>
              </div>
            </div>
            <p className="text-sm text-cream/70 mb-3">Healing naturally, caring personally.</p>
            <p className="text-sm text-cream/60">
              Guided by Dr. Jignesh B. Singada — Homeopath &amp; Nutritionist, Godhra.
            </p>
          </div>

          <div>
            <p className="font-semibold text-cream mb-4">Quick Links</p>
            <div className="space-y-2 text-sm">
              <a href="#about" className="block hover:text-gold transition-colors">About Dr. Singada</a>
              <a href="#conditions" className="block hover:text-gold transition-colors">Conditions Treated</a>
              <a href="#testimonials" className="block hover:text-gold transition-colors">Patient Reviews</a>
              <a href="#appointment" className="block hover:text-gold transition-colors">Book Appointment</a>
            </div>
          </div>

          <div>
            <p className="font-semibold text-cream mb-4">Contact</p>
            <div className="space-y-3 text-sm">
              <p>
                <a href={`tel:${CLINIC_PHONE}`} className="hover:text-gold transition-colors">
                  {CLINIC_PHONE.replace('+91', '0')}
                </a>
              </p>
              <p>
                Kanelav, Bamroli Rd, opp. PLAZMA SCHOOL, VAVDI<br />
                Godhra, Gujarat 389001
              </p>
              <p>Open Daily · 10:00 AM to 7:30 PM</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center text-xs text-cream/50 gap-4">
          <p>© {new Date().getFullYear()} Sanjivani Clinic. All rights reserved.</p>
          <p className="text-gold/80 tracking-widest uppercase">Godhra</p>
        </div>
      </div>
    </footer>
  )
}
