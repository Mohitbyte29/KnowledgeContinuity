import React, { useEffect, useRef, useState } from 'react'

interface ProgressiveRevealQueueProps<T> {
  /** The full, already-complete array returned by the backend in one shot. */
  entries: T[]
  /** Stable id extractor, used for React keys. Defaults to `(entry) => entry.id`. */
  getId?: (entry: T) => string
  /** How each entry should render. Keeps this component agnostic to KnowledgeEntryCard vs. a raw source card. */
  renderEntry: (entry: T, index: number) => React.ReactNode
  /** Delay between each reveal, in ms. Defaults to 700 (matches the roadmap's ~700ms spec). */
  intervalMs?: number
  /** Called every time revealedCount changes, so a sibling like ExtractionCounter can stay in sync. */
  onProgress?: (revealedCount: number, total: number) => void
  /** Called once, when the last entry has been revealed. */
  onComplete?: () => void
  /** Whether to show a subtle "N more resolving..." row for entries not yet revealed. Defaults to true. */
  showPendingIndicator?: boolean
  className?: string
}

/**
 * NOTE ON RESETTING: this component reveals `entries` once, on mount, and does not
 * watch for `entries` changing later. If you start a new extraction batch, remount
 * this component with a fresh `key` prop (e.g. `key={batchId}`) rather than relying
 * on it to detect a new array — that keeps the reveal timer logic simple and avoids
 * stale-timeout bugs.
 */
function ProgressiveRevealQueue<T>({
  entries,
  getId,
  renderEntry,
  intervalMs = 700,
  onProgress,
  onComplete,
  showPendingIndicator = true,
  className = '',
}: ProgressiveRevealQueueProps<T>) {
  const [revealedCount, setRevealedCount] = useState(0)
  const hasCompletedRef = useRef(false)

  useEffect(() => {
    if (entries.length === 0) return

    if (revealedCount >= entries.length) {
      if (!hasCompletedRef.current) {
        hasCompletedRef.current = true
        onComplete?.()
      }
      return
    }

    const timer = setTimeout(() => {
      setRevealedCount((c) => c + 1)
    }, intervalMs)

    return () => clearTimeout(timer)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [revealedCount, entries.length, intervalMs])

  useEffect(() => {
    onProgress?.(revealedCount, entries.length)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [revealedCount])

  const idFor = (entry: T, index: number) => (getId ? getId(entry) : (entry as any).id ?? index)
  const pendingCount = entries.length - revealedCount

  return (
    <div className={`flex flex-col gap-4 ${className}`}>
      {entries.slice(0, revealedCount).map((entry, index) => (
        <RevealItem key={idFor(entry, index)} isNewest={index === revealedCount - 1}>
          {renderEntry(entry, index)}
        </RevealItem>
      ))}

      {showPendingIndicator && pendingCount > 0 && (
        <div className="flex items-center gap-2 text-[#8a99b5] font-code-md text-[11px] uppercase tracking-wider px-1">
          <span className="flex gap-0.5">
            <span className="w-1 h-1 rounded-full bg-[#8a99b5] animate-pulse [animation-delay:0ms]" />
            <span className="w-1 h-1 rounded-full bg-[#8a99b5] animate-pulse [animation-delay:150ms]" />
            <span className="w-1 h-1 rounded-full bg-[#8a99b5] animate-pulse [animation-delay:300ms]" />
          </span>
          {pendingCount} more resolving...
        </div>
      )}
    </div>
  )
}

/** Wraps a single revealed item, fading and sliding it in on mount. */
const RevealItem: React.FC<{ isNewest: boolean; children: React.ReactNode }> = ({
  isNewest,
  children,
}) => {
  const [visible, setVisible] = useState(!isNewest)

  useEffect(() => {
    if (!isNewest) return
    const raf = requestAnimationFrame(() => setVisible(true))
    return () => cancelAnimationFrame(raf)
  }, [isNewest])

  return (
    <div
      className={`transition-all duration-500 ease-out ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
      }`}
    >
      {children}
    </div>
  )
}

export default ProgressiveRevealQueue