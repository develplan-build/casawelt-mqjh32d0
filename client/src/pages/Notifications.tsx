import React, { useState } from 'react';
import { Bell, Calendar, FileText, CheckCircle, Trash2, Check } from 'lucide-react';
import { ToastContainer, ToastMessage } from '../components/Toast';

interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  type: 'appointment' | 'document' | 'system';
  read: boolean;
}

export default function Notifications() {
  const [notifications, setNotifications] = useState<Notification[]>([
    { id: '1', title: 'Nuovo Appuntamento', message: 'Mario Rossi ha confermato la visita per l\'Attico Panoramico.', time: '10 min fa', type: 'appointment', read: false },
    { id: '2', title: 'Documento Firmato', message: 'Il contratto preliminare è stato firmato da Giulia Bianchi.', time: '2 ore fa', type: 'document', read: false },
    { id: '3', title: 'Aggiornamento Sistema', message: 'La piattaforma è stata aggiornata alla versione 2.0.', time: '1 giorno fa', type: 'system', read: true },
  ]);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = (type: ToastMessage['type'], message: string) => {
    const id = Math.random().toString(36).substr(2, 9);
    setToasts(prev => [...prev, { id, type, message }]);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
    addToast('success', 'Tutte le notifiche segnate come lette');
  };

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const deleteNotification = (id: string) => {
    setNotifications(notifications.filter(n => n.id !== id));
    addToast('info', 'Notifica eliminata');
  };

  const getIcon = (type: Notification['type']) => {
    switch (type) {
      case 'appointment': return <Calendar size={20} color="var(--info)" />;
      case 'document': return <FileText size={20} color="var(--success)" />;
      case 'system': return <Bell size={20} color="var(--warning)" />;
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <ToastContainer toasts={toasts} removeToast={removeToast} />
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h2 style={{ margin: '0 0 0.5rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            Notifiche 
            {unreadCount > 0 && <span className="badge badge-warning">{unreadCount} nuove</span>}
          </h2>
          <p style={{ color: 'var(--text-muted)', margin: 0 }}>Rimani aggiornato sulle attività importanti.</p>
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button className="btn btn-secondary" onClick={markAllAsRead} disabled={unreadCount === 0}>
            <CheckCircle size={20} /> Segna tutte come lette
          </button>
        </div>
      </div>

      {notifications.length === 0 ? (
        <div className="empty-state card">
          <div className="empty-state-icon">
            <Bell size={32} />
          </div>
          <h3>Nessuna notifica</h3>
          <p>Non hai nuove notifiche al momento.</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {notifications.map(notification => (
            <div 
              key={notification.id} 
              className="card" 
              style={{ 
                display: 'flex', 
                gap: '1.5rem', 
                alignItems: 'flex-start', 
                padding: '1.5rem',
                borderLeft: !notification.read ? '4px solid var(--accent)' : '4px solid transparent',
                background: !notification.read ? 'var(--bg-main)' : 'var(--bg-card)'
              }}
            >
              <div style={{ padding: '0.75rem', background: 'var(--bg-card)', borderRadius: '50%', border: '1px solid var(--border-color)' }}>
                {getIcon(notification.type)}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                  <h4 style={{ margin: 0, fontSize: '1.1rem', fontWeight: !notification.read ? 700 : 500 }}>{notification.title}</h4>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{notification.time}</span>
                </div>
                <p style={{ margin: 0, color: 'var(--text-muted)', lineHeight: 1.5 }}>{notification.message}</p>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                {!notification.read && (
                  <button className="btn-icon" title="Segna come letta" onClick={() => markAsRead(notification.id)}>
                    <Check size={18} />
                  </button>
                )}
                <button className="btn-icon" style={{ color: 'var(--danger)' }} title="Elimina" onClick={() => deleteNotification(notification.id)}>
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
