import { useEffect, useState } from 'react'
import { supabase } from '../../../lib/supabase'
import MediaUploadField from './MediaUploadField'

const emptyForm = { name: '', location: '', rating: 5, message: '', photo_url: '' }

export default function TestimonialsManager() {
  const [items, setItems] = useState([])
  const [form, setForm] = useState(emptyForm)
  const [saving, setSaving] = useState(false)

  const load = async () => {
    const { data } = await supabase.from('testimonials').select('*').order('sort_order')
    setItems(data || [])
  }

  useEffect(() => { load() }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    await supabase.from('testimonials').insert([{ ...form, sort_order: items.length }])
    setForm(emptyForm)
    setSaving(false)
    load()
  }

  const remove = async (id) => {
    await supabase.from('testimonials').delete().eq('id', id)
    load()
  }

  return (
    <div className="grid lg:grid-cols-3 gap-8">
      {/* Form */}
      <form onSubmit={handleSubmit} className="lg:col-span-1">
        <div className="bg-white rounded-2xl border border-cream-dark shadow-lg p-7 space-y-5 sticky top-24">
          <div>
            <h3 className="font-display font-bold text-charcoal text-lg mb-2">✨ Add Testimonial</h3>
            <p className="text-xs text-charcoal/50">Share patient feedback</p>
          </div>
          <hr className="border-cream-dark" />
          
          <div>
            <label className="block text-sm font-semibold text-charcoal mb-2">Patient Name</label>
            <input 
              required 
              placeholder="Full name" 
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full px-4 py-2.5 rounded-lg border border-cream-dark focus:outline-none focus:ring-2 focus:ring-clay transition-all" 
            />
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-charcoal mb-2">Location (Optional)</label>
            <input 
              placeholder="City/Area" 
              value={form.location}
              onChange={(e) => setForm({ ...form, location: e.target.value })}
              className="w-full px-4 py-2.5 rounded-lg border border-cream-dark focus:outline-none focus:ring-2 focus:ring-clay transition-all" 
            />
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-charcoal mb-2">Rating</label>
            <select 
              value={form.rating} 
              onChange={(e) => setForm({ ...form, rating: Number(e.target.value) })}
              className="w-full px-4 py-2.5 rounded-lg border border-cream-dark focus:outline-none focus:ring-2 focus:ring-clay transition-all"
            >
              {[5, 4, 3, 2, 1].map((n) => <option key={n} value={n}>{'⭐'.repeat(n)} ({n} stars)</option>)}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-charcoal mb-2">Message</label>
            <textarea 
              required 
              placeholder="Patient testimonial..." 
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })} 
              rows={4}
              className="w-full px-4 py-2.5 rounded-lg border border-cream-dark focus:outline-none focus:ring-2 focus:ring-clay transition-all resize-none" 
            />
          </div>
          
          <MediaUploadField 
            label="Patient Photo" 
            onUploaded={(url) => setForm({ ...form, photo_url: url })} 
            currentUrl={form.photo_url} 
          />
          
          <button 
            disabled={saving} 
            className="w-full bg-gradient-to-r from-clay to-clay-dark hover:shadow-lg text-white font-semibold py-3 px-4 rounded-lg transition-all disabled:opacity-60 hover:scale-105 transform"
          >
            {saving ? '💾 Saving…' : '✅ Add Testimonial'}
          </button>
        </div>
      </form>

      {/* List */}
      <div className="lg:col-span-2">
        <div className="flex items-center gap-3 mb-6">
          <h3 className="font-display font-bold text-charcoal text-lg">👥 Testimonials</h3>
          <span className="bg-clay text-white text-xs font-bold px-3 py-1 rounded-full">{items.length}</span>
        </div>
        
        {items.length === 0 ? (
          <div className="bg-cream rounded-2xl border border-dashed border-cream-dark p-12 text-center">
            <p className="text-charcoal/50 text-sm">No testimonials yet. Add your first one!</p>
          </div>
        ) : (
          <div className="space-y-4 grid grid-cols-1 md:grid-cols-2 gap-4 auto-rows-max">
            {items.map((t) => (
              <div key={t.id} className="bg-white rounded-xl border border-cream-dark p-5 shadow-sm hover:shadow-lg hover:border-clay/30 transition-all group">
                <div className="flex gap-3 mb-3">
                  {t.photo_url && (
                    <img src={t.photo_url} alt={t.name} className="w-10 h-10 rounded-full object-cover" />
                  )}
                  <div className="flex-1">
                    <p className="font-semibold text-charcoal text-sm">{t.name}</p>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-yellow-500">{'⭐'.repeat(t.rating || 5)}</span>
                      {t.location && <span className="text-xs text-charcoal/50">📍 {t.location}</span>}
                    </div>
                  </div>
                </div>
                <p className="text-sm text-charcoal/70 italic mb-4 leading-relaxed">\"{ t.message}\"</p>
                <button 
                  onClick={() => remove(t.id)} 
                  className="w-full text-red-600 hover:bg-red-50 font-medium text-xs py-2 px-3 rounded-lg transition-all group-hover:opacity-100 opacity-60"
                >
                  🗑️ Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
