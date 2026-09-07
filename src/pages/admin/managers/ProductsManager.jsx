import { useEffect, useState } from 'react'
import { supabase } from '../../../lib/supabase'
import { uploadToCloudinary } from '../../../lib/cloudinary'
import { getProductImages, buildImageFields } from '../../../lib/productImages'
import { fetchProductsWithImages } from '../../../lib/fetchProducts'

const emptyForm = { id: null, name: '', description: '', images: [] }

function MultiImageField({ images, onChange }) {
  const [progress, setProgress] = useState(null)
  const [error, setError] = useState('')

  const handleFiles = async (e) => {
    const files = [...(e.target.files || [])]
    e.target.value = ''
    if (!files.length) return
    setError('')
    setProgress(0)
    try {
      const uploaded = []
      for (let i = 0; i < files.length; i++) {
        const result = await uploadToCloudinary(files[i], {
          onProgress: (p) => setProgress(Math.round(((i + p / 100) / files.length) * 100)),
        })
        uploaded.push(result.url)
      }
      onChange([...images, ...uploaded])
    } catch (err) {
      setError(err.message)
    } finally {
      setProgress(null)
    }
  }

  const removeAt = (idx) => {
    onChange(images.filter((_, i) => i !== idx))
  }

  const moveToFront = (idx) => {
    if (idx === 0) return
    const next = [...images]
    const [item] = next.splice(idx, 1)
    next.unshift(item)
    onChange(next)
  }

  return (
    <div>
      <label className="block text-sm font-semibold text-charcoal mb-3">Product Images</label>
      <p className="text-xs text-charcoal/50 mb-3">
        Add multiple photos. First image is the cover. Click “Cover” to set primary.
      </p>

      {images.length > 0 && (
        <div className="grid grid-cols-3 gap-2 mb-3">
          {images.map((url, idx) => (
            <div key={`${url}-${idx}`} className="relative group rounded-lg overflow-hidden border border-cream-dark bg-sage aspect-square">
              <img src={url} alt="" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/45 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-1.5">
                <button
                  type="button"
                  onClick={() => removeAt(idx)}
                  className="self-end bg-red-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded"
                >
                  Remove
                </button>
                {idx === 0 ? (
                  <span className="text-[10px] font-bold text-white bg-forest/90 px-1.5 py-0.5 rounded w-fit">Cover</span>
                ) : (
                  <button
                    type="button"
                    onClick={() => moveToFront(idx)}
                    className="text-[10px] font-bold text-forest bg-white px-1.5 py-0.5 rounded w-fit"
                  >
                    Set cover
                  </button>
                )}
              </div>
              {idx === 0 && (
                <span className="absolute bottom-1 left-1 text-[10px] font-bold text-white bg-forest px-1.5 py-0.5 rounded">
                  Cover
                </span>
              )}
            </div>
          ))}
        </div>
      )}

      <div className="relative">
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleFiles}
          className="absolute inset-0 opacity-0 cursor-pointer"
        />
        <label className="block bg-gradient-to-br from-cream to-sage rounded-lg border-2 border-dashed border-clay/30 hover:border-clay p-5 text-center cursor-pointer transition-all">
          <div className="text-2xl mb-1">📸</div>
          <p className="font-semibold text-charcoal text-sm mb-0.5">Add images</p>
          <p className="text-xs text-charcoal/60">Select one or more files</p>
        </label>
      </div>

      {progress !== null && (
        <div className="mt-3">
          <div className="w-full bg-cream rounded-full h-2 overflow-hidden border border-clay/30">
            <div className="bg-clay h-full transition-all" style={{ width: `${progress}%` }} />
          </div>
          <p className="text-xs text-clay font-semibold mt-2 text-center">{progress}% Uploading…</p>
        </div>
      )}
      {error && <p className="mt-2 text-xs text-red-600">{error}</p>}
    </div>
  )
}

export default function ProductsManager() {
  const [items, setItems] = useState([])
  const [form, setForm] = useState(emptyForm)
  const [saving, setSaving] = useState(false)
  const [formError, setFormError] = useState('')

  const isEditing = Boolean(form.id)

  const load = async () => {
    const { data, error } = await fetchProductsWithImages()
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
      description: item.description || '',
      images: getProductImages(item),
    })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const saveProductImages = async (productId, images) => {
    const list = [...new Set((images || []).filter(Boolean))]
    const { error: delError } = await supabase
      .from('product_images')
      .delete()
      .eq('product_id', productId)
    if (delError) return delError

    if (!list.length) return null

    const rows = list.map((image_url, sort_order) => ({
      product_id: productId,
      image_url,
      sort_order,
    }))
    const { error: insError } = await supabase.from('product_images').insert(rows)
    return insError
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.name.trim()) return
    setSaving(true)
    setFormError('')

    const payload = {
      name: form.name.trim(),
      description: form.description.trim(),
      image_url: form.images[0] || null,
    }

    // Best-effort backup field (ignore if column missing)
    try {
      Object.assign(payload, buildImageFields(form.images))
    } catch (_) { /* ignore */ }

    let productId = form.id
    let error

    if (isEditing) {
      ;({ error } = await supabase.from('products').update(payload).eq('id', form.id))
      // Retry without images_json if that column is missing
      if (error && /images_json/i.test(error.message || '')) {
        ;({ error } = await supabase.from('products').update({
          name: payload.name,
          description: payload.description,
          image_url: payload.image_url,
        }).eq('id', form.id))
      }
    } else {
      const insertPayload = {
        name: payload.name,
        description: payload.description,
        image_url: payload.image_url,
        sort_order: items.length,
      }
      let insertResult = await supabase
        .from('products')
        .insert([insertPayload])
        .select('id')
        .single()
      error = insertResult.error
      productId = insertResult.data?.id
    }

    if (!error && productId) {
      error = await saveProductImages(productId, form.images)
    }

    setSaving(false)

    if (error) {
      console.error(error)
      const needsMigration =
        /product_images|images_json|schema cache|column|relation/i.test(error.message || '')
      setFormError(
        needsMigration
          ? 'Database setup missing. Run supabase/migrate_products.sql in Supabase SQL Editor, then try again.'
          : error.message || 'Could not save product.'
      )
      return
    }

    resetForm()
    load()
  }

  const remove = async (id) => {
    await supabase.from('products').delete().eq('id', id)
    if (form.id === id) resetForm()
    load()
  }

  return (
    <div className="grid lg:grid-cols-3 gap-8">
      <form onSubmit={handleSubmit} className="lg:col-span-1">
        <div className="bg-white rounded-2xl border border-cream-dark shadow-lg p-7 space-y-5 sticky top-24">
          <div>
            <h3 className="font-display font-bold text-charcoal text-lg mb-2">
              {isEditing ? 'Edit Product' : 'Add Product'}
            </h3>
            <p className="text-xs text-charcoal/50">
              {isEditing ? 'Update details and images' : 'Add to product range'}
            </p>
          </div>
          <hr className="border-cream-dark" />

          <div>
            <label className="block text-sm font-semibold text-charcoal mb-2">Product Name</label>
            <input
              required
              placeholder="e.g., Sanjivani Hair Oil"
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
              rows={5}
              className="w-full px-4 py-2.5 rounded-lg border border-cream-dark focus:outline-none focus:ring-2 focus:ring-clay transition-all resize-none"
            />
          </div>

          <MultiImageField
            images={form.images}
            onChange={(images) => setForm({ ...form, images })}
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
            {saving ? 'Saving…' : isEditing ? 'Update Product' : 'Add Product'}
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
          <h3 className="font-display font-bold text-charcoal text-lg">Products</h3>
          <span className="bg-clay text-white text-xs font-bold px-3 py-1 rounded-full">{items.length}</span>
        </div>

        {items.length === 0 ? (
          <div className="bg-cream rounded-2xl border border-dashed border-cream-dark p-12 text-center">
            <p className="text-charcoal/50 text-sm">No products yet. Add your first one!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {items.map((p) => {
              const images = getProductImages(p)
              return (
                <div
                  key={p.id}
                  className={`bg-white rounded-xl border overflow-hidden shadow-sm ${
                    form.id === p.id ? 'border-forest ring-2 ring-forest/20' : 'border-cream-dark'
                  }`}
                >
                  <div className="aspect-[4/3] bg-sage overflow-hidden relative">
                    {images[0] ? (
                      <img src={images[0]} alt={p.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-charcoal/30 text-sm">No image</div>
                    )}
                    {images.length > 1 && (
                      <span className="absolute bottom-2 right-2 text-[11px] font-bold bg-white/95 text-forest px-2 py-0.5 rounded">
                        {images.length} photos
                      </span>
                    )}
                  </div>
                  <div className="p-4">
                    <h4 className="font-semibold text-charcoal mb-1">{p.name}</h4>
                    <p className="text-sm text-charcoal/70 mb-3 line-clamp-2">{p.description}</p>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => startEdit(p)}
                        className="flex-1 bg-forest/10 hover:bg-forest text-forest hover:text-white text-xs font-semibold py-2 rounded-lg transition-colors"
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => remove(p.id)}
                        className="px-3 text-red-600 hover:bg-red-50 font-medium text-xs py-2 rounded-lg transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
