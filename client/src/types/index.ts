export type PersonaRoleType = 'departing' | 'new_hire' | 'manager'

export interface Persona {
  id: string
  name: string
  role: string
  department: string
  type: PersonaRoleType
  avatarInitials: string
  bio: string
  badgeLabel: string
  targetRoute: '/capture' | '/ask'
  highlightColor?: string
}

export type SourceType = 'Ticket' | 'Slack Thread' | 'PR' | 'Incident'

export interface SourceItem {
  id: string
  title: string
  type: SourceType
  timestamp: string
  preview: string
  sourceRef: string
  author: string
  channelOrRepo?: string
  isProcessed?: boolean
  maskedCount?: number
}

export type EntryStatus = 'pending' | 'approved' | 'discarded'

export interface KnowledgeDraft {
  id: string
  sourceId: string
  problem: string
  symptom: string
  solution: string
  context: string
  tags: string[]
  status: EntryStatus
  sourceLabel?: string
  sourceType?: SourceType
  piiMasked?: boolean
  piiMaskedCount?: number
  category?: string
  impact?: 'Critical' | 'High' | 'Medium'
}

export interface GapItem {
  id: string
  title: string
  category: string
  priority: 'Critical' | 'High' | 'Medium'
  description: string
  sourceRef: string
  timestamp: string
  sourceType: SourceType
}

export interface GapQuestion {
  id: string
  question: string
  contextHint: string
  defaultAnswer: string
  userAnswer: string
  isSaved?: boolean
}

export interface SourceCitation {
  id: string
  title: string
  author: string
  authorInitials: string
  date: string
  sourceRef: string
  similarityScore: number
  snippet: string
  sourceType: 'Ticket' | 'Slack' | 'PR' | 'Incident' | 'Post-Mortem'
}

export interface Expert {
  id: string
  name: string
  initials: string
  role: string
  badge?: string
  reason?: string
}

export interface ChatMessage {
  id: string
  sender: 'user' | 'ai'
  text: string
  timestamp: string
  sources?: SourceCitation[]
  relatedExperts?: Expert[]
  feedback?: 'up' | 'down' | null
  query?: string
}
