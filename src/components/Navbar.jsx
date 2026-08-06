import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useSectionNav } from '../hooks/useSectionNav'
import { PHONE_LINK, APP_LINK, getWhatsAppLink } from '../config/contact'

// SVG Icon Components
const Icons = {
  ArrowLeft: (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M19 12H5M12 19l-7-7 7-7" />
    </svg>
  ),
  ChevronDown: (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M6 9l6 6 6-6" />
    </svg>
  ),
  Headset: (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
      <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
    </svg>
  ),
  Menu: (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  ),
  Close: (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  ),
}

// Each item is either a same-page section (`section`) which needs to work
// from any route, a real route (`path`) handled by react-router, or a
// `dropdown` containing a list of sub-items (each of which is itself a
// section or path). `tab` is optional — used to switch a tabbed section
// (e.g. CompanionServices) to the right tab before/while scrolling to it.
const NAV_ITEMS = [
  {
    label: 'Services',
    dropdown: [
      { label: 'Hospital Assistance', section: 'Hospital-companion-section', tab: 'hospital' },
      { label: 'Travel Assistance', section: 'Hospital-companion-section', tab: 'travel' },
    ],
  },
  { label: 'Pricing', path: '/pricing' },
  { label: 'Safety', path: '/trust and safety' },
  { label: 'About', path: '/about' },
  { label: 'Careers', path: '/Careers' },
]

const BOOK_OPTIONS = [
  { label: 'Book on App', href: APP_LINK || undefined },
  { label: 'Book via WhatsApp', href: getWhatsAppLink() },
  { label: 'Book via Call', href: PHONE_LINK },
].filter((opt) => opt.href) // hides "Book on App" automatically while APP_LINK is empty

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [visible, setVisible] = useState(false)
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false)
  const [mobileBookOpen, setMobileBookOpen] = useState(false)
  const goToSection = useSectionNav()

  const location = useLocation()
  const navigate = useNavigate()
  const isHome = location.pathname === '/'

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
    setMobileServicesOpen(false)
    setMobileBookOpen(false)

    // Switch the tab first so the section renders the right content
    // before (or as) we scroll to it.
    if (item.tab) {
      window.dispatchEvent(new CustomEvent('why:companion-tab', { detail: { tab: item.tab } }))
    }
    if (item.section) goToSection(item.section)
  }

  const handleBackHome = () => {
    setMenuOpen(false)
    navigate('/')
  }

  return (
    <>
      {/* NAVBAR */}
      <header className="fixed top-0 left-0 w-full z-[9999]">
        <nav
          className={`
            relative
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
          {/* LOGO / BACK — visible on all breakpoints */}
          <div className="flex justify-start items-center gap-3">
            <Link
              to="/"
              onClick={() => setMenuOpen(false)}
              className={isHome ? 'block' : 'hidden sm:block'}
            >
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
                {item.dropdown ? (
                  <>
                    <button
                      className="flex items-center gap-1 transition-colors duration-300 whitespace-nowrap"
                      onMouseEnter={(e) => (e.currentTarget.style.color = '#52B5BD')}
                      onMouseLeave={(e) => (e.currentTarget.style.color = '')}
                    >
                      {item.label}
                      <Icons.ChevronDown className="h-3 w-3 transition-transform duration-300 group-hover:rotate-180" />
                    </button>

                    {/* DROPDOWN PANEL */}
                    <div
                      className="
                        absolute left-1/2 -translate-x-1/2 top-full pt-3
                        opacity-0 invisible translate-y-2
                        group-hover:opacity-100 group-hover:visible group-hover:translate-y-0
                        transition-all duration-200
                      "
                    >
                      <ul
                        className="min-w-[220px] rounded-xl overflow-hidden shadow-lg"
                        style={{ background: '#F7F3EA', boxShadow: '0 8px 24px rgba(27,42,74,0.15)' }}
                      >
                        {item.dropdown.map((sub) => (
                          <li key={sub.label}>
                            <button
                              onClick={() => handleNavClick(sub)}
                              className="w-full text-left px-5 py-3 text-sm whitespace-nowrap transition-colors duration-200 hover:bg-[#52B5BD]/10"
                              style={{ color: '#1B2A4A' }}
                            >
                              {sub.label}
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </>
                ) : item.path ? (
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
          <div className="hidden xl:flex justify-end items-center gap-4">
            <div>
              <a
                href={PHONE_LINK}
                className="flex items-center gap-2 px-5 py-2 rounded-full border shadow-sm hover:shadow-md hover:scale-105 transition-all duration-300 cursor-pointer"
                style={{
                  background: '#fff',
                  borderColor: '#52B5BD',
                  color: '#1B2A4A',
                }}
                aria-label="Call us 24/7"
              >
                <Icons.Headset className="h-5 w-5 text-[#52B5BD]" />
                <span className="font-semibold text-sm">24/7 Support</span>
              </a>
            </div>

            <div className="relative group">
              <button
                className="flex items-center gap-2 px-8 py-3 rounded-full text-white shadow-md hover:scale-105 transition whitespace-nowrap"
                style={{ background: 'linear-gradient(135deg, #52B5BD, #2F4A7D)' }}
              >
                Book Now
                <Icons.ChevronDown className="h-3 w-3 transition-transform duration-300 group-hover:rotate-180" />
              </button>

              {/* BOOK DROPDOWN PANEL */}
              <div
                className="
                  absolute right-0 top-full pt-3
                  opacity-0 invisible translate-y-2
                  group-hover:opacity-100 group-hover:visible group-hover:translate-y-0
                  transition-all duration-200
                "
              >
                <ul
                  className="min-w-[220px] rounded-xl overflow-hidden shadow-lg"
                  style={{ background: '#F7F3EA', boxShadow: '0 8px 24px rgba(27,42,74,0.15)' }}
                >
                  {BOOK_OPTIONS.map((opt) => (
                    <li key={opt.label}>
                      <a
                        href={opt.href}
                        target={opt.label === 'Book via Call' ? undefined : '_blank'}
                        rel={opt.label === 'Book via Call' ? undefined : 'noopener noreferrer'}
                        className="block px-5 py-3 text-sm whitespace-nowrap transition-colors duration-200 hover:bg-[#52B5BD]/10"
                        style={{ color: '#1B2A4A' }}
                      >
                        {opt.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* MOBILE TOGGLE */}
          <button
            type="button"
            onClick={toggleMenu}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            className="xl:hidden absolute right-6 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full cursor-pointer hover:bg-[#52B5BD]/10 transition-colors"
            style={{ color: '#1B2A4A' }}
          >
            {menuOpen ? (
              <Icons.Close className="h-6 w-6" />
            ) : (
              <Icons.Menu className="h-6 w-6" />
            )}
          </button>
        </nav>
        
        {/* MOBILE MENU */}
        <div
          className={`
            xl:hidden
            transition-all duration-300
            shadow-lg
            ${menuOpen ? 'max-h-[calc(100dvh-5rem)] overflow-y-auto' : 'max-h-0 overflow-hidden'}
          `}
          style={{ background: '#F7F3EA' }}
        >
          <ul className="text-center font-medium" style={{ color: '#1B2A4A' }}>
            {NAV_ITEMS.map((item) => (
              <li key={item.label} className="border-b border-[#F2C89F]/40">
                {item.dropdown ? (
                  <div>
                    <button
                      onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                      className="w-full flex items-center justify-center gap-2 py-2.5 text-sm"
                    >
                      {item.label}
                      <Icons.ChevronDown className={`h-3 w-3 transition-transform duration-300 ${mobileServicesOpen ? 'rotate-180' : ''}`} />
                    </button>
                    {mobileServicesOpen && (
                      <div style={{ background: 'rgba(82,181,189,0.08)' }}>
                        {item.dropdown.map((sub) => (
                          <button
                            key={sub.label}
                            onClick={() => handleNavClick(sub)}
                            className="block w-full py-2 text-sm"
                          >
                            {sub.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ) : item.path ? (
                  <Link to={item.path} onClick={() => setMenuOpen(false)} className="block py-2.5 text-sm">
                    {item.label}
                  </Link>
                ) : (
                  <button onClick={() => handleNavClick(item)} className="block w-full py-2.5 text-sm">
                    {item.label}
                  </button>
                )}
              </li>
            ))}
          </ul>

          <div className="p-4 flex flex-col items-center gap-2">
            <a
              href={PHONE_LINK}
              className="w-full flex items-center justify-center gap-2 px-5 py-2.5 rounded-full border shadow-sm"
              style={{
                background: "#fff",
                borderColor: "#52B5BD",
                color: "#1B2A4A",
              }}
            >
              <Icons.Headset className="h-5 w-5 text-[#52B5BD]" />
              <span className="font-semibold text-sm sm:text-base">
                24/7 Support
              </span>
            </a>

            <button
              onClick={() => setMobileBookOpen(!mobileBookOpen)}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-full text-white"
              style={{ background: 'linear-gradient(135deg, #52B5BD, #2F4A7D)' }}
            >
              Book Now
              <Icons.ChevronDown className={`h-3 w-3 transition-transform duration-300 ${mobileBookOpen ? 'rotate-180' : ''}`} />
            </button>

            {mobileBookOpen && (
              <div className="flex flex-col gap-1.5 pt-1.5 w-full">
                {BOOK_OPTIONS.map((opt) => (
                  <a
                    key={opt.label}
                    href={opt.href}
                    onClick={() => setMenuOpen(false)}
                    className="block w-full py-2 rounded-full text-center border text-sm"
                    style={{ borderColor: '#2F4A7D', color: '#1B2A4A' }}
                  >
                    {opt.label}
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      </header>

      {/* IMPORTANT SPACER */}
      <div className="h-20"></div>
    </>
  )
}