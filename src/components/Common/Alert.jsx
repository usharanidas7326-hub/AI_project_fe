import './Alert.css'

export default function Alert({ type = 'info', title, children }) {
  return (
    <div className={`alert alert-${type}`} role={type === 'error' ? 'alert' : 'status'}>
      <div className="alert-icon" aria-hidden="true">
        {type === 'error' ? '!' : type === 'success' ? '✓' : type === 'warning' ? '!' : 'i'}
      </div>
      <div className="alert-body">
        {title && <p className="alert-title">{title}</p>}
        <div className="alert-text">{children}</div>
      </div>
    </div>
  )
}
