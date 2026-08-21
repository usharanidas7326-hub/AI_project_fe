// Centralized mock data for the AI Project Mentor frontend.
// When the Python/FastAPI backend is ready, swap these out for real API calls
// (see src/services/api.js). Each array mirrors the shape the backend will return.

export const mockProjects = [
  {
    id: 1,
    name: 'Student Placement Portal',
    description:
      'A web portal where students can register, upload their resume, apply for placements, and track application status.',
    techStack: ['React', 'FastAPI', 'SQL Server', 'Ollama'],
    createdAt: '2026-07-02',
  },
  {
    id: 2,
    name: 'Hospital Appointment System',
    description:
      'An appointment booking system for hospitals with doctor availability, patient registration and appointment slots.',
    techStack: ['React', 'FastAPI', 'SQL Server'],
    createdAt: '2026-07-18',
  },
  {
    id: 3,
    name: 'AI Resume Mentor',
    description:
      'An AI-powered resume mentor that reviews student resumes and suggests improvements using a GPT-OSS model.',
    techStack: ['React', 'FastAPI', 'SQL Server', 'GPT-OSS'],
    createdAt: '2026-08-01',
  },
]

export const mockTasks = [
  {
    id: 1,
    projectId: 1,
    title: 'Design student registration form',
    description: 'Create a responsive registration form with validation for student details.',
    priority: 'High',
    status: 'Completed',
    aiGenerated: false,
    createdAt: '2026-07-03',
    updatedAt: '2026-07-06',
  },
  {
    id: 2,
    projectId: 1,
    title: 'Build resume upload component',
    description: 'Allow students to upload a PDF resume and preview it before submitting.',
    priority: 'Medium',
    status: 'In Progress',
    aiGenerated: false,
    createdAt: '2026-07-05',
    updatedAt: '2026-07-20',
  },
  {
    id: 3,
    projectId: 1,
    title: 'Create placement application API',
    description: 'FastAPI endpoint to submit and list placement applications.',
    priority: 'High',
    status: 'Pending',
    aiGenerated: true,
    createdAt: '2026-07-08',
    updatedAt: '2026-07-08',
  },
  {
    id: 4,
    projectId: 1,
    title: 'Design application status dashboard',
    description: 'Show students the current status of each placement application.',
    priority: 'Medium',
    status: 'Pending',
    aiGenerated: false,
    createdAt: '2026-07-10',
    updatedAt: '2026-07-10',
  },
  {
    id: 5,
    projectId: 2,
    title: 'Model doctor availability slots',
    description: 'Create the SQL Server schema and seed data for doctor availability.',
    priority: 'High',
    status: 'Completed',
    createdAt: '2026-07-19',
    updatedAt: '2026-07-25',
    aiGenerated: false,
  },
  {
    id: 6,
    projectId: 2,
    title: 'Build appointment booking flow',
    description: 'Frontend flow for patients to pick a doctor, slot and confirm a booking.',
    priority: 'High',
    status: 'In Progress',
    aiGenerated: false,
    createdAt: '2026-07-22',
    updatedAt: '2026-08-02',
  },
  {
    id: 7,
    projectId: 2,
    title: 'Send appointment confirmation email',
    description: 'Backend service to email patients a confirmation after booking.',
    priority: 'Low',
    status: 'Pending',
    aiGenerated: true,
    createdAt: '2026-07-24',
    updatedAt: '2026-07-24',
  },
  {
    id: 8,
    projectId: 3,
    title: 'Integrate GPT-OSS resume review',
    description: 'Call the AI backend to review a uploaded resume and return suggestions.',
    priority: 'High',
    status: 'In Progress',
    aiGenerated: true,
    createdAt: '2026-08-02',
    updatedAt: '2026-08-10',
  },
  {
    id: 9,
    projectId: 3,
    title: 'Build resume feedback UI',
    description: 'Display AI feedback in organised sections with actionable suggestions.',
    priority: 'Medium',
    status: 'Pending',
    aiGenerated: false,
    createdAt: '2026-08-05',
    updatedAt: '2026-08-05',
  },
  {
    id: 10,
    projectId: 3,
    title: 'Add user history page',
    description: 'Let users view previous resume reviews and downloaded suggestions.',
    priority: 'Low',
    status: 'Pending',
    aiGenerated: false,
    createdAt: '2026-08-07',
    updatedAt: '2026-08-07',
  },
]

export const mockAIHistory = [
  {
    id: 1,
    projectId: 1,
    projectName: 'Student Placement Portal',
    taskType: 'Break Requirement into Tasks',
    userPrompt:
      'Break the student registration requirement into frontend, backend and database tasks.',
    responsePreview:
      'Frontend: build registration form, validation. Backend: POST /api/students endpoint. Database: students table schema...',
    fullResponse: {
      requirementUnderstanding:
        'The student registration requirement covers capturing student details, validating input, storing records and returning a confirmation.',
      frontendTasks: [
        'Build a responsive registration form',
        'Add client-side validation for email and phone',
        'Show success and error messages',
      ],
      backendTasks: [
        'Create POST /api/students endpoint',
        'Validate payload and return clear errors',
        'Hash any sensitive fields before storing',
      ],
      databaseTasks: [
        'Create students table with id, name, email, phone, created_at',
        'Add unique constraint on email',
      ],
      testingSteps: [
        'Test form validation with invalid input',
        'Test API with missing fields',
        'Verify duplicate email is rejected',
      ],
      possibleBlockers: [
        'Email validation rules may differ between frontend and backend',
        'Database connection timeout under load',
      ],
      recommendedNextAction:
        'Start with the registration form and the POST /api/students endpoint, then wire them together.',
    },
    modelName: 'gpt-oss:20b',
    createdAt: '2026-07-04',
  },
  {
    id: 2,
    projectId: 2,
    projectName: 'Hospital Appointment System',
    taskType: 'Identify Project Blockers',
    userPrompt: 'What blockers should we watch out for in the appointment booking flow?',
    responsePreview:
      'Possible blockers: doctor schedule overlaps, timezone handling, no-show handling, and email delivery failures...',
    fullResponse: {
      requirementUnderstanding:
        'Identify risks in the appointment booking flow that could delay delivery.',
      frontendTasks: [
        'Handle unavailable slot UI gracefully',
        'Show loading state while confirming a booking',
      ],
      backendTasks: [
        'Lock a slot atomically to prevent double booking',
        'Retry email confirmation on failure',
      ],
      databaseTasks: [
        'Add a unique constraint on (doctor_id, slot) to prevent overlaps',
        'Track appointment status for no-shows',
      ],
      testingSteps: [
        'Simulate two patients booking the same slot',
        'Test email failure retry',
      ],
      possibleBlockers: [
        'Doctor schedule overlaps',
        'Timezone handling between patient and hospital',
        'Email delivery failures',
      ],
      recommendedNextAction:
        'Add a unique constraint on doctor and slot first, then build the booking confirmation flow.',
    },
    modelName: 'gpt-oss:20b',
    createdAt: '2026-07-26',
  },
  {
    id: 3,
    projectId: 3,
    projectName: 'AI Resume Mentor',
    taskType: 'Generate Testing Checklist',
    userPrompt: 'Generate a testing checklist for the AI resume review feature.',
    responsePreview:
      'Checklist: test resume upload, test AI response parsing, test empty resume, test large resume, test network failure...',
    fullResponse: {
      requirementUnderstanding:
        'Produce a testing checklist covering the AI resume review feature end to end.',
      frontendTasks: [
        'Test upload of invalid file type',
        'Test preview of large PDFs',
      ],
      backendTasks: [
        'Test AI timeout handling',
        'Test malformed AI response handling',
      ],
      databaseTasks: [
        'Verify review history is saved',
        'Verify user can retrieve past reviews',
      ],
      testingSteps: [
        'Upload a valid resume and check suggestions appear',
        'Upload an empty resume and check error message',
        'Simulate AI service down and check fallback',
      ],
      possibleBlockers: [
        'AI response format may change between model versions',
        'Large PDFs may exceed upload limits',
      ],
      recommendedNextAction:
        'Write the happy-path test first, then add edge cases for empty and large resumes.',
    },
    modelName: 'gpt-oss:20b',
    createdAt: '2026-08-03',
  },
  {
    id: 4,
    projectId: 1,
    projectName: 'Student Placement Portal',
    taskType: 'Recommend Next Task',
    userPrompt: 'What should I work on next for the placement portal?',
    responsePreview:
      'Recommended next task: build the placement application API because registration is complete and applications are blocked on it...',
    fullResponse: {
      requirementUnderstanding:
        'Recommend the most valuable next task for the placement portal given current progress.',
      frontendTasks: [
        'Add an "Apply" button on each placement listing',
        'Show submitted applications in a list',
      ],
      backendTasks: [
        'Create POST /api/applications endpoint',
        'List applications for a student',
      ],
      databaseTasks: [
        'Create applications table linking students to placements',
      ],
      testingSteps: [
        'Test applying to a placement',
        'Test listing applications',
      ],
      possibleBlockers: [
        'Placement listings API not yet defined',
      ],
      recommendedNextAction:
        'Build the placement application API next, because registration is complete and the application flow is blocked on it.',
    },
    modelName: 'gpt-oss:20b',
    createdAt: '2026-08-09',
  },
]

// Helper: a structured mock AI response generator used by the AI Mentor page.
export function buildMockAIResponse(projectName, requirement, taskType) {
  return {
    requirementUnderstanding: `For ${projectName}, the requirement "${requirement}" is interpreted as a ${taskType.toLowerCase()} request. The AI mentor breaks this into frontend, backend, database, testing and risk sections.`,
    frontendTasks: [
      'Create a responsive UI for this requirement',
      'Add form validation and loading states',
      'Connect the UI to the relevant backend endpoint',
    ],
    backendTasks: [
      'Add a FastAPI endpoint for this feature',
      'Validate input and return clear error messages',
      'Persist results to SQL Server',
    ],
    databaseTasks: [
      'Design the table schema for this feature',
      'Add indexes on frequently queried columns',
    ],
    testingSteps: [
      'Test the happy path end to end',
      'Test validation with invalid input',
      'Test API error responses',
    ],
    possibleBlockers: [
      'Backend endpoint not yet implemented',
      'AI service may be slow under load',
    ],
    recommendedNextAction:
      'Start with the database schema, then the backend endpoint, and finally wire up the frontend.',
  }
}
