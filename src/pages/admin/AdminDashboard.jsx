import { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import TestimonialsManager from './managers/TestimonialsManager'
import ProductsManager from './managers/ProductsManager'
import VideosManager from './managers/VideosManager'
import GalleryManager from './managers/GalleryManager'
import SubmissionsManager from './managers/SubmissionsManager'

const TABS = [
  { key: 'submissions', label: 'Inquiries', Component: SubmissionsManager },
  { key: 'testimonials', label: 'Testimonials', Component: TestimonialsManager },
  { key: 'products', label: 'Products', Component: ProductsManager },
  { key: 'videos', label: 'Videos', Component: VideosManager },
  { key: 'gallery', label: 'Patient Gallery', Component: GalleryManager },
]

export default function AdminDashboard() {
  const { signOut } = useAuth()
  const [activeTab, setActiveTab] = useState('submissions')

  const Active = TABS.find((t) => t.key === activeTab)?.Component

  return (
    <div className="min-h-screen bg-gradient-to-b from-cream via-white to-sage/10">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-gradient-to-r from-charcoal to-charcoal/90 border-b border-clay/20 shadow-lg">
        <div className="max-w-7xl mx-auto px-6 py-6 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-clay to-clay-dark flex items-center justify-center shadow-lg">
              <span className="text-white font-display font-bold text-lg">Dr</span>
            </div>
            <div>
              <h1 className="font-display font-bold text-xl text-cream">Sanjivani Clinic</h1>
              <p className="text-xs text-cream/60">Admin Dashboard</p>
            </div>
          </div>
          <button 
            onClick={signOut} 
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-600/10 hover:bg-red-600/20 text-red-600 font-medium text-sm transition-all hover:scale-105"
          >
            🚪 Sign Out
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Tabs Navigation */}
        <div className="flex gap-3 mb-10 flex-wrap">
          {TABS.map((t, idx) => (
            <button
              key={t.key}
              onClick={() => setActiveTab(t.key)}
              className={`px-5 py-3 rounded-lg font-semibold text-sm transition-all hover:scale-105 transform ${
                activeTab === t.key 
                  ? 'bg-gradient-to-r from-clay to-clay-dark text-white shadow-lg' 
                  : 'bg-white text-charcoal/70 border border-cream-dark hover:border-clay hover:bg-cream/50'
              }`}
              style={{ transitionDelay: `${idx * 50}ms` }}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Content */}
        {Active && (
          <div className="animate-fadeIn">
            <Active />
          </div>
        )}
      </div>
    </div>
  )
}
