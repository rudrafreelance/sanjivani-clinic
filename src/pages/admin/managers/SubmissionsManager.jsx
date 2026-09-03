import { useEffect, useState } from 'react'
import { supabase } from '../../../lib/supabase'
import { normalizeSlot } from '../../../lib/timeSlots'

export default function SubmissionsManager() {
  const [appointments, setAppointments] = useState([])
  const [messages, setMessages] = useState([])

  const load = async () => {
    const [a, m] = await Promise.all([
      supabase.from('appointments').select('*').order('created_at', { ascending: false }),
      supabase.from('contact_messages').select('*').order('created_at', { ascending: false }),
    ])
    setAppointments(a.data || [])
    setMessages(m.data || [])
  }

  useEffect(() => { load() }, [])

  const setStatus = async (id, status) => {
    await supabase.from('appointments').update({ status }).eq('id', id)
    load()
  }

  const statusStyle = {
    pending: 'bg-amber-50 text-amber-800',
    booked: 'bg-red-50 text-red-700',
    cancelled: 'bg-charcoal/5 text-charcoal/50',
  }

  return (
    <div className="space-y-12">
      <div>
        <div className="flex items-center gap-3 mb-2">
          <h3 className="font-display font-bold text-charcoal text-lg">Appointment Requests</h3>
          <span className="bg-clay text-white text-xs font-bold px-3 py-1 rounded-full">{appointments.length}</span>
        </div>
        <p className="text-sm text-charcoal/50 mb-6">
          Full day grid & walk-in booking is under the Slots tab.
        </p>

        {appointments.length === 0 ? (
          <div className="bg-cream rounded-2xl border border-dashed border-cream-dark p-12 text-center">
            <p className="text-charcoal/50 text-sm">No appointment requests yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {appointments.map((a) => (
              <div key={a.id} className="bg-white rounded-xl border border-cream-dark shadow-sm hover:shadow-lg hover:border-clay/30 transition-all p-6">
                <div className="flex justify-between items-start mb-4 pb-4 border-b border-cream-dark">
                  <div className="flex-1">
                    <p className="font-semibold text-charcoal">{a.name}</p>
                    <a href={`tel:${a.phone}`} className="text-sm text-clay hover:text-clay-dark font-medium">{a.phone}</a>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded font-medium capitalize whitespace-nowrap ml-2 ${statusStyle[a.status] || statusStyle.pending}`}>
                    {a.status || 'pending'}
                  </span>
                </div>

                {a.condition && (
                  <div className="mb-3">
                    <p className="text-xs text-charcoal/60 font-semibold mb-1">CONDITION</p>
                    <p className="text-sm text-charcoal/70">{a.condition}</p>
                  </div>
                )}

                {(a.preferred_date || a.preferred_time) && (
                  <div className="mb-3">
                    <p className="text-xs text-charcoal/60 font-semibold mb-1">DATE & TIME</p>
                    <p className="text-sm text-charcoal/70">
                      {a.preferred_date || '—'}
                      {a.preferred_time && ` · ${normalizeSlot(a.preferred_time)}`}
                    </p>
                  </div>
                )}

                {a.message && (
                  <div className="mb-3">
                    <p className="text-xs text-charcoal/60 font-semibold mb-1">MESSAGE</p>
                    <p className="text-sm text-charcoal/70 leading-relaxed">{a.message}</p>
                  </div>
                )}

                {a.status === 'pending' && (
                  <div className="flex gap-2 mt-4">
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
                )}
                {a.status === 'booked' && (
                  <button
                    type="button"
                    onClick={() => setStatus(a.id, 'cancelled')}
                    className="mt-4 px-3 py-1.5 rounded-lg border border-red-200 text-red-700 text-xs font-semibold"
                  >
                    Cancel & free slot
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      <div>
        <div className="flex items-center gap-3 mb-6">
          <h3 className="font-display font-bold text-charcoal text-lg">Contact Messages</h3>
          <span className="bg-clay text-white text-xs font-bold px-3 py-1 rounded-full">{messages.length}</span>
        </div>

        {messages.length === 0 ? (
          <div className="bg-cream rounded-2xl border border-dashed border-cream-dark p-12 text-center">
            <p className="text-charcoal/50 text-sm">No contact messages yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {messages.map((m) => (
              <div key={m.id} className="bg-white rounded-xl border border-cream-dark shadow-sm hover:shadow-lg hover:border-clay/30 transition-all p-6">
                <div className="flex justify-between items-start mb-4 pb-4 border-b border-cream-dark">
                  <div className="flex-1">
                    <p className="font-semibold text-charcoal">{m.name}</p>
                    <a href={`mailto:${m.email}`} className="text-sm text-clay hover:text-clay-dark font-medium break-all">{m.email}</a>
                  </div>
                  <span className="text-xs bg-green-50 text-green-700 px-2 py-1 rounded font-medium whitespace-nowrap ml-2">
                    {new Date(m.created_at).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-sm text-charcoal/70 leading-relaxed">{m.message}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
