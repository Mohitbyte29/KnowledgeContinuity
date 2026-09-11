import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'motion/react'
import { useUserContext } from '../../context/UserContext'
import { 
  Brain, 
  Search, 
  ChevronDown, 
  LogOut, 
  Check, 
  Layers,
  BarChart3
} from 'lucide-react'

export const Navbar: React.FC = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { persona, setPersona, personas } = useUserContext()
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const isCapture = location.pathname === '/capture'
  const isAsk = location.pathname === '/ask'
  const isDashboard = location.pathname === '/dashboard'

  const handleSelectPersona = (p: typeof personas[0]) => {
    setPersona(p)
    setIsDropdownOpen(false)
    if (p.type === 'manager') {
      navigate('/dashboard')
    } else if (p.type === 'current_employee' || p.type === 'departing') {
      navigate('/capture')
    } else {
      navigate('/ask')
    }
  }

  const handleLogout = () => {
    setIsDropdownOpen(false)
    navigate('/login')
  }

  return (
    <header className="sticky top-0 z-50 w-full glass-nav bg-[#0A0A0A]/90 border-b border-[#27272A]/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        
        {/* Left: Brand Identity */}
        <div className="flex items-center gap-6">
          <Link 
            to={persona?.type === 'manager' ? '/dashboard' : (persona?.type === 'current_employee' || persona?.type === 'departing') ? '/capture' : '/ask'} 
            className="flex items-center gap-3 group transition-transform active:scale-95"
          >
            <motion.div 
              whileHover={{ rotate: 10, scale: 1.05 }}
              className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#FF6A00] to-[#EF2B2D] flex items-center justify-center text-white shadow-lg shadow-[#FF6A00]/20 group-hover:shadow-[#FF6A00]/40 transition-all duration-300"
            >
              <Brain className="w-5 h-5 text-white" />
            </motion.div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <Link to="/login" className="font-bold text-[16px] sm:text-[17px] tracking-tight text-white group-hover:text-[#FF6A00] transition-colors">
                  Knowledge Continuity
                </Link>
                <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#FF6A00]/10 text-[#FF6A00] border border-[#FF6A00]/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF6A00] animate-pulse" />
                  AI MEMORY
                </span>
              </div>
              <span className="text-[11px] text-[#71717A] hidden md:block">
                Continuous Capture · Instant Retrieval
              </span>
            </div>
          </Link>
        </div>

        {/* Center: Navigation Tabs */}
        <nav className="flex items-center bg-[#141414] border border-[#27272A] rounded-xl p-1 gap-1 shadow-inner">
          <Link
            to="/capture"
            className={`relative flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 rounded-lg text-[13px] font-semibold transition-all duration-200 ${
              isCapture
                ? 'bg-gradient-to-r from-[#FF6A00] to-[#EF2B2D] text-white shadow-md shadow-[#FF6A00]/25'
                : 'text-[#A1A1AA] hover:text-white hover:bg-[#1f1f23]'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Capture</span>
          </Link>

          <Link
            to="/ask"
            className={`relative flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 rounded-lg text-[13px] font-semibold transition-all duration-200 ${
              isAsk
                ? 'bg-gradient-to-r from-[#FF6A00] to-[#EF2B2D] text-white shadow-md shadow-[#FF6A00]/25'
                : 'text-[#A1A1AA] hover:text-white hover:bg-[#1f1f23]'
            }`}
          >
            <Search className="w-4 h-4" />
            <span>Ask</span>
          </Link>

          {persona?.type === 'manager' && (
            <Link
              to="/dashboard"
              className={`relative flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 rounded-lg text-[13px] font-semibold transition-all duration-200 ${
                isDashboard
                  ? 'bg-gradient-to-r from-[#FF6A00] to-[#EF2B2D] text-white shadow-md shadow-[#FF6A00]/25'
                  : 'text-[#A1A1AA] hover:text-white hover:bg-[#1f1f23]'
              }`}
            >
              <BarChart3 className="w-4 h-4" />
              <span>Dashboard</span>
            </Link>
          )}
        </nav>

        {/* Right: Persona & Quick Switcher */}
        <div className="relative">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-[#141414] hover:bg-[#1c1c20] border border-[#27272A] hover:border-[#FF6A00]/40 transition-all text-left group"
          >
            <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-[#27272A] to-[#3F3F46] border border-[#3F3F46] text-white text-[12px] font-bold flex items-center justify-center group-hover:border-[#FF6A00]/50 transition-colors">
              {persona?.avatarInitials || 'PS'}
            </div>
            <div className="hidden sm:flex flex-col">
              <span className="text-[13px] font-semibold text-white leading-tight">
                {persona?.name || 'Priya Sharma'}
              </span>
              <span className="text-[10px] text-[#A1A1AA] truncate max-w-[150px]">
                {persona?.badgeLabel || 'Departing Employee'}
              </span>
            </div>
            <ChevronDown className={`w-3.5 h-3.5 text-[#71717A] group-hover:text-white transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
          </motion.button>

          {/* Persona Switcher Dropdown */}
          <AnimatePresence>
            {isDropdownOpen && (
              <>
                <div 
                  className="fixed inset-0 z-40" 
                  onClick={() => setIsDropdownOpen(false)} 
                />
                <motion.div 
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 mt-2 w-72 rounded-2xl bg-[#141414] border border-[#27272A] shadow-2xl p-2.5 z-50"
                >
                  <div className="px-3 py-2 border-b border-[#27272A] mb-1.5 flex items-center justify-between">
                    <span className="text-[11px] font-bold text-[#71717A] uppercase tracking-wider">
                      Switch Active Persona
                    </span>
                    <span className="text-[10px] text-[#FF6A00] font-semibold">Demo Sandbox</span>
                  </div>

                  <div className="space-y-1">
                    {personas.map((p) => {
                      const isCurrent = p.id === persona?.id
                      return (
                        <motion.button
                          key={p.id}
                          whileHover={{ x: 3 }}
                          onClick={() => handleSelectPersona(p)}
                          className={`w-full flex items-start gap-2.5 p-2.5 rounded-xl text-left transition-all ${
                            isCurrent
                              ? 'bg-[#FF6A00]/10 border border-[#FF6A00]/30 text-white'
                              : 'hover:bg-[#1f1f23] text-[#A1A1AA] hover:text-white'
                          }`}
                        >
                          <div 
                            className="w-7 h-7 rounded-lg flex items-center justify-center font-bold text-[11px] text-white shrink-0 mt-0.5"
                            style={{ backgroundColor: p.highlightColor || '#FF6A00' }}
                          >
                            {p.avatarInitials}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <span className="text-[13px] font-semibold text-white truncate">
                                {p.name}
                              </span>
                              {isCurrent && <Check className="w-3.5 h-3.5 text-[#FF6A00]" />}
                            </div>
                            <p className="text-[11px] text-[#A1A1AA] truncate">
                              {p.badgeLabel}
                            </p>
                          </div>
                        </motion.button>
                      )
                    })}
                  </div>

                  <div className="border-t border-[#27272A] mt-2 pt-1.5">
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-[12px] font-medium text-[#A1A1AA] hover:text-white hover:bg-[#1f1f23] transition-colors"
                    >
                      <LogOut className="w-3.5 h-3.5 text-[#EF2B2D]" />
                      <span>Return to Login Screen</span>
                    </button>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>

      </div>
    </header>
  )
}

export default Navbar
