import { useSectionFade } from '../hooks/useSectionFade'

const cards = [
  {
    gradient: 'from-[#4DBAB8] to-[#00A19C]',
    btnGradient: 'bg-gradient-to-r from-[#4DBAB8] to-[#00A19C]',
    title: 'ENTERTAINMENT',
    subtitle: 'MOVIES & SHOWS',
    cta: 'BOOK NOW',
    desc: 'Enjoy theater, concerts, and cultural events together',
  },
  {
    gradient: 'from-[#E07856] to-[#F5B5A0]',
    btnGradient: 'bg-gradient-to-r from-[#E07856] to-[#F5B5A0]',
    title: 'SOCIAL OUTINGS',
    subtitle: 'DINING & FUN',
    cta: 'EXPLORE',
    desc: 'Experience restaurants, cafes, and social gatherings',
  },
  {
    gradient: 'from-[#84D2C4] to-[#5EBFAE]',
    btnGradient: 'bg-gradient-to-r from-[#84D2C4] to-[#5EBFAE]',
    title: 'DAILY ACTIVITIES',
    subtitle: 'ERRANDS & SHOPPING',
    cta: 'GET STARTED',
    desc: 'Assistance with shopping, appointments, and daily tasks',
  },
]

export default function ChooseExperience() {
  const sectionRef = useSectionFade()

  return (
    <section ref={sectionRef} id="experience-section" className="py-24 bg-gray-100">
      <div className="max-w-7xl mx-auto px-6">

        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl fade-inner font-Manrope font-semibold text-center mb-16">
          Choose Your Experience
        </h2>

        <div className="grid md:grid-cols-3 gap-12">
          {cards.map((card) => (
            <div key={card.title} className="fade-inner card rounded-3xl shadow-xl overflow-hidden bg-white">

              {/* TOP GRADIENT */}
              <div className={`relative bg-gradient-to-r ${card.gradient} text-white p-10 h-56 overflow-hidden`}>
                <h3 className="font-Manrope text-3xl font-bold mb-2 relative z-10">{card.title}</h3>
                <p className="font-Manrope opacity-90 relative z-10">{card.subtitle}</p>
                <button className="font-Manrope mt-6 px-6 py-2 bg-white/30 backdrop-blur-md rounded-full text-sm font-semibold relative z-10">
                  {card.cta}
                </button>
                <div className="moving-circle absolute w-40 h-40 bg-white/10 rounded-full"></div>
              </div>

              {/* BOTTOM */}
              <div className="p-10 text-center">
                <p className="font-secondary text-gray-600 mb-8">{card.desc}</p>
                <button className={`w-full py-4 rounded-full ${card.btnGradient} text-white font-bold shadow-lg`}>
                  Learn More
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
