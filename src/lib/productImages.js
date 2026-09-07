function parseJsonArray(value) {
  if (!value) return []
  if (Array.isArray(value)) return value.filter(Boolean)
  if (typeof value === 'string') {
    try {
      const parsed = JSON.parse(value)
      return Array.isArray(parsed) ? parsed.filter(Boolean) : []
    } catch {
      return []
    }
  }
  return []
}

/**
 * Collect all product images.
 * Prefers related product_images rows, then images_json / image_urls / image_url.
 */
export function getProductImages(product) {
  if (!product) return []

  if (Array.isArray(product.product_images) && product.product_images.length > 0) {
    return [...product.product_images]
      .sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0))
      .map((row) => row.image_url)
      .filter(Boolean)
  }

  const merged = [
    ...parseJsonArray(product.images_json),
    ...parseJsonArray(product.image_urls),
    product.image_url,
  ].filter(Boolean)

  return [...new Set(merged)]
}

export function getPrimaryImage(product) {
  return getProductImages(product)[0] || ''
}

/** Keep products.image_url + images_json in sync as a backup. */
export function buildImageFields(images = []) {
  const list = [...new Set((images || []).filter(Boolean))]
  return {
    image_url: list[0] || null,
    images_json: JSON.stringify(list),
  }
}
