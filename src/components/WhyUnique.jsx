import { useSectionFade } from '../hooks/useSectionFade'
import { Wallet, ShieldCheck, Stethoscope, PhoneCall, Clock3, AlertCircle } from 'lucide-react'
import { PHONE_DISPLAY } from '../config/contact'

const DIFFERENTIATORS = [
    {
        icon: Wallet,
        title: '30% at Booking, Rest Later.',
        desc: 'A 30% advance payment is charged at the time of booking to confirm your slot. The remaining 70% is paid after your service is completed. Cancel more than 4 hours before your trip and your 30% advance is fully refunded.',
    },
    {
        icon: ShieldCheck,
        title: '100% satisfaction guarantee',
        desc: 'If our service doesn’t meet your expectations, we’ll refund 70% of your payment. Your trust matters to us.',
    },
    {
        icon: Stethoscope,
        title: 'Trained healthcare professionals',
        desc: 'Our hospital assistants are experienced healthcare professionals who provide reliable support throughout every medical visit.',
    },
    {
        icon: PhoneCall,
        title: '24/7 support',
        desc: `Need help? Our team is available anytime at ${PHONE_DISPLAY} to assist you whenever you need us.`,
    },
]

const CANCELLATION_RULES = [
    {
        icon: Clock3,
        title: 'Free cancellation',
        desc: 'Cancel more than 4 hours before your scheduled service to receive a Full Refund of your 30% advance payment.',
        tone: 'good',
    },
    {
        icon: AlertCircle,
        title: '30% cancellation fee',
        desc: 'Cancellations made within 4 hours of the scheduled start, or if the Customer/Senior is unavailable or refuses service after your WHY Pro has arrived, forfeit the 30% advance already charged at booking.',
        tone: 'warn',
    },
    {
        icon: ShieldCheck,
        title: "If it's on us, you're covered",
        desc: "If a WHY Pro fails to arrive due to WHY's fault, your 30% advance is fully refunded — plus you'll get priority rebooking and 25% off your next booking.",
        tone: 'good',
    },
]

export default function WhyUnique() {
    const sectionRef = useSectionFade()

    return (
        <section
            ref={sectionRef}
            id="why-unique-section"
            className="relative py-20 lg:py-28 bg-[#F7F3EA] overflow-hidden"
        >
            {/* Decorative blobs */}
            <div className="absolute top-0 -left-24 w-96 h-96 rounded-full bg-[#F2C89F]/30 blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 -right-24 w-[26rem] h-[26rem] rounded-full bg-[#7FC8C0]/20 blur-3xl pointer-events-none" />

            <div className="relative max-w-6xl mx-auto px-6 z-10">

                {/* ===== Header ===== */}
                <div className="text-center mb-14 lg:mb-16">
                    <span className="fade-inner inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold mb-6 bg-white shadow-sm" style={{ color: '#F2711F' }}>
                        <ShieldCheck className="w-4 h-4" />
                        What Sets Us Apart
                    </span>

                    <h2 className="fade-inner font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-5" style={{ color: '#1B2A4A' }}>
                        Built Around Your {' '}
                        <span style={{ color: '#F2711F' }}>Peace of Mind</span>
                    </h2>

                    <div className="fade-inner flex items-center justify-center gap-3">
                        <span className="w-16 h-px bg-[#F2711F]/30" />
                        <span className="w-2 h-2 rounded-full bg-[#F2711F]" />
                        <span className="w-16 h-px bg-[#F2711F]/30" />
                    </div>
                </div>

                {/* ===== Differentiator cards ===== */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                    {DIFFERENTIATORS.map((d) => {
                        const Icon = d.icon
                        return (
                            <div
                                key={d.title}
                                className="fade-inner group bg-white rounded-3xl p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                            >
                                <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5 bg-[#F7F3EA] group-hover:bg-[#F2711F] transition-colors duration-300">
                                    <Icon className="w-6 h-6 text-[#F2711F] group-hover:text-white transition-colors duration-300" />
                                </div>
                                <h3 className="font-display text-base font-bold mb-2 leading-snug" style={{ color: '#1B2A4A' }}>{d.title}</h3>
                                <p className="text-sm leading-relaxed" style={{ color: '#5a6b83' }}>{d.desc}</p>
                            </div>
                        )
                    })}
                </div>

                {/* ===== 30/70 trust meter ===== */}
                <div className="fade-inner bg-white rounded-3xl shadow-sm p-7 sm:p-8 mb-14">
    <div
        className="flex items-center justify-between text-sm font-semibold mb-3"
        style={{ color: '#1B2A4A' }}
    >
        <span>30% Charged at Booking</span>
        <span>70% Due After Service</span>
    </div>

    <div className="h-3 w-full rounded-full overflow-hidden flex bg-[#F7F3EA]">
        <div
            className="h-full bg-[#F2711F]"
            style={{ width: '30%' }}
        />
        <div
            className="h-full bg-[#0D9488]"
            style={{ width: '70%' }}
        />
    </div>

    <p
        className="text-xs mt-3 leading-relaxed"
        style={{ color: '#8a9ab0' }}
    >
        A <strong>30% advance payment</strong> is charged{' '}
        <strong>at the time of booking</strong> to confirm your slot. Cancel{' '}
        <strong>more than 4 hours before</strong> your trip starts and this{' '}
        <strong>30% is fully refunded</strong>. The remaining{' '}
        <strong>70%</strong> is paid after your service is completed.
    </p>
</div>

                {/* ===== Cancellation policy ===== */}
                <div className="fade-inner">
                    <div className="text-center mb-10">
                        <h3 className="font-display text-2xl sm:text-3xl font-bold tracking-tight mb-3" style={{ color: '#1B2A4A' }}>
                            Cancellation & Refund policy
                        </h3>
                        <p className="text-sm sm:text-base max-w-xl mx-auto" style={{ color: '#5a6b83' }}>
                            Plans change — here's exactly what happens if yours do.
                        </p>
                    </div>

                    <div className="grid sm:grid-cols-3 gap-6">
                        {CANCELLATION_RULES.map((rule) => {
                            const Icon = rule.icon
                            const isGood = rule.tone === 'good'
                            return (
                                <div
                                    key={rule.title}
                                    className={`rounded-3xl p-6 border ${isGood ? 'bg-[#0D9488]/5 border-[#0D9488]/20' : 'bg-[#F2711F]/5 border-[#F2711F]/20'
                                        }`}
                                >
                                    <div
                                        className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${isGood ? 'bg-[#0D9488]' : 'bg-[#F2711F]'
                                            }`}
                                    >
                                        <Icon className="w-5 h-5 text-white" />
                                    </div>
                                    <h4 className="font-bold text-sm mb-2" style={{ color: '#1B2A4A' }}>{rule.title}</h4>
                                    <p className="text-sm leading-relaxed" style={{ color: '#5a6b83' }}>{rule.desc}</p>
                                </div>
                            )
                        })}
                    </div>

                    <p className="text-center text-xs mt-6" style={{ color: '#8a9ab0' }}>
                        A 30% advance payment is charged at the time of every booking.
                    </p>
                </div>

            </div>
        </section>
    )
}