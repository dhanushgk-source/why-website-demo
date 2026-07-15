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
        title: 'Hospital Assistance',
        desc: "Your WHY PRO stays with seniors and anyone who needs help during hospital visits. We provide safe and reliable support from arrival to departure, so no one has to visit the hospital alone.",
        points: [
            'Escort to hospitals and clinics',
            'Accompany and assist during doctor consultations',
            'Assist with communication and coordination with hospital staff',
            'Accompany you safely until you return home',
        ],
    },
    {
        icon: "pill",
        iconBg: "#EAF0FA",
        iconColor: "#2F4A7D",
        accentBar: "#2F4A7D",
        title: 'Medicine & Pharmacy Assistance',
        desc: "Your WHY PRO helps with prescription collection, pharmacy visits, medicine purchases, and other pharmacy-related support. We make sure the prescribed medicines are collected safely while keeping families updated. If requested, the prescription can also be securely uploaded to the WHY app for easy access.",
        points: [
            'Collect prescribed medicines from pharmacies',
            'Accompany customers to pharmacies and assist with billing',
            'Help with communication and coordination at the pharmacy',
            'Keep family members updated on medicine collection',
            'Upload prescriptions to the WHY app (upon request)',
            'Ensure safe delivery of medicines to the customer',
        ],
    },
    {
        icon: "clipboard",
        iconBg: "#F4F8EC",
        iconColor: "#4A9D6E",
        accentBar: "#4A9D6E",
        title: "Hospital Visit Summary & Family Updates",
        desc: "After every hospital visit, your assigned WHY PRO shares a clear and detailed visit summary with your family, keeping them informed and giving them peace of mind. If requested, the WHY PRO can securely upload the doctor's prescription to the WHY app and, where allowed, record the doctor's consultation for future reference.",
        points: [
            "Summary of the hospital visit",
            "Services completed during the visit",
            "Key updates shared with the family",
            "Consultation recording (upon request) and prescription upload to the WHY app",
        ],
    },
    {
        icon: "car",
        iconBg: "#FDF0EC",
        iconColor: "#E07A5F",
        accentBar: "#E07A5F",
        title: 'Emergency Hospital Assistance',
        desc: "When an urgent hospital visit is needed, your assigned WHY PRO provides quick support from pickup to a safe return home, ensuring the customer is assisted throughout the visit.",
        points: [
            'Urgent hospital visit assistance',
            'Pickup and accompaniment to the hospital',
            'Help with hospital registration and doctor consultation',
            'Pharmacy and billing assistance',
            'Safe return home',
            'Family updates throughout the visit',
        ],
    },
]

const TRAVEL_CARDS = [
    {
        icon: "senior",
        iconBg: "#E8F8F9",
        iconColor: "#52B5BD",
        accentBar: "#52B5BD",
        title: 'Safe Pickup & Companion Support',
        points: [
            'Safe pickup from your location',
            'Door-to-door accompaniment ',
            'Comfortable travel support',
            'Compassionate WHY PRO throughout the journey ',
        ],
    },
    {
        icon: "wheelchair",
        iconBg: "#EAF0FA",
        iconColor: "#2F4A7D",
        accentBar: "#2F4A7D",
        title: 'Travel & Mobility Assistance',
        points: [
            'Mobility and boarding assistance ',
            'Support at airports, railway stations, bus terminals, temples, and other destinations ',
            'Assistance with essential belongings',
            'Comfortable and secure travel experience',
        ],
    },
    {
        icon: "child",
        iconBg: "#EEF8F1",
        iconColor: "#4A9D6E",
        accentBar: "#4A9D6E",
        title: 'Safe Arrival & Family Updates',
        points: [
            'Safe arrival at the destination',
            'Handover to the designated person (if applicable)',
            'Arrival confirmation to family or caregivers',
            'Journey completed with care and peace of mind ',
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
            <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2F8F8A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11z" />
                <polyline points="9 12 11 14 15 10" />
            </svg>
        ),
        headline: (
            <>
                Hospital Visits Made Easier <br className="hidden sm:block" /><span style={{ color: "#52B5BD" }}>For Seniors & Their Families</span>
            </>
        ),
        subtext: "Your assigned WHY PRO accompanies seniors and  Individuals of all ages throughout the hospital visit. They help with hospital registration, appointments, waiting in the queue, doctor consultations, billing, pharmacy support, and a safe return home. If requested, the WHY PRO can upload the doctor's prescription to the WHY app and, where allowed by the hospital and doctor, record the consultation for future reference. Families receive regular updates and a detailed visit summary for complete peace of mind.",
        cards: HOSPITAL_CARDS,
        gridCols: 'md:grid-cols-2',
        maxW: 'max-w-5xl',
        ctaHint: 'Our WHY PRO provide assistance and support only. Vehicle transportation is not provided as part of any service.',
        // Show these as a paged carousel instead of a grid.
        paged: true,
    },
    {
        key: 'travel',
        label: 'Travel Assistance',
        shortLabel: 'Travel Assistance',
        badge: 'Trusted Companion Services',
        badgeIcon: (
            <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2F8F8A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="9" />
                <path d="M8 12l3 3 5-6" />
            </svg>
        ),
        headline: (
            <>
                Safe & Reliable Travel Assistance
                <br className="hidden sm:block" />{' '}
                <span style={{ color: "#52B5BD" }}>For senior and Individuals  Who Needs a Helping Hand</span>
            </>
        ),
        subtext: "Your assigned WHY PRO provides safe, reliable, and compassionate travel assistance from pickup to drop-off. Whether it's a temple, airport transfer, family function, trip or any other destination, we ensure a comfortable, secure, and worry-free journey while keeping loved ones informed.",
        cards: TRAVEL_CARDS,
        gridCols: 'md:grid-cols-3',
        maxW: 'max-w-5xl',
        ctaHint: 'Our WHY PRO provide assistance and support only. Vehicle transportation is not provided as part of any service.',
        paged: true,
    },
]

// SVG icon component — no emojis
function CardIcon({ name, color }) {
    const icons = {
        hospital: (
            <svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
                <line x1="12" y1="8" x2="12" y2="8" /><line x1="10" y1="10" x2="14" y2="10" /><line x1="12" y1="8" x2="12" y2="12" />
            </svg>
        ),
        pill: (
            <svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M10.5 20H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v7" />
                <line x1="12" y1="2" x2="12" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="16" y1="2" x2="16" y2="6" />
                <circle cx="18" cy="18" r="4" /><line x1="18" y1="16" x2="18" y2="20" /><line x1="16" y1="18" x2="20" y2="18" />
            </svg>
        ),
        clipboard: (
            <svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <rect x="4" y="4" width="16" height="18" rx="2" />
                <path d="M9 2h6a1 1 0 0 1 1 1v2H8V3a1 1 0 0 1 1-1z" />
                <line x1="8" y1="11" x2="16" y2="11" />
                <line x1="8" y1="15" x2="16" y2="15" />
                <line x1="8" y1="19" x2="12" y2="19" />
            </svg>
        ),
        car: (
            <svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 13l1.5-4.5A2 2 0 0 1 6.4 7h11.2a2 2 0 0 1 1.9 1.5L21 13" />
                <path d="M3 13h18v4a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1v-1H6v1a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1z" />
                <circle cx="7.5" cy="17.5" r="1.5" /><circle cx="16.5" cy="17.5" r="1.5" />
            </svg>
        ),
        wheelchair: (
            <svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="9" cy="4" r="1.5" fill={color} stroke="none" />
                <path d="M9 7v6l5 3" />
                <path d="M9 13H5" />
                <circle cx="9" cy="17" r="5" />
                <path d="M14 16l4 1 1 4" />
            </svg>
        ),
        senior: (
            <svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="10" cy="5" r="2.5" />
                <path d="M10 9.5c-2.5 0-4.5 1.8-4.5 4.5v7" />
                <path d="M10 9.5c2.5 0 4.5 1.8 4.5 4.5" />
                <path d="M8 15l-1.5 3.5" />
                <path d="M18 13l1.5 8" />
            </svg>
        ),
        child: (
            <svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="6" r="2.5" />
                <path d="M8 21v-6a4 4 0 0 1 8 0v6" />
                <path d="M9 15l-2.5 2" />
                <path d="M15 15l2.5 2" />
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
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(32px)',
                transition: 'opacity 0.55s ease, transform 0.55s ease',
                borderTop: `4px solid ${card.accentBar}`,
            }}
            className="relative bg-white rounded-3xl p-9 shadow-md hover:shadow-2xl hover:-translate-y-2 hover:scale-[1.02] transition-all duration-500 flex flex-col gap-5 text-left h-full"
        >
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

            <ul className="space-y-4 mt-2">
                {card.points.map((point, i) => (
                    <li
                        key={i}
                        className="flex items-start gap-4"
                        style={{ color: "#3a4a5a" }}
                    >
                        <div
                            className="w-7 h-7 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0 mt-0.5"
                            style={{ background: card.accentBar }}
                        >
                            ✓
                        </div>

                        <span className="flex-1 text-left text-[15px] leading-7">
                            {point}
                        </span>
                    </li>
                ))}
            </ul>

            <div className="mt-auto pt-4" style={{ borderTop: `1px solid ${card.iconBg}` }}>
                <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: card.iconColor }}>
                    SUPPORTED BY YOUR WHY PRO
                </span>
            </div>
        </div>
    )
}

// Card pager: 1 card at a time on mobile, 2 cards side-by-side on tablet
// & desktop. Arrows/swipe/keys advance by however many cards are visible.
function CardPager({ cards, tabKey }) {
    const [page, setPage] = useState(0)
    // Cards shown at once: 1 on mobile (<640px), 2 on tablet & desktop (>=640px).
    const [cardsPerView, setCardsPerView] = useState(() =>
        typeof window !== 'undefined' && window.innerWidth >= 640 ? 2 : 1
    )
    const touchStartX = useRef(null)

    // Track viewport so the pager switches between 1-at-a-time and
    // 2-at-a-time as the window is resized (not just on first render).
    useEffect(() => {
        function handleResize() {
            setCardsPerView(window.innerWidth >= 640 ? 2 : 1)
        }
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    // Reset to the first card whenever the underlying tab/cards change.
    useEffect(() => {
        setPage(0)
    }, [tabKey])

    // Keep `page` aligned to a group boundary when cardsPerView changes
    // (e.g. resizing from mobile to desktop mid-browse).
    useEffect(() => {
        setPage((p) => p - (p % cardsPerView))
    }, [cardsPerView])

    // direction: +1 (next) or -1 (prev). Steps by cardsPerView so desktop/
    // tablet advance two cards at a time, mobile advances one.
    const goTo = (direction) => {
        const step = cardsPerView
        let next = page + direction * step

        if (next >= cards.length) {
            next = 0
        } else if (next < 0) {
            const lastGroupStart = Math.floor((cards.length - 1) / step) * step
            next = Math.max(lastGroupStart, 0)
        }

        setPage(next)
    }

    function handleKeyDown(e) {
        if (e.key === 'ArrowRight') {
            e.preventDefault()
            goTo(1)
        } else if (e.key === 'ArrowLeft') {
            e.preventDefault()
            goTo(-1)
        }
    }

    function handleTouchStart(e) {
        touchStartX.current = e.touches[0].clientX
    }

    function handleTouchEnd(e) {
        if (touchStartX.current === null) return
        const delta = e.changedTouches[0].clientX - touchStartX.current
        const SWIPE_THRESHOLD = 40
        if (delta > SWIPE_THRESHOLD) {
            goTo(-1)
        } else if (delta < -SWIPE_THRESHOLD) {
            goTo(1)
        }
        touchStartX.current = null
    }

    // Dot pagination reflects groups (pairs on tablet/desktop, singles on
    // mobile) rather than every individual card.
    const groupStarts = []
    for (let i = 0; i < cards.length; i += cardsPerView) {
        groupStarts.push(i)
    }
    const activeGroupIndex = groupStarts.findIndex(
        (start) => page >= start && page < start + cardsPerView
    )

    return (
        <div
            // Wider container so paired cards get real horizontal room
            // instead of feeling squeezed.
            className="max-w-6xl mx-auto text-left"
            tabIndex={0}
            onKeyDown={handleKeyDown}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            aria-roledescription="carousel"
        >
            {/* Card viewport */}
            <div className="relative flex items-stretch gap-3">
                {/* Prev arrow */}
                <button
                    type="button"
                    onClick={() => goTo(-1)}
                    aria-label="Previous card"
                    className="hidden sm:flex items-center justify-center w-11 h-11 my-auto rounded-full bg-white shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 flex-shrink-0"
                    style={{ color: "#2F4A7D" }}
                >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="15 18 9 12 15 6" />
                    </svg>
                </button>

                <div className="flex-1 min-w-0">
                    {/* Mobile: one card */}
                    <div className="block sm:hidden">
                        <ServiceCard
                            key={`${tabKey}-${cards[page].title}`}
                            card={cards[page]}
                            index={0}
                        />
                    </div>

                    {/* Tablet & Desktop: two cards side by side, equal height */}
                    <div className="hidden sm:grid grid-cols-2 gap-8 items-stretch">
                        <ServiceCard
                            key={`${tabKey}-${page}-left`}
                            card={cards[page]}
                            index={0}
                        />

                        {cards[page + 1] && (
                            <ServiceCard
                                key={`${tabKey}-${page}-right`}
                                card={cards[page + 1]}
                                index={1}
                            />
                        )}
                    </div>
                </div>

                {/* Next arrow */}
                <button
                    type="button"
                    onClick={() => goTo(1)}
                    aria-label="Next card"
                    className="hidden sm:flex items-center justify-center w-11 h-11 my-auto rounded-full bg-white shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 flex-shrink-0"
                    style={{ color: "#2F4A7D" }}
                >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="9 18 15 12 9 6" />
                    </svg>
                </button>
            </div>

            {/* Mobile prev/next (arrows hidden above sm breakpoint aren't reachable by thumb easily, so repeat them below on small screens) */}
            <div className="flex sm:hidden items-center justify-center gap-6 mt-4">
                <button
                    type="button"
                    onClick={() => goTo(-1)}
                    aria-label="Previous card"
                    className="flex items-center justify-center w-10 h-10 rounded-full bg-white shadow-md"
                    style={{ color: "#2F4A7D" }}
                >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="15 18 9 12 15 6" />
                    </svg>
                </button>
                <span className="text-sm font-semibold" style={{ color: "#6a7f96" }}>
                    {page + 1} / {cards.length}
                </span>
                <button
                    type="button"
                    onClick={() => goTo(1)}
                    aria-label="Next card"
                    className="flex items-center justify-center w-10 h-10 rounded-full bg-white shadow-md"
                    style={{ color: "#2F4A7D" }}
                >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="9 18 15 12 9 6" />
                    </svg>
                </button>
            </div>

            {/* Dot pagination — one dot per visible group (pair on tablet/desktop) */}
            <div className="hidden sm:flex items-center justify-center gap-2.5 mt-6">
                {groupStarts.map((start, i) => (
                    <button
                        key={start}
                        type="button"
                        onClick={() => setPage(start)}
                        aria-label={`Go to cards ${start + 1}${cardsPerView > 1 && cards[start + 1] ? `-${start + 2}` : ''}`}
                        aria-current={i === activeGroupIndex}
                        className="rounded-full transition-all duration-300"
                        style={{
                            width: i === activeGroupIndex ? '28px' : '9px',
                            height: '9px',
                            background: i === activeGroupIndex ? '#52B5BD' : '#D8E3E8',
                        }}
                    />
                ))}
            </div>
        </div>
    )
}

export default function CompanionServices() {
    const sectionRef = useSectionFade()
    const [headerVisible, setHeaderVisible] = useState(false)
    const [activeTab, setActiveTab] = useState('hospital') // default: hospital section
    const headerRef = useRef(null)
    const tabRefs = useRef([])

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

    function handleTabKeyDown(e, currentIndex) {
        let nextIndex = null

        if (e.key === 'ArrowRight') {
            nextIndex = (currentIndex + 1) % TABS.length
        } else if (e.key === 'ArrowLeft') {
            nextIndex = (currentIndex - 1 + TABS.length) % TABS.length
        } else if (e.key === 'Home') {
            nextIndex = 0
        } else if (e.key === 'End') {
            nextIndex = TABS.length - 1
        }

        if (nextIndex !== null) {
            e.preventDefault()
            setActiveTab(TABS[nextIndex].key)
            tabRefs.current[nextIndex]?.focus()
        }
    }

    const active = TABS.find((t) => t.key === activeTab) || TABS[0]

    return (
        <section
            ref={sectionRef}
            id="Hospital-companion-section"
            className="relative py-24 overflow-hidden bg-[#F8F3EA]"
        >
            {/* Decorative blobs */}
            <div aria-hidden="true" className="absolute top-0 left-0 w-72 h-72 rounded-full bg-[#F2C89F]/30 -translate-x-1/3 -translate-y-1/3 pointer-events-none" />
            <div aria-hidden="true" className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-[#F2C89F]/25 translate-x-1/4 translate-y-1/4 pointer-events-none" />

            {/* Decorative dot grid - top left */}
            <div aria-hidden="true" className="hidden md:grid absolute top-16 left-16 grid-cols-6 gap-2 opacity-40 pointer-events-none">
                {Array.from({ length: 24 }).map((_, i) => (
                    <span key={i} className="w-1 h-1 rounded-full bg-[#C9A96A]" />
                ))}
            </div>

            {/* Decorative dot grid - bottom right */}
            <div aria-hidden="true" className="hidden md:grid absolute bottom-16 right-16 grid-cols-6 gap-2 opacity-40 pointer-events-none">
                {Array.from({ length: 24 }).map((_, i) => (
                    <span key={i} className="w-1 h-1 rounded-full bg-[#C9A96A]" />
                ))}
            </div>

            {/* Decorative leaf branch - top right */}
            <svg
                aria-hidden="true"
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
                aria-hidden="true"
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
                            {TABS.map((tab, i) => {
                                const isActive = tab.key === activeTab
                                return (
                                    <button
                                        key={tab.key}
                                        ref={(el) => (tabRefs.current[i] = el)}
                                        id={`companion-tab-${tab.key}`}
                                        role="tab"
                                        aria-selected={isActive}
                                        aria-controls={`companion-tabpanel-${tab.key}`}
                                        tabIndex={isActive ? 0 : -1}
                                        onClick={() => setActiveTab(tab.key)}
                                        onKeyDown={(e) => handleTabKeyDown(e, i)}
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
                        <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="#F2711F" stroke="none">
                            <path d="M12 21s-6.7-4.3-9.3-8.1C.8 10 1.5 6.6 4.3 5c2.2-1.3 4.9-.7 6.4 1.2.4.5 1.1.5 1.5 0C13.7 4.3 16.4 3.7 18.6 5c2.8 1.6 3.5 5 1.6 7.9C18.7 16.7 12 21 12 21z" />
                        </svg>
                        <span className="w-10 h-px bg-[#E0B98A]" />
                    </div>

                    <p className="text-lg max-w-2xl mx-auto mb-10 leading-relaxed" style={{ color: "#6a7f96" }}>
                        {active.subtext}
                    </p>
                </div>

                {/* Cards */}
                {active.paged ? (
                    <div
                        id={`companion-tabpanel-${active.key}`}
                        role="tabpanel"
                        aria-labelledby={`companion-tab-${active.key}`}
                    >
                        <CardPager cards={active.cards} tabKey={active.key} />
                    </div>
                ) : (
                    <div
                        id={`companion-tabpanel-${active.key}`}
                        role="tabpanel"
                        aria-labelledby={`companion-tab-${active.key}`}
                        tabIndex={0}
                        className={`grid grid-cols-1 ${active.gridCols} gap-6 text-left ${active.maxW} mx-auto`}
                    >
                        {active.cards.map((card, i) => (
                            <ServiceCard key={`${activeTab}-${card.title}`} card={card} index={i} />
                        ))}
                    </div>
                )}

                {/* Bottom CTA */}
                <div
                    style={{
                        opacity: headerVisible ? 1 : 0,
                        transition: 'opacity 0.6s ease 0.5s',
                    }}
                    className="mt-14 inline-flex flex-col sm:flex-row items-center gap-4"
                >

                    <p className="text-sm" style={{ color: "#8a9ab0" }}>
                        {active.ctaHint}
                    </p>
                </div>

            </div>
        </section>
    )
}