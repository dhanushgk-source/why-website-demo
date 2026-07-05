import { useSectionFade } from '../hooks/useSectionFade'

export default function CTA() {
  const sectionRef = useSectionFade()

  return (
    <section
      ref={sectionRef}
      id="cta-section"
      className="relative overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #F8F3EA 0%, #52B5BD 18%, #2F4A7D 100%)',
        padding: '120px 20px',
        textAlign: 'center',
      }}
    >
      {/* Decorative blobs */}
      <div className="absolute top-0 left-0 w-72 h-72 rounded-full bg-white/10 -translate-x-1/3 -translate-y-1/3 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-white/10 translate-x-1/4 translate-y-1/4 pointer-events-none" />

      {/* Decorative dot grid - top right */}
      <div className="hidden md:grid absolute top-14 right-14 grid-cols-6 gap-2 opacity-30 pointer-events-none">
        {Array.from({ length: 24 }).map((_, i) => (
          <span key={i} className="w-1 h-1 rounded-full bg-white" />
        ))}
      </div>

      {/* Decorative dot grid - bottom left */}
      <div className="hidden md:grid absolute bottom-14 left-14 grid-cols-6 gap-2 opacity-30 pointer-events-none">
        {Array.from({ length: 24 }).map((_, i) => (
          <span key={i} className="w-1 h-1 rounded-full bg-white" />
        ))}
      </div>

      {/* Decorative leaf branch - top left */}
      <svg
        className="hidden lg:block absolute -top-6 left-0 w-56 h-56 text-white opacity-20 pointer-events-none"
        viewBox="0 0 200 200"
        fill="none"
      >
        <path d="M20 10 C 60 40, 90 70, 130 130" stroke="currentColor" strokeWidth="2" />
        <ellipse cx="50" cy="35" rx="18" ry="10" fill="currentColor" transform="rotate(-35 50 35)" />
        <ellipse cx="80" cy="65" rx="20" ry="11" fill="currentColor" transform="rotate(-30 80 65)" />
        <ellipse cx="105" cy="95" rx="18" ry="10" fill="currentColor" transform="rotate(-25 105 95)" />
        <ellipse cx="125" cy="125" rx="16" ry="9" fill="currentColor" transform="rotate(-20 125 125)" />
      </svg>

      {/* Decorative leaf branch - bottom right */}
      <svg
        className="hidden lg:block absolute -bottom-8 right-0 w-56 h-64 text-white opacity-20 pointer-events-none"
        viewBox="0 0 200 220"
        fill="none"
      >
        <path d="M190 210 C 160 160, 140 120, 100 60" stroke="currentColor" strokeWidth="2" />
        <ellipse cx="170" cy="180" rx="18" ry="10" fill="currentColor" transform="rotate(35 170 180)" />
        <ellipse cx="145" cy="150" rx="20" ry="11" fill="currentColor" transform="rotate(30 145 150)" />
        <ellipse cx="120" cy="110" rx="18" ry="10" fill="currentColor" transform="rotate(25 120 110)" />
        <ellipse cx="105" cy="75" rx="16" ry="9" fill="currentColor" transform="rotate(20 105 75)" />
      </svg>

      <div className="relative max-w-5xl mx-auto z-10">

        {/* Badge pill */}
        <span className="fade-inner inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold mb-8 bg-white/15 backdrop-blur-sm border border-white/25 text-white">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11z" />
            <polyline points="9 12 11 14 15 10" />
          </svg>
          Join the WHY family
        </span>

        {/* Heading */}
        <h2 className="fade-inner font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight tracking-tight text-white">
          Companion for elders <br />
          should feel <span className="text-[#FFE8D1]">safe</span>
        </h2>

        {/* Divider with heart */}
        <div className="fade-inner flex items-center justify-center gap-3 mb-10">
          <span className="w-10 h-px bg-white/40" />
          <svg width="16" height="16" viewBox="0 0 24 24" fill="#F2711F" stroke="none">
            <path d="M12 21s-6.7-4.3-9.3-8.1C.8 10 1.5 6.6 4.3 5c2.2-1.3 4.9-.7 6.4 1.2.4.5 1.1.5 1.5 0C13.7 4.3 16.4 3.7 18.6 5c2.8 1.6 3.5 5 1.6 7.9C18.7 16.7 12 21 12 21z" />
          </svg>
          <span className="w-10 h-px bg-white/40" />
        </div>

        {/* Buttons */}
        <div className="fade-inner flex flex-wrap justify-center items-center gap-6">

          <button
            className="flex items-center gap-3 px-8 py-4 rounded-full font-semibold shadow-lg transition duration-300 hover:scale-105 hover:shadow-xl"
            style={{ background: '#ffffff', color: '#2F4A7D' }}
          >
            <img src="/Assests/icons/download.svg" width="20" alt="" style={{ filter: 'invert(24%) sepia(23%) saturate(1200%) hue-rotate(190deg)' }} />
            Download the App
          </button>

          <button className="flex items-center gap-3 px-8 py-4 rounded-full bg-white/10 backdrop-blur-sm border border-white/25 text-white font-semibold transition duration-300 hover:scale-105 hover:bg-white/20">
            <img src="/Assests/icons/msg.svg" className="white-icon" width="20" alt="" />
            Talk to WHY Support
          </button>

          <button className="flex items-center gap-3 px-8 py-4 rounded-full bg-white/10 backdrop-blur-sm border border-white/25 text-white font-semibold transition duration-300 hover:scale-105 hover:bg-white/20">
            <img src="/Assests/icons/user_Plus.svg" className="white-icon" width="20" alt="" />
            Join as a PRO
          </button>

        </div>

        {/* Subtext */}
        <div className="fade-inner mt-10 text-white/70 text-sm">
          Available on iOS and Android
        </div>

      </div>
    </section>
  )
}