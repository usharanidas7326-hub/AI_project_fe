import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <div className="card text-center" style={{ padding: '3rem' }}>
      <h1 style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>404</h1>
      <h2>Page not found</h2>
      <p className="text-muted">The page you are looking for does not exist.</p>
      <Link to="/" className="btn-primary mt-2">Back to Dashboard</Link>
    </div>
  )
}
