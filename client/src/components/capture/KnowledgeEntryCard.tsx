import React, { useState } from 'react'

export type EntryStatus = 'pending' | 'approved'

export interface KnowledgeEntry {
  id: string
  problem: string
  symptom: string
  solution: string
  context: string
  tags: string[]
  status: EntryStatus
  /** e.g. "Derived from TKT-4521" or "Derived from Slack thread" — shown under the problem title. */
  sourceLabel?: string
}

interface KnowledgeEntryCardProps {
  entry: KnowledgeEntry
  /** Called when the user approves the entry (from either view or edit mode). */
  onApprove: (id: string) => void
  /** Called when the user discards/deletes the entry entirely. */
  onDiscard: (id: string) => void
  /** Called when the user saves field edits without approving. Receives only the changed fields. */
  onUpdate: (id: string, updatedFields: Partial<Omit<KnowledgeEntry, 'id' | 'status'>>) => void
  /** Called when an approved entry is un-approved (moved back to pending). Optional — omit to hide the undo action. */
  onUnapprove?: (id: string) => void
  /** Optional slot for a badge like PiiMaskedBadge, rendered next to the source label. */
  headerExtra?: React.ReactNode
  className?: string
}

const FIELD_META: {
  key: 'symptom' | 'solution' | 'context'
  label: string
  rows: number
  emphasize?: boolean
}[] = [
  { key: 'symptom', label: 'Symptom', rows: 3 },
  { key: 'solution', label: 'Solution', rows: 3, emphasize: true },
  { key: 'context', label: 'Context', rows: 2 },
]

const KnowledgeEntryCard: React.FC<KnowledgeEntryCardProps> = ({
  entry,
  onApprove,
  onDiscard,
  onUpdate,
  onUnapprove,
  headerExtra,
  className = '',
}) => {
  const [isEditing, setIsEditing] = useState(false)
  const [draft, setDraft] = useState({
    problem: entry.problem,
    symptom: entry.symptom,
    solution: entry.solution,
    context: entry.context,
    tagsInput: entry.tags.join(', '),
  })

  const startEditing = () => {
    setDraft({
      problem: entry.problem,
      symptom: entry.symptom,
      solution: entry.solution,
      context: entry.context,
      tagsInput: entry.tags.join(', '),
    })
    setIsEditing(true)
  }

  const saveEditing = () => {
    onUpdate(entry.id, {
      problem: draft.problem,
      symptom: draft.symptom,
      solution: draft.solution,
      context: draft.context,
      tags: draft.tagsInput
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean),
    })
    setIsEditing(false)
  }

  const cancelEditing = () => setIsEditing(false)

  // --- Approved: collapsed summary row ---
  if (entry.status === 'approved') {
    return (
      <div
        className={`rounded-lg border border-[#2D5A3D]/30 bg-[#2D5A3D]/5 px-5 py-4 flex items-center justify-between gap-4 ${className}`}
      >
        <div className="flex items-center gap-2.5 text-[#2D5A3D] font-body-md text-[14px] min-w-0">
          <span className="material-symbols-outlined text-[18px] shrink-0">check_circle</span>
          <span className="font-semibold shrink-0">Approved for the knowledge base</span>
          <span className="text-[#0c1c32]/70 font-normal truncate">
            — {entry.problem || 'Untitled entry'}
          </span>
        </div>
        <div className="flex items-center gap-1 shrink-0">
          {onUnapprove && (
            <button
              type="button"
              onClick={() => onUnapprove(entry.id)}
              title="Undo approval"
              className="p-1.5 rounded-md text-[#2D5A3D]/70 hover:text-[#2D5A3D] hover:bg-[#2D5A3D]/10 transition-colors"
            >
              <span className="material-symbols-outlined text-[17px]">undo</span>
            </button>
          )}
          <button
            type="button"
            onClick={() => onDiscard(entry.id)}
            title="Delete entry"
            className="p-1.5 rounded-md text-[#8a99b5] hover:text-[#B85C38] hover:bg-[#B85C38]/10 transition-colors"
          >
            <span className="material-symbols-outlined text-[17px]">delete</span>
          </button>
        </div>
      </div>
    )
  }

  // --- Pending: full editable card ---
  return (
    <div
      className={`relative bg-white rounded-lg border border-[#223148]/12 shadow-[0_3px_12px_rgba(34,49,72,0.05)] p-5 md:p-6 flex flex-col gap-4 ${className}`}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0 flex flex-col gap-4">
          {/* Problem + source label */}
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center gap-2">
              <span className="font-code-md text-[10px] uppercase tracking-widest text-[#505f78] font-semibold">
                Problem
              </span>
              {entry.sourceLabel && (
                <span className="font-code-md text-[10px] text-[#8a99b5]">
                  · {entry.sourceLabel}
                </span>
              )}
              {headerExtra}
            </div>
            {isEditing ? (
              <input
                className="w-full bg-[#fbf7f2] border border-[#223148]/25 focus:border-[#223148] rounded-md px-3 py-2 text-[15px] font-body-md text-[#0c1c32] outline-none"
                value={draft.problem}
                onChange={(e) => setDraft((d) => ({ ...d, problem: e.target.value }))}
              />
            ) : (
              <p className="font-display text-[18px] font-semibold text-[#0c1c32]">
                {entry.problem || (
                  <span className="text-[#a3a8b3] font-normal italic">Untitled problem</span>
                )}
              </p>
            )}
          </div>

          {/* Symptom / Solution */}
          <div className="grid md:grid-cols-2 gap-4">
            {FIELD_META.filter((f) => f.key !== 'context').map((f) => (
              <div key={f.key} className="flex flex-col gap-1.5">
                <span className="font-code-md text-[10px] uppercase tracking-widest text-[#505f78] font-semibold">
                  {f.label}
                </span>
                {isEditing ? (
                  <textarea
                    className={`w-full rounded-md p-3 text-[14px] font-body-md text-[#1f1b15] outline-none resize-y ${
                      f.emphasize
                        ? 'bg-white border border-[#bad3ff] focus:border-[#223148] ring-2 ring-[#bad3ff]/30'
                        : 'bg-[#fbf7f2] border border-[#223148]/25 focus:border-[#223148]'
                    }`}
                    rows={f.rows}
                    value={draft[f.key]}
                    onChange={(e) => setDraft((d) => ({ ...d, [f.key]: e.target.value }))}
                  />
                ) : (
                  <p className="font-body-md text-[14px] leading-relaxed text-[#1f1b15]">
                    {entry[f.key]}
                  </p>
                )}
              </div>
            ))}
          </div>

          {/* Context */}
          <div className="flex flex-col gap-1.5">
            <span className="font-code-md text-[10px] uppercase tracking-widest text-[#505f78] font-semibold">
              Context
            </span>
            {isEditing ? (
              <textarea
                className="w-full bg-[#fbf7f2] border border-[#223148]/25 focus:border-[#223148] rounded-md p-3 text-[14px] font-body-md text-[#1f1b15] outline-none resize-y"
                rows={2}
                value={draft.context}
                onChange={(e) => setDraft((d) => ({ ...d, context: e.target.value }))}
              />
            ) : (
              <p className="font-body-md text-[14px] leading-relaxed text-[#1f1b15]">
                {entry.context}
              </p>
            )}
          </div>

          {/* Tags */}
          <div className="flex flex-col gap-1.5">
            <span className="font-code-md text-[10px] uppercase tracking-widest text-[#505f78] font-semibold">
              Tags
            </span>
            {isEditing ? (
              <input
                className="w-full bg-[#fbf7f2] border border-[#223148]/25 focus:border-[#223148] rounded-md px-3 py-2 text-[13px] font-code-md text-[#0c1c32] outline-none"
                value={draft.tagsInput}
                onChange={(e) => setDraft((d) => ({ ...d, tagsInput: e.target.value }))}
                placeholder="comma, separated, tags"
              />
            ) : (
              <div className="flex flex-wrap gap-1.5">
                {entry.tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-[#f0e7dd] text-[#475f86] px-2 py-0.5 rounded-full font-code-md text-[11px] font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Action rail */}
        <div className="flex flex-col items-center gap-2 shrink-0 pt-1">
          {isEditing ? (
            <>
              <button
                type="button"
                onClick={saveEditing}
                title="Save changes"
                className="w-9 h-9 rounded-full flex items-center justify-center bg-[#223148]/8 text-[#223148] hover:bg-[#223148]/15 transition-colors"
              >
                <span className="material-symbols-outlined text-[19px]">save</span>
              </button>
              <button
                type="button"
                onClick={cancelEditing}
                title="Cancel"
                className="w-9 h-9 rounded-full flex items-center justify-center bg-[#8a99b5]/10 text-[#505f78] hover:bg-[#8a99b5]/20 transition-colors"
              >
                <span className="material-symbols-outlined text-[19px]">close</span>
              </button>
            </>
          ) : (
            <>
              <button
                type="button"
                onClick={() => onApprove(entry.id)}
                title="Approve"
                className="w-9 h-9 rounded-full flex items-center justify-center bg-[#2D5A3D]/10 text-[#2D5A3D] hover:bg-[#2D5A3D]/20 transition-colors"
              >
                <span className="material-symbols-outlined text-[19px]">check</span>
              </button>
              <button
                type="button"
                onClick={startEditing}
                title="Edit"
                className="w-9 h-9 rounded-full flex items-center justify-center bg-[#223148]/8 text-[#223148] hover:bg-[#223148]/15 transition-colors"
              >
                <span className="material-symbols-outlined text-[19px]">edit</span>
              </button>
              <button
                type="button"
                onClick={() => onDiscard(entry.id)}
                title="Discard entry"
                className="w-9 h-9 rounded-full flex items-center justify-center bg-[#B85C38]/10 text-[#B85C38] hover:bg-[#B85C38]/20 transition-colors"
              >
                <span className="material-symbols-outlined text-[19px]">close</span>
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default KnowledgeEntryCard