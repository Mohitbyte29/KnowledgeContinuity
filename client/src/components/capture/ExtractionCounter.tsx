import { CheckCircle2, Loader2, Cpu } from 'lucide-react'

interface ExtractionCounterProps {
  currentIndex: number
  totalItems: number
  isComplete: boolean
  isExtracting: boolean
  className?: string
}

export const ExtractionCounter: React.FC<ExtractionCounterProps> = ({
  currentIndex,
  totalItems,
  isComplete,
  isExtracting,
  className = '',
}) => {
  if (!isExtracting && !isComplete) return null

  const progressPercent = totalItems > 0 
    ? Math.min(100, Math.round(((isComplete ? totalItems : currentIndex) / totalItems) * 100)) 
    : 0

  return (
    <div className={`w-full rounded-2xl bg-[#141414] border border-[#27272A] p-4 shadow-xl animate-fade-in ${className}`}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-2.5">
        <div className="flex items-center gap-3">
          {isComplete ? (
            <div className="w-8 h-8 rounded-xl bg-[#22C55E]/15 border border-[#22C55E]/30 flex items-center justify-center text-[#22C55E]">
              <CheckCircle2 className="w-5 h-5" />
            </div>
          ) : (
            <div className="w-8 h-8 rounded-xl bg-[#FF6A00]/15 border border-[#FF6A00]/30 flex items-center justify-center text-[#FF6A00] animate-pulse">
              <Cpu className="w-5 h-5" />
            </div>
          )}

          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="text-[14px] font-semibold text-white">
                {isComplete
                  ? `Extraction complete — ${totalItems} of ${totalItems} items processed`
                  : `Extracting entry ${currentIndex} of ${totalItems}...`}
              </span>
              {!isComplete && (
                <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-[#FF6A00] bg-[#FF6A00]/10 px-2 py-0.5 rounded-full border border-[#FF6A00]/30">
                  <Loader2 className="w-3 h-3 animate-spin" />
                  Live Stream
                </span>
              )}
            </div>
            <span className="text-[12px] text-[#A1A1AA]">
              {isComplete
                ? 'AI synthesis and PII sanitization finished. Ready for review and commit.'
                : 'Synthesizing problem statements, recovery steps, and unwritten runbook lore...'}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 self-end sm:self-auto">
          <span className="font-mono text-[13px] font-bold text-[#FF6A00]">
            {progressPercent}%
          </span>
        </div>
      </div>

      {/* Animated Neon Progress Track */}
      <div className="w-full h-2 rounded-full bg-[#1F1F23] overflow-hidden p-0.5">
        <div
          className={`h-full rounded-full transition-all duration-500 ${
            isComplete
              ? 'bg-[#22C55E]'
              : 'bg-gradient-to-r from-[#FF6A00] to-[#EF2B2D]'
          }`}
          style={{ width: `${progressPercent}%` }}
        />
      </div>
    </div>
  )
}

export default ExtractionCounter