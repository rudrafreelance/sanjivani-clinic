import { useState } from 'react'
import { supabase } from '../lib/supabase'

const CLINIC_PHONE = import.meta.env.VITE_CLINIC_PHONE || '+917990131841'
const initialForm = { name: '', email: '', message: '' }

export default function Contact() {
  const [form, setForm] = useState(initialForm)
  const [status, setStatus] = useState('idle')

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('saving')
    const { error } = await supabase.from('contact_messages').insert([form])
    if (error) {
      console.error(error)
      setStatus('error')
      return
    }
    setStatus('success')
    setForm(initialForm)
  }

  return (
    <section id="contact" className="bg-gradient-to-b from-sage/50 to-cream py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12">
        <div>
          <p className="section-eyebrow mb-2">Get in Touch</p>
          <h2 className="section-heading mb-2">Contact Sanjivani Clinic</h2>
          <div className="section-underline mb-8" />

          <div className="space-y-5 mb-12">
            <div className="flex items-start gap-4">
              <span className="text-3xl">📞</span>
              <div>
                <p className="text-sm text-charcoal/60 font-medium">Call Us</p>
                <a href={`tel:${CLINIC_PHONE}`} className="text-lg font-semibold text-forest hover:text-leaf transition-colors">
                  {CLINIC_PHONE.replace('+91', '0')}
                </a>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <span className="text-3xl">📍</span>
              <div>
                <p className="text-sm text-charcoal/60 font-medium">Location</p>
                <p className="font-semibold text-charcoal mb-1">Kanelav, Bamroli Rd</p>
                <p className="text-sm text-charcoal/70 mb-2">opp. PLAZMA SCHOOL, VAVDI</p>
                <p className="text-sm text-charcoal/70 mb-2">Godhra, Gujarat 389001</p>
                <a 
                  href="https://maps.app.goo.gl/2TyUnzLqo5wrRG1o8?g_st=ac" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gold-dark hover:text-forest font-medium transition-colors inline-block mt-2"
                >
                  🗺️ Get Directions
                </a>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <span className="text-3xl">🕐</span>
              <div>
                <p className="text-sm text-charcoal/60 font-medium">Hours</p>
                <p className="font-semibold text-charcoal">Open Daily • Closes 7:30 PM</p>
              </div>
            </div>
          </div>

          <div className="mt-8 rounded-xl2 overflow-hidden border border-gold/30 aspect-video bg-sage shadow-md">
            <iframe
              title="Sanjivani Clinic, Godhra"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen=""
              referrerPolicy="no-referrer-when-downgrade"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1478!2d73.6143!3d22.7788!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39609b910b4bb229%3A0xcc5e21a1f9b05b07!2sSanjivani%20Clinic%2C%20Kanelav%2C%20Bamroli%20Rd%2C%20VAVDI%2C%20Godhra!5e0!3m2!1sen!2sin!4v1725340800000"
            />
          </div>
        </div>

        <form onSubmit={handleSubmit} className="card space-y-4 self-start card-lift">
          <h3 className="font-display font-bold text-charcoal mb-4">Send us a Message</h3>
          <input
            required
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Your name"
            className="w-full px-4 py-3 rounded-xl border border-cream-dark bg-white focus:outline-none focus:ring-2 focus:ring-clay transition-all"
          />
          <input
            required
            name="email"
            value={form.email}
            onChange={handleChange}
            type="email"
            placeholder="Your email"
            className="w-full px-4 py-3 rounded-xl border border-cream-dark bg-white focus:outline-none focus:ring-2 focus:ring-clay transition-all"
          />
          <textarea
            required
            name="message"
            value={form.message}
            onChange={handleChange}
            placeholder="Your message"
            rows={4}
            className="w-full px-4 py-3 rounded-xl border border-cream-dark bg-white focus:outline-none focus:ring-2 focus:ring-clay transition-all"
          />
          <button type="submit" disabled={status === 'saving'} className="btn-primary w-full justify-center disabled:opacity-60 hover:scale-105 transition-transform">
            {status === 'saving' ? '⏳ Sending…' : '✉️ Send Message'}
          </button>
          {status === 'success' && (
            <div className="bg-green-50 border border-green-200 rounded-xl p-3 text-green-700 text-sm">
              ✓ Message sent — we&apos;ll get back to you soon.
            </div>
          )}
          {status === 'error' && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-3 text-red-600 text-sm">
              ✕ Something went wrong. Please try again.
            </div>
          )}
        </form>
      </div>
    </section>
  )
}
