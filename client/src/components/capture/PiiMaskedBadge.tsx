import React, { useState } from 'react'

interface PiiMaskedBadgeProps {
  /** Number of items/fields that were masked. If 0 or undefined, the badge renders nothing. */
  count?: number
  /** Optional override for the tooltip text. Defaults to a generic explanation. */
  tooltip?: string
  className?: string
}

const PiiMaskedBadge: React.FC<PiiMaskedBadgeProps> = ({
  count,
  tooltip,
  className = ''
}) => {
  const [showTooltip, setShowTooltip] = useState(false)

  if (!count || count <= 0) return null

  const defaultTooltip = `${count} ${
    count === 1 ? 'item was' : 'items were'
  } automatically masked before this reached Claude — names, emails, and tokens are redacted, not stored.`

  return (
    <span
      className={`relative inline-flex ${className}`}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
      onFocus={() => setShowTooltip(true)}
      onBlur={() => setShowTooltip(false)}
    >
      <button
        type="button"
        className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full border border-[#B85C38]/25 bg-[#B85C38]/8 text-[#B85C38] font-code-md text-[10px] font-semibold tracking-wide uppercase cursor-help"
        aria-describedby="pii-masked-tooltip"
      >
        <span className="material-symbols-outlined text-[12px]">shield</span>
        {count} masked
      </button>

      {showTooltip && (
        <span
          id="pii-masked-tooltip"
          role="tooltip"
          className="absolute z-20 bottom-full left-1/2 -translate-x-1/2 mb-2 w-56 rounded-md bg-[#0c1c32] text-[#fdfaf7] text-[11px] leading-relaxed font-body-md px-3 py-2 shadow-[0_8px_20px_rgba(12,28,50,0.3)] pointer-events-none"
        >
          {tooltip || defaultTooltip}
          <span className="absolute top-full left-1/2 -translate-x-1/2 w-2 h-2 bg-[#0c1c32] rotate-45 -mt-1" />
        </span>
      )}
    </span>
  )
}

export default PiiMaskedBadge