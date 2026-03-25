export const STATUS_VALUES = [
  'Applied',
  'Phone Screen',
  'Interviewing',
  'Offer Received',
  'Rejected',
  'Withdrawn',
]

// Mock data store — replace function bodies with fetch() calls when Lambda is ready
let mockJobs = [
  {
    id: '1',
    company: 'Apple',
    role: 'Senior Frontend Engineer',
    status: 'Interviewing',
    dateApplied: '2026-03-10',
    url: 'https://jobs.apple.com',
    notes: 'Referral from John. HM is Sarah K. Technical screen went well.',
    createdAt: '2026-03-10T09:00:00Z',
    updatedAt: '2026-03-10T09:00:00Z',
  },
  {
    id: '2',
    company: 'Stripe',
    role: 'Frontend Engineer',
    status: 'Phone Screen',
    dateApplied: '2026-03-15',
    url: 'https://stripe.com/jobs',
    notes: 'Recruiter reached out on LinkedIn.',
    createdAt: '2026-03-15T14:00:00Z',
    updatedAt: '2026-03-15T14:00:00Z',
  },
  {
    id: '3',
    company: 'Airbnb',
    role: 'Software Engineer, Design Systems',
    status: 'Applied',
    dateApplied: '2026-03-20',
    url: '',
    notes: '',
    createdAt: '2026-03-20T10:30:00Z',
    updatedAt: '2026-03-20T10:30:00Z',
  },
]

export async function getJobs() {
  return structuredClone(mockJobs)
}

export async function createJob(data) {
  const newJob = {
    ...data,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
  mockJobs = [newJob, ...mockJobs]
  return structuredClone(newJob)
}

export async function updateJob(id, data) {
  mockJobs = mockJobs.map(j =>
    j.id === id ? { ...j, ...data, updatedAt: new Date().toISOString() } : j
  )
  return structuredClone(mockJobs.find(j => j.id === id))
}

export async function deleteJob(id) {
  mockJobs = mockJobs.filter(j => j.id !== id)
  return { success: true }
}
