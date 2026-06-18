import React, { useState } from 'react';
import { User, Mail, Phone, MapPin, Camera, Save } from 'lucide-react';
import { ToastContainer, ToastMessage } from '../components/Toast';

export default function Profile() {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [isEditing, setIsEditing] = useState(false);

  const [profile, setProfile] = useState({
    firstName: 'Marco',
    lastName: 'Rossi',
    email: 'marco.rossi@casawelt.com',
    phone: '+39 333 1234567',
    role: 'Amministratore',
    bio: 'Agente immobiliare senior con oltre 10 anni di esperienza nel mercato residenziale di lusso.',
    location: 'Milano, Italia'
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
    setIsEditing(false);
    addToast('success', 'Profilo aggiornato con successo');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <ToastContainer toasts={toasts} removeToast={removeToast} />
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ margin: '0 0 0.5rem 0' }}>Il mio Profilo</h2>
          <p style={{ color: 'var(--text-muted)', margin: 0 }}>Gestisci le tue informazioni personali.</p>
        </div>
        {!isEditing && (
          <button className="btn btn-primary" onClick={() => setIsEditing(true)}>
            Modifica Profilo
          </button>
        )}
      </div>

      <div className="card" style={{ padding: '2rem' }}>
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start', flexWrap: 'wrap' }}>
          {/* Avatar Section */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
            <div style={{ position: 'relative' }}>
              <div style={{ width: '120px', height: '120px', borderRadius: '50%', background: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '3rem', fontWeight: 'bold' }}>
                {profile.firstName[0]}{profile.lastName[0]}
              </div>
              {isEditing && (
                <button className="btn-icon" style={{ position: 'absolute', bottom: 0, right: 0, background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '50%', padding: '0.5rem' }} title="Cambia foto">
                  <Camera size={20} />
                </button>
              )}
            </div>
            <div className="badge badge-info">{profile.role}</div>
          </div>

          {/* Info Section */}
          <div style={{ flex: 1, minWidth: '300px' }}>
            {isEditing ? (
              <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className="form-group">
                    <label className="form-label">Nome</label>
                    <input type="text" className="form-control" value={profile.firstName} onChange={e => setProfile({...profile, firstName: e.target.value})} required />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Cognome</label>
                    <input type="text" className="form-control" value={profile.lastName} onChange={e => setProfile({...profile, lastName: e.target.value})} required />
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Email</label>
                  <input type="email" className="form-control" value={profile.email} onChange={e => setProfile({...profile, email: e.target.value})} required />
                </div>
                <div className="form-group">
                  <label className="form-label">Telefono</label>
                  <input type="tel" className="form-control" value={profile.phone} onChange={e => setProfile({...profile, phone: e.target.value})} />
                </div>
                <div className="form-group">
                  <label className="form-label">Posizione</label>
                  <input type="text" className="form-control" value={profile.location} onChange={e => setProfile({...profile, location: e.target.value})} />
                </div>
                <div className="form-group">
                  <label className="form-label">Bio</label>
                  <textarea className="form-control" rows={4} value={profile.bio} onChange={e => setProfile({...profile, bio: e.target.value})}></textarea>
                </div>
                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end', marginTop: '1rem' }}>
                  <button type="button" className="btn btn-secondary" onClick={() => setIsEditing(false)}>Annulla</button>
                  <button type="submit" className="btn btn-primary"><Save size={20} /> Salva</button>
                </div>
              </form>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div>
                  <h3 style={{ fontSize: '1.8rem', margin: '0 0 0.5rem 0' }}>{profile.firstName} {profile.lastName}</h3>
                  <p style={{ color: 'var(--text-muted)', margin: 0, lineHeight: 1.6 }}>{profile.bio}</p>
                </div>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: 'var(--text-main)' }}>
                    <Mail size={20} color="var(--text-muted)" />
                    <span>{profile.email}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: 'var(--text-main)' }}>
                    <Phone size={20} color="var(--text-muted)" />
                    <span>{profile.phone}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: 'var(--text-main)' }}>
                    <MapPin size={20} color="var(--text-muted)" />
                    <span>{profile.location}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
