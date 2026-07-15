import { useEffect, useRef } from 'react'

const features = [
  {
    icon: '/Assests/icons/notification.svg',
    title: 'Real-time Updates',
    desc: 'Track your caregiver in real-time with live notifications',
  },
  {
    icon: '/Assests/icons/location.svg',
    title: 'Location Tracking',
    desc: 'Know exactly where your loved ones are at all times',
  },
  {
    icon: '/Assests/icons/msg.svg',
    title: 'Instant Chat',
    desc: 'Direct communication with caregivers and support',
  },
  {
    icon: '/Assests/icons/shield.svg',
    title: 'Safety First',
    desc: 'SOS button for emergencies, 24/7 monitoring',
  },
  {
    icon: '/Assests/icons/clock.svg',
    title: 'Flexible Scheduling',
    desc: 'Book care sessions on-demand or schedule in advance',
  },
]

export default function WaitingSection() {
  const sectionRef = useRef(null)
  const phoneRef = useRef(null)
  const contentRef = useRef(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (phoneRef.current) phoneRef.current.classList.add('show')
            setTimeout(() => {
              if (contentRef.current) contentRef.current.classList.add('show')
            }, 200)
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
      id="waiting-section"
      className="relative py-28 px-6 overflow-hidden bg-[#F8F3EA]"
    >
      {/* Decorative blobs */}
      <div className="absolute top-0 right-0 w-72 h-72 rounded-full bg-[#F2C89F]/30 translate-x-1/3 -translate-y-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-[#F2C89F]/25 -translate-x-1/4 translate-y-1/4 pointer-events-none" />

      {/* Decorative dot grid - top left */}
      <div className="hidden md:grid absolute top-16 left-16 grid-cols-6 gap-2 opacity-40 pointer-events-none">
        {Array.from({ length: 24 }).map((_, i) => (
          <span key={i} className="w-1 h-1 rounded-full bg-[#C9A96A]" />
        ))}
      </div>

      {/* Decorative dot grid - bottom right */}
      <div className="hidden md:grid absolute bottom-16 right-16 grid-cols-6 gap-2 opacity-40 pointer-events-none">
        {Array.from({ length: 24 }).map((_, i) => (
          <span key={i} className="w-1 h-1 rounded-full bg-[#C9A96A]" />
        ))}
      </div>

      {/* Decorative leaf branch - top right */}
      <svg
        className="hidden md:block absolute -top-6 right-0 w-56 h-56 text-[#BFDAD4] opacity-70 pointer-events-none"
        viewBox="0 0 200 200"
        fill="none"
      >
        <path d="M180 10 C 140 40, 110 70, 70 130" stroke="currentColor" strokeWidth="2" />
        <ellipse cx="150" cy="35" rx="18" ry="10" fill="currentColor" opacity="0.6" transform="rotate(35 150 35)" />
        <ellipse cx="120" cy="65" rx="20" ry="11" fill="currentColor" opacity="0.6" transform="rotate(30 120 65)" />
        <ellipse cx="95" cy="95" rx="18" ry="10" fill="currentColor" opacity="0.6" transform="rotate(25 95 95)" />
        <ellipse cx="75" cy="125" rx="16" ry="9" fill="currentColor" opacity="0.6" transform="rotate(20 75 125)" />
      </svg>

      {/* Decorative leaf branch - bottom left */}
      <svg
        className="hidden md:block absolute -bottom-8 left-0 w-56 h-64 text-[#BFDAD4] opacity-70 pointer-events-none"
        viewBox="0 0 200 220"
        fill="none"
      >
        <path d="M10 210 C 40 160, 60 120, 100 60" stroke="currentColor" strokeWidth="2" />
        <ellipse cx="30" cy="180" rx="18" ry="10" fill="currentColor" opacity="0.6" transform="rotate(-35 30 180)" />
        <ellipse cx="55" cy="150" rx="20" ry="11" fill="currentColor" opacity="0.6" transform="rotate(-30 55 150)" />
        <ellipse cx="80" cy="110" rx="18" ry="10" fill="currentColor" opacity="0.6" transform="rotate(-25 80 110)" />
        <ellipse cx="95" cy="75" rx="16" ry="9" fill="currentColor" opacity="0.6" transform="rotate(-20 95 75)" />
      </svg>

      <div className="relative max-w-7xl mx-auto grid md:grid-cols-2 gap-20 items-center z-10">

        {/* LEFT SIDE PHONE */}
        <div ref={phoneRef} className="phone-animate relative flex justify-center">

          {/* Phone Outer — kept dark, it's a device mockup */}
          <div className="relative w-[330px] h-[660px] rounded-[48px] p-3"
            style={{ background: '#1b1b1b', boxShadow: '0 40px 80px rgba(27,42,74,0.25)' }}>

            {/* Screen */}
            <div className="w-full h-full rounded-[40px] overflow-hidden" style={{ background: '#dfe6e9' }}>

              {/* Status bar */}
              <div className="text-xs text-white bg-[#000000] h-10 px-6 pt-4">9:41</div>

              {/* Cards */}
              <div className="floating-card px-6 mt-6 space-y-5">

                {/* Card 1 */}
                <div className="rounded-2xl p-4 shadow-lg" style={{ background: '#ffffff' }}>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full" style={{ background: '#52B5BD' }}></div>
                    <div className="flex-1 space-y-2">
                      <div className="h-3 rounded" style={{ background: '#e0e0e0', width: '70%' }}></div>
                      <div className="h-2 rounded" style={{ background: '#ececec', width: '50%' }}></div>
                    </div>
                  </div>
                  <div className="mt-4 h-2 overflow-hidden rounded-full" style={{ background: '#cfeceb' }}>
                    <div className="loading-bar h-2 rounded-full" style={{ background: '#52B5BD' }}></div>
                  </div>
                </div>

                {/* Cards 2–4 */}
                {[1, 2, 3].map((n) => (
                  <div key={n} className="rounded-2xl p-4 shadow-md bg-white flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full" style={{ background: '#cfd8dc' }}></div>
                    <div className="flex-1 space-y-2">
                      <div className="h-3 rounded bg-gray-200 w-3/4"></div>
                      <div className="h-2 rounded bg-gray-100 w-1/2"></div>
                    </div>
                  </div>
                ))}

              </div>
            </div>
          </div>

          {/* Floating Notification */}
          <div
            className="absolute top-0 right-10 translate-y-[-30%] bg-white rounded-2xl shadow-2xl px-6 py-4 flex items-start gap-4"
            style={{ boxShadow: '0 20px 40px rgba(27,42,74,0.18)' }}
          >
            <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: '#52B5BD' }}>
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-white" fill="none" stroke="currentColor"
                strokeWidth="2" viewBox="0 0 24 24">
                <path d="M15 17h5l-1.4-1.4A2 2 0 0118 14V11a6 6 0 10-12 0v3c0 .53-.21 1.04-.6 1.4L4 17h5" />
              </svg>
            </div>
            <div>
              <div className="text-sm font-semibold" style={{ color: "#1a2a3a" }}>WHY PRO Arrived</div>
              <div className="text-xs" style={{ color: "#8a9ab0" }}>Maria is at the location</div>
            </div>
          </div>

        </div>

        {/* RIGHT SIDE CONTENT */}
        <div ref={contentRef} className="content-animate">

          <span
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold mb-6 bg-white shadow-sm"
            style={{ color: "#2F8F8A" }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2F8F8A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="6" y="2" width="12" height="20" rx="2" />
              <line x1="10" y1="18" x2="14" y2="18" />
            </svg>
            On the WHY App
          </span>

          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight" style={{ color: "#1B2A4A" }}>
            What's waiting for you{' '}
            <span style={{ color: "#52B5BD" }}>on the app?</span>
          </h2>

          <p className="mt-6 text-lg max-w-xl" style={{ color: "#6a7f96" }}>
            Our app is packed with features that enable you to experience elder care like never before
          </p>

          <div className="mt-12 space-y-8">
            {features.map((feat) => (
              <div key={feat.title} className="feature-item flex gap-5">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
                  style={{ background: 'linear-gradient(135deg,#52B5BD,#2F4A7D)' }}>
                  <img src={feat.icon} className="white-icon" alt={feat.title} width="24" height="24" />
                </div>
                <div>
                  <div className="font-semibold text-lg" style={{ color: "#1a2a3a" }}>{feat.title}</div>
                  <div style={{ color: "#6a7f96" }}>{feat.desc}</div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}