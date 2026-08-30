import { useEffect, useState } from 'react'
import { supabase } from '../../../lib/supabase'
import MediaUploadField from './MediaUploadField'

const emptyForm = { name: '', description: '', image_url: '' }

export default function ProductsManager() {
  const [items, setItems] = useState([])
  const [form, setForm] = useState(emptyForm)
  const [saving, setSaving] = useState(false)

  const load = async () => {
    const { data } = await supabase.from('products').select('*').order('sort_order')
    setItems(data || [])
  }

  useEffect(() => { load() }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    await supabase.from('products').insert([{ ...form, sort_order: items.length }])
    setForm(emptyForm)
    setSaving(false)
    load()
  }

  const remove = async (id) => {
    await supabase.from('products').delete().eq('id', id)
    load()
  }

  return (
    <div className="grid lg:grid-cols-3 gap-8">
      {/* Form */}
      <form onSubmit={handleSubmit} className="lg:col-span-1">
        <div className="bg-white rounded-2xl border border-cream-dark shadow-lg p-7 space-y-5 sticky top-24">
          <div>
            <h3 className="font-display font-bold text-charcoal text-lg mb-2">🛍️ Add Product</h3>
            <p className="text-xs text-charcoal/50">Add to product range</p>
          </div>
          <hr className="border-cream-dark" />
          
          <div>
            <label className="block text-sm font-semibold text-charcoal mb-2">Product Name</label>
            <input 
              required 
              placeholder="e.g., Sanjveeni Hair Oil" 
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full px-4 py-2.5 rounded-lg border border-cream-dark focus:outline-none focus:ring-2 focus:ring-clay transition-all" 
            />
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-charcoal mb-2">Description</label>
            <textarea 
              required 
              placeholder="Product details..." 
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })} 
              rows={4}
              className="w-full px-4 py-2.5 rounded-lg border border-cream-dark focus:outline-none focus:ring-2 focus:ring-clay transition-all resize-none" 
            />
          </div>
          
          <MediaUploadField 
            label="Product Image" 
            onUploaded={(url) => setForm({ ...form, image_url: url })} 
            currentUrl={form.image_url} 
          />
          
          <button 
            disabled={saving} 
            className="w-full bg-gradient-to-r from-clay to-clay-dark hover:shadow-lg text-white font-semibold py-3 px-4 rounded-lg transition-all disabled:opacity-60 hover:scale-105 transform"
          >
            {saving ? '💾 Saving…' : '✅ Add Product'}
          </button>
        </div>
      </form>

      {/* List */}
      <div className="lg:col-span-2">
        <div className="flex items-center gap-3 mb-6">
          <h3 className="font-display font-bold text-charcoal text-lg">📦 Products</h3>
          <span className="bg-clay text-white text-xs font-bold px-3 py-1 rounded-full">{items.length}</span>
        </div>
        
        {items.length === 0 ? (
          <div className="bg-cream rounded-2xl border border-dashed border-cream-dark p-12 text-center">
            <p className="text-charcoal/50 text-sm">No products yet. Add your first one!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {items.map((p) => (
              <div key={p.id} className="bg-white rounded-xl border border-cream-dark overflow-hidden shadow-sm hover:shadow-lg hover:border-clay/30 transition-all group">
                <div className="aspect-square bg-sage overflow-hidden">
                  {p.image_url && (
                    <img src={p.image_url} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                  )}
                </div>
                <div className="p-5">
                  <h4 className="font-semibold text-charcoal mb-2">{p.name}</h4>
                  <p className="text-sm text-charcoal/70 mb-4 line-clamp-2">{p.description}</p>
                  <button 
                    onClick={() => remove(p.id)} 
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
