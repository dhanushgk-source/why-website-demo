import { useSectionFade } from '../hooks/useSectionFade'

const serviceCards = [
  {
    icon: '/Assests/icons/stethoscope.svg',
    title: 'Hospital visits',
    desc: 'Accompaniment for appointments, procedures, and consultations.',
  },
  {
    icon: '/Assests/icons/building.svg',
    title: 'Banking & offices',
    desc: 'Assistance with official work, documentation, and errands.',
  },
  {
    icon: '/Assests/icons/shopping.svg',
    title: 'Shopping & errands',
    desc: 'Grocery shopping, pharmacy runs, and daily tasks.',
  },
  {
    icon: '/Assests/icons/coffee.svg',
    title: 'Companionship & outings',
    desc: 'Social visits, walks, and quality time together.',
  },
  {
    icon: '/Assests/icons/alert.svg',
    title: 'Emergency & night care',
    desc: '24/7 availability for urgent situations and overnight support.',
  },
]

const iconFilter = 'invert(39%) sepia(82%) saturate(457%) hue-rotate(174deg) brightness(93%) contrast(91%)'

export default function Services() {
  const sectionRef = useSectionFade()

  return (
    <section ref={sectionRef} id="services-section" className="py-28 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 text-center">

        {/* Heading */}
        <h2 className="fade-inner text-5xl font-bold mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
          Physical care,{' '}
          <span className="bg-gradient-to-r from-[#4DBAB8] to-[#00A19C] bg-clip-text text-transparent">
            made clear
          </span>
        </h2>

        <p className="fade-inner text-gray-500 text-lg mb-6">
          On-ground assistance for life's essential moments
        </p>

        {/* Info Badge */}
        <div className="fade-inner inline-flex items-center gap-2 bg-teal-50 text-teal-700 px-5 py-2 rounded-full text-sm mb-16 shadow-sm">
          <span className="w-2 h-2 bg-teal-500 rounded-full"></span>
          Physical assistance only — no medical treatment
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-left">
          {serviceCards.map((card) => (
            <div key={card.title}
              className="fade-inner bg-white p-8 rounded-3xl shadow-md hover:shadow-xl transition duration-500 hover:-translate-y-3 hover:scale-105 border border-gray-100">
              <div className="w-14 h-14 rounded-2xl bg-slate-300 flex hover:rotate-6 hover:-translate-y-1 duration-200 items-center justify-center mb-6 shadow-sm">
                <img src={card.icon} style={{ filter: iconFilter }} className="white-icon" alt={card.title} width="24" height="24" />
              </div>
              <h3 className="text-xl font-semibold mb-3">{card.title}</h3>
              <p className="text-gray-600">{card.desc}</p>
            </div>
          ))}

          {/* Coming Soon */}
          <div className="fade-inner flex items-center justify-center p-8 rounded-3xl border-2 border-dashed border-gray-400 bg-gray-300 text-center">
            <div>
              <h3 className="text-lg font-semibold mb-2 text-gray-700">More services</h3>
              <p className="text-gray-400 text-sm">Coming soon</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
