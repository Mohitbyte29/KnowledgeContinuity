import React from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, type Variants } from 'motion/react'
import { useUserContext } from '../context/UserContext'
import type { Persona } from '../types'
import { 
  Brain, 
  Sparkles, 
  ArrowRight, 
  Layers, 
  Search, 
  ShieldCheck, 
  Zap,
  Lock
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
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  },
}

export const LoginPage: React.FC = () => {
  const navigate = useNavigate()
  const { personas, setPersona } = useUserContext()

  const handleSelectPersona = (p: Persona) => {
    setPersona(p)
    if (p.type === 'departing') {
      navigate('/capture')
    } else {
      navigate('/ask')
    }
  }

  const getButtonText = (type: string) => {
  if (type === 'manager') return 'Enter Manager Dashboard'
  if (type === 'new_hire') return 'Enter Knowledge Search'
  return 'Enter Capture Search'
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
          <span>HACKATHON MVP EDITION</span>
        </div>
      </motion.header>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 py-12 z-10 max-w-5xl mx-auto w-full">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="w-full flex flex-col items-center"
        >
          {/* Title & Tagline */}
          <motion.div variants={itemVariants} className="text-center max-w-2xl mx-auto mb-12 space-y-4">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FF6A00]/10 border border-[#FF6A00]/30 text-[12px] font-semibold text-[#FF6A00] shadow-sm cursor-default"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>AI Knowledge Capture &amp; Retrieval</span>
            </motion.div>

            <h1 className="text-[38px] sm:text-[48px] md:text-[54px] font-black text-white tracking-tight leading-[1.08]">
              Knowledge Continuity
            </h1>

            <p className="text-[18px] sm:text-[21px] font-medium text-[#A1A1AA] max-w-xl mx-auto leading-relaxed">
              Capture what leaves. Retrieve when it's needed.
            </p>

            <p className="text-[13px] text-[#71717A] max-w-md mx-auto leading-normal">
              Select a persona below to explore continuous daily capture, automated offboarding gap extraction, and instantaneous AI knowledge retrieval.
            </p>
          </motion.div>

          {/* 3 Selectable Persona Cards */}
          <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-5 w-full">
            {personas.map((p, idx) => {
              const isDeparting = p.type === 'departing'
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
                    isDeparting
                      ? 'border-[#FF6A00]/40 hover:border-[#FF6A00] hover:shadow-2xl hover:shadow-[#FF6A00]/20'
                      : 'border-[#27272A] hover:border-[#3B82F6]/60 hover:shadow-2xl hover:shadow-[#3B82F6]/15'
                  }`}
                >
                  {/* Top Badge */}
                  <div className="flex items-start justify-between gap-2">
                    
                    <span 
                      className={`inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border ${
                        isDeparting
                          ? 'bg-[#FF6A00]/15 text-[#FF6A00] border-[#FF6A00]/30'
                          : 'bg-[#3B82F6]/15 text-[#3B82F6] border-[#3B82F6]/30'
                      }`}
                    >
                      {isDeparting ? <Layers className="w-3 h-3" /> : <Search className="w-3 h-3" />}
                      <span>{isDeparting ? 'Departing' : p.type === 'new_hire' ? 'New Hire' : 'Manager'}</span>
                    </span>
                  </div>

                  {/* Destination Action Hint */}
                  <div className={`pt-4 border-t border-[#27272A] flex items-center justify-between text-[12px] font-semibold ${
                    isDeparting ? 'text-[#FF6A00]' : 'text-[#3B82F6]'
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
            className="mt-14 flex flex-wrap items-center justify-center gap-6 text-[12px] text-[#71717A] font-mono"
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
        className="w-full max-w-7xl mx-auto px-6 py-6 border-t border-[#1C1C1F] text-center text-[11px] text-[#52525B] font-mono z-10 shrink-0"
      >
        <span>Knowledge Continuity · Hackathon MVP Demo · Mock Data Sandbox Enabled</span>
      </motion.footer>
    </div>
  )
}

export default LoginPage