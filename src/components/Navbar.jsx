import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useSectionNav } from '../hooks/useSectionNav'
import { useContactInfo, getPhoneLink, getWhatsAppLink, APP_LINK, WHATSAPP_CHANNEL_URL } from '../config/contact'

import { useBlogTheme } from '../contexts/BlogThemeContext'
import ThemeToggle from './ThemeToggle'

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

function WhatsAppIcon({ size = 18, color = "#ffffff", style }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color} style={{ display: 'inline-block', verticalAlign: 'middle', ...style }}>
      <path d="M19.05 4.91A9.816 9.816 0 0 0 12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.91-7.01zm-7.01 15.24h-.01c-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.32a8.198 8.198 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24 2.2 0 4.27.86 5.82 2.42a8.188 8.188 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24zm4.52-6.18c-.25-.12-1.47-.72-1.69-.8-.23-.08-.39-.12-.56.12-.17.25-.64.8-.79.97-.15.17-.3.19-.55.07-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.15-.25-.02-.38.11-.51.11-.11.25-.29.37-.44.12-.15.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.12-.56-1.35-.77-1.85-.2-.49-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.87.85-.87 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.24 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.2-.58.2-1.08.14-1.18-.06-.1-.23-.16-.48-.28z"/>
    </svg>
  );
}

const NAV_ITEMS = [
  {
    label: 'Services',
    dropdown: [
      { label: 'Hospital Assistance', section: 'Hospital-companion-section', tab: 'hospital' },
      { label: 'Travel Assistance', section: 'Hospital-companion-section', tab: 'travel' },
    ],
  },
  {
    label: 'Insights',
    dropdown: [
      { label: 'Blogs & Insights', path: '/blog' },
      { label: 'WHY Newsletter', path: '/newsletter' },
    ],
  },
  {
    label: 'Company',
    dropdown: [
      { label: 'About Us', path: '/about' },
      { label: 'Testimonials & Stories', section: 'feedback-section' },
      { label: 'Trust & Safety', path: '/trust-and-safety' },
      { label: 'Careers', path: '/careers' },
    ],
  },
  { label: 'Pricing', path: '/pricing' },
]

export default function Navbar() {
  const contactInfo = useContactInfo()
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [visible, setVisible] = useState(false)
  const [openMobileDropdown, setOpenMobileDropdown] = useState(null)
  const [mobileBookOpen, setMobileBookOpen] = useState(false)
  const goToSection = useSectionNav()

  const location = useLocation()
  const navigate = useNavigate()
  const { theme, isBlogSection } = useBlogTheme()

  const isBlogOrNewsletter = location.pathname.startsWith('/blog') || location.pathname.startsWith('/newsletter')

  // Dark header state evaluated cleanly
  const isDarkHeader = isBlogOrNewsletter ? (theme === 'dark') : false

  const bookOptions = [
    { label: 'Book on App', href: APP_LINK || undefined },
    { label: 'Book via WhatsApp', href: getWhatsAppLink("Hi! I want to book a WHY companion service.", contactInfo.whatsapp_number) },
    { label: 'Book via Call', href: getPhoneLink(contactInfo.phone_number) },
  ].filter((opt) => opt.href)

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

  const isBlogPage = location.pathname.startsWith('/blog')

  // Reset mode when leaving blog/newsletter pages
  useEffect(() => {
    setMenuOpen(false)
    setOpenMobileDropdown(null)
    setMobileBookOpen(false)

    if (!isBlogOrNewsletter) {
      document.documentElement.removeAttribute('data-blog-theme')
      document.body.style.background = '#F7F3EA'
      document.body.style.color = '#1B2A4A'
    }
  }, [location.pathname, isBlogOrNewsletter])

  const toggleMenu = () => {
    setMenuOpen(!menuOpen)
  }

  const toggleMobileSubmenu = (label) => {
    setOpenMobileDropdown(openMobileDropdown === label ? null : label)
  }

  const handleNavClick = (sub) => {
    setMenuOpen(false)
    setOpenMobileDropdown(null)
    setMobileBookOpen(false)

    if (sub.path) {
      navigate(sub.path)
      return
    }
    if (sub.tab) {
      window.dispatchEvent(new CustomEvent('why:companion-tab', { detail: { tab: sub.tab } }))
    }
    if (sub.section) goToSection(sub.section)
  }

  return (
    <>
      {/* NAVBAR */}
      <header className="fixed top-0 left-0 w-full z-[9999]">
        <nav
          className={`
            relative flex items-center justify-between
            px-6 lg:px-12 h-20
            transition-all duration-500 ease-in-out
            ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}
          `}
          style={{
            background: isDarkHeader
              ? (scrolled ? '#070e1e' : 'rgba(7, 14, 30, 0.95)')
              : (isBlogOrNewsletter ? (scrolled ? '#F8FAFC' : 'rgba(248, 250, 252, 0.95)') : (scrolled ? '#F7F3EA' : 'rgba(247, 243, 234, 0.95)')),
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            boxShadow: isDarkHeader
              ? (scrolled ? '0 4px 20px rgba(0,0,0,0.4)' : '0 2px 10px rgba(0,0,0,0.2)')
              : (scrolled ? '0 4px 20px rgba(27,42,74,0.08)' : '0 2px 10px rgba(27,42,74,0.04)'),
          }}
        >
          {/* LOGO */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <Link
              to="/"
              onClick={() => setMenuOpen(false)}
              className="flex items-center cursor-pointer"
              title="WHY Services — Return to Home"
            >
              <img
                src="/Assests/WHY_logo.png"
                alt="WHY Logo"
                className="h-12 md:h-14 w-auto object-contain transition duration-300 hover:scale-105"
                onError={(e) => {
                  e.currentTarget.src = "/WHY_logo.png"
                }}
              />
            </Link>
          </div>

          {/* DESKTOP MENU - Adapts color seamlessly to dark/light body */}
          <ul className="hidden xl:flex items-center justify-center gap-8 font-medium">
            {NAV_ITEMS.map((item) => {
              return (
                <li
                  key={item.label}
                  className="relative group py-2"
                >
                  {item.dropdown ? (
                    <>
                      <button
                        className={`flex items-center gap-1.5 transition-colors duration-200 whitespace-nowrap outline-none focus:outline-none cursor-pointer font-medium text-[16px] ${
                          isDarkHeader ? 'text-white hover:text-[#52B5BD]' : 'text-[#1B2A4A] hover:text-[#52B5BD]'
                        }`}
                      >
                        {item.label}
                        <Icons.ChevronDown className="h-3.5 w-3.5 transition-transform duration-200 group-hover:rotate-180 opacity-70" />
                      </button>

                      {/* DROPDOWN PANEL */}
                      <div
                        className="
                          absolute left-1/2 -translate-x-1/2 top-full pt-2
                          opacity-0 invisible translate-y-2
                          group-hover:opacity-100 group-hover:visible group-hover:translate-y-0
                          transition-all duration-200 z-50
                        "
                      >
                        <ul
                          className="min-w-[210px] rounded-2xl overflow-hidden border p-2"
                          style={{
                            background: isDarkHeader ? '#0d172a' : (isBlogOrNewsletter ? '#F8FAFC' : '#F7F3EA'),
                            borderColor: isDarkHeader ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)',
                            boxShadow: '0 12px 32px rgba(0,0,0,0.25)',
                          }}
                        >
                          {item.dropdown.map((sub) => (
                            <li key={sub.label}>
                              {sub.path ? (
                                <Link
                                  to={sub.path}
                                  onClick={() => setMenuOpen(false)}
                                  className={`block px-4 py-2.5 rounded-xl text-[15px] font-medium whitespace-nowrap transition-colors duration-150 hover:bg-[#52B5BD]/10 hover:text-[#52B5BD] ${
                                    isDarkHeader ? 'text-white' : 'text-[#1B2A4A]'
                                  }`}
                                >
                                  {sub.label}
                                </Link>
                              ) : (
                                <button
                                  onClick={() => handleNavClick(sub)}
                                  className={`w-full text-left px-4 py-2.5 rounded-xl text-[15px] font-medium whitespace-nowrap transition-colors duration-150 hover:bg-[#52B5BD]/10 hover:text-[#52B5BD] outline-none focus:outline-none cursor-pointer ${
                                    isDarkHeader ? 'text-white' : 'text-[#1B2A4A]'
                                  }`}
                                >
                                  {sub.label}
                                </button>
                              )}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </>
                  ) : item.path ? (
                    <Link
                      to={item.path}
                      onClick={(e) => {
                        e.currentTarget.blur()
                        setMenuOpen(false)
                      }}
                      className={`transition-colors duration-200 whitespace-nowrap block outline-none focus:outline-none select-none font-medium text-[16px] ${
                        isDarkHeader ? 'text-white hover:text-[#52B5BD]' : 'text-[#1B2A4A] hover:text-[#52B5BD]'
                      }`}
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <button
                      onClick={(e) => {
                        e.currentTarget.blur()
                        handleNavClick(item)
                      }}
                      className={`transition-colors duration-200 whitespace-nowrap block outline-none focus:outline-none cursor-pointer select-none font-medium text-[16px] ${
                        isDarkHeader ? 'text-white hover:text-[#52B5BD]' : 'text-[#1B2A4A] hover:text-[#52B5BD]'
                      }`}
                    >
                      {item.label}
                    </button>
                  )}

                  {/* Underline on hover only */}
                  <span
                    className="
                      absolute left-0 bottom-0
                      h-[2px] w-full rounded-full
                      bg-[#52B5BD]
                      origin-left
                      scale-x-0 group-hover:scale-x-100
                      opacity-0 group-hover:opacity-100
                      transition-all duration-200
                      pointer-events-none
                    "
                  />
                </li>
              )
            })}
          </ul>

          {/* DESKTOP ACTIONS: 24/7 support + WhatsApp Channel + Theme Toggle + Book dropdown */}
          <div className="hidden xl:flex items-center justify-end gap-3 flex-shrink-0">
            <ThemeToggle />

            <div>
              <a
                href={getPhoneLink(contactInfo.phone_number)}
                className="flex items-center gap-2 px-4 py-2 rounded-full border shadow-sm hover:shadow-md hover:scale-105 transition-all duration-300 cursor-pointer"
                style={{
                  background: isDarkHeader ? '#0d172a' : '#fff',
                  borderColor: '#52B5BD',
                  color: isDarkHeader ? '#fff' : '#1B2A4A',
                }}
                aria-label="Call us 24/7"
              >
                <Icons.Headset className="h-4 w-4 text-[#52B5BD]" />
                <span className="font-medium text-sm">24/7 Support</span>
              </a>
            </div>

            {/* WhatsApp Channel Icon */}
            <div>
              <a
                href={WHATSAPP_CHANNEL_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-[#25D366] text-white shadow-sm hover:shadow-md hover:scale-105 hover:bg-[#20bd5a] transition-all duration-300 cursor-pointer"
                title="Follow the WHY Services channel on WhatsApp"
                aria-label="Follow the WHY Services channel on WhatsApp"
              >
                <WhatsAppIcon size={18} color="#ffffff" />
                <span className="font-medium text-sm">Channel</span>
              </a>
            </div>

            <div className="relative group">
              <button
                className="flex items-center gap-2 px-7 py-2.5 rounded-full text-white shadow-md hover:scale-105 transition whitespace-nowrap font-medium text-base cursor-pointer"
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
                  className="min-w-[210px] rounded-2xl overflow-hidden shadow-lg border p-2"
                  style={{
                    background: isDarkHeader ? '#0d172a' : '#F7F3EA',
                    borderColor: isDarkHeader ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)',
                  }}
                >
                  {bookOptions.map((opt) => (
                    <li key={opt.label}>
                      <a
                        href={opt.href}
                        target={opt.label === 'Book via Call' ? undefined : '_blank'}
                        rel={opt.label === 'Book via Call' ? undefined : 'noopener noreferrer'}
                        className={`block px-4 py-2.5 rounded-xl text-xs font-medium whitespace-nowrap transition-colors duration-200 hover:bg-[#52B5BD]/10 hover:text-[#52B5BD] ${
                          isDarkHeader ? 'text-white' : 'text-[#1B2A4A]'
                        }`}
                      >
                        {opt.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* MOBILE TOGGLE & THEME TOGGLE */}
          <div className="xl:hidden flex items-center gap-2">
            <ThemeToggle />
            <button
              type="button"
              onClick={toggleMenu}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              className="flex h-10 w-10 items-center justify-center rounded-full cursor-pointer hover:bg-[#52B5BD]/10 transition-colors"
              style={{ color: isDarkHeader ? '#ffffff' : '#1B2A4A' }}
            >
              {menuOpen ? (
                <Icons.Close className="h-6 w-6" />
              ) : (
                <Icons.Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </nav>
        
        {/* MOBILE MENU */}
        <div
          className={`
            xl:hidden
            transition-all duration-300
            shadow-lg
            ${menuOpen ? 'max-h-[calc(100dvh-5rem)] overflow-y-auto' : 'max-h-0 overflow-hidden'}
          `}
          style={{ background: isDarkHeader ? '#070e1e' : (isBlogOrNewsletter ? '#F8FAFC' : '#F7F3EA') }}
        >
          <ul className="text-center font-medium" style={{ color: isDarkHeader ? '#ffffff' : '#1B2A4A' }}>
            {NAV_ITEMS.map((item) => {
              const isOpen = openMobileDropdown === item.label
              return (
                <li key={item.label} className="border-b border-[#F2C89F]/40">
                  {item.dropdown ? (
                    <div>
                      <button
                        onClick={() => toggleMobileSubmenu(item.label)}
                        className={`w-full flex items-center justify-center gap-2 py-3.5 text-sm font-medium ${
                          isDarkHeader ? 'text-white' : 'text-[#1B2A4A]'
                        }`}
                      >
                        {item.label}
                        <Icons.ChevronDown className={`h-3.5 w-3.5 transition-transform duration-300 opacity-60 ${isOpen ? 'rotate-180' : ''}`} />
                      </button>
                      {isOpen && (
                        <div style={{ background: 'rgba(82,181,189,0.08)' }}>
                          {item.dropdown.map((sub) => (
                            sub.path ? (
                              <Link
                                key={sub.label}
                                to={sub.path}
                                onClick={() => setMenuOpen(false)}
                                className={`block w-full py-2.5 text-xs font-medium ${
                                  isDarkHeader ? 'text-white' : 'text-[#1B2A4A]'
                                } hover:text-[#52B5BD]`}
                              >
                                {sub.label}
                              </Link>
                            ) : (
                              <button
                                key={sub.label}
                                onClick={() => handleNavClick(sub)}
                                className={`block w-full py-2.5 text-xs font-medium ${
                                  isDarkHeader ? 'text-white' : 'text-[#1B2A4A]'
                                } hover:text-[#52B5BD]`}
                              >
                                {sub.label}
                              </button>
                            )
                          ))}
                        </div>
                      )}
                    </div>
                  ) : item.path ? (
                    <Link
                      to={item.path}
                      onClick={() => setMenuOpen(false)}
                      className={`block py-3.5 text-sm font-medium transition-colors ${
                        isDarkHeader ? 'text-white hover:text-[#52B5BD]' : 'text-[#1B2A4A] hover:text-[#52B5BD]'
                      }`}
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <button
                      onClick={() => handleNavClick(item)}
                      className="block w-full py-3.5 text-sm font-medium"
                    >
                      {item.label}
                    </button>
                  )}
                </li>
              )
            })}
          </ul>

          <div className="p-4 flex flex-col items-center gap-2.5">


            <a
              href={getPhoneLink(contactInfo.phone_number)}
              className="w-full flex items-center justify-center gap-2 px-5 py-2.5 rounded-full border shadow-sm"
              style={{
                background: isDarkHeader ? "#0d172a" : "#fff",
                borderColor: "#52B5BD",
                color: isDarkHeader ? "#fff" : "#1B2A4A",
              }}
            >
              <Icons.Headset className="h-5 w-5 text-[#52B5BD]" />
              <span className="font-medium text-sm sm:text-base">
                24/7 Support
              </span>
            </a>

            <a
              href={WHATSAPP_CHANNEL_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 px-5 py-2.5 rounded-full shadow-sm text-white font-medium text-sm transition-all"
              style={{ background: "#25D366" }}
            >
              <WhatsAppIcon size={18} color="#ffffff" />
              <span>Follow WhatsApp Channel</span>
            </a>

            <button
              onClick={() => setMobileBookOpen(!mobileBookOpen)}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-full text-white font-medium text-sm cursor-pointer"
              style={{ background: 'linear-gradient(135deg, #52B5BD, #2F4A7D)' }}
            >
              Book Now
              <Icons.ChevronDown className={`h-3.5 w-3.5 transition-transform duration-300 ${mobileBookOpen ? 'rotate-180' : ''}`} />
            </button>

            {mobileBookOpen && (
              <div className="flex flex-col gap-1.5 pt-1.5 w-full">
                {bookOptions.map((opt) => (
                  <a
                    key={opt.label}
                    href={opt.href}
                    onClick={() => setMenuOpen(false)}
                    className="block w-full py-2 rounded-full text-center border text-xs font-medium"
                    style={{ borderColor: '#2F4A7D', color: isDarkHeader ? '#fff' : '#1B2A4A' }}
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