import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSectionNav } from '../hooks/useSectionNav'
import { getWhatsAppLink, PHONE_LINK } from '../config/contact'

// Each item is either a same-page section (`section`) which needs to work
// from any route, or a real route (`path`) handled by react-router.
const NAV_ITEMS = [
  { label: 'Services', section: 'experience-section' },
  { label: 'How it Works', section: 'WHY-Works-section' },
  { label: 'Safety', section: 'savefty-section' },
  { label: 'About', path: '/about' },
]

const WHATSAPP_GREEN = '#25D366'
const WHATSAPP_BORDER = '#2F4A7D'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [visible, setVisible] = useState(false)
  const goToSection = useSectionNav()

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100)

    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      clearTimeout(timer)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const toggleMenu = () => {
    setMenuOpen(!menuOpen)
  }

  const handleNavClick = (item) => {
    setMenuOpen(false)
    if (item.section) goToSection(item.section)
  }

  // Shared hover handlers for the WhatsApp button (desktop + mobile)
  const whatsappHoverIn = (e) => {
    e.currentTarget.style.background = WHATSAPP_GREEN
    e.currentTarget.style.borderColor = WHATSAPP_GREEN
    e.currentTarget.style.color = '#FFFFFF'
  }
  const whatsappHoverOut = (e) => {
    e.currentTarget.style.background = 'transparent'
    e.currentTarget.style.borderColor = WHATSAPP_BORDER
    e.currentTarget.style.color = WHATSAPP_BORDER
  }

  return (
    <>
      {/* NAVBAR */}
      <header className="fixed top-0 left-0 w-full z-[9999]">
        <nav
          className={`
            grid grid-cols-3 items-center
            gap-x-4
            px-6 lg:px-12 h-20
            transition-all duration-500 ease-in-out
            ${visible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 -translate-y-10'
            }
          `}
          style={{
            background: scrolled ? '#F7F3EA' : 'rgba(247, 243, 234, 0.8)',
            backdropFilter: scrolled ? 'none' : 'blur(12px)',
            WebkitBackdropFilter: scrolled ? 'none' : 'blur(12px)',
            boxShadow: scrolled ? '0 4px 20px rgba(27,42,74,0.08)' : 'none',
          }}
        >
          {/* LOGO */}
          <div className="flex justify-start">
            <Link to="/" onClick={() => setMenuOpen(false)}>
              <img
                src="/Assests/WHY_logo.png"
                alt="WHY Logo"
                className="h-14 transition duration-300 hover:scale-105"
              />
            </Link>
          </div>

          {/* DESKTOP MENU */}
          <ul className="hidden xl:flex justify-center gap-8 font-medium">
            {NAV_ITEMS.map((item) => (
              <li
                key={item.label}
                className="relative group"
                style={{ color: '#1B2A4A' }}
              >
                {item.path ? (
                  <Link
                    to={item.path}
                    className="transition-colors duration-300 whitespace-nowrap"
                    onMouseEnter={(e) => (e.currentTarget.style.color = '#52B5BD')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = '')}
                  >
                    {item.label}
                  </Link>
                ) : (
                  <button
                    onClick={() => handleNavClick(item)}
                    className="transition-colors duration-300 whitespace-nowrap"
                    onMouseEnter={(e) => (e.currentTarget.style.color = '#52B5BD')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = '')}
                  >
                    {item.label}
                  </button>
                )}

                <span
                  className="
                    absolute left-0 -bottom-1
                    h-[2px] w-full
                    scale-x-0
                    origin-left
                    transition-transform
                    duration-300
                    group-hover:scale-x-100
                  "
                  style={{ background: '#52B5BD' }}
                />
              </li>
            ))}
          </ul>

          {/* MOBILE CENTER BRAND */}
          <div className="flex xl:hidden justify-center">
            <span
              className="font-display font-bold text-xl tracking-wide"
              style={{ color: '#1B2A4A' }}
            >
              WHY
            </span>
          </div>

          {/* DESKTOP BUTTONS */}
          <div className="hidden xl:flex justify-end items-center gap-4">
            <a
              href={getWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={whatsappHoverIn}
              onMouseLeave={whatsappHoverOut}
              className="px-6 py-3 rounded-full font-semibold shadow-sm hover:scale-105 transition whitespace-nowrap"
              style={{
                color: WHATSAPP_BORDER,
                border: `2px solid ${WHATSAPP_BORDER}`,
                background: 'transparent',
              }}
            >
              Book on WhatsApp
            </a>

            <a
              href={PHONE_LINK}
              className="px-8 py-3 rounded-full text-white shadow-md hover:scale-105 transition whitespace-nowrap"
              style={{ background: 'linear-gradient(135deg, #52B5BD, #2F4A7D)' }}
            >
              Book via Call
            </a>
          </div>

          {/* MOBILE TOGGLE */}
          <div
            className="xl:hidden absolute right-6 cursor-pointer"
            onClick={toggleMenu}
            style={{ color: '#1B2A4A' }}
          >
            <i
              className={`fa-solid ${menuOpen ? 'fa-xmark' : 'fa-bars'
                } fa-lg`}
            ></i>
          </div>
        </nav>

        {/* MOBILE MENU */}
        <div
          className={`
            xl:hidden
            overflow-hidden
            transition-all duration-300
            shadow-lg
            ${menuOpen ? 'max-h-96' : 'max-h-0'}
          `}
          style={{ background: '#F7F3EA' }}
        >
          <ul className="text-center font-medium" style={{ color: '#1B2A4A' }}>
            {NAV_ITEMS.map((item) => (
              <li key={item.label} className="py-4 border-b border-[#F2C89F]/40">
                {item.path ? (
                  <Link to={item.path} onClick={() => setMenuOpen(false)}>
                    {item.label}
                  </Link>
                ) : (
                  <button onClick={() => handleNavClick(item)}>
                    {item.label}
                  </button>
                )}
              </li>
            ))}
          </ul>

          <div className="p-6 flex flex-col gap-4">
            <a
              href={getWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMenuOpen(false)}
              onMouseEnter={whatsappHoverIn}
              onMouseLeave={whatsappHoverOut}
              className="block w-full py-3 rounded-full font-semibold text-center"
              style={{
                color: WHATSAPP_BORDER,
                border: `2px solid ${WHATSAPP_BORDER}`,
                background: 'transparent',
              }}
            >
              Book on WhatsApp
            </a>

            <a
              href={PHONE_LINK}
              onClick={() => setMenuOpen(false)}
              className="block w-full py-3 rounded-full text-white text-center"
              style={{ background: 'linear-gradient(135deg, #52B5BD, #2F4A7D)' }}
            >
              Book via Call
            </a>
          </div>
        </div>
      </header>

      {/* IMPORTANT SPACER */}
      <div className="h-20"></div>
    </>
  )
}