# AI Project Mentor

A beginner-friendly full-stack training application where users can manage software projects, tasks, and ask an AI mentor for recommendations. This repository contains the **frontend only**, built with React and Vite, using realistic mock data. It is prepared for a future Python + FastAPI + SQL Server + Ollama backend.

## Application objective

AI Project Mentor helps learners practice full-stack development by:

- Creating and managing software projects.
- Adding and organising development tasks.
- Updating task priorities and statuses.
- Viewing project progress through a dashboard.
- Asking an AI mentor to break requirements into tasks.
- Reviewing previous AI interactions.

## Technology stack (frontend)

- HTML5, CSS3, JavaScript ES6+
- React.js (functional components + hooks)
- Vite (build tool)
- React Router DOM (navigation)
- Axios (prepared for future API calls)

## Current frontend features

- Responsive sidebar + collapsible mobile navigation
- Dashboard with summary cards, project progress, recent tasks, AI recommendation
- Projects page with create, edit, delete and a project details view
- Tasks page with filters, search, status changes, create/edit/delete
- AI Mentor page with structured mock AI response
- AI History page with filters and full response viewer
- Reusable UI components: LoadingSpinner, ErrorMessage, SuccessMessage, EmptyState, ConfirmDialog, Modal, Alert
- Form validation with inline error messages
- Confirmation dialogs before deletes

## Planned backend technologies

- Python
- FastAPI REST APIs
- SQL Server database
- Ollama Cloud API using a GPT-OSS model

The Ollama API key and database credentials belong only in the Python backend and are never stored in this frontend.

## Installation

```bash
npm install
```

## Development

```bash
npm run dev
```

## Build

```bash
npm run build
```

## Folder structure

```
src/
  components/
    Layout/       Sidebar, Header, Layout shell
    Dashboard/    Dashboard-specific components
    Projects/     Project form
    Tasks/        Task form
    AI/           AI-specific components
    Common/       Reusable UI (Modal, Alert, LoadingSpinner, etc.)
  pages/
    DashboardPage.jsx
    ProjectsPage.jsx
    ProjectDetailsPage.jsx
    TasksPage.jsx
    AIMentorPage.jsx
    AIHistoryPage.jsx
    NotFoundPage.jsx
  services/
    api.js         Axios service layer (future backend calls)
  data/
    mockData.js     Mock projects, tasks, AI interactions
  context/
    DataContext.jsx In-memory data store for CRUD operations
  styles/
    global.css      Global styles and design system
  App.jsx           Routes
  main.jsx          Entry point
```

## Environment variables

Copy `.env.example` to `.env`:

```
VITE_API_BASE_URL=http://127.0.0.1:8000
VITE_USE_MOCK_DATA=true
```

- `VITE_API_BASE_URL`: base URL of the future FastAPI backend.
- `VITE_USE_MOCK_DATA`: when `true`, the app uses mock data. Set to `false` once the backend is connected.

Never add `OLLAMA_API_KEY`, database usernames, database passwords, or SQL Server connection strings to this frontend. They belong only in the Python backend.

## Future FastAPI integration plan

The frontend is prepared to call these endpoints once the backend exists:

```
GET    /api/health
GET    /api/dashboard
GET    /api/projects
POST   /api/projects
GET    /api/projects/{project_id}
PUT    /api/projects/{project_id}
DELETE /api/projects/{project_id}
GET    /api/tasks
POST   /api/tasks
GET    /api/tasks/{task_id}
PUT    /api/tasks/{task_id}
PATCH  /api/tasks/{task_id}/status
DELETE /api/tasks/{task_id}
POST   /api/ai/plan
POST   /api/ai/next-task
GET    /api/ai/history/{project_id}
```

Reusable API functions are already defined in `src/services/api.js`. To switch from mock data to the real backend, set `VITE_USE_MOCK_DATA=false` and replace the in-memory operations in `src/context/DataContext.jsx` with calls to those functions.
