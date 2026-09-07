import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div>
        <header className="fixed top-0 left-0 right-0 z-50 bg-surface/90 backdrop-blur-md border-b border-surface-container-highest">
    <div className="h-20 max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop flex items-center justify-between">
      <a
        className="flex items-center gap-space-xs group"
        data-path="product"
        href="#"
      >
        <span className="font-headline-md text-headline-md text-primary tracking-tight">
          KnowledgeContinuity
        </span>
        <span className="font-code-md text-code-md text-secondary tracking-widest uppercase border border-outline-variant px-1.5 py-0.5">
          EDITION v4
        </span>
      </a>
      <nav
        className="hidden md:flex items-center gap-space-xl"
        data-active-classes="text-primary font-bold border-b-2 border-primary"
      >
        <Link
          aria-current="page"
          className="uppercase tracking-wider transition-colors py-1 text-primary font-bold border-b-2 border-primary"
          data-path="product"
          to="/"
        >
          Product
        </Link>
        <Link
          className="font-label-md text-label-md uppercase tracking-wider text-on-surface-variant hover:text-on-surface transition-colors py-1"
          data-path="how-it-works"
          to="/capture"
        >
          Capture
        </Link>
        <Link
          className="font-label-md text-label-md uppercase tracking-wider text-on-surface-variant hover:text-on-surface transition-colors py-1"
          data-path="pricing"
          to="/ask"
        >
          Ask
        </Link>
        <Link
          className="font-label-md text-label-md uppercase tracking-wider text-on-surface-variant hover:text-on-surface transition-colors py-1"
          data-path="login"
          to="/problems"
        >
          Problems
        </Link>
      </nav>
      <div className="flex items-center gap-space-md">
        <Link
          className="inline-flex items-center justify-center h-10 px-space-lg bg-primary-container text-surface font-label-md text-label-md uppercase tracking-wider border border-secondary hover:bg-primary transition-all duration-150 rounded-full"
          data-path="signup"
          to="/login"
        >
          Sign up
        </Link>
        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
          <span className="material-symbols-outlined text-on-primary text-[18px]">
            person
          </span>
        </div>
      </div>
    </div>
  </header>
    </div>
  )
}

export default Navbar