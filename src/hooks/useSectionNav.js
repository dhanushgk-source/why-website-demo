import { useNavigate, useLocation } from 'react-router-dom'
import { scrollToId } from '../utils/scrollNav'

/**
 * Returns a function goToSection(sectionId) that:
 * - scrolls directly to the section if we're already on the home page
 * - otherwise navigates to "/" first, then scrolls once Home has mounted
 *
 * This fixes links like "Services" / "How it Works" / "Safety" in the
 * Navbar and Footer, which previously used bare `#section-id` anchors or
 * `document.getElementById(...)` and silently did nothing on any page
 * other than the home page (About, FAQ, Contact, etc.).
 */
export function useSectionNav() {
  const navigate = useNavigate()
  const location = useLocation()

  return function goToSection(sectionId) {
    if (location.pathname === '/') {
      scrollToId(sectionId)
    } else {
      navigate('/', { state: { scrollTo: sectionId } })
    }
  }
}
