import { useEffect, useState } from 'react'
import { supabase } from '../../../lib/supabase'
import MediaUploadField from './MediaUploadField'

const emptyForm = { title: '', video_url: '', thumbnail_url: '' }

export default function VideosManager() {
  const [items, setItems] = useState([])
  const [form, setForm] = useState(emptyForm)
  const [saving, setSaving] = useState(false)

  const load = async () => {
    const { data } = await supabase.from('product_videos').select('*').order('sort_order')
    setItems(data || [])
  }

  useEffect(() => { load() }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    await supabase.from('product_videos').insert([{ ...form, sort_order: items.length }])
    setForm(emptyForm)
    setSaving(false)
    load()
  }

  const remove = async (id) => {
    await supabase.from('product_videos').delete().eq('id', id)
    load()
  }

  return (
    <div className="grid lg:grid-cols-3 gap-8">
      {/* Form */}
      <form onSubmit={handleSubmit} className="lg:col-span-1">
        <div className="bg-white rounded-2xl border border-cream-dark shadow-lg p-7 space-y-5 sticky top-24">
          <div>
            <h3 className="font-display font-bold text-charcoal text-lg mb-2">🎬 Add Video</h3>
            <p className="text-xs text-charcoal/50">Product demonstrations</p>
          </div>
          <hr className="border-cream-dark" />
          
          <div>
            <label className="block text-sm font-semibold text-charcoal mb-2">Video Title</label>
            <input 
              required 
              placeholder="e.g., Hair Oil Application" 
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="w-full px-4 py-2.5 rounded-lg border border-cream-dark focus:outline-none focus:ring-2 focus:ring-clay transition-all" 
            />
          </div>
          
          <MediaUploadField 
            label="Video File" 
            onUploaded={(url) => setForm({ ...form, video_url: url })} 
            currentUrl={form.video_url}
            accept="video/*"
          />
          
          <MediaUploadField 
            label="Thumbnail Image" 
            onUploaded={(url) => setForm({ ...form, thumbnail_url: url })} 
            currentUrl={form.thumbnail_url} 
          />
          
          <button 
            disabled={saving} 
            className="w-full bg-forest hover:bg-forest-dark hover:shadow-lg text-white font-semibold py-3 px-4 rounded-lg transition-all disabled:opacity-60 hover:scale-105 transform"
          >
            {saving ? '💾 Saving…' : '✅ Add Video'}
          </button>
        </div>
      </form>

      {/* List */}
      <div className="lg:col-span-2">
        <div className="flex items-center gap-3 mb-6">
          <h3 className="font-display font-bold text-charcoal text-lg">🎥 Videos</h3>
          <span className="bg-clay text-white text-xs font-bold px-3 py-1 rounded-full">{items.length}</span>
        </div>
        
        {items.length === 0 ? (
          <div className="bg-cream rounded-2xl border border-dashed border-cream-dark p-12 text-center">
            <p className="text-charcoal/50 text-sm">No videos yet. Upload your first product video!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {items.map((v) => (
              <div key={v.id} className="bg-white rounded-xl border border-cream-dark overflow-hidden shadow-sm hover:shadow-lg hover:border-clay/30 transition-all group">
                <div className="aspect-video bg-charcoal/80 relative overflow-hidden">
                  {v.thumbnail_url && (
                    <img src={v.thumbnail_url} alt={v.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                  )}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-3xl">▶️</span>
                  </div>
                </div>
                <div className="p-5">
                  <h4 className="font-semibold text-charcoal mb-3">{v.title}</h4>
                  <button 
                    onClick={() => remove(v.id)} 
                    className="w-full text-red-600 hover:bg-red-50 font-medium text-xs py-2 px-3 rounded-lg transition-all"
                  >
                    🗑️ Delete
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
