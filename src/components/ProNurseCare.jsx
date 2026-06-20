import { useSectionFade } from '../hooks/useSectionFade'

const serviceCards = [
  {
    title: 'Home Nursing Care',
    desc: 'Nurses provide care and support at your home.',
  },
  {
    title: 'Elderly Care',
    desc: 'Helping senior citizens with their daily needs and activities.',
  },
  {
    title: 'Post-Surgery Care',
    desc: 'Support and care to help you recover after surgery.',
  },
  {
    title: 'Medication Management',
    desc: 'Helping you take the right medicines at the right time.',
  },
  {
    title: '24/7 Care Support',
    desc: 'Care and assistance available anytime, day or night.',
  },
  {
    title: 'Physiotherapy Assistance',
    desc: 'Help with exercises and movement for better recovery.',
  },
  {
    title: 'Doctor Consultation',
    desc: 'Connect with doctors for medical advice and guidance.',
  },
  {
    title: 'Emergency Assistance',
    desc: 'Quick help and support during emergencies.',
  },
]

export default function ChooseExperience() {
  const sectionRef = useSectionFade()

  return (
    <section
      ref={sectionRef}
      id="experience-section"
      className="py-24 bg-gray-100"
    >
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-10 sm:mb-14 lg:mb-16">
          Choose Your
          <br className="hidden sm:block" />
          <span className="text-blue-700"> Professional Nursing Care</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-left">
          {serviceCards.map((card) => (
            <div
              key={card.title}
              className="fade-inner bg-white p-8 rounded-3xl shadow-md hover:shadow-xl transition duration-500 hover:-translate-y-3 hover:scale-105 border border-gray-100"
            >
              <h3 className="text-xl font-semibold mb-3 text-gray-900">
                {card.title}
              </h3>

              <p className="text-gray-600 leading-relaxed">
                {card.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}