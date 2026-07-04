import { useSectionFade } from '../hooks/useSectionFade'
import { useEffect, useRef } from 'react'

const cards = [
  {
    bg: 'bg-[#2F4A7D]',
    gradient: 'from-[#2F4A7D]/20 to-[#2F4A7D]/10',
    shadow: 'hover:shadow-[0_0_30px_rgba(47,74,125,0.2)]',
    icon: '/Assests/icons/heart.svg',
    image: '/Assests/elder.jpg',
    imageAlt: 'An elderly woman smiling, representing the elders and families WHY supports',
    imageType: 'photo',
    title: 'For Elders & Families',
    marker: 'marker:text-[#2F4A7D]',
    items: ['Peace of mind', 'Independence', 'Dignity', 'Real humans, not apps'],
  },
  {
    bg: 'bg-gradient-to-r from-emerald-500 to-teal-500',
    gradient: 'from-emerald-400/20 to-teal-400/10',
    shadow: 'hover:shadow-[0_0_30px_rgba(16,185,129,0.2)]',
    icon: '/Assests/icons/shield.svg',
    image: '/Assests/WHY_logo.png',
    imageAlt: 'WHY logo mark',
    imageType: 'logo',
    title: "WHY's Role",
    marker: 'marker:text-emerald-500',
    items: ['Trusted platform', 'Quality assurance', 'Admin supervision', 'Emergency ownership'],
  },
  {
    bg: 'bg-gradient-to-r from-blue-500 to-indigo-500',
    gradient: 'from-blue-400/20 to-indigo-400/10',
    shadow: 'hover:shadow-[0_0_30px_rgba(59,130,246,0.2)]',
    icon: '/Assests/icons/contact.svg',
    image: '/Assests/pro.jpg',
    imageAlt: 'A caregiver in scrubs smiling, representing the PROs on the WHY platform',
    imageType: 'photo',
    title: 'For PRO',
    marker: 'marker:text-blue-500',
    items: ['Flexible income', 'Meaningful work', 'Verified experience', 'Skill growth'],
  },
]

export default function WhatIsWhy() {
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
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
      }
    )

    cardsRef.current.forEach((card) => {
      if (card) observer.observe(card)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} id="what-section" className="relative py-24 overflow-hidden bg-white">

      {/* ===== PLAIN WHITE BACKGROUND ===== */}
      <div className="absolute inset-0 bg-white" />

      {/* Subtle grid overlay for texture, kept but recolored for light background */}
      <div
        className="absolute inset-0 opacity-[0.035] bg-repeat bg-[url('data:image/svg+xml,%3Csvg%20width=%2260%22%20height=%2260%22%20viewBox=%220%200%2060%2060%22%20xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg%20fill=%22none%22%20fill-rule=%22evenodd%22%3E%3Cg%20fill=%22%23000000%22%20fill-opacity=%221%22%3E%3Cpath%20d=%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"
      />

      <div className="max-w-6xl mx-auto px-6 text-center relative z-10">

        {/* Heading with color accent gradient */}
        <h2 className="fade-inner text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-[#0A1F44]">
          What is{' '}
          <span className="bg-gradient-to-r from-emerald-500 via-teal-500 to-blue-500 bg-clip-text text-transparent animate-gradient-shift">
            WHY
          </span>
        </h2>

        {/* Animated underline with aurora colors */}
        <div className="fade-inner w-24 h-1 mx-auto bg-gradient-to-r from-emerald-400 via-teal-400 to-blue-400 rounded-full mb-4 animate-pulse-slow" />

        <p className="fade-inner text-[#0A1F44]/70 mb-16 text-lg max-w-2xl mx-auto font-light tracking-wide">
          A supervised companionship platform connecting three essential parts
        </p>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {cards.map((card, index) => (
            <div
              key={card.title}
              ref={(el) => (cardsRef.current[index] = el)}
              className={`card-hidden group relative rounded-2xl overflow-hidden bg-white border border-[#0A1F44]/10 shadow-md
                transition-all duration-700 ease-out
                hover:-translate-y-4 hover:scale-[1.02] hover:shadow-2xl ${card.shadow}`}
              style={{
                transform: 'translateY(40px)',
                opacity: 0,
                transition: 'all 0.7s cubic-bezier(0.4, 0, 0.2, 1)',
                transitionDelay: `${index * 150}ms`
              }}
            >
              {/* Card hover glow */}
              <div className={`absolute inset-0 bg-gradient-to-b ${card.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />

              {/* Card border glow on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                <div className="absolute -inset-[1px] bg-gradient-to-r from-emerald-400/10 via-teal-400/10 to-blue-400/10 rounded-2xl blur-sm" />
              </div>

              {/* Top half: image */}
              <div className="relative h-52 overflow-hidden">
                {card.imageType === 'photo' ? (
                  <>
                    <img
                      src={card.image}
                      alt={card.imageAlt}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    {/* Subtle overlay for photos */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                  </>
                ) : (
                  <div className={`w-full h-full ${card.bg} flex items-center justify-center relative overflow-hidden`}>
                    {/* Animated aurora pattern for logo cards */}
                    <div className="absolute inset-0 opacity-30">
                      <div className="absolute top-0 -left-16 w-48 h-48 bg-emerald-400/20 rounded-full blur-2xl animate-aurora-small-1" />
                      <div className="absolute bottom-0 -right-16 w-48 h-48 bg-blue-400/20 rounded-full blur-2xl animate-aurora-small-2" />
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-teal-400/20 rounded-full blur-2xl animate-aurora-small-3" />
                    </div>
                    <img
                      src={card.image}
                      alt={card.imageAlt}
                      className="w-28 h-28 object-contain transition-transform duration-700 group-hover:scale-110 relative z-10"
                    />
                  </div>
                )}
                {/* Soft bottom fade */}
                <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/20 to-transparent" />

                {/* Shimmer effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 -translate-x-full group-hover:translate-x-full" />
              </div>

              <div className="relative px-8 pb-8 pt-10 z-10">
                {/* Category icon badge */}
                <div className={`absolute -top-6 left-8 w-14 h-14 rounded-full ${card.bg} text-white
                    flex items-center justify-center border-2 border-white shadow-lg
                    transition-all duration-500 group-hover:scale-110 group-hover:rotate-6`}>
                  <img src={card.icon} className="white-icon filter brightness-0 invert" width="20" height="20" alt="" />
                </div>

                <h3 className="text-xl font-semibold mb-6 text-left text-[#0A1F44]">
                  {card.title}
                </h3>

                <ul className={`text-[#0A1F44]/70 space-y-3 text-left list-disc ${card.marker} list-inside`}>
                  {card.items.map((item) => (
                    <li key={item} className="transition-all duration-300 hover:translate-x-1 hover:text-[#0A1F44]">
                      {item}
                    </li>
                  ))}
                </ul>

                {/* Decorative corner accent */}
                <div className="absolute bottom-4 right-4 w-10 h-10 border-r-2 border-b-2 border-emerald-400/30 rounded-br-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute top-4 left-4 w-10 h-10 border-l-2 border-t-2 border-emerald-400/30 rounded-tl-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* ===== ANIMATION STYLES ===== */}
      <style jsx>{`
        /* Small aurora for logo cards */
        @keyframes aurora-small-1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(20px, -20px) scale(1.2); }
        }
        
        @keyframes aurora-small-2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-20px, 20px) scale(1.2); }
        }
        
        @keyframes aurora-small-3 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: scale(1.3); }
        }

        /* Gradient shift for heading */
        @keyframes gradient-shift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        .animate-gradient-shift {
          background-size: 200% 200%;
          animation: gradient-shift 4s ease-in-out infinite;
        }
        
        /* Pulse animation */
        @keyframes pulse-slow {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 3s ease-in-out infinite;
        }
        
        .animate-aurora-small-1 { animation: aurora-small-1 6s ease-in-out infinite; }
        .animate-aurora-small-2 { animation: aurora-small-2 7s ease-in-out infinite; }
        .animate-aurora-small-3 { animation: aurora-small-3 5s ease-in-out infinite; }
        
        /* Card visibility */
        .card-hidden {
          opacity: 0;
          transform: translateY(40px);
        }
        
        .card-visible {
          opacity: 1 !important;
          transform: translateY(0) !important;
        }
      `}</style>
    </section>
  )
}