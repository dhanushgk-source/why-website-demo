import { useSectionFade } from '../hooks/useSectionFade'
import {  HeartHandshake, ShieldCheck, Leaf, Heart } from 'lucide-react'

const problems = [
  { text: 'Seniors and individuals attending hospital visits alone.', theme: 'orange' },
  { text: 'Busy working professionals Caring for Their families.', theme: 'teal' },
  { text: 'Difficulty finding verified and reliable companions.', theme: 'indigo' },
  { text: 'Families living away from their loved ones.', theme: 'coral' },
]

const THEME = {
  orange: {
    badge: 'bg-gradient-to-br from-[#F2954A] to-[#F2711F]',
    ring: 'group-hover:ring-orange-200',
  },
  teal: {
    badge: 'bg-gradient-to-br from-[#14B8A6] to-[#0D9488]',
    ring: 'group-hover:ring-teal-200',
  },
  indigo: {
    badge: 'bg-gradient-to-br from-[#6366F1] to-[#4F46E5]',
    ring: 'group-hover:ring-indigo-200',
  },
  coral: {
    badge: 'bg-gradient-to-br from-[#F2A08A] to-[#E07A5F]',
    ring: 'group-hover:ring-orange-200',
  },
}

export default function ParentSection() {
  const sectionRef = useSectionFade()

  return (
    <section ref={sectionRef} id="parent-section" className="relative py-16 sm:py-20 lg:py-24 overflow-hidden bg-[#F7F3EA]">

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
        <path d="M70,10 C50,30 40,55 50,70" stroke="currentColor" strokeWidth="1.5" opacity="0.7" />
      </svg>
      <svg
        aria-hidden="true"
        className="absolute -bottom-4 -right-4 h-40 w-40 text-indigo-300/50 scale-x-[-1] scale-y-[-1]"
        viewBox="0 0 100 100"
        fill="none"
      >
        <path
          d="M10,90 C10,60 30,20 70,10 C60,35 55,55 50,70 C40,60 25,60 10,90 Z"
          fill="currentColor"
          opacity="0.5"
        />
      </svg>

      <div className="absolute top-10 right-10 hidden grid-cols-6 gap-2 opacity-40 sm:grid">
        {Array.from({ length: 24 }).map((_, i) => (
          <span key={i} className="h-1.5 w-1.5 rounded-full bg-[#F2A15A]" />
        ))}
      </div>
      <div className="absolute bottom-10 left-10 hidden grid-cols-5 gap-2 opacity-30 sm:grid">
        {Array.from({ length: 15 }).map((_, i) => (
          <span key={i} className="h-1.5 w-1.5 rounded-full bg-[#F2A15A]" />
        ))}
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center relative z-10">

        {/* Eyebrow */}
        <div className="fade-inner mx-auto mb-6 flex w-fit items-center gap-2 rounded-full bg-emerald-50 px-4 py-2 text-sm font-semibold text-[#0D9488] shadow-sm">
          <ShieldCheck  className="h-4 w-4" aria-hidden="true" />
          Why Families Choose WHY
        </div>

        {/* Heading */}
        <h2 className="fade-inner text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-4 text-[#0A1F44]">
  When You Can't Be There,{' '}
  <br className="hidden sm:block" />
  <span className="bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent">
    WHY is There.
  </span>
</h2>

        {/* Divider */}
        <div className="fade-inner mb-12 sm:mb-16 flex items-center justify-center gap-3">
          <Leaf aria-hidden="true" className="hidden h-4 w-4 -rotate-45 text-emerald-300 sm:block" />
          <span className="h-[2px] w-16 sm:w-24 bg-gradient-to-r from-transparent to-[#0D9488]" />
          <Heart className="h-4 w-4 fill-[#0D9488] text-[#0D9488]" aria-hidden="true" />
          <span className="h-[2px] w-16 sm:w-24 bg-gradient-to-l from-transparent to-[#F2711F]" />
          <Leaf aria-hidden="true" className="hidden h-4 w-4 rotate-45 scale-x-[-1] text-emerald-300 sm:block" />
        </div>

        {/* Problems Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 mb-12 sm:mb-16">
          {problems.map((problem, i) => (
            <div
              key={problem.text}
              className="fade-inner group bg-white rounded-2xl shadow-md hover:shadow-2xl
                p-4 sm:p-6 flex items-center gap-3 sm:gap-4
                ring-1 ring-transparent transition-all duration-300 hover:-translate-y-2"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div
                className={`w-9 h-9 sm:w-11 sm:h-11 flex-shrink-0 rounded-full ${THEME[problem.theme].badge}
                  text-white flex items-center justify-center font-bold text-sm sm:text-base shadow-md
                  transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6`}
              >
                {i + 1}
              </div>
              <p className="text-[#0A1F44]/80 font-medium text-sm sm:text-base text-left">
                {problem.text}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom Highlight Box */}
        <div className="fade-inner inline-flex items-center gap-3 bg-white shadow-lg rounded-full py-3 sm:py-4 px-6 sm:px-8">
          <span className="hidden sm:flex w-9 h-9 rounded-full bg-teal-50 items-center justify-center flex-shrink-0">
            <HeartHandshake className="w-5 h-5 text-[#0D9488]" />
          </span>
          <p className="text-base sm:text-xl font-semibold text-[#0A1F44]">
           WHY provides  {' '}
            <span className="text-[#F2883B]">Trusted Companionship, </span> {' '}
            <span className="text-[#5D5DEE]">Reliable Support,</span> {' '}and {' '}
            <span className="text-[#11AD9D]">Comfort for Every Family</span>
          </p>
        </div>

      </div>
    </section>
  )
}