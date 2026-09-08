import React from 'react'

type ExtractButtonVariant = 'primary' | 'ghost'

interface ExtractButtonProps {
  /** Called when the button is clicked. Can be async — the button handles its own loading state via `isLoading`. */
  onClick: () => void
  /** Whether an extraction request is currently in flight. Disables the button and swaps the icon for a spinner. */
  isLoading?: boolean
  /** Disables the button regardless of loading state (e.g. no source items to extract yet). */
  disabled?: boolean
  /** Button text. Defaults to "Extract Knowledge". */
  label?: string
  /** Text shown while isLoading is true. Defaults to "Extracting...". */
  loadingLabel?: string
  /** Optional count badge, e.g. the number of source items about to be processed. */
  itemCount?: number
  /** Visual style. 'primary' = solid navy button, 'ghost' = outlined, for secondary placements. */
  variant?: ExtractButtonVariant
  /** Extra classes for the wrapping button element. */
  className?: string
}

const ExtractButton: React.FC<ExtractButtonProps> = ({
  onClick,
  isLoading = false,
  disabled = false,
  label = 'Extract Knowledge',
  loadingLabel = 'Extracting...',
  itemCount,
  variant = 'primary',
  className = '',
}) => {
  const isDisabled = disabled || isLoading

  const baseClasses =
    'group inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-label-md text-[12px] uppercase tracking-wider font-bold transition-all'

  const variantClasses =
    variant === 'primary'
      ? isDisabled
        ? 'bg-[#223148]/25 text-[#223148]/50 cursor-not-allowed'
        : 'bg-[#223148] hover:bg-[#0c1c32] text-white shadow-sm hover:shadow-md cursor-pointer'
      : isDisabled
      ? 'border border-[#223148]/20 text-[#223148]/40 cursor-not-allowed'
      : 'border border-[#223148]/40 text-[#223148] hover:bg-[#223148]/5 cursor-pointer'

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={isDisabled}
      aria-busy={isLoading}
      className={`${baseClasses} ${variantClasses} ${className}`}
    >
      <span
        className={`material-symbols-outlined text-[18px] ${
          isLoading ? 'animate-spin' : 'group-hover:scale-110 transition-transform'
        }`}
      >
        {isLoading ? 'progress_activity' : 'auto_awesome'}
      </span>
      <span>{isLoading ? loadingLabel : label}</span>
      {!isLoading && typeof itemCount === 'number' && (
        <span
          className={`ml-1 inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 rounded-full text-[10px] font-bold ${
            variant === 'primary'
              ? 'bg-white/15 text-white'
              : 'bg-[#223148]/10 text-[#223148]'
          }`}
        >
          {itemCount}
        </span>
      )}
    </button>
  )
}

export default ExtractButton