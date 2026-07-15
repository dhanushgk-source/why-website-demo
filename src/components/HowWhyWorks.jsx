import { useSectionFade } from '../hooks/useSectionFade'
import { Leaf, ShieldCheck } from 'lucide-react'

const steps = [
  {
    icon: '/Assests/icons/profile.svg',
    title: 'Book a WHY PRO',
    desc: 'Book your WHY PRO and share your care needs and location.',
  },
  {
    icon: '/Assests/icons/VUser.svg',
    title: 'WHY PRO Accepts the Booking',
    desc: 'Your WHY PRO confirms the booking and prepares to assist you.',
  },
  {
    icon: '/Assests/icons/location.svg',
    title: 'WHY PRO Reaches Pickup Location',
    desc: 'Your journey begins as your WHY PRO arrives at the pickup location to accompany you.',
  },
  {
    icon: '/Assests/icons/heart_rate.svg',
    title: 'Care & Support Provided',
    desc: 'Your WHY PRO stays with you throughout the visit.',
  },
  {
    icon: '/Assests/icons/VDocs.svg',
    title: 'Trip and Health Summary Shared',
    desc: 'Receive a complete visit report and hospital health summary.',
  },
]

export default function HowWhyWorks() {
  const sectionRef = useSectionFade()

  return (
    <section
      ref={sectionRef}
      id="WHY-Works-section"
      className="relative py-28 px-6 overflow-hidden bg-[#F8F3EA]"
    >
      {/* Decorative blobs */}
      <div className="absolute top-0 left-0 w-72 h-72 rounded-full bg-[#F2C89F]/30 -translate-x-1/3 -translate-y-1/3 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-[#F2C89F]/25 translate-x-1/4 translate-y-1/4 pointer-events-none" />

      {/* Decorative dot grid - top right */}
      <div className="hidden md:grid absolute top-16 right-16 grid-cols-6 gap-2 opacity-40 pointer-events-none">
        {Array.from({ length: 24 }).map((_, i) => (
          <span key={i} className="w-1 h-1 rounded-full bg-[#C9A96A]" />
        ))}
      </div>

      {/* Decorative dot grid - bottom left */}
      <div className="hidden md:grid absolute bottom-16 left-16 grid-cols-6 gap-2 opacity-40 pointer-events-none">
        {Array.from({ length: 24 }).map((_, i) => (
          <span key={i} className="w-1 h-1 rounded-full bg-[#C9A96A]" />
        ))}
      </div>

      {/* Decorative leaf branch - top left */}
      <svg
        className="hidden md:block absolute -top-6 left-0 w-56 h-56 text-[#BFDAD4] opacity-70 pointer-events-none"
        viewBox="0 0 200 200"
        fill="none"
      >
        <path d="M20 10 C 60 40, 90 70, 130 130" stroke="currentColor" strokeWidth="2" />
        <ellipse cx="50" cy="35" rx="18" ry="10" fill="currentColor" opacity="0.6" transform="rotate(-35 50 35)" />
        <ellipse cx="80" cy="65" rx="20" ry="11" fill="currentColor" opacity="0.6" transform="rotate(-30 80 65)" />
        <ellipse cx="105" cy="95" rx="18" ry="10" fill="currentColor" opacity="0.6" transform="rotate(-25 105 95)" />
        <ellipse cx="125" cy="125" rx="16" ry="9" fill="currentColor" opacity="0.6" transform="rotate(-20 125 125)" />
      </svg>

      {/* Decorative leaf branch - bottom right */}
      <svg
        className="hidden md:block absolute -bottom-8 right-0 w-56 h-64 text-[#BFDAD4] opacity-70 pointer-events-none"
        viewBox="0 0 200 220"
        fill="none"
      >
        <path d="M190 210 C 160 160, 140 120, 100 60" stroke="currentColor" strokeWidth="2" />
        <ellipse cx="170" cy="180" rx="18" ry="10" fill="currentColor" opacity="0.6" transform="rotate(35 170 180)" />
        <ellipse cx="145" cy="150" rx="20" ry="11" fill="currentColor" opacity="0.6" transform="rotate(30 145 150)" />
        <ellipse cx="120" cy="110" rx="18" ry="10" fill="currentColor" opacity="0.6" transform="rotate(25 120 110)" />
        <ellipse cx="105" cy="75" rx="16" ry="9" fill="currentColor" opacity="0.6" transform="rotate(20 105 75)" />
      </svg>

      <div className="relative max-w-7xl mx-auto text-center z-10">

        {/* Badge pill */}
        <span
          className="fade-inner inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold mb-8 bg-white shadow-sm"
          style={{ color: "#2F8F8A" }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2F8F8A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="9" />
            <polyline points="12 7 12 12 15.5 14" />
          </svg>
          Simple, Transparent Process
        </span>

        {/* Heading */}
        <h2 className="fade-inner font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 tracking-tight" style={{ color: "#1B2A4A" }}>
          How <span style={{ color: "#52B5BD" }}>WHY</span> Works
        </h2>

        {/* Divider with heart */}
        <div className="fade-inner flex items-center justify-center gap-3 mb-6">
          <span className="w-10 h-px bg-[#E0B98A]" />
          <svg width="16" height="16" viewBox="0 0 24 24" fill="#F2711F" stroke="none">
            <path d="M12 21s-6.7-4.3-9.3-8.1C.8 10 1.5 6.6 4.3 5c2.2-1.3 4.9-.7 6.4 1.2.4.5 1.1.5 1.5 0C13.7 4.3 16.4 3.7 18.6 5c2.8 1.6 3.5 5 1.6 7.9C18.7 16.7 12 21 12 21z" />
          </svg>
          <span className="w-10 h-px bg-[#E0B98A]" />
        </div>

        <p className="fade-inner mb-20 text-lg" style={{ color: "#6a7f96" }}>
           Smart Technology Meets Human Compassion

        </p>

        {/* Timeline Wrapper */}
        <div className="relative flex flex-col md:flex-row justify-between items-start gap-16 md:gap-0">

          {/* Horizontal Line */}
          <div
            className="fade-inner hidden md:block absolute top-10 left-[5%] right-[5%] h-[2px]"
            style={{ background: 'repeating-linear-gradient(to right, #C9A96A 0, #C9A96A 6px, transparent 6px, transparent 12px)' }}
          />

          {steps.map((step, i) => (
            <div key={i} className="fade-inner relative z-10 text-center w-full md:w-[18%]">
              <div className="relative inline-block mb-6">
                <div
                  className="w-20 h-20 rounded-2xl flex items-center justify-center text-white shadow-lg transition duration-500 hover:-translate-y-3 hover:scale-105"
                  style={{
                    background: 'linear-gradient(135deg,#52B5BD,#2F4A7D)',
                    boxShadow: '0 16px 32px rgba(47,74,125,0.25)',
                  }}
                >
                  <img src={step.icon} className="white-icon" width="24" height="24" alt="" />
                  <div className="absolute -top-2 -right-3 w-7 h-7 rounded-full bg-white text-[#1B2A4A] text-sm font-bold flex items-center justify-center shadow-md border border-[#F2C89F]/60">
                    {i + 1}
                  </div>
                </div>
              </div>
              <h3 className="font-semibold mb-2" style={{ color: "#1a2a3a" }}>{step.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: "#6a7f96" }}>
                {step.desc.split('\n').map((line, j) => (
                  <span key={j}>{line}{j === 0 && <br />}</span>
                ))}
              </p>
            </div>
          ))}

        </div>

        {/* Bottom Glass Box */}
        <div
          className="fade-inner mt-16 sm:mt-24 inline-flex items-center gap-3 bg-white shadow-md rounded-full py-3 sm:py-5 px-6 sm:px-10"
        >
          <Leaf className="hidden sm:block w-5 h-5 text-[#52B5BD]" strokeWidth={1.75}/>
          <span className="w-8 h-8 rounded-full bg-[#2F8F8A] flex items-center justify-center flex-shrink-0">
            <ShieldCheck className="w-4 h-4 text-white" strokeWidth={2} />
          </span>
          <p
            className="text-base sm:text-lg font-medium text-center sm:text-left"
            style={{ color: "#1a2a3a" }}
          >
            Every step is{" "}
            <span className="font-semibold text-[#2F8F8A]">monitored</span>.{" "}
            Every task is{" "}
            <span className="font-semibold text-[#2F8F8A]">accountable</span>.
          </p>
          <Leaf
            className="hidden sm:block w-5 h-5 text-[#52B5BD]"
            strokeWidth={1.75}
          />
        </div>
      </div>
    </section>
  )
}