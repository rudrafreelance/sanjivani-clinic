import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import { notifyAdminWhatsApp } from '../lib/notifyAdmin'
import { TIME_SLOTS, normalizeSlot, todayISODate } from '../lib/timeSlots'

const initialForm = { name: '', phone: '', condition: '', preferred_date: '', preferred_time: '', message: '' }

export default function Appointment() {
  const [form, setForm] = useState({ ...initialForm, preferred_date: todayISODate() })
  const [status, setStatus] = useState('idle') // idle | saving | success | error | slot_taken
  const [bookedTimes, setBookedTimes] = useState([])

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((f) => ({
      ...f,
      [name]: value,
      ...(name === 'preferred_date' ? { preferred_time: '' } : {}),
    }))
  }

  useEffect(() => {
    if (!form.preferred_date) {
      setBookedTimes([])
      return
    }
    let cancelled = false
    ;(async () => {
      const { data, error } = await supabase.rpc('get_booked_times', { p_date: form.preferred_date })
      if (cancelled) return
      if (error) {
        console.error(error)
        setBookedTimes([])
        return
      }
      setBookedTimes((data || []).map(normalizeSlot))
    })()
    return () => { cancelled = true }
  }, [form.preferred_date])

  const isBooked = (slot) => bookedTimes.includes(slot)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.preferred_date || !form.preferred_time) {
      setStatus('error')
      return
    }
    if (isBooked(form.preferred_time)) {
      setStatus('slot_taken')
      return
    }
    setStatus('saving')
    const { error } = await supabase.from('appointments').insert([{ ...form, status: 'pending' }])
    if (error) {
      console.error(error)
      setStatus(error.code === '23505' ? 'slot_taken' : 'error')
      return
    }
    setStatus('success')
    notifyAdminWhatsApp('appointment', form)
    setForm({ ...initialForm, preferred_date: todayISODate() })
    setBookedTimes((t) => [...t, form.preferred_time])
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

          <div className="mb-8 max-w-md rounded-xl2 border border-gold/40 bg-white px-5 py-4">
            <p className="text-xs tracking-[0.2em] uppercase text-gold-dark font-semibold mb-1">
              Consultation Charge
            </p>
            <p className="font-display text-3xl font-normal text-forest leading-tight">
              <span className="font-bold">₹</span>500<span className="text-lg font-normal text-charcoal/50">/-</span>
            </p>
            <p className="text-sm text-charcoal/60 mt-1">Per consultation</p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-3 text-charcoal/70">
              <span className="text-leaf">✓</span>
              <span>Quick confirmation via phone call</span>
            </div>
            <div className="flex items-center gap-3 text-charcoal/70">
              <span className="text-leaf">✓</span>
              <span>Personalized consultation time</span>
            </div>
            <div className="flex items-center gap-3 text-charcoal/70">
              <span className="text-leaf">✓</span>
              <span>Convenient appointment scheduling</span>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="card space-y-4 order-1 md:order-2 card-lift">
          <div className="flex items-start justify-between gap-4 mb-4">
            <h3 className="font-display font-bold text-forest">Your Details</h3>
            <p className="text-sm text-gold-dark font-semibold whitespace-nowrap">
              Fee ₹500/-
            </p>
          </div>
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
            required
            name="preferred_date"
            value={form.preferred_date}
            onChange={handleChange}
            type="date"
            min={todayISODate()}
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

          <div>
            <p className="text-xs tracking-[0.18em] uppercase text-gold-dark font-semibold mb-3">
              Pick a Time Slot
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {TIME_SLOTS.map((slot) => {
                const taken = isBooked(slot)
                const selected = form.preferred_time === slot
                return (
                  <button
                    key={slot}
                    type="button"
                    disabled={taken}
                    onClick={() => setForm((f) => ({ ...f, preferred_time: slot }))}
                    className={`py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 border ${
                      taken
                        ? 'bg-cream text-charcoal/35 border-cream-dark cursor-not-allowed line-through'
                        : selected
                          ? 'bg-forest text-white border-forest shadow-md scale-105'
                          : 'bg-white text-charcoal/70 border-cream-dark hover:border-gold hover:text-forest hover:shadow-sm'
                    }`}
                    title={taken ? 'Already booked' : undefined}
                  >
                    {taken ? `${slot} · Booked` : slot}
                  </button>
                )
              })}
            </div>
          </div>

          <button type="submit" disabled={status === 'saving'} className="btn-primary w-full justify-center disabled:opacity-60 hover:scale-105 transition-transform">
            {status === 'saving' ? 'Sending…' : 'Request Appointment'}
          </button>

          {status === 'success' && (
            <div className="bg-green-50 border border-green-200 rounded-xl p-3 text-green-700 text-sm">
              ✓ Thanks! We&apos;ll call you shortly to confirm.
            </div>
          )}
          {status === 'slot_taken' && (
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-amber-800 text-sm">
              That slot was just taken — please pick another time.
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
