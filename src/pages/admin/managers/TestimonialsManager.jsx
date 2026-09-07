import { useEffect, useState } from 'react'
import { supabase } from '../../../lib/supabase'
import MediaUploadField from './MediaUploadField'

const emptyForm = {
  id: null,
  name: '',
  location: '',
  rating: 5,
  message: '',
  photo_url: '',
  posted_ago: '',
}

export default function TestimonialsManager() {
  const [items, setItems] = useState([])
  const [form, setForm] = useState(emptyForm)
  const [saving, setSaving] = useState(false)
  const [formError, setFormError] = useState('')

  const isEditing = Boolean(form.id)

  const load = async () => {
    const { data, error } = await supabase.from('testimonials').select('*').order('sort_order')
    if (error) console.error(error)
    setItems(data || [])
  }

  useEffect(() => { load() }, [])

  const resetForm = () => {
    setForm(emptyForm)
    setFormError('')
  }

  const startEdit = (item) => {
    setFormError('')
    setForm({
      id: item.id,
      name: item.name || '',
      location: item.location || '',
      rating: item.rating || 5,
      message: item.message || '',
      photo_url: item.photo_url || '',
      posted_ago: item.posted_ago || '',
    })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    setFormError('')

    const payload = {
      name: form.name.trim(),
      location: form.location.trim() || null,
      rating: form.rating,
      message: form.message.trim(),
      photo_url: form.photo_url || null,
      posted_ago: form.posted_ago.trim() || null,
    }

    let error
    if (isEditing) {
      ;({ error } = await supabase.from('testimonials').update(payload).eq('id', form.id))
    } else {
      ;({ error } = await supabase.from('testimonials').insert([{
        ...payload,
        sort_order: items.length,
      }]))
    }

    setSaving(false)

    if (error) {
      console.error(error)
      setFormError(
        /posted_ago|schema cache|column/i.test(error.message || '')
          ? 'Run supabase/migrate_testimonials.sql in Supabase SQL Editor, then try again.'
          : error.message || 'Could not save testimonial.'
      )
      return
    }

    resetForm()
    load()
  }

  const remove = async (id) => {
    await supabase.from('testimonials').delete().eq('id', id)
    if (form.id === id) resetForm()
    load()
  }

  return (
    <div className="grid lg:grid-cols-3 gap-8">
      <form onSubmit={handleSubmit} className="lg:col-span-1">
        <div className="bg-white rounded-2xl border border-cream-dark shadow-lg p-7 space-y-5 sticky top-24">
          <div>
            <h3 className="font-display font-bold text-charcoal text-lg mb-2">
              {isEditing ? 'Edit Testimonial' : 'Add Testimonial'}
            </h3>
            <p className="text-xs text-charcoal/50">
              {isEditing ? 'Update patient feedback' : 'Share patient feedback'}
            </p>
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
              {[5, 4, 3, 2, 1].map((n) => (
                <option key={n} value={n}>{'⭐'.repeat(n)} ({n} stars)</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-charcoal mb-2">Posted ago (Optional)</label>
            <input
              placeholder="e.g., 3 months ago"
              value={form.posted_ago}
              onChange={(e) => setForm({ ...form, posted_ago: e.target.value })}
              className="w-full px-4 py-2.5 rounded-lg border border-cream-dark focus:outline-none focus:ring-2 focus:ring-clay transition-all"
            />
            <p className="text-xs text-charcoal/45 mt-1">Shown under the patient name on the website.</p>
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

          {formError && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
              <p className="text-xs text-red-700 font-medium leading-relaxed">{formError}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={saving}
            className="w-full bg-forest hover:bg-forest-dark hover:shadow-lg text-white font-semibold py-3 px-4 rounded-lg transition-all disabled:opacity-60"
          >
            {saving ? 'Saving…' : isEditing ? 'Update Testimonial' : 'Add Testimonial'}
          </button>

          {isEditing && (
            <button
              type="button"
              onClick={resetForm}
              className="w-full border border-cream-dark text-charcoal/70 font-medium py-2.5 px-4 rounded-lg hover:bg-cream transition-colors"
            >
              Cancel edit
            </button>
          )}
        </div>
      </form>

      <div className="lg:col-span-2">
        <div className="flex items-center gap-3 mb-6">
          <h3 className="font-display font-bold text-charcoal text-lg">Testimonials</h3>
          <span className="bg-clay text-white text-xs font-bold px-3 py-1 rounded-full">{items.length}</span>
        </div>

        {items.length === 0 ? (
          <div className="bg-cream rounded-2xl border border-dashed border-cream-dark p-12 text-center">
            <p className="text-charcoal/50 text-sm">No testimonials yet. Add your first one!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {items.map((t) => (
              <div
                key={t.id}
                className={`bg-white rounded-xl border p-5 shadow-sm ${
                  form.id === t.id ? 'border-forest ring-2 ring-forest/20' : 'border-cream-dark'
                }`}
              >
                <div className="flex gap-3 mb-3">
                  {t.photo_url ? (
                    <img src={t.photo_url} alt={t.name} className="w-10 h-10 rounded-full object-cover" />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-sage flex items-center justify-center text-forest font-bold text-sm">
                      {t.name?.[0] || '?'}
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-charcoal text-sm">{t.name}</p>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs text-yellow-500">{'⭐'.repeat(t.rating || 5)}</span>
                      {t.location && <span className="text-xs text-charcoal/50">{t.location}</span>}
                      {t.posted_ago && <span className="text-xs text-charcoal/45">{t.posted_ago}</span>}
                    </div>
                  </div>
                </div>
                <p className="text-sm text-charcoal/70 italic mb-4 leading-relaxed line-clamp-4">
                  &ldquo;{t.message}&rdquo;
                </p>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => startEdit(t)}
                    className="flex-1 bg-forest/10 hover:bg-forest text-forest hover:text-white text-xs font-semibold py-2 rounded-lg transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => remove(t.id)}
                    className="px-3 text-red-600 hover:bg-red-50 font-medium text-xs py-2 rounded-lg transition-colors"
                  >
                    Delete
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
