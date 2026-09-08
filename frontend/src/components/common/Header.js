import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';
import NotificationBell from './NotificationBell';
import './Header.css';
const Header = () => {
  const { user, logout } = useAuth();
  return <header className="header">
    <div className="logo">SIH Inspection</div>
    <div className="nav-links">
      {user?.role === 'ADMIN' && <><Link to="/admin/dashboard">Dashboard</Link><Link to="/admin/live-monitoring">Live Monitor</Link></>}
      {user?.role === 'INSPECTOR' && <Link to="/dashboard">My Inspections</Link>}
      {user?.role === 'INSTITUTION' && <><Link to="/institution/dashboard">Dashboard</Link><Link to="/institution/violations">Violations</Link><Link to="/institution/corrective-actions">Corrective Actions</Link></>}
    </div>
    <div className="user-info">
      <NotificationBell />
      <span>{user?.name} ({user?.role})</span>
      <button onClick={logout}>Logout</button>
    </div>
  </header>;
};
export default Header;
