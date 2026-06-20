import { useEffect, useRef } from 'react'
import { useSectionFade } from '../hooks/useSectionFade'

const statsData = [
  {
    icon: '/Assests/icons/contact.svg',
    target: 100,
    suffix: '+',
    label: 'Verified PRO',
    shadow: 'hover:shadow-[0_0_20px_#52B5BD]',
    bg: 'bg-brandTeal',
  },
  {
    icon: '/Assests/icons/location.svg',
    target: 3,
    suffix: '+',
    label: 'Cities Covered',
    shadow: 'hover:shadow-[0_0_20px_#2F4A7D]',
    bg: 'bg-brandBlue',
  },
  {
    icon: '/Assests/icons/heart.svg',
    target: 500,
    suffix: '+',
    label: 'Happy Clients',
    shadow: 'hover:shadow-[0_0_20px_#E07A5F]',
    bg: 'bg-brandCoral',
  },
  {
    icon: '/Assests/icons/star.svg',
    target: 4.8,
    suffix: '/5',
    label: 'Average Rating',
    shadow: 'hover:shadow-[0_0_20px_#A6EACB]',
    bg: 'bg-brandMint',
    static: '4.8/5',
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
                const progress = Math.min((currentTime - startTime) / duration, 1)
                const value = target * progress
                el.textContent =
                  (target % 1 !== 0
                    ? value.toFixed(1)
                    : Math.floor(value).toLocaleString()) + suffix
                if (progress < 1) {
                  requestAnimationFrame(updateCount)
                } else {
                  el.textContent =
                    (target % 1 !== 0 ? target : target.toLocaleString()) + suffix
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
    <section ref={sectionRef} id="trusted-section" className="py-24 bg-gradient-to-b from-white to-gray-100">
      <div className="max-w-7xl mx-auto px-6 text-center">

        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-5xl font-bold mb-4 fade-inner">
          Trusted by{' '}
          <span className="bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">
            thousands
          </span>
        </h2>

        <p className="text-gray-500 text-lg mb-16 fade-inner">
          Our numbers speak for themselves
        </p>

        <div className="grid md:grid-cols-4 gap-10">
          {statsData.map((stat, i) => (
            <div key={stat.label} className="fade-inner">
              <div className={`stats-card bg-white rounded-3xl p-10 shadow-xl transform transition-all duration-500 ease-in-out hover:-translate-y-4 hover:shadow-2xl ${stat.shadow}`}>
                <div className={`w-16 h-16 mx-auto mb-6 rounded-2xl ${stat.bg} flex items-center justify-center shadow-lg spiral`}>
                  <img src={stat.icon} className="white-icon" alt={stat.label} width="24" height="24" />
                </div>
                <h3
                  ref={(el) => (counterRefs.current[i] = el)}
                  className="counter text-5xl font-bold text-gray-800 mb-2"
                >
                  {stat.static || '0'}
                </h3>
                <p className="text-gray-500 font-medium">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
