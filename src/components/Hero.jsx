import { useSectionFade } from '../hooks/useSectionFade'
import { useEffect, useState } from 'react'
import { Users, HeartHandshake, User, ArrowRight, PlayCircle, Phone } from 'lucide-react'
import { PHONE_DISPLAY, PHONE_LINK, getWhatsAppLink } from '../config/contact'

const TAGLINE = 'Companionship That Feels Like a Family.'
const SUBTEXT = 'Connecting Seniors With Trusted Companions, Giving Families Peace of Mind, and Creating Meaningful Opportunities For Compassionate Professionals.'
const WORD_PARTS = {
  word1: { full: 'We', first: 'W', rest: 'e' },
  word2: { full: 'Help', first: 'H', rest: 'elp' },
  word3: { full: 'You', first: 'Y', rest: 'ou' }
}

const SEGMENTS = [
  { key: 'word1_first', text: WORD_PARTS.word1.first, speed: 100, pause: 100 },
  { key: 'word1_rest', text: WORD_PARTS.word1.rest, speed: 60, pause: 150 },
  { key: 'word2_first', text: WORD_PARTS.word2.first, speed: 100, pause: 100 },
  { key: 'word2_rest', text: WORD_PARTS.word2.rest, speed: 60, pause: 150 },
  { key: 'word3_first', text: WORD_PARTS.word3.first, speed: 100, pause: 100 },
  { key: 'word3_rest', text: WORD_PARTS.word3.rest, speed: 60, pause: 300 },
  { key: 'tag', text: TAGLINE, speed: 32, pause: 0 },
]
const ORDER = SEGMENTS.map((s) => s.key).concat('done')

const INFO_ITEMS = [
  { icon: Users, title: 'Seniors', subtitle: 'Trusted Companionship' },
  { icon: HeartHandshake, title: 'Families', subtitle: 'Peace of Mind' },
  { icon: User, title: 'Companions', subtitle: 'Build Meaningful Connections' },
]

export default function Hero() {
  const sectionRef = useSectionFade()

  const [texts, setTexts] = useState({
    word1_first: '', word1_rest: '',
    word2_first: '', word2_rest: '',
    word3_first: '', word3_rest: '',
    tag: ''
  })
  const [activeKey, setActiveKey] = useState('word1_first')

  useEffect(() => {
    const prefersReducedMotion =
      window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prefersReducedMotion) {
      setTexts({
        word1_first: WORD_PARTS.word1.first, word1_rest: WORD_PARTS.word1.rest,
        word2_first: WORD_PARTS.word2.first, word2_rest: WORD_PARTS.word2.rest,
        word3_first: WORD_PARTS.word3.first, word3_rest: WORD_PARTS.word3.rest,
        tag: TAGLINE
      })
      setActiveKey('done')
      return
    }

    let timer
    let segIndex = 0

    const typeSegment = () => {
      if (segIndex >= SEGMENTS.length) {
        setActiveKey('done')
        return
      }
      const seg = SEGMENTS[segIndex]
      setActiveKey(seg.key)
      let i = 0
      timer = setInterval(() => {
        i += 1
        setTexts((prev) => ({ ...prev, [seg.key]: seg.text.slice(0, i) }))
        if (i >= seg.text.length) {
          clearInterval(timer)
          segIndex += 1
          setTimeout(typeSegment, seg.pause)
        }
      }, seg.speed)
    }

    typeSegment()
    return () => clearInterval(timer)
  }, [])

  const reached = (key) => ORDER.indexOf(activeKey) >= ORDER.indexOf(key)
  const isActive = (part) => activeKey === part

  const Cursor = ({ color = 'bg-[#1B2A4A]', size = 'h-[0.9em]' }) => (
    <span className={`inline-block w-[3px] ${size} ${color} ml-1 align-middle animate-pulse`} />
  )

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - 80
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' })
    } else {
      const section = document.querySelector(`[data-section="${sectionId}"]`) ||
        document.querySelector(`.${sectionId}`)
      if (section) {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }
  }

  const scrollToNextSection = () => {
    const targetSection = document.getElementById('how-why-works')
    if (targetSection) {
      const targetPosition = targetSection.getBoundingClientRect().top + window.pageYOffset - 80
      window.scrollTo({ top: targetPosition, behavior: 'smooth' })
    } else {
      const sections = document.querySelectorAll('section')
      let heroIndex = -1
      sections.forEach((section, index) => {
        if (section === sectionRef.current) heroIndex = index
      })
      if (heroIndex !== -1 && heroIndex < sections.length - 1) {
        const nextSection = sections[heroIndex + 1]
        const nextPosition = nextSection.getBoundingClientRect().top + window.pageYOffset - 80
        window.scrollTo({ top: nextPosition, behavior: 'smooth' })
      }
    }
  }

  return (
    <section
      ref={sectionRef}
      className="w-full relative overflow-hidden bg-[#F7F3EA] rounded-b-[40px] md:rounded-b-[60px]"
      id="hero-section"
    >

      <div className="fade-inner relative w-full min-h-[75vh] min-h-[75svh] flex flex-col md:flex-row">

        {/* Left Side - Image with organic curved edge */}
        <div className="relative w-full md:w-[60%] flex-shrink-0 md:min-h-[75vh]">

          {/* Image block — fixed height on mobile; fills the full stretched column height on desktop (no gap) */}
          <div className="relative w-full h-[50vh] min-h-[320px] sm:min-h-[45vh] md:absolute md:inset-0 md:h-auto overflow-hidden">
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
                backgroundImage: "url('/Assests/elder.png')",
                backgroundSize: 'cover',
                backgroundPosition: 'center top',
                clipPath: 'url(#heroImageClip)',
                WebkitClipPath: 'url(#heroImageClip)'
              }}
            />

            {/* Drop-shadow / outline div removed — was causing the visible curved line (arrow 3) */}
          </div>

          {/* Info card — stacked below the image on mobile (no overlap), overlapping bottom-left on sm+ as before */}
          <div className="relative sm:absolute sm:left-8 sm:bottom-8 -mt-6 sm:mt-0 mx-4 sm:mx-0 bg-white rounded-2xl shadow-xl px-3 sm:px-6 py-3 sm:py-4 grid grid-cols-3 sm:flex sm:items-center gap-2 sm:gap-6 sm:max-w-none z-10">
            {INFO_ITEMS.map((item, idx) => (
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

        {/* Right Side - Content */}
        <div className="relative w-full md:w-[40%] flex flex-col justify-center px-6 sm:px-10 md:px-10 lg:px-12 py-12 md:py-10">

          {/* Decorative shapes */}
          <div className="hidden md:block absolute top-0 right-10 w-28 h-28 rounded-full bg-[#7FC8C0]/40 -translate-y-1/3" />
          <div className="hidden md:block absolute top-24 right-4 w-10 h-10 rounded-full bg-[#F6C89F]" />
          <div className="hidden md:block absolute top-40 right-16 grid grid-cols-6 gap-1.5 opacity-40">
            {Array.from({ length: 24 }).map((_, i) => (
              <span key={i} className="w-1 h-1 rounded-full bg-[#0D9488]" />
            ))}
          </div>
          {/* Leaf SVG (arrow 2) removed */}

          {/* Content column */}
          <div className="relative w-full max-w-2xl mx-auto md:mx-0 z-10">

            <div className="mb-2">
              <div className="flex items-baseline justify-start gap-0">
                <span className="font-display text-5xl sm:text-6xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[0.9] text-[#1B2A4A]">
                  {texts.word1_first}
                  {isActive('word1_first') && <Cursor color="bg-[#1B2A4A]" size="h-[0.9em]" />}
                </span>
                <span className="font-display text-4xl sm:text-5xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[0.9] text-[#0D9488]">
                  {texts.word1_rest}
                  {isActive('word1_rest') && <Cursor color="bg-[#0D9488]" size="h-[0.7em]" />}
                </span>
              </div>

              <div className="flex items-baseline justify-start gap-0">
                <span className="font-display text-5xl sm:text-6xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[0.9] text-[#1B2A4A]">
                  {texts.word2_first}
                  {isActive('word2_first') && <Cursor color="bg-[#1B2A4A]" size="h-[0.9em]" />}
                </span>
                <span className="font-display text-4xl sm:text-5xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[0.9] text-[#0D9488]">
                  {texts.word2_rest}
                  {isActive('word2_rest') && <Cursor color="bg-[#0D9488]" size="h-[0.7em]" />}
                </span>
              </div>

              <div className="flex items-baseline justify-start gap-0">
                <span className="font-display text-5xl sm:text-6xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[0.9] text-[#1B2A4A]">
                  {texts.word3_first}
                  {isActive('word3_first') && <Cursor color="bg-[#1B2A4A]" size="h-[0.9em]" />}
                </span>
                <span className="font-display text-4xl sm:text-5xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[0.9] text-[#0D9488]">
                  {texts.word3_rest}
                  {isActive('word3_rest') && <Cursor color="bg-[#0D9488]" size="h-[0.7em]" />}
                </span>
              </div>

              <div className="flex items-center gap-2 my-5">
                <span className="w-14 h-[3px] rounded-full bg-[#F2711F]" />
                <HeartHandshake className="w-4 h-4 text-[#0D9488]" strokeWidth={2} />
              </div>
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-2xl lg:text-3xl text-[#1B2A4A] font-extrabold mb-4 min-h-[1.2em] tracking-tight leading-snug text-left max-w-[22ch]">
              {activeKey === 'tag' && <Cursor color="bg-[#1B2A4A]" size="h-[0.8em]" />}
              {texts.tag}
            </h2>

            <p
              className={`text-gray-500 text-base sm:text-lg max-w-md mb-8 transition-all duration-500 ${reached('done') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
                }`}
            >
              {SUBTEXT}
            </p>
          </div>

          <div
            className={`relative z-10 flex flex-col sm:flex-row items-center justify-start gap-4 sm:gap-5 w-full max-w-xl mx-auto md:mx-0 transition-all duration-500 ${reached('done') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3 pointer-events-none'
              }`}
          >
            <button
              style={{ transitionDelay: reached('done') ? '80ms' : '0ms' }}
              onClick={scrollToNextSection}
              className="flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#F2711F] text-white font-semibold text-base sm:text-lg hover:bg-[#D9600F] transition-all duration-500 shadow-lg shadow-orange-900/10 hover:scale-105 active:scale-95"
            >
              <span className="w-6 h-6 rounded-full bg-white/25 flex items-center justify-center">
                <ArrowRight className="w-4 h-4" />
              </span>
              Find a Companion
            </button>

            <button
              style={{ transitionDelay: reached('done') ? '180ms' : '0ms' }}
              onClick={() => scrollToSection('WHY-Works-section')}
              className="flex items-center gap-2 px-7 py-3.5 rounded-full border-2 border-[#0D9488] bg-white text-[#1B2A4A] font-semibold text-base sm:text-lg hover:bg-[#0D9488]/5 transition-all duration-500 hover:scale-105 active:scale-95"
            >
              <PlayCircle className="w-5 h-5 text-[#0D9488]" />
              How It Works
            </button>
          </div>

          <div
            className={`relative z-10 flex flex-col sm:flex-row items-center sm:items-center justify-start gap-3 sm:gap-5 w-full max-w-xl mx-auto md:mx-0 mt-5 transition-all duration-500 ${reached('done') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3 pointer-events-none'
              }`}
          >
            <a
              href={getWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm sm:text-base font-semibold text-[#1B2A4A] hover:text-[#0D9488] transition-colors"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="#25D366">
                <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.33 4.95L2 22l5.28-1.39a9.9 9.9 0 0 0 4.76 1.21h.01c5.46 0 9.91-4.45 9.91-9.91C21.96 6.45 17.5 2 12.04 2zm5.8 14.02c-.24.68-1.4 1.3-1.93 1.38-.5.08-1.12.11-1.8-.11-.42-.13-.96-.31-1.65-.6-2.9-1.25-4.8-4.15-4.94-4.34-.14-.19-1.19-1.58-1.19-3.01 0-1.43.75-2.13 1.02-2.42.27-.29.58-.36.78-.36.19 0 .39 0 .56.01.18.01.42-.07.66.5.24.58.82 2.01.9 2.15.07.15.12.32.02.51-.1.19-.15.3-.29.47-.15.16-.31.36-.44.48-.15.15-.3.31-.13.6.17.29.75 1.24 1.62 2.01 1.11.99 2.05 1.3 2.34 1.45.29.15.46.13.63-.08.17-.2.72-.84.92-1.13.19-.29.39-.24.65-.14.27.1 1.69.8 1.98.94.29.15.48.22.55.34.07.13.07.75-.17 1.42z"/>
              </svg>
              Book on WhatsApp
            </a>
            <span className="hidden sm:block w-px h-5 bg-gray-300" />
            <a
              href={PHONE_LINK}
              className="flex items-center gap-2 text-sm sm:text-base font-semibold text-[#1B2A4A] hover:text-[#0D9488] transition-colors"
            >
              <Phone className="w-[18px] h-[18px] text-[#0D9488]" />
              Call 24/7: {PHONE_DISPLAY}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}