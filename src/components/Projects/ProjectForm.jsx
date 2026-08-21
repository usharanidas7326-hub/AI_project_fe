import { useState } from 'react'
import Modal from '../Common/Modal'

// Reusable form for creating and editing a project.
// Used inside a modal. Validates required fields and calls onSave.
export default function ProjectForm({ initial, onSave, onCancel }) {
  const [name, setName] = useState(initial?.name ?? '')
  const [description, setDescription] = useState(initial?.description ?? '')
  // techStack is entered as a comma-separated string for beginners.
  const [techStack, setTechStack] = useState((initial?.techStack ?? []).join(', '))
  const [errors, setErrors] = useState({})

  function validate() {
    const next = {}
    if (!name.trim()) next.name = 'Project name is required.'
    if (!description.trim()) next.description = 'Description is required.'
    if (!techStack.trim()) next.techStack = 'Technology stack is required.'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (!validate()) return
    onSave({
      name: name.trim(),
      description: description.trim(),
      techStack: techStack.split(',').map((s) => s.trim()).filter(Boolean),
    })
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="form-group">
        <label htmlFor="project-name">Project Name</label>
        <input
          id="project-name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          autoFocus
        />
        {errors.name && <p className="form-error">{errors.name}</p>}
      </div>

      <div className="form-group">
        <label htmlFor="project-desc">Project Description</label>
        <textarea
          id="project-desc"
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        {errors.description && <p className="form-error">{errors.description}</p>}
      </div>

      <div className="form-group">
        <label htmlFor="project-tech">Technology Stack</label>
        <input
          id="project-tech"
          value={techStack}
          onChange={(e) => setTechStack(e.target.value)}
          placeholder="e.g. React, FastAPI, SQL Server"
        />
        {errors.techStack && <p className="form-error">{errors.techStack}</p>}
        <p className="text-muted" style={{ fontSize: '0.8rem', marginTop: '0.25rem' }}>
          Separate technologies with commas.
        </p>
      </div>

      <div className="form-actions">
        <button type="button" className="btn-ghost" onClick={onCancel}>Cancel</button>
        <button type="submit" className="btn-primary">Save Project</button>
      </div>
    </form>
  )
}

// Convenience wrapper that renders the form inside a modal.
export function ProjectFormModal({ open, initial, onSave, onCancel }) {
  if (!open) return null
  return (
    <Modal title={initial ? 'Edit Project' : 'Create Project'} onClose={onCancel}>
      <ProjectForm initial={initial} onSave={onSave} onCancel={onCancel} />
    </Modal>
  )
}
