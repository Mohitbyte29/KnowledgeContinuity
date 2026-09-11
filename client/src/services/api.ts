import axios from 'axios'

const BASE_URL = import.meta.env?.VITE_API_BASE_URL || 'http://localhost:5000/api'

export const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 20000,
})

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

export const endpoints = {
  login: (persona: unknown) => api.post('/auth/login', { persona }),
  getProjects: () => api.get('/projects'),
  runDailyBatch: () => api.post('/capture/daily-batch'),
  startOffboarding: (employeeId: string) => api.post('/capture/offboarding/start', { employeeId }),
  getOffboardingGaps: (employeeId: string) =>
    api.get('/capture/offboarding/gap-check', { params: { employeeId } }),
  extractEntries: (rawItems: unknown[]) => api.post('/capture/extract', { rawItems }),
  submitInterviewAnswers: (employeeId: string, answers: unknown[]) =>
    api.post('/capture/interview', { employeeId, answers }),
  getPendingEntries: (employeeId: string) =>
    api.get('/capture/entries/pending', { params: { employeeId } }),
  submitReview: (decisions: unknown[]) => api.post('/capture/review', { decisions }),
  saveApprovedEntries: (entryIds: string[]) => api.post('/capture/save', { entryIds }),
  search: (query: string, projectId?: string) => api.post('/query/search', { query, projectId }),
  submitFeedback: (entryId: string, rating: 'up' | 'down') => api.post('/query/feedback', { entryId, rating }),
  getQueryHistory: () => api.get('/query/history'),
}

export default api