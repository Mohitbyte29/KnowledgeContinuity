import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Navbar } from '../components/shared/Navbar'
import { SourceCard } from '../components/capture/SourceCard'
import { KnowledgeEntryCard } from '../components/capture/KnowledgeEntryCard'
import { ExtractionCounter } from '../components/capture/ExtractionCounter'
import { GapFillSection } from '../components/capture/GapFillSection'
import { Toast } from '../components/shared/Toast'
import { useUserContext } from '../context/UserContext'
import { 
  MOCK_DAILY_SOURCES, 
  MOCK_DAILY_DRAFTS, 
  MOCK_OFFBOARDING_DRAFTS,
  MOCK_GAP_QUESTIONS 
} from '../data/mockData'
import type { SourceItem, KnowledgeDraft, GapQuestion } from '../types'
import { 
  Sparkles, 
  Flame, 
  CheckCircle2, 
  Save, 
  AlertCircle,
  Clock,
  Briefcase,
  TrendingUp,
  Cpu
} from 'lucide-react'

export const CapturePage: React.FC = () => {
  const { persona } = useUserContext()
  const [activeTab, setActiveTab] = useState<'daily' | 'offboarding'>('daily')

  // --- Daily Batch State ---
  const [dailySources, setDailySources] = useState<SourceItem[]>(MOCK_DAILY_SOURCES)
  const [dailyDrafts, setDailyDrafts] = useState<KnowledgeDraft[]>(MOCK_DAILY_DRAFTS)
  const [hasExtractedActivity, setHasExtractedActivity] = useState<boolean>(false)
  const [revealedDailyCount, setRevealedDailyCount] = useState<number>(0)
  const [isExtractingDaily, setIsExtractingDaily] = useState<boolean>(false)
  const [isDailyExtractionComplete, setIsDailyExtractionComplete] = useState<boolean>(false)

  // --- Offboarding State ---
  const [offboardingDrafts, setOffboardingDrafts] = useState<KnowledgeDraft[]>(MOCK_OFFBOARDING_DRAFTS)
  const [revealedOffboardingCount, setRevealedOffboardingCount] = useState<number>(0)
  const [isExtractingOffboarding, setIsExtractingOffboarding] = useState<boolean>(false)
  const [isOffboardingComplete, setIsOffboardingComplete] = useState<boolean>(false)
  const [gapQuestions, setGapQuestions] = useState<GapQuestion[]>(MOCK_GAP_QUESTIONS)

  // --- Feedback Toast State ---
  const [toastMessage, setToastMessage] = useState<{ title: string; subtitle: string } | null>(null)
  const [isSaving, setIsSaving] = useState(false)

  // Timers cleanup ref
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [])

  // --- Extract Knowledge Handler (Reveals Today's Activity) ---
  const handleExtractKnowledge = () => {
    setHasExtractedActivity(true)
  }

  // --- Progressive Reveal Handler for Daily Batch ---
  const handleStartDailyExtraction = () => {
    if (isExtractingDaily || isDailyExtractionComplete) return

    setIsExtractingDaily(true)
    setRevealedDailyCount(0)

    let current = 0
    const total = dailyDrafts.length

    const step = () => {
      current += 1
      setRevealedDailyCount(current)

      // Mark source item as processed
      setDailySources((prev) =>
        prev.map((src, idx) => (idx === current - 1 ? { ...src, isProcessed: true } : src))
      )

      if (current < total) {
        timerRef.current = setTimeout(step, 700)
      } else {
        setIsExtractingDaily(false)
        setIsDailyExtractionComplete(true)
      }
    }

    timerRef.current = setTimeout(step, 700)
  }

  // --- Progressive Reveal Handler for Offboarding ---
  const handleStartOffboardingExtraction = () => {
    if (isExtractingOffboarding || isOffboardingComplete) return

    setIsExtractingOffboarding(true)
    setRevealedOffboardingCount(0)

    let current = 0
    const total = offboardingDrafts.length

    const step = () => {
      current += 1
      setRevealedOffboardingCount(current)

      if (current < total) {
        timerRef.current = setTimeout(step, 700)
      } else {
        setIsExtractingOffboarding(false)
        setIsOffboardingComplete(true)
      }
    }

    timerRef.current = setTimeout(step, 700)
  }

  // --- Draft Actions (Daily) ---
  const handleApproveDailyDraft = (id: string) => {
    setDailyDrafts((prev) =>
      prev.map((d) => (d.id === id ? { ...d, status: 'approved' } : d))
    )
  }

  const handleDiscardDailyDraft = (id: string) => {
    setDailyDrafts((prev) => prev.filter((d) => d.id !== id))
  }

  const handleUpdateDailyDraft = (id: string, updated: Partial<KnowledgeDraft>) => {
    setDailyDrafts((prev) =>
      prev.map((d) => (d.id === id ? { ...d, ...updated } : d))
    )
  }

  const handleUnapproveDailyDraft = (id: string) => {
    setDailyDrafts((prev) =>
      prev.map((d) => (d.id === id ? { ...d, status: 'pending' } : d))
    )
  }

  // --- Draft Actions (Offboarding) ---
  const handleApproveOffboardingDraft = (id: string) => {
    setOffboardingDrafts((prev) =>
      prev.map((d) => (d.id === id ? { ...d, status: 'approved' } : d))
    )
  }

  const handleDiscardOffboardingDraft = (id: string) => {
    setOffboardingDrafts((prev) => prev.filter((d) => d.id !== id))
  }

  const handleUpdateOffboardingDraft = (id: string, updated: Partial<KnowledgeDraft>) => {
    setOffboardingDrafts((prev) =>
      prev.map((d) => (d.id === id ? { ...d, ...updated } : d))
    )
  }

  const handleUnapproveOffboardingDraft = (id: string) => {
    setOffboardingDrafts((prev) =>
      prev.map((d) => (d.id === id ? { ...d, status: 'pending' } : d))
    )
  }

  // --- Gap Question Update ---
  const handleUpdateGapQuestion = (id: string, newAnswer: string) => {
    setGapQuestions((prev) =>
      prev.map((q) => (q.id === id ? { ...q, userAnswer: newAnswer, isSaved: true } : q))
    )
  }

  // --- Save to Knowledge Base Handlers ---
  const handleSaveDaily = () => {
    setIsSaving(true)
    setTimeout(() => {
      setIsSaving(false)
      const approvedCount = dailyDrafts.filter((d) => d.status === 'approved').length
      setToastMessage({
        title: 'Saved to Knowledge Base',
        subtitle: `Successfully indexed ${approvedCount} entries into institutional memory with embeddings.`,
      })
    }, 600)
  }

  const handleSaveOffboarding = () => {
    setIsSaving(true)
    setTimeout(() => {
      setIsSaving(false)
      const approvedCount = offboardingDrafts.filter((d) => d.status === 'approved').length
      setToastMessage({
        title: 'Offboarding Dossier Finalized',
        subtitle: `Committed ${approvedCount} gap cards & 2 question answers to verified knowledge graph.`,
      })
    }, 600)
  }

  const dailyApprovedCount = dailyDrafts.filter((d) => d.status === 'approved').length
  const offboardingApprovedCount = offboardingDrafts.filter((d) => d.status === 'approved').length

  return (
    <div className="min-h-screen w-full bg-[#0A0A0A] text-white flex flex-col justify-between overflow-y-auto overflow-x-hidden">
      {/* Persistent Top Navbar */}
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 pb-32">
        
        {/* Tab Switcher: Daily Batch vs Offboarding */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#27272A] pb-4"
        >
          <div className="flex items-center gap-2">
            <motion.button
              type="button"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setActiveTab('daily')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-[14px] transition-all duration-200 ${
                activeTab === 'daily'
                  ? 'bg-gradient-to-r from-[#FF6A00] to-[#EF2B2D] text-white shadow-lg shadow-[#FF6A00]/25'
                  : 'bg-[#141414] text-[#A1A1AA] hover:text-white hover:bg-[#1c1c20] border border-[#27272A]'
              }`}
            >
              <Clock className="w-4 h-4" />
              <span>Daily Batch</span>
            </motion.button>

            <motion.button
              type="button"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setActiveTab('offboarding')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-[14px] transition-all duration-200 ${
                activeTab === 'offboarding'
                  ? 'bg-gradient-to-r from-[#FF6A00] to-[#EF2B2D] text-white shadow-lg shadow-[#FF6A00]/25'
                  : 'bg-[#141414] text-[#A1A1AA] hover:text-white hover:bg-[#1c1c20] border border-[#27272A]'
              }`}
            >
              <Briefcase className="w-4 h-4" />
              <span>Offboarding Dossier</span>
            </motion.button>
          </div>

          <div className="flex items-center gap-2 text-[12px] text-[#A1A1AA] font-mono">
            <span className="w-2 h-2 rounded-full bg-[#22C55E] animate-pulse" />
            <span>Active Employee: <strong className="text-white">{persona?.name || 'Priya Sharma'}</strong></span>
          </div>
        </motion.div>

        {/* Dynamic Animated Tab Views */}
        <AnimatePresence mode="wait">
          {/* ========================================================= */}
          {/* TAB A: DAILY BATCH                                        */}
          {/* ========================================================= */}
          {activeTab === 'daily' && (
            <motion.div 
              key="daily-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="space-y-8"
            >
              {/* Header */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-6 rounded-2xl bg-[#141414] border border-[#27272A] shadow-xl space-y-1.5"
              >
                <div className="flex items-center gap-2 text-[#FF6A00] text-[11px] font-bold uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Continuous Daily Capture</span>
                </div>
                <h1 className="text-[26px] sm:text-[30px] font-bold text-white tracking-tight">
                  End of Day — Anything worth saving?
                </h1>
                <p className="text-[13px] text-[#A1A1AA] max-w-2xl leading-relaxed">
                  Review today's completed tickets, merged PRs, and Slack incident threads. Click below to trigger AI structuring with automated PII masking.
                </p>
              </motion.div>

              {/* Action Buttons below END OF DAY div */}
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 p-4 rounded-2xl bg-[#141414] border border-[#27272A] shadow-lg"
              >
                <div className="flex flex-wrap items-center gap-3">
                  {/* Button 1: Extract Knowledge */}
                  <motion.button
                    type="button"
                    whileHover={!hasExtractedActivity ? { scale: 1.02 } : {}}
                    whileTap={!hasExtractedActivity ? { scale: 0.98 } : {}}
                    onClick={handleExtractKnowledge}
                    className={`flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-bold text-[14px] transition-all duration-200 ${
                      hasExtractedActivity
                        ? 'bg-[#22C55E]/15 text-[#22C55E] border border-[#22C55E]/30 shadow-sm cursor-default'
                        : 'bg-gradient-to-r from-[#FF6A00] to-[#EF2B2D] hover:from-[#FF8533] text-white shadow-lg shadow-[#FF6A00]/25 cursor-pointer'
                    }`}
                  >
                    {hasExtractedActivity ? (
                      <>
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Knowledge Extracted</span>
                      </>
                    ) : (
                      <>
                        <span>Extract Knowledge</span>
                      </>
                    )}
                  </motion.button>

                  {/* Button 2: Review Today's Items */}
                  <motion.button
                    type="button"
                    whileHover={hasExtractedActivity && !isExtractingDaily && !isDailyExtractionComplete ? { scale: 1.02 } : {}}
                    whileTap={hasExtractedActivity && !isExtractingDaily && !isDailyExtractionComplete ? { scale: 0.98 } : {}}
                    onClick={handleStartDailyExtraction}
                    disabled={!hasExtractedActivity || isExtractingDaily || isDailyExtractionComplete}
                    className={`flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-[14px] transition-all duration-200 ${
                      !hasExtractedActivity
                        ? 'bg-[#18181B] text-[#71717A] border border-[#27272A] cursor-not-allowed opacity-60'
                        : isDailyExtractionComplete
                        ? 'bg-[#22C55E]/20 text-[#22C55E] border border-[#22C55E]/40 cursor-default'
                        : isExtractingDaily
                        ? 'bg-[#1F1F23] text-[#A1A1AA] border border-[#27272A] cursor-wait'
                        : 'bg-gradient-to-r from-[#FF6A00] to-[#EF2B2D] hover:from-[#FF8533] text-white shadow-lg shadow-[#FF6A00]/25 cursor-pointer'
                    }`}
                  >
                    {isDailyExtractionComplete ? (
                      <>
                        <CheckCircle2 className="w-4 h-4" />
                        <span>All Items Extracted</span>
                      </>
                    ) : isExtractingDaily ? (
                      <>
                        <Cpu className="w-4 h-4 animate-spin" />
                        <span>Extracting Items...</span>
                      </>
                    ) : (
                      <>
                        <span>Review Today's Items</span>
                      </>
                    )}
                  </motion.button>
                </div>

                {/* Progress helper text on the right */}
                <div className="flex items-center gap-2 text-[12px] text-[#A1A1AA] font-medium">
                  {!hasExtractedActivity ? (
                    <span className="flex items-center gap-1.5 text-[#71717A]">
                      <AlertCircle className="w-3.5 h-3.5 text-[#FF6A00]" />
                      Click <strong className="text-white">"Extract Knowledge"</strong> to view today's activity
                    </span>
                  ) : !isDailyExtractionComplete && !isExtractingDaily ? (
                    <span className="flex items-center gap-1.5 text-[#22C55E]">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Activity loaded. Click <strong className="text-white">"Review Today's Items"</strong> to run AI structuring
                    </span>
                  ) : isExtractingDaily ? (
                    <span className="flex items-center gap-1.5 text-[#FF6A00] animate-pulse">
                      <Cpu className="w-3.5 h-3.5 animate-spin" />
                      AI structuring in progress ({revealedDailyCount}/{dailyDrafts.length})...
                    </span>
                  ) : (
                    <span className="flex items-center gap-1.5 text-[#22C55E]">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      All items structured &amp; ready for commit
                    </span>
                  )}
                </div>
              </motion.div>

              {!hasExtractedActivity ? (
                /* Full width No structured Cards Extracted Yet state */
                <motion.div 
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="w-full space-y-4"
                >
                  <div className="flex items-center justify-between border-b border-[#27272A] pb-2">
                    <div className="flex items-center gap-2">
                      <h2 className="text-[16px] font-bold text-white">
                        Structured Knowledge Cards
                      </h2>
                      <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-[#1F1F23] text-[#71717A] border border-[#27272A]">
                        0 of {dailyDrafts.length} approved
                      </span>
                    </div>
                    <span className="text-[11px] text-[#71717A]">
                      Ready for Knowledge Base
                    </span>
                  </div>

                  <div className="rounded-2xl bg-[#141414] border border-dashed border-[#27272A] p-16 text-center flex flex-col items-center justify-center space-y-4 shadow-xl">
                    <div className="w-14 h-14 rounded-2xl bg-[#1F1F23] text-[#71717A] flex items-center justify-center border border-[#27272A]">
                      <Sparkles className="w-7 h-7 text-[#FF6A00]" />
                    </div>
                    <div className="space-y-1.5 max-w-md">
                      <h3 className="text-[18px] font-bold text-white">
                        No Structured Cards Extracted Yet
                      </h3>
                      <p className="text-[13px] text-[#A1A1AA] leading-relaxed">
                        Click <strong className="text-white">"Extract Knowledge"</strong> above to load today's mined activity, then proceed with <strong className="text-white">"Review Today's Items"</strong> to generate structured knowledge cards.
                      </p>
                    </div>
                  </div>
                </motion.div>
              ) : (
                /* Dual Column Layout: Raw Sources (Left) & Structured Drafts (Right) */
                <motion.div 
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
                >
                  {/* Column 1: Raw Completed Work Items */}
                  <div className="lg:col-span-5 space-y-4">
                    <div className="flex items-center justify-between border-b border-[#27272A] pb-2">
                      <div className="flex items-center gap-2">
                        <h2 className="text-[16px] font-bold text-white">
                          Today's Activity
                        </h2>
                        <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-[#1F1F23] text-[#A1A1AA] border border-[#27272A]">
                          {dailySources.length} items
                        </span>
                      </div>
                      <span className="text-[11px] text-[#71717A]">
                        Auto-mined from tools
                      </span>
                    </div>

                    <div className="space-y-3">
                      {dailySources.map((item, idx) => {
                        const isExtractingThis = isExtractingDaily && revealedDailyCount === idx
                        const isProcessedThis = idx < revealedDailyCount
                        return (
                          <SourceCard
                            key={item.id}
                            item={item}
                            isProcessed={isProcessedThis}
                            isExtracting={isExtractingThis}
                          />
                        )
                      })}
                    </div>
                  </div>

                  {/* Column 2: Structured Knowledge Results */}
                  <div className="lg:col-span-7 space-y-4">
                    <div className="flex items-center justify-between border-b border-[#27272A] pb-2">
                      <div className="flex items-center gap-2">
                        <h2 className="text-[16px] font-bold text-white">
                          Structured Knowledge Cards
                        </h2>
                        <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-[#FF6A00]/15 text-[#FF6A00] border border-[#FF6A00]/30 font-bold">
                          {dailyApprovedCount} of {dailyDrafts.length} approved
                        </span>
                      </div>
                      <span className="text-[11px] text-[#71717A]">
                        Ready for Knowledge Base
                      </span>
                    </div>

                    {/* Progressive Reveal Counter */}
                    <ExtractionCounter
                      currentIndex={revealedDailyCount}
                      totalItems={dailyDrafts.length}
                      isComplete={isDailyExtractionComplete}
                      isExtracting={isExtractingDaily}
                    />

                    {/* Cards List or Empty Placeholder */}
                    {revealedDailyCount === 0 && !isExtractingDaily ? (
                      <div className="rounded-2xl bg-[#141414] border border-dashed border-[#27272A] p-12 text-center flex flex-col items-center justify-center space-y-3">
                        <div className="w-12 h-12 rounded-2xl bg-[#1F1F23] text-[#71717A] flex items-center justify-center">
                          <Sparkles className="w-6 h-6 text-[#FF6A00]" />
                        </div>
                        <h3 className="text-[16px] font-bold text-white">
                          No Structured Cards Extracted Yet
                        </h3>
                        <p className="text-[13px] text-[#A1A1AA] max-w-sm">
                          Click <strong className="text-white">"Review Today's Items"</strong> to trigger the progressive AI structuring queue.
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {dailyDrafts.slice(0, revealedDailyCount).map((draft) => (
                          <KnowledgeEntryCard
                            key={draft.id}
                            entry={draft}
                            onApprove={handleApproveDailyDraft}
                            onDiscard={handleDiscardDailyDraft}
                            onUpdate={handleUpdateDailyDraft}
                            onUnapprove={handleUnapproveDailyDraft}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              )}

              {/* Bottom Floating Bar */}
              <AnimatePresence>
                {revealedDailyCount > 0 && (
                  <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 30 }}
                    className="sticky bottom-4 z-40 rounded-2xl bg-[#141414]/95 border border-[#27272A] p-4 shadow-2xl backdrop-blur-md flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-[#22C55E]/15 border border-[#22C55E]/30 flex items-center justify-center text-[#22C55E]">
                        <CheckCircle2 className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-[14px] font-bold text-white">
                          {dailyApprovedCount} of {dailyDrafts.length} approved
                        </h4>
                        <p className="text-[12px] text-[#A1A1AA]">
                          Unapproved items remain pending for future review or will be safely discarded.
                        </p>
                      </div>
                    </div>

                    <motion.button
                      type="button"
                      whileHover={dailyApprovedCount > 0 && !isSaving ? { scale: 1.02 } : {}}
                      whileTap={dailyApprovedCount > 0 && !isSaving ? { scale: 0.98 } : {}}
                      onClick={handleSaveDaily}
                      disabled={dailyApprovedCount === 0 || isSaving}
                      className={`flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-[13px] transition-all shadow-lg ${
                        dailyApprovedCount === 0
                          ? 'bg-[#1F1F23] text-[#71717A] border border-[#27272A] cursor-not-allowed'
                          : 'bg-gradient-to-r from-[#FF6A00] to-[#EF2B2D] hover:from-[#FF8533] text-white shadow-[#FF6A00]/25'
                      }`}
                    >
                      <Save className="w-4 h-4" />
                      <span>{isSaving ? 'Saving...' : `${dailyApprovedCount} of ${dailyDrafts.length} approved — Save to Knowledge Base`}</span>
                    </motion.button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}

          {/* ========================================================= */}
          {/* TAB B: OFFBOARDING                                        */}
          {/* ========================================================= */}
          {activeTab === 'offboarding' && (
            <motion.div 
              key="offboarding-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="space-y-8"
            >
              {/* Offboarding Header */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl bg-[#141414] border border-[#27272A] shadow-xl"
              >
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2 text-[#EF2B2D] text-[11px] font-bold uppercase tracking-wider">
                    <Flame className="w-3.5 h-3.5" />
                    <span>Comprehensive Offboarding Protocol</span>
                  </div>
                  <h1 className="text-[26px] sm:text-[30px] font-bold text-white tracking-tight">
                    Offboarding — {persona?.name || 'Priya Sharma'}
                  </h1>
                  <p className="text-[13px] text-[#A1A1AA] max-w-2xl leading-relaxed">
                    Filling in what daily capture missed. Continuity diffs your full employment history against existing records to surface undocumented tribal knowledge.
                  </p>
                </div>

                <motion.button
                  type="button"
                  whileHover={!isExtractingOffboarding && !isOffboardingComplete ? { scale: 1.03 } : {}}
                  whileTap={!isExtractingOffboarding && !isOffboardingComplete ? { scale: 0.97 } : {}}
                  onClick={handleStartOffboardingExtraction}
                  disabled={isExtractingOffboarding || isOffboardingComplete}
                  className={`flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-[14px] transition-all shadow-xl self-start md:self-center shrink-0 ${
                    isOffboardingComplete
                      ? 'bg-[#22C55E]/20 text-[#22C55E] border border-[#22C55E]/40 cursor-default'
                      : isExtractingOffboarding
                      ? 'bg-[#1F1F23] text-[#A1A1AA] border border-[#27272A] cursor-wait'
                      : 'bg-gradient-to-r from-[#FF6A00] to-[#EF2B2D] hover:from-[#FF8533] text-white shadow-[#FF6A00]/25'
                  }`}
                >
                  {isOffboardingComplete ? (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      <span>6 Gaps Extracted</span>
                    </>
                  ) : isExtractingOffboarding ? (
                    <>
                      <Cpu className="w-4 h-4 animate-spin" />
                      <span>Scanning Gaps...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      <span>Find the Gaps</span>
                    </>
                  )}
                </motion.button>
              </motion.div>

              {/* Summary Stat Bar */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <motion.div whileHover={{ y: -3 }} className="rounded-2xl bg-[#141414] border border-[#27272A] p-4 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#22C55E]/15 border border-[#22C55E]/30 flex items-center justify-center text-[#22C55E]">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] text-[#71717A] uppercase tracking-wider font-bold">Logged Items</span>
                    <p className="text-[20px] font-bold text-white">42 Items</p>
                  </div>
                </motion.div>

                <motion.div whileHover={{ y: -3 }} className="rounded-2xl bg-[#141414] border border-[#FF6A00]/40 p-4 flex items-center gap-3 shadow-lg shadow-[#FF6A00]/5">
                  <div className="w-10 h-10 rounded-xl bg-[#FF6A00]/15 border border-[#FF6A00]/30 flex items-center justify-center text-[#FF6A00]">
                    <AlertCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] text-[#FF6A00] uppercase tracking-wider font-bold">Detected Gaps</span>
                    <p className="text-[20px] font-bold text-white">6 Found</p>
                  </div>
                </motion.div>

                <motion.div whileHover={{ y: -3 }} className="rounded-2xl bg-[#141414] border border-[#27272A] p-4 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#EF2B2D]/15 border border-[#EF2B2D]/30 flex items-center justify-center text-[#EF2B2D]">
                    <Flame className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] text-[#71717A] uppercase tracking-wider font-bold">High Priority</span>
                    <p className="text-[20px] font-bold text-white">3 Critical</p>
                  </div>
                </motion.div>

                <motion.div whileHover={{ y: -3 }} className="rounded-2xl bg-[#141414] border border-[#27272A] p-4 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#3B82F6]/15 border border-[#3B82F6]/30 flex items-center justify-center text-[#3B82F6]">
                    <TrendingUp className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] text-[#71717A] uppercase tracking-wider font-bold">Coverage Score</span>
                    <p className="text-[20px] font-bold text-white">87% (+13% gap)</p>
                  </div>
                </motion.div>
              </div>

              {/* Gap Extraction Live Area */}
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-[#27272A] pb-2">
                  <div className="flex items-center gap-2">
                    <h2 className="text-[17px] font-bold text-white">
                      Uncaptured Gap Dossiers ({revealedOffboardingCount} of {offboardingDrafts.length})
                    </h2>
                    <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-[#FF6A00]/15 text-[#FF6A00] border border-[#FF6A00]/30 font-bold">
                      {offboardingApprovedCount} approved
                    </span>
                  </div>
                  <span className="text-[11px] text-[#71717A]">
                    Sorted by critical risk
                  </span>
                </div>

                {/* Live Counter */}
                <ExtractionCounter
                  currentIndex={revealedOffboardingCount}
                  totalItems={offboardingDrafts.length}
                  isComplete={isOffboardingComplete}
                  isExtracting={isExtractingOffboarding}
                />

                {revealedOffboardingCount === 0 && !isExtractingOffboarding ? (
                  <div className="rounded-2xl bg-[#141414] border border-dashed border-[#27272A] p-12 text-center flex flex-col items-center justify-center space-y-3">
                    <div className="w-12 h-12 rounded-2xl bg-[#1F1F23] text-[#71717A] flex items-center justify-center">
                      <Sparkles className="w-6 h-6 text-[#FF6A00]" />
                    </div>
                    <h3 className="text-[16px] font-bold text-white">
                      No Gaps Extracted Yet
                    </h3>
                    <p className="text-[13px] text-[#A1A1AA] max-w-sm">
                      Click <strong className="text-white">"Find the Gaps"</strong> to begin the progressive extraction of the 6 detected gap items.
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {offboardingDrafts.slice(0, revealedOffboardingCount).map((draft) => (
                      <KnowledgeEntryCard
                        key={draft.id}
                        entry={draft}
                        onApprove={handleApproveOffboardingDraft}
                        onDiscard={handleDiscardOffboardingDraft}
                        onUpdate={handleUpdateOffboardingDraft}
                        onUnapprove={handleUnapproveOffboardingDraft}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Gap-Fill Questions Section */}
              <GapFillSection
                questions={gapQuestions}
                onUpdateAnswer={handleUpdateGapQuestion}
              />

              {/* Sticky Bottom Save Bar */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="sticky bottom-4 z-40 rounded-2xl bg-[#141414]/95 border border-[#27272A] p-4 shadow-2xl backdrop-blur-md flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#22C55E]/15 border border-[#22C55E]/30 flex items-center justify-center text-[#22C55E]">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-[14px] font-bold text-white">
                      {offboardingApprovedCount} of {offboardingDrafts.length} approved · 2 Q&amp;A Responses Synced
                    </h4>
                    <p className="text-[12px] text-[#A1A1AA]">
                      Commits all approved handoff cards into permanent institutional memory for team retrieval.
                    </p>
                  </div>
                </div>

                <motion.button
                  type="button"
                  whileHover={!isSaving ? { scale: 1.02 } : {}}
                  whileTap={!isSaving ? { scale: 0.98 } : {}}
                  onClick={handleSaveOffboarding}
                  disabled={isSaving}
                  className="flex items-center justify-center gap-2 px-7 py-3 rounded-xl font-bold text-[13px] bg-gradient-to-r from-[#FF6A00] to-[#EF2B2D] hover:from-[#FF8533] text-white shadow-lg shadow-[#FF6A00]/25 transition-all"
                >
                  <Save className="w-4 h-4" />
                  <span>{isSaving ? 'Finalizing...' : 'Finish & Save to Knowledge Base'}</span>
                </motion.button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Confirmation Toast */}
      {toastMessage && (
        <Toast
          isOpen={true}
          message={toastMessage.title}
          subtitle={toastMessage.subtitle}
          onClose={() => setToastMessage(null)}
        />
      )}
    </div>
  )
}

export default CapturePage
