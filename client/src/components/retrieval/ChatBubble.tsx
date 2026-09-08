import React from 'react'

export type ChatRole = 'user' | 'assistant'

interface ChatBubbleProps {
  role: ChatRole
  /** The message text. Ignored (renders a typing indicator instead) when isLoading is true. */
  text: string
  /** Optional display timestamp, e.g. "10:42 AM". */
  timestamp?: string
  /** Shows a "synthesizing..." typing indicator instead of text. Only meaningful for role="assistant". */
  isLoading?: boolean
  /**
   * Composition slots — kept as ReactNode rather than typed data so ChatBubble doesn't need
   * to import SourceCitationCard / RelatedExpertsTag / FeedbackButtons directly. Each renders
   * only for role="assistant" and only once isLoading is false.
   */
  citations?: React.ReactNode
  relatedExperts?: React.ReactNode
  feedback?: React.ReactNode
  className?: string
}

const TypingIndicator: React.FC = () => (
  <span className="inline-flex items-center gap-1 py-1" aria-label="Synthesizing answer">
    <span className="w-1.5 h-1.5 rounded-full bg-[#8a99b5] animate-pulse [animation-delay:0ms]" />
    <span className="w-1.5 h-1.5 rounded-full bg-[#8a99b5] animate-pulse [animation-delay:150ms]" />
    <span className="w-1.5 h-1.5 rounded-full bg-[#8a99b5] animate-pulse [animation-delay:300ms]" />
  </span>
)

const ChatBubble: React.FC<ChatBubbleProps> = ({
  role,
  text,
  timestamp,
  isLoading = false,
  citations,
  relatedExperts,
  feedback,
  className = '',
}) => {
  const isUser = role === 'user'

  if (isUser) {
    return (
      <div className={`flex justify-end ${className}`}>
        <div className="max-w-[75%] flex flex-col items-end gap-1">
          <div className="bg-[#223148] text-white rounded-2xl rounded-tr-sm px-4 py-2.5 font-body-md text-[14px] leading-relaxed">
            {text}
          </div>
          {timestamp && (
            <span className="font-code-md text-[10px] text-[#8a99b5]">{timestamp}</span>
          )}
        </div>
      </div>
    )
  }

  // --- assistant bubble ---
  return (
    <div className={`flex justify-start ${className}`}>
      <div className="max-w-[85%] w-full flex flex-col gap-1">
        <div className="bg-white border border-[#223148]/10 rounded-2xl rounded-tl-sm shadow-[0_3px_12px_rgba(34,49,72,0.05)] px-5 py-4 flex flex-col gap-3">
          <div className="flex items-center gap-1.5 text-[#475f86] font-code-md text-[10px] uppercase tracking-widest font-semibold">
            <span className="material-symbols-outlined text-[14px]">auto_awesome</span>
            Synthesized answer
          </div>

          {isLoading ? (
            <TypingIndicator />
          ) : (
            <p className="font-body-md text-[15px] leading-relaxed text-[#1f1b15] whitespace-pre-wrap">
              {text}
            </p>
          )}

          {!isLoading && citations && (
            <div className="pt-2 border-t border-[#f0e7dd] flex flex-col gap-2">{citations}</div>
          )}

          {!isLoading && relatedExperts && (
            <div className="pt-1 flex flex-col gap-1.5">{relatedExperts}</div>
          )}

          {!isLoading && feedback && (
            <div className="pt-1 flex items-center justify-between">
              <div />
              {feedback}
            </div>
          )}
        </div>

        {timestamp && !isLoading && (
          <span className="font-code-md text-[10px] text-[#8a99b5] pl-1">{timestamp}</span>
        )}
      </div>
    </div>
  )
}

export default ChatBubble