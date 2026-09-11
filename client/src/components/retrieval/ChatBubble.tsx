import React, { useState } from 'react'
import { motion } from 'motion/react'
import type { ChatMessage } from '../../types'
import { SourceCitationCard } from './SourceCitationCard'
import { RelatedExpertsRow } from './RelatedExpertsRow'
import { 
  Brain, 
  User, 
  ThumbsUp, 
  ThumbsDown, 
  Copy, 
  Check, 
  Sparkles
} from 'lucide-react'

interface ChatBubbleProps {
  message: ChatMessage
  onFeedback?: (messageId: string, rating: 'up' | 'down') => void
  className?: string
}

export const ChatBubble: React.FC<ChatBubbleProps> = ({
  message,
  onFeedback,
  className = '',
}) => {
  const isUser = message.sender === 'user'
  const [copied, setCopied] = useState(false)
  const [feedback, setFeedback] = useState<'up' | 'down' | null>(message.feedback || null)
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(message.text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleThumbClick = (rating: 'up' | 'down') => {
    const nextRating = feedback === rating ? null : rating
    setFeedback(nextRating)
    setFeedbackSubmitted(nextRating !== null)
    if (onFeedback && nextRating) {
      onFeedback(message.id, nextRating)
    }
  }

  // --- User Query (Right-Aligned) ---
  if (isUser) {
    return (
      <div className={`flex justify-end mb-6 ${className}`}>
        <div className="flex items-start gap-3 max-w-2xl">
          <motion.div 
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="rounded-2xl rounded-tr-sm bg-[#1A1A1E] border border-[#FF6A00]/30 p-4 sm:p-5 shadow-lg shadow-[#FF6A00]/5 text-white"
          >
            <div className="flex items-center justify-between gap-3 text-[11px] text-[#A1A1AA] mb-1 font-mono">
              <span className="font-semibold text-[#FF6A00]">YOU</span>
              <span>{message.timestamp}</span>
            </div>
            <p className="text-[15px] font-medium leading-relaxed">
              {message.text}
            </p>
          </motion.div>

          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#27272A] to-[#3F3F46] border border-[#3F3F46] text-white text-[12px] font-bold flex items-center justify-center shrink-0 mt-1">
            <User className="w-4 h-4 text-[#A1A1AA]" />
          </div>
        </div>
      </div>
    )
  }

  // --- AI Response (Left-Aligned) ---
  return (
    <div className={`flex justify-start mb-8 ${className}`}>
      <div className="flex items-start gap-3.5 max-w-3xl w-full">
        {/* AI Avatar */}
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#FF6A00] to-[#EF2B2D] text-white flex items-center justify-center shrink-0 shadow-lg shadow-[#FF6A00]/25 mt-1"
        >
          <Brain className="w-5 h-5 text-white" />
        </motion.div>

        {/* AI Content Bubble */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="flex-1 min-w-0 rounded-2xl rounded-tl-sm bg-[#141414] border border-[#27272A] p-5 sm:p-6 shadow-xl space-y-5"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-3 border-b border-[#27272A]">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-[#FF6A00] bg-[#FF6A00]/10 px-2.5 py-0.5 rounded-full border border-[#FF6A00]/30">
                <Sparkles className="w-3 h-3" />
                <span>Synthesized Answer</span>
              </span>
              <span className="text-[11px] text-[#71717A] hidden sm:inline font-mono">
                · Verified Institutional Memory
              </span>
            </div>

            <div className="flex items-center gap-1">
              <motion.button
                type="button"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleCopy}
                title="Copy synthesized answer"
                className="p-1.5 rounded-lg text-[#71717A] hover:text-white hover:bg-[#1F1F23] transition-all text-[12px] flex items-center gap-1"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-[#22C55E]" />
                    <span className="text-[#22C55E] text-[11px]">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline text-[11px]">Copy</span>
                  </>
                )}
              </motion.button>
            </div>
          </div>

          {/* Synthesized Answer Prose */}
          <div className="text-[14.5px] sm:text-[15px] leading-relaxed text-[#F4F4F5] space-y-3 font-normal">
            <p className="whitespace-pre-line">{message.text}</p>
          </div>

          {/* Source Citations Section */}
          {message.sources && message.sources.length > 0 && (
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-[#71717A]">
                <span>Source Citations &amp; Evidence ({message.sources.length})</span>
                <span className="text-[#FF6A00] font-mono">Top Grounded Evidence</span>
              </div>

              <div className="grid grid-cols-1 gap-3">
                {message.sources.map((src, idx) => (
                  <SourceCitationCard key={idx} source={src} />
                ))}
              </div>
            </div>
          )}

          {/* Related Experts Row */}
          {message.relatedExperts && message.relatedExperts.length > 0 && (
            <div className="pt-2 border-t border-[#27272A]">
              <RelatedExpertsRow experts={message.relatedExperts} />
            </div>
          )}

          {/* Feedback & Actions Bar */}
          <div className="pt-3 border-t border-[#27272A]/70 flex items-center justify-between text-[12px]">
            <div className="flex items-center gap-2">
              <span className="text-[11px] text-[#71717A]">Was this answer accurate?</span>
              <motion.button
                type="button"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => handleThumbClick('up')}
                className={`p-1.5 rounded-lg border transition-all ${
                  feedback === 'up'
                    ? 'bg-[#22C55E]/20 text-[#22C55E] border-[#22C55E]/40'
                    : 'bg-[#18181B] text-[#71717A] hover:text-white border-[#27272A]'
                }`}
                title="Helpful answer"
              >
                <ThumbsUp className="w-3.5 h-3.5" />
              </motion.button>
              <motion.button
                type="button"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => handleThumbClick('down')}
                className={`p-1.5 rounded-lg border transition-all ${
                  feedback === 'down'
                    ? 'bg-[#EF2B2D]/20 text-[#EF2B2D] border-[#EF2B2D]/40'
                    : 'bg-[#18181B] text-[#71717A] hover:text-white border-[#27272A]'
                }`}
                title="Inaccurate or incomplete"
              >
                <ThumbsDown className="w-3.5 h-3.5" />
              </motion.button>

              {feedbackSubmitted && (
                <span className="text-[11px] text-[#22C55E] font-medium ml-1 animate-fade-in">
                  Thanks for your feedback!
                </span>
              )}
            </div>

            <span className="text-[11px] text-[#52525B] font-mono">
              Vector latency: 42ms
            </span>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default ChatBubble