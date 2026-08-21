import { useState } from 'react'
import { useData } from '../context/DataContext'
import { buildMockAIResponse } from '../data/mockData'
import LoadingSpinner from '../components/Common/LoadingSpinner'
import SuccessMessage from '../components/Common/SuccessMessage'
import EmptyState from '../components/Common/EmptyState'

const AI_TASK_TYPES = [
  'Generate Project Plan',
  'Break Requirement into Tasks',
  'Recommend Next Task',
  'Identify Project Blockers',
  'Explain Implementation',
  'Generate Testing Checklist',
]

// Renders one section of the structured AI response as a list.
function ResponseSection({ title, items }) {
  if (!items || (Array.isArray(items) && items.length === 0)) return null
  return (
    <div className="ai-section">
      <h4>{title}</h4>
      {Array.isArray(items) ? (
        <ul>
          {items.map((item, i) => <li key={i}>{item}</li>)}
        </ul>
      ) : (
        <p>{items}</p>
      )}
    </div>
  )
}

export default function AIMentorPage() {
  const { projects, addAIHistory, addTask } = useData()

  const [projectId, setProjectId] = useState(projects[0]?.id ?? '')
  const [requirement, setRequirement] = useState('')
  const [taskType, setTaskType] = useState(AI_TASK_TYPES[1])
  const [loading, setLoading] = useState(false)
  const [response, setResponse] = useState(null)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState('')

  function handleGenerate(e) {
    e.preventDefault()
    setSaved(false)
    if (!projectId || !requirement.trim()) {
      setError('Please select a project and enter a requirement.')
      return
    }
    setError('')
    setLoading(true)
    setResponse(null)

    // Simulate an AI request. Later this calls POST /api/ai/plan on the backend.
    setTimeout(() => {
      const project = projects.find((p) => p.id === Number(projectId))
      setResponse(buildMockAIResponse(project?.name ?? 'this project', requirement.trim(), taskType))
      setLoading(false)
    }, 1200)
  }

  function handleSave() {
    if (!response) return
    const project = projects.find((p) => p.id === Number(projectId))
    addAIHistory({
      projectId: Number(projectId),
      projectName: project?.name ?? 'Unknown',
      taskType,
      userPrompt: requirement.trim(),
      responsePreview: response.requirementUnderstanding.slice(0, 120) + '…',
      fullResponse: response,
    })
    setSaved(true)
  }

  function handleCreateTasks() {
    if (!response) return
    const allTasks = [
      ...response.frontendTasks,
      ...response.backendTasks,
      ...response.databaseTasks,
    ]
    allTasks.forEach((title) => {
      addTask({
        projectId: Number(projectId),
        title,
        description: `Generated from AI recommendation (${taskType}).`,
        priority: 'Medium',
        status: 'Pending',
        aiGenerated: true,
      })
    })
    setSaved(true)
  }

  function handleClear() {
    setResponse(null)
    setRequirement('')
    setSaved(false)
    setError('')
  }

  return (
    <div className="ai-mentor">
      <form className="card mb-2" onSubmit={handleGenerate}>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="ai-project">Select Project</label>
            <select id="ai-project" value={projectId} onChange={(e) => setProjectId(e.target.value)}>
              <option value="">— Select a project —</option>
              {projects.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="ai-task-type">AI Task Type</label>
            <select id="ai-task-type" value={taskType} onChange={(e) => setTaskType(e.target.value)}>
              {AI_TASK_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="ai-requirement">Requirement or Question</label>
          <textarea
            id="ai-requirement"
            rows={4}
            value={requirement}
            onChange={(e) => setRequirement(e.target.value)}
            placeholder="Describe the feature or question you want the AI mentor to analyse…"
          />
        </div>
        {error && <p className="form-error">{error}</p>}
        <div className="form-actions">
          <button type="submit" className="btn-primary" disabled={loading}>
            Generate AI Recommendation
          </button>
        </div>
      </form>

      {loading && (
        <div className="card">
          <LoadingSpinner message="AI Mentor is analysing your project…" />
        </div>
      )}

      {saved && <SuccessMessage message="Recommendation saved." />}

      {response && !loading && (
        <div className="card ai-response">
          <div className="card-header">
            <h3>AI Recommendation</h3>
            <span className="badge badge-ai">gpt-oss:20b</span>
          </div>

          <ResponseSection title="Requirement Understanding" items={response.requirementUnderstanding} />
          <ResponseSection title="Frontend Tasks" items={response.frontendTasks} />
          <ResponseSection title="Backend Tasks" items={response.backendTasks} />
          <ResponseSection title="Database Tasks" items={response.databaseTasks} />
          <ResponseSection title="Testing Steps" items={response.testingSteps} />
          <ResponseSection title="Possible Blockers" items={response.possibleBlockers} />
          <ResponseSection title="Recommended Next Action" items={response.recommendedNextAction} />

          <div className="form-actions">
            <button className="btn-secondary" onClick={handleSave}>Save Recommendation</button>
            <button className="btn-primary" onClick={handleCreateTasks}>Create Tasks from Recommendation</button>
            <button className="btn-ghost" onClick={handleClear}>Clear Response</button>
          </div>
        </div>
      )}

      {!response && !loading && (
        <div className="card">
          <EmptyState
            title="No AI recommendation yet"
            message="Select a project, describe a requirement and generate a recommendation."
          />
        </div>
      )}
    </div>
  )
}
