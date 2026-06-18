import React, { useState } from 'react';
import { Outlet, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, Users, Home, Calendar, Briefcase, 
  FileText, BarChart2, Settings, Bell, Menu, X, 
  LogOut, User, Moon, Sun, ChevronDown
} from 'lucide-react';
import { HAS_BACKEND } from '../config';

interface LayoutProps {
  theme: 'dark' | 'light';
  toggleTheme: () => void;
}

export default function DashboardLayout({ theme, toggleTheme }: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [showDemoBanner, setShowDemoBanner] = useState(!HAS_BACKEND);
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { path: '/app/dashboard', icon: <LayoutDashboard size={20} />, label: 'Dashboard' },
    { path: '/app/properties', icon: <Home size={20} />, label: 'Immobili' },
    { path: '/app/clients', icon: <Users size={20} />, label: 'Clienti' },
    { path: '/app/bookings', icon: <Calendar size={20} />, label: 'Appuntamenti' },
    { path: '/app/deals', icon: <Briefcase size={20} />, label: 'Pipeline' },
    { path: '/app/documents', icon: <FileText size={20} />, label: 'Documenti' },
    { path: '/app/reports', icon: <BarChart2 size={20} />, label: 'Report' },
    { path: '/app/notifications', icon: <Bell size={20} />, label: 'Notifiche' },
    { path: '/app/settings', icon: <Settings size={20} />, label: 'Impostazioni' },
  ];

  const getPageTitle = () => {
    const item = navItems.find(i => i.path === location.pathname);
    if (item) return item.label;
    if (location.pathname === '/app/profile') return 'Profilo';
    return 'CasaWelt';
  };

  return (
    <div className="app-layout">
      {/* Sidebar */}
      <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <div className="sidebar-logo">CW</div>
          <h2 style={{ fontSize: '1.25rem', margin: 0 }}>CasaWelt</h2>
          <button className="btn-icon" style={{ marginLeft: 'auto', display: 'none' }} onClick={() => setSidebarOpen(false)}>
            <X size={20} />
          </button>
        </div>
        <nav className="sidebar-nav">
          {navItems.map((item) => (
            <NavLink 
              key={item.path} 
              to={item.path} 
              className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
              onClick={() => setSidebarOpen(false)}
            >
              {item.icon}
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        {showDemoBanner && (
          <div className="demo-banner">
            <span>Modalità Demo: i dati sono salvati localmente. Configura il backend per attivare database e pagamenti reali.</span>
            <button className="btn-icon" onClick={() => setShowDemoBanner(false)} style={{ color: 'inherit' }}>
              <X size={16} />
            </button>
          </div>
        )}

        <header className="header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button className="btn-icon" onClick={() => setSidebarOpen(!sidebarOpen)} style={{ display: 'block' }}>
              <Menu size={24} />
            </button>
            <h1 style={{ fontSize: '1.25rem', margin: 0 }}>{getPageTitle()}</h1>
          </div>

          <div className="header-actions">
            <button className="btn-icon" onClick={toggleTheme} title="Cambia tema">
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button className="btn-icon" onClick={() => navigate('/app/notifications')} title="Notifiche">
              <Bell size={20} />
            </button>
            
            <div className="dropdown">
              <button 
                className="btn-icon" 
                style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.25rem 0.5rem', borderRadius: 'var(--radius-full)', background: 'var(--bg-card)' }}
                onClick={() => setProfileOpen(!profileOpen)}
              >
                <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold' }}>
                  MR
                </div>
                <ChevronDown size={16} />
              </button>

              {profileOpen && (
                <div className="dropdown-menu">
                  <div style={{ padding: '0.75rem 1rem', borderBottom: '1px solid var(--border-color)', marginBottom: '0.5rem' }}>
                    <div style={{ fontWeight: 600 }}>Marco Rossi</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Admin</div>
                  </div>
                  <button className="dropdown-item" onClick={() => { navigate('/app/profile'); setProfileOpen(false); }}>
                    <User size={16} /> Profilo
                  </button>
                  <button className="dropdown-item" onClick={() => { navigate('/app/settings'); setProfileOpen(false); }}>
                    <Settings size={16} /> Impostazioni
                  </button>
                  <div style={{ height: '1px', background: 'var(--border-color)', margin: '0.5rem 0' }}></div>
                  <button className="dropdown-item" style={{ color: 'var(--danger)' }} onClick={() => navigate('/')}>
                    <LogOut size={16} /> Esci
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        <div className="page-content">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
