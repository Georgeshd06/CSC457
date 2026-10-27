function ConfirmModal({ title, message, confirmLabel, onConfirm, onCancel }) {
  return (
    <div className="modal-backdrop" onClick={onCancel}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h2>{title}</h2>
        <p>{message}</p>
        <div className="modal-actions">
          <button className="btn danger" onClick={onConfirm}>{confirmLabel}</button>
          <button className="btn ghost" onClick={onCancel}>Cancel</button>
        </div>
      </div>
    </div>
  )
}

export default ConfirmModal