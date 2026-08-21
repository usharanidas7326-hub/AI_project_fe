import { useState } from 'react'
import { useData } from '../context/DataContext'
import Modal from '../components/Common/Modal'
import ConfirmDialog from '../components/Common/ConfirmDialog'
import EmptyState from '../components/Common/EmptyState'

const TASK_TYPES = [
  'Generate Project Plan',
  'Break Requirement into Tasks',
  'Recommend Next Task',
  'Identify Project Blockers',
  'Explain Implementation',
  'Generate Testing Checklist',
]

export default function AIHistoryPage() {
  const { aiHistory, projects, deleteAIHistory } = useData()
  const [viewing, setViewing] = useState(null)
  const [deleting, setDeleting] = useState(null)

  const [projectFilter, setProjectFilter] = useState('')
  const [typeFilter, setTypeFilter] = useState('')
  const [dateFilter, setDateFilter] = useState('')

  const filtered = aiHistory.filter((h) => {
    if (projectFilter && h.projectId !== Number(projectFilter)) return false
    if (typeFilter && h.taskType !== typeFilter) return false
    if (dateFilter && h.createdAt !== dateFilter) return false
    return true
  })

  function handleDelete() {
    deleteAIHistory(deleting.id)
    setDeleting(null)
  }

  return (
    <div>
      <div className="card-header">
        <h2>AI History</h2>
      </div>

      <div className="card filters">
        <div className="form-group">
          <label htmlFor="hist-project">Project</label>
          <select id="hist-project" value={projectFilter} onChange={(e) => setProjectFilter(e.target.value)}>
            <option value="">All projects</option>
            {projects.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="hist-type">AI Task Type</label>
          <select id="hist-type" value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}>
            <option value="">All types</option>
            {TASK_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="hist-date">Date</label>
          <input
            id="hist-date"
            type="date"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
          />
        </div>
      </div>

      <section className="card">
        {filtered.length === 0 ? (
          <EmptyState title="No AI interactions found" message="Generate a recommendation on the AI Mentor page to see it here." />
        ) : (
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Project</th>
                  <th>Prompt</th>
                  <th>Response Preview</th>
                  <th>Model</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((h) => (
                  <tr key={h.id}>
                    <td className="text-muted">{h.id}</td>
                    <td>{h.projectName}</td>
                    <td className="cell-truncate">{h.userPrompt}</td>
                    <td className="cell-truncate text-muted">{h.responsePreview}</td>
                    <td><span className="badge badge-ai">{h.modelName}</span></td>
                    <td className="text-muted">{h.createdAt}</td>
                    <td className="row-actions">
                      <button className="btn-secondary btn-sm" onClick={() => setViewing(h)}>View</button>
                      <button className="btn-danger btn-sm" onClick={() => setDeleting(h)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {viewing && (
        <Modal title={`AI Interaction #${viewing.id}`} onClose={() => setViewing(null)} size="large">
          <p><strong>Project:</strong> {viewing.projectName}</p>
          <p><strong>Task type:</strong> {viewing.taskType}</p>
          <p><strong>Model:</strong> {viewing.modelName}</p>
          <p><strong>Date:</strong> {viewing.createdAt}</p>
          <p><strong>Prompt:</strong></p>
          <p className="response-block">{viewing.userPrompt}</p>

          <h4 className="mt-2">Requirement Understanding</h4>
          <p className="response-block">{viewing.fullResponse.requirementUnderstanding}</p>

          <h4>Frontend Tasks</h4>
          <ul>{viewing.fullResponse.frontendTasks.map((t, i) => <li key={i}>{t}</li>)}</ul>
          <h4>Backend Tasks</h4>
          <ul>{viewing.fullResponse.backendTasks.map((t, i) => <li key={i}>{t}</li>)}</ul>
          <h4>Database Tasks</h4>
          <ul>{viewing.fullResponse.databaseTasks.map((t, i) => <li key={i}>{t}</li>)}</ul>
          <h4>Testing Steps</h4>
          <ul>{viewing.fullResponse.testingSteps.map((t, i) => <li key={i}>{t}</li>)}</ul>
          <h4>Possible Blockers</h4>
          <ul>{viewing.fullResponse.possibleBlockers.map((t, i) => <li key={i}>{t}</li>)}</ul>
          <h4>Recommended Next Action</h4>
          <p className="response-block">{viewing.fullResponse.recommendedNextAction}</p>
        </Modal>
      )}

      {deleting && (
        <ConfirmDialog
          title="Delete AI history"
          message={`Delete interaction #${deleting.id}?`}
          confirmLabel="Delete"
          danger
          onConfirm={handleDelete}
          onCancel={() => setDeleting(null)}
        />
      )}
    </div>
  )
}
