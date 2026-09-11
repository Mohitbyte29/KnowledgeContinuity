import React from 'react'
import { motion } from 'motion/react'
import type { SourceCitation } from '../../types'
import { FileText, Ticket, MessageSquare, GitPullRequest, AlertTriangle, Calendar, CheckCircle2 } from 'lucide-react'

interface SourceCitationCardProps {
  source: SourceCitation
  className?: string
}

export const SourceCitationCard: React.FC<SourceCitationCardProps> = ({
  source,
  className = '',
}) => {
  const getSourceBadge = () => {
    switch (source.sourceType) {
      case 'Ticket':
        return { icon: <Ticket className="w-3.5 h-3.5" />, color: 'bg-[#FF6A00]/15 text-[#FF6A00] border-[#FF6A00]/30' }
      case 'PR':
        return { icon: <GitPullRequest className="w-3.5 h-3.5" />, color: 'bg-[#3B82F6]/15 text-[#3B82F6] border-[#3B82F6]/30' }
      case 'Slack':
        return { icon: <MessageSquare className="w-3.5 h-3.5" />, color: 'bg-[#A855F7]/15 text-[#A855F7] border-[#A855F7]/30' }
      case 'Incident':
      case 'Post-Mortem':
        return { icon: <AlertTriangle className="w-3.5 h-3.5" />, color: 'bg-[#EF2B2D]/15 text-[#EF2B2D] border-[#EF2B2D]/30' }
      default:
        return { icon: <FileText className="w-3.5 h-3.5" />, color: 'bg-[#27272A] text-[#A1A1AA] border-[#3F3F46]' }
    }
  }

  const badge = getSourceBadge()

  return (
    <motion.div 
      whileHover={{ y: -2 }}
      className={`rounded-xl bg-[#141414] border border-[#27272A] hover:border-[#3F3F46] p-4 transition-all shadow-md ${className}`}
    >
      {/* Top Header */}
      <div className="flex items-center justify-between gap-2 mb-2">
        <div className="flex items-center gap-2">
          <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold border ${badge.color}`}>
            {badge.icon}
            <span>{source.sourceType.toUpperCase()}</span>
          </span>
          <span className="text-[12px] font-mono text-[#A1A1AA]">
            {source.sourceRef}
          </span>
        </div>

        <span className="text-[11px] font-mono font-bold text-[#22C55E] bg-[#22C55E]/10 border border-[#22C55E]/30 px-2 py-0.5 rounded-full flex items-center gap-1">
          <CheckCircle2 className="w-3 h-3" />
          <span>{source.similarityScore}% MATCH</span>
        </span>
      </div>

      {/* Problem / Title */}
      <h4 className="text-[14px] font-semibold text-white mb-1.5 leading-snug">
        {source.title}
      </h4>

      {/* Snippet */}
      <p className="text-[12px] text-[#A1A1AA] leading-relaxed mb-3 line-clamp-2">
        {source.snippet}
      </p>

      {/* Author & Date Footer */}
      <div className="pt-2 border-t border-[#27272A]/70 flex items-center justify-between text-[11px] text-[#71717A]">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-full bg-[#FF6A00]/20 text-[#FF6A00] text-[10px] font-bold flex items-center justify-center">
            {source.authorInitials || 'PS'}
          </div>
          <span className="font-medium text-[#A1A1AA]">{source.author}</span>
        </div>

        <div className="flex items-center gap-1 text-[#71717A]">
          <Calendar className="w-3 h-3" />
          <span>{source.date}</span>
        </div>
      </div>
    </motion.div>
  )
}

export default SourceCitationCard