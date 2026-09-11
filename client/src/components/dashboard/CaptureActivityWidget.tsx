import React from 'react'
import { motion } from 'motion/react'
import type { CaptureActivityItem } from '../../types'
import { TrendingUp, Calendar, Zap } from 'lucide-react'

interface CaptureActivityWidgetProps {
  data: CaptureActivityItem[]
  isLoading?: boolean
  className?: string
}

export const CaptureActivityWidget: React.FC<CaptureActivityWidgetProps> = ({
  data,
  isLoading = false,
  className = '',
}) => {
  if (isLoading) {
    return (
      <div className={`rounded-2xl bg-[#141414] border border-[#27272A] p-6 animate-pulse space-y-4 ${className}`}>
        <div className="h-5 w-44 bg-[#27272A] rounded" />
        <div className="h-32 bg-[#18181B] rounded-xl pt-2" />
      </div>
    )
  }

  if (!data || data.length === 0) {
    return (
      <div className={`rounded-2xl bg-[#141414] border border-dashed border-[#27272A] p-8 text-center flex flex-col items-center justify-center space-y-2 ${className}`}>
        <Calendar className="w-8 h-8 text-[#71717A]" />
        <h3 className="text-[14px] font-bold text-white">No Capture Activity Recorded</h3>
        <p className="text-[12px] text-[#A1A1AA]">Run daily batch captures to see the trend.</p>
      </div>
    )
  }

  const maxCount = Math.max(...data.map((d) => d.count), 1)
  const totalCapturedInPeriod = data.reduce((acc, curr) => acc + curr.count, 0)
  const avgPerDay = Math.round((totalCapturedInPeriod / data.length) * 10) / 10

  return (
    <section className={`rounded-2xl bg-[#141414] border border-[#27272A] p-6 sm:p-7 shadow-xl flex flex-col justify-between gap-5 ${className}`}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#27272A]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <TrendingUp className="w-4 h-4 text-[#FF6A00]" />
            <h3 className="text-[16px] font-bold text-white tracking-tight uppercase">
              Capture Activity Over Time
            </h3>
          </div>
          <p className="text-[12px] text-[#A1A1AA]">
            Proves continuous daily adoption vs. an artificial one-time dump.
          </p>
        </div>

        <div className="flex items-center gap-2 text-[12px] font-mono text-[#A1A1AA]">
          <span className="w-2 h-2 rounded-full bg-[#22C55E]" />
          <span>Avg: <strong className="text-white">{avgPerDay} entries/day</strong></span>
        </div>
      </div>

      {/* Activity Histogram Bars */}
      <div className="space-y-2 pt-2">
        <div className="h-36 flex items-end justify-between gap-2 sm:gap-3 px-1 pb-1">
          {data.map((item, idx) => {
            const heightPct = Math.max(12, Math.round((item.count / maxCount) * 100))
            const isToday = idx === data.length - 1

            return (
              <div key={idx} className="flex-1 flex flex-col items-center gap-2 group h-full justify-end">
                {/* Tooltip Count */}
                <span className="text-[10px] font-mono font-bold text-[#A1A1AA] group-hover:text-[#FF6A00] transition-colors opacity-80 group-hover:opacity-100">
                  {item.count}
                </span>

                {/* Bar */}
                <div className="w-full max-w-[28px] h-full flex items-end bg-[#18181B] rounded-lg p-0.5 overflow-hidden">
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${heightPct}%` }}
                    transition={{ duration: 0.6, delay: idx * 0.05 }}
                    className={`w-full rounded-md transition-colors ${
                      isToday
                        ? 'bg-gradient-to-t from-[#FF6A00] to-[#EF2B2D] shadow-lg shadow-[#FF6A00]/25'
                        : 'bg-[#27272A] group-hover:bg-[#FF6A00]'
                    }`}
                  />
                </div>

                {/* Day Label */}
                <span className="text-[10px] font-mono text-[#71717A] group-hover:text-white transition-colors truncate">
                  {item.date}
                </span>
              </div>
            )
          })}
        </div>

        {/* Footer Habit Note */}
        <div className="pt-2 border-t border-[#27272A]/70 flex items-center justify-between text-[11px] text-[#71717A]">
          <span className="flex items-center gap-1 text-[#22C55E]">
            <Zap className="w-3 h-3 text-[#FF6A00]" />
            <span>Active 10-day streak</span>
          </span>
          <span>{totalCapturedInPeriod} total captured entries</span>
        </div>
      </div>
    </section>
  )
}

export default CaptureActivityWidget
