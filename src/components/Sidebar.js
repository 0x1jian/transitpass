import React from 'react';

const navItems = [
  { id: 'dashboard', label: 'Dashboard' },
  { id: 'bookings',  label: 'All Bookings' },
];

export default function Sidebar({ activePage, onNavigate }) {
  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <div className="logo-mark">
          <div className="logo-text">Transit<span>Pass</span></div>
        </div>
      </div>

      <nav className="sidebar-nav">
        <div className="nav-label">Main Menu</div>
        {navItems.map(item => (
          <div
            key={item.id}
            className={`nav-item${activePage === item.id ? ' active' : ''}`}
            onClick={() => onNavigate(item.id)}
          >
            <span className="nav-icon">{item.icon}</span>
            {item.label}
          </div>
        ))}
      </nav>

      <div className="sidebar-footer">
        <div style={{ marginBottom: 4 }}>TransitPass v1.0</div>
        <div>Passenger Booking System</div>
      </div>
    </aside>
  );
}
