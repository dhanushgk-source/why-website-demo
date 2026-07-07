import { useSectionFade } from '../hooks/useSectionFade'
import {
  Heart,
  Plane,
  Plus,
  ChevronRight,
  ShieldCheck,
  Users,
  ShieldAlert,
} from 'lucide-react'

const cards = [
  {
    theme: 'teal',
    accent: 'text-[#0D9488]',
    iconBg: 'bg-teal-50',
    iconColor: 'text-[#0D9488]',
    underline: 'bg-[#0D9488]',
    ctaPill: 'bg-[#0D9488]',
    btnGradient: 'bg-gradient-to-r from-[#4DBAB8] to-[#00A19C]',
    panelWash: 'from-teal-50/70 to-white',
    waveColor: 'text-teal-100',
    Icon: Plus,
    title: 'Hospital',
    subtitle: 'Medical Assistance',
    cta: 'BOOK NOW',
    sectionId: 'Hospital-companion-section',
    desc: 'Compassionate support for consultations, hospital admissions, follow-up visits, and patient care.',
    image: '/Assests/hospital_assistant.jpg',
    imageAlt: 'Hospital companion caring for patient',
  },
  {
    theme: 'orange',
    accent: 'text-[#F2711F]',
    iconBg: 'bg-orange-50',
    iconColor: 'text-[#F2711F]',
    underline: 'bg-[#F2711F]',
    ctaPill: 'bg-[#F2711F]',
    btnGradient: 'bg-gradient-to-r from-[#F2954A] to-[#F2711F]',
    panelWash: 'from-orange-50/70 to-white',
    waveColor: 'text-orange-100',
    Icon: Plane,
    title: 'Travel',
    subtitle: 'Travel Assistance',
    cta: 'BOOK NOW',
    sectionId: 'travel-companion-section',
    desc: 'Compassionate companions who accompany seniors during their journeys, providing comfort, support, and peace of mind.',
    image: '/Assests/travel_assistant.jpg',
    imageAlt: 'Travel companion assisting elderly',
  },
]


function scrollTo(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

export default function ChooseExperience() {
  const sectionRef = useSectionFade()

  return (
    <section
      ref={sectionRef}
      id="experience-section"
      className="py-24 relative overflow-hidden bg-[#FBF3E8]"
    >
      {/* Decorative background */}
      <svg
        aria-hidden="true"
        className="absolute -top-4 -left-4 h-56 w-56 text-emerald-300/70"
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
      <div className="absolute top-16 left-40 h-2.5 w-2.5 rounded-full bg-emerald-300/70" />
      <div className="absolute -top-10 left-10 -z-10 h-72 w-96 rounded-[50%] bg-orange-100/40 blur-2xl" />

      <div className="absolute top-8 right-10 hidden grid-cols-6 gap-2 opacity-40 sm:grid">
        {Array.from({ length: 24 }).map((_, i) => (
          <span key={i} className="h-1.5 w-1.5 rounded-full bg-[#F2A15A]" />
        ))}
      </div>
      <div className="absolute bottom-24 left-8 hidden grid-cols-5 gap-2 opacity-30 sm:grid">
        {Array.from({ length: 15 }).map((_, i) => (
          <span key={i} className="h-1.5 w-1.5 rounded-full bg-[#F2A15A]" />
        ))}
      </div>
      <div className="absolute -bottom-10 -right-10 h-64 w-64 rounded-full bg-teal-100/40 blur-2xl" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* Eyebrow */}
        <div className="fade-inner mx-auto mb-6 flex w-fit items-center gap-2 rounded-full bg-emerald-50 px-4 py-2 text-sm font-semibold text-[#0D9488] shadow-sm">
          <Heart className="h-4 w-4 fill-[#0D9488]" strokeWidth={0} aria-hidden="true" />
          Your Care, Your Way
        </div>

        {/* Heading */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl fade-inner font-Manrope font-extrabold text-center mb-4 text-[#0A1F44]">
          Choose Your{' '}
          <span className="bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent">
            Experience
          </span>
        </h2>

        {/* Divider */}
        <div className="fade-inner mb-4 flex items-center justify-center gap-3">
          <span className="h-[2px] w-16 sm:w-24 bg-gradient-to-r from-transparent to-[#F2711F]" />
          <Heart className="h-4 w-4 fill-[#F2711F] text-[#F2711F]" aria-hidden="true" />
          <span className="h-[2px] w-16 sm:w-24 bg-gradient-to-l from-transparent to-[#F2711F]" />
        </div>

        <p className="fade-inner text-center text-[#0A1F44]/60 text-lg mb-16">
          Personalized support for every journey, every need.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {cards.map((card, index) => (
            <div
              key={card.title}
              className="fade-inner card group rounded-3xl shadow-xl overflow-hidden bg-white transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl flex flex-col md:flex-row"
            >
              {/* IMAGE SECTION */}
              <div className="relative md:w-1/2 h-64 md:h-auto overflow-hidden">
                <img
                  src={card.image}
                  alt={card.imageAlt}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Gradient overlay for text visibility on mobile */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent md:hidden" />

                {/* Title overlay on image (mobile only) */}
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white md:hidden">
                  <h3 className="font-Manrope text-3xl font-semibold mb-1 tracking-normal">{card.title}</h3>
                  <p className="font-Manrope opacity-90 text-sm italic tracking-normal">{card.subtitle}</p>
                </div>

                {/* CTA pill */}
                <button
                  onClick={() => scrollTo(card.sectionId)}
                  className={`absolute top-4 right-4 px-4 py-2 ${card.ctaPill} rounded-full text-white text-xs sm:text-sm font-bold tracking-wide shadow-lg hover:brightness-110 transition-all duration-300`}
                >
                  {card.cta}
                </button>
              </div>

              {/* CONTENT SECTION */}
              <div className={`relative p-8 text-center md:w-1/2 flex flex-col justify-center items-center bg-gradient-to-b ${card.panelWash} overflow-hidden`}>

                {/* Icon badge */}
                <div className={`relative z-10 w-24 h-24 rounded-full ${card.iconBg} flex items-center justify-center mb-4`}>
                  <card.Icon className={`w-12 h-12 ${card.iconColor} ${card.theme === 'orange' ? 'rotate-45' : ''}`} strokeWidth={2.25} />
                </div>

                {/* Title - Desktop */}
                <div className="relative z-10 hidden md:block mb-4">
                  <h3 className={`font-Manrope text-4xl font-extrabold ${card.accent} tracking-normal`}>
                    {card.title}
                  </h3>
                  <p className="font-Manrope text-gray-500 text-base  mt-1">
                    {card.subtitle}
                  </p>
                  <span className={`block w-10 h-[3px] mx-auto rounded-full mt-3 ${card.underline}`} />
                </div>

                <p className="relative z-10 font-secondary text-gray-600 mb-6 leading-relaxed max-w-xs">
                  {card.desc}
                </p>

                <button
                  onClick={() => scrollTo(card.sectionId)}
                  className={`relative z-10 inline-flex items-center gap-1 px-7 py-3 rounded-full ${card.btnGradient} text-white font-bold shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl`}
                >
                  Learn More
                  <ChevronRight className="w-4 h-4" strokeWidth={3} />
                </button>

                {/* Decorative wave at the bottom of the panel */}
                <svg
                  aria-hidden="true"
                  className={`absolute -bottom-px left-0 w-full ${card.waveColor} pointer-events-none`}
                  viewBox="0 0 400 40"
                  preserveAspectRatio="none"
                  style={{ height: '32px' }}
                >
                  <path d="M0,20 C100,40 300,0 400,20 L400,40 L0,40 Z" fill="currentColor" />
                </svg>
              </div>
            </div>
          ))}
        </div>

      </div>

      <style jsx>{`
        .card {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
      `}</style>
    </section>
  )
}