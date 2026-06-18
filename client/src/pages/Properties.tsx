import React, { useState } from 'react';
import { Plus, Search, Filter, Home, MapPin, Euro, Edit, Trash2 } from 'lucide-react';
import { Modal } from '../components/Modal';
import { ToastContainer, ToastMessage } from '../components/Toast';

interface Property {
  id: string;
  title: string;
  address: string;
  price: number;
  status: 'Disponibile' | 'In Trattativa' | 'Venduto';
  type: string;
}

export default function Properties() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  const [formData, setFormData] = useState<Partial<Property>>({
    title: '', address: '', price: 0, status: 'Disponibile', type: 'Appartamento'
  });

  const addToast = (type: ToastMessage['type'], message: string) => {
    const id = Math.random().toString(36).substr(2, 9);
    setToasts(prev => [...prev, { id, type, message }]);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const loadDemoData = () => {
    setProperties([
      { id: '1', title: 'Attico Panoramico', address: 'Via Roma 10, Milano', price: 850000, status: 'Disponibile', type: 'Attico' },
      { id: '2', title: 'Villa con Piscina', address: 'Via dei Colli 45, Roma', price: 1200000, status: 'In Trattativa', type: 'Villa' },
      { id: '3', title: 'Bilocale Ristrutturato', address: 'Via Garibaldi 2, Torino', price: 210000, status: 'Venduto', type: 'Appartamento' },
    ]);
    addToast('success', 'Dati demo caricati con successo');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.price) {
      addToast('error', 'Compila tutti i campi obbligatori');
      return;
    }
    
    const newProperty: Property = {
      id: Math.random().toString(36).substr(2, 9),
      title: formData.title || '',
      address: formData.address || '',
      price: Number(formData.price) || 0,
      status: (formData.status as any) || 'Disponibile',
      type: formData.type || 'Appartamento'
    };

    setProperties([newProperty, ...properties]);
    setIsModalOpen(false);
    setFormData({ title: '', address: '', price: 0, status: 'Disponibile', type: 'Appartamento' });
    addToast('success', 'Immobile aggiunto con successo');
  };

  const handleDelete = (id: string) => {
    setProperties(properties.filter(p => p.id !== id));
    addToast('info', 'Immobile rimosso');
  };

  const filteredProperties = properties.filter(p => 
    p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <ToastContainer toasts={toasts} removeToast={removeToast} />
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h2 style={{ margin: '0 0 0.5rem 0' }}>Catalogo Immobili</h2>
          <p style={{ color: 'var(--text-muted)', margin: 0 }}>Gestisci le proprietà della tua agenzia.</p>
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button className="btn btn-secondary" onClick={properties.length > 0 ? () => setProperties([]) : loadDemoData}>
            {properties.length > 0 ? 'Svuota Lista' : 'Carica Demo'}
          </button>
          <button className="btn btn-primary" onClick={() => setIsModalOpen(true)}>
            <Plus size={20} /> Nuovo Immobile
          </button>
        </div>
      </div>

      <div className="card" style={{ padding: '1rem', display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <div style={{ position: 'relative', flex: 1 }}>
          <Search size={20} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <input 
            type="text" 
            className="form-control" 
            placeholder="Cerca per titolo o indirizzo..." 
            style={{ paddingLeft: '3rem' }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button className="btn btn-secondary">
          <Filter size={20} /> Filtra
        </button>
      </div>

      {filteredProperties.length === 0 ? (
        <div className="empty-state card">
          <div className="empty-state-icon">
            <Home size={32} />
          </div>
          <h3>Nessun immobile trovato</h3>
          <p style={{ marginBottom: '1.5rem' }}>Non ci sono proprietà nel catalogo al momento.</p>
          <button className="btn btn-primary" onClick={() => setIsModalOpen(true)}>
            Aggiungi il primo immobile
          </button>
        </div>
      ) : (
        <div className="grid-3">
          {filteredProperties.map(property => (
            <div key={property.id} className="card" style={{ padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
              <div style={{ height: '200px', background: 'var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }}>
                <Home size={48} opacity={0.5} />
              </div>
              <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                  <h3 style={{ margin: 0, fontSize: '1.25rem' }}>{property.title}</h3>
                  <span className={`badge ${property.status === 'Disponibile' ? 'badge-success' : property.status === 'Venduto' ? 'badge-danger' : 'badge-warning'}`}>
                    {property.status}
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
                  <MapPin size={16} /> {property.address}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
                  <Home size={16} /> {property.type}
                </div>
                <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '1rem', borderTop: '1px solid var(--border-color)' }}>
                  <div style={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'var(--accent)', display: 'flex', alignItems: 'center' }}>
                    <Euro size={20} /> {property.price.toLocaleString('it-IT')}
                  </div>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button className="btn-icon" title="Modifica"><Edit size={18} /></button>
                    <button className="btn-icon" style={{ color: 'var(--danger)' }} title="Elimina" onClick={() => handleDelete(property.id)}><Trash2 size={18} /></button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title="Nuovo Immobile"
        footer={
          <>
            <button className="btn btn-secondary" onClick={() => setIsModalOpen(false)}>Annulla</button>
            <button className="btn btn-primary" onClick={handleSubmit}>Salva Immobile</button>
          </>
        }
      >
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Titolo Annuncio *</label>
            <input type="text" className="form-control" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} required />
          </div>
          <div className="form-group">
            <label className="form-label">Indirizzo</label>
            <input type="text" className="form-control" value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label">Prezzo (€) *</label>
              <input type="number" className="form-control" value={formData.price} onChange={e => setFormData({...formData, price: Number(e.target.value)})} required />
            </div>
            <div className="form-group">
              <label className="form-label">Tipologia</label>
              <select className="form-control" value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})}>
                <option>Appartamento</option>
                <option>Villa</option>
                <option>Attico</option>
                <option>Ufficio</option>
                <option>Locale Commerciale</option>
              </select>
            </div>
          </div>
          <div className="form-group">
            <label className="form-label">Stato</label>
            <select className="form-control" value={formData.status} onChange={e => setFormData({...formData, status: e.target.value as any})}>
              <option>Disponibile</option>
              <option>In Trattativa</option>
              <option>Venduto</option>
            </select>
          </div>
        </form>
      </Modal>
    </div>
  );
}
