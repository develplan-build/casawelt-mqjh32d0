import React, { useEffect } from 'react';
import { CheckCircle, XCircle, Info, AlertTriangle, X } from 'lucide-react';

export type ToastType = 'success' | 'error' | 'info' | 'warning';

export interface ToastMessage {
  id: string;
  type: ToastType;
  message: string;
}

interface ToastProps {
  toasts: ToastMessage[];
  removeToast: (id: string) => void;
}

export function ToastContainer({ toasts, removeToast }: ToastProps) {
  return (
    <div className="toast-container">
      {toasts.map((toast) => (
        <Toast key={toast.id} toast={toast} removeToast={removeToast} />
      ))}
    </div>
  );
}

function Toast({ toast, removeToast }: { toast: ToastMessage; removeToast: (id: string) => void }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      removeToast(toast.id);
    }, 3000);
    return () => clearTimeout(timer);
  }, [toast.id, removeToast]);

  const icons = {
    success: <CheckCircle size={20} color="var(--success)" />,
    error: <XCircle size={20} color="var(--danger)" />,
    info: <Info size={20} color="var(--info)" />,
    warning: <AlertTriangle size={20} color="var(--warning)" />
  };

  return (
    <div className="toast">
      {icons[toast.type]}
      <span style={{ flex: 1 }}>{toast.message}</span>
      <button className="btn-icon" onClick={() => removeToast(toast.id)} style={{ padding: '0.25rem' }}>
        <X size={16} />
      </button>
    </div>
  );
}
