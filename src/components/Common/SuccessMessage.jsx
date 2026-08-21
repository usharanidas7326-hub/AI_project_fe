export default function SuccessMessage({ message }) {
  if (!message) return null
  return (
    <div className="alert alert-success" role="status">
      <div className="alert-icon" aria-hidden="true">✓</div>
      <div className="alert-body">
        <p className="alert-text">{message}</p>
      </div>
    </div>
  )
}
