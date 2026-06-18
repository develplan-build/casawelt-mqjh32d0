import React, { useState } from 'react';
import { Save, Globe, Bell, Lock, Building } from 'lucide-react';
import { ToastContainer, ToastMessage } from '../components/Toast';

export default function Settings() {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [activeTab, setActiveTab] = useState('general');

  const [formData, setFormData] = useState({
    agencyName: 'CasaWelt Agency',
    email: 'admin@casawelt.com',
    phone: '+39 02 1234567',
    address: 'Via Roma 1, Milano',
    currency: 'EUR',
    language: 'it',
    emailNotif: true,
    pushNotif: true,
    smsNotif: false
  });

  const addToast = (type: ToastMessage['type'], message: string) => {
    const id = Math.random().toString(36).substr(2, 9);
    setToasts(prev => [...prev, { id, type, message }]);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    addToast('success', 'Impostazioni salvate con successo');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', maxWidth: '1000px', margin: '0 auto' }}>
      <ToastContainer toasts={toasts} removeToast={removeToast} />
      
      <div>
        <h2 style={{ margin: '0 0 0.5rem 0' }}>Impostazioni</h2>
        <p style={{ color: 'var(--text-muted)', margin: 0 }}>Gestisci le preferenze della tua agenzia.</p>
      </div>

      <div style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start', flexWrap: 'wrap' }}>
        {/* Sidebar Impostazioni */}
        <div className="card" style={{ padding: '1rem', minWidth: '250px', flex: '1 1 250px' }}>
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <button 
              className={`btn ${activeTab === 'general' ? 'btn-primary' : 'btn-secondary'}`} 
              style={{ justifyContent: 'flex-start', background: activeTab === 'general' ? '' : 'transparent', border: activeTab === 'general' ? '' : 'none' }}
              onClick={() => setActiveTab('general')}
            >
              <Building size={20} /> Generali
            </button>
            <button 
              className={`btn ${activeTab === 'localization' ? 'btn-primary' : 'btn-secondary'}`} 
              style={{ justifyContent: 'flex-start', background: activeTab === 'localization' ? '' : 'transparent', border: activeTab === 'localization' ? '' : 'none' }}
              onClick={() => setActiveTab('localization')}
            >
              <Globe size={20} /> Localizzazione
            </button>
            <button 
              className={`btn ${activeTab === 'notifications' ? 'btn-primary' : 'btn-secondary'}`} 
              style={{ justifyContent: 'flex-start', background: activeTab === 'notifications' ? '' : 'transparent', border: activeTab === 'notifications' ? '' : 'none' }}
              onClick={() => setActiveTab('notifications')}
            >
              <Bell size={20} /> Notifiche
            </button>
            <button 
              className={`btn ${activeTab === 'security' ? 'btn-primary' : 'btn-secondary'}`} 
              style={{ justifyContent: 'flex-start', background: activeTab === 'security' ? '' : 'transparent', border: activeTab === 'security' ? '' : 'none' }}
              onClick={() => setActiveTab('security')}
            >
              <Lock size={20} /> Sicurezza
            </button>
          </nav>
        </div>

        {/* Contenuto Impostazioni */}
        <div className="card" style={{ flex: '3 1 500px' }}>
          <form onSubmit={handleSave}>
            {activeTab === 'general' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <h3 style={{ margin: 0, borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem' }}>Informazioni Agenzia</h3>
                <div className="form-group">
                  <label className="form-label">Nome Agenzia</label>
                  <input type="text" className="form-control" value={formData.agencyName} onChange={e => setFormData({...formData, agencyName: e.target.value})} />
                </div>
                <div className="form-group">
                  <label className="form-label">Email di Contatto</label>
                  <input type="email" className="form-control" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
                </div>
                <div className="form-group">
                  <label className="form-label">Telefono</label>
                  <input type="tel" className="form-control" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
                </div>
                <div className="form-group">
                  <label className="form-label">Indirizzo Sede</label>
                  <input type="text" className="form-control" value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} />
                </div>
              </div>
            )}

            {activeTab === 'localization' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <h3 style={{ margin: 0, borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem' }}>Lingua e Valuta</h3>
                <div className="form-group">
                  <label className="form-label">Lingua Predefinita</label>
                  <select className="form-control" value={formData.language} onChange={e => setFormData({...formData, language: e.target.value})}>
                    <option value="it">Italiano</option>
                    <option value="en">English</option>
                    <option value="es">Español</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Valuta</label>
                  <select className="form-control" value={formData.currency} onChange={e => setFormData({...formData, currency: e.target.value})}>
                    <option value="EUR">Euro (€)</option>
                    <option value="USD">Dollaro ($)</option>
                    <option value="GBP">Sterlina (£)</option>
                  </select>
                </div>
              </div>
            )}

            {activeTab === 'notifications' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <h3 style={{ margin: 0, borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem' }}>Preferenze Notifiche</h3>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem', background: 'var(--bg-main)', borderRadius: '8px' }}>
                  <div>
                    <div style={{ fontWeight: 600 }}>Notifiche Email</div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Ricevi aggiornamenti via email</div>
                  </div>
                  <input type="checkbox" checked={formData.emailNotif} onChange={e => setFormData({...formData, emailNotif: e.target.checked})} style={{ width: '20px', height: '20px' }} />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem', background: 'var(--bg-main)', borderRadius: '8px' }}>
                  <div>
                    <div style={{ fontWeight: 600 }}>Notifiche Push</div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Ricevi notifiche nel browser</div>
                  </div>
                  <input type="checkbox" checked={formData.pushNotif} onChange={e => setFormData({...formData, pushNotif: e.target.checked})} style={{ width: '20px', height: '20px' }} />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem', background: 'var(--bg-main)', borderRadius: '8px' }}>
                  <div>
                    <div style={{ fontWeight: 600 }}>Notifiche SMS</div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Ricevi avvisi urgenti via SMS</div>
                  </div>
                  <input type="checkbox" checked={formData.smsNotif} onChange={e => setFormData({...formData, smsNotif: e.target.checked})} style={{ width: '20px', height: '20px' }} />
                </div>
              </div>
            )}

            {activeTab === 'security' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <h3 style={{ margin: 0, borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem' }}>Cambio Password</h3>
                <div className="form-group">
                  <label className="form-label">Password Attuale</label>
                  <input type="password" className="form-control" placeholder="••••••••" />
                </div>
                <div className="form-group">
                  <label className="form-label">Nuova Password</label>
                  <input type="password" className="form-control" placeholder="••••••••" />
                </div>
                <div className="form-group">
                  <label className="form-label">Conferma Nuova Password</label>
                  <input type="password" className="form-control" placeholder="••••••••" />
                </div>
              </div>
            )}

            <div style={{ marginTop: '2rem', paddingTop: '1rem', borderTop: '1px solid var(--border-color)', display: 'flex', justifyContent: 'flex-end' }}>
              <button type="submit" className="btn btn-primary">
                <Save size={20} /> Salva Modifiche
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
