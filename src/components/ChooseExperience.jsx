import { useSectionFade } from '../hooks/useSectionFade'

const cards = [
  {
    gradient: 'from-[#84D2C4] to-[#5EBFAE]',
    btnGradient: 'bg-gradient-to-r from-[#84D2C4] to-[#5EBFAE]',
    title: 'HOSPITAL',
    subtitle: 'MEDICAL ASSISTANCE',
    cta: 'GET STARTED',
    sectionId: 'Hospital-companion-section',
    desc: 'Compassionate support for consultations, hospital admissions, follow-up visits, and patient care.',
  },
  {
    gradient: 'from-[#4DBAB8] to-[#00A19C]',
    btnGradient: 'bg-gradient-to-r from-[#4DBAB8] to-[#00A19C]',
    title: 'TRAVEL',
    subtitle: 'TRAVEL ASSISTANCE',
    cta: 'BOOK NOW',
    sectionId: 'travel-companion-section',
    desc: 'Comfortable transportation with trusted companions for safe and stress-free journeys.',
  },
]

function scrollTo(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

export default function ChooseExperience() {
  const sectionRef = useSectionFade()

  return (
    <section
      ref={sectionRef}
      id="experience-section"
      className="py-24 bg-gray-100"
    >
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl fade-inner font-Manrope font-semibold text-center mb-16">
          Choose Your Experience
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {cards.map((card) => (
            <div
              key={card.title}
              className="fade-inner card rounded-3xl shadow-xl overflow-hidden bg-white transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl"
            >
              {/* TOP GRADIENT */}
              <div
                className={`relative bg-gradient-to-r ${card.gradient} text-white p-10 h-56 overflow-hidden`}
              >
                <h3 className="font-Manrope text-3xl font-bold mb-2 relative z-10">
                  {card.title}
                </h3>

                <p className="font-Manrope opacity-90 relative z-10">
                  {card.subtitle}
                </p>

                <button
                  onClick={() => scrollTo(card.sectionId)}
                  className="font-Manrope mt-6 px-6 py-2 bg-white/30 backdrop-blur-md rounded-full text-sm font-semibold relative z-10 hover:bg-white/50 transition-colors duration-200"
                >
                  {card.cta}
                </button>

                <div className="moving-circle absolute w-40 h-40 bg-white/10 rounded-full -bottom-10 -right-10"></div>
              </div>

              {/* BOTTOM */}
              <div className="p-10 text-center">
                <p className="font-secondary text-gray-600 mb-8">
                  {card.desc}
                </p>

                <button
                  onClick={() => scrollTo(card.sectionId)}
                  className={`w-full py-4 rounded-full ${card.btnGradient} text-white font-bold shadow-lg transition-transform duration-300 hover:scale-105`}
                >
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