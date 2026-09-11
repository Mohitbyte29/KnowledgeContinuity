import React from 'react'
import { Link } from 'react-router-dom'
import type { LastGapCheck } from '../../types'
import { Sparkles, UserCheck, Clock, PlusCircle } from 'lucide-react'

interface GapCheckImpactWidgetProps {
  data: LastGapCheck | null
  isLoading?: boolean
  className?: string
}

export const GapCheckImpactWidget: React.FC<GapCheckImpactWidgetProps> = ({
  data,
  isLoading = false,
  className = '',
}) => {
  if (isLoading) {
    return (
      <div className={`rounded-2xl bg-[#141414] border border-[#27272A] p-6 animate-pulse space-y-4 ${className}`}>
        <div className="h-5 w-48 bg-[#27272A] rounded" />
        <div className="h-20 bg-[#18181B] rounded-xl" />
      </div>
    )
  }

  // --- Real Empty State (When no gap check has been run yet) ---
  if (!data) {
    return (
      <div className={`rounded-2xl bg-[#141414] border border-[#27272A] p-6 sm:p-7 flex flex-col justify-between gap-5 ${className}`}>
        <div className="flex items-center gap-2 text-[#FF6A00] text-[11px] font-bold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Offboarding Gap-Check Impact</span>
        </div>

        <div className="p-5 rounded-xl bg-[#18181B] border border-dashed border-[#27272A] text-center space-y-2.5">
          <UserCheck className="w-8 h-8 text-[#71717A] mx-auto" />
          <h3 className="text-[15px] font-bold text-white">No Offboarding Gap Check Run Yet</h3>
          <p className="text-[12px] text-[#A1A1AA] max-w-sm mx-auto">
            When an engineer transitions or leaves, run an offboarding audit to uncover undocumented incident fixes and runbook procedures.
          </p>
          <div className="pt-2">
            <Link
              to="/capture"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-[#FF6A00] to-[#EF2B2D] text-white text-[12px] font-bold shadow-md hover:scale-105 transition-all"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>Initiate First Gap Check</span>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const total = data.totalMined || (data.alreadyCapturedCount + data.gapsFound)
  const capturedPct = total > 0 ? Math.round((data.alreadyCapturedCount / total) * 100) : 0
  const gapsPct = 100 - capturedPct

  return (
    <section className={`rounded-2xl bg-[#141414] border border-[#27272A] p-6 sm:p-7 shadow-xl flex flex-col justify-between gap-5 ${className}`}>
      {/* Top Header */}
      <div className="flex items-start justify-between gap-3 pb-3 border-b border-[#27272A]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Sparkles className="w-4 h-4 text-[#FF6A00]" />
            <h3 className="text-[16px] font-bold text-white tracking-tight uppercase">
              Offboarding Gap-Check Impact
            </h3>
          </div>
          <p className="text-[12px] text-[#A1A1AA]">
            Proof of value: Tacit engineering knowledge rescued before teammate departure.
          </p>
        </div>

        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-[#22C55E]/15 text-[#22C55E] border border-[#22C55E]/30 shrink-0">
          PROVED VALUE
        </span>
      </div>

      {/* Main Impact Card */}
      <div className="rounded-xl bg-[#18181B] border border-[#27272A] p-4 sm:p-5 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#FF6A00] to-[#EF2B2D] text-white font-bold text-[14px] flex items-center justify-center shrink-0 shadow-md">
              PS
            </div>
            <div>
              <span className="text-[11px] font-mono text-[#71717A] uppercase">Latest Departing Engineer</span>
              <h4 className="text-[16px] font-bold text-white leading-tight">
                {data.employeeName}
              </h4>
            </div>
          </div>

          <div className="flex items-center gap-1.5 text-[11px] text-[#71717A] font-mono">
            <Clock className="w-3.5 h-3.5 text-[#FF6A00]" />
            <span>{data.ranAt}</span>
          </div>
        </div>

        {/* Big Numbers Grid */}
        <div className="grid grid-cols-2 gap-3 pt-1">
          <div className="p-3.5 rounded-lg bg-[#141414] border border-[#27272A] space-y-1">
            <span className="text-[11px] text-[#71717A] font-mono block">Daily Captured</span>
            <div className="flex items-baseline gap-2">
              <span className="text-[26px] font-black font-mono text-[#22C55E] leading-none">
                {data.alreadyCapturedCount}
              </span>
              <span className="text-[11px] text-[#A1A1AA]">entries ({capturedPct}%)</span>
            </div>
          </div>

          <div className="p-3.5 rounded-lg bg-[#1C1514] border border-[#FF6A00]/40 space-y-1 shadow-sm">
            <span className="text-[11px] text-[#FF6A00] font-mono font-bold block">Gaps Rescued</span>
            <div className="flex items-baseline gap-2">
              <span className="text-[26px] font-black font-mono text-[#FF6A00] leading-none">
                +{data.gapsFound}
              </span>
              <span className="text-[11px] text-[#A1A1AA]">unwritten ({gapsPct}%)</span>
            </div>
          </div>
        </div>

        {/* Visual Progress Ratio */}
        <div className="space-y-1.5">
          <div className="w-full h-2.5 rounded-full bg-[#27272A] overflow-hidden flex">
            <div
              style={{ width: `${capturedPct}%` }}
              className="h-full bg-[#22C55E]"
              title={`${data.alreadyCapturedCount} Captured Daily`}
            />
            <div
              style={{ width: `${gapsPct}%` }}
              className="h-full bg-[#FF6A00]"
              title={`${data.gapsFound} Rescued Gaps`}
            />
          </div>
          <div className="flex justify-between text-[10px] font-mono text-[#71717A]">
            <span className="text-[#22C55E]">✓ {data.alreadyCapturedCount} Already Protected</span>
            <span className="text-[#FF6A00]">✨ {data.gapsFound} Recovered from Lore</span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default GapCheckImpactWidget
