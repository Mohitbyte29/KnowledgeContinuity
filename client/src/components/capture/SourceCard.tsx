import React from 'react'
import { motion } from 'motion/react'
import type { SourceItem } from '../../types'
import { Ticket, GitPullRequest, MessageSquare, AlertTriangle, CheckCircle2, Clock, Sparkles } from 'lucide-react'

interface SourceCardProps {
  item: SourceItem
  isProcessed?: boolean
  isExtracting?: boolean
  className?: string
}

export const SourceCard: React.FC<SourceCardProps> = ({
  item,
  isProcessed = false,
  isExtracting = false,
  className = '',
}) => {
  const getIcon = () => {
    switch (item.type) {
      case 'Ticket':
        return <Ticket className="w-4 h-4 text-[#FF6A00]" />
      case 'PR':
        return <GitPullRequest className="w-4 h-4 text-[#3B82F6]" />
      case 'Slack Thread':
        return <MessageSquare className="w-4 h-4 text-[#A855F7]" />
      case 'Incident':
        return <AlertTriangle className="w-4 h-4 text-[#EF2B2D]" />
      default:
        return <Ticket className="w-4 h-4 text-[#FF6A00]" />
    }
  }

  const getTagColor = () => {
    switch (item.type) {
      case 'Ticket':
        return 'bg-[#FF6A00]/10 text-[#FF6A00] border-[#FF6A00]/20'
      case 'PR':
        return 'bg-[#3B82F6]/10 text-[#3B82F6] border-[#3B82F6]/20'
      case 'Slack Thread':
        return 'bg-[#A855F7]/10 text-[#A855F7] border-[#A855F7]/20'
      case 'Incident':
        return 'bg-[#EF2B2D]/10 text-[#EF2B2D] border-[#EF2B2D]/20'
      default:
        return 'bg-[#27272A] text-[#A1A1AA] border-[#3F3F46]'
    }
  }

  return (
    <motion.div
      layout
      whileHover={!isProcessed ? { scale: 1.01, y: -2 } : {}}
      className={`relative rounded-2xl p-4 transition-all duration-300 border ${
        isProcessed
          ? 'opacity-40 bg-[#0E0E10] border-[#27272A] line-through-text scale-[0.98]'
          : isExtracting
          ? 'bg-[#18181B] border-[#FF6A00] shadow-lg shadow-[#FF6A00]/20 scale-[1.02]'
          : 'bg-[#141414] hover:bg-[#18181B] border-[#27272A] hover:border-[#3F3F46] shadow-md'
      } ${className}`}
    >
      {/* Processed Checkmark Overlay */}
      {isProcessed && (
        <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#22C55E]/15 border border-[#22C55E]/30 text-[11px] font-semibold text-[#22C55E] z-10 animate-fade-in">
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span>Extracted</span>
        </div>
      )}

      {/* Extracting Pulsing Glow */}
      {isExtracting && (
        <div className="absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#FF6A00]/20 border border-[#FF6A00]/40 text-[11px] font-semibold text-[#FF6A00] z-10 animate-pulse">
          <Sparkles className="w-3.5 h-3.5 animate-spin" />
          <span>Processing...</span>
        </div>
      )}

      <div className="flex flex-col gap-2.5">
        {/* Header Tags & Timestamp */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[11px] font-bold border ${getTagColor()}`}>
              {getIcon()}
              <span>{item.type}</span>
            </span>
            <span className="text-[11px] font-mono text-[#71717A]">
              {item.sourceRef}
            </span>
          </div>

          <div className="flex items-center gap-1 text-[11px] text-[#71717A] pr-1">
            <Clock className="w-3 h-3" />
            <span>{item.timestamp}</span>
          </div>
        </div>

        {/* Title */}
        <h4 className={`text-[14px] font-semibold leading-snug ${isProcessed ? 'text-[#71717A] line-through' : 'text-white'}`}>
          {item.title}
        </h4>

        {/* Preview Snippet */}
        <p className={`text-[12px] leading-relaxed line-clamp-2 ${isProcessed ? 'text-[#52525B]' : 'text-[#A1A1AA]'}`}>
          {item.preview}
        </p>

        {/* Footer Meta */}
        <div className="pt-2 border-t border-[#27272A]/60 flex items-center justify-between text-[11px] text-[#71717A]">
          <span>Author: <strong className="text-[#A1A1AA] font-medium">{item.author}</strong></span>
          {item.channelOrRepo && (
            <span className="font-mono text-[10px] text-[#A1A1AA] bg-[#1C1C1F] px-2 py-0.5 rounded border border-[#27272A]">
              {item.channelOrRepo}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  )
}

export default SourceCard
