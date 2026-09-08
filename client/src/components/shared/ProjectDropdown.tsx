import React, { useEffect, useState } from 'react'
import api from '../../services/api'

export interface Project {
  id: string
  name: string
}

interface ProjectDropdownProps {
  /** Currently selected project id, or null for "All projects". Controlled by the parent. */
  value: string | null
  onChange: (projectId: string | null) => void
  /** Whether to include an "All projects" option. Defaults to true. */
  allowAll?: boolean
  /** Visual size. 'sm' fits inline in a command bar, 'md' is the default standalone size. */
  size?: 'sm' | 'md'
  className?: string
}

const ProjectDropdown: React.FC<ProjectDropdownProps> = ({
  value,
  onChange,
  allowAll = true,
  size = 'md',
  className = '',
}) => {
  const [projects, setProjects] = useState<Project[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    let cancelled = false

    api
      .get('/projects')
      .then((res) => {
        if (!cancelled) setProjects(res.data.projects ?? res.data)
      })
      .catch(() => {
        if (!cancelled) setHasError(true)
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [])

  const sizeClasses =
    size === 'sm'
      ? 'text-[12px] py-1.5 pl-3 pr-7'
      : 'text-[14px] py-2.5 pl-3.5 pr-8'

  return (
    <div className={`relative inline-flex items-center ${className}`}>
      <select
        value={value ?? ''}
        onChange={(e) => onChange(e.target.value || null)}
        disabled={isLoading || hasError}
        className={`appearance-none rounded-full border border-[#223148]/20 bg-white text-[#0c1c32] font-body-md font-medium outline-none cursor-pointer disabled:cursor-not-allowed disabled:opacity-60 focus:border-[#223148] transition-colors ${sizeClasses}`}
      >
        {allowAll && <option value="">All projects</option>}
        {projects.map((p) => (
          <option key={p.id} value={p.id}>
            {p.name}
          </option>
        ))}
      </select>

      <span className="pointer-events-none absolute right-2.5 flex items-center">
        <span
          className={`material-symbols-outlined text-[16px] text-[#505f78] ${
            isLoading ? 'animate-spin' : ''
          }`}
        >
          {isLoading ? 'progress_activity' : 'expand_more'}
        </span>
      </span>

      {hasError && (
        <span className="ml-2 font-code-md text-[10px] text-[#B85C38]">
          Couldn't load projects
        </span>
      )}
    </div>
  )
}

export default ProjectDropdown