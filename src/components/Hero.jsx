import { useSectionFade } from '../hooks/useSectionFade'
import { useEffect, useState } from 'react'
import { Users, HeartHandshake, User, ArrowRight, PlayCircle } from 'lucide-react'

const TAGLINE = 'Companionship That Feels Like a Family.'
const SUBTEXT = 'Connecting Seniors With Trusted Companions, Giving Families Peace of Mind, and Creating Meaningful Opportunities For Compassionate Professionals.'
// Split into words with their first letters highlighted
const WORD_PARTS = {
  word1: { full: 'We', first: 'W', rest: 'e' },
  word2: { full: 'Help', first: 'H', rest: 'elp' },
  word3: { full: 'You', first: 'Y', rest: 'ou' }
}

// Ordered typing queue with split word typing
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

        {/* Left Side - Image with gradient background and organic shapes */}
        <div className="relative w-full md:w-[60%] flex-shrink-0">

          {/* Image block — its own height, no card overlapping on mobile */}
          <div className="relative w-full h-[50vh] min-h-[320px] md:h-auto md:min-h-[75vh] overflow-hidden">

            {/* Gradient background */}
            <div
              className="absolute inset-0"
              style={{
                background: 'radial-gradient(120% 100% at 20% 20%, #FBE3C7 0%, #F7D9B8 35%, #F7F3EA 75%)'
              }}
            />

            {/* Soft organic blob shape (adds depth behind the photo) */}
            <div
              className="absolute -top-10 -left-10 w-[70%] h-[70%] rounded-[45%_55%_60%_40%/50%_45%_55%_50%] opacity-60"
              style={{ background: 'linear-gradient(135deg, #F6C89F 0%, #FBE3C7 100%)' }}
            />

            {/* Dot grid pattern */}
            <div className="hidden sm:grid absolute top-10 right-16 grid-cols-6 gap-2 opacity-50">
              {Array.from({ length: 24 }).map((_, i) => (
                <span key={i} className="w-1 h-1 rounded-full bg-[#D98A4A]" />
              ))}
            </div>

            {/* Leaf branch illustration */}
            <svg
              className="hidden sm:block absolute top-4 right-10 w-16 h-40 text-[#A8C7A1] opacity-70"
              viewBox="0 0 100 260"
              fill="none"
            >
              <path d="M50 260 L50 20" stroke="currentColor" strokeWidth="2" />
              <ellipse cx="50" cy="40" rx="22" ry="12" fill="currentColor" transform="rotate(-30 50 40)" />
              <ellipse cx="50" cy="80" rx="20" ry="11" fill="currentColor" transform="rotate(25 50 80)" />
              <ellipse cx="50" cy="120" rx="18" ry="10" fill="currentColor" transform="rotate(-25 50 120)" />
              <ellipse cx="50" cy="160" rx="16" ry="9" fill="currentColor" transform="rotate(20 50 160)" />
            </svg>

            {/* Small rotated square accent icon */}
            <div className="hidden sm:block absolute top-6 left-14 w-3 h-3 border-2 border-[#D98A4A]/60 rotate-45" />

            {/* SVG clipPath definition — an S-curve on the right edge (objectBoundingBox scales with the element) */}
            <svg width="0" height="0" className="absolute">
              <defs>
                <clipPath id="heroImageClip" clipPathUnits="objectBoundingBox">
                  <path d="M0,0 L0.95,0 C0.99,0.12 1,0.22 0.97,0.34 C0.95,0.44 0.95,0.56 0.97,0.66 C1,0.78 0.99,0.88 0.95,1 L0,1 Z" />
                </clipPath>
              </defs>
            </svg>

            {/* The photo — inset on desktop so gradient/shapes show around its edges, full-bleed on mobile */}
            <div
              className="absolute inset-0 md:left-6 md:top-6 md:bottom-6"
              style={{
                backgroundImage: "url('/Assests/elder.jpg')",
                backgroundSize: 'cover',
                backgroundPosition: 'center 25%',
                clipPath: 'url(#heroImageClip)',
                WebkitClipPath: 'url(#heroImageClip)'
              }}
            />
          </div>

          {/* Info card — stacked below the image on mobile, overlapping on desktop */}
          <div className="relative md:absolute md:left-8 md:bottom-8 -mt-6 md:mt-0 mx-4 md:mx-0 bg-white rounded-2xl shadow-xl px-3 sm:px-6 py-3 sm:py-4 grid grid-cols-3 md:flex md:items-center gap-2 md:gap-6 z-10">
            {INFO_ITEMS.map((item, idx) => (
              <div
                key={item.title}
                className="flex flex-col md:flex-row items-center md:items-center text-center md:text-left gap-1 md:gap-2 min-w-0"
              >
                <item.icon className="w-5 h-5 sm:w-7 sm:h-7 text-[#F2711F] flex-shrink-0" strokeWidth={1.75} />
                <div className="leading-tight min-w-0 w-full">
                  <p className="text-[#1B2A4A] font-bold text-[10px] sm:text-sm whitespace-normal md:whitespace-nowrap break-words">
                    {item.title}
                  </p>
                  <p className="text-gray-500 text-[8px] sm:text-xs whitespace-normal md:whitespace-nowrap break-words leading-tight">
                    {item.subtitle}
                  </p>
                </div>
                {idx < INFO_ITEMS.length - 1 && (
                  <span className="hidden md:block w-px h-8 bg-gray-200 ml-2 md:ml-4" />
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

          {/* Content column */}
          <div className="relative w-full max-w-2xl mx-auto md:mx-0 z-10">

            {/* Title - 3 stacked words */}
            <div className="mb-2">
              {/* Word 1: "We" */}
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

              {/* Word 2: "Help" */}
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

              {/* Word 3: "You" */}
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

              {/* Divider */}
              <div className="flex items-center gap-2 my-5">
                <span className="w-14 h-[3px] rounded-full bg-[#F2711F]" />
                <HeartHandshake className="w-4 h-4 text-[#0D9488]" strokeWidth={2} />
              </div>
            </div>

            {/* Tagline */}
            <h2 className="text-2xl sm:text-3xl md:text-2xl lg:text-3xl text-[#1B2A4A] font-extrabold mb-4 min-h-[1.2em] tracking-tight leading-snug text-left max-w-[22ch]">
              {activeKey === 'tag' && <Cursor color="bg-[#1B2A4A]" size="h-[0.8em]" />}
              {texts.tag}
            </h2>

            {/* Subtext */}
            <p
              className={`text-gray-500 text-base sm:text-lg max-w-md mb-8 transition-all duration-500 ${reached('done') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
                }`}
            >
              {SUBTEXT}
            </p>
          </div>

          {/* CTAs */}
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
        </div>
      </div>
    </section>
  )
}