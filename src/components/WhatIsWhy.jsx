import { useSectionFade } from '../hooks/useSectionFade'
import { useEffect, useRef } from 'react'
import {
  Heart,
  ShieldCheck,
  Users,
  CheckCircle2,
  User,
  Leaf,
} from 'lucide-react'

const cards = [
  {
    theme: 'orange',
    badgeGradient: 'from-[#F2954A] to-[#F2711F]',
    underline: 'bg-[#F2711F]',
    bulletWrap: 'bg-orange-50 text-[#F2711F]',
    BulletIcon: Heart,
    HeaderIcon: Heart,
    imageType: 'photo',
    image: '/Assests/elder .webp',
    imageAlt:
      'An elderly couple smiling, representing the elders and families WHY supports',
    title: 'For Seniors & Individuals of all ages ',
    items: [
      'Peace of Mind',
      'Independence',
      'Dignity & Respect',
      'Trusted Human Companionship',
    ],
  },
  {
    theme: 'teal',
    badgeGradient: 'from-[#14B8A6] to-[#0D9488]',
    underline: 'bg-[#0D9488]',
    bulletWrap: 'bg-teal-50 text-[#0D9488]',
    BulletIcon: CheckCircle2,
    HeaderIcon: ShieldCheck,
    imageType: 'logo',
    imageBg: 'bg-gradient-to-b from-white via-[#CFF3EA] to-[#0D9488]',
    image: '/Assests/WHY_logo.png',
    imageAlt: 'WHY logo mark',
    title: "WHY's Role",
    items: [
      'Trusted & Verified Platform',
      'Quality Assurance',
      'Dedicated Customer Support',
      'Emergency Assistance',
    ],
  },
  {
    theme: 'indigo',
    badgeGradient: 'from-[#6366F1] to-[#4F46E5]',
    underline: 'bg-[#4F46E5]',
    bulletWrap: 'bg-indigo-50 text-[#4F46E5]',
    BulletIcon: User,
    HeaderIcon: Users,
    imageType: 'photo',
    image: '/Assests/pro.webp',
    imageAlt:
      'A caregiver in scrubs smiling, representing the WHY PROs on the WHY platform',
    title: 'For WHY PROs',
    items: [
      'Flexible Earnings',
      'Meaningful Work',
      'Verified Opportunities',
      'Professional Growth',
    ],
  },
]

export default function WhatIsWhy() {
  const sectionRef = useSectionFade()
  const cardsRef = useRef([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return

          entry.target.classList.add('card-visible')
          entry.target.classList.remove('card-hidden')

          observer.unobserve(entry.target)
        })
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px',
      }
    )
    cardsRef.current.forEach((card) => {
      if (card) observer.observe(card)
    })

    return () => {
      cardsRef.current.forEach((card) => {
        if (card) observer.unobserve(card)
      })
      observer.disconnect()
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      id="what-section"
      className="relative overflow-hidden bg-[#FBF3E8] py-24"
    >
      {/* Decorative background */}
      <svg
        aria-hidden="true"
        className="absolute -top-4 -left-4 h-40 w-40 text-emerald-300/70"
        viewBox="0 0 100 100"
        fill="none"
      >
        <path
          d="M10,90 C10,60 30,20 70,10 C60,35 55,55 50,70 C40,60 25,60 10,90 Z"
          fill="currentColor"
          opacity="0.5"
        />
        <path
          d="M70,10 C50,30 40,55 50,70"
          stroke="currentColor"
          strokeWidth="1.5"
          opacity="0.7"
        />
      </svg>

      <div className="absolute top-8 right-10 hidden grid-cols-6 gap-2 opacity-40 sm:grid">
        {Array.from({ length: 24 }).map((_, i) => (
          <span
            key={i}
            className="h-1.5 w-1.5 rounded-full bg-[#F2A15A]"
          />
        ))}
      </div>

      <div className="absolute bottom-24 left-8 hidden grid-cols-5 gap-2 opacity-30 sm:grid">
        {Array.from({ length: 15 }).map((_, i) => (
          <span
            key={i}
            className="h-1.5 w-1.5 rounded-full bg-[#F2A15A]"
          />
        ))}
      </div>

      <div
        className="absolute bottom-0 right-0 h-[45%] w-[38%] bg-[#0D9488]/90"
        style={{
          clipPath:
            'path("M400,300 C300,250 250,150 320,60 C360,20 400,0 400,0 L400,300 Z")',
        }}
      />

      <div className="relative z-10 mx-auto max-w-6xl px-6 text-center">
        {/* Eyebrow */}
        <div className="fade-inner mb-6 inline-flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-2 text-sm font-semibold text-[#0D9488] shadow-sm">
          <Heart
            className="h-4 w-4 fill-[#0D9488]"
            strokeWidth={0}
            aria-hidden="true"
          />
          Our Purpose
        </div>

        {/* Heading */}
        <h2 className="fade-inner mb-6 text-3xl font-extrabold text-[#0A1F44] sm:text-4xl md:text-5xl lg:text-6xl">
          What is{' '}
          <span className="bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent">
            WHY
          </span>
        </h2>

        {/* Divider */}
        <div className="fade-inner mb-4 flex items-center justify-center gap-3">
          <Leaf
            aria-hidden="true"
            className="hidden h-4 w-4 -rotate-45 text-emerald-300 sm:block"
          />

          <span className="h-[2px] w-20 bg-gradient-to-r from-transparent to-[#0D9488] sm:w-32" />

          <Heart
            aria-hidden="true"
            className="h-4 w-4 fill-[#0D9488] text-[#0D9488]"
          />
          <span className="h-[2px] w-20 bg-gradient-to-l from-transparent to-[#4F46E5] sm:w-32" />

          <Leaf
            aria-hidden="true"
            className="hidden h-4 w-4 rotate-45 scale-x-[-1] text-emerald-300 sm:block"
          />
        </div>

        <p className="fade-inner mx-auto mb-16 max-w-3xl text-lg text-[#0A1F44]/60">
         One platform for seniors looking for companionship, families looking for peace of mind, and WHY PRO looking for meaningful work.
        </p>

        {/* Cards */}
        <div className="grid gap-8 md:grid-cols-3">
          {cards.map((card, index) => (
            <div
              key={card.title}
              ref={(el) => {
                cardsRef.current[index] = el
              }}
              className="card-hidden group relative overflow-hidden rounded-3xl bg-white shadow-lg transition-all duration-700 ease-out hover:-translate-y-3 hover:shadow-[0_25px_60px_rgba(0,0,0,0.12)]"
              style={{
                transitionDelay: `${index * 150}ms`,
              }}
            >
              {/* Image */}
              <div className="relative h-56 overflow-hidden">
                {card.imageType === 'photo' ? (
                  <img
                    src={card.image}
                    alt={card.imageAlt}
                    
                    loading="lazy"
                    className="h-full w-full object-cover transition-all duration-700 ease-out group-hover:scale-110"
                  />
                ) : (
                  <div
                    className={`relative flex h-full w-full items-center justify-center p-10 ${card.imageBg}`}
                  >
                    <img
                      src={card.image}
                      alt={card.imageAlt}
                      loading="lazy"
                      className="h-full w-full object-contain drop-shadow-lg transition-all duration-700 ease-out group-hover:scale-110"
                    />
                  </div>
                )}

                <svg
                  aria-hidden="true"
                  className="absolute -bottom-px left-0 w-full text-white"
                  viewBox="0 0 400 44"
                  preserveAspectRatio="none"
                  style={{ height: '44px' }}
                >
                  <path
                    d="M0,22 C100,44 300,0 400,22 L400,44 L0,44 Z"
                    fill="currentColor"
                  />
                </svg>
              </div>

              {/* Badge */}
              <div className="relative -mt-7 flex justify-center">
                <div
                  className={`flex h-14 w-14 items-center justify-center rounded-full border-4 border-white bg-gradient-to-br ${card.badgeGradient} shadow-lg transition-all duration-500 group-hover:scale-110 group-hover:rotate-6`}
                >
                  <card.HeaderIcon
                    className="h-6 w-6 text-white"
                    strokeWidth={2}
                  />
                </div>
              </div>

              {/* Body */}
              <div className="px-8 pt-4 pb-8 text-center">
                <h3 className="mb-2 text-xl font-bold text-[#0A1F44]">
                  {card.title}
                </h3>

                <span
                  className={`mx-auto mb-6 block h-[3px] w-10 rounded-full ${card.underline}`}
                />

                <ul className="space-y-3 text-left">
                  {card.items.map((item) => (
                    <li
                      key={item}
                      className="group/item flex items-center gap-3 text-[#0A1F44]/70 transition-all duration-300 hover:translate-x-1 hover:text-[#0A1F44]"
                    >
                      <span
                        className={`flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full ${card.bulletWrap} transition-transform duration-300 group-hover/item:scale-110`}
                      >
                        <card.BulletIcon
                          className="h-3.5 w-3.5"
                          strokeWidth={2.5}
                        />
                      </span>

                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="fade-inner mt-16 flex items-center justify-center gap-3 font-semibold text-[#0A1F44]">
          <Leaf
            aria-hidden="true"
            className="hidden h-4 w-4 -rotate-45 text-emerald-300 sm:block"
          />

          <ShieldCheck
            aria-hidden="true"
            className="h-5 w-5 text-[#0D9488]"
          />

          <span>
            Safe&nbsp;&nbsp;•&nbsp;&nbsp;Trusted&nbsp;&nbsp;•&nbsp;&nbsp;Compassionate
          </span>

          <Leaf
            aria-hidden="true"
            className="hidden h-4 w-4 rotate-45 scale-x-[-1] text-emerald-300 sm:block"
          />
        </div>
      </div>

      <style jsx>{`
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