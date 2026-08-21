import './Sidebar.css'

import { NavLink } from 'react-router-dom'

const navItems = [
  { to: '/', label: 'Dashboard', icon: '▦' },
  { to: '/projects', label: 'Projects', icon: '▣' },
  { to: '/tasks', label: 'Tasks', icon: '✓' },
  { to: '/ai-mentor', label: 'AI Mentor', icon: '✦' },
  { to: '/ai-history', label: 'AI History', icon: '⌚' },
]

export default function Sidebar({ open, onClose }) {
  return (
    <>
      {/* Mobile backdrop */}
      {open && <div className="sidebar-backdrop" onClick={onClose} aria-hidden="true" />}
      <aside
        className={`sidebar ${open ? 'sidebar-open' : ''}`}
        aria-label="Main navigation"
      >
        <div className="sidebar-brand">
          <span className="sidebar-logo" aria-hidden="true">✦</span>
          <span className="sidebar-name">AI Project Mentor</span>
        </div>
        <nav className="sidebar-nav">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) =>
                `sidebar-link ${isActive ? 'sidebar-link-active' : ''}`
              }
              onClick={onClose}
            >
              <span className="sidebar-icon" aria-hidden="true">{item.icon}</span>
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>
        <div className="sidebar-footer">
          <p className="text-muted">Frontend demo</p>
          <p className="text-muted">Mock data mode</p>
        </div>
      </aside>
    </>
  )
}
