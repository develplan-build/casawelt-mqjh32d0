import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TrendingUp, Users, Home, DollarSign, ArrowUpRight, ArrowDownRight, Plus } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function Dashboard() {
  const navigate = useNavigate();
  const [hasData, setHasData] = useState(false);

  const emptyData = [
    { name: 'Gen', vendite: 0 }, { name: 'Feb', vendite: 0 }, { name: 'Mar', vendite: 0 },
    { name: 'Apr', vendite: 0 }, { name: 'Mag', vendite: 0 }, { name: 'Giu', vendite: 0 },
  ];

  const demoData = [
    { name: 'Gen', vendite: 4000 }, { name: 'Feb', vendite: 3000 }, { name: 'Mar', vendite: 5000 },
    { name: 'Apr', vendite: 4500 }, { name: 'Mag', vendite: 6000 }, { name: 'Giu', vendite: 8000 },
  ];

  const chartData = hasData ? demoData : emptyData;

  const kpis = [
    { title: 'Fatturato Mensile', value: hasData ? '€ 45.231' : '€ 0', icon: <DollarSign size={24} />, trend: hasData ? '+12.5%' : '0%', isPositive: true },
    { title: 'Immobili Attivi', value: hasData ? '124' : '0', icon: <Home size={24} />, trend: hasData ? '+3' : '0', isPositive: true },
    { title: 'Nuovi Clienti', value: hasData ? '48' : '0', icon: <Users size={24} />, trend: hasData ? '-2' : '0', isPositive: false },
    { title: 'Tasso di Conversione', value: hasData ? '4.2%' : '0%', icon: <TrendingUp size={24} />, trend: hasData ? '+0.8%' : '0%', isPositive: true },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ margin: '0 0 0.5rem 0' }}>Panoramica</h2>
          <p style={{ color: 'var(--text-muted)', margin: 0 }}>Monitora le performance della tua agenzia.</p>
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button 
            className="btn btn-secondary" 
            onClick={() => setHasData(!hasData)}
          >
            {hasData ? 'Azzera Dati' : 'Carica Dati Demo'}
          </button>
          <button className="btn btn-primary" onClick={() => navigate('/app/properties')}>
            <Plus size={20} /> Nuovo Immobile
          </button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem' }}>
        {kpis.map((kpi, i) => (
          <div key={i} className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div style={{ padding: '0.75rem', background: 'var(--accent-light)', color: 'var(--accent)', borderRadius: '12px' }}>
                {kpi.icon}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: kpi.isPositive ? 'var(--success)' : 'var(--danger)', fontSize: '0.875rem', fontWeight: 600 }}>
                {kpi.isPositive ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
                {kpi.trend}
              </div>
            </div>
            <div>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', fontFamily: 'Space Grotesk', marginBottom: '0.25rem' }}>{kpi.value}</div>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{kpi.title}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="card" style={{ height: '400px', display: 'flex', flexDirection: 'column' }}>
        <h3 style={{ marginBottom: '1.5rem' }}>Andamento Vendite</h3>
        <div style={{ flex: 1, minHeight: 0 }}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorVendite" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--accent)" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="var(--accent)" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" vertical={false} />
              <XAxis dataKey="name" stroke="var(--text-muted)" tick={{ fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} />
              <YAxis stroke="var(--text-muted)" tick={{ fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} tickFormatter={(value) => `€${value}`} />
              <Tooltip 
                contentStyle={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)', borderRadius: '8px', color: 'var(--text-main)' }}
                itemStyle={{ color: 'var(--accent)' }}
              />
              <Area type="monotone" dataKey="vendite" stroke="var(--accent)" strokeWidth={3} fillOpacity={1} fill="url(#colorVendite)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
