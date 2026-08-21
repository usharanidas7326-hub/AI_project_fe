import { useState } from 'react'
import { useData } from '../context/DataContext'
import { TaskFormModal } from '../components/Tasks/TaskForm'
import ConfirmDialog from '../components/Common/ConfirmDialog'
import SuccessMessage from '../components/Common/SuccessMessage'
import EmptyState from '../components/Common/EmptyState'
import { statusBadgeClass, priorityBadgeClass, STATUS_OPTIONS } from '../components/Common/badges'

export default function TasksPage() {
  const { tasks, projects, projectName, addTask, updateTask, updateTaskStatus, deleteTask } = useData()

  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState(null)
  const [deleting, setDeleting] = useState(null)
  const [success, setSuccess] = useState('')

  // Filters
  const [projectFilter, setProjectFilter] = useState('')
  const [priorityFilter, setPriorityFilter] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [search, setSearch] = useState('')

  function openCreate() {
    setEditing(null)
    setModalOpen(true)
  }

  function openEdit(task) {
    setEditing(task)
    setModalOpen(true)
  }

  function handleSave(data) {
    if (editing) {
      updateTask(editing.id, data)
      setSuccess('Task updated successfully.')
    } else {
      addTask(data)
      setSuccess('Task created successfully.')
    }
    setModalOpen(false)
    setEditing(null)
  }

  function handleDelete() {
    deleteTask(deleting.id)
    setDeleting(null)
    setSuccess('Task deleted successfully.')
  }

  // Apply all filters + search to the task list.
  const filtered = tasks.filter((t) => {
    if (projectFilter && t.projectId !== Number(projectFilter)) return false
    if (priorityFilter && t.priority !== priorityFilter) return false
    if (statusFilter && t.status !== statusFilter) return false
    if (search && !t.title.toLowerCase().includes(search.toLowerCase())) return false
    return true
  })

  function clearFilters() {
    setProjectFilter('')
    setPriorityFilter('')
    setStatusFilter('')
    setSearch('')
  }

  return (
    <div>
      <div className="card-header">
        <h2>Tasks</h2>
        <button className="btn-primary" onClick={openCreate}>+ Add Task</button>
      </div>

      {success && <SuccessMessage message={success} />}

      <div className="card filters">
        <div className="form-group">
          <label htmlFor="filter-project">Project</label>
          <select id="filter-project" value={projectFilter} onChange={(e) => setProjectFilter(e.target.value)}>
            <option value="">All projects</option>
            {projects.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="filter-priority">Priority</label>
          <select id="filter-priority" value={priorityFilter} onChange={(e) => setPriorityFilter(e.target.value)}>
            <option value="">All priorities</option>
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="filter-status">Status</label>
          <select id="filter-status" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
            <option value="">All statuses</option>
            {STATUS_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="filter-search">Search title</label>
          <input
            id="filter-search"
            type="search"
            placeholder="Search tasks…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <button className="btn-ghost btn-sm" onClick={clearFilters}>Clear</button>
      </div>

      <section className="card">
        {filtered.length === 0 ? (
          <EmptyState
            title="No tasks found"
            message="Try adjusting your filters or add a new task."
            actionLabel="Add Task"
            onAction={openCreate}
          />
        ) : (
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Title</th>
                  <th>Project</th>
                  <th>Priority</th>
                  <th>Status</th>
                  <th>AI</th>
                  <th>Created</th>
                  <th>Updated</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((t) => (
                  <tr key={t.id}>
                    <td className="text-muted">{t.id}</td>
                    <td>{t.title}</td>
                    <td>{projectName(t.projectId)}</td>
                    <td><span className={priorityBadgeClass(t.priority)}>{t.priority}</span></td>
                    <td>
                      <select
                        className="status-select"
                        value={t.status}
                        onChange={(e) => updateTaskStatus(t.id, e.target.value)}
                        aria-label="Change status"
                      >
                        {STATUS_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </td>
                    <td>{t.aiGenerated ? <span className="badge badge-ai">AI</span> : '—'}</td>
                    <td className="text-muted">{t.createdAt}</td>
                    <td className="text-muted">{t.updatedAt}</td>
                    <td className="row-actions">
                      <button className="btn-ghost btn-sm" onClick={() => openEdit(t)}>Edit</button>
                      <button className="btn-danger btn-sm" onClick={() => setDeleting(t)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <TaskFormModal
        open={modalOpen}
        initial={editing}
        onSave={handleSave}
        onCancel={() => { setModalOpen(false); setEditing(null) }}
      />

      {deleting && (
        <ConfirmDialog
          title="Delete task"
          message={`Delete "${deleting.title}"?`}
          confirmLabel="Delete"
          danger
          onConfirm={handleDelete}
          onCancel={() => setDeleting(null)}
        />
      )}
    </div>
  )
}
