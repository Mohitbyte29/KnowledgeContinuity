import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Navbar } from '../components/shared/Navbar'
import { ProjectDropdown } from '../components/shared/ProjectDropdown'
import { ChatBubble } from '../components/retrieval/ChatBubble'
import { EmptyStatePresets } from '../components/retrieval/EmptyStatePresets'
import { useUserContext } from '../context/UserContext'
import { MOCK_RETRIEVAL_KNOWLEDGE } from '../data/mockData'
import type { ChatMessage } from '../types'
import { 
  Search, 
  Send, 
  Brain, 
  Loader2, 
  RotateCcw
} from 'lucide-react'

export const AskPage: React.FC = () => {
  const { selectedProjectId, setSelectedProjectId } = useUserContext()
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [inputQuery, setInputQuery] = useState('')
  const [isThinking, setIsThinking] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement | null>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, isThinking])

  // --- Search Execution Handler ---
  const handleExecuteQuery = (queryText: string) => {
    const trimmed = queryText.trim()
    if (!trimmed || isThinking) return

    const userMsgId = `user-${Date.now()}`
    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

    const userMsg: ChatMessage = {
      id: userMsgId,
      sender: 'user',
      text: trimmed,
      timestamp: now,
    }

    setMessages((prev) => [...prev, userMsg])
    setInputQuery('')
    setIsThinking(true)

    // Match query against mock knowledge or fallback
    const lower = trimmed.toLowerCase()
    let matchedKnowledge = MOCK_RETRIEVAL_KNOWLEDGE.default

    if (lower.includes('stripe') || lower.includes('webhook') || lower.includes('429') || lower.includes('rate')) {
      matchedKnowledge = MOCK_RETRIEVAL_KNOWLEDGE.stripe
    } else if (lower.includes('redis') || lower.includes('lock') || lower.includes('settlement') || lower.includes('midnight') || lower.includes('timeout')) {
      matchedKnowledge = MOCK_RETRIEVAL_KNOWLEDGE.redis
    } else if (lower.includes('dns') || lower.includes('aurora') || lower.includes('failover') || lower.includes('postgres') || lower.includes('kms')) {
      matchedKnowledge = MOCK_RETRIEVAL_KNOWLEDGE.dns
    }

    // Simulate AI synthesis latency (~600ms)
    setTimeout(() => {
      const aiMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: matchedKnowledge.answer,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        sources: matchedKnowledge.sources.map((s, idx) => ({
          id: `src-${idx}`,
          title: s.title,
          author: s.author,
          authorInitials: s.authorInitials,
          date: s.date,
          sourceRef: s.sourceRef,
          similarityScore: s.similarityScore,
          snippet: s.snippet,
          sourceType: s.sourceType,
        })),
        relatedExperts: matchedKnowledge.experts,
        query: trimmed,
      }

      setMessages((prev) => [...prev, aiMsg])
      setIsThinking(false)
    }, 650)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    handleExecuteQuery(inputQuery)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleExecuteQuery(inputQuery)
    }
  }

  const handleFeedback = (msgId: string, rating: 'up' | 'down') => {
    setMessages((prev) =>
      prev.map((m) => (m.id === msgId ? { ...m, feedback: rating } : m))
    )
  }

  const handleClearChat = () => {
    setMessages([])
  }

  return (
    <div className="min-h-screen w-full bg-[#0A0A0A] text-white flex flex-col justify-between overflow-y-auto overflow-x-hidden">
      {/* Persistent Top Navbar */}
      <Navbar />

      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 py-6 flex flex-col justify-between pb-10">
        
        {/* Top Control Bar: Title, Subtitle, Project Scope Selector */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-[#27272A]"
        >
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#FF6A00] animate-pulse" />
              <h1 className="text-[22px] sm:text-[24px] font-bold text-white tracking-tight">
                Ask the Knowledge Base
              </h1>
            </div>
            <p className="text-[13px] text-[#A1A1AA]">
              Search what your team already knows with full source groundings.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <ProjectDropdown
              selectedProject={selectedProjectId}
              onSelectProject={setSelectedProjectId}
            />

            {messages.length > 0 && (
              <motion.button
                type="button"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleClearChat}
                title="Reset conversation"
                className="p-2 rounded-xl bg-[#141414] hover:bg-[#1c1c20] text-[#71717A] hover:text-white border border-[#27272A] transition-all"
              >
                <RotateCcw className="w-4 h-4" />
              </motion.button>
            )}
          </div>
        </motion.div>

        {/* Chat Stream / Empty State Area */}
        <div className="flex-1 py-6 min-h-[440px]">
          {messages.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
            >
              <EmptyStatePresets onSelectQuery={handleExecuteQuery} />
            </motion.div>
          ) : (
            <div className="space-y-2">
              <AnimatePresence>
                {messages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35 }}
                  >
                    <ChatBubble
                      message={msg}
                      onFeedback={handleFeedback}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* AI Thinking Animation */}
              {isThinking && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-start gap-3.5 mb-6"
                >
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#FF6A00] to-[#EF2B2D] text-white flex items-center justify-center shrink-0 shadow-lg shadow-[#FF6A00]/25 animate-pulse">
                    <Brain className="w-5 h-5 text-white" />
                  </div>
                  <div className="rounded-2xl rounded-tl-sm bg-[#141414] border border-[#27272A] p-4 flex items-center gap-3 text-[13px] text-[#A1A1AA] shadow-lg">
                    <Loader2 className="w-4 h-4 text-[#FF6A00] animate-spin" />
                    <span>Searching vector indexes &amp; synthesizing answer...</span>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* Bottom Fixed-Style Input Bar */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="pt-3 pb-2"
        >
          <form onSubmit={handleSubmit} className="relative">
            <div className="relative flex items-center bg-[#141414] hover:bg-[#18181B] rounded-2xl border border-[#27272A] focus-within:border-[#FF6A00] focus-within:ring-2 focus-within:ring-[#FF6A00]/20 shadow-2xl transition-all">
              <div className="pl-4 text-[#71717A] flex items-center pointer-events-none">
                <Search className="w-5 h-5 text-[#FF6A00]" />
              </div>

              <input
                type="text"
                value={inputQuery}
                onChange={(e) => setInputQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Describe your bug or question (e.g. Stripe webhook retries, Redis lock timeouts)..."
                disabled={isThinking}
                className="w-full py-4 pl-3.5 pr-14 bg-transparent text-[14px] text-white placeholder:text-[#71717A] outline-none"
              />

              <motion.button
                type="submit"
                whileHover={inputQuery.trim() && !isThinking ? { scale: 1.05 } : {}}
                whileTap={inputQuery.trim() && !isThinking ? { scale: 0.95 } : {}}
                disabled={!inputQuery.trim() || isThinking}
                title="Send query (Enter)"
                className={`absolute right-2.5 top-1/2 -translate-y-1/2 w-9 h-9 rounded-xl flex items-center justify-center transition-all shadow-md ${
                  inputQuery.trim() && !isThinking
                    ? 'bg-gradient-to-r from-[#FF6A00] to-[#EF2B2D] hover:from-[#FF8533] text-white shadow-[#FF6A00]/30'
                    : 'bg-[#1F1F23] text-[#52525B] cursor-not-allowed'
                }`}
              >
                <Send className="w-4 h-4" />
              </motion.button>
            </div>
          </form>

          <div className="flex items-center justify-between text-[11px] text-[#52525B] font-mono px-2 pt-2">
            <span>
              Targeting: <strong className="text-[#A1A1AA] font-semibold">{selectedProjectId}</strong>
            </span>
            <span className="hidden sm:inline">
              Press Enter ↵ to search
            </span>
          </div>
        </motion.div>

      </main>
    </div>
  )
}

export default AskPage