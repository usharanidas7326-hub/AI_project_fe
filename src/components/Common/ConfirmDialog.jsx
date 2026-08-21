import Modal from './Modal'

export default function ConfirmDialog({
  title = 'Confirm action',
  message,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  danger = false,
  onConfirm,
  onCancel,
}) {
  return (
    <Modal title={title} onClose={onCancel} size="small">
      <p>{message}</p>
      <div className="form-actions">
        <button className="btn-ghost" onClick={onCancel}>
          {cancelLabel}
        </button>
        <button className={danger ? 'btn-danger' : 'btn-primary'} onClick={onConfirm}>
          {confirmLabel}
        </button>
      </div>
    </Modal>
  )
}
