import React from 'react'

interface ExtractionCounterProps {
  /** How many entries have been revealed so far. */
  current: number
  /** Total number of entries being extracted. */
  total: number
  /** Text shown before extraction starts (current === 0). Defaults to "Analyzing your work history...". */
  idleLabel?: string
  /** Text shown once current >= total. Defaults to "Extraction complete". */
  completeLabel?: string
  /** Extra classes for the wrapping element. */
  className?: string
}

const ExtractionCounter: React.FC<ExtractionCounterProps> = ({
  current,
  total,
  idleLabel = 'Analyzing your work history...',
  completeLabel = 'Extraction complete',
  className = '',
}) => {
  const clampedCurrent = Math.min(current, total)
  const isComplete = total > 0 && clampedCurrent >= total
  const hasStarted = clampedCurrent > 0
  const progressPct = total > 0 ? (clampedCurrent / total) * 100 : 0

  const label = !hasStarted
    ? idleLabel
    : isComplete
    ? completeLabel
    : `Extracting entry ${clampedCurrent} of ${total}...`

  return (
    <div
      role="status"
      aria-live="polite"
      className={`flex items-center gap-3 rounded-lg border border-[#223148]/12 bg-white px-4 py-3 ${className}`}
    >
      <span
        className={`shrink-0 w-5 h-5 rounded-full flex items-center justify-center ${
          isComplete ? 'bg-[#2D5A3D]/10' : 'bg-[#223148]/8'
        }`}
      >
        <span
          className={`material-symbols-outlined text-[15px] ${
            isComplete ? 'text-[#2D5A3D]' : 'text-[#223148] animate-spin'
          }`}
        >
          {isComplete ? 'check_circle' : 'progress_activity'}
        </span>
      </span>

      <div className="flex-1 flex flex-col gap-1.5">
        <div className="flex items-center justify-between gap-2">
          <span
            className={`font-body-md text-[13px] ${
              isComplete ? 'text-[#2D5A3D] font-semibold' : 'text-[#44474d]'
            }`}
          >
            {label}
          </span>
          {hasStarted && !isComplete && (
            <span className="font-code-md text-[11px] text-[#8a99b5] tracking-wide">
              {clampedCurrent}/{total}
            </span>
          )}
        </div>

        <div className="h-1 w-full rounded-full bg-[#223148]/10 overflow-hidden">
          <div
            className={`h-full rounded-full transition-[width] duration-500 ease-out ${
              isComplete ? 'bg-[#2D5A3D]' : 'bg-[#223148]'
            }`}
            style={{ width: `${progressPct}%` }}
          />
        </div>
      </div>
    </div>
  )
}

export default ExtractionCounter