import { useEffect, useRef, useState } from 'react'
import { Star, Quote, ChevronLeft, ChevronRight, BadgeCheck } from 'lucide-react'
import { useSectionFade } from '../hooks/useSectionFade'

// Replace with real, named testimonials as they come in (see docx: collect
// video + written testimonials from real NRI families — this is placeholder
// copy in the same spirit).
const TESTIMONIALS = [
  {
    name: 'Ananya Rao',
    role: 'Daughter · Singapore',
    parentCity: 'Parent in Bengaluru',
    quote:
      "I used to lie awake worrying about Amma's hospital visits. Now I get a message the moment the companion reaches, and another when she's safely home. That small update has given me my sleep back.",
    seed: 'Ananya-Rao',
    rating: 5,
  },
  {
    name: 'Vikram Nair',
    role: 'Son · Dubai',
    parentCity: 'Parent in Bengaluru',
    quote:
      'Appa is particular about who he lets into his routine. The same companion has been with him for three months now — he actually looks forward to their Tuesday walks.',
    seed: 'Vikram-Nair',
    rating: 5,
  },
  {
    name: 'Priya Menon',
    role: 'Daughter · London',
    parentCity: 'Parent in Bengaluru',
    quote:
      "Being able to scan the QR code and see the companion's verification before they even arrived made all the difference. It felt like WHY understood exactly what would put my mind at ease.",
    seed: 'Priya-Menon',
    rating: 5,
  },
  {
    name: 'Rahul Iyer',
    role: 'Son · Toronto',
    parentCity: 'Parent in Bengaluru',
    quote:
      "No subscriptions, no pressure — just 30% upfront to secure the booking, and the rest only once the visit is safely done. For someone managing this from another time zone, that simplicity matters more than people realize.",
    seed: 'Rahul-Iyer',
    rating: 5,
  },
  {
    name: 'Sneha Kulkarni',
    role: 'Daughter · Melbourne',
    parentCity: 'Parent in Bengaluru',
    quote:
      "My mother recovering from surgery needed company more than anything else. Her companion sat with her, spoke Kannada with her, made her laugh. That's not a service you can put a price on.",
    seed: 'Sneha-Kulkarni',
    rating: 5,
  },
]

function avatarUrl(seed) {
  return `https://api.dicebear.com/7.x/personas/svg?seed=${encodeURIComponent(seed)}&backgroundColor=F2C89F,BFE3DF,F7F3EA&radius=50`
}

function Stars({ count = 5, className = 'w-4 h-4' }) {
  return (
    <div className="flex items-center gap-1" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`${className} ${i < count ? 'text-[#F2711F]' : 'text-[#F2711F]/20'}`}
          fill={i < count ? '#F2711F' : 'none'}
          strokeWidth={i < count ? 0 : 1.5}
        />
      ))}
    </div>
  )
}

export default function TestimonialsSlideshow() {
  const sectionRef = useSectionFade()
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const [direction, setDirection] = useState(1)
  const touchStartX = useRef(null)

  const count = TESTIMONIALS.length

  const goTo = (index, dir = 1) => {
    setDirection(dir)
    setActive(((index % count) + count) % count)
  }

  const next = () => goTo(active + 1, 1)
  const prev = () => goTo(active - 1, -1)

  useEffect(() => {
    if (paused) return
    const timer = setInterval(() => {
      setDirection(1)
      setActive((a) => (a + 1) % count)
    }, 7000)
    return () => clearInterval(timer)
  }, [paused, count])

  const featured = TESTIMONIALS[active]
  const previewIndexes = [1, 2].map((offset) => (active + offset) % count)

  const onTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX
  }
  const onTouchEnd = (e) => {
    if (touchStartX.current === null) return
    const delta = e.changedTouches[0].clientX - touchStartX.current
    if (delta > 50) prev()
    else if (delta < -50) next()
    touchStartX.current = null
  }

  return (
    <section
      ref={sectionRef}
      id="testimonials-section"
      className="relative py-20 lg:py-28 overflow-hidden bg-[#F7F3EA]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* ===== Soft decorative background ===== */}
      <div className="absolute top-1/4 -left-24 w-96 h-96 rounded-full bg-[#F2C89F]/30 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 -right-20 w-[28rem] h-[28rem] rounded-full bg-[#7FC8C0]/20 blur-3xl pointer-events-none" />
      <div className="hidden md:block absolute top-16 right-16 w-24 h-24 rounded-full border-[6px] border-[#F2711F]/10 pointer-events-none" />
      <div className="hidden md:grid absolute bottom-16 left-10 grid-cols-5 gap-2 opacity-30 pointer-events-none">
        {Array.from({ length: 15 }).map((_, i) => (
          <span key={i} className="w-1.5 h-1.5 rounded-full bg-[#1B2A4A]/40" />
        ))}
      </div>

      <div className="relative max-w-6xl mx-auto px-6 z-10">

        {/* Header */}
        <div className="text-center mb-14 lg:mb-16">
          <span className="fade-inner inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold mb-6 bg-white shadow-sm" style={{ color: '#F2711F' }}>
            <Quote className="w-4 h-4" />
            Families Speak
          </span>

          <h2 className="fade-inner font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-5" style={{ color: '#1B2A4A' }}>
            Stories that keep us{' '}
            <span style={{ color: '#F2711F' }}>going</span>
          </h2>

          <div className="fade-inner flex items-center justify-center gap-3">
            <span className="w-16 h-px bg-[#F2711F]/30" />
            <span className="w-2 h-2 rounded-full bg-[#F2711F]" />
            <span className="w-16 h-px bg-[#F2711F]/30" />
          </div>
        </div>

        {/* Slideshow */}
        <div
          className="fade-inner grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-8 items-stretch"
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >

          {/* Featured card */}
          <div className="lg:col-span-3 relative">
            <div
              key={active}
              className="testimonial-enter relative bg-white rounded-[2rem] shadow-xl p-8 sm:p-10 lg:p-12 h-full flex flex-col justify-between overflow-hidden"
            >
              {/* Watermark quote glyph */}
              <Quote
                className="absolute -top-4 -right-2 w-40 h-40 text-[#F2711F]/[0.06] pointer-events-none"
                fill="currentColor"
                strokeWidth={0}
              />

              <div className="relative">
                <Stars count={featured.rating} className="w-5 h-5" />

                <p className="mt-6 text-xl sm:text-2xl leading-relaxed font-medium" style={{ color: '#1B2A4A' }}>
                  “{featured.quote}”
                </p>
              </div>

              <div className="relative mt-10 flex items-center gap-4">
                <div className="relative w-16 h-16 flex-shrink-0">
                  <img
                    src={avatarUrl(featured.seed)}
                    alt={featured.name}
                    className="w-16 h-16 rounded-full object-cover shadow-md ring-4 ring-[#F7F3EA]"
                  />
                  <span className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-[#0D9488] flex items-center justify-center ring-2 ring-white">
                    <BadgeCheck className="w-3.5 h-3.5 text-white" strokeWidth={2.5} />
                  </span>
                </div>
                <div>
                  <p className="font-bold text-base sm:text-lg" style={{ color: '#1B2A4A' }}>{featured.name}</p>
                  <p className="text-sm" style={{ color: '#8a9ab0' }}>{featured.role} · {featured.parentCity}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Preview cards + controls */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            {previewIndexes.map((idx) => {
              const t = TESTIMONIALS[idx]
              return (
                <button
                  key={t.seed}
                  onClick={() => goTo(idx, 1)}
                  className="group text-left bg-white/70 hover:bg-white rounded-3xl shadow-sm hover:shadow-lg p-6 flex-1 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 border border-transparent hover:border-[#F2711F]/20"
                >
                  <div>
                    <Stars count={t.rating} className="w-3.5 h-3.5" />
                    <p className="mt-3 text-sm leading-relaxed line-clamp-3" style={{ color: '#5a6b83' }}>
                      “{t.quote}”
                    </p>
                  </div>
                  <div className="mt-5 flex items-center gap-3">
                    <img
                      src={avatarUrl(t.seed)}
                      alt={t.name}
                      className="w-10 h-10 rounded-full object-cover shadow-sm"
                    />
                    <div>
                      <p className="font-semibold text-sm" style={{ color: '#1B2A4A' }}>{t.name}</p>
                      <p className="text-xs" style={{ color: '#8a9ab0' }}>{t.role}</p>
                    </div>
                    <span className="ml-auto text-[#F2711F] opacity-0 group-hover:opacity-100 transition-opacity">
                      <ChevronRight className="w-4 h-4" />
                    </span>
                  </div>
                </button>
              )
            })}

            {/* Controls */}
            <div className="flex items-center justify-between px-1">
              <div className="flex items-center gap-2">
                {TESTIMONIALS.map((t, i) => (
                  <button
                    key={t.seed}
                    onClick={() => goTo(i, i > active ? 1 : -1)}
                    aria-label={`Go to testimonial ${i + 1}`}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      i === active ? 'w-7 bg-[#F2711F]' : 'w-2 bg-[#1B2A4A]/15 hover:bg-[#1B2A4A]/30'
                    }`}
                  />
                ))}
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={prev}
                  aria-label="Previous testimonial"
                  className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center hover:bg-[#F2711F] hover:text-white text-[#1B2A4A] transition-colors duration-300"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={next}
                  aria-label="Next testimonial"
                  className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center hover:bg-[#F2711F] hover:text-white text-[#1B2A4A] transition-colors duration-300"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ===== Animation styles ===== */}
      <style jsx>{`
        @keyframes testimonialFadeIn {
          from {
            opacity: 0;
            transform: translateY(14px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .testimonial-enter {
          animation: testimonialFadeIn 0.5s ease both;
        }
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        @media (prefers-reduced-motion: reduce) {
          .testimonial-enter {
            animation: none;
          }
        }
      `}</style>
    </section>
  )
}
