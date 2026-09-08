import React from 'react'

export type PersonaType = 'departing' | 'new_hire' | 'switching'

interface PersonaOption {
  id: PersonaType
  title: string
  description: string
  icon: string
  /** Route this persona should land on after selection — LoginPage reads this to navigate. */
  destination: '/capture' | '/ask'
}

const PERSONAS: PersonaOption[] = [
  {
    id: 'departing',
    title: "I'm leaving something behind",
    description: 'Capture the context only you carry before your next chapter.',
    icon: 'logout',
    destination: '/capture',
  },
  {
    id: 'new_hire',
    title: "I'm new here",
    description: 'Find the decisions, fixes, and shortcuts that matter right now.',
    icon: 'person_add',
    destination: '/ask',
  },
  {
    id: 'switching',
    title: "I'm switching projects",
    description: 'Get up to speed on a team without starting from zero.',
    icon: 'swap_horiz',
    destination: '/ask',
  },
]

interface PersonaSelectorProps {
  /** Called with the persona id and its destination route when a card is clicked. */
  onSelect: (persona: PersonaType, destination: '/capture' | '/ask') => void
  /** Highlights a card as selected, e.g. while the login request for it is in flight. */
  selectedPersona?: PersonaType | null
  /** Disables all cards, e.g. while POST /api/auth/login is pending. */
  isLoading?: boolean
  className?: string
}

const PersonaSelector: React.FC<PersonaSelectorProps> = ({
  onSelect,
  selectedPersona = null,
  isLoading = false,
  className = '',
}) => {
  return (
    <div className={`grid grid-cols-1 sm:grid-cols-3 gap-4 ${className}`}>
      {PERSONAS.map((persona) => {
        const isSelected = selectedPersona === persona.id
        const isPending = isLoading && isSelected

        return (
          <button
            key={persona.id}
            type="button"
            disabled={isLoading}
            onClick={() => onSelect(persona.id, persona.destination)}
            aria-pressed={isSelected}
            className={`group text-left rounded-xl border p-5 flex flex-col gap-3 transition-all disabled:cursor-not-allowed ${
              isSelected
                ? 'border-[#223148] bg-[#223148] text-white shadow-[0_8px_24px_rgba(34,49,72,0.18)]'
                : 'border-[#223148]/15 bg-white hover:border-[#223148]/40 hover:shadow-[0_6px_18px_rgba(34,49,72,0.08)]'
            } ${isLoading && !isSelected ? 'opacity-50' : ''}`}
          >
            <span
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                isSelected ? 'bg-white/15' : 'bg-[#223148]/8 group-hover:bg-[#223148]/12'
              }`}
            >
              <span
                className={`material-symbols-outlined text-[19px] ${
                  isPending ? 'animate-spin' : ''
                } ${isSelected ? 'text-white' : 'text-[#223148]'}`}
              >
                {isPending ? 'progress_activity' : persona.icon}
              </span>
            </span>

            <div className="flex flex-col gap-1">
              <h3
                className={`font-display text-[16px] font-semibold ${
                  isSelected ? 'text-white' : 'text-[#0c1c32]'
                }`}
              >
                {persona.title}
              </h3>
              <p
                className={`font-body-sm text-[13px] leading-relaxed ${
                  isSelected ? 'text-white/75' : 'text-[#505f78]'
                }`}
              >
                {persona.description}
              </p>
            </div>
          </button>
        )
      })}
    </div>
  )
}

export default PersonaSelector