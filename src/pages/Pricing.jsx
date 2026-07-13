import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useSectionFade } from '../hooks/useSectionFade'
import PricingPolice from "../components/WhyUnique"
import {
  Gift,
  Building2,
  Car,
  Check,
  Clock,
  Tag,
  ShieldCheck,
  UserCheck,
} from 'lucide-react'

const PLANS = [
  {
    icon: Building2,
    title: 'Hospital Assistance',
    desc: 'Professional support inside hospitals and clinics.',
    price: '1,999',
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
    extraNote: 'Extra hours are charged additionally beyond the included 4 hours.',
    ctaLabel: 'Book Hospital Assistance',
  },
  {
    icon: Car,
    title: 'Travel Assistance',
    desc: 'Companionship and support for your travel journey.',
    price: '1,499',
    includedHours: 'Up to 4 Hours',
    includes: [
      'Verified WHY Professional',
      'Door-to-door travel support',
      'Assistance during travel (pick-up & drop)',
      'Travel arrangements support',
      'Live updates to family',
      'Booking support',
    ],
    extraNote: 'Extra hours are charged additionally beyond the included 4 hours.',
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
  return (<>
    <section className="w-full bg-[#F7FAFB] py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="text-center mb-10 sm:mb-12">
          <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#0D5C4C] text-white text-xs sm:text-sm font-bold uppercase tracking-wide mb-5">
            <Gift className="w-4 h-4 text-[#F2B705]" />
            Subscription Free Usage
          </span>

          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1B2A4A] mb-3 tracking-tight">
            Simple, Transparent Pricing
          </h2>

          <p className="text-sm sm:text-base text-gray-500 max-w-xl mx-auto">
            Book only when you need assistance. Pay per service. No monthly commitments.
          </p>
        </div>

        {/* Plan cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {PLANS.map((plan) => (
            <div
              key={plan.title}
              className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 sm:p-8 flex flex-col"
            >
              {/* Top row: icon + title + price */}
              <div className="flex items-start justify-between gap-4 mb-6">
                <div className="flex items-start gap-4">
                  <span className="w-14 h-14 rounded-2xl bg-[#0D9488]/10 flex items-center justify-center flex-shrink-0">
                    <plan.icon className="w-7 h-7 text-[#0D9488]" strokeWidth={1.75} />
                  </span>
                  <div>
                    <h3 className="text-lg sm:text-xl font-extrabold text-[#1B2A4A] mb-1">{plan.title}</h3>
                    <p className="text-sm text-gray-500 max-w-[22ch]">{plan.desc}</p>
                  </div>
                </div>

                <div className="text-right flex-shrink-0">
                  <p className="text-[10px] sm:text-xs font-semibold text-gray-400 uppercase tracking-wide mb-0.5">
                    Starting from
                  </p>
                  <p className="text-2xl sm:text-3xl font-extrabold text-[#0D9488] leading-none">
                    &#8377;{plan.price}
                  </p>
                  <p className="text-[11px] text-gray-400 mb-2">+ 18% GST</p>
                  <span className="inline-block px-3 py-1 rounded-full bg-[#0D5C4C] text-white text-[11px] font-semibold">
                    {plan.includedHours}
                  </span>
                </div>
              </div>

              {/* Includes list */}
              <p className="text-xs font-bold text-[#0D9488] uppercase tracking-wide mb-3">Includes</p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 mb-6">
                {plan.includes.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-[#1B2A4A]">
                    <Check className="w-4 h-4 text-[#0D9488] mt-0.5 flex-shrink-0" strokeWidth={2.5} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              {/* Simple extra-charges note instead of the detailed breakdown */}
              <div className="flex items-start gap-2 bg-[#F7F3EA] rounded-xl px-4 py-3 mb-6">
                <Clock className="w-4 h-4 text-[#F2711F] mt-0.5 flex-shrink-0" />
                <p className="text-xs sm:text-sm text-gray-600">{plan.extraNote}</p>
              </div>

              {/* CTA */}
              <button className="mt-auto flex items-center justify-center gap-2 w-full py-3 rounded-full bg-[#0D9488] text-white font-semibold text-sm sm:text-base hover:bg-[#0B7C72] transition-colors">
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
              <span className="w-11 h-11 rounded-full bg-[#0D9488]/10 flex items-center justify-center flex-shrink-0">
                <point.icon className="w-5 h-5 text-[#0D9488]" strokeWidth={1.75} />
              </span>
              <div>
                <p className="text-sm font-bold text-[#1B2A4A] leading-tight mb-0.5">{point.title}</p>
                <p className="text-xs text-gray-500 leading-snug">{point.desc}</p>
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