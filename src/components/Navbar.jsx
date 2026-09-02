import { useEffect, useState } from 'react'
import Logo from './Logo'

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
  const [active, setActive] = useState('')

  useEffect(() => {
    const ids = NAV_LINKS.map((link) => link.href.slice(1))

    const updateActive = () => {
      const offset = 120
      let current = ''

      for (const id of ids) {
        const el = document.getElementById(id)
        if (!el) continue
        if (el.getBoundingClientRect().top - offset <= 0) {
          current = `#${id}`
        }
      }

      if (window.scrollY < 80) current = ''
      setActive(current)
    }

    updateActive()
    window.addEventListener('scroll', updateActive, { passive: true })
    window.addEventListener('hashchange', updateActive)
    return () => {
      window.removeEventListener('scroll', updateActive)
      window.removeEventListener('hashchange', updateActive)
    }
  }, [])

  const linkClass = (href, mobile = false) => {
    const isActive = active === href
    if (mobile) {
      return `text-sm py-2 px-3 rounded-lg transition-all ${
        isActive
          ? 'bg-leaf-light text-forest font-semibold'
          : 'font-medium text-charcoal/80 hover:bg-leaf-light hover:text-forest'
      }`
    }
    return `text-sm relative group pb-1 transition-all ${
      isActive
        ? 'text-forest font-semibold'
        : 'font-medium text-charcoal/80 hover:text-forest'
    }`
  }

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gold/20 shadow-sm animate-navDrop">
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
        <a href="#top" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
          <Logo size={52} />
          <div>
            <p className="font-display font-bold text-lg leading-tight text-forest tracking-wide">
              SANJIVANI
            </p>
            <p className="text-[10px] text-gold tracking-[0.35em] font-semibold -mt-0.5">
              CLINIC
            </p>
          </div>
        </a>

        <div className="hidden lg:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              aria-current={active === link.href ? 'true' : undefined}
              className={linkClass(link.href)}
            >
              {link.label}
              <span
                className={`absolute bottom-0 left-0 h-0.5 bg-gold transition-all duration-300 ${
                  active === link.href ? 'w-full' : 'w-0 group-hover:w-full'
                }`}
              />
            </a>
          ))}
        </div>

        <a href={`tel:${CLINIC_PHONE}`} className="hidden sm:inline-flex btn-primary text-sm hover:shadow-lg">
          Call Now
        </a>

        <button
          className="lg:hidden p-2 hover:bg-leaf-light rounded-lg transition-colors text-forest"
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
        >
          <MenuIcon />
        </button>
      </nav>

      {open && (
        <div className="lg:hidden px-6 pb-4 flex flex-col gap-3 bg-white border-t border-gold/20 animate-fadeIn">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              aria-current={active === link.href ? 'true' : undefined}
              onClick={() => setOpen(false)}
              className={linkClass(link.href, true)}
            >
              {link.label}
            </a>
          ))}
          <a href={`tel:${CLINIC_PHONE}`} className="btn-primary text-sm w-fit mt-2">
            Call Now
          </a>
        </div>
      )}
    </header>
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
