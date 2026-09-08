import React from 'react'
import type { SourceCitation } from './ChatWindow'

interface SourceCitationCardProps extends SourceCitation {
  className?: string
}

const matchColor = (pct?: number) => {
  if (pct === undefined) return null
  if (pct >= 85) return '#2D5A3D'
  if (pct >= 60) return '#475f86'
  return '#B85C38'
}

const SourceCitationCard: React.FC<SourceCitationCardProps> = ({
  title,
  sourceLink,
  author,
  date,
  matchPct,
  className = '',
}) => {
  const color = matchColor(matchPct)
  const formattedDate = (() => {
    const d = new Date(date)
    return isNaN(d.getTime())
      ? date
      : d.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })
  })()

  return (
    <a
      href={sourceLink}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center gap-3 rounded-md border border-[#223148]/10 bg-[#fbf7f2] px-3 py-2.5 hover:border-[#223148]/25 hover:bg-white transition-colors"
    >
      <span className="w-7 h-7 rounded-md bg-[#223148]/8 flex items-center justify-center shrink-0">
        <span className="material-symbols-outlined text-[15px] text-[#223148]">description</span>
      </span>

      <div className="flex-1 min-w-0 flex flex-col gap-0.5">
        <p className="font-body-sm text-[13px] font-medium text-[#0c1c32] truncate">{title}</p>
        <p className="font-code-md text-[11px] text-[#8a99b5]">
          <span className="text-[#475f86] font-medium">{author}</span> · {formattedDate}
        </p>
      </div>

      {matchPct !== undefined && color && (
        <span
          className="font-code-md text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0"
          style={{ color, backgroundColor: `${color}1A` }}
        >
          {matchPct}%
        </span>
      )}

      <span className="material-symbols-outlined text-[15px] text-[#8a99b5] group-hover:text-[#223148] group-hover:translate-x-0.5 transition-all shrink-0">
        arrow_outward
      </span>
    </a>
  )
}

export default SourceCitationCard