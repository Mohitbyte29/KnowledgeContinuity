import React, { useState } from 'react'
import api from '../../services/api'

export type FeedbackRating = 'helpful' | 'outdated'

interface FeedbackButtonsProps {
  /** The KnowledgeEntry id this feedback updates the confidenceScore for. */
  entryId: string
  /** Pre-existing rating, e.g. if reopening a past conversation. */
  initialFeedback?: FeedbackRating | null
  /** Called after a successful submit, with the rating that was sent. */
  onFeedbackSubmitted?: (rating: FeedbackRating) => void
  className?: string
}

const FeedbackButtons: React.FC<FeedbackButtonsProps> = ({
  entryId,
  initialFeedback = null,
  onFeedbackSubmitted,
  className = '',
}) => {
  const [rating, setRating] = useState<FeedbackRating | null>(initialFeedback)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState(false)

  const submit = async (next: FeedbackRating) => {
    if (isSubmitting) return

    // toggling the same rating again clears it
    const resolved: FeedbackRating | null = rating === next ? null : next
    const previous = rating
    setRating(resolved)
    setError(false)
    setIsSubmitting(true)

    try {
      await api.post('/query/feedback', {
        entryId,
        rating: resolved,
      })
      if (resolved) onFeedbackSubmitted?.(resolved)
    } catch (err) {
      setRating(previous)
      setError(true)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className={`flex items-center gap-1 ${className}`}>
      <button
        type="button"
        onClick={() => submit('helpful')}
        disabled={isSubmitting}
        title="This was helpful"
        aria-pressed={rating === 'helpful'}
        className={`w-7 h-7 rounded-md flex items-center justify-center transition-colors disabled:opacity-50 ${
          rating === 'helpful'
            ? 'bg-[#2D5A3D]/15 text-[#2D5A3D]'
            : 'text-[#8a99b5] hover:text-[#2D5A3D] hover:bg-[#2D5A3D]/10'
        }`}
      >
        <span className="material-symbols-outlined text-[16px]">
          {rating === 'helpful' ? 'thumb_up' : 'thumb_up'}
        </span>
      </button>

      <button
        type="button"
        onClick={() => submit('outdated')}
        disabled={isSubmitting}
        title="This is outdated"
        aria-pressed={rating === 'outdated'}
        className={`w-7 h-7 rounded-md flex items-center justify-center transition-colors disabled:opacity-50 ${
          rating === 'outdated'
            ? 'bg-[#B85C38]/15 text-[#B85C38]'
            : 'text-[#8a99b5] hover:text-[#B85C38] hover:bg-[#B85C38]/10'
        }`}
      >
        <span className="material-symbols-outlined text-[16px]">thumb_down</span>
      </button>

      {rating && !error && (
        <span className="font-code-md text-[10px] text-[#8a99b5] ml-1">
          {rating === 'helpful' ? 'Thanks!' : 'Noted — flagging for review'}
        </span>
      )}
      {error && (
        <span className="font-code-md text-[10px] text-[#B85C38] ml-1">
          Couldn't save, try again
        </span>
      )}
    </div>
  )
}

export default FeedbackButtons