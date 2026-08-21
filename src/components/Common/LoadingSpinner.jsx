import './LoadingSpinner.css'

export default function LoadingSpinner({ message = 'Loading…' }) {
  return (
    <div className="loading-spinner" role="status" aria-live="polite">
      <div className="spinner" aria-hidden="true" />
      <p className="loading-message">{message}</p>
    </div>
  )
}
