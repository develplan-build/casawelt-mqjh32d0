import React, { useState } from 'react';
import { Plus, Search, Filter, Users, Mail, Phone, Edit, Trash2, MoreVertical } from 'lucide-react';
import { Modal } from '../components/Modal';
import { ToastContainer, ToastMessage } from '../components/Toast';

interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  type: 'Acquirente' | 'Venditore' | 'Locatario';
  status: 'Attivo' | 'Inattivo';
}

export default function Clients() {
  const [clients, setClients] = useState<Client[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  const [formData, setFormData] = useState<Partial<Client>>({
    name: '', email: '', phone: '', type: 'Acquirente', status: 'Attivo'
  });

  const addToast = (type: ToastMessage['type'], message: string) => {
    const id = Math.random().toString(36).substr(2, 9);
    setToasts(prev => [...prev, { id, type, message }]);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const loadDemoData = () => {
    setClients([
      { id: '1', name: 'Mario Rossi', email: 'mario.rossi@email.com', phone: '+39 333 1234567', type: 'Acquirente', status: 'Attivo' },
      { id: '2', name: 'Giulia Bianchi', email: 'giulia.b@email.com', phone: '+39 340 9876543', type: 'Venditore', status: 'Attivo' },
      { id: '3', name: 'Luca Verdi', email: 'l.verdi@email.com', phone: '+39 328 5556667', type: 'Locatario', status: 'Inattivo' },
    ]);
    addToast('success', 'Dati demo caricati con successo');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      addToast('error', 'Nome ed Email sono obbligatori');
      return;
    }
    
    const newClient: Client = {
      id: Math.random().toString(36).substr(2, 9),
      name: formData.name || '',
      email: formData.email || '',
      phone: formData.phone || '',
      type: (formData.type as any) || 'Acquirente',
      status: (formData.status as any) || 'Attivo'
    };

    setClients([newClient, ...clients]);
    setIsModalOpen(false);
    setFormData({ name: '', email: '', phone: '', type: 'Acquirente', status: 'Attivo' });
    addToast('success', 'Cliente aggiunto con successo');
  };

  const handleDelete = (id: string) => {
    setClients(clients.filter(c => c.id !== id));
    addToast('info', 'Cliente rimosso');
  };

  const filteredClients = clients.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <ToastContainer toasts={toasts} removeToast={removeToast} />
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h2 style={{ margin: '0 0 0.5rem 0' }}>Clienti (CRM)</h2>
          <p style={{ color: 'var(--text-muted)', margin: 0 }}>Gestisci i contatti e le relazioni con i clienti.</p>
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button className="btn btn-secondary" onClick={clients.length > 0 ? () => setClients([]) : loadDemoData}>
            {clients.length > 0 ? 'Svuota Lista' : 'Carica Demo'}
          </button>
          <button className="btn btn-primary" onClick={() => setIsModalOpen(true)}>
            <Plus size={20} /> Nuovo Cliente
          </button>
        </div>
      </div>

      <div className="card" style={{ padding: '1rem', display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <div style={{ position: 'relative', flex: 1 }}>
          <Search size={20} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <input 
            type="text" 
            className="form-control" 
            placeholder="Cerca per nome o email..." 
            style={{ paddingLeft: '3rem' }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button className="btn btn-secondary">
          <Filter size={20} /> Filtra
        </button>
      </div>

      {filteredClients.length === 0 ? (
        <div className="empty-state card">
          <div className="empty-state-icon">
            <Users size={32} />
          </div>
          <h3>Nessun cliente trovato</h3>
          <p style={{ marginBottom: '1.5rem' }}>Il tuo CRM è vuoto. Inizia aggiungendo il tuo primo contatto.</p>
          <button className="btn btn-primary" onClick={() => setIsModalOpen(true)}>
            Aggiungi il primo cliente
          </button>
        </div>
      ) : (
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Nome</th>
                <th>Contatti</th>
                <th>Tipologia</th>
                <th>Stato</th>
                <th style={{ textAlign: 'right' }}>Azioni</th>
              </tr>
            </thead>
            <tbody>
              {filteredClients.map(client => (
                <tr key={client.id}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--accent-light)', color: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
                        {client.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()}
                      </div>
                      <span style={{ fontWeight: 500 }}>{client.name}</span>
                    </div>
                  </td>
                  <td>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', fontSize: '0.9rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)' }}><Mail size={14} /> {client.email}</div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)' }}><Phone size={14} /> {client.phone || '-'}</div>
                    </div>
                  </td>
                  <td>
                    <span className="badge" style={{ background: 'var(--bg-main)', border: '1px solid var(--border-color)' }}>{client.type}</span>
                  </td>
                  <td>
                    <span className={`badge ${client.status === 'Attivo' ? 'badge-success' : 'badge-danger'}`}>{client.status}</span>
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
                      <button className="btn-icon" title="Modifica"><Edit size={18} /></button>
                      <button className="btn-icon" style={{ color: 'var(--danger)' }} title="Elimina" onClick={() => handleDelete(client.id)}><Trash2 size={18} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title="Nuovo Cliente"
        footer={
          <>
            <button className="btn btn-secondary" onClick={() => setIsModalOpen(false)}>Annulla</button>
            <button className="btn btn-primary" onClick={handleSubmit}>Salva Cliente</button>
          </>
        }
      >
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Nome Completo *</label>
            <input type="text" className="form-control" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} required />
          </div>
          <div className="form-group">
            <label className="form-label">Email *</label>
            <input type="email" className="form-control" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} required />
          </div>
          <div className="form-group">
            <label className="form-label">Telefono</label>
            <input type="tel" className="form-control" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label">Tipologia</label>
              <select className="form-control" value={formData.type} onChange={e => setFormData({...formData, type: e.target.value as any})}>
                <option>Acquirente</option>
                <option>Venditore</option>
                <option>Locatario</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Stato</label>
              <select className="form-control" value={formData.status} onChange={e => setFormData({...formData, status: e.target.value as any})}>
                <option>Attivo</option>
                <option>Inattivo</option>
              </select>
            </div>
          </div>
        </form>
      </Modal>
    </div>
  );
}
