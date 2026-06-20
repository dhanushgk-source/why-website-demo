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
      className="relative py-28 px-6"
      style={{ background: 'linear-gradient(135deg,#1f3b63 0%, #274c7a 45%, #2e5e94 100%)' }}
    >
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-20 items-center">

        {/* LEFT SIDE PHONE */}
        <div ref={phoneRef} className="phone-animate hover:shadow-lg relative flex justify-center">

          {/* Phone Outer */}
          <div className="relative w-[330px] h-[660px] rounded-[48px] p-3"
            style={{ background: '#1b1b1b', boxShadow: '0 40px 80px rgba(0,0,0,0.6)' }}>

            {/* Screen */}
            <div className="w-full h-full rounded-[40px] overflow-hidden" style={{ background: '#dfe6e9' }}>

              {/* Status bar */}
              <div className="text-xs text-white bg-[#000000] h-10 px-6 pt-4">9:41</div>

              {/* Cards */}
              <div className="floating-card px-6 mt-6 space-y-5">

                {/* Card 1 */}
                <div className="rounded-2xl p-4 shadow-lg" style={{ background: '#ffffff' }}>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full" style={{ background: '#33b5a5' }}></div>
                    <div className="flex-1 space-y-2">
                      <div className="h-3 rounded" style={{ background: '#e0e0e0', width: '70%' }}></div>
                      <div className="h-2 rounded" style={{ background: '#ececec', width: '50%' }}></div>
                    </div>
                  </div>
                  <div className="mt-4 h-2 overflow-hidden rounded-full" style={{ background: '#b2dfdb' }}>
                    <div className="loading-bar h-2 rounded-full"></div>
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
            style={{ boxShadow: '0 20px 40px rgba(0,0,0,0.25)' }}
          >
            <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: '#2fb7a4' }}>
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-white" fill="none" stroke="currentColor"
                strokeWidth="2" viewBox="0 0 24 24">
                <path d="M15 17h5l-1.4-1.4A2 2 0 0118 14V11a6 6 0 10-12 0v3c0 .53-.21 1.04-.6 1.4L4 17h5" />
              </svg>
            </div>
            <div>
              <div className="text-sm font-semibold text-gray-800">PRO Arrived</div>
              <div className="text-xs text-gray-500">Maria is at the location</div>
            </div>
          </div>

        </div>

        {/* RIGHT SIDE CONTENT */}
        <div ref={contentRef} className="content-animate text-white">

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
            What's waiting for you{' '}
            <span style={{ color: '#41d0c3' }}>on the app?</span>
          </h2>

          <p className="mt-6 text-lg text-white/80 max-w-xl">
            Our app is packed with features that enable you to experience elder care like never before
          </p>

          <div className="mt-12 space-y-10">
            {features.map((feat) => (
              <div key={feat.title} className="feature-item flex gap-5">
                <div className="w-14 h-14 rounded-3xl flex items-center spiral1 justify-center"
                  style={{ background: 'rgba(65,208,195,0.15)' }}>
                  <div className="w-6 h-6 rounded-full">
                    <img src={feat.icon} className="white-icon" alt={feat.title} width="24" height="24" />
                  </div>
                </div>
                <div>
                  <div className="font-semibold text-lg">{feat.title}</div>
                  <div className="text-white/70">{feat.desc}</div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}
