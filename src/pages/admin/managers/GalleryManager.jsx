import { useEffect, useState } from 'react'
import { supabase } from '../../../lib/supabase'
import MediaUploadField from './MediaUploadField'

const emptyForm = { id: null, caption: '', photo_url: '' }

export default function GalleryManager() {
  const [items, setItems] = useState([])
  const [form, setForm] = useState(emptyForm)
  const [saving, setSaving] = useState(false)

  const isEditing = Boolean(form.id)

  const load = async () => {
    const { data } = await supabase.from('patient_gallery').select('*').order('sort_order')
    setItems(data || [])
  }

  useEffect(() => { load() }, [])

  const resetForm = () => setForm(emptyForm)

  const startEdit = (item) => {
    setForm({
      id: item.id,
      caption: item.caption || '',
      photo_url: item.photo_url || '',
    })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.photo_url) return
    setSaving(true)

    if (isEditing) {
      await supabase
        .from('patient_gallery')
        .update({
          caption: form.caption.trim() || null,
          photo_url: form.photo_url,
        })
        .eq('id', form.id)
    } else {
      await supabase.from('patient_gallery').insert([{
        caption: form.caption.trim() || null,
        photo_url: form.photo_url,
        sort_order: items.length,
      }])
    }

    resetForm()
    setSaving(false)
    load()
  }

  const remove = async (id) => {
    await supabase.from('patient_gallery').delete().eq('id', id)
    if (form.id === id) resetForm()
    load()
  }

  return (
    <div className="grid lg:grid-cols-3 gap-8">
      <form onSubmit={handleSubmit} className="lg:col-span-1">
        <div className="bg-white rounded-2xl border border-cream-dark shadow-lg p-7 space-y-5 sticky top-24">
          <div>
            <h3 className="font-display font-bold text-charcoal text-lg mb-2">
              {isEditing ? 'Edit Photo' : 'Add Photo'}
            </h3>
            <p className="text-xs text-charcoal/50">
              {isEditing ? 'Update caption or replace the image' : 'Patient gallery'}
            </p>
          </div>
          <hr className="border-cream-dark" />

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
            <p className="text-xs text-blue-700 leading-relaxed">
              Only upload photos with patient consent. Blur or crop faces if needed.
            </p>
          </div>

          <div>
            <label className="block text-sm font-semibold text-charcoal mb-2">Caption (Optional)</label>
            <input
              placeholder="e.g., Acne Treatment - 2 Months"
              value={form.caption}
              onChange={(e) => setForm({ ...form, caption: e.target.value })}
              className="w-full px-4 py-2.5 rounded-lg border border-cream-dark focus:outline-none focus:ring-2 focus:ring-clay transition-all"
            />
          </div>

          <MediaUploadField
            label="Before/After Photo"
            onUploaded={(url) => setForm({ ...form, photo_url: url })}
            currentUrl={form.photo_url}
          />

          <button
            type="submit"
            disabled={saving || !form.photo_url}
            className="w-full bg-forest hover:bg-forest-dark hover:shadow-lg text-white font-semibold py-3 px-4 rounded-lg transition-all disabled:opacity-60 hover:scale-105 transform"
          >
            {saving ? 'Saving…' : isEditing ? 'Update Photo' : 'Add Photo'}
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
          <h3 className="font-display font-bold text-charcoal text-lg">Patient Gallery</h3>
          <span className="bg-clay text-white text-xs font-bold px-3 py-1 rounded-full">{items.length}</span>
        </div>

        {items.length === 0 ? (
          <div className="bg-cream rounded-2xl border border-dashed border-cream-dark p-12 text-center">
            <p className="text-charcoal/50 text-sm">No photos yet. Upload your first before/after photo!</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {items.map((p) => (
              <div
                key={p.id}
                className={`rounded-lg overflow-hidden border bg-white shadow-sm ${
                  form.id === p.id ? 'border-forest ring-2 ring-forest/20' : 'border-cream-dark'
                }`}
              >
                <div className="aspect-square overflow-hidden bg-sage">
                  <img
                    src={p.photo_url}
                    alt={p.caption || 'Patient result'}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-2.5 space-y-2">
                  <p className="text-xs text-charcoal/70 line-clamp-2 min-h-[2rem]">
                    {p.caption || <span className="text-charcoal/35">No caption</span>}
                  </p>
                  <div className="flex gap-1.5">
                    <button
                      type="button"
                      onClick={() => startEdit(p)}
                      className="flex-1 bg-forest/10 hover:bg-forest text-forest hover:text-white text-xs px-2 py-1.5 rounded font-semibold transition-colors"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => remove(p.id)}
                      className="bg-red-600 hover:bg-red-700 text-white text-xs px-2 py-1.5 rounded font-semibold transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
