import { useSectionFade } from '../hooks/useSectionFade'

const safetyItems = [
  {
    icon: '/Assests/icons/VDocs.svg',
    title: 'Identity verification',
    desc: 'Government ID, address proof, professional documents',
    align: 'left',
  },
  {
    icon: '/Assests/icons/shield_verified.svg',
    title: 'Background checks',
    desc: 'Criminal records, employment history, reference verification',
    align: 'right',
  },
  {
    icon: '/Assests/icons/graduate.svg',
    title: 'Training',
    desc: 'Elder care protocols, emergency response, dignity standards',
    align: 'left',
  },
  {
    icon: '/Assests/icons/eye.svg',
    title: 'Live supervision',
    desc: 'Real-time tracking, check-ins, quality monitoring',
    align: 'right',
  },
  {
    icon: '/Assests/icons/phone.svg',
    title: 'Emergency protocols',
    desc: '24/7 emergency line, rapid response, incident management',
    align: 'left',
  },
]

export default function TrustSafety() {
  const sectionRef = useSectionFade()

  return (
    <section
      ref={sectionRef}
      id="savefty-section"
      className="relative py-20 lg:py-32 bg-gradient-to-b from-[#1e2b3d] to-[#0f1a28] text-white overflow-hidden"
    >
      {/* Heading */}
      <div className="max-w-6xl mx-auto px-6 text-center mb-16 lg:mb-20">
        <h2 className="fade-inner text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
          Trust & Safety
        </h2>
        <p className="fade-inner text-gray-400 text-lg">This must feel serious</p>
      </div>

      <div className="relative max-w-5xl mx-auto px-6">

        {/* Vertical Line */}
        <div className="absolute left-6 lg:left-1/2 lg:-translate-x-1/2 h-full w-[2px] bg-gradient-to-b from-teal-400/80 to-transparent"></div>

        {safetyItems.map((item, i) => {
          const isRight = item.align === 'right'
          return (
            <div
              key={i}
              className={`fade-inner relative mb-16 flex flex-col lg:flex-row lg:items-center ${isRight ? 'lg:justify-end' : ''}`}
            >
              <div className={`w-full lg:w-1/2 ${isRight ? 'lg:pl-10' : 'lg:pr-10 lg:text-right'} pl-16 lg:pl-0 transition duration-500 hover:scale-105 hover:-translate-y-2`}>
                <div className="bg-white/5 backdrop-blur-md border border-white/10 p-6 lg:p-8 rounded-2xl shadow-lg">
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-gray-400 text-sm">{item.desc}</p>
                </div>
              </div>

              <div className="absolute left-0 lg:left-1/2 lg:-translate-x-1/2 w-12 h-12 lg:w-14 lg:h-14 bg-gradient-to-br from-[#2F4A7D] to-[#2DD4BF] rounded-2xl flex items-center justify-center shadow-lg transition duration-300 hover:rotate-6 hover:-translate-y-1">
                <img src={item.icon} className="white-icon" width="22" alt={item.title} />
              </div>
            </div>
          )
        })}

      </div>

      {/* Bottom Statement */}
      <div className="mt-20 text-center px-6">
        <div className="fade-inner inline-block bg-white/5 backdrop-blur-md border border-white/10 px-8 py-6 rounded-2xl shadow-lg">
          <h3 className="text-xl font-semibold mb-2">WHY is not a marketplace.</h3>
          <p className="text-gray-400">It's a supervised companion system.</p>
        </div>
      </div>

    </section>
  )
}
