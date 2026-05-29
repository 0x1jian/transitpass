import React from 'react';

export default function ConfirmModal({ booking, onConfirm, onCancel }) {
  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="modal confirm-dialog" onClick={e => e.stopPropagation()}>
        <div className="modal-body" style={{ padding: '36px 28px 24px', textAlign: 'center' }}>
          <span className="confirm-icon">🗑️</span>
          <h3>Delete Booking?</h3>
          <p>
            You're about to delete the booking for{' '}
            <strong style={{ color: 'var(--clr-text)' }}>{booking?.passengerName}</strong>.
            <br />This action cannot be undone.
          </p>
          <div style={{ display: 'flex', gap: 10, justifyContent: 'center' }}>
            <button className="btn btn-ghost" onClick={onCancel}>
              Cancel
            </button>
            <button className="btn btn-danger" onClick={onConfirm}>
              🗑 Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
