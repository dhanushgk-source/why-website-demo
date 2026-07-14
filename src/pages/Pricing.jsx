import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useSectionFade } from '../hooks/useSectionFade'
import PricingPolice from "../components/WhyUnique"
import { getWhatsAppLink } from '../config/contact' // <-- adjust path to your contacts.js
import {
  Gift,
  Building2,
  Car,
  Check,
  Clock,
  Tag,
  ShieldCheck,
  UserCheck,
  Moon,
  Sun,
} from 'lucide-react'

const PLANS = [
  {
    icon: Building2,
    title: 'Hospital Assistance',
    desc: 'Professional support inside hospitals and clinics.',
    dayPrice: '1,999',
    nightPrice: '3,999',
    includedHours: 'Up to 4 Hours',
    includes: [
      'Verified WHY Professional',
      'Hospital visit assistance',
      'Doctor communication support',
      'Prescription & report collection',
      'Live updates to family',
      'Wheelchair & navigation assistance',
      'Booking support',
    ],
    extraNote: 'Extra hours will be charged additionally beyond the included 4 hours.',
    ctaLabel: 'Book Hospital Assistance',
  },
  {
    icon: Car,
    title: 'Travel Assistance',
    desc: 'Companionship and support for your travel journey.',
    dayPrice: '1,499',
    nightPrice: '2,999',
    includedHours: 'Up to 4 Hours',
    includes: [
      'Verified WHY Professional',
      'Door-to-door travel support',
      'Assistance during travel (pick-up & drop)',
      'Travel arrangements support',
      'Live updates to family',
      'Booking support',
    ],
    extraNote: 'Extra hours will be charged additionally beyond the included 4 hours.',
    ctaLabel: 'Book Travel Assistance',
  },
]

const TRUST_POINTS = [
  { icon: Tag, title: 'Subscription Free Usage', desc: 'Pay only when you need assistance. No subscriptions.' },
  { icon: ShieldCheck, title: 'No Hidden Charges', desc: 'Transparent pricing with GST clearly mentioned.' },
  { icon: UserCheck, title: 'Verified Professionals', desc: 'Every service is delivered by a trained, verified WHY Pro.' },
  { icon: Clock, title: 'Flexible Duration', desc: 'Need more time? Extend your booking easily.' },
]

function Section({ children, className = '', id }) {
  const ref = useSectionFade()
  return (
    <section ref={ref} id={id} className={`relative ${className}`}>
      {children}
    </section>
  )
}

export default function PricingSection() {
  const [isNight, setIsNight] = useState(false)

  // Opens WhatsApp with a message pre-filled for the specific plan + rate period.
  const handleWhatsApp = (plan) => {
    const message = `Hi`
    const link = getWhatsAppLink(message)
    window.open(link, '_blank', 'noopener,noreferrer')
  }

  return (<>
    <section className={`w-full py-16 sm:py-20 px-4 sm:px-6 lg:px-8 transition-colors duration-500 ${
      isNight ? 'bg-[#0B1220]' : 'bg-[#F7FAFB]'
    }`}>
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="text-center mb-10 sm:mb-12">
          <span className={`inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wide mb-5 transition-colors duration-500 ${
            isNight ? 'bg-[#F2B705] text-[#1B2A4A]' : 'bg-[#0D5C4C] text-white'
          }`}>
            <Gift className={`w-4 h-4 transition-colors duration-500 ${isNight ? 'text-[#1B2A4A]' : 'text-[#F2B705]'}`} />
            Subscription Free Usage
          </span>

          <h2 className={`font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-3 tracking-tight transition-colors duration-500 ${
            isNight ? 'text-white' : 'text-[#1B2A4A]'
          }`}>
            Simple, Transparent Pricing
          </h2>

          <p className={`text-sm sm:text-base max-w-xl mx-auto mb-8 transition-colors duration-500 ${
            isNight ? 'text-gray-400' : 'text-gray-500'
          }`}>
            Book only when you need assistance. Pay per service. No monthly commitments.
          </p>

          {/* Day / Night toggle */}
          <div className={`inline-flex items-center gap-3 rounded-full p-1.5 shadow-sm border transition-colors duration-500 ${
            isNight ? 'bg-[#111A2E] border-[#243044]' : 'bg-white border-gray-200'
          }`}>
            <button
              type="button"
              onClick={() => setIsNight(false)}
              className={`flex items-center gap-1.5 px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-colors ${
                !isNight
                  ? 'bg-[#0D9488] text-white shadow-sm'
                  : isNight ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-[#1B2A4A]'
              }`}
            >
              <Sun className="w-4 h-4" strokeWidth={2} />
              Day
            </button>
            <button
              type="button"
              onClick={() => setIsNight(true)}
              className={`flex items-center gap-1.5 px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-colors ${
                isNight ? 'bg-[#F2B705] text-[#1B2A4A] shadow-sm' : 'text-gray-500 hover:text-[#1B2A4A]'
              }`}
            >
              <Moon className="w-4 h-4" strokeWidth={2} />
              Night
            </button>
          </div>
        </div>

        {/* Plan cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {PLANS.map((plan) => (
            <div
              key={plan.title}
              className={`rounded-3xl shadow-sm border p-6 sm:p-8 flex flex-col transition-colors duration-500 ${
                isNight ? 'bg-[#111A2E] border-[#243044]' : 'bg-white border-gray-100'
              }`}
            >
              {/* Top row: icon + title + price */}
              <div className="flex items-start justify-between gap-4 mb-6">
                <div className="flex items-start gap-4">
                  <span className={`w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 transition-colors duration-500 ${
                    isNight ? 'bg-[#F2B705]/15' : 'bg-[#0D9488]/10'
                  }`}>
                    <plan.icon className={`w-7 h-7 transition-colors duration-500 ${isNight ? 'text-[#F2B705]' : 'text-[#0D9488]'}`} strokeWidth={1.75} />
                  </span>
                  <div>
                    <h3 className={`text-lg sm:text-xl font-extrabold mb-1 transition-colors duration-500 ${
                      isNight ? 'text-white' : 'text-[#1B2A4A]'
                    }`}>{plan.title}</h3>
                    <p className={`text-sm max-w-[22ch] transition-colors duration-500 ${isNight ? 'text-gray-400' : 'text-gray-500'}`}>{plan.desc}</p>
                  </div>
                </div>

                <div className="text-right flex-shrink-0">
                  <p className={`text-[10px] sm:text-xs font-semibold uppercase tracking-wide mb-0.5 transition-colors duration-500 ${
                    isNight ? 'text-gray-500' : 'text-gray-400'
                  }`}>
                    {isNight ? 'Night rate' : 'Starting from'}
                  </p>
                  <p className={`text-2xl sm:text-3xl font-extrabold leading-none transition-colors duration-500 ${
                    isNight ? 'text-[#F2B705]' : 'text-[#0D9488]'
                  }`}>
                    &#8377;{isNight ? plan.nightPrice : plan.dayPrice}
                  </p>
                  <p className={`text-[11px] mb-2 transition-colors duration-500 ${isNight ? 'text-gray-500' : 'text-gray-400'}`}>+ 18% GST</p>
                  <span className={`inline-block px-3 py-1 rounded-full text-[11px] font-semibold transition-colors duration-500 ${
                    isNight ? 'bg-[#F2B705] text-[#1B2A4A]' : 'bg-[#0D5C4C] text-white'
                  }`}>
                    {plan.includedHours}
                  </span>
                </div>
              </div>

              {/* Includes list */}
              <p className={`text-xs font-bold uppercase tracking-wide mb-3 transition-colors duration-500 ${
                isNight ? 'text-[#F2B705]' : 'text-[#0D9488]'
              }`}>Includes</p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 mb-6">
                {plan.includes.map((item) => (
                  <li key={item} className={`flex items-start gap-2 text-sm transition-colors duration-500 ${
                    isNight ? 'text-gray-300' : 'text-[#1B2A4A]'
                  }`}>
                    <Check className={`w-4 h-4 mt-0.5 flex-shrink-0 transition-colors duration-500 ${
                      isNight ? 'text-[#F2B705]' : 'text-[#0D9488]'
                    }`} strokeWidth={2.5} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              {/* Simple extra-charges note instead of the detailed breakdown */}
              <div className={`flex items-start gap-2 rounded-xl px-4 py-3 mb-6 transition-colors duration-500 ${
                isNight ? 'bg-[#1C1608] border border-[#3A2E12]' : 'bg-[#F7F3EA]'
              }`}>
                <Clock className={`w-4 h-4 mt-0.5 flex-shrink-0 transition-colors duration-500 ${
                  isNight ? 'text-[#F2B705]' : 'text-[#F2711F]'
                }`} />
                <p className={`text-xs sm:text-sm transition-colors duration-500 ${isNight ? 'text-gray-400' : 'text-gray-600'}`}>{plan.extraNote}</p>
              </div>

              {/* CTA */}
              <button
                type="button"
                onClick={() => handleWhatsApp(plan)}
                className={`mt-auto flex items-center justify-center gap-2 w-full py-3 rounded-full font-semibold text-sm sm:text-base transition-colors duration-500 ${
                  isNight
                    ? 'bg-[#F2B705] text-[#1B2A4A] hover:bg-[#D9A404]'
                    : 'bg-[#0D9488] text-white hover:bg-[#0B7C72]'
                }`}
              >
                {plan.ctaLabel}
                <span className="text-lg leading-none">&rarr;</span>
              </button>
            </div>
          ))}
        </div>

        {/* Trust points strip */}
        <div className="mt-10 sm:mt-12 grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {TRUST_POINTS.map((point) => (
            <div key={point.title} className="flex items-start gap-3">
              <span className={`w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 transition-colors duration-500 ${
                isNight ? 'bg-[#F2B705]/15' : 'bg-[#0D9488]/10'
              }`}>
                <point.icon className={`w-5 h-5 transition-colors duration-500 ${isNight ? 'text-[#F2B705]' : 'text-[#0D9488]'}`} strokeWidth={1.75} />
              </span>
              <div>
                <p className={`text-sm font-bold leading-tight mb-0.5 transition-colors duration-500 ${
                  isNight ? 'text-white' : 'text-[#1B2A4A]'
                }`}>{point.title}</p>
                <p className={`text-xs leading-snug transition-colors duration-500 ${isNight ? 'text-gray-400' : 'text-gray-500'}`}>{point.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
    <PricingPolice/>
    </>
  )
}