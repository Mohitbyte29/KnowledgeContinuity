import React, { createContext, useContext, useEffect, useState } from 'react'
import type { PersonaType } from '../components/shared/PersonaSelector'

const STORAGE_KEY = 'kc_user_context'

interface StoredState {
  persona: PersonaType | null
  selectedProjectId: string | null
}

interface UserContextValue {
  persona: PersonaType | null
  setPersona: (persona: PersonaType | null) => void
  /** Matches ProjectDropdown's value/onChange contract directly — pass these straight through. */
  selectedProjectId: string | null
  setSelectedProjectId: (projectId: string | null) => void
  /** True once a persona has been selected on LoginPage. */
  isAuthenticated: boolean
  /** Resets persona and selected project, e.g. for a "switch persona" action during a demo. */
  logout: () => void
}

const UserContext = createContext<UserContextValue | undefined>(undefined)

const loadStored = (): StoredState => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return { persona: null, selectedProjectId: null }
    const parsed = JSON.parse(raw)
    return {
      persona: parsed.persona ?? null,
      selectedProjectId: parsed.selectedProjectId ?? null,
    }
  } catch {
    // localStorage unavailable (private browsing, SSR, etc.) — fall back to in-memory only
    return { persona: null, selectedProjectId: null }
  }
}

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [persona, setPersonaState] = useState<PersonaType | null>(() => loadStored().persona)
  const [selectedProjectId, setSelectedProjectIdState] = useState<string | null>(
    () => loadStored().selectedProjectId
  )

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ persona, selectedProjectId }))
    } catch {
      // ignore — persistence is a nice-to-have, not a requirement
    }
  }, [persona, selectedProjectId])

  const setPersona = (next: PersonaType | null) => setPersonaState(next)
  const setSelectedProjectId = (next: string | null) => setSelectedProjectIdState(next)

  const logout = () => {
    setPersonaState(null)
    setSelectedProjectIdState(null)
    try {
      localStorage.removeItem(STORAGE_KEY)
    } catch {
      // ignore
    }
  }

  const value: UserContextValue = {
    persona,
    setPersona,
    selectedProjectId,
    setSelectedProjectId,
    isAuthenticated: persona !== null,
    logout,
  }

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

export const useUserContext = (): UserContextValue => {
  const ctx = useContext(UserContext)
  if (!ctx) {
    throw new Error('useUserContext must be used within a <UserProvider>')
  }
  return ctx
}

export default UserContext