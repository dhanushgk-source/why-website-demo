// Shared scroll helpers so every component that jumps to an in-page
// section behaves the same way, whether it's called from the home page
// itself or from a completely different route.

export const NAV_OFFSET = 80 // matches the fixed navbar height (h-20)

/**
 * Scrolls to an element by id, accounting for the fixed navbar.
 * Returns true if the element was found, false otherwise.
 */
export function scrollToId(id, offset = NAV_OFFSET) {
  const el = document.getElementById(id)
  if (!el) return false
  const top = el.getBoundingClientRect().top + window.pageYOffset - offset
  window.scrollTo({ top, behavior: 'smooth' })
  return true
}
