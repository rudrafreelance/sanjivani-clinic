import { supabase } from './supabase'
import { getProductImages } from './productImages'

/**
 * Load products with gallery images.
 * Uses nested select when FK exists; otherwise falls back to 2 queries.
 */
export async function fetchProductsWithImages() {
  const nested = await supabase
    .from('products')
    .select('*, product_images(id, image_url, sort_order)')
    .order('sort_order', { ascending: true })

  if (!nested.error) {
    return { data: nested.data || [], error: null }
  }

  // Fallback when relationship / table is not ready yet
  console.warn('Nested product_images select failed, using fallback:', nested.error.message)

  const base = await supabase
    .from('products')
    .select('*')
    .order('sort_order', { ascending: true })

  if (base.error) return { data: [], error: base.error }

  const imagesRes = await supabase
    .from('product_images')
    .select('id, product_id, image_url, sort_order')
    .order('sort_order', { ascending: true })

  const byProduct = {}
  for (const row of imagesRes.data || []) {
    if (!byProduct[row.product_id]) byProduct[row.product_id] = []
    byProduct[row.product_id].push(row)
  }

  const data = (base.data || []).map((p) => ({
    ...p,
    product_images: byProduct[p.id] || [],
  }))

  return { data, error: null }
}

export { getProductImages }
