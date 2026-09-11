import React from 'react'
import type { GapQuestion } from '../../types'
import { HelpCircle, CheckCircle2, Sparkles } from 'lucide-react'

interface GapFillSectionProps {
  questions: GapQuestion[]
  onUpdateAnswer: (id: string, newAnswer: string) => void
  className?: string
}

export const GapFillSection: React.FC<GapFillSectionProps> = ({
  questions,
  onUpdateAnswer,
  className = '',
}) => {
  const handleChange = (id: string, val: string) => {
    onUpdateAnswer(id, val)
  }

  return (
    <section className={`rounded-2xl bg-[#141414] border border-[#27272A] p-6 shadow-xl ${className}`}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 mb-5 border-b border-[#27272A]">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#FF6A00] to-[#EF2B2D] flex items-center justify-center text-white shadow-md shadow-[#FF6A00]/20">
            <HelpCircle className="w-4 h-4 text-white" />
          </div>
          <div>
            <h3 className="text-[17px] font-bold text-white tracking-tight">
              Gap-Fill Questions
            </h3>
            <p className="text-[12px] text-[#A1A1AA]">
              AI-generated inquiries targeting unwritten tribal lore and deployment quirks.
            </p>
          </div>
        </div>

        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold bg-[#FF6A00]/10 text-[#FF6A00] border border-[#FF6A00]/30 self-start sm:self-auto">
          <Sparkles className="w-3 h-3" />
          <span>2 AI Prompts Generated</span>
        </span>
      </div>

      {/* Questions List */}
      <div className="space-y-5">
        {questions.map((q, idx) => (
          <div
            key={q.id}
            className="rounded-xl bg-[#18181B] border border-[#27272A] hover:border-[#3F3F46] p-4 md:p-5 transition-all space-y-3"
          >
            <div className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-lg bg-[#FF6A00]/15 border border-[#FF6A00]/30 text-[#FF6A00] text-[11px] font-mono font-bold flex items-center justify-center shrink-0 mt-0.5">
                Q{idx + 1}
              </span>
              <div className="flex-1 min-w-0">
                <h4 className="text-[14px] font-semibold text-white leading-snug">
                  {q.question}
                </h4>
                <p className="text-[11px] text-[#71717A] mt-1 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF6A00]" />
                  <span>{q.contextHint}</span>
                </p>
              </div>
            </div>

            <div className="pt-1">
              <textarea
                rows={3}
                value={q.userAnswer}
                onChange={(e) => handleChange(q.id, e.target.value)}
                placeholder="Type the unwritten rule, emergency contacts, or runbook steps here..."
                className="w-full rounded-xl bg-[#141414] border border-[#27272A] focus:border-[#FF6A00] focus:ring-1 focus:ring-[#FF6A00] p-3 text-[13px] text-white leading-relaxed outline-none transition-all resize-y placeholder:text-[#52525B]"
              />
            </div>

            <div className="flex items-center justify-between text-[11px] text-[#71717A] pt-1">
              <span className="flex items-center gap-1 text-[#22C55E] font-medium">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Response synced to handoff packet</span>
              </span>
              <span className="text-[10px] text-[#52525B]">Auto-saved locally</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default GapFillSection
