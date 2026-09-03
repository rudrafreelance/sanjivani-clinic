import { useEffect, useState } from 'react'
import { supabase } from '../../../lib/supabase'
import { TIME_SLOTS, normalizeSlot, todayISODate } from '../../../lib/timeSlots'

const emptyBook = { name: '', phone: '', condition: '', message: '' }

export default function AppointmentsManager() {
  const [date, setDate] = useState(todayISODate())
  const [dayRows, setDayRows] = useState([])
  const [allPending, setAllPending] = useState([])
  const [selectedSlot, setSelectedSlot] = useState(null)
  const [bookForm, setBookForm] = useState(emptyBook)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const load = async () => {
    const [dayRes, pendingRes] = await Promise.all([
      supabase
        .from('appointments')
        .select('*')
        .eq('preferred_date', date)
        .in('status', ['pending', 'booked'])
        .order('preferred_time'),
      supabase
        .from('appointments')
        .select('*')
        .eq('status', 'pending')
        .order('created_at', { ascending: false }),
    ])
    setDayRows(dayRes.data || [])
    setAllPending(pendingRes.data || [])
  }

  useEffect(() => {
    load()
  }, [date])

  const bookingForSlot = (slot) =>
    dayRows.find((r) => normalizeSlot(r.preferred_time) === slot)

  const openBook = (slot) => {
    setError('')
    setSelectedSlot(slot)
    setBookForm(emptyBook)
  }

  const bookSlot = async (e) => {
    e.preventDefault()
    if (!selectedSlot) return
    setSaving(true)
    setError('')
    const { error: insertError } = await supabase.from('appointments').insert([
      {
        name: bookForm.name.trim(),
        phone: bookForm.phone.trim(),
        condition: bookForm.condition.trim() || null,
        message: bookForm.message.trim() || null,
        preferred_date: date,
        preferred_time: selectedSlot,
        status: 'booked',
      },
    ])
    setSaving(false)
    if (insertError) {
      setError(insertError.code === '23505' ? 'This slot is already booked.' : insertError.message)
      return
    }
    setSelectedSlot(null)
    setBookForm(emptyBook)
    load()
  }

  const setStatus = async (id, status) => {
    await supabase.from('appointments').update({ status }).eq('id', id)
    if (selectedSlot && bookingForSlot(selectedSlot)?.id === id) {
      setSelectedSlot(null)
    }
    load()
  }

  return (
    <div className="space-y-10">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h3 className="font-display font-bold text-charcoal text-lg">Today&apos;s slots</h3>
          <p className="text-sm text-charcoal/55 mt-1">
            Book walk-ins, confirm requests, or free a cancelled slot.
          </p>
        </div>
        <div>
          <label className="block text-xs font-semibold text-charcoal/60 mb-1.5 uppercase tracking-wide">
            Date
          </label>
          <input
            type="date"
            value={date}
            onChange={(e) => {
              setSelectedSlot(null)
              setDate(e.target.value)
            }}
            className="px-4 py-2.5 rounded-lg border border-cream-dark bg-white focus:outline-none focus:ring-2 focus:ring-clay"
          />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {TIME_SLOTS.map((slot) => {
          const booking = bookingForSlot(slot)
          const isSelected = selectedSlot === slot && !booking
          return (
            <button
              key={slot}
              type="button"
              onClick={() => (booking ? setSelectedSlot(slot) : openBook(slot))}
              className={`text-left rounded-xl border p-4 transition-all ${
                booking
                  ? 'bg-red-50 border-red-200 hover:border-red-300'
                  : isSelected
                    ? 'bg-forest text-white border-forest shadow-md'
                    : 'bg-white border-cream-dark hover:border-gold hover:shadow-sm'
              }`}
            >
              <p className={`text-sm font-bold ${booking || !isSelected ? 'text-charcoal' : 'text-white'}`}>
                {slot}
              </p>
              {booking ? (
                <>
                  <p className="text-xs font-semibold text-red-700 mt-2 uppercase tracking-wide">Booked</p>
                  <p className="text-sm text-charcoal mt-1 truncate">{booking.name}</p>
                  <p className="text-xs text-charcoal/60 mt-0.5">{booking.phone}</p>
                  <p className="text-[11px] text-charcoal/50 mt-1 capitalize">{booking.status}</p>
                </>
              ) : (
                <p className={`text-xs mt-2 font-semibold uppercase tracking-wide ${isSelected ? 'text-gold' : 'text-leaf'}`}>
                  Available — tap to book
                </p>
              )}
            </button>
          )
        })}
      </div>

      {selectedSlot && (() => {
        const booking = bookingForSlot(selectedSlot)
        if (booking) {
          return (
            <div className="bg-white rounded-2xl border border-cream-dark shadow-sm p-6 max-w-xl">
              <div className="flex justify-between gap-4 mb-4">
                <div>
                  <p className="text-xs uppercase tracking-wide text-charcoal/50 font-semibold">Slot</p>
                  <p className="font-display font-bold text-lg text-charcoal">
                    {selectedSlot} · {date}
                  </p>
                </div>
                <span className={`self-start text-xs font-bold px-2.5 py-1 rounded-full capitalize ${
                  booking.status === 'booked' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-800'
                }`}>
                  {booking.status}
                </span>
              </div>
              <p className="font-semibold text-charcoal">{booking.name}</p>
              <a href={`tel:${booking.phone}`} className="text-sm text-clay font-medium">{booking.phone}</a>
              {booking.condition && <p className="text-sm text-charcoal/70 mt-3">{booking.condition}</p>}
              {booking.message && <p className="text-sm text-charcoal/60 mt-1">{booking.message}</p>}
              <div className="flex flex-wrap gap-2 mt-5">
                {booking.status === 'pending' && (
                  <button
                    type="button"
                    onClick={() => setStatus(booking.id, 'booked')}
                    className="px-4 py-2 rounded-lg bg-forest text-white text-sm font-semibold hover:opacity-90"
                  >
                    Confirm booking
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => setStatus(booking.id, 'cancelled')}
                  className="px-4 py-2 rounded-lg bg-red-600 text-white text-sm font-semibold hover:bg-red-700"
                >
                  Cancel & free slot
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedSlot(null)}
                  className="px-4 py-2 rounded-lg border border-cream-dark text-sm font-medium text-charcoal/70"
                >
                  Close
                </button>
              </div>
            </div>
          )
        }

        return (
          <form onSubmit={bookSlot} className="bg-white rounded-2xl border border-cream-dark shadow-sm p-6 max-w-xl space-y-4">
            <div>
              <h4 className="font-display font-bold text-charcoal text-lg">Book {selectedSlot}</h4>
              <p className="text-sm text-charcoal/55">{date}</p>
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              <input
                required
                placeholder="Patient name"
                value={bookForm.name}
                onChange={(e) => setBookForm({ ...bookForm, name: e.target.value })}
                className="w-full px-4 py-2.5 rounded-lg border border-cream-dark focus:outline-none focus:ring-2 focus:ring-clay"
              />
              <input
                required
                type="tel"
                placeholder="Phone"
                value={bookForm.phone}
                onChange={(e) => setBookForm({ ...bookForm, phone: e.target.value })}
                className="w-full px-4 py-2.5 rounded-lg border border-cream-dark focus:outline-none focus:ring-2 focus:ring-clay"
              />
            </div>
            <input
              placeholder="Condition (optional)"
              value={bookForm.condition}
              onChange={(e) => setBookForm({ ...bookForm, condition: e.target.value })}
              className="w-full px-4 py-2.5 rounded-lg border border-cream-dark focus:outline-none focus:ring-2 focus:ring-clay"
            />
            <textarea
              placeholder="Note (optional)"
              rows={2}
              value={bookForm.message}
              onChange={(e) => setBookForm({ ...bookForm, message: e.target.value })}
              className="w-full px-4 py-2.5 rounded-lg border border-cream-dark focus:outline-none focus:ring-2 focus:ring-clay"
            />
            {error && <p className="text-sm text-red-600">{error}</p>}
            <div className="flex gap-2">
              <button
                type="submit"
                disabled={saving}
                className="px-4 py-2.5 rounded-lg bg-forest text-white text-sm font-semibold disabled:opacity-60"
              >
                {saving ? 'Booking…' : 'Book slot'}
              </button>
              <button
                type="button"
                onClick={() => setSelectedSlot(null)}
                className="px-4 py-2.5 rounded-lg border border-cream-dark text-sm font-medium text-charcoal/70"
              >
                Cancel
              </button>
            </div>
          </form>
        )
      })()}

      <div>
        <div className="flex items-center gap-3 mb-4">
          <h3 className="font-display font-bold text-charcoal text-lg">Pending website requests</h3>
          <span className="bg-amber-500 text-white text-xs font-bold px-3 py-1 rounded-full">{allPending.length}</span>
        </div>
        {allPending.length === 0 ? (
          <p className="text-sm text-charcoal/50">No pending requests.</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {allPending.map((a) => (
              <div key={a.id} className="bg-white rounded-xl border border-cream-dark p-5 shadow-sm">
                <p className="font-semibold text-charcoal">{a.name}</p>
                <a href={`tel:${a.phone}`} className="text-sm text-clay font-medium">{a.phone}</a>
                <p className="text-sm text-charcoal/70 mt-2">
                  {a.preferred_date || 'No date'}
                  {a.preferred_time ? ` · ${normalizeSlot(a.preferred_time)}` : ''}
                </p>
                {a.condition && <p className="text-sm text-charcoal/60 mt-1">{a.condition}</p>}
                <div className="flex flex-wrap gap-2 mt-4">
                  <button
                    type="button"
                    onClick={() => setStatus(a.id, 'booked')}
                    className="px-3 py-1.5 rounded-lg bg-forest text-white text-xs font-semibold"
                  >
                    Confirm
                  </button>
                  <button
                    type="button"
                    onClick={() => setStatus(a.id, 'cancelled')}
                    className="px-3 py-1.5 rounded-lg bg-red-600 text-white text-xs font-semibold"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
