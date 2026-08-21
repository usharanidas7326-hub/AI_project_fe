import './EmptyState.css'

export default function EmptyState({ title, message, actionLabel, onAction }) {
  return (
    <div className="empty-state">
      <div className="empty-icon" aria-hidden="true">○</div>
      <h3 className="empty-title">{title}</h3>
      {message && <p className="empty-message">{message}</p>}
      {actionLabel && onAction && (
        <button className="btn-primary mt-1" onClick={onAction}>
          {actionLabel}
        </button>
      )}
    </div>
  )
}
