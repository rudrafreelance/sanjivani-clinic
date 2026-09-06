import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { supabase } from '../lib/supabase'

const CLINIC_PHONE = import.meta.env.VITE_CLINIC_PHONE || '+917990131841'
const WHATSAPP_PHONE = String(CLINIC_PHONE).replace(/\D/g, '')
const DISPLAY_PHONE = CLINIC_PHONE.replace('+91', '0')

function orderWhatsAppUrl(productName) {
  const text = [
    'Hi Sanjivani Clinic,',
    '',
    'I would like to order:',
    `*${productName}*`,
    '',
    'Please share availability and price.',
  ].join('\n')
  return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(text)}`
}

function cleanTitle(name = '') {
  return name.replace(/^[\p{Emoji_Presentation}\p{Extended_Pictographic}\uFE0F]+\s*/u, '').trim() || name
}

function parseProductCopy(description = '') {
  const raw = description.replace(/\r\n/g, '\n').trim()
  if (!raw) return { paragraphs: [], benefits: [] }

  const parts = raw.split(/\n+\s*(?:✨\s*)?Key Benefits\s*:?\s*\n+/i)
  const main = (parts[0] || '').trim()
  const benefitsRaw = (parts[1] || '').trim()

  const paragraphs = main
    .split(/\n{2,}/)
    .map((p) => p.replace(/\n+/g, ' ').trim())
    .filter(Boolean)

  let benefits = benefitsRaw
    .split(/\n+/)
    .map((line) => line.replace(/^(?:[\p{Emoji_Presentation}\p{Extended_Pictographic}\uFE0F]+\s*|[•\-*]\s*)/u, '').trim())
    .filter(Boolean)

  if (benefits.length === 0) {
    const bulletLines = main
      .split(/\n+/)
      .map((line) => line.trim())
      .filter((line) => /^(?:[\p{Emoji_Presentation}\p{Extended_Pictographic}]|[•\-*])/u.test(line))
      .map((line) => line.replace(/^(?:[\p{Emoji_Presentation}\p{Extended_Pictographic}\uFE0F]+\s*|[•\-*]\s*)/u, '').trim())
      .filter(Boolean)

    if (bulletLines.length >= 2) {
      benefits = bulletLines
      const withoutBullets = main
        .split(/\n+/)
        .map((line) => line.trim())
        .filter((line) => line && !/^(?:[\p{Emoji_Presentation}\p{Extended_Pictographic}]|[•\-*])/u.test(line))
        .join('\n\n')
      return {
        paragraphs: withoutBullets
          .split(/\n{2,}/)
          .map((p) => p.replace(/\n+/g, ' ').trim())
          .filter(Boolean),
        benefits,
      }
    }
  }

  return { paragraphs, benefits }
}

function ProductDetailModal({ product, onClose }) {
  const title = cleanTitle(product.name)
  const { paragraphs, benefits } = parseProductCopy(product.description)

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
    }
  }, [onClose])

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-charcoal/65 p-3 sm:p-5 animate-fadeIn"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <div
        className="relative w-full max-w-5xl h-[min(90dvh,720px)] bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-3 right-3 z-30 w-9 h-9 rounded-full bg-white border border-cream-dark text-charcoal/70 hover:text-forest hover:border-forest transition-colors flex items-center justify-center text-base shadow-sm"
          aria-label="Close"
        >
          ✕
        </button>

        <div className="shrink-0 h-[28%] md:h-full md:w-[42%] bg-[#f5f2ea] border-b md:border-b-0 md:border-r border-cream-dark flex items-center justify-center p-4 sm:p-6 overflow-hidden">
          {product.image_url ? (
            <img
              src={product.image_url}
              alt={title}
              className="max-w-full max-h-full w-auto h-auto object-contain"
            />
          ) : (
            <p className="text-charcoal/40 text-sm">No image</p>
          )}
        </div>

        <div className="flex-1 min-h-0 min-w-0 flex flex-col bg-white overflow-hidden">
          <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain px-5 sm:px-8 pt-5 sm:pt-7 pb-4">
            <p className="text-[11px] tracking-[0.22em] uppercase text-gold-dark font-semibold mb-2">
              Sanjivani Natural Range
            </p>
            <h3 className="font-display text-xl sm:text-2xl font-bold text-forest leading-snug pr-8">
              {title}
            </h3>
            <div className="mt-3 mb-4 h-px w-12 bg-gold/70" />

            {paragraphs.length > 0 ? (
              <div className="space-y-3">
                {paragraphs.map((p) => (
                  <p key={p.slice(0, 24)} className="text-sm sm:text-[15px] text-charcoal/75 leading-relaxed">
                    {p}
                  </p>
                ))}
              </div>
            ) : (
              <p className="text-sm sm:text-[15px] text-charcoal/75 leading-relaxed whitespace-pre-line">
                {product.description}
              </p>
            )}

            {benefits.length > 0 && (
              <div className="mt-5 rounded-xl bg-cream/80 border border-cream-dark px-4 py-4">
                <p className="text-xs tracking-[0.18em] uppercase text-forest font-semibold mb-3">
                  Key Benefits
                </p>
                <ul className="space-y-2">
                  {benefits.map((b) => (
                    <li key={b} className="flex gap-2.5 text-sm text-charcoal/75 leading-snug">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-leaf shrink-0" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className="shrink-0 border-t border-cream-dark bg-white px-5 sm:px-8 py-3.5 sm:py-4">
            <p className="text-xs text-charcoal/50 mb-2.5">
              Call or WhatsApp to order — we&apos;ll confirm stock and guide you.
            </p>
            <div className="grid grid-cols-2 gap-2.5">
              <a
                href={`tel:${CLINIC_PHONE}`}
                className="inline-flex items-center justify-center rounded-xl bg-forest hover:bg-forest-dark text-white font-semibold text-sm py-3 px-3 transition-colors"
              >
                Call to Order
              </a>
              <a
                href={orderWhatsAppUrl(title)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-xl border border-forest/25 bg-cream hover:bg-sage/60 text-forest font-semibold text-sm py-3 px-3 transition-colors"
              >
                WhatsApp
              </a>
            </div>
            <p className="mt-2 text-center text-xs text-charcoal/45">{DISPLAY_PHONE}</p>
          </div>
        </div>
      </div>
    </div>,
    document.body
  )
}

export default function Products() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeProduct, setActiveProduct] = useState(null)

  useEffect(() => {
    let active = true
    supabase
      .from('products')
      .select('*')
      .order('sort_order', { ascending: true })
      .then(({ data, error }) => {
        if (!active) return
        if (error) console.error(error)
        setProducts(data || [])
        setLoading(false)
      })
    return () => {
      active = false
    }
  }, [])

  return (
    <section id="products" className="bg-gradient-to-b from-white to-cream max-w-7xl mx-auto px-6 py-16 md:py-24">
      <div className="text-center mb-12">
        <p className="section-eyebrow">Our Products</p>
        <h2 className="section-heading">Sanjivani Natural Range</h2>
        <div className="section-underline mx-auto" />
        <p className="text-charcoal/70 max-w-xl mx-auto mt-4">
          100% natural, homeopathic products developed by Dr. Jignesh Singada for
          everyday skin and hair care.
        </p>
      </div>

      {loading && (
        <div className="text-center py-16">
          <div className="inline-block animate-spin">⚙️</div>
          <p className="text-charcoal/50 mt-4">Loading products…</p>
        </div>
      )}

      {!loading && products.length === 0 && (
        <div className="text-center py-16">
          <div className="inline-block bg-white/70 border border-cream-dark rounded-xl2 p-8 max-w-md">
            <p className="text-charcoal/60 text-lg mb-2">✨ Coming Soon</p>
            <p className="text-charcoal/50">
              Products will appear here once added from the admin panel.
            </p>
          </div>
        </div>
      )}

      {!loading && products.length > 0 && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((p) => {
            const title = cleanTitle(p.name)
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => setActiveProduct(p)}
                className="text-left bg-white rounded-xl2 overflow-hidden border border-cream-dark card-lift hover:border-gold/40 group"
              >
                <div className="aspect-[4/3] bg-[#f5f2ea] overflow-hidden relative flex items-center justify-center p-3">
                  {p.image_url ? (
                    <img
                      src={p.image_url}
                      alt={title}
                      className="max-w-full max-h-full object-contain group-hover:scale-[1.02] transition-transform duration-300"
                    />
                  ) : (
                    <div className="text-charcoal/30 text-sm">No image</div>
                  )}
                </div>
                <div className="p-5">
                  <h3 className="font-display font-bold mb-2 text-forest group-hover:text-leaf transition-colors">
                    {title}
                  </h3>
                  <p className="text-sm text-charcoal/70 line-clamp-2">{p.description}</p>
                  <p className="mt-4 text-sm font-semibold text-gold-dark group-hover:text-forest transition-colors">
                    View product →
                  </p>
                </div>
              </button>
            )
          })}
        </div>
      )}

      {activeProduct && (
        <ProductDetailModal product={activeProduct} onClose={() => setActiveProduct(null)} />
      )}
    </section>
  )
}
