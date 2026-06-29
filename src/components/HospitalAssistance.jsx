import { useEffect, useRef, useState } from 'react'

// WHY Brand Colors
// Primary: Soft Teal #52B5BD
// Secondary: Deep Navy #2F4A7D
// Accent: Coral #E07A5F
// Accent 2: Soft Green #ABEAC8

const serviceCards = [
    {
        icon: "hospital",
        iconBg: "#E8F8F9",
        iconColor: "#52B5BD",
        accentBar: "#52B5BD",
        title: 'Hospital & Medical Support',
        desc: "Your Pro accompanies elders to every hospital visit — so no one faces it alone.",
        points: [
            'Escort to hospitals & clinics',
            'Wait & assist during consultations',
            'Coordinate with doctors & staff',
            'Safe transportation back home',
        ],
    },
    {
        icon: "pill",
        iconBg: "#EAF0FA",
        iconColor: "#2F4A7D",
        accentBar: "#2F4A7D",
        title: 'Medicine & Pharmacy Care',
        desc: "Never miss a dose. Your Pro handles prescriptions and timely refills.",
        points: [
            'Pick up prescribed medicines',
            'Medication reminders & tracking',
            'Pharmacy visits & bill payments',
            'Coordinate with local chemists',
        ],
    },
    {
        icon: "stethoscope",
        iconBg: "#FDF0EC",
        iconColor: "#E07A5F",
        accentBar: "#E07A5F",
        title: 'In-Home Nursing Assistance',
        desc: "Professional support for daily health routines — right at home.",
        points: [
            'Wound dressing & basic nursing',
            'Vital signs monitoring',
            'Post-surgery recovery support',
            'Physiotherapy escort & assist',
        ],
    },
]


// SVG icon component — no emojis
function CardIcon({ name, color }) {
    const icons = {
        hospital: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
                <line x1="12" y1="8" x2="12" y2="8" /><line x1="10" y1="10" x2="14" y2="10" /><line x1="12" y1="8" x2="12" y2="12" />
            </svg>
        ),
        pill: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M10.5 20H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v7" />
                <line x1="12" y1="2" x2="12" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="16" y1="2" x2="16" y2="6" />
                <circle cx="18" cy="18" r="4" /><line x1="18" y1="16" x2="18" y2="20" /><line x1="16" y1="18" x2="20" y2="18" />
            </svg>
        ),
        stethoscope: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4.8 2.3A.3.3 0 1 0 5 2H4a2 2 0 0 0-2 2v5a6 6 0 0 0 6 6 6 6 0 0 0 6-6V4a2 2 0 0 0-2-2h-1a.2.2 0 1 0 .3.3" />
                <path d="M8 15v1a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6v-4" />
                <circle cx="20" cy="10" r="2" />
            </svg>
        ),
        cart: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
        ),
    }
    return icons[name] || null
}

function ServiceCard({ card, index }) {
    const [visible, setVisible] = useState(false)
    const ref = useRef(null)

    useEffect(() => {
        const el = ref.current
        if (!el) return
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setTimeout(() => setVisible(true), index * 120)
                    observer.disconnect()
                }
            },
            { threshold: 0.1 }
        )
        observer.observe(el)
        return () => observer.disconnect()
    }, [index])

    return (
        <div
            ref={ref}
            style={{
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(32px)',
                transition: 'opacity 0.55s ease, transform 0.55s ease',
                borderTop: `4px solid ${card.accentBar}`,
            }}
            className="bg-white rounded-3xl p-7 shadow-md hover:shadow-2xl hover:-translate-y-2 hover:scale-[1.02] transition-all duration-500 flex flex-col gap-4"
        >
            {/* Icon badge */}
            <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl"
                style={{ background: card.iconBg }}
            >
                <CardIcon name={card.icon} color={card.iconColor} />
            </div>

            <div>
                <h3 className="text-lg font-bold mb-1" style={{ color: "#1a2a3a" }}>{card.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "#8a9ab0" }}>{card.desc}</p>
            </div>

            <ul className="space-y-2.5 mt-1">
                {card.points.map((point, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm" style={{ color: "#3a4a5a" }}>
                        <div
                            className="w-5 h-5 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                            style={{ background: card.accentBar }}
                        >
                            ✓
                        </div>
                        {point}
                    </li>
                ))}
            </ul>

            <div className="mt-auto pt-4" style={{ borderTop: `1px solid ${card.iconBg}` }}>
                <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: card.iconColor }}>
                    Handled by your Pro
                </span>
            </div>
        </div>
    )
}

export default function TravelCompanion() {
    const [headerVisible, setHeaderVisible] = useState(false)
    const headerRef = useRef(null)

    useEffect(() => {
        const el = headerRef.current
        if (!el) return
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setHeaderVisible(true)
                    observer.disconnect()
                }
            },
            { threshold: 0.1 }
        )
        observer.observe(el)
        return () => observer.disconnect()
    }, [])

    return (
        <section
            id="Hospital-companion-section"
            style={{ background: "linear-gradient(160deg, #f0fbfc 0%, #e8f4fb 60%, #eef6ff 100%)" }}
            className="py-24"
        >
            <div className="max-w-7xl mx-auto px-6 text-center">

                {/* Header */}
                <div
                    ref={headerRef}
                    style={{
                        opacity: headerVisible ? 1 : 0,
                        transform: headerVisible ? 'translateY(0)' : 'translateY(24px)',
                        transition: 'opacity 0.6s ease, transform 0.6s ease',
                    }}
                >
                    <span
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold mb-6"
                        style={{ background: "#E8F8F9", color: "#52B5BD", border: "1px solid #c2eaed" }}
                    >
                        Elder Care by Verified Pros
                    </span>

                    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6" style={{ color: "#1a2a3a" }}>
                        What Your{' '}
                        <span style={{ color: "#52B5BD" }}>Pro Can Do</span>
                        <br className="hidden sm:block" />
                        <span style={{ color: "#2F4A7D" }}> for Your Elders</span>
                    </h2>

                    <p className="text-lg max-w-2xl mx-auto mb-14 leading-relaxed" style={{ color: "#6a7f96" }}>
                        Your assigned Pro is trained to support elders with medical visits,
                        medicines, nursing care, and everyday tasks — with compassion and reliability.
                    </p>
                </div>

                {/* Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
                    {serviceCards.map((card, i) => (
                        <ServiceCard key={card.title} card={card} index={i} />
                    ))}
                </div>

                {/* Bottom CTA */}
                <div
                    style={{
                        opacity: headerVisible ? 1 : 0,
                        transition: 'opacity 0.6s ease 0.5s',
                    }}
                    className="mt-14 inline-flex flex-col sm:flex-row items-center gap-4"
                >
                    <button
                        className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-white font-semibold shadow-lg hover:shadow-xl hover:scale-[1.03] active:scale-[0.98] transition-all duration-200 text-sm"
                        style={{ background: "linear-gradient(135deg, #52B5BD, #2F4A7D)" }}
                    >
                        Book a Pro Now
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                        </svg>
                    </button>
                    <p className="text-sm" style={{ color: "#8a9ab0" }}>
                        Background-verified · Available 24/7 · Across India
                    </p>
                </div>

            </div>
        </section>
    )
}