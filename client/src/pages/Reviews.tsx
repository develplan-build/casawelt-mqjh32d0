import React, { useState } from 'react';
import { Star, Plus, Search, Filter, Trash2, Edit, MessageSquare } from 'lucide-react';
import { Modal } from '../components/Modal';
import { ToastContainer, ToastMessage } from '../components/Toast';

interface Review {
  id: string;
  clientName: string;
  property: string;
  rating: number;
  comment: string;
  date: string;
}

export default function Reviews() {
  const [reviews, setReviews] = useState<Review[]>([
    {
      id: '1',
      clientName: 'Marco Rossi',
      property: 'Villa Vista Mare - Positano',
      rating: 5,
      comment: 'Esperienza fantastica, la villa era esattamente come descritta. Servizio impeccabile.',
      date: '2023-10-15'
    },
    {
      id: '2',
      clientName: 'Laura Bianchi',
      property: 'Appartamento Centro Storico - Roma',
      rating: 4,
      comment: 'Ottima posizione, molto pulito. Unica pecca il rumore della strada di notte.',
      date: '2023-10-10'
    }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  const [formData, setFormData] = useState({
    clientName: '',
    property: '',
    rating: 5,
    comment: ''
  });

  const addToast = (type: ToastMessage['type'], message: string) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts(prev => [...prev, { id, type, message }]);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: name === 'rating' ? parseInt(value) : value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newReview: Review = {
      id: Date.now().toString(),
      clientName: formData.clientName,
      property: formData.property,
      rating: formData.rating,
      comment: formData.comment,
      date: new Date().toISOString().split('T')[0]
    };

    setReviews([newReview, ...reviews]);
    setIsModalOpen(false);
    setFormData({ clientName: '', property: '', rating: 5, comment: '' });
    addToast('success', 'Recensione aggiunta con successo');
  };

  const handleDelete = (id: string) => {
    setReviews(reviews.filter(r => r.id !== id));
    addToast('success', 'Recensione eliminata');
  };

  const filteredReviews = reviews.filter(r => 
    r.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.property.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.comment.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const renderStars = (rating: number) => {
    return (
      <div style={{ display: 'flex', gap: '2px' }}>
        {[1, 2, 3, 4, 5].map(star => (
          <Star 
            key={star} 
            size={16} 
            fill={star <= rating ? '#F97316' : 'transparent'} 
            color={star <= rating ? '#F97316' : '#cbd5e1'} 
          />
        ))}
      </div>
    );
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h1 className="page-title">Recensioni</h1>
          <p className="page-subtitle">Gestisci i feedback dei tuoi clienti</p>
        </div>
        <button className="btn btn-primary" onClick={() => setIsModalOpen(true)}>
          <Plus size={20} />
          <span>Nuova Recensione</span>
        </button>
      </div>

      <div className="card" style={{ marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <div className="search-bar" style={{ flex: 1, minWidth: '250px' }}>
            <Search size={20} />
            <input 
              type="text" 
              placeholder="Cerca per cliente, immobile o commento..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="btn btn-secondary">
            <Filter size={20} />
            <span>Filtra</span>
          </button>
        </div>
      </div>

      <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))' }}>
        {filteredReviews.length > 0 ? (
          filteredReviews.map(review => (
            <div key={review.id} className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <h3 style={{ fontWeight: 600, marginBottom: '0.25rem' }}>{review.clientName}</h3>
                  <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>{review.property}</p>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button className="btn-icon" title="Modifica">
                    <Edit size={16} />
                  </button>
                  <button className="btn-icon" style={{ color: 'var(--danger)' }} onClick={() => handleDelete(review.id)} title="Elimina">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
              
              {renderStars(review.rating)}
              
              <div style={{ 
                padding: '1rem', 
                backgroundColor: 'var(--bg-secondary)', 
                borderRadius: 'var(--radius-md)',
                position: 'relative'
              }}>
                <MessageSquare size={16} style={{ position: 'absolute', top: '1rem', left: '1rem', color: 'var(--text-muted)' }} />
                <p style={{ margin: 0, paddingLeft: '1.5rem', fontSize: '0.95rem', lineHeight: 1.5 }}>
                  "{review.comment}"
                </p>
              </div>
              
              <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)', textAlign: 'right' }}>
                {new Date(review.date).toLocaleDateString('it-IT')}
              </div>
            </div>
          ))
        ) : (
          <div className="empty-state" style={{ gridColumn: '1 / -1' }}>
            <MessageSquare size={48} />
            <h3>Nessuna recensione trovata</h3>
            <p>Non ci sono recensioni che corrispondono ai criteri di ricerca.</p>
          </div>
        )}
      </div>

      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title="Aggiungi Recensione"
        footer={
          <>
            <button className="btn btn-secondary" onClick={() => setIsModalOpen(false)}>Annulla</button>
            <button className="btn btn-primary" onClick={handleSubmit}>Salva Recensione</button>
          </>
        }
      >
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div className="form-group">
            <label className="form-label">Nome Cliente</label>
            <input 
              type="text" 
              className="form-input" 
              name="clientName"
              value={formData.clientName}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label">Immobile</label>
            <input 
              type="text" 
              className="form-input" 
              name="property"
              value={formData.property}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label">Valutazione (1-5)</label>
            <select 
              className="form-input" 
              name="rating"
              value={formData.rating}
              onChange={handleInputChange}
            >
              {[5, 4, 3, 2, 1].map(num => (
                <option key={num} value={num}>{num} Stelle</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Commento</label>
            <textarea 
              className="form-input" 
              name="comment"
              value={formData.comment}
              onChange={handleInputChange}
              rows={4}
              required
            />
          </div>
        </form>
      </Modal>

      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </div>
  );
}
