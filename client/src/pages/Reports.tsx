import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import { Download, Filter, TrendingUp, DollarSign, Home, Users } from 'lucide-react';
import { ToastContainer, ToastMessage } from '../components/Toast';

export default function Reports() {
  const [hasData, setHasData] = useState(false);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = (type: ToastMessage['type'], message: string) => {
    const id = Math.random().toString(36).substr(2, 9);
    setToasts(prev => [...prev, { id, type, message }]);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const handleExport = () => {
    if (!hasData) {
      addToast('warning', 'Nessun dato da esportare');
      return;
    }
    addToast('success', 'Report PDF generato e scaricato (simulato)');
  };

  const emptyBarData = [
    { name: 'Gen', vendite: 0, affitti: 0 }, { name: 'Feb', vendite: 0, affitti: 0 },
    { name: 'Mar', vendite: 0, affitti: 0 }, { name: 'Apr', vendite: 0, affitti: 0 },
  ];

  const demoBarData = [
    { name: 'Gen', vendite: 450000, affitti: 12000 }, { name: 'Feb', vendite: 320000, affitti: 15000 },
    { name: 'Mar', vendite: 850000, affitti: 11000 }, { name: 'Apr', vendite: 620000, affitti: 18000 },
  ];

  const emptyPieData = [{ name: 'Nessun dato', value: 1 }];
  const demoPieData = [
    { name: 'Appartamenti', value: 45 },
    { name: 'Ville', value: 25 },
    { name: 'Attici', value: 15 },
    { name: 'Commerciale', value: 15 },
  ];

  const COLORS = ['var(--accent)', '#3b82f6', '#10b981', '#f59e0b'];

  const barData = hasData ? demoBarData : emptyBarData;
  const pieData = hasData ? demoPieData : emptyPieData;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <ToastContainer toasts={toasts} removeToast={removeToast} />
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h2 style={{ margin: '0 0 0.5rem 0' }}>Report e Analisi</h2>
          <p style={{ color: 'var(--text-muted)', margin: 0 }}>Analizza le performance della tua agenzia.</p>
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button className="btn btn-secondary" onClick={() => setHasData(!hasData)}>
            {hasData ? 'Azzera Dati' : 'Carica Dati Demo'}
          </button>
          <button className="btn btn-primary" onClick={handleExport}>
            <Download size={20} /> Esporta PDF
          </button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem' }}>
        <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <div style={{ padding: '1rem', background: 'var(--accent-light)', color: 'var(--accent)', borderRadius: '12px' }}><DollarSign size={24} /></div>
          <div>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '0.25rem' }}>Volume Vendite (YTD)</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{hasData ? '€ 2.240.000' : '€ 0'}</div>
          </div>
        </div>
        <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <div style={{ padding: '1rem', background: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6', borderRadius: '12px' }}><Home size={24} /></div>
          <div>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '0.25rem' }}>Immobili Venduti</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{hasData ? '18' : '0'}</div>
          </div>
        </div>
        <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <div style={{ padding: '1rem', background: 'rgba(16, 185, 129, 0.1)', color: '#10b981', borderRadius: '12px' }}><Users size={24} /></div>
          <div>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '0.25rem' }}>Nuovi Mandati</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{hasData ? '32' : '0'}</div>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '1.5rem' }}>
        <div className="card" style={{ height: '400px', display: 'flex', flexDirection: 'column' }}>
          <h3 style={{ marginBottom: '1.5rem' }}>Fatturato per Mese</h3>
          <div style={{ flex: 1, minHeight: 0 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" vertical={false} />
                <XAxis dataKey="name" stroke="var(--text-muted)" axisLine={false} tickLine={false} />
                <YAxis stroke="var(--text-muted)" axisLine={false} tickLine={false} tickFormatter={(val) => `€${val/1000}k`} />
                <Tooltip contentStyle={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)', borderRadius: '8px' }} />
                <Legend />
                <Bar dataKey="vendite" name="Vendite" fill="var(--accent)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="affitti" name="Affitti" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card" style={{ height: '400px', display: 'flex', flexDirection: 'column' }}>
          <h3 style={{ marginBottom: '1.5rem' }}>Distribuzione Portafoglio</h3>
          <div style={{ flex: 1, minHeight: 0 }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={80}
                  outerRadius={120}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={hasData ? COLORS[index % COLORS.length] : 'var(--border-color)'} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)', borderRadius: '8px' }} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
