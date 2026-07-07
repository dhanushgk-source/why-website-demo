import { useState, useEffect } from 'react'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [visible, setVisible] = useState(false)

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

  return (
    <>
      {/* NAVBAR */}
      <header className="fixed top-0 left-0 w-full z-[9999]">
        <nav
          className={`
            grid grid-cols-3 items-center
            px-6 lg:px-12 h-20
            transition-all duration-500 ease-in-out
            ${
              visible
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
            <a href="#">
              <img
                src="/Assests/WHY_logo.png"
                alt="WHY Logo"
                className="h-14 transition duration-300 hover:scale-105"
              />
            </a>
          </div>

          {/* DESKTOP MENU */}
          <ul className="hidden lg:flex justify-center gap-10 font-medium">
            {[
              { label: 'Services', href: '#parent-section' },
              { label: 'How it Works', href: '#WHY-Works-section' },
              { label: 'Safety', href: '#savefty-section' },
              { label: 'About', href: '#footer-section' },
            ].map((item) => (
              <li
                key={item.label}
                className="relative group"
                style={{ color: '#1B2A4A' }}
              >
                <a
                  href={item.href}
                  className="transition-colors duration-300"
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#52B5BD')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = '')}
                >
                  {item.label}
                </a>

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
          <div className="flex lg:hidden justify-center">
            <span
              className="font-display font-bold text-xl tracking-wide"
              style={{ color: '#1B2A4A' }}
            >
              WHY
            </span>
          </div>

          {/* DESKTOP BUTTON */}
          <div className="hidden lg:flex justify-end">
            <button
              className="px-8 py-3 rounded-full text-white shadow-md hover:scale-105 transition"
              style={{ background: 'linear-gradient(135deg, #52B5BD, #2F4A7D)' }}
            >
              Get the App
            </button>
          </div>

          {/* MOBILE TOGGLE */}
          <div
            className="lg:hidden absolute right-6 cursor-pointer"
            onClick={toggleMenu}
            style={{ color: '#1B2A4A' }}
          >
            <i
              className={`fa-solid ${
                menuOpen ? 'fa-xmark' : 'fa-bars'
              } fa-lg`}
            ></i>
          </div>
        </nav>

        {/* MOBILE MENU */}
        <div
          className={`
            lg:hidden
            overflow-hidden
            transition-all duration-300
            shadow-lg
            ${menuOpen ? 'max-h-96' : 'max-h-0'}
          `}
          style={{ background: '#F7F3EA' }}
        >
          <ul className="text-center font-medium" style={{ color: '#1B2A4A' }}>
            <li className="py-4 border-b border-[#F2C89F]/40">
              <a href="#parent-section">Services</a>
            </li>

            <li className="py-4 border-b border-[#F2C89F]/40">
              <a href="#WHY-Works-section">How it Works</a>
            </li>

            <li className="py-4 border-b border-[#F2C89F]/40">
              <a href="#savefty-section">Safety</a>
            </li>

            <li className="py-4 border-b border-[#F2C89F]/40">
              <a href="#footer-section">About</a>
            </li>
          </ul>

          <div className="p-6">
            <button
              className="w-full py-3 rounded-full text-white"
              style={{ background: 'linear-gradient(135deg, #52B5BD, #2F4A7D)' }}
            >
              Get the App
            </button>
          </div>
        </div>
      </header>

      {/* IMPORTANT SPACER */}
      <div className="h-20"></div>
    </>
  )
}