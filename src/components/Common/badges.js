// Maps a task status to a CSS badge class.
export function statusBadgeClass(status) {
  switch (status) {
    case 'Pending':
      return 'badge badge-pending'
    case 'In Progress':
      return 'badge badge-progress'
    case 'Completed':
      return 'badge badge-completed'
    default:
      return 'badge'
  }
}

// Maps a task priority to a CSS badge class.
export function priorityBadgeClass(priority) {
  switch (priority) {
    case 'High':
      return 'badge badge-high'
    case 'Medium':
      return 'badge badge-medium'
    case 'Low':
      return 'badge badge-low'
    default:
      return 'badge'
  }
}

export const STATUS_OPTIONS = ['Pending', 'In Progress', 'Completed']
export const PRIORITY_OPTIONS = ['Low', 'Medium', 'High']
