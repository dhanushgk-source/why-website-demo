import { useSectionFade } from '../hooks/useSectionFade'

const cards = [
  {
    bg: 'bg-[#2F4A7D]',
    shadow: 'hover:shadow-[0_0_20px_#2F4A7D]',
    icon: '/Assests/icons/heart.svg',
    title: 'For Elders & Families',
    marker: 'marker:text-[#2F4A7D]',
    items: ['Peace of mind', 'Independence', 'Dignity', 'Real humans, not apps'],
  },{
    bg: 'bg-teal-400',
    shadow: 'hover:shadow-[0_0_20px_#2dd4bf]',
    icon: '/Assests/icons/shield.svg',
    title: "WHY's Role",
    marker: 'marker:text-teal-400',
    items: ['Trusted platform', 'Quality assurance', 'Admin supervision', 'Emergency ownership'],
  },
  {
    bg: 'bg-[#52B5BD]',
    shadow: 'hover:shadow-[0_0_20px_#52B5BD]',
    icon: '/Assests/icons/contact.svg',
    title: 'For PRO',
    marker: 'marker:text-[#2F4A7D]',
    items: ['Flexible income', 'Meaningful work', 'Verified experience', 'Skill growth'],
  },
  
]

export default function WhatIsWhy() {
  const sectionRef = useSectionFade()

  return (
    <section ref={sectionRef} id="what-section" className="py-24 bg-gradient-to-b from-white to-gray-100">
      <div className="max-w-6xl mx-auto px-6 text-center">

        {/* Heading */}
        <h2 className="fade-inner text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
          What is <span className="text-teal-500">WHY</span>
        </h2>
        <p className="fade-inner text-gray-600 mb-16 text-lg">
          A supervised companionship platform connecting three essential parts
        </p>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-10">
          {cards.map((card) => (
            <div key={card.title} className={`fade-inner group bg-white rounded-3xl p-8 shadow-lg
                transition-all duration-500
                hover:-translate-y-3 hover:shadow-2xl ${card.shadow}`}>

              <div className={`w-16 h-16 mb-6 rounded-2xl ${card.bg} text-white
                  flex items-center justify-center
                  transition-all duration-500
                  group-hover:translate-x-2
                  group-hover:scale-110
                  group-hover:shadow-xl`}>
                <img src={card.icon} className="white-icon" width="24" height="24" alt="" />
              </div>

              <h3 className="text-xl font-semibold mb-6 text-left">{card.title}</h3>

              <ul className={`text-gray-600 space-y-3 text-left list-disc ${card.marker} list-inside`}>
                {card.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>

            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
