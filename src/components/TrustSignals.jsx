import { useSectionFade } from '../hooks/useSectionFade'
import { useEffect, useRef } from 'react'

const signals = [
  {
    id: 'verified',
    title: 'Verified',
    subtitle: 'Companions',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-10 h-10">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    gradient: 'from-emerald-50 to-emerald-100/30',
    borderColor: 'border-emerald-200',
    hoverBorder: 'group-hover:border-emerald-400',
    iconBg: 'bg-emerald-50',
    iconColor: 'text-emerald-500',
    titleGradient: 'from-emerald-500 to-teal-500',
    shadowColor: 'shadow-emerald-100/50',
    hoverShadow: 'hover:shadow-emerald-200/50',
    dotColor: 'from-emerald-400 to-teal-400',
    bgColor: 'emerald',
  },
  {
    id: 'supervised',
    title: 'Supervised',
    subtitle: 'Visits',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-10 h-10">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    gradient: 'from-teal-50 to-teal-100/30',
    borderColor: 'border-teal-200',
    hoverBorder: 'group-hover:border-teal-400',
    iconBg: 'bg-teal-50',
    iconColor: 'text-teal-500',
    titleGradient: 'from-teal-500 to-cyan-500',
    shadowColor: 'shadow-teal-100/50',
    hoverShadow: 'hover:shadow-teal-200/50',
    dotColor: 'from-teal-400 to-cyan-400',
    bgColor: 'teal',
  },
  {
    id: 'updates',
    title: 'Real-Time',
    subtitle: 'Updates',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-10 h-10">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    gradient: 'from-cyan-50 to-cyan-100/30',
    borderColor: 'border-cyan-200',
    hoverBorder: 'group-hover:border-cyan-400',
    iconBg: 'bg-cyan-50',
    iconColor: 'text-cyan-500',
    titleGradient: 'from-cyan-500 to-blue-500',
    shadowColor: 'shadow-cyan-100/50',
    hoverShadow: 'hover:shadow-cyan-200/50',
    dotColor: 'from-cyan-400 to-blue-400',
    bgColor: 'cyan',
  },
  {
    id: 'assistance',
    title: 'On-Ground',
    subtitle: 'Assistance',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-10 h-10">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
      </svg>
    ),
    gradient: 'from-blue-50 to-blue-100/30',
    borderColor: 'border-blue-200',
    hoverBorder: 'group-hover:border-blue-400',
    iconBg: 'bg-blue-50',
    iconColor: 'text-blue-500',
    titleGradient: 'from-blue-500 to-indigo-500',
    shadowColor: 'shadow-blue-100/50',
    hoverShadow: 'hover:shadow-blue-200/50',
    dotColor: 'from-blue-400 to-indigo-400',
    bgColor: 'blue',
  },
  {
    id: 'accountable',
    title: 'Safe &',
    subtitle: 'Accountable',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-10 h-10">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5a6 6 0 11-12 0 6 6 0 0112 0zm-6 0a.75.75 0 00-1.5 0 .75.75 0 001.5 0zm7.5 0a6 6 0 11-12 0 6 6 0 0112 0zm-6 0a.75.75 0 00-1.5 0 .75.75 0 001.5 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3a9 9 0 100 18.75 9 9 0 000-18.75z" />
      </svg>
    ),
    gradient: 'from-indigo-50 to-indigo-100/30',
    borderColor: 'border-indigo-200',
    hoverBorder: 'group-hover:border-indigo-400',
    iconBg: 'bg-indigo-50',
    iconColor: 'text-indigo-500',
    titleGradient: 'from-indigo-500 to-purple-500',
    shadowColor: 'shadow-indigo-100/50',
    hoverShadow: 'hover:shadow-indigo-200/50',
    dotColor: 'from-indigo-400 to-purple-400',
    bgColor: 'indigo',
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
    <section ref={sectionRef} id="trust-section" className="relative py-24 overflow-hidden">

      {/* ===== MULTI-COLOR GRADIENT BACKGROUND ===== */}

      {/* Main gradient base - blending all colors */}
      <div className="absolute inset-0 bg-gradient-to-br 
        from-emerald-50/80 
        via-teal-50/70 
        via-cyan-50/70 
        via-blue-50/70 
        to-indigo-50/80" />

      {/* Secondary gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-tr 
        from-emerald-100/20 
        via-teal-100/20 
        via-cyan-100/20 
        via-blue-100/20 
        to-indigo-100/20" />

      {/* Animated floating gradient blobs with all colors */}
      <div className="absolute top-0 -left-1/4 w-96 h-96 bg-emerald-200/30 rounded-full blur-3xl animate-float-slow" />
      <div className="absolute top-1/4 -right-1/4 w-96 h-96 bg-teal-200/25 rounded-full blur-3xl animate-float-slower" />
      <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-cyan-200/20 rounded-full blur-3xl animate-float-medium" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl animate-float-slow" />
      <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-indigo-200/15 rounded-full blur-3xl animate-float-slower" />

      {/* Diagonal color streaks for dynamic feel */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-400/20 via-teal-400/20 via-cyan-400/20 via-blue-400/20 to-indigo-400/20" />
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-400/20 via-blue-400/20 via-cyan-400/20 via-teal-400/20 to-emerald-400/20" />

      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.02] bg-repeat bg-[url('data:image/svg+xml,%3Csvg%20width=%2260%22%20height=%2260%22%20viewBox=%220%200%2060%2060%22%20xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg%20fill=%22none%22%20fill-rule=%22evenodd%22%3E%3Cg%20fill=%22%23000000%22%20fill-opacity=%221%22%3E%3Cpath%20d=%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"
      />
      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* Section Header with enhanced gradient */}
        <div className="text-center mb-16">
          <h2 className="fade-inner text-4xl sm:text-5xl md:text-6xl font-bold mb-4">
            Why Trust{' '}
            <span className="bg-gradient-to-r from-emerald-500 via-teal-500 via-cyan-500 via-blue-500 to-indigo-500 bg-clip-text text-transparent animate-gradient-shift">
              WHY
            </span>
          </h2>
          <div className="fade-inner w-24 h-1 mx-auto bg-gradient-to-r from-emerald-400 via-teal-400 via-cyan-400 via-blue-400 to-indigo-400 rounded-full animate-pulse-slow" />
          <p className="fade-inner text-gray-600/80 mt-4 text-lg max-w-2xl mx-auto">
            Our commitment to safety, transparency, and quality care
          </p>
        </div>

        {/* Features Grid - 5 items in a row on large screens */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 md:gap-8">
          {signals.map((signal, index) => (
            <div
              key={signal.id}
              ref={(el) => (cardsRef.current[index] = el)}
              className={`card-hidden group relative bg-white/70 backdrop-blur-md rounded-2xl p-6 text-center
                border ${signal.borderColor}
                shadow-lg ${signal.shadowColor} ${signal.hoverShadow}
                transition-all duration-500 ease-out
                hover:-translate-y-3 hover:scale-[1.02] hover:shadow-2xl
                ${signal.hoverBorder}`}
              style={{
                transform: 'translateY(30px)',
                opacity: 0,
                transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
                transitionDelay: `${index * 100}ms`
              }}
            >
              {/* Light gradient overlay on hover */}
              <div className={`absolute inset-0 bg-gradient-to-b ${signal.gradient} opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity duration-500`} />

              {/* Icon Container with light background */}
              <div className={`relative w-20 h-20 mx-auto mb-4 rounded-2xl ${signal.iconBg}
                flex items-center justify-center transition-all duration-500
                group-hover:scale-110 group-hover:rotate-3
                shadow-sm ${signal.shadowColor}`}>
                <div className={`${signal.iconColor} transition-all duration-500 group-hover:scale-110`}>
                  {signal.icon}
                </div>

                {/* Light pulsing ring effect on hover */}
                <div className={`absolute inset-0 rounded-2xl border-2 ${signal.borderColor} opacity-0 
                  group-hover:opacity-100 group-hover:animate-ping-slow`} />
              </div>

              {/* Title - First line with gradient */}
              <h3 className={`text-xl font-bold mb-1 bg-gradient-to-r ${signal.titleGradient} bg-clip-text text-transparent`}>
                {signal.title}
              </h3>

              {/* Subtitle - Second line */}
              <p className="text-gray-500/80 font-medium text-lg">
                {signal.subtitle}
              </p>

              {/* Decorative dot at bottom with light gradient */}
              <div className={`absolute bottom-4 left-1/2 -translate-x-1/2 w-6 h-1 rounded-full 
                bg-gradient-to-r ${signal.dotColor} opacity-0 group-hover:opacity-100 
                transition-all duration-500 group-hover:w-12`} />
            </div>
          ))}
        </div>

        {/* Bottom Trust Badge with multi-color gradient */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/60 backdrop-blur-md rounded-full shadow-lg border border-white/20">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-emerald-100 to-indigo-100 flex items-center justify-center">
              <svg className="w-5 h-5 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <span className="text-gray-600 font-medium">100% Verified & Trusted Platform</span>
            <div className="flex gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span className="w-2 h-2 rounded-full bg-teal-400" />
              <span className="w-2 h-2 rounded-full bg-cyan-400" />
              <span className="w-2 h-2 rounded-full bg-blue-400" />
              <span className="w-2 h-2 rounded-full bg-indigo-400" />
            </div>
          </div>
        </div>

      </div>

      {/* Animation Styles */}
      <style jsx>{`
        @keyframes float-slow {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(30px, -20px) scale(1.1); }
        }
        
        @keyframes float-slower {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-30px, 20px) scale(1.05); }
        }
        
        @keyframes float-medium {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(20px, 30px) scale(0.95); }
        }
        
        @keyframes ping-slow {
          0% { transform: scale(1); opacity: 0.3; }
          50% { transform: scale(1.15); opacity: 0; }
          100% { transform: scale(1.2); opacity: 0; }
        }
        
        @keyframes gradient-shift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        @keyframes pulse-slow {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        
        .animate-float-slow {
          animation: float-slow 8s ease-in-out infinite;
        }
        
        .animate-float-slower {
          animation: float-slower 10s ease-in-out infinite;
        }
        
        .animate-float-medium {
          animation: float-medium 9s ease-in-out infinite;
        }
        
        .animate-ping-slow {
          animation: ping-slow 2s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
        
        .animate-gradient-shift {
          background-size: 200% 200%;
          animation: gradient-shift 5s ease-in-out infinite;
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 3s ease-in-out infinite;
        }
        
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