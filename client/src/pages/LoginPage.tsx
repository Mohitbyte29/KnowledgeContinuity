import React from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, type Variants } from 'motion/react'
import { useUserContext } from '../context/UserContext'
import type { Persona } from '../types'
import SplitText from '../../@/components/SplitText'
import { 
  Brain, 
  Sparkles, 
  ArrowRight, 
  Layers, 
  Search, 
  ShieldCheck, 
  Zap,
  Lock,
  BarChart3,
  CheckCircle2,
  Users
} from 'lucide-react'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
}

export const LoginPage: React.FC = () => {
  const navigate = useNavigate()
  const { personas, setPersona } = useUserContext()

  const handleSelectPersona = (p: Persona) => {
    setPersona(p)
    if (p.type === 'manager') {
      navigate('/dashboard')
    } else if (p.type === 'current_employee' || p.type === 'departing') {
      navigate('/capture')
    } else {
      navigate('/ask')
    }
  }

  const getPersonaRoleLabel = (type: string) => {
    if (type === 'manager') return 'Engineering Manager'
    if (type === 'new_hire') return 'New Hire'
    return 'Current Employee'
  }

  const getButtonText = (type: string) => {
    if (type === 'manager') return 'Enter Manager Dashboard'
    if (type === 'new_hire') return 'Enter as New Hire'
    return 'Enter as Current Employee'
  }

  return (
    <div className="min-h-screen w-full bg-[#0A0A0A] text-white flex flex-col justify-between relative overflow-y-auto overflow-x-hidden selection:bg-[#FF6A00] selection:text-white">
      {/* Background Ambient Floating Glows */}
      <motion.div 
        animate={{ 
          x: [0, 30, 0], 
          y: [0, -30, 0],
          scale: [1, 1.1, 1] 
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="fixed -top-40 -left-40 w-96 h-96 bg-[#FF6A00]/15 rounded-full blur-[140px] pointer-events-none z-0" 
      />
      <motion.div 
        animate={{ 
          x: [0, -30, 0], 
          y: [0, 30, 0],
          scale: [1, 1.15, 1] 
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="fixed -bottom-40 -right-40 w-96 h-96 bg-[#EF2B2D]/15 rounded-full blur-[140px] pointer-events-none z-0" 
      />

      {/* Top Header Bar */}
      <motion.header 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-7xl mx-auto px-6 py-6 flex items-center justify-between z-10 shrink-0"
      >
        <div className="flex items-center gap-3">
          <motion.div 
            whileHover={{ rotate: 10, scale: 1.05 }}
            className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#FF6A00] to-[#EF2B2D] flex items-center justify-center text-white shadow-lg shadow-[#FF6A00]/30 cursor-pointer"
          >
            <Brain className="w-6 h-6 text-white" />
          </motion.div>
          <div className="flex flex-col">
            <span className="font-bold text-[18px] tracking-tight text-white">
              Knowledge Continuity
            </span>
            <span className="text-[11px] text-[#71717A]">
              Institutional Memory Engine
            </span>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-[#141414] border border-[#27272A] text-[11px] font-mono text-[#A1A1AA]">
          <span className="w-2 h-2 rounded-full bg-[#22C55E] animate-pulse" />
          <span>ROLE-BASED WORKSPACE</span>
        </div>
      </motion.header>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 py-10 z-10 max-w-6xl mx-auto w-full">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="w-full flex flex-col items-center"
        >
          {/* Title & Tagline */}
          <motion.div variants={itemVariants} className="text-center max-w-2xl mx-auto mb-10 space-y-4">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FF6A00]/10 border border-[#FF6A00]/30 text-[12px] font-semibold text-[#FF6A00] shadow-sm cursor-default"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Select Your Role Persona</span>
            </motion.div>

            <h1 className="text-[38px] sm:text-[46px] md:text-[52px] font-black text-white tracking-tight leading-[1.08]">
              <SplitText text="Welcome to Knowledge Continuity" />
            </h1>

            <p className="text-[18px] sm:text-[20px] font-medium text-[#A1A1AA] max-w-xl mx-auto leading-relaxed">
              Capture what leaves. Retrieve when it's needed.
            </p>

            <p className="text-[13px] text-[#71717A] max-w-lg mx-auto leading-normal">
              Select one of the three personas below. Managers unlock the engineering health &amp; risk telemetry dashboard along with capture and search. New Hires and Current Employees access capture and AI search.
            </p>
          </motion.div>

          {/* 3 Selectable Persona Cards */}
          <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
            {personas.map((p, idx) => {
              const isManager = p.type === 'manager'
              const isCurrentEmp = p.type === 'current_employee' || p.type === 'departing'
              const isNewHire = p.type === 'new_hire'

              return (
                <motion.button
                  key={p.id}
                  type="button"
                  onClick={() => handleSelectPersona(p)}
                  whileHover={{ y: -6, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0, y: 25 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.15 + idx * 0.1 }}
                  className={`group relative text-left rounded-2xl bg-[#141414] hover:bg-[#18181B] border transition-all duration-300 p-6 flex flex-col justify-between gap-6 shadow-xl ${
                    isManager
                      ? 'border-[#EF2B2D]/40 hover:border-[#EF2B2D] hover:shadow-2xl hover:shadow-[#EF2B2D]/20'
                      : isCurrentEmp
                      ? 'border-[#FF6A00]/40 hover:border-[#FF6A00] hover:shadow-2xl hover:shadow-[#FF6A00]/20'
                      : 'border-[#3B82F6]/40 hover:border-[#3B82F6] hover:shadow-2xl hover:shadow-[#3B82F6]/20'
                  }`}
                >
                  {/* Top Badge & Icon */}
                  <div className="flex items-start justify-between gap-2">
                    <span 
                      className={`inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full border ${
                        isManager
                          ? 'bg-[#EF2B2D]/15 text-[#EF2B2D] border-[#EF2B2D]/30'
                          : isCurrentEmp
                          ? 'bg-[#FF6A00]/15 text-[#FF6A00] border-[#FF6A00]/30'
                          : 'bg-[#3B82F6]/15 text-[#3B82F6] border-[#3B82F6]/30'
                      }`}
                    >
                      {isManager ? (
                        <BarChart3 className="w-3.5 h-3.5" />
                      ) : isCurrentEmp ? (
                        <Layers className="w-3.5 h-3.5" />
                      ) : (
                        <Search className="w-3.5 h-3.5" />
                      )}
                      <span>{getPersonaRoleLabel(p.type)}</span>
                    </span>

                    <span className="text-[11px] font-mono text-[#52525B]">
                      {isManager ? 'Role 03' : isCurrentEmp ? 'Role 02' : 'Role 01'}
                    </span>
                  </div>

                  {/* Profile Info */}
                    <div className="flex items-center gap-3">
                      

                    <p className="text-[12px] text-[#71717A] leading-relaxed line-clamp-3">
                      {p.bio}
                    </p>
                  </div>

                  {/* Permitted Views Badges */}
                  <div className="space-y-2 pt-3 border-t border-[#27272A]/80">
                    <div className="text-[10px] font-bold text-[#71717A] uppercase tracking-wider flex items-center justify-between">
                      <span>Accessible Pages</span>
                      {isManager ? (
                        <span className="text-[10px] text-[#22C55E] font-medium flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" /> Dashboard Access
                        </span>
                      ) : (
                        <span className="text-[10px] text-[#71717A] font-medium flex items-center gap-1">
                          <Users className="w-3 h-3" /> Standard Access
                        </span>
                      )}
                    </div>

                    <div className="flex flex-wrap gap-1.5">
                      {isManager ? (
                        <>
                          <span className="px-2 py-0.5 rounded-md text-[11px] font-medium bg-[#EF2B2D]/15 text-[#EF2B2D] border border-[#EF2B2D]/30 flex items-center gap-1">
                            <BarChart3 className="w-3 h-3" /> Dashboard
                          </span>
                          <span className="px-2 py-0.5 rounded-md text-[11px] font-medium bg-[#1F1F23] text-[#A1A1AA] border border-[#2E2E33] flex items-center gap-1">
                            <Layers className="w-3 h-3" /> Capture
                          </span>
                          <span className="px-2 py-0.5 rounded-md text-[11px] font-medium bg-[#1F1F23] text-[#A1A1AA] border border-[#2E2E33] flex items-center gap-1">
                            <Search className="w-3 h-3" /> Ask
                          </span>
                        </>
                      ) : (
                        <>
                          <span className={`px-2 py-0.5 rounded-md text-[11px] font-medium border flex items-center gap-1 ${
                            isCurrentEmp 
                              ? 'bg-[#FF6A00]/15 text-[#FF6A00] border-[#FF6A00]/30' 
                              : 'bg-[#1F1F23] text-[#A1A1AA] border-[#2E2E33]'
                          }`}>
                            <Layers className="w-3 h-3" /> Capture
                          </span>
                          <span className={`px-2 py-0.5 rounded-md text-[11px] font-medium border flex items-center gap-1 ${
                            isNewHire 
                              ? 'bg-[#3B82F6]/15 text-[#3B82F6] border-[#3B82F6]/30' 
                              : 'bg-[#1F1F23] text-[#A1A1AA] border-[#2E2E33]'
                          }`}>
                            <Search className="w-3 h-3" /> Ask
                          </span>
                          <span className="px-2 py-0.5 rounded-md text-[11px] font-medium bg-[#141414] text-[#52525B] border border-[#27272A] flex items-center gap-1 opacity-50">
                            <Lock className="w-2.5 h-2.5" /> No Dashboard
                          </span>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Destination Action Button CTA */}
                  <div className={`pt-3 border-t border-[#27272A] flex items-center justify-between text-[13px] font-semibold ${
                    isManager ? 'text-[#EF2B2D]' : isCurrentEmp ? 'text-[#FF6A00]' : 'text-[#3B82F6]'
                  }`}>
                    <span>
                      {getButtonText(p.type)}
                    </span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                  </div>
                </motion.button>
              )
            })}
          </motion.div>

          {/* Security & Feature Badges */}
          <motion.div 
            variants={itemVariants} 
            className="mt-12 flex flex-wrap items-center justify-center gap-6 text-[12px] text-[#71717A] font-mono"
          >
            <div className="flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-[#22C55E]" />
              <span>Automated PII Redaction</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-[#FF6A00]" />
              <span>Progressive AI Extraction</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-[#3B82F6]" />
              <span>Grounded Source Citations</span>
            </div>
          </motion.div>
        </motion.div>
      </main>

      {/* Footer */}
      <motion.footer 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="w-full max-w-7xl mx-auto px-6 py-5 border-t border-[#1C1C1F] text-center text-[11px] text-[#52525B] font-mono z-10 shrink-0"
      >
        <span>Knowledge Continuity · Hackathon MVP Demo · Mock Data Sandbox Enabled</span>
      </motion.footer>
    </div>
  )
}

export default LoginPage