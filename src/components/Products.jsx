import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

const CLINIC_PHONE = import.meta.env.VITE_CLINIC_PHONE || '+917990131841'

export default function Products() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

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
          {products.map((p) => (
            <div
              key={p.id}
              className="bg-white rounded-xl2 overflow-hidden border border-cream-dark card-lift hover:border-gold/40 group"
            >
              <div className="aspect-video bg-gradient-to-br from-sage to-cream-dark overflow-hidden relative">
                {p.image_url && (
                  <img
                    src={p.image_url}
                    alt={p.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                )}
              </div>
              <div className="p-5">
                <h3 className="font-display font-bold mb-2 text-forest group-hover:text-leaf transition-colors">
                  {p.name}
                </h3>
                <p className="text-sm text-charcoal/70 mb-4 line-clamp-2">{p.description}</p>
                <a
                  href={`tel:${CLINIC_PHONE}`}
                  className="btn-primary text-sm py-2 w-full justify-center hover:gap-3"
                >
                  📞 Call to Order
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}
