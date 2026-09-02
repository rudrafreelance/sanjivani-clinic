import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import Logo from '../../components/Logo'

export default function AdminLogin() {
  const { signIn } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    const { error } = await signIn(email, password)
    setLoading(false)
    if (error) {
      setError(error.message)
      return
    }
    navigate('/admin')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-cream to-sage px-6 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <Logo size={88} />
          </div>
          <h1 className="text-3xl font-display font-bold text-forest mb-1 tracking-wide">SANJIVANI</h1>
          <p className="text-[11px] text-gold tracking-[0.35em] font-semibold mb-3">CLINIC</p>
          <p className="text-sm text-charcoal/60 font-medium">Admin Dashboard</p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg border border-cream-dark p-8 space-y-6">
          <div>
            <label className="block text-sm font-semibold text-charcoal mb-2">Email Address</label>
            <input
              required
              type="email"
              placeholder="admin@sanjivani.clinic"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-cream-dark bg-white focus:outline-none focus:ring-2 focus:ring-clay focus:border-transparent transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-charcoal mb-2">Password</label>
            <input
              required
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-cream-dark bg-white focus:outline-none focus:ring-2 focus:ring-clay focus:border-transparent transition-all"
            />
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-red-700 text-sm">
              <p className="font-medium">❌ Login Failed</p>
              <p className="text-xs mt-1">{error}</p>
            </div>
          )}

          <button type="submit" disabled={loading} className="w-full bg-forest hover:bg-forest-dark hover:shadow-lg text-white font-semibold py-3 px-6 rounded-xl transition-all disabled:opacity-60 hover:scale-105 transform">
            {loading ? '⏳ Signing in…' : '🔐 Sign In'}
          </button>

          <p className="text-xs text-charcoal/50 text-center mt-6">
            Authorized personnel only • Sanjivani Clinic
          </p>
        </form>
      </div>
    </div>
  )
}
