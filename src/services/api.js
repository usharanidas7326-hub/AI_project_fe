// Axios service layer for the future Python/FastAPI backend.
//
// While VITE_USE_MOCK_DATA is "true" (the default), the app uses mock data from
// src/data/mockData.js and these functions are NOT called. When the backend is
// ready, set VITE_USE_MOCK_DATA=false in your .env file and the pages will start
// calling these functions instead of using mock data.
//
// The Ollama API key is NEVER stored here — it lives only in the Python backend.

import axios from 'axios'

const baseURL = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000'

// Shared axios instance. Pages can import `api` and call api.get/post/etc directly,
// or use the named helper functions below.
const api = axios.create({
  baseURL,
  headers: { 'Content-Type': 'application/json' },
})

export const useMockData =
  (import.meta.env.VITE_USE_MOCK_DATA ?? 'true') === 'true'

// --- Projects ---
export const getProjects = () => api.get('/api/projects')

export const getProjectById = (projectId) =>
  api.get(`/api/projects/${projectId}`)

export const createProject = (projectData) =>
  api.post('/api/projects', projectData)

export const updateProject = (projectId, projectData) =>
  api.put(`/api/projects/${projectId}`, projectData)

export const deleteProject = (projectId) =>
  api.delete(`/api/projects/${projectId}`)

// --- Tasks ---
export const getTasks = () => api.get('/api/tasks')

export const createTask = (taskData) => api.post('/api/tasks', taskData)

export const updateTask = (taskId, taskData) =>
  api.put(`/api/tasks/${taskId}`, taskData)

export const updateTaskStatus = (taskId, status) =>
  api.patch(`/api/tasks/${taskId}/status`, { status })

export const deleteTask = (taskId) => api.delete(`/api/tasks/${taskId}`)

// --- AI Mentor ---
export const generateAIPlan = (requestData) =>
  api.post('/api/ai/plan', requestData)

export const recommendNextTask = (projectId) =>
  api.post('/api/ai/next-task', { projectId })

export const getAIHistory = (projectId) =>
  api.get(`/api/ai/history/${projectId}`)

// --- Dashboard ---
export const getDashboardStatistics = () => api.get('/api/dashboard')

// --- Health ---
export const checkBackendHealth = () => api.get('/api/health')

export default api
