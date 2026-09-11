import { Link, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'

const Navbar = () => {
  const location = useLocation()
  const [scrolled, setScrolled] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      setScrolled(scrollTop > 8)
      setScrollProgress(docHeight > 0 ? Math.min(100, (scrollTop / docHeight) * 100) : 0)
    }
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
    }
  }, [])

  // close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false)
  }, [location.pathname])

  const isActive = (to: string) => (to === '/' ? location.pathname === '/' : location.pathname.startsWith(to))

  return (
    <div>
      <header
        className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-md transition-all duration-300 ${
          scrolled
            ? 'bg-surface/95 border-b border-surface-container-highest shadow-[0_4px_20px_rgba(0,0,0,0.06)]'
            : 'bg-surface/70 border-b border-transparent shadow-none'
        }`}
      >
        <div
          className={`max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop flex items-center justify-between transition-all duration-300 ${
            scrolled ? 'h-16' : 'h-20'
          }`}
        >
          {/* Logo */}
          <Link className="flex items-center gap-space-xs group" to="/login" aria-label="Go to login">
            <span className="font-headline-md text-headline-md text-primary tracking-tight transition-transform duration-300 group-hover:-translate-y-0.5">
              KnowledgeContinuity
            </span>
            <span className="font-code-md text-code-md text-secondary tracking-widest uppercase border border-outline-variant px-1.5 py-0.5 transition-colors duration-300 group-hover:border-primary group-hover:text-primary">
              EDITION v4
            </span>
          </Link>

          {/* Desktop nav */}
          

          {/* Right side */}
          <div className="flex items-center gap-space-md">
            <Link
              className="hidden sm:inline-flex items-center justify-center h-10 px-space-lg bg-primary-container text-surface font-label-md text-label-md uppercase tracking-wider border border-secondary hover:bg-primary transition-all duration-200 rounded-full hover:shadow-[0_4px_14px_rgba(0,0,0,0.15)] hover:-translate-y-0.5 active:translate-y-0"
              to="/login"
            >
              Sign up
            </Link>

            {/* Mobile menu toggle */}
            <button
              type="button"
              onClick={() => setMobileOpen((v) => !v)}
              className="md:hidden w-9 h-9 flex items-center justify-center rounded-full text-on-surface-variant hover:text-on-surface hover:bg-surface-container-highest transition-colors"
              aria-label="Toggle menu"
            >
              <span className="material-symbols-outlined text-[22px]">
                {mobileOpen ? 'close' : 'menu'}
              </span>
            </button>
          </div>
        </div>

        {/* Increasing scroll-progress bar */}
        <div className="h-[2px] w-full bg-surface-container-highest/60">
          <div
            className="h-full bg-primary transition-[width] duration-150 ease-out"
            style={{ width: `${scrollProgress}%` }}
          />
        </div>

        {/* Mobile nav panel */}
        <div
          className={`md:hidden overflow-hidden bg-surface border-b border-surface-container-highest transition-all duration-300 ease-out ${
            mobileOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          
        </div>
      </header>
    </div>
  )
} 

export default Navbar