import { useEffect, useRef, useState } from 'react'
import { useSectionFade } from '../hooks/useSectionFade'

// WHY Brand Colors — reused across sections for consistency
// Teal #52B5BD · Navy #2F4A7D · Coral #E07A5F · Green #4A9D6E

const serviceCards = [
    {
        icon: "car",
        iconBg: "#E8F8F9",
        iconColor: "#52B5BD",
        accentBar: "#52B5BD",
        title: 'Emergency Travel Assistance',
        points: [
            'Hospital & medical visits',
            'Urgent travel support',
            'Safe transportation',
            'Immediate companion help',
        ],
    },
    {
        icon: "wheelchair",
        iconBg: "#EAF0FA",
        iconColor: "#2F4A7D",
        accentBar: "#2F4A7D",
        title: 'Differently Abled Travel Support',
        points: [
            'Mobility assistance',
            'Wheelchair support',
            'Accessible travel guidance',
            'Comfortable journeys',
        ],
    },
    {
        icon: "cart",
        iconBg: "#FDF0EC",
        iconColor: "#E07A5F",
        accentBar: "#E07A5F",
        title: 'Shopping & Daily Errands',
        points: [
            'Grocery shopping',
            'Pharmacy visits',
            'Bill payments',
            'Daily task assistance',
        ],
    },
    {
        icon: "clock",
        iconBg: "#EEF8F1",
        iconColor: "#4A9D6E",
        accentBar: "#4A9D6E",
        title: '24/7 Companion Support',
        points: [
            'Day & night availability',
            'Personal assistance',
            'Safety monitoring',
            'Peace of mind',
        ],
    },
]

// SVG icon component — no emojis
function CardIcon({ name, color }) {
    const icons = {
        car: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 13l1.5-4.5A2 2 0 0 1 6.4 7h11.2a2 2 0 0 1 1.9 1.5L21 13" />
                <path d="M3 13h18v4a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1v-1H6v1a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1z" />
                <circle cx="7.5" cy="17.5" r="1.5" /><circle cx="16.5" cy="17.5" r="1.5" />
            </svg>
        ),
        wheelchair: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="9" cy="4" r="1.5" fill={color} stroke="none" />
                <path d="M9 7v6l5 3" />
                <path d="M9 13H5" />
                <circle cx="9" cy="17" r="5" />
                <path d="M14 16l4 1 1 4" />
            </svg>
        ),
        cart: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
        ),
        clock: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="9" />
                <polyline points="12 7 12 12 15.5 14" />
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
                className="w-12 h-12 rounded-2xl flex items-center justify-center"
                style={{ background: card.iconBg }}
            >
                <CardIcon name={card.icon} color={card.iconColor} />
            </div>

            <h3 className="text-lg font-bold" style={{ color: "#1a2a3a" }}>{card.title}</h3>

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
    const sectionRef = useSectionFade()
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
            ref={sectionRef}
            id="travel-companion-section"
            className="relative py-24 overflow-hidden bg-[#F8F3EA]"
        >
            {/* Decorative blobs */}
            <div className="absolute top-0 right-0 w-72 h-72 rounded-full bg-[#F2C89F]/30 translate-x-1/3 -translate-y-1/3 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-[#F2C89F]/25 -translate-x-1/4 translate-y-1/4 pointer-events-none" />

            {/* Decorative dot grid - top left */}
            <div className="hidden md:grid absolute top-16 left-16 grid-cols-6 gap-2 opacity-40 pointer-events-none">
                {Array.from({ length: 24 }).map((_, i) => (
                    <span key={i} className="w-1 h-1 rounded-full bg-[#C9A96A]" />
                ))}
            </div>

            {/* Decorative dot grid - bottom right */}
            <div className="hidden md:grid absolute bottom-16 right-16 grid-cols-6 gap-2 opacity-40 pointer-events-none">
                {Array.from({ length: 24 }).map((_, i) => (
                    <span key={i} className="w-1 h-1 rounded-full bg-[#C9A96A]" />
                ))}
            </div>

            {/* Decorative leaf branch - top left */}
            <svg
                className="hidden md:block absolute -top-6 left-0 w-56 h-56 text-[#BFDAD4] opacity-70 pointer-events-none"
                viewBox="0 0 200 200"
                fill="none"
            >
                <path d="M20 10 C 60 40, 90 70, 130 130" stroke="currentColor" strokeWidth="2" />
                <ellipse cx="50" cy="35" rx="18" ry="10" fill="currentColor" opacity="0.6" transform="rotate(-35 50 35)" />
                <ellipse cx="80" cy="65" rx="20" ry="11" fill="currentColor" opacity="0.6" transform="rotate(-30 80 65)" />
                <ellipse cx="105" cy="95" rx="18" ry="10" fill="currentColor" opacity="0.6" transform="rotate(-25 105 95)" />
                <ellipse cx="125" cy="125" rx="16" ry="9" fill="currentColor" opacity="0.6" transform="rotate(-20 125 125)" />
            </svg>

            {/* Decorative leaf branch - bottom right */}
            <svg
                className="hidden md:block absolute -bottom-8 right-0 w-56 h-64 text-[#BFDAD4] opacity-70 pointer-events-none"
                viewBox="0 0 200 220"
                fill="none"
            >
                <path d="M190 210 C 160 160, 140 120, 100 60" stroke="currentColor" strokeWidth="2" />
                <ellipse cx="170" cy="180" rx="18" ry="10" fill="currentColor" opacity="0.6" transform="rotate(35 170 180)" />
                <ellipse cx="145" cy="150" rx="20" ry="11" fill="currentColor" opacity="0.6" transform="rotate(30 145 150)" />
                <ellipse cx="120" cy="110" rx="18" ry="10" fill="currentColor" opacity="0.6" transform="rotate(25 120 110)" />
                <ellipse cx="105" cy="75" rx="16" ry="9" fill="currentColor" opacity="0.6" transform="rotate(20 105 75)" />
            </svg>

            <div className="relative max-w-7xl mx-auto px-6 text-center z-10">

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
                        className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold mb-8 bg-white shadow-sm"
                        style={{ color: "#2F8F8A" }}
                    >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2F8F8A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="9" />
                            <path d="M8 12l3 3 5-6" />
                        </svg>
                        Trusted Travel Companions
                    </span>

                    <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 tracking-tight" style={{ color: "#1B2A4A" }}>
                        Choose Your
                        <br className="hidden sm:block" />
                        <span style={{ color: "#52B5BD" }}>Travel Companion Service</span>
                    </h2>

                    {/* Divider with heart */}
                    <div className="flex items-center justify-center gap-3 mb-8">
                        <span className="w-10 h-px bg-[#E0B98A]" />
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="#F2711F" stroke="none">
                            <path d="M12 21s-6.7-4.3-9.3-8.1C.8 10 1.5 6.6 4.3 5c2.2-1.3 4.9-.7 6.4 1.2.4.5 1.1.5 1.5 0C13.7 4.3 16.4 3.7 18.6 5c2.8 1.6 3.5 5 1.6 7.9C18.7 16.7 12 21 12 21z" />
                        </svg>
                        <span className="w-10 h-px bg-[#E0B98A]" />
                    </div>

                    <p className="text-lg max-w-3xl mx-auto mb-14 leading-relaxed" style={{ color: "#6a7f96" }}>
                        Trusted companions to support your travel, errands, emergencies,
                        and daily activities with care, comfort, and reliability.
                    </p>
                </div>

                {/* Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
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
                        style={{ background: "#0D5A55" }}
                    >
                        Book a Companion Now
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