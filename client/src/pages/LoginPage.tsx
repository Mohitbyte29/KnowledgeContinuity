import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PersonaSelector, { PersonaType } from '../components/shared/PersonaSelector'
import { useUserContext } from '../context/UserContext'
import api from '../services/api'

const LoginPage: React.FC = () => {
  const navigate = useNavigate()
  const { setPersona } = useUserContext()

  const [selectedPersona, setSelectedPersona] = useState<PersonaType | null>(null)
  const [isLoggingIn, setIsLoggingIn] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSelect = async (persona: PersonaType, destination: '/capture' | '/ask') => {
    setSelectedPersona(persona)
    setIsLoggingIn(true)
    setError(null)

    try {
      await api.post('/auth/login', { persona })
      setPersona(persona)
      navigate(destination)
    } catch (err) {
      setError("Couldn't sign in — try again in a moment.")
      setSelectedPersona(null)
    } finally {
      setIsLoggingIn(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#fbf7f2] flex flex-col items-center justify-center px-5 py-16">
      <div className="w-full max-w-3xl flex flex-col items-center gap-10">
        {/* Brand */}
        <div className="flex flex-col items-center gap-2 text-center">
          <div className="flex items-baseline gap-2.5">
            <span className="font-display font-semibold text-[26px] tracking-tight text-[#0c1c32]">
              KnowledgeContinuity
            </span>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 border border-[#223148]/30 rounded-full bg-[#f0e7dd]/60 font-code-md text-[10px] tracking-widest text-[#223148] font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-[#2D5A3D] animate-pulse" />
              EDITION V4
            </span>
          </div>
          <p className="font-body-lead text-[16px] text-[#44474d] max-w-md">
            Who's using it today? This decides where you land.
          </p>
        </div>

        {/* Persona selection */}
        <div className="w-full flex flex-col gap-3">
          <PersonaSelector
            onSelect={handleSelect}
            selectedPersona={selectedPersona}
            isLoading={isLoggingIn}
            className="w-full"
          />

          {error && (
            <div className="flex items-center gap-2 justify-center text-[#B85C38] font-body-sm text-[13px]">
              <span className="material-symbols-outlined text-[16px]">error</span>
              {error}
            </div>
          )}
        </div>

        {/* Footnote */}
        <p className="font-code-md text-[11px] text-[#8a99b5] tracking-wide uppercase text-center">
          Demo build · seeded data only · nothing here reaches a real integration
        </p>
      </div>
    </div>
  )
}

export default LoginPage