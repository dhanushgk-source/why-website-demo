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
    image: '/Assests/hospital_assistant.jpg', 
    imageAlt: 'Hospital companion caring for patient',
  },
  {
    gradient: 'from-[#4DBAB8] to-[#00A19C]',
    btnGradient: 'bg-gradient-to-r from-[#4DBAB8] to-[#00A19C]',
    title: 'TRAVEL',
    subtitle: 'TRAVEL ASSISTANCE',
    cta: 'BOOK NOW',
    sectionId: 'travel-companion-section',
    desc: 'Comfortable transportation with trusted companions for safe and stress-free journeys.',
    image: '/Assests/travel_assistant.jpg',
    imageAlt: 'Travel companion assisting elderly',
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
      className="py-24 relative overflow-hidden animated-gradient-bg"
    >
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl fade-inner font-Manrope font-semibold text-center mb-16">
          Choose Your Experience
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {cards.map((card, index) => (
            <div
              key={card.title}
              className={`fade-inner card rounded-3xl shadow-xl overflow-hidden bg-white transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl flex flex-col md:flex-row ${
                index % 2 === 1 ? 'md:flex-row-reverse' : ''
              }`}
            >
              {/* IMAGE SECTION - Left side on desktop */}
              <div className="relative md:w-1/2 h-64 md:h-auto overflow-hidden">
                <img
                  src={card.image}
                  alt={card.imageAlt}
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                />
                
                {/* Gradient overlay for better text visibility on mobile */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent md:hidden" />
                
                {/* Title overlay on image (mobile only) */}
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white md:hidden">
                  <h3 className="font-Manrope text-2xl font-bold mb-1">
                    {card.title}
                  </h3>
                  <p className="font-Manrope opacity-90 text-sm tracking-wider">
                    {card.subtitle}
                  </p>
                </div>

                {/* CTA button overlay */}
                <button
                  onClick={() => scrollTo(card.sectionId)}
                  className="absolute top-4 right-4 px-4 py-2 bg-white/20 backdrop-blur-md rounded-full text-white text-sm font-semibold hover:bg-white/40 transition-all duration-300 border border-white/30"
                >
                  {card.cta}
                </button>
              </div>

              {/* CONTENT SECTION - Right side on desktop */}
              <div className="p-8 text-center md:w-1/2 flex flex-col justify-center items-center">
                {/* Title - Desktop only */}
                <div className="hidden md:block mb-4">
                  <h3 className={`font-Manrope text-3xl font-bold bg-gradient-to-r ${card.gradient} bg-clip-text text-transparent`}>
                    {card.title}
                  </h3>
                  <p className="font-Manrope text-gray-500 text-sm tracking-wider">
                    {card.subtitle}
                  </p>
                </div>

                <p className="font-secondary text-gray-600 mb-6 leading-relaxed">
                  {card.desc}
                </p>

                <button
                  onClick={() => scrollTo(card.sectionId)}
                  className={`w-full py-4 rounded-full ${card.btnGradient} text-white font-bold shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl`}
                >
                  Learn More
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .card {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .card:hover img {
          transform: scale(1.1);
        }

        .animated-gradient-bg {
          background: linear-gradient(
            120deg,
            #f4f9f8,
            #e6f5f2,
            #d9f0ec,
            #eef8f6,
            #f4f9f8
          );
          background-size: 300% 300%;
          animation: gradientFlow 14s ease infinite;
        }

        @keyframes gradientFlow {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
      `}</style>
    </section>
  )
}