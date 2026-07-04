import { useSectionFade } from '../hooks/useSectionFade'
import { useEffect, useState } from 'react'

const BIG_WORD = 'We Help You'
const TAGLINE = 'Companionship that feels like a family.'

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
  const Cursor = ({ color = 'bg-white', size = 'h-[0.9em]' }) => (
    <span className={`inline-block w-[3px] ${size} ${color} ml-1 align-middle animate-pulse`} />
  )

  const isActive = (part) => activeKey === part

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
    <section ref={sectionRef} className="w-full" id="hero-section">
      <div className="fade-inner relative w-full min-h-[75vh] min-h-[75svh] overflow-hidden flex flex-col md:flex-row">

        {/* Left Side - Content Section */}
        <div className="relative w-full md:w-1/2 min-h-[40vh] md:min-h-[75vh] bg-[#FFFFFF] flex flex-col justify-center px-6 sm:px-10 md:px-14 lg:px-20 xl:px-24 py-10 md:py-12">

          {/* Content column */}
          <div className="w-full max-w-xl mx-auto md:mx-0">

            {/* Title table: left column = 3 stacked word rows, right column = merged logo cell spanning all 3 rows */}
            <div className="grid grid-cols-[1fr_auto] gap-x-6 md:gap-x-8 mb-4">
              {/* Word 1: "We" — row 1, col 1 */}
              <div className="row-start-1 col-start-1 flex items-baseline justify-start gap-0">
                <span className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-8xl font-bold tracking-tight leading-[0.85] text-[#0A1F44]">
                  {texts.word1_first}
                  {isActive('word1_first') && <Cursor color="bg-[#0A1F44]" size="h-[0.9em]" />}
                </span>
                <span className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-7xl font-bold tracking-tight leading-[0.85] bg-gradient-to-r from-[#0D9488] to-[#2DD4BF] bg-clip-text text-transparent">
                  {texts.word1_rest}
                  {isActive('word1_rest') && <Cursor color="bg-[#0D9488]" size="h-[0.7em]" />}
                </span>
              </div>

              {/* Word 2: "Help" — row 2, col 1 */}
              <div className="row-start-2 col-start-1 flex items-baseline justify-start gap-0">
                <span className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-8xl font-bold tracking-tight leading-[0.85] text-[#0A1F44]">
                  {texts.word2_first}
                  {isActive('word2_first') && <Cursor color="bg-[#0A1F44]" size="h-[0.9em]" />}
                </span>
                <span className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-7xl font-bold tracking-tight leading-[0.85] bg-gradient-to-r from-[#0D9488] to-[#2DD4BF] bg-clip-text text-transparent">
                  {texts.word2_rest}
                  {isActive('word2_rest') && <Cursor color="bg-[#0D9488]" size="h-[0.7em]" />}
                </span>
              </div>

              {/* Word 3: "You" — row 3, col 1 */}
              <div className="row-start-3 col-start-1 flex items-baseline justify-start gap-0">
                <span className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-8xl font-bold tracking-tight leading-[0.85] text-[#0A1F44]">
                  {texts.word3_first}
                  {isActive('word3_first') && <Cursor color="bg-[#0A1F44]" size="h-[0.9em]" />}
                </span>
                <span className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-7xl font-bold tracking-tight leading-[0.85] bg-gradient-to-r from-[#0D9488] to-[#2DD4BF] bg-clip-text text-transparent">
                  {texts.word3_rest}
                  {isActive('word3_rest') && <Cursor color="bg-[#0D9488]" size="h-[0.7em]" />}
                </span>
              </div>

              {/* Logo — merged cell, col 2, spans all 3 rows */}
              <div className="row-start-1 row-span-3 col-start-2 flex items-center justify-center">
                <img
                  src="/Assests/WHY_logo.png"
                  alt="WHY logo"
                  className="h-full max-h-[140px] sm:max-h-[170px] md:max-h-[200px] w-auto object-contain"
                />
              </div>
            </div>

             {/* Tagline */}
            <h2 className="text-xl sm:text-3xl md:text-4xl lg:text-4xl font-bold mb-8 min-h-[1.2em] tracking-tight leading-[1.2] text-[#0A1F44] max-w-[22ch]">
              Companionship that <br />
              feels like a{" "}
              <span className="bg-gradient-to-r text-[#E07A5F] bg-clip-text text-transparent">
                family
              </span>
              .
            </h2>
          </div>

          {/* CTAs */}
          <div
            className={`flex flex-col sm:flex-row items-center justify-start gap-4 sm:gap-5 w-full transition-all duration-500 ${reached('done') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3 pointer-events-none'
              }`}
          >
            <button
              style={{ transitionDelay: reached('done') ? '80ms' : '0ms' }}
              onClick={scrollToNextSection}
              className="px-8 py-4 rounded-full bg-[#F2711F] text-white font-semibold text-base sm:text-lg hover:bg-[#D9600F] transition-all duration-500 shadow-lg shadow-black/10 hover:scale-105 active:scale-95"
            >
              Explore WHY
            </button>

            <button
              style={{ transitionDelay: reached('done') ? '180ms' : '0ms' }}
              onClick={() => scrollToSection('WHY-Works-section')}
              className="px-8 py-4 rounded-full border-2 border-[#0F9B8E] bg-[#EAF7F5] text-[#0F9B8E] font-semibold text-base sm:text-lg hover:bg-[#DCF2EF] transition-all duration-500 hover:scale-105 active:scale-95"
            >
              How It Works
            </button>
          </div>
        </div>

        {/* Right Side - Image Section with Wavey Curve */}
        <div className="relative w-full md:w-1/2 min-h-[40vh] md:min-h-[75vh] flex-shrink-0">
          {/* Image */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url('/Assests/elder.jpg')" }}
          />


        
        </div>

      </div>
    </section>
  )
}