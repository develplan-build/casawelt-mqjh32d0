import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, Users, Calendar, BarChart2, Check, ArrowRight, Moon, Sun } from 'lucide-react';

interface LandingProps {
  theme: 'dark' | 'light';
  toggleTheme: () => void;
}

export default function Landing({ theme, toggleTheme }: LandingProps) {
  const navigate = useNavigate();

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div style={{ minHeight: '100vh' }}>
      <nav className="landing-nav">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '1.5rem', fontWeight: 'bold', fontFamily: 'Space Grotesk' }}>
          <div style={{ width: '40px', height: '40px', background: 'linear-gradient(135deg, var(--accent), #ff983f)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
            CW
          </div>
          CasaWelt
        </div>
        
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          <button onClick={() => scrollTo('features')} style={{ background: 'none', border: 'none', color: 'var(--text-main)', cursor: 'pointer', fontWeight: 500 }}>Funzionalità</button>
          <button onClick={() => scrollTo('pricing')} style={{ background: 'none', border: 'none', color: 'var(--text-main)', cursor: 'pointer', fontWeight: 500 }}>Prezzi</button>
          <button className="btn-icon" onClick={toggleTheme}>
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button className="btn btn-primary" onClick={() => navigate('/app')}>
            Accedi alla Demo
          </button>
        </div>
      </nav>

      <section className="hero-section">
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div className="badge badge-warning" style={{ marginBottom: '2rem' }}>
            La piattaforma B2B per il Real Estate
          </div>
          <h1 className="hero-title">
            Gestisci la tua agenzia immobiliare in un unico posto.
          </h1>
          <p className="hero-subtitle">
            CRM, catalogo immobili, appuntamenti, contratti e reportistica avanzata. Tutto ciò che serve per scalare il tuo business immobiliare.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <button className="btn btn-primary" style={{ padding: '1rem 2rem', fontSize: '1.1rem' }} onClick={() => navigate('/app')}>
              Inizia Gratis <ArrowRight size={20} />
            </button>
            <button className="btn btn-secondary" style={{ padding: '1rem 2rem', fontSize: '1.1rem' }} onClick={() => scrollTo('features')}>
              Scopri di più
            </button>
          </div>
        </div>
      </section>

      <section id="features" className="section" style={{ background: 'var(--bg-card)' }}>
        <h2 className="section-title">Tutto ciò di cui hai bisogno</h2>
        <div className="grid-3">
          <div className="card" style={{ textAlign: 'center' }}>
            <div style={{ width: '64px', height: '64px', background: 'var(--accent-light)', color: 'var(--accent)', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
              <Home size={32} />
            </div>
            <h3>Catalogo Immobili</h3>
            <p style={{ color: 'var(--text-muted)', marginTop: '1rem' }}>Gestisci le tue proprietà con gallerie fotografiche, dettagli tecnici e stato delle trattative.</p>
          </div>
          <div className="card" style={{ textAlign: 'center' }}>
            <div style={{ width: '64px', height: '64px', background: 'rgba(59, 130, 246, 0.1)', color: 'var(--info)', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
              <Users size={32} />
            </div>
            <h3>CRM Clienti</h3>
            <p style={{ color: 'var(--text-muted)', marginTop: '1rem' }}>Tieni traccia di acquirenti e venditori, le loro richieste e lo storico delle interazioni.</p>
          </div>
          <div className="card" style={{ textAlign: 'center' }}>
            <div style={{ width: '64px', height: '64px', background: 'rgba(16, 185, 129, 0.1)', color: 'var(--success)', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
              <Calendar size={32} />
            </div>
            <h3>Appuntamenti</h3>
            <p style={{ color: 'var(--text-muted)', marginTop: '1rem' }}>Agenda integrata per gestire visite agli immobili, riunioni e scadenze importanti.</p>
          </div>
        </div>
      </section>

      <section id="pricing" className="section">
        <h2 className="section-title">Piani semplici e trasparenti</h2>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', flexWrap: 'wrap' }}>
          {/* Basic Plan */}
          <div className="card" style={{ width: '100%', maxWidth: '350px', display: 'flex', flexDirection: 'column' }}>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Basic</h3>
            <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>Per agenti indipendenti</p>
            <div style={{ fontSize: '3rem', fontWeight: 'bold', fontFamily: 'Space Grotesk', marginBottom: '2rem' }}>
              9€<span style={{ fontSize: '1rem', color: 'var(--text-muted)', fontWeight: 'normal' }}>/mese</span>
            </div>
            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 2rem 0', flex: 1 }}>
              {['Fino a 50 immobili', 'CRM base', 'Agenda appuntamenti', 'Supporto email'].map((feature, i) => (
                <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                  <Check size={20} color="var(--success)" /> {feature}
                </li>
              ))}
            </ul>
            <button className="btn btn-secondary" style={{ width: '100%' }} onClick={() => navigate('/app')}>
              Inizia con Basic
            </button>
          </div>

          {/* Pro Plan */}
          <div className="card" style={{ width: '100%', maxWidth: '350px', display: 'flex', flexDirection: 'column', borderColor: 'var(--accent)', position: 'relative' }}>
            <div style={{ position: 'absolute', top: '-12px', left: '50%', transform: 'translateX(-50%)', background: 'var(--accent)', color: 'white', padding: '4px 12px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 'bold' }}>
              PIÙ POPOLARE
            </div>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Pro</h3>
            <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>Per agenzie strutturate</p>
            <div style={{ fontSize: '3rem', fontWeight: 'bold', fontFamily: 'Space Grotesk', marginBottom: '2rem', color: 'var(--accent)' }}>
              29€<span style={{ fontSize: '1rem', color: 'var(--text-muted)', fontWeight: 'normal' }}>/mese</span>
            </div>
            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 2rem 0', flex: 1 }}>
              {['Immobili illimitati', 'CRM avanzato con pipeline', 'Fatturazione automatica', 'Report ed export PDF', 'Supporto prioritario'].map((feature, i) => (
                <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                  <Check size={20} color="var(--accent)" /> {feature}
                </li>
              ))}
            </ul>
            <button className="btn btn-primary" style={{ width: '100%' }} onClick={() => navigate('/app')}>
              Inizia con Pro
            </button>
          </div>
        </div>
      </section>

      <footer style={{ background: 'var(--bg-card)', padding: '4rem 5%', borderTop: '1px solid var(--border-color)', textAlign: 'center', color: 'var(--text-muted)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', fontSize: '1.25rem', fontWeight: 'bold', fontFamily: 'Space Grotesk', color: 'var(--text-main)', marginBottom: '1rem' }}>
          <div style={{ width: '32px', height: '32px', background: 'linear-gradient(135deg, var(--accent), #ff983f)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '0.9rem' }}>
            CW
          </div>
          CasaWelt
        </div>
        <p>© 2024 CasaWelt. Tutti i diritti riservati.</p>
      </footer>
    </div>
  );
}
