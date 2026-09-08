import React from 'react'

export interface RelatedExpert {
  name: string
  role?: string
  /** Tags shared with the matched entry, e.g. ['postgres', 'pooling'] — shown in the hover tooltip. */
  tagsMatched?: string[]
}

interface RelatedExpertsTagProps {
  experts: RelatedExpert[]
  /** Label shown before the chips. Defaults to "People who might also help:". */
  label?: string
  /** Called when an expert chip is clicked, e.g. to open a contact/profile action. Omit to render non-interactive chips. */
  onExpertClick?: (expert: RelatedExpert) => void
  className?: string
}

const initialsFor = (name: string) =>
  name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('')

const ExpertChip: React.FC<{
  expert: RelatedExpert
  onClick?: (expert: RelatedExpert) => void
}> = ({ expert, onClick }) => {
  const tooltipParts = [expert.role, expert.tagsMatched?.length ? `#${expert.tagsMatched.join(' #')}` : null]
    .filter(Boolean)
    .join(' · ')

  const content = (
    <>
      <span className="w-5 h-5 rounded-full bg-[#223148] text-white flex items-center justify-center font-code-md text-[9px] font-bold shrink-0">
        {initialsFor(expert.name)}
      </span>
      <span className="font-body-sm text-[12.5px] text-[#0c1c32] font-medium">{expert.name}</span>
    </>
  )

  const sharedClasses =
    'group relative inline-flex items-center gap-1.5 pl-1 pr-2.5 py-1 rounded-full border border-[#223148]/12 bg-[#f0e7dd]/50'

  if (!onClick) {
    return (
      <span className={sharedClasses} title={tooltipParts || undefined}>
        {content}
      </span>
    )
  }

  return (
    <button
      type="button"
      onClick={() => onClick(expert)}
      className={`${sharedClasses} hover:bg-[#f0e7dd] hover:border-[#223148]/25 transition-colors cursor-pointer`}
      title={tooltipParts || undefined}
    >
      {content}
    </button>
  )
}

const RelatedExpertsTag: React.FC<RelatedExpertsTagProps> = ({
  experts,
  label = 'People who might also help:',
  onExpertClick,
  className = '',
}) => {
  if (!experts || experts.length === 0) return null

  return (
    <div className={`flex flex-wrap items-center gap-2 ${className}`}>
      <span className="font-code-md text-[10px] uppercase tracking-widest text-[#8a99b5] font-semibold shrink-0">
        {label}
      </span>
      {experts.map((expert) => (
        <ExpertChip key={expert.name} expert={expert} onClick={onExpertClick} />
      ))}
    </div>
  )
}

export default RelatedExpertsTag