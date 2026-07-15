import { useSectionFade } from '../hooks/useSectionFade'
import { useEffect, useRef } from 'react'
import { CheckCircle2, Eye, Clock, Users, Heart, Leaf, ShieldCheck, Star, Sparkle } from 'lucide-react'

const signals = [
  {
    id: 'verified',
    number: '01',
    title: 'Verified',
    subtitle: 'Companions',
    description: 'Every WHY PRO is thoroughly background-verified and professionally trained, ensuring trusted care and complete peace of mind.',
    Icon: CheckCircle2,
    theme: 'emerald',
    titleColor: 'text-emerald-600',
    iconColor: 'text-emerald-500',
    ringBg: 'bg-emerald-50',
    ringInner: 'bg-emerald-100/60',
    underline: 'bg-emerald-400',
    badgeBg: 'bg-emerald-600',
    waveColor: 'text-emerald-100',
  },
  {
    id: 'supervised',
    number: '02',
    title: 'Supervised',
    subtitle: 'Visits',
    description: 'Every visit is monitored through regular quality checks to ensure a safe, consistent, and reliable experience.',
    Icon: Eye,
    theme: 'teal',
    titleColor: 'text-teal-600',
    iconColor: 'text-teal-500',
    ringBg: 'bg-teal-50',
    ringInner: 'bg-teal-100/60',
    underline: 'bg-teal-400',
    badgeBg: 'bg-teal-600',
    waveColor: 'text-teal-100',
  },
  {
    id: 'updates',
    number: '03',
    title: 'Real-Time',
    subtitle: 'Updates',
    description: "Receive real-time visit updates and instant notifications, so you're always informed and reassured.",
    Icon: Clock,
    theme: 'blue',
    titleColor: 'text-blue-600',
    iconColor: 'text-blue-500',
    ringBg: 'bg-blue-50',
    ringInner: 'bg-blue-100/60',
    underline: 'bg-blue-400',
    badgeBg: 'bg-blue-600',
    waveColor: 'text-blue-100',
  },
  {
    id: 'assistance',
    number: '04',
    title: 'Emergency Support',
    subtitle: 'Assistance',
    description: '24/7 support on WhatsApp or call at +91 90365 99439 — local teams ready to help, anytime you need us.',
    Icon: Users,
    theme: 'indigo',
    titleColor: 'text-indigo-600',
    iconColor: 'text-indigo-500',
    ringBg: 'bg-indigo-50',
    ringInner: 'bg-indigo-100/60',
    underline: 'bg-indigo-400',
    badgeBg: 'bg-indigo-600',
    waveColor: 'text-indigo-100',
  },
]

export default function TrustSignals() {
  const sectionRef = useSectionFade()
  const cardsRef = useRef([])

  // Intersection Observer for card animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('card-visible')
            entry.target.classList.remove('card-hidden')
          }
        })
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    )

    cardsRef.current.forEach((card) => {
      if (card) observer.observe(card)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} id="trust-section" className="relative py-24 overflow-hidden bg-[#F7F3EA]">

      {/* ===== Soft background wash ===== */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/60 via-[#F7F3EA] to-indigo-50/60" />
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-white/40 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-100/30 rounded-full blur-3xl" />

      {/* Leaf decorations, top corners */}
      <svg className="absolute -top-6 -left-6 w-44 h-44 text-emerald-300/70" viewBox="0 0 100 100" fill="none">
        <path d="M10,90 C10,60 30,20 70,10 C60,35 55,55 50,70 C40,60 25,60 10,90 Z" fill="currentColor" opacity="0.5" />
        <path d="M70,10 C50,30 40,55 50,70" stroke="currentColor" strokeWidth="1.5" opacity="0.7" />
      </svg>
      <svg className="absolute -top-6 -right-6 w-44 h-44 text-emerald-300/70 scale-x-[-1]" viewBox="0 0 100 100" fill="none">
        <path d="M10,90 C10,60 30,20 70,10 C60,35 55,55 50,70 C40,60 25,60 10,90 Z" fill="currentColor" opacity="0.5" />
        <path d="M70,10 C50,30 40,55 50,70" stroke="currentColor" strokeWidth="1.5" opacity="0.7" />
      </svg>
      <svg className="absolute bottom-8 -left-6 w-40 h-40 text-emerald-300/60 scale-y-[-1]" viewBox="0 0 100 100" fill="none">
        <path d="M10,90 C10,60 30,20 70,10 C60,35 55,55 50,70 C40,60 25,60 10,90 Z" fill="currentColor" opacity="0.4" />
      </svg>
      <svg className="absolute bottom-8 -right-6 w-40 h-40 text-indigo-300/60 scale-x-[-1] scale-y-[-1]" viewBox="0 0 100 100" fill="none">
        <path d="M10,90 C10,60 30,20 70,10 C60,35 55,55 50,70 C40,60 25,60 10,90 Z" fill="currentColor" opacity="0.4" />
      </svg>

      {/* Dot grids */}
      <div className="hidden sm:grid absolute top-10 right-14 grid-cols-6 gap-2 opacity-40">
        {Array.from({ length: 24 }).map((_, i) => (
          <span key={i} className="w-1.5 h-1.5 rounded-full bg-slate-400" />
        ))}
      </div>
      <div className="hidden sm:grid absolute bottom-24 left-10 grid-cols-5 gap-2 opacity-30">
        {Array.from({ length: 15 }).map((_, i) => (
          <span key={i} className="w-1.5 h-1.5 rounded-full bg-slate-400" />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="fade-inner inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 font-semibold text-sm px-4 py-2 rounded-full mb-6 shadow-sm">
            <ShieldCheck className="w-4 h-4" />
            The WHY Promise
          </div>

          <h2 className="fade-inner text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4 text-[#0A1F44]">
            Why{' '}
            <span className="bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent">
              Families Trust
            </span>{' '}  Us
          </h2>

          <div className="fade-inner flex items-center justify-center gap-3 mb-4">
            <span className="w-20 sm:w-32 h-[2px] bg-gradient-to-r from-transparent to-emerald-400" />
            <Heart className="w-4 h-4 text-[#0D9488] fill-[#0D9488]" />
            <span className="w-20 sm:w-32 h-[2px] bg-gradient-to-l from-transparent to-indigo-400" />
          </div>

          <p className="fade-inner text-[#0A1F44]/60 text-lg max-w-2xl mx-auto">
            Every interaction is built on compassion, trust, and dignity—so Seniors and Individuals feel cared for and families feel reassured          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 items-stretch">
          {signals.map((signal, index) => (
            <div
              key={signal.id}
              ref={(el) => (cardsRef.current[index] = el)}
              className="card-hidden group relative bg-white rounded-3xl overflow-hidden text-center
                shadow-lg transition-all duration-500 ease-out
                hover:-translate-y-2 hover:shadow-2xl
                h-full flex flex-col cursor-pointer"
              style={{
                transform: 'translateY(30px)',
                opacity: 0,
                transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
                transitionDelay: `${index * 100}ms`
              }}
            >
              {/* ===== FRONT FACE — icon, title, subtitle, number ===== */}
              <div className="relative px-5 pt-7 pb-12 flex-1 flex flex-col transition-opacity duration-300 ease-out group-hover:opacity-0">
                {/* Sparkle decorations */}
                <Sparkle className={`absolute top-5 left-5 w-3 h-3 ${signal.iconColor} opacity-60`} fill="currentColor" />
                <Sparkle className={`absolute top-8 right-6 w-2 h-2 ${signal.iconColor} opacity-40`} fill="currentColor" />

                {/* Icon with layered rings */}
                <div className="relative w-16 h-16 mx-auto mb-3 flex items-center justify-center flex-shrink-0">
                  <div className={`absolute inset-0 rounded-full ${signal.ringBg}`} />
                  <div className={`absolute inset-1.5 rounded-full ${signal.ringInner}`} />
                  <div className="absolute inset-3 rounded-full bg-white shadow-sm" />
                  <signal.Icon className={`relative w-6 h-6 ${signal.iconColor} transition-transform duration-500 group-hover:scale-110`} strokeWidth={2} />
                </div>

                {/* Title */}
                <h3 className={`text-lg font-bold ${signal.titleColor} flex-shrink-0`}>
                  {signal.title}
                </h3>
                <p className="text-base font-semibold text-slate-400 mb-2 flex-shrink-0">
                  {signal.subtitle}
                </p>
                <span className={`block w-8 h-[3px] mx-auto rounded-full mb-3 flex-shrink-0 ${signal.underline}`} />

                {/* Hint that more info is on hover */}
                <span className="mt-auto text-[11px] font-medium text-slate-300 tracking-wide uppercase">
                  <span className="block md:hidden">
                    Tap to Learn More
                  </span>

                  <span className="hidden md:block">
                    Hover to Learn More
                  </span>
                </span>
              </div>

              {/* Wavy bottom with number badge */}
              <div className="relative h-12 flex-shrink-0 transition-opacity duration-300 ease-out group-hover:opacity-0">
                <svg
                  className={`absolute inset-0 w-full h-full ${signal.waveColor}`}
                  viewBox="0 0 300 60"
                  preserveAspectRatio="none"
                >
                  <path d="M0,30 C75,60 225,0 300,30 L300,60 L0,60 Z" fill="currentColor" />
                </svg>
                <div className={`absolute left-1/2 bottom-1.5 -translate-x-1/2 w-9 h-9 rounded-full ${signal.badgeBg} text-white
                  flex items-center justify-center font-bold text-xs shadow-lg border-4 border-white`}>
                  {signal.number}
                </div>
              </div>

              {/* ===== HOVER REVEAL — themed panel with full description ===== */}
              <div
                className={`absolute inset-0 ${signal.badgeBg} text-white flex flex-col items-center justify-center
                  px-6 py-8 text-center
                  opacity-0 scale-95 translate-y-2
                  group-hover:opacity-100 group-hover:scale-100 group-hover:translate-y-0
                  transition-all duration-400 ease-out
                  pointer-events-none group-hover:pointer-events-auto`}
              >
                <span className="absolute top-4 right-5 text-xs font-bold text-white/50">
                  {signal.number}
                </span>
                <div className="w-12 h-12 rounded-full bg-white/15 flex items-center justify-center mb-4">
                  <signal.Icon className="w-6 h-6 text-white" strokeWidth={2} />
                </div>
                <h3 className="text-base font-bold mb-1 leading-snug">
                  {signal.title} {signal.subtitle}
                </h3>
                <span className="block w-8 h-[2px] bg-white/40 rounded-full mb-3" />
                <p className="text-sm leading-relaxed text-white/90 max-w-[22ch]">
                  {signal.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Trust Badge */}
        <div className="mt-16 flex justify-center">
          <div className="fade-inner inline-flex items-center gap-4 sm:gap-6 px-6 sm:px-8 py-4 bg-white rounded-full shadow-lg">
            <div className="w-11 h-11 rounded-full bg-emerald-600 flex items-center justify-center flex-shrink-0">
              <ShieldCheck className="w-5 h-5 text-white" />
            </div>
            <div className="text-left">
              <p className="text-[#0A1F44] font-bold text-base sm:text-lg leading-tight">Built on Trust & Safety</p>
              <p className="text-slate-400 text-sm">Because your loved ones deserve nothing less than trusted companionship.</p>
            </div>
            {/*
            <span className="hidden sm:block w-px h-10 bg-slate-200" />
            <div className="hidden sm:flex gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="w-5 h-5 text-amber-400" fill="currentColor" />
              ))}
            </div>
            */}
          </div>
        </div>

      </div>

      {/* ===== ANIMATION STYLES ===== */}
      <style jsx>{`
        .card-hidden {
          opacity: 0;
          transform: translateY(30px);
        }

        .card-visible {
          opacity: 1 !important;
          transform: translateY(0) !important;
        }
      `}</style>
    </section>
  )
}