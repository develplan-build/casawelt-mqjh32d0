import React, { useState } from 'react';
import { Plus, Calendar as CalendarIcon, Clock, MapPin, User, Trash2, CheckCircle } from 'lucide-react';
import { Modal } from '../components/Modal';
import { ToastContainer, ToastMessage } from '../components/Toast';

interface Booking {
  id: string;
  title: string;
  date: string;
  time: string;
  client: string;
  location: string;
  status: 'Confermato' | 'Da Confermare' | 'Completato';
}

export default function Bookings() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const [formData, setFormData] = useState<Partial<Booking>>({
    title: '', date: '', time: '', client: '', location: '', status: 'Da Confermare'
  });

  const addToast = (type: ToastMessage['type'], message: string) => {
    const id = Math.random().toString(36).substr(2, 9);
    setToasts(prev => [...prev, { id, type, message }]);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const loadDemoData = () => {
    const today = new Date().toISOString().split('T')[0];
    setBookings([
      { id: '1', title: 'Visita Attico Panoramico', date: today, time: '10:30', client: 'Mario Rossi', location: 'Via Roma 10, Milano', status: 'Confermato' },
      { id: '2', title: 'Firma Contratto Preliminare', date: today, time: '15:00', client: 'Giulia Bianchi', location: 'Ufficio Centrale', status: 'Da Confermare' },
      { id: '3', title: 'Valutazione Immobile', date: '2024-12-20', time: '09:00', client: 'Luca Verdi', location: 'Via Garibaldi 2, Torino', status: 'Completato' },
    ]);
    addToast('success', 'Appuntamenti demo caricati');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.date || !formData.time) {
      addToast('error', 'Compila i campi obbligatori');
      return;
    }
    
    const newBooking: Booking = {
      id: Math.random().toString(36).substr(2, 9),
      title: formData.title || '',
      date: formData.date || '',
      time: formData.time || '',
      client: formData.client || '',
      location: formData.location || '',
      status: (formData.status as any) || 'Da Confermare'
    };

    setBookings([...bookings, newBooking].sort((a, b) => new Date(`${a.date}T${a.time}`).getTime() - new Date(`${b.date}T${b.time}`).getTime()));
    setIsModalOpen(false);
    setFormData({ title: '', date: '', time: '', client: '', location: '', status: 'Da Confermare' });
    addToast('success', 'Appuntamento salvato');
  };

  const handleDelete = (id: string) => {
    setBookings(bookings.filter(b => b.id !== id));
    addToast('info', 'Appuntamento annullato');
  };

  const markCompleted = (id: string) => {
    setBookings(bookings.map(b => b.id === id ? { ...b, status: 'Completato' } : b));
    addToast('success', 'Appuntamento segnato come completato');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <ToastContainer toasts={toasts} removeToast={removeToast} />
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h2 style={{ margin: '0 0 0.5rem 0' }}>Agenda Appuntamenti</h2>
          <p style={{ color: 'var(--text-muted)', margin: 0 }}>Pianifica visite, riunioni e scadenze.</p>
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button className="btn btn-secondary" onClick={bookings.length > 0 ? () => setBookings([]) : loadDemoData}>
            {bookings.length > 0 ? 'Svuota Agenda' : 'Carica Demo'}
          </button>
          <button className="btn btn-primary" onClick={() => setIsModalOpen(true)}>
            <Plus size={20} /> Nuovo Appuntamento
          </button>
        </div>
      </div>

      {bookings.length === 0 ? (
        <div className="empty-state card">
          <div className="empty-state-icon">
            <CalendarIcon size={32} />
          </div>
          <h3>Nessun appuntamento</h3>
          <p style={{ marginBottom: '1.5rem' }}>La tua agenda è libera. Aggiungi un nuovo appuntamento.</p>
          <button className="btn btn-primary" onClick={() => setIsModalOpen(true)}>
            Pianifica ora
          </button>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {bookings.map(booking => (
            <div key={booking.id} className="card" style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', padding: '1.5rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: '80px', paddingRight: '1.5rem', borderRight: '1px solid var(--border-color)' }}>
                <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                  {new Date(booking.date).toLocaleDateString('it-IT', { month: 'short' })}
                </span>
                <span style={{ fontSize: '2rem', fontWeight: 'bold', fontFamily: 'Space Grotesk', lineHeight: 1 }}>
                  {new Date(booking.date).getDate()}
                </span>
              </div>
              
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                  <h3 style={{ margin: 0, fontSize: '1.2rem' }}>{booking.title}</h3>
                  <span className={`badge ${booking.status === 'Confermato' ? 'badge-success' : booking.status === 'Completato' ? 'badge-info' : 'badge-warning'}`}>
                    {booking.status}
                  </span>
                </div>
                
                <div style={{ display: 'flex', gap: '1.5rem', color: 'var(--text-muted)', fontSize: '0.9rem', flexWrap: 'wrap' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Clock size={16} /> {booking.time}</div>
                  {booking.client && <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><User size={16} /> {booking.client}</div>}
                  {booking.location && <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><MapPin size={16} /> {booking.location}</div>}
                </div>
              </div>

              <div style={{ display: 'flex', gap: '0.5rem' }}>
                {booking.status !== 'Completato' && (
                  <button className="btn-icon" style={{ color: 'var(--success)' }} title="Segna come completato" onClick={() => markCompleted(booking.id)}>
                    <CheckCircle size={20} />
                  </button>
                )}
                <button className="btn-icon" style={{ color: 'var(--danger)' }} title="Elimina" onClick={() => handleDelete(booking.id)}>
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title="Nuovo Appuntamento"
        footer={
          <>
            <button className="btn btn-secondary" onClick={() => setIsModalOpen(false)}>Annulla</button>
            <button className="btn btn-primary" onClick={handleSubmit}>Salva</button>
          </>
        }
      >
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Titolo *</label>
            <input type="text" className="form-control" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} required placeholder="es. Visita appartamento..." />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label">Data *</label>
              <input type="date" className="form-control" value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} required />
            </div>
            <div className="form-group">
              <label className="form-label">Ora *</label>
              <input type="time" className="form-control" value={formData.time} onChange={e => setFormData({...formData, time: e.target.value})} required />
            </div>
          </div>
          <div className="form-group">
            <label className="form-label">Cliente</label>
            <input type="text" className="form-control" value={formData.client} onChange={e => setFormData({...formData, client: e.target.value})} placeholder="Nome cliente" />
          </div>
          <div className="form-group">
            <label className="form-label">Luogo</label>
            <input type="text" className="form-control" value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} placeholder="Indirizzo o link meeting" />
          </div>
          <div className="form-group">
            <label className="form-label">Stato</label>
            <select className="form-control" value={formData.status} onChange={e => setFormData({...formData, status: e.target.value as any})}>
              <option>Da Confermare</option>
              <option>Confermato</option>
            </select>
          </div>
        </form>
      </Modal>
    </div>
  );
}
