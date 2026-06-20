import { useSectionFade } from '../hooks/useSectionFade'

const serviceCards = [
    {
        title: 'Emergency Travel Assistance',
        points: [
            'Hospital & medical visits',
            'Urgent travel support',
            'Safe transportation',
            'Immediate companion help',
        ],
    },
    {
        title: 'Differently Abled Travel Support',
        points: [
            'Mobility assistance',
            'Wheelchair support',
            'Accessible travel guidance',
            'Comfortable journeys',
        ],
    },
    {
        title: 'Shopping & Daily Errands',
        points: [
            'Grocery shopping',
            'Pharmacy visits',
            'Bill payments',
            'Daily task assistance',
        ],
    },
    {
        title: '24/7 Companion Support',
        points: [
            'Day & night availability',
            'Personal assistance',
            'Safety monitoring',
            'Peace of mind',
        ],
    },
]

export default function TravelCompanion() {
    const sectionRef = useSectionFade()

    return (
        <section
            ref={sectionRef}
            id="travel-companion-section"
            className="py-24 bg-gradient-to-b from-sky-50 to-blue-100"
        >
            <div className="max-w-7xl mx-auto px-6 text-center">

                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-10">
                    Choose Your
                    <br className="hidden sm:block" />
                    <span className="text-blue-700">Travel Companion Service</span>
                </h2>

                <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-14">
                    Trusted companions to support your travel, errands, emergencies,
                    and daily activities with care, comfort, and reliability.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-left">
                    {serviceCards.map((card) => (
                        <div
                            key={card.title}
                            className="
                fade-inner
                bg-white
                rounded-3xl
                p-8
                border border-blue-100
                shadow-lg
                hover:shadow-2xl
                hover:-translate-y-3
                hover:scale-105
                transition-all
                duration-500
                relative
                overflow-hidden
              "
                        >


                            <h3 className="text-xl font-semibold mb-4 text-gray-900">
                                {card.title}
                            </h3>

                            <ul className="space-y-3">
                                {card.points.map((point, index) => (
                                    <li
                                        key={index}
                                        className="flex items-center gap-3 text-gray-700"
                                    >
                                        <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-sm font-bold">
                                            ✓
                                        </div>
                                        {point}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}