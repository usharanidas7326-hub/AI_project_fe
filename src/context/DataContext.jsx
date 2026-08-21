import { createContext, useContext, useMemo, useState } from 'react'
import {
  mockProjects,
  mockTasks,
  mockAIHistory,
} from '../data/mockData'

// A single in-memory store for the whole frontend. All create/edit/delete
// operations update this React state so the UI reflects them immediately.
// When the FastAPI backend is ready, replace these functions with calls from
// src/services/api.js and keep the same shape.

const DataContext = createContext(null)

export function DataProvider({ children }) {
  const [projects, setProjects] = useState(mockProjects)
  const [tasks, setTasks] = useState(mockTasks)
  const [aiHistory, setAIHistory] = useState(mockAIHistory)

  // --- Project helpers ---
  function addProject(data) {
    const id = projects.length ? Math.max(...projects.map((p) => p.id)) + 1 : 1
    const newProject = {
      id,
      name: data.name,
      description: data.description,
      techStack: data.techStack,
      createdAt: new Date().toISOString().slice(0, 10),
    }
    setProjects((prev) => [newProject, ...prev])
    return newProject
  }

  function updateProject(id, data) {
    setProjects((prev) =>
      prev.map((p) =>
        p.id === id
          ? { ...p, name: data.name, description: data.description, techStack: data.techStack }
          : p
      )
    )
  }

  function deleteProject(id) {
    setProjects((prev) => prev.filter((p) => p.id !== id))
    setTasks((prev) => prev.filter((t) => t.projectId !== id))
  }

  // --- Task helpers ---
  function addTask(data) {
    const id = tasks.length ? Math.max(...tasks.map((t) => t.id)) + 1 : 1
    const today = new Date().toISOString().slice(0, 10)
    const newTask = {
      id,
      projectId: Number(data.projectId),
      title: data.title,
      description: data.description,
      priority: data.priority,
      status: data.status,
      aiGenerated: !!data.aiGenerated,
      createdAt: today,
      updatedAt: today,
    }
    setTasks((prev) => [newTask, ...prev])
    return newTask
  }

  function updateTask(id, data) {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === id
          ? {
              ...t,
              projectId: Number(data.projectId),
              title: data.title,
              description: data.description,
              priority: data.priority,
              status: data.status,
              aiGenerated: !!data.aiGenerated,
              updatedAt: new Date().toISOString().slice(0, 10),
            }
          : t
      )
    )
  }

  function updateTaskStatus(id, status) {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, status, updatedAt: new Date().toISOString().slice(0, 10) } : t
      )
    )
  }

  function deleteTask(id) {
    setTasks((prev) => prev.filter((t) => t.id !== id))
  }

  // --- AI history helpers ---
  function addAIHistory(entry) {
    const id = aiHistory.length ? Math.max(...aiHistory.map((h) => h.id)) + 1 : 1
    const newEntry = {
      id,
      createdAt: new Date().toISOString().slice(0, 10),
      modelName: 'gpt-oss:20b',
      ...entry,
    }
    setAIHistory((prev) => [newEntry, ...prev])
    return newEntry
  }

  function deleteAIHistory(id) {
    setAIHistory((prev) => prev.filter((h) => h.id !== id))
  }

  // --- Derived helpers ---
  function projectById(id) {
    return projects.find((p) => p.id === Number(id))
  }

  function tasksForProject(projectId) {
    return tasks.filter((t) => t.projectId === Number(projectId))
  }

  function projectName(projectId) {
    const p = projects.find((pr) => pr.id === Number(projectId))
    return p ? p.name : 'Unknown project'
  }

  const value = useMemo(
    () => ({
      projects,
      tasks,
      aiHistory,
      addProject,
      updateProject,
      deleteProject,
      addTask,
      updateTask,
      updateTaskStatus,
      deleteTask,
      addAIHistory,
      deleteAIHistory,
      projectById,
      tasksForProject,
      projectName,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [projects, tasks, aiHistory]
  )

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>
}

export function useData() {
  const ctx = useContext(DataContext)
  if (!ctx) throw new Error('useData must be used inside a DataProvider')
  return ctx
}
