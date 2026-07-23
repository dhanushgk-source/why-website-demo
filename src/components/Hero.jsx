import { useSectionFade } from '../hooks/useSectionFade'
import { useEffect, useState } from 'react'
import {
  Users,
  HeartHandshake,
  User,
  ArrowRight,
  PlayCircle,
  Phone,
} from 'lucide-react'
import {
  PHONE_DISPLAY,
  PHONE_LINK,
  getWhatsAppLink,
} from '../config/contact'

const TAGLINE = 'Companionship That Feels Like Family.'

const SUBTEXT =
  'WHY connects seniors and individual of all ages   with trusted WHY PROs, gives families complete peace of Mind, and creates meaningful opportunities for compassionate professionals.'

const WHY_PRO_EXPLAINER =
  "WHY PRO is a trained and verified human companion who provides assistance during hospital and travel. WHY does not provide transportation or vehicles. Customers are responsible for arranging their own transportation. WHY's role is to provide a professional human companion who accompanies and assists the customer throughout the service."

const INFO_ITEMS = [
  { icon: Users, title: 'Seniors', subtitle: 'Trusted Companionship' },
  { icon: HeartHandshake, title: 'Families', subtitle: 'Peace of Mind' },
  { icon: User, title: 'WHY PRO', subtitle: 'Build Meaningful Connections' },
]

const REVEAL_DELAY = 130

export default function Hero() {
  const sectionRef = useSectionFade()
  const [started, setStarted] = useState(false)

  useEffect(() => {
    const prefersReducedMotion =
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prefersReducedMotion) {
      setStarted(true)
      return
    }

    const timer = setTimeout(() => setStarted(true), 150)
    return () => clearTimeout(timer)
  }, [])

  const revealClass = `transition-all duration-700 ease-out ${started
      ? 'opacity-100 translate-y-0'
      : 'opacity-0 translate-y-5'
    }`

  const revealStyle = (stepIndex) => ({
    transitionDelay: started ? `${stepIndex * REVEAL_DELAY}ms` : '0ms',
  })

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)

    if (element) {
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - 80

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      })
    } else {
      const section =
        document.querySelector(`[data-section="${sectionId}"]`) ||
        document.querySelector(`.${sectionId}`)

      if (section) {
        section.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        })
      }
    }
  }

   const scrollToHowSection = () => {
    const targetSection = document.getElementById('WHY-Works-section')

    if (targetSection) {
      const targetPosition =
        targetSection.getBoundingClientRect().top +
        window.pageYOffset -
        80

      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth',
      })
    } else {
      const sections = document.querySelectorAll('section')

      let heroIndex = -1

      sections.forEach((section, index) => {
        if (section === sectionRef.current) heroIndex = index
      })

      if (
        heroIndex !== -1 &&
        heroIndex < sections.length - 1
      ) {
        const nextSection = sections[heroIndex + 1]

        const nextPosition =
          nextSection.getBoundingClientRect().top +
          window.pageYOffset -
          80

        window.scrollTo({
          top: nextPosition,
          behavior: 'smooth',
        })
      }
    }
  }

  const scrollToNextSection = () => {
    const targetSection = document.getElementById('cta-section')

    if (targetSection) {
      const targetPosition =
        targetSection.getBoundingClientRect().top +
        window.pageYOffset -
        80

      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth',
      })
    } else {
      const sections = document.querySelectorAll('section')

      let heroIndex = -1

      sections.forEach((section, index) => {
        if (section === sectionRef.current) heroIndex = index
      })

      if (
        heroIndex !== -1 &&
        heroIndex < sections.length - 1
      ) {
        const nextSection = sections[heroIndex + 1]

        const nextPosition =
          nextSection.getBoundingClientRect().top +
          window.pageYOffset -
          80

        window.scrollTo({
          top: nextPosition,
          behavior: 'smooth',
        })
      }
    }
  }

  return (
    <section
      ref={sectionRef}
      className="w-full relative overflow-hidden bg-[#F7F3EA] rounded-b-[40px] md:rounded-b-[60px]"
      id="hero-section"
    >
      <div className="fade-inner relative w-full min-h-[calc(100vh-5rem)] min-h-[calc(100svh-5rem)] flex flex-col md:flex-row">

        {/* Left Side - Image with organic curved edge */}
        <div className="relative w-full md:w-[60%] flex-shrink-0 md:min-h-[calc(100vh-5rem)]">

          {/* Image block — fixed height on mobile; fills the full stretched column height on desktop (no gap) */}
          <div className="relative w-full h-[42vh] min-h-[280px] sm:min-h-[38vh] md:absolute md:inset-0 md:h-auto overflow-hidden">
            <svg width="0" height="0" className="absolute">
              <defs>
                <clipPath id="heroImageClip" clipPathUnits="objectBoundingBox">
                  <path d="M0,0 L0.95,0 C0.99,0.12 1,0.22 0.97,0.34 C0.95,0.44 0.95,0.56 0.97,0.66 C1,0.78 0.99,0.88 0.95,1 L0,1 Z" />
                </clipPath>
              </defs>
            </svg>

            <div
              className="absolute inset-0"
              style={{
                backgroundImage: "url('/Assests/elder.webp')",
                backgroundSize: 'cover',
                backgroundPosition: 'center top',
                clipPath: 'url(#heroImageClip)',
                WebkitClipPath: 'url(#heroImageClip)'
              }}
            />

            {/* Drop-shadow / outline div removed — was causing the visible curved line (arrow 3) */}
          </div>

          {/* Info card — stacked below the image on mobile (no overlap), overlapping bottom-left on sm+ as before */}
          <div className="relative sm:absolute sm:left-8 sm:bottom-8 -mt-6 sm:mt-0 mx-4 sm:mx-0 bg-white rounded-2xl shadow-xl border-2 border-teal-500 px-3 sm:px-6 py-3 sm:py-4 grid grid-cols-3 sm:flex sm:items-center gap-2 sm:gap-6 sm:max-w-none z-10">            {INFO_ITEMS.map((item, idx) => (
            <div
              key={item.title}
              className="flex flex-col sm:flex-row items-center sm:items-center text-center sm:text-left gap-1 sm:gap-2 min-w-0"
            >
              <item.icon className="w-5 h-5 sm:w-7 sm:h-7 text-[#F2711F] flex-shrink-0" strokeWidth={1.75} />
              <div className="leading-tight min-w-0 w-full">
                <p className="text-[#1B2A4A] font-bold text-[10px] sm:text-sm whitespace-normal sm:whitespace-nowrap break-words">
                  {item.title}
                </p>
                <p className="text-gray-500 text-[8px] sm:text-xs whitespace-normal sm:whitespace-nowrap break-words leading-tight">
                  {item.subtitle}
                </p>
              </div>
              {idx < INFO_ITEMS.length - 1 && (
                <span className="hidden sm:block w-px h-8 bg-gray-200 ml-2 sm:ml-4" />
              )}
            </div>
          ))}
          </div>
        </div>

        {/* RIGHT SIDE */}

        <div className="relative w-full md:w-[40%] flex flex-col justify-center px-6 sm:px-10 md:px-10 lg:px-12 py-8 md:py-6">

          <div className="hidden md:block absolute top-0 right-10 w-28 h-28 rounded-full bg-[#7FC8C0]/40 -translate-y-1/3" />
          <div className="hidden md:block absolute top-24 right-4 w-10 h-10 rounded-full bg-[#F6C89F]" />

          <div className="hidden md:block absolute top-40 right-16 grid grid-cols-6 gap-1.5 opacity-40">
            {Array.from({ length: 24 }).map((_, i) => (
              <span
                key={i}
                className="w-1 h-1 rounded-full bg-[#0D9488]"
              />
            ))}
          </div>

          <div className="relative w-full max-w-2xl mx-auto md:mx-0 z-10">

            {/* NEW HERO TITLE */}

            <div className="mb-2">

              <div
                className={revealClass}
                style={revealStyle(0)}
              >
                <h1 className="font-display text-4xl sm:text-5xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[0.95] text-[#1B2A4A]">
                  Care for
                </h1>
              </div>

              <div
                className={revealClass}
                style={revealStyle(1)}
              >
                <h1 className="font-display text-4xl sm:text-5xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[0.95] text-[#0D9488]">
                  Your family 
                </h1>
              </div>

              <div
                className={revealClass}
                style={revealStyle(2)}
              >
                <h1 className="font-display text-4xl sm:text-5xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[0.95] text-[#1B2A4A]">
                 When
                </h1>
              </div>

              <div
                className={revealClass}
                style={revealStyle(3)}
              >
                <h1 className="font-display text-4xl sm:text-5xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[0.95] text-[#0D9488]">
                  You're Away
                </h1>
              </div>

              <div
                className={`flex items-center gap-2 my-4 ${revealClass}`}
                style={revealStyle(4)}
              >
                <span className="w-14 h-[3px] rounded-full bg-[#F2711F]" />

                <HeartHandshake
                  className="w-4 h-4 text-[#0D9488]"
                  strokeWidth={2}
                />
              </div>
            </div>
            {/* Tagline */}
            <h2
              className={`text-xl sm:text-2xl md:text-xl lg:text-2xl text-[#1B2A4A] font-extrabold mb-3 tracking-tight leading-snug text-left max-w-[22ch] ${revealClass}`}
              style={revealStyle(5)}
            >
              {TAGLINE}
            </h2>

            {/* Subtext */}
            <p
              className={`text-gray-500 text-sm sm:text-base max-w-md mb-3 ${revealClass}`}
              style={revealStyle(6)}
            >
              {SUBTEXT}
            </p>

            {/* WHY PRO explainer */}
            <p
              className={`text-gray-500 text-xs sm:text-sm max-w-md mb-6 ${revealClass}`}
              style={revealStyle(6)}
            >
              {WHY_PRO_EXPLAINER}
            </p>

          </div>

          {/* CTAs */}
          <div
            className={`relative z-10 flex flex-col sm:flex-row items-center justify-start gap-3 sm:gap-5 w-full max-w-xl mx-auto md:mx-0 ${revealClass}`}
            style={revealStyle(7)}
          >
            <button
              onClick={scrollToNextSection}
              className="flex items-center gap-2 px-8 py-4 rounded-full bg-[#F2711F] text-white font-bold text-base sm:text-lg hover:bg-[#D9600F] transition-all duration-500 shadow-lg shadow-orange-900/10 hover:scale-105 active:scale-95"
            >
              <span className="w-6 h-6 rounded-full bg-white/25 flex items-center justify-center">
                <ArrowRight className="w-4 h-4" />
              </span>

              Book Your WHY PRO
            </button>

            <button
            onClick={scrollToHowSection}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full border-2 border-[#0D9488] bg-white text-[#1B2A4A] font-semibold text-xs sm:text-sm hover:bg-[#0D9488]/5 transition-all duration-500 hover:scale-105 active:scale-95"
            >
              <PlayCircle className="w-4 h-4 text-[#0D9488]" />

              See How It Works
            </button>
          </div>

        </div>
      </div>
    </section>
  )
}