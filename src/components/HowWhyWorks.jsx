import { useSectionFade } from '../hooks/useSectionFade'

const steps = [
  {
    icon: '/Assests/icons/profile.svg',
    title: 'PRO receiver profile',
    desc: 'Share needs, preferences,\nand location',
  },
  {
    icon: '/Assests/icons/location.svg',
    title: 'Location + service defined',
    desc: 'Specify task and exact\nlocation',
  },
  {
    icon: '/Assests/icons/VUser.svg',
    title: 'System + admin match PRO',
    desc: 'AI-assisted, human-verified\nmatching',
  },
  {
    icon: '/Assests/icons/heart_rate.svg',
    title: 'Physical care delivered',
    desc: 'Real-time tracking and\nupdates',
  },
  {
    icon: '/Assests/icons/VDocs.svg',
    title: 'Live updates & reports',
    desc: 'Complete transparency and\naccountability',
  },
]

export default function HowWhyWorks() {
  const sectionRef = useSectionFade()

  return (
    <section
      ref={sectionRef}
      id="WHY-Works-section"
      className="py-28 px-6 relative overflow-hidden"
      style={{ background: 'radial-gradient(circle at 50% 0%, #1e2f46 0%, #0e1a2b 60%)' }}
    >
      <div className="max-w-7xl mx-auto text-center">

        {/* Heading */}
        <h2 className="fade-inner text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4"
          style={{ fontFamily: 'var(--font-heading)' }}>
          How WHY Works
        </h2>
        <p className="fade-inner text-gray-300 mb-20 text-lg">
          System thinking meets human companion
        </p>

        {/* Timeline Wrapper */}
        <div className="relative flex flex-col md:flex-row justify-between items-start gap-16 md:gap-0">

          {/* Horizontal Line */}
          <div className="fade-inner hidden md:block absolute top-12 left-[5%] right-[5%] h-[2px]"
            style={{ background: 'rgba(255,255,255,0.15)' }}></div>

          {steps.map((step, i) => (
            <div key={i} className="fade-inner relative z-10 text-center w-full md:w-[18%]">
              <div className="relative inline-block mb-6">
                <div
                  className="w-20 h-20 rounded-2xl flex items-center justify-center text-2xl text-white shadow-2xl transition duration-500 hover:-translate-y-3 hover:scale-105"
                  style={{
                    background: 'linear-gradient(135deg,#3ea6a8,#5ec4c4)',
                    boxShadow: '0 20px 40px rgba(0,255,200,0.25)',
                  }}
                >
                  <img src={step.icon} className="white-icon" width="24" height="24" alt="" />
                  <div className="absolute -top-2 -right-3 w-7 h-7 rounded-full bg-white text-[#0e1a2b] text-sm font-bold flex items-center justify-center shadow-md">
                    {i + 1}
                  </div>
                </div>
              </div>
              <h3 className="text-white font-semibold mb-2">{step.title}</h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                {step.desc.split('\n').map((line, j) => (
                  <span key={j}>{line}{j === 0 && <br />}</span>
                ))}
              </p>
            </div>
          ))}

        </div>

        {/* Bottom Glass Box */}
        <div
          className="fade-inner mt-24 inline-block px-10 py-6 rounded-2xl text-lg text-white border border-white/10 backdrop-blur-lg"
          style={{ background: 'rgba(255,255,255,0.05)' }}
        >
          Every step is{' '}
          <span className="text-[#6bd1d1] font-semibold">monitored</span>.
          {' '}Every task is{' '}
          <span className="text-[#6bd1d1] font-semibold">accountable</span>
        </div>

      </div>
    </section>
  )
}
