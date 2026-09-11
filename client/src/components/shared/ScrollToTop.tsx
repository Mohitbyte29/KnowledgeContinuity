import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * Automatically scrolls window and document/containers to the top (0, 0)
 * whenever the route pathname or search parameters change.
 */
export const ScrollToTop: React.FC = () => {
  const { pathname, search } = useLocation()

  useEffect(() => {
    // 1. Instant window scroll
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant' as ScrollBehavior,
    })

    // 2. Document level scroll reset
    if (document.documentElement) {
      document.documentElement.scrollTop = 0
    }
    if (document.body) {
      document.body.scrollTop = 0
    }

    // 3. Any scrollable container elements in the DOM
    const scrollableElements = document.querySelectorAll<HTMLElement>(
      'div, main, section, [data-scroll-container]'
    )
    scrollableElements.forEach((el) => {
      if (el.scrollTop > 0) {
        el.scrollTop = 0
      }
    })
  }, [pathname, search])

  return null
}

export default ScrollToTop
