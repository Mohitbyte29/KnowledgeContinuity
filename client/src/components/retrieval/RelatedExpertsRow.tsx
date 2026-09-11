import React from 'react'
import type { Expert } from '../../types'
import { Users } from 'lucide-react'

interface RelatedExpertsRowProps {
  experts: Expert[]
  className?: string
}

export const RelatedExpertsRow: React.FC<RelatedExpertsRowProps> = ({
  experts,
  className = '',
}) => {
  if (!experts || experts.length === 0) return null

  return (
    <div className={`flex flex-col sm:flex-row sm:items-center gap-2 pt-2 text-[12px] ${className}`}>
      <div className="flex items-center gap-1.5 text-[#71717A] font-medium shrink-0">
        <Users className="w-3.5 h-3.5 text-[#FF6A00]" />
        <span>People who might also help:</span>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        {experts.map((exp) => (
          <button
            key={exp.id}
            type="button"
            title={`${exp.role} — ${exp.reason || 'Subject Matter Expert'}`}
            className="group inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-[#18181B] hover:bg-[#222226] border border-[#27272A] hover:border-[#FF6A00]/40 transition-all text-left"
          >
            <div className="w-4 h-4 rounded-full bg-gradient-to-tr from-[#FF6A00] to-[#EF2B2D] text-white text-[9px] font-bold flex items-center justify-center shrink-0">
              {exp.initials}
            </div>
            <span className="text-[12px] font-semibold text-white group-hover:text-[#FF6A00] transition-colors">
              {exp.name}
            </span>
            {exp.badge && (
              <span className="text-[10px] text-[#71717A] font-mono border-l border-[#27272A] pl-1.5 ml-0.5">
                {exp.badge}
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  )
}

export default RelatedExpertsRow
