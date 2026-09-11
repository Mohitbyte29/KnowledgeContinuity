import React, { useState } from 'react'
import { Lock, ShieldCheck } from 'lucide-react'

interface PiiMaskedBadgeProps {
  count?: number
  className?: string
}

export const PiiMaskedBadge: React.FC<PiiMaskedBadgeProps> = ({ count = 2, className = '' }) => {
  const [showTooltip, setShowTooltip] = useState(false)

  return (
    <div 
      className="relative inline-flex items-center"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      <div 
        className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#18181B] border border-[#27272A] hover:border-[#FF6A00]/40 text-[11px] font-medium text-[#A1A1AA] hover:text-white cursor-help transition-all ${className}`}
      >
        <Lock className="w-3 h-3 text-[#FF6A00]" />
        <span>🔒 {count} items masked</span>
      </div>

      {showTooltip && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-2.5 rounded-xl bg-[#18181B] border border-[#27272A] shadow-2xl z-50 animate-slide-up text-left pointer-events-none">
          <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#FF6A00] mb-1">
            <ShieldCheck className="w-3.5 h-3.5 text-[#22C55E]" />
            <span>Automated PII Masking</span>
          </div>
          <p className="text-[11px] text-[#A1A1AA] leading-relaxed">
            Names and emails were automatically redacted before this reached you.
          </p>
          <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-[#27272A]" />
        </div>
      )}
    </div>
  )
}

export default PiiMaskedBadge
