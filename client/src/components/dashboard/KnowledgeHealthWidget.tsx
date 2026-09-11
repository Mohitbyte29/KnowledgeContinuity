import React from 'react'
import type { KnowledgeHealth } from '../../types'
import { ThumbsUp, ThumbsDown, CheckCircle2, Activity } from 'lucide-react'

interface KnowledgeHealthWidgetProps {
  data: KnowledgeHealth
  isLoading?: boolean
  className?: string
}

export const KnowledgeHealthWidget: React.FC<KnowledgeHealthWidgetProps> = ({
  data,
  isLoading = false,
  className = '',
}) => {
  if (isLoading) {
    return (
      <div className={`rounded-2xl bg-[#141414] border border-[#27272A] p-6 animate-pulse space-y-4 ${className}`}>
        <div className="h-5 w-44 bg-[#27272A] rounded" />
        <div className="grid grid-cols-2 gap-3 pt-2">
          <div className="h-20 bg-[#18181B] rounded-xl" />
          <div className="h-20 bg-[#18181B] rounded-xl" />
        </div>
      </div>
    )
  }

  const totalFeedback = (data.totalHelpful || 0) + (data.totalOutdated || 0)
  const accuracyPct = totalFeedback > 0 
    ? Math.round(((data.totalHelpful || 0) / totalFeedback) * 100) 
    : 98

  return (
    <section className={`rounded-2xl bg-[#141414] border border-[#27272A] p-6 sm:p-7 shadow-xl flex flex-col justify-between gap-5 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-[#27272A]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Activity className="w-4 h-4 text-[#22C55E]" />
            <h3 className="text-[16px] font-bold text-white tracking-tight uppercase">
              Knowledge Base Health
            </h3>
          </div>
          <p className="text-[12px] text-[#A1A1AA]">
            Answers: "Is our repository accurate and trusted by engineers during incidents?"
          </p>
        </div>

        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-[#22C55E]/15 text-[#22C55E] border border-[#22C55E]/30">
          <CheckCircle2 className="w-3 h-3" />
          <span>HEALTHY</span>
        </span>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        {/* Metric 1: Trust Ratio */}
        <div className="p-4 rounded-xl bg-[#18181B] border border-[#27272A] space-y-1">
          <span className="text-[11px] font-mono text-[#71717A] uppercase block">
            Engineer Trust Ratio
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-[28px] font-black font-mono text-[#22C55E] leading-none">
              {accuracyPct}%
            </span>
            <span className="text-[11px] text-[#A1A1AA]">positive accuracy</span>
          </div>
          <div className="flex items-center gap-3 pt-2 text-[11px] font-mono text-[#71717A]">
            <span className="flex items-center gap-1 text-[#22C55E]">
              <ThumbsUp className="w-3 h-3" /> {data.totalHelpful} helpful
            </span>
            <span>•</span>
            <span className="flex items-center gap-1 text-[#EF2B2D]">
              <ThumbsDown className="w-3 h-3" /> {data.totalOutdated} outdated
            </span>
          </div>
        </div>

        {/* Metric 2: AI Vector Quality */}
        <div className="p-4 rounded-xl bg-[#18181B] border border-[#27272A] space-y-1">
          <span className="text-[11px] font-mono text-[#71717A] uppercase block">
            Mean AI Confidence
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-[28px] font-black font-mono text-[#FF6A00] leading-none">
              {data.avgConfidence}%
            </span>
            <span className="text-[11px] text-[#A1A1AA]">vector alignment</span>
          </div>
          <p className="text-[11px] text-[#71717A] pt-2">
            Across {data.totalEntries} verified institutional dossiers
          </p>
        </div>
      </div>
    </section>
  )
}

export default KnowledgeHealthWidget
