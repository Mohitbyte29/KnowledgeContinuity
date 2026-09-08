import React, { useEffect, useRef, useState } from 'react'
import ChatBubble from './ChatBubble'
import SourceCitationCard from './SourceCitationCard'
import RelatedExpertsTag from './RelatedExpertsTag'
import FeedbackButtons from './FeedbackButtons'
import api from '../../services/api'

export interface SourceCitation {
  id: string
  title: string
  sourceLink: string
  author: string
  date: string
  matchPct?: number
}

export interface RelatedExpert {
  name: string
  role?: string
  tagsMatched?: string[]
}

interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  text: string
  timestamp: string
  isLoading?: boolean
  citations?: SourceCitation[]
  relatedExperts?: RelatedExpert[]
  primaryEntryId?: string
}

interface ChatWindowProps {
  /** Optional project id to scope retrieval, wired from ProjectDropdown. */
  projectId?: string
  /** Example prompts shown when the conversation is empty. */
  exampleQueries?: string[]
  className?: string
}

const nowLabel = () =>
  new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })

const makeId = () => `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`

const ChatWindow: React.FC<ChatWindowProps> = ({
  projectId,
  exampleQueries = [
    'Why did we disable connection pooling on checkout in March?',
    'How do I roll back a canary safely?',
    'What do I do about ETL timeouts on the invoices table?',
  ],
  className = '',
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [input, setInput] = useState('')
  const [isSending, setIsSending] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages])

  const sendQuery = async (queryText: string) => {
    const trimmed = queryText.trim()
    if (!trimmed || isSending) return

    const userMessage: ChatMessage = {
      id: makeId(),
      role: 'user',
      text: trimmed,
      timestamp: nowLabel(),
    }
    const loadingId = makeId()
    const loadingMessage: ChatMessage = {
      id: loadingId,
      role: 'assistant',
      text: '',
      timestamp: nowLabel(),
      isLoading: true,
    }

    setMessages((prev) => [...prev, userMessage, loadingMessage])
    setInput('')
    setIsSending(true)

    try {
      const res = await api.post('/query/search', {
        query: trimmed,
        projectId,
      })

      const {
        synthesizedAnswer,
        sources,
        relatedExperts,
        primaryEntryId,
      }: {
        synthesizedAnswer: string
        sources: SourceCitation[]
        relatedExperts: RelatedExpert[]
        primaryEntryId?: string
      } = res.data

      setMessages((prev) =>
        prev.map((m) =>
          m.id === loadingId
            ? {
                ...m,
                text: synthesizedAnswer,
                citations: sources,
                relatedExperts,
                primaryEntryId,
                isLoading: false,
              }
            : m
        )
      )
    } catch (err) {
      setMessages((prev) =>
        prev.map((m) =>
          m.id === loadingId
            ? {
                ...m,
                text: "Something went wrong reaching the knowledge base. Try again in a moment.",
                isLoading: false,
              }
            : m
        )
      )
    } finally {
      setIsSending(false)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    sendQuery(input)
  }

  return (
    <div className={`flex flex-col h-full ${className}`}>
      {/* Message list */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto flex flex-col gap-4 px-1 py-4">
        {messages.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-4 text-center py-12">
            <span className="w-12 h-12 rounded-full bg-[#223148]/8 flex items-center justify-center">
              <span className="material-symbols-outlined text-[22px] text-[#223148]">search</span>
            </span>
            <div className="flex flex-col gap-1">
              <p className="font-display text-[17px] font-semibold text-[#0c1c32]">
                Try asking about a bug, deployment issue, or process question
              </p>
              <p className="font-body-sm text-[13px] text-[#505f78]">
                Answers are synthesized from handoff notes left by your teammates.
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-2 max-w-lg">
              {exampleQueries.map((q) => (
                <button
                  key={q}
                  type="button"
                  onClick={() => sendQuery(q)}
                  className="px-3 py-1.5 rounded-full bg-[#f0e7dd] hover:bg-[#e3d6c6] text-[#475f86] font-body-sm text-[13px] transition-colors"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        ) : (
          messages.map((m) => (
            <ChatBubble
              key={m.id}
              role={m.role}
              text={m.text}
              timestamp={m.timestamp}
              isLoading={m.isLoading}
              citations={
                m.citations && m.citations.length > 0 ? (
                  <>
                    {m.citations.map((c) => (
                      <SourceCitationCard key={c.id} {...c} />
                    ))}
                  </>
                ) : undefined
              }
              relatedExperts={
                m.relatedExperts && m.relatedExperts.length > 0 ? (
                  <RelatedExpertsTag experts={m.relatedExperts} />
                ) : undefined
              }
              feedback={
                m.primaryEntryId ? (
                  <FeedbackButtons entryId={m.primaryEntryId} />
                ) : undefined
              }
            />
          ))
        )}
      </div>

      {/* Input row */}
      <form
        onSubmit={handleSubmit}
        className="flex items-center gap-2 border-t border-[#223148]/10 bg-white rounded-full pl-4 pr-1.5 py-1.5 mt-2 shadow-[0_2px_10px_rgba(34,49,72,0.06)]"
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Describe your bug or question..."
          disabled={isSending}
          className="flex-1 bg-transparent outline-none font-body-md text-[14px] text-[#0c1c32] placeholder-[#8a99b5] disabled:opacity-60"
        />
        <button
          type="submit"
          disabled={isSending || !input.trim()}
          className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors shrink-0 ${
            isSending || !input.trim()
              ? 'bg-[#223148]/15 text-[#223148]/40 cursor-not-allowed'
              : 'bg-[#223148] hover:bg-[#0c1c32] text-white cursor-pointer'
          }`}
        >
          <span className="material-symbols-outlined text-[18px]">
            {isSending ? 'progress_activity' : 'arrow_upward'}
          </span>
        </button>
      </form>
    </div>
  )
}

export default ChatWindow