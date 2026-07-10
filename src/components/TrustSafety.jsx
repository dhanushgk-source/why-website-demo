import { useSectionFade } from '../hooks/useSectionFade'

const safetyItems = [
  {
    icon: '/Assests/icons/VDocs.svg',
    title: 'Identity verification',
    desc: 'Government ID, Address proof, Police Verified documents and Professional documents',
    align: 'left',
  },
  {
    icon: '/Assests/icons/shield_verified.svg',
    title: 'Background checks',
    desc: 'Criminal Records, Employment History and Reference Verification',
    align: 'right',
  },{
    icon: '/Assests/icons/eye.svg',
    title: 'Structured Interview',
    desc : 'Communication Skills, Empathy Assessments, Situation-Based Evaluation and Professionalism',
    align:'left'
  },
  {
    icon: '/Assests/icons/graduate.svg',
    title: 'Training',
    desc: 'Elder Care Protocols, Emergency Response, Dignity Standards and Safety Guidelines',
    align: 'right',
  },
  {
    icon: '/Assests/icons/eye.svg',
    title: 'Live supervision',
    desc: 'Real-time Tracking, Check-ins and Quality Monitoring',
    align: 'left',
  },
  {
    icon: '/Assests/icons/phone.svg',
    title: 'Emergency protocols',
    desc: '24/7 Emergency Line at +91 90365 99439, Rapid Response and Incident Management',
    align: 'right',
  },
]

export default function TrustSafety() {
  const sectionRef = useSectionFade()

  return (
    <section
      ref={sectionRef}
      id="savefty-section"
      className="relative py-20 lg:py-32 overflow-hidden bg-[#F8F3EA]"
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
        className="hidden lg:block absolute -top-6 left-0 w-56 h-56 text-[#BFDAD4] opacity-70 pointer-events-none"
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
        className="hidden lg:block absolute -bottom-8 right-0 w-56 h-64 text-[#BFDAD4] opacity-70 pointer-events-none"
        viewBox="0 0 200 220"
        fill="none"
      >
        <path d="M190 210 C 160 160, 140 120, 100 60" stroke="currentColor" strokeWidth="2" />
        <ellipse cx="170" cy="180" rx="18" ry="10" fill="currentColor" opacity="0.6" transform="rotate(35 170 180)" />
        <ellipse cx="145" cy="150" rx="20" ry="11" fill="currentColor" opacity="0.6" transform="rotate(30 145 150)" />
        <ellipse cx="120" cy="110" rx="18" ry="10" fill="currentColor" opacity="0.6" transform="rotate(25 120 110)" />
        <ellipse cx="105" cy="75" rx="16" ry="9" fill="currentColor" opacity="0.6" transform="rotate(20 105 75)" />
      </svg>

      {/* Heading */}
      <div className="relative max-w-6xl mx-auto px-6 text-center mb-16 lg:mb-20 z-10">
        <span
          className="fade-inner inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold mb-8 bg-white shadow-sm"
          style={{ color: "#2F8F8A" }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2F8F8A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11z" />
            <polyline points="9 12 11 14 15 10" />
          </svg>
          Verified &amp; Supervised
        </span>

        <h2 className="fade-inner font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 tracking-tight" style={{ color: "#1B2A4A" }}>
          Trust &amp; <span style={{ color: "#52B5BD" }}>Safety</span>
        </h2>

        {/* Divider with heart */}
        <div className="fade-inner flex items-center justify-center gap-3 mb-6">
          <span className="w-10 h-px bg-[#E0B98A]" />
          <svg width="16" height="16" viewBox="0 0 24 24" fill="#F2711F" stroke="none">
            <path d="M12 21s-6.7-4.3-9.3-8.1C.8 10 1.5 6.6 4.3 5c2.2-1.3 4.9-.7 6.4 1.2.4.5 1.1.5 1.5 0C13.7 4.3 16.4 3.7 18.6 5c2.8 1.6 3.5 5 1.6 7.9C18.7 16.7 12 21 12 21z" />
          </svg>
          <span className="w-10 h-px bg-[#E0B98A]" />
        </div>

        <p className="fade-inner text-lg" style={{ color: "#6a7f96" }}>
          Every Pro is verifie d, trained, and supervised — nothing here is left to chance
        </p>
      </div>

      <div className="relative max-w-5xl mx-auto px-6 z-10">

        {/* Vertical Line */}
        <div className="absolute left-6 lg:left-1/2 lg:-translate-x-1/2 h-full w-[2px] bg-gradient-to-b from-[#52B5BD]/70 via-[#C9A96A]/40 to-transparent"></div>

        {safetyItems.map((item, i) => {
          const isRight = item.align === 'right'
          return (
            <div
              key={i}
              className={`fade-inner relative mb-16 flex flex-col lg:flex-row lg:items-center ${isRight ? 'lg:justify-end' : ''}`}
            >
              <div className={`w-full lg:w-1/2 ${isRight ? 'lg:pl-10' : 'lg:pr-10 lg:text-right'} pl-16 lg:pl-0 transition duration-500 hover:scale-105 hover:-translate-y-2`}>
                <div className="bg-white p-6 lg:p-8 rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-500">
                  <h3 className="text-xl font-semibold mb-2" style={{ color: "#1a2a3a" }}>{item.title}</h3>
                  <p className="text-sm" style={{ color: "#6a7f96" }}>{item.desc}</p>
                </div>
              </div>

              <div className="absolute left-0 lg:left-1/2 lg:-translate-x-1/2 w-12 h-12 lg:w-14 lg:h-14 rounded-2xl flex items-center justify-center shadow-lg transition duration-300 hover:rotate-6 hover:-translate-y-1"
                style={{ background: 'linear-gradient(135deg,#52B5BD,#2F4A7D)' }}>
                <img src={item.icon} className="white-icon" width="22" alt={item.title} />
              </div>
            </div>
          )
        })}

      </div>

      {/* Bottom Statement */}
      <div className="relative mt-20 text-center px-6 z-10">
        <div className="fade-inner inline-block bg-white px-8 py-6 rounded-2xl shadow-md">
          <h3 className="text-xl font-semibold mb-2" style={{ color: "#1a2a3a" }}>WHY is not a marketplace.</h3>
          <p style={{ color: "#6a7f96" }}>It's a supervised companion system.</p>
        </div>
      </div>

    </section>
  )
}