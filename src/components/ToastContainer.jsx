'use client';

import React from 'react';

export default function ToastContainer({ toasts, onDismiss }) {
  if (!toasts || toasts.length === 0) return null;

  return (
    <div className="toast-container" id="toastContainer">
      {toasts.map((t) => (
        <div key={t.id} className="toast" onClick={() => onDismiss(t.id)}>
          <span className="toast-icon">{t.icon || '⚡'}</span>
          <div className="toast-content">
            <div className="toast-title">{t.title}</div>
            <div className="toast-desc">{t.desc}</div>
          </div>
          {t.xp && <span className="toast-xp">{t.xp}</span>}
        </div>
      ))}
    </div>
  );
}
