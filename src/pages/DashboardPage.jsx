import './Dashboard.css'
import { useData } from '../context/DataContext'
import { statusBadgeClass, priorityBadgeClass } from '../components/Common/badges'
import { Link } from 'react-router-dom'

// Small reusable stat card for the dashboard summary.
function StatCard({ label, value, accent }) {
  return (
    <div className={`card stat-card stat-${accent}`}>
      <p className="stat-label">{label}</p>
      <p className="stat-value">{value}</p>
    </div>
  )
}

// Percentage of completed tasks for a list of tasks.
function completedPct(taskList) {
  if (!taskList.length) return 0
  const done = taskList.filter((t) => t.status === 'Completed').length
  return Math.round((done / taskList.length) * 100)
}

export default function DashboardPage() {
  const { projects, tasks, projectName } = useData()

  const totalProjects = projects.length
  const totalTasks = tasks.length
  const pendingTasks = tasks.filter((t) => t.status === 'Pending').length
  const inProgressTasks = tasks.filter((t) => t.status === 'In Progress').length
  const completedTasks = tasks.filter((t) => t.status === 'Completed').length

  // Most recent tasks by updatedAt date.
  const recentTasks = [...tasks]
    .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
    .slice(0, 5)

  // Simple mock "recommended next task": first non-completed High priority task.
  const recommended =
    tasks.find((t) => t.priority === 'High' && t.status !== 'Completed') || tasks[0]

  return (
    <div className="dashboard">
      <div className="grid grid-stats">
        <StatCard label="Total Projects" value={totalProjects} accent="primary" />
        <StatCard label="Total Tasks" value={totalTasks} accent="secondary" />
        <StatCard label="Pending Tasks" value={pendingTasks} accent="warning" />
        <StatCard label="In Progress" value={inProgressTasks} accent="info" />
        <StatCard label="Completed Tasks" value={completedTasks} accent="success" />
      </div>

      <section className="card mt-2">
        <div className="card-header">
          <h2>Project Progress</h2>
          <Link to="/projects" className="btn-secondary btn-sm">View all projects</Link>
        </div>
        <div className="grid grid-2">
          {projects.map((p) => {
            const pTasks = tasks.filter((t) => t.projectId === p.id)
            const pct = completedPct(pTasks)
            return (
              <div key={p.id} className="progress-card">
                <div className="progress-card-head">
                  <Link to={`/projects/${p.id}`} className="progress-card-name">{p.name}</Link>
                  <span className="text-muted">{pTasks.length} tasks</span>
                </div>
                <div className="tech-chips">
                  {p.techStack.map((tech) => (
                    <span key={tech} className="tech-chip">{tech}</span>
                  ))}
                </div>
                <div className="progress">
                  <div className="progress-bar" style={{ width: `${pct}%` }} />
                </div>
                <p className="text-muted progress-pct">{pct}% completed</p>
              </div>
            )
          })}
        </div>
      </section>

      <section className="card mt-2">
        <div className="card-header">
          <h2>Recent Tasks</h2>
          <Link to="/tasks" className="btn-secondary btn-sm">View all tasks</Link>
        </div>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Task</th>
                <th>Project</th>
                <th>Priority</th>
                <th>Status</th>
                <th>Updated</th>
              </tr>
            </thead>
            <tbody>
              {recentTasks.map((t) => (
                <tr key={t.id}>
                  <td>{t.title}</td>
                  <td>{projectName(t.projectId)}</td>
                  <td><span className={priorityBadgeClass(t.priority)}>{t.priority}</span></td>
                  <td><span className={statusBadgeClass(t.status)}>{t.status}</span></td>
                  <td className="text-muted">{t.updatedAt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {recommended && (
        <section className="card mt-2 ai-recommend">
          <div className="card-header">
            <h2>AI Recommended Next Task</h2>
            <span className="badge badge-ai">AI</span>
          </div>
          <p><strong>Project:</strong> {projectName(recommended.projectId)}</p>
          <p><strong>Recommended task:</strong> {recommended.title}</p>
          <p className="text-muted">
            Reason: This task is high priority and not yet completed, making it the most
            valuable next step for the project.
          </p>
          <Link to={`/projects/${recommended.projectId}`} className="btn-primary btn-sm">
            View Recommendation
          </Link>
        </section>
      )}
    </div>
  )
}
