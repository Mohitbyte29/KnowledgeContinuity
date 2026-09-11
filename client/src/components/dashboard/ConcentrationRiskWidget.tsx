import React from 'react'
import { motion } from 'motion/react'
import type { ConcentrationRiskItem } from '../../types'
import { AlertTriangle, ShieldAlert, ShieldCheck } from 'lucide-react'

interface ConcentrationRiskWidgetProps {
  data: ConcentrationRiskItem[]
  isLoading?: boolean
  className?: string
}

export const ConcentrationRiskWidget: React.FC<ConcentrationRiskWidgetProps> = ({
  data,
  isLoading = false,
  className = '',
}) => {
  if (isLoading) {
    return (
      <div className={`rounded-2xl bg-[#141414] border border-[#27272A] p-6 animate-pulse space-y-4 ${className}`}>
        <div className="h-6 w-56 bg-[#27272A] rounded-lg" />
        <div className="h-4 w-96 bg-[#1F1F23] rounded-lg" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
          <div className="h-32 bg-[#18181B] rounded-xl" />
          <div className="h-32 bg-[#18181B] rounded-xl" />
        </div>
      </div>
    )
  }

  if (!data || data.length === 0) {
    return (
      <div className={`rounded-2xl bg-[#141414] border border-dashed border-[#27272A] p-10 text-center flex flex-col items-center justify-center space-y-3 ${className}`}>
        <ShieldCheck className="w-10 h-10 text-[#22C55E]" />
        <h3 className="text-[17px] font-bold text-white">No Concentration Risk Detected</h3>
        <p className="text-[13px] text-[#A1A1AA] max-w-md">
          Knowledge is evenly distributed across your engineering repositories.
        </p>
      </div>
    )
  }

  const highRiskCount = data.filter((item) => item.riskLevel === 'high').length

  return (
    <section className={`rounded-2xl bg-[#141414] border border-[#27272A] p-6 sm:p-7 shadow-2xl relative overflow-hidden ${className}`}>
      {/* Background Accent Glow for High Risk */}
      {highRiskCount > 0 && (
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#EF2B2D]/10 rounded-full blur-[100px] pointer-events-none" />
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 mb-6 border-b border-[#27272A]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-[#EF2B2D] animate-pulse" />
            <h2 className="text-[18px] sm:text-[20px] font-black text-white tracking-tight uppercase">
              Attrition &amp; Concentration Risk
            </h2>
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold bg-[#EF2B2D]/15 text-[#EF2B2D] border border-[#EF2B2D]/30">
              {highRiskCount} HIGH RISK {highRiskCount === 1 ? 'DOMAIN' : 'DOMAINS'}
            </span>
          </div>
          <p className="text-[13px] text-[#A1A1AA] leading-relaxed">
            Measures key-person dependency: what percentage of institutional memory is concentrated in a single engineer.
          </p>
        </div>

        <div className="text-left sm:text-right shrink-0">
          <span className="text-[11px] font-mono text-[#71717A] block">Threshold Warning</span>
          <span className="text-[12px] font-mono font-bold text-[#EF2B2D]">&gt;= 70% Single Author</span>
        </div>
      </div>

      {/* Risk Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {data.map((item, idx) => {
          const isHigh = item.riskLevel === 'high'
          const isMedium = item.riskLevel === 'medium'

          return (
            <motion.div
              key={idx}
              whileHover={{ y: -2 }}
              className={`rounded-xl p-5 border transition-all duration-300 relative flex flex-col justify-between gap-4 ${
                isHigh
                  ? 'bg-[#181112] border-[#EF2B2D]/60 shadow-lg shadow-[#EF2B2D]/10'
                  : isMedium
                  ? 'bg-[#181512] border-[#FF6A00]/40'
                  : 'bg-[#161618] border-[#27272A]'
              }`}
            >
              {/* Top Row: Project Title & Risk Badge */}
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-[15px] font-bold text-white leading-snug">
                    {item.project}
                  </h3>
                  <span className="text-[11px] text-[#71717A] font-mono">
                    {item.totalEntries} total knowledge entries
                  </span>
                </div>

                <span
                  className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[10px] font-mono font-bold uppercase tracking-wider border shrink-0 ${
                    isHigh
                      ? 'bg-[#EF2B2D]/20 text-[#EF2B2D] border-[#EF2B2D]/40'
                      : isMedium
                      ? 'bg-[#FF6A00]/20 text-[#FF6A00] border-[#FF6A00]/40'
                      : 'bg-[#22C55E]/15 text-[#22C55E] border-[#22C55E]/30'
                  }`}
                >
                  {isHigh ? <AlertTriangle className="w-3 h-3" /> : isMedium ? <ShieldAlert className="w-3 h-3" /> : <ShieldCheck className="w-3 h-3" />}
                  <span>{item.riskLevel.toUpperCase()} RISK</span>
                </span>
              </div>

              {/* Core Sentence Signalling (Immediate Legibility) */}
              <div className="p-3 rounded-lg bg-[#0E0E10] border border-[#27272A]/70 flex items-center justify-between gap-4">
                <div className="space-y-0.5">
                  <span className="text-[11px] text-[#71717A] uppercase font-bold tracking-wider block">
                    Sole Author Concentration
                  </span>
                  <p className="text-[13px] font-medium text-white">
                    <strong className={isHigh ? 'text-[#EF2B2D]' : isMedium ? 'text-[#FF6A00]' : 'text-white'}>
                      {item.topAuthorShare}%
                    </strong>{' '}
                    held by{' '}
                    <strong className="text-[#F4F4F5]">{item.topAuthor}</strong>
                  </p>
                </div>

                {/* Big Loud Metric */}
                <div className="text-right shrink-0">
                  <span
                    className={`text-[28px] sm:text-[32px] font-black font-mono leading-none tracking-tight ${
                      isHigh ? 'text-[#EF2B2D]' : isMedium ? 'text-[#FF6A00]' : 'text-[#22C55E]'
                    }`}
                  >
                    {item.topAuthorShare}%
                  </span>
                </div>
              </div>

              {/* Progress Track */}
              <div className="space-y-1.5">
                <div className="w-full h-2 rounded-full bg-[#27272A] overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${item.topAuthorShare}%` }}
                    transition={{ duration: 0.8, delay: idx * 0.1 }}
                    className={`h-full rounded-full ${
                      isHigh
                        ? 'bg-gradient-to-r from-[#FF6A00] to-[#EF2B2D]'
                        : isMedium
                        ? 'bg-[#FF6A00]'
                        : 'bg-[#22C55E]'
                    }`}
                  />
                </div>
                <div className="flex justify-between text-[10px] text-[#71717A] font-mono">
                  <span>{item.topAuthor}</span>
                  <span>Rest of Team ({100 - item.topAuthorShare}%)</span>
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}

export default ConcentrationRiskWidget
