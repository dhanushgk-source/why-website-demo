import { useEffect, useRef, useState } from 'react'
import { useSectionFade } from '../hooks/useSectionFade'

// WHY Brand Colors — reused across sections for consistency
// Teal #52B5BD · Navy #2F4A7D · Coral #E07A5F · Green #4A9D6E

const HOSPITAL_CARDS = [
    {
        icon: "hospital",
        iconBg: "#E8F8F9",
        iconColor: "#52B5BD",
        accentBar: "#52B5BD",
        title: 'Hospital & Medical Support',
        desc: "Your WHY Companion accompanies Seniors, Individuals, families and anyone who needs assistance to every hospital visit, ensuring they feel supported, safe, and never alone.",
        points: [
            'Escort to hospitals & clinics',
            'Wait & assist during consultations',
            'Coordinate with doctors & staff',
            'Ensure a safe return home after every visit',
        ],
    },
    {
        icon: "pill",
        iconBg: "#EAF0FA",
        iconColor: "#2F4A7D",
        accentBar: "#2F4A7D",
        title: 'Medicine & Pharmacy Care',
        desc: "Your WHY Companion helps manage medications, prescriptions, and timely refills, so nothing is overlooked.",
        points: [
            'Pick up prescribed medicines',
            'Medication reminders & tracking',
            'Pharmacy visits & bill payments',
            'Coordinate with local chemists',
            'Share medicine collection updates with family',
        ],
    },
    {
        icon: "clipboard",
        iconBg: "#F4F8EC",
        iconColor: "#4A9D6E",
        accentBar: "#4A9D6E",
        title: "Visit Summary & Family Updates",
        desc: "After every visit, your Pro shares a detailed summary with your family, helping them stay informed and confident.",
        points: [
            "Doctor consultation summary",
            "Services completed during the visit",
            "Medication & prescription updates",
            "Important observations shared with family",
        ],
    },
]

const TRAVEL_CARDS = [
    {
        icon: "car",
        iconBg: "#E8F8F9",
        iconColor: "#52B5BD",
        accentBar: "#52B5BD",
        title: 'Emergency Companion Support',
        points: [
            'Hospital & medical visits',
            'Urgent travel support',
            'Safe transportation',
            'Immediate assistance when you need it',
        ],
    },
    {
        icon: "wheelchair",
        iconBg: "#EAF0FA",
        iconColor: "#2F4A7D",
        accentBar: "#2F4A7D",
        title: 'Assisted Mobility Support',
        points: [
            'Mobility assistance',
            'Wheelchair support',
            'Accessible mobility assistance',
            'Comfortable journeys',
        ],
    },
    {
        icon: "clock",
        iconBg: "#EEF8F1",
        iconColor: "#4A9D6E",
        accentBar: "#4A9D6E",
        title: '24/7 Care & Companion Support',
        points: [
            'Day & night availability',
            'Personal assistance',
            'Safety monitoring',
            'Continuous peace of mind',
        ],
    },
    {
        icon: "cart",
        iconBg: "#FDF0EC",
        iconColor: "#E07A5F",
        accentBar: "#E07A5F",
        title: 'Daily Errands & Essential Support',
        comingSoon: true,
        points: [
            'Grocery shopping',
            'Pharmacy visits',
            'Bill payments',
            'Daily task assistance',
        ],
    },
]

const TABS = [
    {
        key: 'hospital',
        label: 'Hospital Assistance',
        shortLabel: 'Hospital Assistance',
        badge: 'Keeping Families Informed',
        badgeIcon: (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2F8F8A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11z" />
                <polyline points="9 12 11 14 15 10" />
            </svg>
        ),
        headline: (
            <>
             Hospital Visits Made Easier <br className="hidden sm:block" /><span style={{ color: "#52B5BD" }}>For Seniors & Families{' '}</span>
                
            </>
        ),
        subtext: "Your assigned Pro is trained to support elders with medical visits, medicines, nursing care, and everyday tasks — with compassion and reliability. After every visit, families receive a clear summary of the care provided, ensuring complete peace of mind.",
        cards: HOSPITAL_CARDS,
        gridCols: 'md:grid-cols-3',
        maxW: 'max-w-5xl',
        ctaHint: 'Background-verified companions · Real-time family updates · Available whenever you need support',
    },
    {
        key: 'travel',
        label: 'Travel Assistance',
        shortLabel: 'Travel Assistance',
        badge: 'Trusted Companion Services',
        badgeIcon: (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2F8F8A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="9" />
                <path d="M8 12l3 3 5-6" />
            </svg>
        ),
        headline: (
            <>
                Trusted Travel Assistance 
                <br className="hidden sm:block" />{' '}
                <span style={{ color: "#52B5BD" }}>For Seniors & Families</span>
            </>
        ),
        subtext: "Trusted companions who provide personalized support for travel assistance ensuring comfort, safety, and peace of mind for seniors and families.",
        cards: TRAVEL_CARDS,
        gridCols: 'md:grid-cols-2 lg:grid-cols-4',
        maxW: 'max-w-6xl',
        ctaHint: 'Background-verified companions · Available 24/7 · Trusted support across India',
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
        clipboard: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <rect x="4" y="4" width="16" height="18" rx="2" />
                <path d="M9 2h6a1 1 0 0 1 1 1v2H8V3a1 1 0 0 1 1-1z" />
                <line x1="8" y1="11" x2="16" y2="11" />
                <line x1="8" y1="15" x2="16" y2="15" />
                <line x1="8" y1="19" x2="12" y2="19" />
            </svg>
        ),
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
        setVisible(false)
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [index, card.title])

    return (
        <div
            ref={ref}
            style={{
                opacity: visible ? (card.comingSoon ? 0.85 : 1) : 0,
                transform: visible ? 'translateY(0)' : 'translateY(32px)',
                transition: 'opacity 0.55s ease, transform 0.55s ease',
                borderTop: `4px solid ${card.accentBar}`,
            }}
            className="relative bg-white rounded-3xl p-7 shadow-md hover:shadow-2xl hover:-translate-y-2 hover:scale-[1.02] transition-all duration-500 flex flex-col gap-4"
        >
            {card.comingSoon && (
                <span
                    className="absolute top-5 right-5 text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full"
                    style={{ background: card.iconBg, color: card.iconColor }}
                >
                    Coming Soon
                </span>
            )}

            {/* Icon badge */}
            <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center"
                style={{ background: card.iconBg }}
            >
                <CardIcon name={card.icon} color={card.iconColor} />
            </div>

            <div>
                <h3 className="text-lg font-bold mb-1" style={{ color: "#1a2a3a" }}>{card.title}</h3>
                {card.desc && (
                    <p className="text-sm leading-relaxed" style={{ color: "#8a9ab0" }}>{card.desc}</p>
                )}
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
                    {card.comingSoon ? 'COMING SOON' : 'SUPPORTED BY YOUR WHY COMPANION'}
                </span>
            </div>
        </div>
    )
}

export default function CompanionServices() {
    const sectionRef = useSectionFade()
    const [headerVisible, setHeaderVisible] = useState(false)
    const [activeTab, setActiveTab] = useState('hospital') // default: hospital section
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

    // Lets other components (e.g. the "Choose Experience" cards) switch the
    // active tab from anywhere on the page — dispatch:
    // window.dispatchEvent(new CustomEvent('why:companion-tab', { detail: { tab: 'travel' } }))
    useEffect(() => {
        const handleExternalTabChange = (e) => {
            const tab = e.detail?.tab
            if (tab && TABS.some((t) => t.key === tab)) {
                setActiveTab(tab)
            }
        }
        window.addEventListener('why:companion-tab', handleExternalTabChange)
        return () => window.removeEventListener('why:companion-tab', handleExternalTabChange)
    }, [])

    const active = TABS.find((t) => t.key === activeTab)

    return (
        <section
            ref={sectionRef}
            id="Hospital-companion-section"
            className="relative py-24 overflow-hidden bg-[#F8F3EA]"
        >
            {/* Decorative blobs */}
            <div className="absolute top-0 left-0 w-72 h-72 rounded-full bg-[#F2C89F]/30 -translate-x-1/3 -translate-y-1/3 pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-[#F2C89F]/25 translate-x-1/4 translate-y-1/4 pointer-events-none" />

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

            {/* Decorative leaf branch - top right */}
            <svg
                className="hidden md:block absolute -top-6 right-0 w-56 h-56 text-[#BFDAD4] opacity-70 pointer-events-none"
                viewBox="0 0 200 200"
                fill="none"
            >
                <path d="M180 10 C 140 40, 110 70, 70 130" stroke="currentColor" strokeWidth="2" />
                <ellipse cx="150" cy="35" rx="18" ry="10" fill="currentColor" opacity="0.6" transform="rotate(35 150 35)" />
                <ellipse cx="120" cy="65" rx="20" ry="11" fill="currentColor" opacity="0.6" transform="rotate(30 120 65)" />
                <ellipse cx="95" cy="95" rx="18" ry="10" fill="currentColor" opacity="0.6" transform="rotate(25 95 95)" />
                <ellipse cx="75" cy="125" rx="16" ry="9" fill="currentColor" opacity="0.6" transform="rotate(20 75 125)" />
            </svg>

            {/* Decorative leaf branch - bottom left */}
            <svg
                className="hidden md:block absolute -bottom-8 left-0 w-56 h-64 text-[#BFDAD4] opacity-70 pointer-events-none"
                viewBox="0 0 200 220"
                fill="none"
            >
                <path d="M10 210 C 40 160, 60 120, 100 60" stroke="currentColor" strokeWidth="2" />
                <ellipse cx="30" cy="180" rx="18" ry="10" fill="currentColor" opacity="0.6" transform="rotate(-35 30 180)" />
                <ellipse cx="55" cy="150" rx="20" ry="11" fill="currentColor" opacity="0.6" transform="rotate(-30 55 150)" />
                <ellipse cx="80" cy="110" rx="18" ry="10" fill="currentColor" opacity="0.6" transform="rotate(-25 80 110)" />
                <ellipse cx="95" cy="75" rx="16" ry="9" fill="currentColor" opacity="0.6" transform="rotate(-20 95 75)" />
            </svg>

            <div className="relative max-w-6xl mx-auto px-6 text-center z-10">

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
                        {active.badgeIcon}
                        {active.badge}
                    </span>

                    {/* Toggle / Tab Switch */}
                    <div className="max-w-full overflow-x-auto mb-8 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                        <div
                            className="inline-flex items-center p-1 sm:p-1.5 rounded-full bg-white shadow-sm mx-auto"
                            role="tablist"
                            aria-label="Companion service type"
                        >
                            {TABS.map((tab) => {
                                const isActive = tab.key === activeTab
                                return (
                                    <button
                                        key={tab.key}
                                        role="tab"
                                        aria-selected={isActive}
                                        onClick={() => setActiveTab(tab.key)}
                                        className="relative px-4 py-2 sm:px-6 sm:py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-colors duration-300 whitespace-nowrap"
                                        style={{
                                            color: isActive ? '#FFFFFF' : '#6a7f96',
                                            background: isActive
                                                ? 'linear-gradient(135deg, #52B5BD, #2F4A7D)'
                                                : 'transparent',
                                        }}
                                    >
                                        <span className="sm:hidden">{tab.shortLabel}</span>
                                        <span className="hidden sm:inline">{tab.label}</span>
                                    </button>
                                )
                            })}
                        </div>
                    </div>

                    <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 tracking-tight" style={{ color: "#1B2A4A" }}>
                        {active.headline}
                    </h2>

                    {/* Divider with heart */}
                    <div className="flex items-center justify-center gap-3 mb-8">
                        <span className="w-10 h-px bg-[#E0B98A]" />
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="#F2711F" stroke="none">
                            <path d="M12 21s-6.7-4.3-9.3-8.1C.8 10 1.5 6.6 4.3 5c2.2-1.3 4.9-.7 6.4 1.2.4.5 1.1.5 1.5 0C13.7 4.3 16.4 3.7 18.6 5c2.8 1.6 3.5 5 1.6 7.9C18.7 16.7 12 21 12 21z" />
                        </svg>
                        <span className="w-10 h-px bg-[#E0B98A]" />
                    </div>

                    <p className="text-lg max-w-2xl mx-auto mb-10 leading-relaxed" style={{ color: "#6a7f96" }}>
                        {active.subtext}
                    </p>
                </div>

                {/* Cards */}
                <div className={`grid grid-cols-1 ${active.gridCols} gap-6 text-left ${active.maxW} mx-auto`}>
                    {active.cards.map((card, i) => (
                        <ServiceCard key={`${activeTab}-${card.title}`} card={card} index={i} />
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
                        {active.ctaHint}
                    </p>
                </div>

                {/* Payment note */}
                <p
                    style={{
                        opacity: headerVisible ? 1 : 0,
                        transition: 'opacity 0.6s ease 0.6s',
                    }}
                    className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium bg-white shadow-sm"
                >
                    <span style={{ color: "#F2711F" }}>●</span>
                    <span style={{ color: "#1B2A4A" }}>
                        Book with just <strong>30% advance. </strong> Pay the balance after a safe and successful journey.
                    </span>
                </p>

            </div>
        </section>
    )
}