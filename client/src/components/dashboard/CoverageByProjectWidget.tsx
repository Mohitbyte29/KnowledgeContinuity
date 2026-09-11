import React from 'react'
import { motion } from 'motion/react'
import type { CoverageByProjectItem } from '../../types'
import { FolderGit2, Layers, Database } from 'lucide-react'

interface CoverageByProjectWidgetProps {
  data: CoverageByProjectItem[]
  isLoading?: boolean
  className?: string
}

export const CoverageByProjectWidget: React.FC<CoverageByProjectWidgetProps> = ({
  data,
  isLoading = false,
  className = '',
}) => {
  if (isLoading) {
    return (
      <div className={`rounded-2xl bg-[#141414] border border-[#27272A] p-6 animate-pulse space-y-4 ${className}`}>
        <div className="h-5 w-44 bg-[#27272A] rounded" />
        <div className="space-y-3 pt-2">
          <div className="h-8 bg-[#18181B] rounded-lg" />
          <div className="h-8 bg-[#18181B] rounded-lg" />
          <div className="h-8 bg-[#18181B] rounded-lg" />
        </div>
      </div>
    )
  }

  if (!data || data.length === 0) {
    return (
      <div className={`rounded-2xl bg-[#141414] border border-dashed border-[#27272A] p-8 text-center flex flex-col items-center justify-center space-y-2 ${className}`}>
        <Database className="w-8 h-8 text-[#71717A]" />
        <h3 className="text-[14px] font-bold text-white">No Project Repositories Indexed</h3>
        <p className="text-[12px] text-[#A1A1AA]">Connect services or save entries to see coverage.</p>
      </div>
    )
  }

  const maxEntries = Math.max(...data.map((p) => p.entryCount), 1)

  return (
    <section className={`rounded-2xl bg-[#141414] border border-[#27272A] p-6 sm:p-7 shadow-xl flex flex-col justify-between gap-5 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-[#27272A]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Layers className="w-4 h-4 text-[#3B82F6]" />
            <h3 className="text-[16px] font-bold text-white tracking-tight uppercase">
              Coverage by Project
            </h3>
          </div>
          <p className="text-[12px] text-[#A1A1AA]">
            Total codified runbook and troubleshooting entries across systems.
          </p>
        </div>

        <span className="text-[11px] font-mono text-[#71717A]">
          {data.reduce((acc, curr) => acc + curr.entryCount, 0)} Total
        </span>
      </div>

      {/* Project Bars List */}
      <div className="space-y-3.5">
        {data.map((item, idx) => {
          const pct = Math.round((item.entryCount / maxEntries) * 100)

          return (
            <div key={idx} className="space-y-1.5">
              <div className="flex items-center justify-between text-[13px]">
                <div className="flex items-center gap-2">
                  <FolderGit2 className="w-3.5 h-3.5 text-[#3B82F6]" />
                  <span className="font-semibold text-white truncate max-w-[200px] sm:max-w-[260px]">
                    {item.project}
                  </span>
                </div>

                <span className="font-mono font-bold text-white">
                  {item.entryCount} <span className="text-[11px] font-normal text-[#71717A]">entries</span>
                </span>
              </div>

              {/* Progress Bar */}
              <div className="w-full h-2 rounded-full bg-[#1F1F23] overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${pct}%` }}
                  transition={{ duration: 0.6, delay: idx * 0.08 }}
                  className="h-full rounded-full bg-gradient-to-r from-[#3B82F6] to-[#60A5FA]"
                />
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

export default CoverageByProjectWidget
