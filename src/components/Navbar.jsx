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
            ${
              scrolled
                ? 'bg-white shadow-lg'
                : 'bg-white/80 backdrop-blur-md'
            }
          `}
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
                className="relative group text-[#0b2642]"
              >
                <a
                  href={item.href}
                  className="hover:text-[#4DBAB8] transition-colors duration-300"
                >
                  {item.label}
                </a>

                <span
                  className="
                    absolute left-0 -bottom-1
                    h-[2px] w-full
                    bg-[#4DBAB8]
                    scale-x-0
                    origin-left
                    transition-transform
                    duration-300
                    group-hover:scale-x-100
                  "
                />
              </li>
            ))}
          </ul>

          {/* DESKTOP BUTTON */}
          <div className="hidden lg:flex justify-end">
            <button
              className="
                px-8 py-3
                rounded-full
                text-white
                bg-gradient-to-r
                from-[#2F4A7D]
                to-[#2DD4BF]
                shadow-md
                hover:scale-105
                transition
              "
            >
              Get the App
            </button>
          </div>

          {/* MOBILE TOGGLE */}
          <div
            className="lg:hidden absolute right-6 cursor-pointer"
            onClick={toggleMenu}
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
            bg-white shadow-lg
            ${menuOpen ? 'max-h-96' : 'max-h-0'}
          `}
        >
          <ul className="text-center font-medium">
            <li className="py-4 border-b">
              <a href="#parent-section">Services</a>
            </li>

            <li className="py-4 border-b">
              <a href="#WHY-Works-section">How it Works</a>
            </li>

            <li className="py-4 border-b">
              <a href="#savefty-section">Safety</a>
            </li>

            <li className="py-4 border-b">
              <a href="#footer-section">About</a>
            </li>
          </ul>

          <div className="p-6">
            <button className="w-full py-3 rounded-full bg-[#009689] text-white">
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