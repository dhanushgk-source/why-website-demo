import { useEffect, useRef } from 'react'
import { useSectionFade } from '../hooks/useSectionFade'
import { ShieldCheck, Users, MapPin, Heart, Star, Leaf } from 'lucide-react'

const coveredCities = [' Bengaluru ']

const statsData = [
  {
    Icon: Users,
    target: 0,
    suffix: '+',
    label: 'Verified Companions',
    bg: 'bg-[#3FBFB0]',
    numberColor: 'text-[#0D9488]',
    underline: 'bg-[#0D9488]',
    waveColor: 'text-teal-100',
    dotColor: 'bg-teal-300',
  },
  {
    Icon: MapPin,
    // Automatically gets the number of cities
    target: coveredCities.length,
    suffix: '+',
    label: ' Cities Served',
    bg: 'bg-[#2F4A7D]',
    numberColor: 'text-[#2F4A7D]',
    underline: 'bg-[#2F4A7D]',
    waveColor: 'text-indigo-100',
    dotColor: 'bg-indigo-300',
    cities: coveredCities,
  },
  {
    Icon: Heart,
    target: 0,
    suffix: '+',
    label: 'Families Supported',
    bg: 'bg-[#E07A5F]',
    numberColor: 'text-[#E07A5F]',
    underline: 'bg-[#E07A5F]',
    waveColor: 'text-orange-100',
    dotColor: 'bg-orange-300',
  },
  {
    Icon: Star,
    target: 0,
    suffix: '/5',
    label: ' Family Satisfaction',
    bg: 'bg-[#4CAE7F]',
    numberColor: 'text-[#2F8F5B]',
    underline: 'bg-[#2F8F5B]',
    waveColor: 'text-emerald-100',
    dotColor: 'bg-emerald-300',
  },
]

export default function TrustedBy() {
  const sectionRef = useSectionFade()
  const counterRefs = useRef([])

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            statsData.forEach((stat, i) => {
              if (stat.static) return

              const el = counterRefs.current[i]
              if (!el) return

              const target = stat.target
              const suffix = stat.suffix
              const duration = 2000
              const startTime = performance.now()

              function updateCount(currentTime) {
                const progress = Math.min(
                  (currentTime - startTime) / duration,
                  1
                )

                const value = target * progress

                el.textContent =
                  (target % 1 !== 0
                    ? value.toFixed(1)
                    : Math.floor(value).toLocaleString()) + suffix

                if (progress < 1) {
                  requestAnimationFrame(updateCount)
                } else {
                  el.textContent =
                    (target % 1 !== 0
                      ? target
                      : target.toLocaleString()) + suffix
                }
              }

              requestAnimationFrame(updateCount)
            })

            observer.unobserve(section)
          }
        })
      },
      { threshold: 0.25 }
    )

    observer.observe(section)

    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="trusted-section"
      className="relative py-24 bg-[#F7F3EA]"
    >
      {/* Decorative background */}
      <svg
        aria-hidden="true"
        className="absolute top-0 -left-8 h-[26rem] w-56 text-emerald-900/10"
        viewBox="0 0 100 260"
        fill="none"
      >
        <path
          d="M15,10 C15,60 40,90 60,120 C40,140 20,170 15,220 C10,170 5,140 15,120 C5,90 15,60 15,10 Z"
          fill="currentColor"
          opacity="0.5"
        />
      </svg>
      <svg
        aria-hidden="true"
        className="absolute bottom-0 -right-8 h-[26rem] w-56 text-emerald-900/10 scale-x-[-1]"
        viewBox="0 0 100 260"
        fill="none"
      >
        <path
          d="M15,10 C15,60 40,90 60,120 C40,140 20,170 15,220 C10,170 5,140 15,120 C5,90 15,60 15,10 Z"
          fill="currentColor"
          opacity="0.5"
        />
      </svg>

      <div className="absolute top-10 right-16 hidden grid-cols-6 gap-2 opacity-40 sm:grid">
        {Array.from({ length: 24 }).map((_, i) => (
          <span key={i} className="h-1.5 w-1.5 rounded-full bg-orange-300" />
        ))}
      </div>
      <div className="absolute bottom-16 left-14 hidden grid-cols-5 gap-2 opacity-30 sm:grid">
        {Array.from({ length: 15 }).map((_, i) => (
          <span key={i} className="h-1.5 w-1.5 rounded-full bg-orange-300" />
        ))}
      </div>

      <div className="absolute -top-16 right-0 h-72 w-72 rounded-full bg-orange-100/40 blur-2xl" />
      <div className="absolute -bottom-16 -left-10 h-72 w-72 rounded-full bg-teal-100/40 blur-2xl" />

      <div className="max-w-7xl mx-auto px-6 text-center relative z-10">

        {/* Eyebrow */}
        <div className="fade-inner mx-auto mb-6 flex w-fit items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-[#0D9488] shadow-sm border border-teal-100">
          <ShieldCheck className="h-4 w-4" aria-hidden="true" />
           WHY in Numbers
        </div>

        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 fade-inner text-[#0A1F44]">
          Trusted by Families,{' '}
          <span className="bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent">
            Driven by Care
          </span>
        </h2>

        {/* Divider */}
        <div className="fade-inner mb-4 flex items-center justify-center gap-3">
          <Leaf aria-hidden="true" className="hidden h-4 w-4 -rotate-45 text-emerald-300 sm:block" />
          <span className="h-[2px] w-16 sm:w-24 bg-gradient-to-r from-transparent to-[#0D9488]" />
          <Heart className="h-4 w-4 text-[#0D9488]" aria-hidden="true" />
          <span className="h-[2px] w-16 sm:w-24 bg-gradient-to-l from-transparent to-[#F2711F]" />
          <Leaf aria-hidden="true" className="hidden h-4 w-4 rotate-45 scale-x-[-1] text-emerald-300 sm:block" />
        </div>

        <p className="text-[#0A1F44]/60 text-lg mb-16 fade-inner">
           Every connection we create reflects our commitment to trust, compassion, and exceptional care.
        </p>

        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8 lg:gap-10">
          {statsData.map((stat, i) => (
            <div key={stat.label} className="fade-inner relative group">

              {/* Stacked card effect behind the main card */}
              <div className="absolute inset-x-3 top-3 bottom-0 rounded-3xl bg-white/60 -z-10 transition-transform duration-500 group-hover:-translate-y-1" />

              <div className="relative rounded-3xl bg-white shadow-xl overflow-hidden transform transition-all duration-500 ease-in-out hover:-translate-y-2 hover:shadow-2xl">
                <div className="px-8 pt-6 pb-8">
                  {/* Icon */}
                  <div className={`w-14 h-14 mx-auto mb-4 rounded-2xl ${stat.bg} flex items-center justify-center shadow-lg`}>
                    <stat.Icon className="w-6 h-6 text-white" strokeWidth={2} fill={stat.label === 'Happy Clients' ? 'white' : 'none'} />
                  </div>

                  {/* Counter */}
                  <h3
                    ref={(el) => (counterRefs.current[i] = el)}
                    className={`counter text-4xl font-extrabold mb-1 ${stat.numberColor}`}
                  >
                    {stat.static || '0'}
                  </h3>

                  {/* Label */}
                  <p className="text-[#0A1F44]/70 font-medium mb-2 text-sm">{stat.label}</p>

                  <span className={`block w-8 h-[3px] mx-auto rounded-full ${stat.underline}`} />
                </div>

                {/* Wavy bottom with dot texture */}
                <div className="relative h-10">
                  <svg
                    aria-hidden="true"
                    className={`absolute inset-0 w-full h-full ${stat.waveColor}`}
                    viewBox="0 0 300 80"
                    preserveAspectRatio="none"
                  >
                    <path d="M0,40 C75,80 225,10 300,40 L300,80 L0,80 Z" fill="currentColor" />
                  </svg>
                  <div className="absolute bottom-1.5 right-4 grid grid-cols-3 gap-1 opacity-50">
                    {Array.from({ length: 9 }).map((_, d) => (
                      <span key={d} className={`w-1 h-1 rounded-full ${stat.dotColor}`} />
                    ))}
                  </div>
                </div>
              </div>

              {/* Cities Tooltip */}
              {stat.cities && (
                <div className="absolute left-1/2 -translate-x-1/2 top-full mt-4 w-56 opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-all duration-300 translate-y-4 group-hover:translate-y-0 z-30">
                  <div className="bg-white rounded-2xl border border-gray-200 shadow-2xl p-5">
                    <h4 className="font-bold text-gray-800 mb-3">Cities Covered</h4>
                    <ul className="space-y-2 text-left">
                      {stat.cities.map((city) => (
                        <li key={city} className="flex items-center gap-2 text-gray-600">
                          <span className="w-2 h-2 rounded-full bg-[#2F4A7D]" />
                          {city}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}