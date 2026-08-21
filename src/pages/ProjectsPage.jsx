import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useData } from '../context/DataContext'
import { ProjectFormModal } from '../components/Projects/ProjectForm'
import ConfirmDialog from '../components/Common/ConfirmDialog'
import SuccessMessage from '../components/Common/SuccessMessage'
import EmptyState from '../components/Common/EmptyState'

export default function ProjectsPage() {
  const { projects, tasks, addProject, updateProject, deleteProject } = useData()
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState(null)
  const [deleting, setDeleting] = useState(null)
  const [success, setSuccess] = useState('')

  function openCreate() {
    setEditing(null)
    setModalOpen(true)
  }

  function openEdit(project) {
    setEditing(project)
    setModalOpen(true)
  }

  function handleSave(data) {
    if (editing) {
      updateProject(editing.id, data)
      setSuccess('Project updated successfully.')
    } else {
      addProject(data)
      setSuccess('Project created successfully.')
    }
    setModalOpen(false)
    setEditing(null)
  }

  function handleDelete() {
    deleteProject(deleting.id)
    setDeleting(null)
    setSuccess('Project deleted successfully.')
  }

  function taskCount(id) {
    return tasks.filter((t) => t.projectId === id).length
  }

  function completedCount(id) {
    return tasks.filter((t) => t.projectId === id && t.status === 'Completed').length
  }

  return (
    <div>
      <div className="card-header">
        <h2>Projects</h2>
        <button className="btn-primary" onClick={openCreate}>+ Create Project</button>
      </div>

      {success && <SuccessMessage message={success} />}

      {projects.length === 0 ? (
        <div className="card">
          <EmptyState
            title="No projects yet"
            message="Create your first project to start adding tasks."
            actionLabel="Create Project"
            onAction={openCreate}
          />
        </div>
      ) : (
        <div className="grid grid-cards">
          {projects.map((p) => (
            <div key={p.id} className="card project-card">
              <div className="project-card-head">
                <h3>{p.name}</h3>
                <span className="text-muted">#{p.id}</span>
              </div>
              <p className="project-desc">{p.description}</p>
              <div className="tech-chips">
                {p.techStack.map((tech) => (
                  <span key={tech} className="tech-chip">{tech}</span>
                ))}
              </div>
              <div className="project-meta">
                <span>{taskCount(p.id)} tasks</span>
                <span>{completedCount(p.id)} completed</span>
                <span className="text-muted">Created {p.createdAt}</span>
              </div>
              <div className="project-actions">
                <Link to={`/projects/${p.id}`} className="btn-secondary btn-sm">View</Link>
                <button className="btn-ghost btn-sm" onClick={() => openEdit(p)}>Edit</button>
                <button className="btn-danger btn-sm" onClick={() => setDeleting(p)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}

      <ProjectFormModal
        open={modalOpen}
        initial={editing}
        onSave={handleSave}
        onCancel={() => { setModalOpen(false); setEditing(null) }}
      />

      {deleting && (
        <ConfirmDialog
          title="Delete project"
          message={`Delete "${deleting.name}"? This also removes its tasks.`}
          confirmLabel="Delete"
          danger
          onConfirm={handleDelete}
          onCancel={() => setDeleting(null)}
        />
      )}
    </div>
  )
}
