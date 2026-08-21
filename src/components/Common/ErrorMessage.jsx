export default function ErrorMessage({ message, onRetry }) {
  if (!message) return null
  return (
    <div className="alert alert-error" role="alert">
      <div className="alert-icon" aria-hidden="true">!</div>
      <div className="alert-body">
        <p className="alert-title">Something went wrong</p>
        <p className="alert-text">{message}</p>
        {onRetry && (
          <button className="btn-secondary btn-sm mt-1" onClick={onRetry}>
            Try again
          </button>
        )}
      </div>
    </div>
  )
}
