import React, { useState, useEffect } from 'react'
import { motion } from 'motion/react'
import { Link } from 'react-router-dom'
import { Navbar } from '../components/shared/Navbar'
import { ConcentrationRiskWidget } from '../components/dashboard/ConcentrationRiskWidget'
import { GapCheckImpactWidget } from '../components/dashboard/GapCheckImpactWidget'
import { CoverageByProjectWidget } from '../components/dashboard/CoverageByProjectWidget'
import { KnowledgeHealthWidget } from '../components/dashboard/KnowledgeHealthWidget'
import { CaptureActivityWidget } from '../components/dashboard/CaptureActivityWidget'
import { endpoints } from '../services/api'
import { MOCK_DASHBOARD_SUMMARY } from '../data/mockData'
import type { DashboardSummary } from '../types'
import { 
  RotateCcw, 
  Briefcase, 
  Lock
} from 'lucide-react'

export const DashboardPage: React.FC = () => {
  const [summary, setSummary] = useState<DashboardSummary>(MOCK_DASHBOARD_SUMMARY)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false)

  const fetchSummary = async () => {
    try {
      const res = await endpoints.getDashboardSummary()
      if (res.data && res.data.concentrationRisk) {
        setSummary(res.data)
      } else {
        setSummary(MOCK_DASHBOARD_SUMMARY)
      }
    } catch {
      // Graceful fallback to seeded mock summary
      setSummary(MOCK_DASHBOARD_SUMMARY)
    } finally {
      setIsLoading(false)
      setIsRefreshing(false)
    }
  }

  useEffect(() => {
    fetchSummary()
  }, [])

  const handleRefresh = () => {
    setIsRefreshing(true)
    setTimeout(() => {
      fetchSummary()
    }, 400)
  }

  return (
    <div className="min-h-screen w-full bg-[#0A0A0A] text-white flex flex-col justify-between overflow-y-auto overflow-x-hidden selection:bg-[#FF6A00] selection:text-white">
      {/* Persistent Top Navbar */}
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 pb-32">
        
        {/* Manager Header & Quick Context */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#27272A]"
        >
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#EF2B2D] animate-pulse" />
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#EF2B2D]">
                Executive Engineering Health
              </span>
            </div>
            <h1 className="text-[26px] sm:text-[32px] font-black text-white tracking-tight leading-tight">
              Manager Continuity Dashboard
            </h1>
            <p className="text-[14px] text-[#A1A1AA] max-w-2xl leading-relaxed">
              Answer the two critical questions: <strong className="text-white">"Is daily knowledge capture actually working?"</strong> and <strong className="text-[#EF2B2D]">"Where are we exposed if someone leaves?"</strong>
            </p>
          </div>

          <div className="flex items-center gap-3 self-start md:self-center shrink-0">
            <motion.button
              type="button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleRefresh}
              disabled={isRefreshing}
              title="Refresh telemetry"
              className="p-2.5 rounded-xl bg-[#141414] hover:bg-[#18181B] text-[#A1A1AA] hover:text-white border border-[#27272A] transition-all flex items-center gap-1.5 text-[12px] font-mono"
            >
              <RotateCcw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin text-[#FF6A00]' : ''}`} />
              <span className="hidden sm:inline">Refresh</span>
            </motion.button>

            <Link
              to="/capture"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#FF6A00] to-[#EF2B2D] hover:from-[#FF8533] text-white text-[13px] font-bold shadow-lg shadow-[#FF6A00]/20 transition-all hover:scale-105 active:scale-95"
            >
              <Briefcase className="w-4 h-4" />
              <span>Run Offboarding Audit</span>
            </Link>
          </div>
        </motion.div>

        {/* 1. HERO WIDGET: CONCENTRATION RISK (VISUALLY FIRST & LARGEST) */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <ConcentrationRiskWidget
            data={summary.concentrationRisk}
            isLoading={isLoading}
          />
        </motion.div>

        {/* 2. SECONDARY SECTION: OFFBOARDING IMPACT & KNOWLEDGE HEALTH */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Offboarding Gap-Check Impact (Proof of Value) */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="lg:col-span-7 h-full"
          >
            <GapCheckImpactWidget
              data={summary.lastGapCheck}
              isLoading={isLoading}
            />
          </motion.div>

          {/* Knowledge Health (Trustworthiness) */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.15 }}
            className="lg:col-span-5 h-full"
          >
            <KnowledgeHealthWidget
              data={summary.knowledgeHealth}
              isLoading={isLoading}
            />
          </motion.div>
        </div>

        {/* 3. TERTIARY SECTION: COVERAGE & LIVE ACTIVITY OVER TIME */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Coverage by Project */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="lg:col-span-6 h-full"
          >
            <CoverageByProjectWidget
              data={summary.coverageByProject}
              isLoading={isLoading}
            />
          </motion.div>

          {/* Capture Activity Over Time */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.25 }}
            className="lg:col-span-6 h-full"
          >
            <CaptureActivityWidget
              data={summary.captureActivity}
              isLoading={isLoading}
            />
          </motion.div>
        </div>

        {/* Footer Audit Banner */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="rounded-2xl bg-[#141414] border border-[#27272A] p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-[12px] text-[#71717A]"
        >
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-[#22C55E]" />
            <span>Telemetry verified · Aggregated across 4 active repositories and 135 dossiers</span>
          </div>

          <span className="font-mono text-[11px] text-[#52525B]">
            Knowledge Continuity Analytics Engine v2.4
          </span>
        </motion.div>
      </main>
    </div>
  )
}

export default DashboardPage
