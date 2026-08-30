import { useState } from 'react'

const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Conditions', href: '#conditions' },
  { label: 'Why Homeopathy', href: '#why-homeopathy' },
  { label: 'Testimonials', href: '#testimonials' },
  { label: 'Appointment', href: '#appointment' },
  { label: 'Contact', href: '#contact' },
]

const CLINIC_PHONE = import.meta.env.VITE_CLINIC_PHONE || '+917990131841'

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-cream/95 backdrop-blur-md border-b border-cream-dark/50 shadow-sm">
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        <a href="#top" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-clay to-clay-dark flex items-center justify-center overflow-hidden text-white font-display font-bold text-lg hover:shadow-lg transition-shadow">
            Dr
          </div>
          <div>
            <p className="font-display font-bold text-lg leading-tight text-charcoal">
              Sanjivani
            </p>
            <p className="text-xs text-charcoal/60 -mt-0.5">Classical Homeopathy</p>
          </div>
        </a>

        <div className="hidden lg:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-charcoal/80 hover:text-clay-dark hover:font-semibold transition-all relative group"
            >
              {link.label}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-clay group-hover:w-full transition-all duration-300" />
            </a>
          ))}
        </div>

        <a href={`tel:${CLINIC_PHONE}`} className="hidden sm:inline-flex btn-primary text-sm hover:shadow-lg">
          📞 Call Now
        </a>

        <button
          className="lg:hidden p-2 hover:bg-clay/10 rounded-lg transition-colors"
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
        >
          <MenuIcon />
        </button>
      </nav>

      {open && (
        <div className="lg:hidden px-6 pb-4 flex flex-col gap-3 bg-cream border-t border-cream-dark/30 animate-fadeIn">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="text-sm font-medium text-charcoal/80 py-2 px-3 rounded-lg hover:bg-clay/10 hover:text-clay-dark transition-all"
            >
              {link.label}
            </a>
          ))}
          <a href={`tel:${CLINIC_PHONE}`} className="btn-primary text-sm w-fit mt-2">
            📞 Call Now
          </a>
        </div>
      )}
    </header>
  )
}

function PhoneIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  )
}

function MenuIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  )
}
