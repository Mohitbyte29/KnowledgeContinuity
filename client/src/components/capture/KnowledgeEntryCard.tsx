import React, { useState } from 'react'
import { motion } from 'motion/react'
import type { KnowledgeDraft } from '../../types'
import { PiiMaskedBadge } from '../shared/PiiMaskedBadge'
import { 
  Check, 
  Pencil, 
  X, 
  Sparkles, 
  RotateCcw, 
  Save, 
  Hash
} from 'lucide-react'

interface KnowledgeEntryCardProps {
  entry: KnowledgeDraft
  onApprove: (id: string) => void
  onDiscard: (id: string) => void
  onUpdate: (id: string, updated: Partial<KnowledgeDraft>) => void
  onUnapprove?: (id: string) => void
  className?: string
}

export const KnowledgeEntryCard: React.FC<KnowledgeEntryCardProps> = ({
  entry,
  onApprove,
  onDiscard,
  onUpdate,
  onUnapprove,
  className = '',
}) => {
  const [isEditing, setIsEditing] = useState(false)
  const [draftState, setDraftState] = useState({
    problem: entry.problem,
    symptom: entry.symptom,
    solution: entry.solution,
    context: entry.context,
    tagsText: entry.tags.join(', '),
  })

  const isApproved = entry.status === 'approved'

  const handleSaveEdit = () => {
    onUpdate(entry.id, {
      problem: draftState.problem.trim(),
      symptom: draftState.symptom.trim(),
      solution: draftState.solution.trim(),
      context: draftState.context.trim(),
      tags: draftState.tagsText
        .split(',')
        .map((t) => t.trim().replace(/^#/, ''))
        .filter(Boolean),
    })
    setIsEditing(false)
  }

  const handleCancelEdit = () => {
    setDraftState({
      problem: entry.problem,
      symptom: entry.symptom,
      solution: entry.solution,
      context: entry.context,
      tagsText: entry.tags.join(', '),
    })
    setIsEditing(false)
  }

  // --- Approved Collapsed State ---
  if (isApproved && !isEditing) {
    return (
      <motion.div 
        layout
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.3 }}
        className={`rounded-2xl bg-[#141414] border border-[#22C55E]/40 p-4 shadow-lg shadow-[#22C55E]/5 ${className}`}
      >
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-8 h-8 rounded-xl bg-[#22C55E]/20 border border-[#22C55E]/40 flex items-center justify-center text-[#22C55E] shrink-0">
              <Check className="w-4 h-4" />
            </div>
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-[12px] font-bold text-[#22C55E] uppercase tracking-wider">
                  Approved for Knowledge Base
                </span>
                {entry.sourceLabel && (
                  <span className="text-[11px] text-[#71717A] truncate">
                    · {entry.sourceLabel}
                  </span>
                )}
              </div>
              <p className="text-[14px] font-medium text-white truncate">
                {entry.problem}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            {onUnapprove && (
              <motion.button
                type="button"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => onUnapprove(entry.id)}
                title="Undo approval"
                className="p-2 rounded-xl text-[#71717A] hover:text-[#FF6A00] hover:bg-[#1C1C1F] transition-all"
              >
                <RotateCcw className="w-4 h-4" />
              </motion.button>
            )}
            <motion.button
              type="button"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => onDiscard(entry.id)}
              title="Delete entry"
              className="p-2 rounded-xl text-[#71717A] hover:text-[#EF2B2D] hover:bg-[#1C1C1F] transition-all"
            >
              <X className="w-4 h-4" />
            </motion.button>
          </div>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.35 }}
      className={`relative rounded-2xl bg-[#141414] border border-[#27272A] hover:border-[#3F3F46] p-5 md:p-6 shadow-xl ${className}`}
    >
      {/* Top Header Bar */}
      <div className="flex items-start justify-between gap-4 mb-4 pb-3 border-b border-[#27272A]/80">
        <div className="flex flex-wrap items-center gap-2">
          {/* ✨ Structured Badge */}
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#FF6A00]/15 text-[#FF6A00] border border-[#FF6A00]/30 shadow-xs">
            <Sparkles className="w-3 h-3" />
            <span>✨ Structured</span>
          </span>

          {/* Source Tag */}
          {entry.sourceLabel && (
            <span className="text-[11px] font-mono text-[#A1A1AA] bg-[#18181B] px-2 py-0.5 rounded-md border border-[#27272A]">
              {entry.sourceLabel}
            </span>
          )}

          {/* PII Masked Badge */}
          {entry.piiMasked && (
            <PiiMaskedBadge count={entry.piiMaskedCount || 2} />
          )}
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-1.5 shrink-0">
          {isEditing ? (
            <>
              <motion.button
                type="button"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSaveEdit}
                title="Save changes"
                className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-[#22C55E] hover:bg-[#1eb053] text-black text-[12px] font-bold transition-all shadow-md shadow-[#22C55E]/20"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Save</span>
              </motion.button>
              <motion.button
                type="button"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleCancelEdit}
                title="Cancel"
                className="p-1.5 rounded-xl bg-[#1F1F23] hover:bg-[#27272A] text-[#A1A1AA] hover:text-white transition-all"
              >
                <X className="w-4 h-4" />
              </motion.button>
            </>
          ) : (
            <>
              <motion.button
                type="button"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => onApprove(entry.id)}
                title="Approve entry (Add to Knowledge Base)"
                className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-[#22C55E]/15 hover:bg-[#22C55E] text-[#22C55E] hover:text-black border border-[#22C55E]/30 text-[12px] font-bold transition-all group"
              >
                <Check className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
                <span>Approve</span>
              </motion.button>

              <motion.button
                type="button"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsEditing(true)}
                title="Edit entry"
                className="p-2 rounded-xl bg-[#18181B] hover:bg-[#1F1F23] text-[#A1A1AA] hover:text-white border border-[#27272A] transition-all"
              >
                <Pencil className="w-3.5 h-3.5" />
              </motion.button>

              <motion.button
                type="button"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onDiscard(entry.id)}
                title="Discard entry"
                className="p-2 rounded-xl bg-[#18181B] hover:bg-[#EF2B2D]/20 text-[#71717A] hover:text-[#EF2B2D] border border-[#27272A] hover:border-[#EF2B2D]/40 transition-all"
              >
                <X className="w-3.5 h-3.5" />
              </motion.button>
            </>
          )}
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="space-y-4">
        {/* Problem */}
        <div>
          <span className="block text-[10px] font-bold uppercase tracking-widest text-[#FF6A00] mb-1">
            Problem
          </span>
          {isEditing ? (
            <input
              type="text"
              value={draftState.problem}
              onChange={(e) => setDraftState({ ...draftState, problem: e.target.value })}
              className="w-full bg-[#18181B] border border-[#3F3F46] focus:border-[#FF6A00] focus:ring-1 focus:ring-[#FF6A00] rounded-xl px-3 py-2 text-[14px] text-white outline-none transition-all"
            />
          ) : (
            <h3 className="text-[16px] font-bold text-white leading-snug">
              {entry.problem}
            </h3>
          )}
        </div>

        {/* Symptom & Solution Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {/* Symptom */}
          <div className="p-3.5 rounded-xl bg-[#18181B] border border-[#27272A]/90">
            <span className="block text-[10px] font-bold uppercase tracking-widest text-[#A1A1AA] mb-1.5">
              Symptom
            </span>
            {isEditing ? (
              <textarea
                rows={3}
                value={draftState.symptom}
                onChange={(e) => setDraftState({ ...draftState, symptom: e.target.value })}
                className="w-full bg-[#141414] border border-[#3F3F46] focus:border-[#FF6A00] rounded-lg p-2 text-[13px] text-white outline-none resize-y"
              />
            ) : (
              <p className="text-[13px] text-[#A1A1AA] leading-relaxed">
                {entry.symptom}
              </p>
            )}
          </div>

          {/* Solution */}
          <div className="p-3.5 rounded-xl bg-[#1C1814] border border-[#FF6A00]/30 shadow-inner">
            <span className="block text-[10px] font-bold uppercase tracking-widest text-[#FF6A00] mb-1.5">
              Solution
            </span>
            {isEditing ? (
              <textarea
                rows={3}
                value={draftState.solution}
                onChange={(e) => setDraftState({ ...draftState, solution: e.target.value })}
                className="w-full bg-[#141414] border border-[#FF6A00]/50 focus:border-[#FF6A00] rounded-lg p-2 text-[13px] text-white outline-none resize-y"
              />
            ) : (
              <p className="text-[13px] text-[#F4F4F5] leading-relaxed font-medium">
                {entry.solution}
              </p>
            )}
          </div>
        </div>

        {/* Context */}
        <div className="p-3 rounded-xl bg-[#18181B] border border-[#27272A]/80">
          <span className="block text-[10px] font-bold uppercase tracking-widest text-[#71717A] mb-1">
            Context &amp; Tribal Knowledge
          </span>
          {isEditing ? (
            <textarea
              rows={2}
              value={draftState.context}
              onChange={(e) => setDraftState({ ...draftState, context: e.target.value })}
              className="w-full bg-[#141414] border border-[#3F3F46] focus:border-[#FF6A00] rounded-lg p-2 text-[13px] text-white outline-none resize-y"
            />
          ) : (
            <p className="text-[12px] text-[#A1A1AA] leading-relaxed">
              {entry.context}
            </p>
          )}
        </div>

        {/* Tags */}
        <div>
          {isEditing ? (
            <div>
              <span className="block text-[10px] font-bold uppercase tracking-widest text-[#71717A] mb-1">
                Tags (comma separated)
              </span>
              <input
                type="text"
                value={draftState.tagsText}
                onChange={(e) => setDraftState({ ...draftState, tagsText: e.target.value })}
                placeholder="stripe, webhooks, idempotency"
                className="w-full bg-[#18181B] border border-[#3F3F46] focus:border-[#FF6A00] rounded-xl px-3 py-1.5 text-[12px] text-white font-mono outline-none"
              />
            </div>
          ) : (
            <div className="flex flex-wrap items-center gap-1.5 pt-1">
              {entry.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#18181B] text-[#A1A1AA] border border-[#27272A] text-[11px] font-mono hover:text-white transition-colors"
                >
                  <Hash className="w-2.5 h-2.5 text-[#FF6A00]" />
                  <span>{tag}</span>
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
}

export default KnowledgeEntryCard