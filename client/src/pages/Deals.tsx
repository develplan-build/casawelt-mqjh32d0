import React, { useState } from 'react';
import { Plus, Briefcase, Euro, User, Home, MoreVertical, Trash2, Edit } from 'lucide-react';
import { Modal } from '../components/Modal';
import { ToastContainer, ToastMessage } from '../components/Toast';

interface Deal {
  id: string;
  title: string;
  client: string;
  property: string;
  value: number;
  stage: 'Contatto' | 'Visita' | 'Trattativa' | 'Chiuso Vinto' | 'Chiuso Perso';
}

export default function Deals() {
  const [deals, setDeals] = useState<Deal[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const [formData, setFormData] = useState<Partial<Deal>>({
    title: '', client: '', property: '', value: 0, stage: 'Contatto'
  });

  const addToast = (type: ToastMessage['type'], message: string) => {
    const id = Math.random().toString(36).substr(2, 9);
    setToasts(prev => [...prev, { id, type, message }]);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const loadDemoData = () => {
    setDeals([
      { id: '1', title: 'Vendita Attico Milano', client: 'Mario Rossi', property: 'Attico Panoramico', value: 850000, stage: 'Trattativa' },
      { id: '2', title: 'Affitto Bilocale', client: 'Giulia Bianchi', property: 'Bilocale Centro', value: 12000, stage: 'Visita' },
      { id: '3', title: 'Vendita Villa Roma', client: 'Luca Verdi', property: 'Villa con Piscina', value: 1200000, stage: 'Contatto' },
      { id: '4', title: 'Vendita Ufficio', client: 'Marco Neri', property: 'Ufficio 100mq', value: 350000, stage: 'Chiuso Vinto' },
    ]);
    addToast('success', 'Pipeline demo caricata');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.value) {
      addToast('error', 'Titolo e Valore sono obbligatori');
      return;
    }
    
    const newDeal: Deal = {
      id: Math.random().toString(36).substr(2, 9),
      title: formData.title || '',
      client: formData.client || '',
      property: formData.property || '',
      value: Number(formData.value) || 0,
      stage: (formData.stage as any) || 'Contatto'
    };

    setDeals([newDeal, ...deals]);
    setIsModalOpen(false);
    setFormData({ title: '', client: '', property: '', value: 0, stage: 'Contatto' });
    addToast('success', 'Trattativa aggiunta');
  };

  const handleDelete = (id: string) => {
    setDeals(deals.filter(d => d.id !== id));
    addToast('info', 'Trattativa rimossa');
  };

  const stages = ['Contatto', 'Visita', 'Trattativa', 'Chiuso Vinto', 'Chiuso Perso'];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', height: '100%' }}>
      <ToastContainer toasts={toasts} removeToast={removeToast} />
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h2 style={{ margin: '0 0 0.5rem 0' }}>Pipeline Vendite</h2>
          <p style={{ color: 'var(--text-muted)', margin: 0 }}>Monitora lo stato delle trattative in corso.</p>
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button className="btn btn-secondary" onClick={deals.length > 0 ? () => setDeals([]) : loadDemoData}>
            {deals.length > 0 ? 'Svuota Pipeline' : 'Carica Demo'}
          </button>
          <button className="btn btn-primary" onClick={() => setIsModalOpen(true)}>
            <Plus size={20} /> Nuova Trattativa
          </button>
        </div>
      </div>

      {deals.length === 0 ? (
        <div className="empty-state card">
          <div className="empty-state-icon">
            <Briefcase size={32} />
          </div>
          <h3>Nessuna trattativa in corso</h3>
          <p style={{ marginBottom: '1.5rem' }}>La tua pipeline è vuota. Aggiungi una nuova opportunità di vendita.</p>
          <button className="btn btn-primary" onClick={() => setIsModalOpen(true)}>
            Aggiungi Trattativa
          </button>
        </div>
      ) : (
        <div style={{ display: 'flex', gap: '1.5rem', overflowX: 'auto', paddingBottom: '1rem', flex: 1 }}>
          {stages.map(stage => {
            const stageDeals = deals.filter(d => d.stage === stage);
            const stageTotal = stageDeals.reduce((sum, d) => sum + d.value, 0);
            
            return (
              <div key={stage} style={{ minWidth: '300px', width: '300px', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.5rem 0', borderBottom: `2px solid ${stage === 'Chiuso Vinto' ? 'var(--success)' : stage === 'Chiuso Perso' ? 'var(--danger)' : 'var(--accent)'}` }}>
                  <h3 style={{ fontSize: '1rem', margin: 0 }}>{stage} <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem', fontWeight: 'normal' }}>({stageDeals.length})</span></h3>
                  <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>€ {(stageTotal / 1000).toFixed(0)}k</span>
                </div>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {stageDeals.map(deal => (
                    <div key={deal.id} className="card" style={{ padding: '1rem', cursor: 'pointer' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                        <h4 style={{ margin: 0, fontSize: '1rem' }}>{deal.title}</h4>
                        <button className="btn-icon" style={{ padding: 0, color: 'var(--danger)' }} onClick={(e) => { e.stopPropagation(); handleDelete(deal.id); }}>
                          <Trash2 size={16} />
                        </button>
                      </div>
                      <div style={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'var(--accent)', marginBottom: '1rem' }}>
                        € {deal.value.toLocaleString('it-IT')}
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                        {deal.client && <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><User size={14} /> {deal.client}</div>}
                        {deal.property && <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Home size={14} /> {deal.property}</div>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}

      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title="Nuova Trattativa"
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
            <input type="text" className="form-control" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} required placeholder="es. Vendita Villa Roma" />
          </div>
          <div className="form-group">
            <label className="form-label">Valore Stimato (€) *</label>
            <input type="number" className="form-control" value={formData.value} onChange={e => setFormData({...formData, value: Number(e.target.value)})} required />
          </div>
          <div className="form-group">
            <label className="form-label">Cliente</label>
            <input type="text" className="form-control" value={formData.client} onChange={e => setFormData({...formData, client: e.target.value})} placeholder="Nome cliente" />
          </div>
          <div className="form-group">
            <label className="form-label">Immobile</label>
            <input type="text" className="form-control" value={formData.property} onChange={e => setFormData({...formData, property: e.target.value})} placeholder="Riferimento immobile" />
          </div>
          <div className="form-group">
            <label className="form-label">Fase</label>
            <select className="form-control" value={formData.stage} onChange={e => setFormData({...formData, stage: e.target.value as any})}>
              {stages.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
        </form>
      </Modal>
    </div>
  );
}
