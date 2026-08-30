const CLINIC_PHONE = import.meta.env.VITE_CLINIC_PHONE || '+917990131841'

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-charcoal to-charcoal/95 text-cream/70 py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-8 mb-8 pb-8 border-b border-white/10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-clay to-clay-dark flex items-center justify-center text-white font-display font-bold">
                Dr
              </div>
              <div>
                <p className="font-display font-bold text-cream">Sanjivani Clinic</p>
                <p className="text-xs text-cream/50">Classical Homeopathy</p>
              </div>
            </div>
            <p className="text-sm text-cream/60">Healing with nature&apos;s wisdom under the guidance of Dr. Jignesh Singada.</p>
          </div>

          {/* Quick Links */}
          <div>
            <p className="font-semibold text-cream mb-4">Quick Links</p>
            <div className="space-y-2 text-sm">
              <a href="#about" className="block hover:text-cream transition-colors">About Dr. Singada</a>
              <a href="#conditions" className="block hover:text-cream transition-colors">Conditions Treated</a>
              <a href="#testimonials" className="block hover:text-cream transition-colors">Patient Reviews</a>
              <a href="#appointment" className="block hover:text-cream transition-colors">Book Appointment</a>
            </div>
          </div>

          {/* Contact */}
          <div>
            <p className="font-semibold text-cream mb-4">Contact</p>
            <div className="space-y-3 text-sm">
              <p className="flex items-center gap-2">
                <span>📞</span>
                <a href={`tel:${CLINIC_PHONE}`} className="hover:text-cream transition-colors">
                  {CLINIC_PHONE.replace('+91', '0')}
                </a>
              </p>
              <p className="flex items-start gap-2">
                <span>📍</span>
                <span>Kanelav, Bamroli Rd, opp. PLAZMA SCHOOL, VAVDI<br />Godhra, Gujarat 389001</span>
              </p>
              <p className="flex items-center gap-2">
                <span>🕐</span>
                <span>Open Daily • Closes 7:30 PM</span>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col sm:flex-row justify-between items-center text-xs text-cream/50 gap-4">
          <p>© {new Date().getFullYear()} Sanjivani Clinic. All rights reserved.</p>
          <p>Made with 💚 for healing</p>
        </div>
      </div>
    </footer>
  )
}
