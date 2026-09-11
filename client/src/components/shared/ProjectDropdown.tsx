import React, { useState } from 'react'
import { ChevronDown, FolderGit2, Check, Sparkles } from 'lucide-react'

interface ProjectDropdownProps {
  selectedProject: string
  onSelectProject: (project: string) => void
  className?: string
}

const PROJECTS = [
  { id: 'all', label: 'Search all projects', desc: 'Global institutional memory across all teams' },
  { id: 'Payments Team', label: 'Payments Team', desc: 'Stripe, checkout, webhooks, settlement & bank APIs' },
  { id: 'Core Infrastructure', label: 'Core Infrastructure', desc: 'Kubernetes, AWS Aurora, Envoy ingress & caching' },
  { id: 'Auth & Identity', label: 'Auth & Identity', desc: 'OAuth2, JWT authentication, session tokens & RBAC' },
  { id: 'Checkout Flow', label: 'Checkout Flow', desc: 'Frontend cart, tokenization, mobile SDKs & fraud checks' },
]

export const ProjectDropdown: React.FC<ProjectDropdownProps> = ({
  selectedProject,
  onSelectProject,
  className = '',
}) => {
  const [isOpen, setIsOpen] = useState(false)

  const current = PROJECTS.find((p) => p.label === selectedProject || (selectedProject === 'all' && p.id === 'all')) || PROJECTS[1]

  return (
    <div className={`relative inline-block text-left ${className}`}>
      <div className="flex items-center gap-2">
        <span className="text-[13px] text-[#A1A1AA] font-medium hidden sm:inline">
          Searching in:
        </span>
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-[#141414] hover:bg-[#1c1c20] border border-[#27272A] hover:border-[#FF6A00]/50 text-[13px] font-semibold text-white transition-all shadow-sm group"
        >
          <FolderGit2 className="w-3.5 h-3.5 text-[#FF6A00]" />
          <span>{current.label}</span>
          <ChevronDown className="w-3.5 h-3.5 text-[#71717A] group-hover:text-white transition-colors" />
        </button>
      </div>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          <div className="absolute left-0 sm:left-auto sm:right-0 mt-2 w-80 rounded-2xl bg-[#141414] border border-[#27272A] shadow-2xl p-2 z-50 animate-slide-up">
            <div className="px-3 py-2 border-b border-[#27272A] mb-1 flex items-center justify-between">
              <span className="text-[11px] font-bold text-[#71717A] uppercase tracking-wider">
                Select Project Scope
              </span>
              <Sparkles className="w-3.5 h-3.5 text-[#FF6A00]" />
            </div>

            <div className="space-y-1">
              {PROJECTS.map((proj) => {
                const isSelected = selectedProject === proj.label || (selectedProject === 'all' && proj.id === 'all')
                return (
                  <button
                    key={proj.id}
                    type="button"
                    onClick={() => {
                      onSelectProject(proj.label)
                      setIsOpen(false)
                    }}
                    className={`w-full flex items-start gap-2.5 p-2.5 rounded-xl text-left transition-all ${
                      isSelected
                        ? 'bg-[#FF6A00]/10 border border-[#FF6A00]/30 text-white'
                        : 'hover:bg-[#1f1f23] text-[#A1A1AA] hover:text-white'
                    }`}
                  >
                    <FolderGit2 className={`w-4 h-4 shrink-0 mt-0.5 ${isSelected ? 'text-[#FF6A00]' : 'text-[#71717A]'}`} />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="text-[13px] font-semibold text-white truncate">
                          {proj.label}
                        </span>
                        {isSelected && <Check className="w-3.5 h-3.5 text-[#FF6A00]" />}
                      </div>
                      <p className="text-[11px] text-[#71717A] truncate">
                        {proj.desc}
                      </p>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default ProjectDropdown