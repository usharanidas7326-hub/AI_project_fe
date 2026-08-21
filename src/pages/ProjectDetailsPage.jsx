import { useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { useData } from '../context/DataContext'
import { ProjectFormModal } from '../components/Projects/ProjectForm'
import TaskFormModal from '../components/Tasks/TaskForm'
import ConfirmDialog from '../components/Common/ConfirmDialog'
import EmptyState from '../components/Common/EmptyState'
import LoadingSpinner from '../components/Common/LoadingSpinner'
import { statusBadgeClass, priorityBadgeClass } from '../components/Common/badges'

export default function ProjectDetailsPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { projectById, tasksForProject, updateProject, addTask, updateTask, deleteTask } = useData()

  const [editOpen, setEditOpen] = useState(false)
  const [taskModalOpen, setTaskModalOpen] = useState(false)
  const [editingTask, setEditingTask] = useState(null)
  const [deletingTask, setDeletingTask] = useState(null)

  const project = projectById(id)

  if (!project) {
    return (
      <div className="card">
        <EmptyState
          title="Project not found"
          message="This project may have been deleted."
          actionLabel="Back to Projects"
          onAction={() => navigate('/projects')}
        />
      </div>
    )
  }

  const projectTasks = tasksForProject(project.id)
  const completed = projectTasks.filter((t) => t.status === 'Completed').length
  const pct = projectTasks.length
    ? Math.round((completed / projectTasks.length) * 100)
    : 0

  function handleSaveTask(data) {
    if (editingTask) {
      updateTask(editingTask.id, data)
    } else {
      addTask({ ...data, projectId: project.id })
    }
    setTaskModalOpen(false)
    setEditingTask(null)
  }

  return (
    <div>
      <div className="card-header">
        <div>
          <h2>{project.name}</h2>
          <p className="text-muted">Created {project.createdAt}</p>
        </div>
        <div className="project-detail-actions">
          <button className="btn-primary btn-sm" onClick={() => { setEditingTask(null); setTaskModalOpen(true) }}>+ Add Task</button>
          <button className="btn-secondary btn-sm" onClick={() => setEditOpen(true)}>Edit Project</button>
          <Link to="/ai-mentor" className="btn-ghost btn-sm">Ask AI Mentor</Link>
          <Link to="/projects" className="btn-ghost btn-sm">Back to Projects</Link>
        </div>
      </div>

      <div className="card mb-2">
        <p><strong>Description</strong></p>
        <p>{project.description}</p>
        <p className="mt-1"><strong>Technology Stack</strong></p>
        <div className="tech-chips">
          {project.techStack.map((tech) => (
            <span key={tech} className="tech-chip">{tech}</span>
          ))}
        </div>
        <div className="project-stats mt-2">
          <div><strong>{projectTasks.length}</strong> total tasks</div>
          <div><strong>{completed}</strong> completed</div>
          <div className="progress-detail">
            <div className="progress"><div className="progress-bar" style={{ width: `${pct}%` }} /></div>
            <span className="text-muted">{pct}%</span>
          </div>
        </div>
      </div>

      <section className="card">
        <div className="card-header"><h3>Tasks</h3></div>
        {projectTasks.length === 0 ? (
          <EmptyState
            title="No tasks yet"
            message="Add a task to start tracking this project's progress."
            actionLabel="Add Task"
            onAction={() => setTaskModalOpen(true)}
          />
        ) : (
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Priority</th>
                  <th>Status</th>
                  <th>AI</th>
                  <th>Updated</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {projectTasks.map((t) => (
                  <tr key={t.id}>
                    <td>{t.title}</td>
                    <td><span className={priorityBadgeClass(t.priority)}>{t.priority}</span></td>
                    <td><span className={statusBadgeClass(t.status)}>{t.status}</span></td>
                    <td>{t.aiGenerated ? <span className="badge badge-ai">AI</span> : '—'}</td>
                    <td className="text-muted">{t.updatedAt}</td>
                    <td className="row-actions">
                      <button className="btn-ghost btn-sm" onClick={() => { setEditingTask(t); setTaskModalOpen(true) }}>Edit</button>
                      <button className="btn-danger btn-sm" onClick={() => setDeletingTask(t)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <ProjectFormModal
        open={editOpen}
        initial={project}
        onSave={(data) => { updateProject(project.id, data); setEditOpen(false) }}
        onCancel={() => setEditOpen(false)}
      />

      <TaskFormModal
        open={taskModalOpen}
        initial={editingTask}
        fixedProjectId={project.id}
        onSave={handleSaveTask}
        onCancel={() => { setTaskModalOpen(false); setEditingTask(null) }}
      />

      {deletingTask && (
        <ConfirmDialog
          title="Delete task"
          message={`Delete "${deletingTask.title}"?`}
          confirmLabel="Delete"
          danger
          onConfirm={() => { deleteTask(deletingTask.id); setDeletingTask(null) }}
          onCancel={() => setDeletingTask(null)}
        />
      )}
    </div>
  )
}
