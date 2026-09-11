import React from 'react'
import { motion } from 'motion/react'
import { Brain, Search, ArrowRight, Zap } from 'lucide-react'

interface EmptyStatePresetsProps {
  onSelectQuery: (query: string) => void
  className?: string
}

const PRESETS = [
  {
    query: 'How do we handle Stripe webhook retries and 429 rate limits?',
    topic: 'Webhooks & Rate Limiting',
    badge: 'Stripe API',
    color: '#FF6A00',
  },
  {
    query: 'Why did the payment batch job timeout during midnight settlement?',
    topic: 'Redis & Distributed Locks',
    badge: 'Settlement Ledger',
    color: '#3B82F6',
  },
  {
    query: 'Who owns the fallback manual DNS failover switch if primary Aurora locks up?',
    topic: 'Disaster Recovery & KMS',
    badge: 'Aurora PostgreSQL',
    color: '#EF2B2D',
  },
]

export const EmptyStatePresets: React.FC<EmptyStatePresetsProps> = ({
  onSelectQuery,
  className = '',
}) => {
  return (
    <div className={`flex flex-col items-center justify-center text-center py-10 px-4 max-w-2xl mx-auto ${className}`}>
      {/* Glowing AI Icon */}
      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative mb-6"
      >
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#FF6A00] to-[#EF2B2D] flex items-center justify-center text-white shadow-2xl shadow-[#FF6A00]/30 animate-pulse-subtle">
          <Brain className="w-8 h-8 text-white" />
        </div>
        <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#22C55E] border-2 border-[#0A0A0A] flex items-center justify-center">
          <Zap className="w-3 h-3 text-black fill-black" />
        </div>
      </motion.div>

      {/* Hero Headline */}
      <h2 className="text-[24px] sm:text-[28px] font-bold text-white tracking-tight mb-2">
        Instant Institutional Knowledge
      </h2>
      <p className="text-[14px] text-[#A1A1AA] leading-relaxed max-w-lg mb-8">
        Ask any engineering, incident, or architecture question. AI will synthesize answers directly from departed teammates' verified work history.
      </p>

      {/* Preset Chips Section */}
      <div className="w-full text-left">
        <div className="flex items-center justify-between text-[11px] font-bold text-[#71717A] uppercase tracking-wider mb-3 px-1">
          <span>Try an example query</span>
          <span className="text-[#FF6A00]">Click to ask instantly</span>
        </div>

        <div className="grid grid-cols-1 gap-2.5">
          {PRESETS.map((p, idx) => (
            <motion.button
              key={idx}
              type="button"
              whileHover={{ scale: 1.015, y: -2 }}
              whileTap={{ scale: 0.985 }}
              onClick={() => onSelectQuery(p.query)}
              className="group w-full flex items-center justify-between p-3.5 rounded-2xl bg-[#141414] hover:bg-[#18181B] border border-[#27272A] hover:border-[#FF6A00]/50 transition-all text-left shadow-md hover:shadow-lg hover:shadow-[#FF6A00]/10"
            >
              <div className="flex items-center gap-3 min-w-0">
                <span className="w-7 h-7 rounded-lg bg-[#1F1F23] group-hover:bg-[#FF6A00]/15 text-[#A1A1AA] group-hover:text-[#FF6A00] flex items-center justify-center shrink-0 transition-colors">
                  <Search className="w-3.5 h-3.5" />
                </span>
                <div className="flex flex-col min-w-0">
                  <span className="text-[13px] font-semibold text-white group-hover:text-[#FF6A00] transition-colors truncate">
                    "{p.query}"
                  </span>
                  <span className="text-[11px] text-[#71717A]">
                    {p.topic}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0 ml-2">
                <span className="text-[10px] font-mono font-medium px-2 py-0.5 rounded-md bg-[#1C1C1F] text-[#A1A1AA] border border-[#27272A] hidden sm:inline">
                  {p.badge}
                </span>
                <ArrowRight className="w-4 h-4 text-[#71717A] group-hover:text-white group-hover:translate-x-1 transition-all" />
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default EmptyStatePresets
