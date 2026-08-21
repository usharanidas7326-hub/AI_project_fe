import { useState } from 'react'
import Modal from '../Common/Modal'
import { useData } from '../../context/DataContext'
import { PRIORITY_OPTIONS, STATUS_OPTIONS } from '../Common/badges'

// Reusable form for creating and editing a task.
// fixedProjectId locks the project selector (used on the Project Details page).
export default function TaskForm({ initial, projects, fixedProjectId, onSave, onCancel }) {
  const [projectId, setProjectId] = useState(
    fixedProjectId ?? initial?.projectId ?? (projects[0]?.id ?? '')
  )
  const [title, setTitle] = useState(initial?.title ?? '')
  const [description, setDescription] = useState(initial?.description ?? '')
  const [priority, setPriority] = useState(initial?.priority ?? 'Medium')
  const [status, setStatus] = useState(initial?.status ?? 'Pending')
  const [aiGenerated, setAiGenerated] = useState(initial?.aiGenerated ?? false)
  const [errors, setErrors] = useState({})

  function validate() {
    const next = {}
    if (!projectId) next.projectId = 'Please select a project.'
    if (!title.trim()) next.title = 'Task title is required.'
    if (!description.trim()) next.description = 'Task description is required.'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (!validate()) return
    onSave({
      projectId: Number(projectId),
      title: title.trim(),
      description: description.trim(),
      priority,
      status,
      aiGenerated,
    })
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="form-group">
        <label htmlFor="task-project">Select Project</label>
        <select
          id="task-project"
          value={projectId}
          onChange={(e) => setProjectId(e.target.value)}
          disabled={!!fixedProjectId}
        >
          <option value="">— Select a project —</option>
          {projects.map((p) => (
            <option key={p.id} value={p.id}>{p.name}</option>
          ))}
        </select>
        {errors.projectId && <p className="form-error">{errors.projectId}</p>}
      </div>

      <div className="form-group">
        <label htmlFor="task-title">Task Title</label>
        <input
          id="task-title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          autoFocus
        />
        {errors.title && <p className="form-error">{errors.title}</p>}
      </div>

      <div className="form-group">
        <label htmlFor="task-desc">Task Description</label>
        <textarea
          id="task-desc"
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        {errors.description && <p className="form-error">{errors.description}</p>}
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="task-priority">Priority</label>
          <select id="task-priority" value={priority} onChange={(e) => setPriority(e.target.value)}>
            {PRIORITY_OPTIONS.map((p) => <option key={p} value={p}>{p}</option>)}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="task-status">Status</label>
          <select id="task-status" value={status} onChange={(e) => setStatus(e.target.value)}>
            {STATUS_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
      </div>

      <div className="form-group">
        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={aiGenerated}
            onChange={(e) => setAiGenerated(e.target.checked)}
          />
          AI Generated
        </label>
      </div>

      <div className="form-actions">
        <button type="button" className="btn-ghost" onClick={onCancel}>Cancel</button>
        <button type="submit" className="btn-primary">Save Task</button>
      </div>
    </form>
  )
}

export function TaskFormModal({ open, initial, fixedProjectId, onSave, onCancel }) {
  const { projects } = useData()
  if (!open) return null
  return (
    <Modal title={initial ? 'Edit Task' : 'Add Task'} onClose={onCancel}>
      <TaskForm
        initial={initial}
        projects={projects}
        fixedProjectId={fixedProjectId}
        onSave={onSave}
        onCancel={onCancel}
      />
    </Modal>
  )
}
