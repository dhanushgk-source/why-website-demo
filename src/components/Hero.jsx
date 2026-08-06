import { useSectionFade } from '../hooks/useSectionFade'
import { useEffect, useState } from 'react'
import {
  useContactInfo,
  getPhoneLink,
  getWhatsAppLink,
  ANDROID_APP_LINK,
  IOS_APP_LINK,
} from '../config/contact'

// All icons used in this component as plain inline SVG
const Icon = {
  users: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  stethoscope: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M6 3v5a3 3 0 0 0 6 0V3" />
      <path d="M12 3v5a3 3 0 0 1-6 0" />
      <path d="M9 11v3a5 5 0 0 0 10 0v-1" />
      <circle cx="19" cy="12" r="2" />
    </svg>
  ),
  heart: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0L12 5.34l-.77-.76a5.4 5.4 0 0 0-7.65 0 5.4 5.4 0 0 0 0 7.65l.77.76L12 21l7.65-7.65.77-.76a5.4 5.4 0 0 0 0-7.65Z" />
    </svg>
  ),
  shieldCheck: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  ),
  clock: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  ),
  arrowRight: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  ),
  playCircle: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <circle cx="12" cy="12" r="10" />
      <polygon points="10 8 16 12 10 16 10 8" />
    </svg>
  ),
  phone: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  ),
  whatsapp: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
    </svg>
  ),
  android: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M21 10.5V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-8.5" />
      <path d="M7 2v3" />
      <path d="M17 2v3" />
      <path d="M3 7.5h18" />
      <path d="M8 12h.01" />
      <path d="M16 12h.01" />
    </svg>
  ),
  apple: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M12 4a4 4 0 0 1 3.5-2 4 4 0 0 1-3.5 2z" />
      <path d="M12 4v16" />
      <path d="M12 20a4 4 0 0 1-3.5 2 4 4 0 0 1 3.5-2z" />
      <path d="M12 20a4 4 0 0 0 3.5 2 4 4 0 0 0-3.5-2z" />
      <path d="M12 4a4 4 0 0 0-3.5 2 4 4 0 0 0 3.5-2z" />
      <circle cx="12" cy="12" r="9" />
    </svg>
  ),
  close: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M18 6L6 18" />
      <path d="M6 6l12 12" />
    </svg>
  ),
}

const BADGE = 'Companionship That Feels Like Family'

const SUBTEXT =
  "WHY connects seniors and individuals of all ages with trusted WHY PROs, gives families complete peace of mind, and creates meaningful opportunities for compassionate professionals."

const HIGHLIGHTS = [
  { icon: Icon.users, value: 'Elder Care', label: 'Compassionate companionship' },
  { icon: Icon.stethoscope, value: 'Hospital Assistance', label: 'Trusted support throughout your journey' },
  { icon: Icon.shieldCheck, value: 'Verified WHY PROs', label: 'Verified, trained & background-checked' },
  { icon: Icon.clock, value: '24/7 Support', label: 'Support whenever you need it' },
]

const REVEAL_DELAY = 130

export default function Hero() {
  const sectionRef = useSectionFade()
  const contactInfo = useContactInfo()
  const [started, setStarted] = useState(false)
  const [isPanelOpen, setIsPanelOpen] = useState(false)

  const BOOK_OPTIONS = [
    {
      label: 'Call Us',
      href: getPhoneLink(contactInfo.phone_number),
      icon: Icon.phone,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50 group-hover:bg-blue-100',
      borderColor: 'group-hover:border-blue-200',
      description: `Talk directly (${contactInfo.phone_number})`,
    },
    {
      label: 'WhatsApp',
      href: getWhatsAppLink("Hi! I want to book a WHY PRO companion.", contactInfo.whatsapp_number),
      icon: Icon.whatsapp,
      color: 'text-green-600',
      bgColor: 'bg-green-50 group-hover:bg-green-100',
      borderColor: 'group-hover:border-green-200',
      description: 'Quick booking via chat',
    },
    {
      label: 'Android App',
      href: ANDROID_APP_LINK,
      icon: Icon.android,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50 group-hover:bg-emerald-100',
      borderColor: 'group-hover:border-emerald-200',
      description: 'Download from Google Play',
    },
    {
      label: 'iPhone App',
      href: IOS_APP_LINK,
      icon: Icon.apple,
      color: 'text-gray-700',
      bgColor: 'bg-gray-50 group-hover:bg-gray-100',
      borderColor: 'group-hover:border-gray-200',
      description: 'Download from App Store',
    },
  ].filter((item) => item.href)

  useEffect(() => {
    const prefersReducedMotion =
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prefersReducedMotion) {
      setStarted(true)
      return
    }

    requestAnimationFrame(() => {
      setStarted(true)
    })
  }, [])

  const revealClass = `transition-all duration-700 ease-out ${started
      ? 'opacity-100 translate-y-0'
      : 'opacity-0 translate-y-5'
    }`

  const revealStyle = (stepIndex) => ({
    transitionDelay: started ? `${stepIndex * REVEAL_DELAY}ms` : '0ms',
  })

  const scrollToHowSection = () => {
    const targetSection = document.getElementById('WHY-Works-section')

    if (targetSection) {
      const targetPosition =
        targetSection.getBoundingClientRect().top + window.pageYOffset - 80

      window.scrollTo({ top: targetPosition, behavior: 'smooth' })
    } else {
      const sections = document.querySelectorAll('section')
      let heroIndex = -1

      sections.forEach((section, index) => {
        if (section === sectionRef.current) heroIndex = index
      })

      if (heroIndex !== -1 && heroIndex < sections.length - 1) {
        const nextSection = sections[heroIndex + 1]
        const nextPosition =
          nextSection.getBoundingClientRect().top + window.pageYOffset - 80

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
      {/* Floating Action Panel — overlay */}
      {isPanelOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm transition-opacity duration-300"
            onClick={() => setIsPanelOpen(false)}
          />

          {/* Panel */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div
              className="w-full max-w-md bg-white rounded-[28px] shadow-2xl border border-slate-100 transform transition-all duration-300 animate-in fade-in slide-in-from-bottom-4"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="relative px-6 py-5 border-b border-slate-100">
                <h3 className="text-xl font-bold text-[#1B2A4A] text-center">
                  Book a WHY PRO
                </h3>
                <p className="text-sm text-slate-500 text-center mt-1">
                  Choose how you'd like to book
                </p>
                <button
                  onClick={() => setIsPanelOpen(false)}
                  className="absolute right-4 top-4 p-2 rounded-full hover:bg-slate-100 transition-colors"
                  aria-label="Close"
                >
                  <Icon.close className="h-5 w-5 text-slate-400" />
                </button>
              </div>

              {/* Options */}
              <div className="p-4 space-y-3">
                {BOOK_OPTIONS.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    target={item.label === 'Call Us' ? '_self' : '_blank'}
                    rel="noopener noreferrer"
                    className={`
                      group flex items-center gap-4 p-4
                      rounded-2xl border-2 border-transparent
                      transition-all duration-300
                      ${item.bgColor} ${item.borderColor}
                      hover:scale-[1.02] hover:shadow-md
                      cursor-pointer
                    `}
                  >
                    {/* Icon Circle */}
                    <div className={`
                      flex h-12 w-12 flex-shrink-0 items-center justify-center
                      rounded-full bg-white shadow-sm
                      transition-all duration-300
                      group-hover:scale-110
                      ${item.color}
                    `}>
                      <item.icon className="h-6 w-6" />
                    </div>

                    {/* Text Content */}
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-slate-900 group-hover:text-slate-700 transition-colors">
                        {item.label}
                      </p>
                      <p className="text-sm text-slate-500">
                        {item.description}
                      </p>
                    </div>

                    {/* Arrow */}
                    <Icon.arrowRight className={`
                      h-5 w-5 text-slate-400
                      transition-all duration-300
                      group-hover:translate-x-1
                      ${item.color}
                    `} />
                  </a>
                ))}
              </div>

              {/* Footer */}
              <div className="px-6 py-4 border-t border-slate-100 bg-slate-50/50 rounded-b-[28px]">
                <p className="text-xs text-slate-400 text-center">
                  ✦ 24/7 support available ({contactInfo.phone_number}) • All bookings are verified
                </p>
              </div>
            </div>
          </div>
        </>
      )}

      <div className="fade-inner relative w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-14 pt-10 sm:pt-14 md:pt-20 pb-10 sm:pb-14 md:pb-16">

        <div className="flex flex-col md:flex-row md:items-center gap-10 md:gap-10 lg:gap-16">

          {/* LEFT — Copy */}
          <div className="w-full md:w-[54%] lg:w-[52%] flex flex-col items-start text-left relative z-10">

            {/* Badge */}
            <div className={revealClass} style={revealStyle(0)}>
              <div className="inline-flex items-center gap-2 bg-white border border-[#0D9488]/25 rounded-full pl-2.5 pr-4 py-1.5 shadow-sm mb-5">
                <span className="w-6 h-6 rounded-full bg-[#0D9488]/10 flex items-center justify-center flex-shrink-0">
                  <Icon.heart className="w-3.5 h-3.5 text-[#0D9488]" strokeWidth={2.25} fill="currentColor" />
                </span>
                <span className="text-[#1B2A4A] text-xs sm:text-sm font-semibold whitespace-nowrap">
                  {BADGE}
                </span>
              </div>
            </div>

            {/* Heading */}
            <div className="mb-4">
              <div className={revealClass} style={revealStyle(1)}>
                <h1 className="font-display text-4xl sm:text-5xl md:text-[2.75rem] lg:text-6xl font-extrabold tracking-tight leading-[1.05] text-[#1B2A4A]">
                  Care for
                </h1>
              </div>
              <div className={revealClass} style={revealStyle(2)}>
                <h1 className="font-display text-4xl sm:text-5xl md:text-[2.75rem] lg:text-6xl font-extrabold tracking-tight leading-[1.05] text-[#0D9488] pb-1.5 sm:pb-2">
                  <span className="relative inline-block">
                    Your family
                    <svg
                      className="absolute -bottom-1.5 sm:-bottom-2.5 left-0 w-full"
                      viewBox="0 0 180 12"
                      fill="none"
                      preserveAspectRatio="none"
                      aria-hidden="true"
                    >
                      <path
                        d="M3 9C40 1 140 1 177 9"
                        stroke="#F2711F"
                        strokeWidth="4"
                        strokeLinecap="round"
                      />
                    </svg>
                  </span>
                </h1>
              </div>
              <div className={revealClass} style={revealStyle(3)}>
                <h1 className="font-display text-4xl sm:text-5xl md:text-[2.75rem] lg:text-6xl font-extrabold tracking-tight leading-[1.05] text-[#1B2A4A]">
                  When You're Away
                </h1>
              </div>
            </div>

            {/* Subtext */}
            <p
              className={`text-gray-500 text-sm sm:text-base leading-relaxed max-w-md mb-7 ${revealClass}`}
              style={revealStyle(4)}
            >
              {SUBTEXT}
            </p>

            {/* CTAs */}
            <div
              className={`flex flex-col sm:flex-row items-center sm:items-center gap-3 sm:gap-4 w-full sm:w-auto ${revealClass}`}
              style={revealStyle(5)}
            >
              <button
                onClick={() => setIsPanelOpen(true)}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-[#F2711F] text-white font-bold text-sm sm:text-base hover:bg-[#D9600F] transition-all duration-500 shadow-lg shadow-orange-900/10 hover:scale-105 active:scale-95"
              >
                <span className="w-6 h-6 rounded-full bg-white/25 flex items-center justify-center flex-shrink-0">
                  <Icon.arrowRight className="w-3.5 h-3.5" />
                </span>
                Book Your WHY PRO
              </button>

              <button
                onClick={scrollToHowSection}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-full border-2 border-[#0D9488] bg-white text-[#1B2A4A] font-semibold text-sm hover:bg-[#0D9488]/5 transition-all duration-500 hover:scale-105 active:scale-95"
              >
                <Icon.playCircle className="w-4 h-4 text-[#0D9488]" />
                See How It Works
              </button>
            </div>
          </div>

          {/* RIGHT — Image */}
          <div className="w-full md:w-[46%] lg:w-[48%] relative">
            <div className="hidden sm:block absolute -top-6 -right-4 w-28 h-28 rounded-full bg-[#7FC8C0]/30 pointer-events-none" />
            <div className="hidden sm:block absolute top-16 -right-2 w-10 h-10 rounded-full bg-[#F6C89F] pointer-events-none" />
            <div className="hidden sm:block absolute -bottom-6 -left-6 w-24 h-24 rounded-full bg-[#0D9488]/10 pointer-events-none" />
            <div className="hidden sm:block absolute top-6 -left-4 grid grid-cols-5 gap-1.5 opacity-40 pointer-events-none">
              {Array.from({ length: 20 }).map((_, i) => (
                <span key={i} className="w-1 h-1 rounded-full bg-[#0D9488]" />
              ))}
            </div>

            <div className="relative w-full aspect-[4/3] sm:aspect-[16/11] md:aspect-[4/3] lg:aspect-[5/4] rounded-[2rem] overflow-hidden shadow-2xl shadow-[#1B2A4A]/10 ring-1 ring-black/5">
              <picture>
                <source
                  type="image/avif"
                  srcSet="
                    /Assests/elder-hero-768.avif 768w,
                    /Assests/elder-hero-1024.avif 1024w,
                    /Assests/elder-hero-1440.avif 1440w
                  "
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <source
                  type="image/webp"
                  srcSet="
                    /Assests/elder-hero-768.webp 768w,
                    /Assests/elder-hero-1024.webp 1024w,
                    /Assests/elder-hero-1440.webp 1440w
                  "
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <img
                  src="/Assests/elder-hero-1024.webp"
                  alt="Elderly companion and senior smiling together at home"
                  className="block w-full h-full object-cover"
                  loading="eager"
                  fetchPriority="high"
                  decoding="async"
                  width="1024"
                  height="820"
                />
              </picture>
              <div className="absolute inset-0 rounded-[2rem] ring-1 ring-inset ring-white/10 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* SERVICE HIGHLIGHTS BAR */}
        <div
          className={`relative z-10 mt-8 sm:mt-10 md:mt-14 ${revealClass}`}
          style={revealStyle(6)}
        >
          <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl border border-[#0D9488]/10 px-4 sm:px-8 py-5 sm:py-6 grid grid-cols-2 sm:grid-cols-4 gap-x-4 gap-y-6 max-w-4xl">
            {HIGHLIGHTS.map((item) => (
              <div key={item.value} className="flex items-start gap-2.5 sm:gap-3 min-w-0">
                <span className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#0D9488]/10 flex items-center justify-center flex-shrink-0">
                  <item.icon className="w-4 h-4 sm:w-5 sm:h-5 text-[#0D9488]" strokeWidth={2} />
                </span>
                <div className="leading-tight min-w-0">
                  <p className="text-[#1B2A4A] font-extrabold text-xs sm:text-sm">
                    {item.value}
                  </p>
                  <p className="text-gray-500 text-[10px] sm:text-xs mt-0.5">
                    {item.label}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}