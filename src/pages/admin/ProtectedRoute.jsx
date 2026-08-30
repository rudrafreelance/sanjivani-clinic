import { Navigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

export default function ProtectedRoute({ children }) {
  const { session, loading } = useAuth()

  if (loading) return <div className="p-10 text-center text-charcoal/50">Loading…</div>
  if (!session) return <Navigate to="/admin/login" replace />

  return children
}
