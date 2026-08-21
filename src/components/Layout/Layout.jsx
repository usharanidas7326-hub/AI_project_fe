import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import Sidebar from './Sidebar'
import Header from './Header'

// Maps the current URL path to a human-friendly page title shown in the header.
const titles = {
  '/': 'Dashboard',
  '/projects': 'Projects',
  '/tasks': 'Tasks',
  '/ai-mentor': 'AI Mentor',
  '/ai-history': 'AI History',
}

export default function Layout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [search, setSearch] = useState('')
  const location = useLocation()

  // Best-effort title: exact match, then /projects/:id → "Project Details".
  let title = titles[location.pathname]
  if (!title) {
    if (location.pathname.startsWith('/projects/')) title = 'Project Details'
    else title = 'Page'
  }

  return (
    <div className="app-shell">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="main-area">
        <Header
          title={title}
          onMenuClick={() => setSidebarOpen((v) => !v)}
          search={search}
          onSearchChange={setSearch}
        />
        <main className="page-content">{children}</main>
      </div>
    </div>
  )
}
