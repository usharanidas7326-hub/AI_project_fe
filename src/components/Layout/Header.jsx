import './Header.css'

export default function Header({ title, onMenuClick, search, onSearchChange }) {
  return (
    <header className="header">
      <div className="header-left">
        <button
          className="btn-icon header-menu-btn"
          onClick={onMenuClick}
          aria-label="Open navigation menu"
        >
          ☰
        </button>
        <h1 className="header-title">{title}</h1>
      </div>
      <div className="header-right">
        <div className="header-search">
          <span className="header-search-icon" aria-hidden="true">⌕</span>
          <input
            type="search"
            placeholder="Search…"
            value={search}
            onChange={(e) => onSearchChange?.(e.target.value)}
            aria-label="Search"
          />
        </div>
        <button className="btn-icon header-icon-btn" aria-label="Notifications" title="Notifications">
          🔔
        </button>
        <div className="header-profile" title="User profile">
          <div className="header-avatar" aria-hidden="true">U</div>
          <span className="header-profile-name">User</span>
        </div>
      </div>
    </header>
  )
}
