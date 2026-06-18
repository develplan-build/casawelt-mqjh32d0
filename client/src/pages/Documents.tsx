import React, { useState, useRef } from 'react';
import { FileText, Upload, Download, Trash2, Search, File, FileImage, FileArchive } from 'lucide-react';
import { ToastContainer, ToastMessage } from '../components/Toast';

interface Doc {
  id: string;
  name: string;
  size: string;
  date: string;
  type: 'pdf' | 'image' | 'archive' | 'other';
}

export default function Documents() {
  const [documents, setDocuments] = useState<Doc[]>([]);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const addToast = (type: ToastMessage['type'], message: string) => {
    const id = Math.random().toString(36).substr(2, 9);
    setToasts(prev => [...prev, { id, type, message }]);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const loadDemoData = () => {
    setDocuments([
      { id: '1', name: 'Contratto_Preliminare_Rossi.pdf', size: '2.4 MB', date: '2024-11-20', type: 'pdf' },
      { id: '2', name: 'Planimetria_Attico.pdf', size: '5.1 MB', date: '2024-11-18', type: 'pdf' },
      { id: '3', name: 'Foto_Villa_Roma.zip', size: '45.2 MB', date: '2024-11-15', type: 'archive' },
      { id: '4', name: 'Documento_Identita_Bianchi.jpg', size: '1.2 MB', date: '2024-11-10', type: 'image' },
    ]);
    addToast('success', 'Documenti demo caricati');
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const newDocs: Doc[] = Array.from(files).map(file => {
      let type: Doc['type'] = 'other';
      if (file.type.includes('pdf')) type = 'pdf';
      else if (file.type.includes('image')) type = 'image';
      else if (file.name.endsWith('.zip') || file.name.endsWith('.rar')) type = 'archive';

      return {
        id: Math.random().toString(36).substr(2, 9),
        name: file.name,
        size: (file.size / (1024 * 1024)).toFixed(2) + ' MB',
        date: new Date().toISOString().split('T')[0],
        type
      };
    });

    setDocuments([...newDocs, ...documents]);
    addToast('success', `${files.length} file caricato/i con successo`);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleDelete = (id: string) => {
    setDocuments(documents.filter(d => d.id !== id));
    addToast('info', 'Documento eliminato');
  };

  const getIcon = (type: Doc['type']) => {
    switch (type) {
      case 'pdf': return <FileText size={24} color="var(--danger)" />;
      case 'image': return <FileImage size={24} color="var(--info)" />;
      case 'archive': return <FileArchive size={24} color="var(--warning)" />;
      default: return <File size={24} color="var(--text-muted)" />;
    }
  };

  const filteredDocs = documents.filter(d => d.name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <ToastContainer toasts={toasts} removeToast={removeToast} />
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h2 style={{ margin: '0 0 0.5rem 0' }}>File Manager</h2>
          <p style={{ color: 'var(--text-muted)', margin: 0 }}>Gestisci contratti, planimetrie e documenti.</p>
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button className="btn btn-secondary" onClick={documents.length > 0 ? () => setDocuments([]) : loadDemoData}>
            {documents.length > 0 ? 'Svuota Archivio' : 'Carica Demo'}
          </button>
          <input 
            type="file" 
            multiple 
            ref={fileInputRef} 
            style={{ display: 'none' }} 
            onChange={handleFileUpload} 
          />
          <button className="btn btn-primary" onClick={() => fileInputRef.current?.click()}>
            <Upload size={20} /> Carica File
          </button>
        </div>
      </div>

      <div className="card" style={{ padding: '1rem', display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <div style={{ position: 'relative', flex: 1 }}>
          <Search size={20} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <input 
            type="text" 
            className="form-control" 
            placeholder="Cerca documento..." 
            style={{ paddingLeft: '3rem' }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {filteredDocs.length === 0 ? (
        <div className="empty-state card">
          <div className="empty-state-icon">
            <FileText size={32} />
          </div>
          <h3>Nessun documento</h3>
          <p style={{ marginBottom: '1.5rem' }}>L'archivio è vuoto. Carica il tuo primo file.</p>
          <button className="btn btn-primary" onClick={() => fileInputRef.current?.click()}>
            Carica File
          </button>
        </div>
      ) : (
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Nome File</th>
                <th>Dimensione</th>
                <th>Data Caricamento</th>
                <th style={{ textAlign: 'right' }}>Azioni</th>
              </tr>
            </thead>
            <tbody>
              {filteredDocs.map(doc => (
                <tr key={doc.id}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      {getIcon(doc.type)}
                      <span style={{ fontWeight: 500 }}>{doc.name}</span>
                    </div>
                  </td>
                  <td style={{ color: 'var(--text-muted)' }}>{doc.size}</td>
                  <td style={{ color: 'var(--text-muted)' }}>{new Date(doc.date).toLocaleDateString('it-IT')}</td>
                  <td style={{ textAlign: 'right' }}>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
                      <button className="btn-icon" title="Scarica" onClick={() => addToast('info', 'Download simulato in modalità demo')}><Download size={18} /></button>
                      <button className="btn-icon" style={{ color: 'var(--danger)' }} title="Elimina" onClick={() => handleDelete(doc.id)}><Trash2 size={18} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
