import { useState } from 'react'
import { supabase } from '../lib/supabase'

const initialForm = { name: '', phone: '', condition: '', preferred_date: '', message: '' }

export default function Appointment() {
  const [form, setForm] = useState(initialForm)
  const [status, setStatus] = useState('idle') // idle | saving | success | error

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('saving')
    const { error } = await supabase.from('appointments').insert([form])
    if (error) {
      console.error(error)
      setStatus('error')
      return
    }
    setStatus('success')
    setForm(initialForm)
  }

  return (
    <section id="appointment" className="bg-gradient-to-b from-white to-cream max-w-7xl mx-auto px-6 py-16 md:py-24">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div className="order-2 md:order-1">
          <p className="section-eyebrow mb-2">Book a Visit</p>
          <h2 className="section-heading mb-2">Schedule Your Appointment</h2>
          <div className="section-underline mb-6" />
          <p className="text-charcoal/70 max-w-md leading-relaxed mb-8">
            Tell us a little about your condition and preferred time — Dr. Singada&apos;s
            team will call you back to confirm your slot.
          </p>
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-charcoal/70">
              <span className="text-2xl">✓</span>
              <span>Quick confirmation via phone call</span>
            </div>
            <div className="flex items-center gap-3 text-charcoal/70">
              <span className="text-2xl">✓</span>
              <span>Personalized consultation time</span>
            </div>
            <div className="flex items-center gap-3 text-charcoal/70">
              <span className="text-2xl">✓</span>
              <span>Convenient appointment scheduling</span>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="card space-y-4 order-1 md:order-2 hover:shadow-lg transition-shadow">
          <h3 className="font-display font-bold text-charcoal mb-4">Your Details</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            <input
              required
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Full name"
              className="w-full px-4 py-3 rounded-xl border border-cream-dark bg-white focus:outline-none focus:ring-2 focus:ring-clay transition-all"
            />
            <input
              required
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="Phone number"
              type="tel"
              className="w-full px-4 py-3 rounded-xl border border-cream-dark bg-white focus:outline-none focus:ring-2 focus:ring-clay transition-all"
            />
          </div>

          <input
            name="condition"
            value={form.condition}
            onChange={handleChange}
            placeholder="Condition / reason for visit"
            className="w-full px-4 py-3 rounded-xl border border-cream-dark bg-white focus:outline-none focus:ring-2 focus:ring-clay transition-all"
          />

          <input
            name="preferred_date"
            value={form.preferred_date}
            onChange={handleChange}
            type="date"
            className="w-full px-4 py-3 rounded-xl border border-cream-dark bg-white focus:outline-none focus:ring-2 focus:ring-clay transition-all"
          />

          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            placeholder="Anything else you'd like us to know?"
            rows={3}
            className="w-full px-4 py-3 rounded-xl border border-cream-dark bg-white focus:outline-none focus:ring-2 focus:ring-clay transition-all"
          />

          <button type="submit" disabled={status === 'saving'} className="btn-primary w-full justify-center disabled:opacity-60 hover:scale-105 transition-transform">
            {status === 'saving' ? '⏳ Sending…' : '📅 Request Appointment'}
          </button>

          {status === 'success' && (
            <div className="bg-green-50 border border-green-200 rounded-xl p-3 text-green-700 text-sm">
              ✓ Thanks! We&apos;ll call you shortly to confirm.
            </div>
          )}
          {status === 'error' && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-3 text-red-600 text-sm">
              ✕ Something went wrong. Please call us directly instead.
            </div>
          )}
        </form>
      </div>
    </section>
  )
}
