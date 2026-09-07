import React from 'react'

const Footer = () => {
  return (
    <div>
        <footer className="w-full bg-primary-container text-surface border-t border-secondary">
    <div className="max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop pt-space-3xl pb-space-2xl">
      <div className="flex flex-col md:flex-row items-start md:items-baseline justify-between gap-space-xl pb-space-xl border-b border-surface-variant/20">
        <div className="space-y-space-xs">
          <span className="font-headline-md text-headline-md text-surface tracking-tight block">
            KnowledgeContinuity
          </span>
          <p className="font-body-sm text-body-sm text-on-primary-container max-w-md">
            Editorial-grade systems intelligence and institutional continuity
            for enterprise engineering organisations.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-space-lg font-label-md text-label-md uppercase tracking-wider text-on-primary-container">
          <a
            className="hover:text-surface transition-colors"
            data-path="documentation"
            href="#"
          >
            Documentation
          </a>
          <a
            className="hover:text-surface transition-colors"
            data-path="security"
            href="#"
          >
            Security
          </a>
          <a
            className="hover:text-surface transition-colors"
            data-path="privacy"
            href="#"
          >
            Privacy
          </a>
          <a
            className="hover:text-surface transition-colors"
            data-path="status"
            href="#"
          >
            Status
          </a>
        </div>
      </div>
      <div className="pt-space-lg flex flex-col sm:flex-row items-center justify-between gap-space-sm font-code-md text-code-md text-on-primary-container">
        <p>
          © 2025 KnowledgeContinuity Inc. Archival Modernism Protocol. All
          rights reserved.
        </p>
        <div className="flex items-center gap-space-xs">
          <span className="w-2 h-2 rounded-full bg-secondary-container inline-block" />
          <span>Systems Operative: ISO-27001 / SOC-2 Type II</span>
        </div>
      </div>
    </div>
  </footer>
    </div>
  )
}

export default Footer