import axios from 'axios'

// Falls back to localhost:5000 for local dev — set VITE_API_BASE_URL in .env
// (client-side) to point at a different server without touching this file.
const BASE_URL = import.meta.env?.VITE_API_BASE_URL || 'http://localhost:5000/api'

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 20000, // extraction/synthesis calls can be slow — give them room before we call it a failure
})

// Normalize errors so every catch block downstream gets a readable message,
// whether the failure was a network drop, a timeout, or a real 4xx/5xx from Express.
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.code === 'ECONNABORTED') {
      error.message = 'Request timed out — the server took too long to respond.'
    } else if (!error.response) {
      error.message = 'Could not reach the server. Check that it is running.'
    } else {
      error.message =
        error.response.data?.message || error.response.data?.error || error.message
    }
    return Promise.reject(error)
  }
)

/**
 * Named endpoint helpers — optional convenience layer on top of the raw instance.
 * Every component built so far calls `api.get(...)` / `api.post(...)` directly,
 * which still works; these exist for call sites that prefer a named function
 * over remembering the exact path string.
 */
export const endpoints = {
  // auth
  login: (persona) => api.post('/auth/login', { persona }),

  // projects
  getProjects: () => api.get('/projects'),

  // capture — daily batch
  runDailyBatch: () => api.post('/capture/daily-batch'),

  // capture — offboarding
  startOffboarding: (employeeId) => api.post('/capture/offboarding/start', { employeeId }),
  getOffboardingGaps: (employeeId) =>
    api.get('/capture/offboarding/gap-check', { params: { employeeId } }),

  // capture — shared
  extractEntries: (rawItems) => api.post('/capture/extract', { rawItems }),
  submitInterviewAnswers: (employeeId, answers) =>
    api.post('/capture/interview', { employeeId, answers }),
  getPendingEntries: (employeeId) =>
    api.get('/capture/entries/pending', { params: { employeeId } }),
  submitReview: (decisions) => api.post('/capture/review', { decisions }),
  saveApprovedEntries: (entryIds) => api.post('/capture/save', { entryIds }),

  // query / retrieval
  search: (query, projectId) => api.post('/query/search', { query, projectId }),
  submitFeedback: (entryId, rating) => api.post('/query/feedback', { entryId, rating }),
  getQueryHistory: () => api.get('/query/history'),
}

export default api