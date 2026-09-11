import React, { createContext, useContext, useEffect, useState } from 'react'
import type { Persona } from '../types'
import { MOCK_PERSONAS } from '../data/mockData'

const STORAGE_KEY = 'kc_user_context'

interface StoredState {
  persona: Persona | null
  selectedProjectId: string
}

interface UserContextValue {
  persona: Persona | null
  setPersona: (persona: Persona | null) => void
  selectedProjectId: string
  setSelectedProjectId: (projectId: string) => void
  isAuthenticated: boolean
  logout: () => void
  personas: Persona[]
}

const UserContext = createContext<UserContextValue | undefined>(undefined)

const loadStored = (): StoredState => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return { persona: MOCK_PERSONAS[0], selectedProjectId: 'Payments Team' }
    const parsed = JSON.parse(raw)
    return {
      persona: parsed.persona ?? MOCK_PERSONAS[0],
      selectedProjectId: parsed.selectedProjectId ?? 'Payments Team',
    }
  } catch {
    return { persona: MOCK_PERSONAS[0], selectedProjectId: 'Payments Team' }
  }
}

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [persona, setPersonaState] = useState<Persona | null>(() => loadStored().persona)
  const [selectedProjectId, setSelectedProjectIdState] = useState<string>(
    () => loadStored().selectedProjectId
  )

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ persona, selectedProjectId }))
    } catch {
      // ignore
    }
  }, [persona, selectedProjectId])

  const setPersona = (next: Persona | null) => setPersonaState(next)
  const setSelectedProjectId = (next: string) => setSelectedProjectIdState(next)

  const logout = () => {
    setPersonaState(null)
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
    personas: MOCK_PERSONAS,
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