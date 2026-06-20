import { useSectionFade } from '../hooks/useSectionFade'

export default function Hero() {
  const sectionRef = useSectionFade()

  return (
    <section ref={sectionRef} className="text-center px-6 py-10">

      {/* Logo */}
      <img
        src="/Assests/WHY_logo.png"
        alt="WHY logo"
        className="logo-blink mx-auto mb-4 w-20 md:w-40"
      />

      {/* Heading */}
      <h1 className="fade-inner text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-8 tracking-tight text-[#0A1F44] font-bold">
        Companionship that feels
        <div>
          <span>like </span>
          <span className="bg-gradient-to-r from-[#4DBAB8] to-[#00A19C] bg-clip-text text-transparent">
            family
          </span>
        </div>
      </h1>

      {/* Description */}
      <p className="fade-inner font-secondary mt-6 max-w-3xl mx-auto text-lg text-gray-600">
        A supervised, on-ground companionship platform for everyday life —{' '}
        <span className="text-orange-500 font-semibold">
          outings, conversations, shopping, appointments, and shared moments.
        </span>
      </p>

      <p className="fade-inner mt-4 text-gray-500">
        Thoughtfully managed. Deeply human.
      </p>

      {/* 3 Points */}
      <div className="fade-inner flex flex-col md:flex-row justify-center gap-6 mt-10 text-sm text-gray-600">
        <span>● Admin-Verified Companions</span>
        <span>● On-Ground Presence Only</span>
        <span>● Supervised &amp; Accountable</span>
      </div>

      {/* Scroll Indicator */}
      <div className="fade-inner mt-12 flex justify-center text-[#4DBAB8] scroll-float">
        <div className="flex flex-col items-center gap-2">
          <span className="text-sm font-medium">Scroll to explore</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
            <path d="m6 9 6 6 6-6"></path>
          </svg>
        </div>
      </div>

    </section>
  )
}
