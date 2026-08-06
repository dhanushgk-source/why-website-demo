import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSectionFade } from "../hooks/useSectionFade";
import PricingPolice from "../components/WhyUnique";
import { getWhatsAppLink } from "../config/contact";
import { getPublicPricingPlans } from "../services/siteService";
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
  Star,
} from "lucide-react";

const DEFAULT_PLANS = [
  {
    id: "hosp-1",
    title: "Hospital Assistance",
    description: "Professional support inside hospitals and clinics.",
    price: "₹1,499",
    billing_cycle: "session",
    includedHours: "Up to 4 Hours",
    features: [
      "Verified WHY Professional",
      "Hospital visit assistance",
      "Doctor communication support",
      "Prescription & report collection",
      "Live updates to family",
      "Wheelchair & navigation assistance",
      "Booking support",
    ],
    is_popular: true,
  },
  {
    id: "trav-1",
    title: "Travel Assistance",
    description: "Companionship and support for your travel journey.",
    price: "₹999",
    billing_cycle: "trip",
    includedHours: "Up to 4 Hours",
    features: [
      "Verified WHY Professional",
      "Door-to-door travel support",
      "Assistance during travel (pick-up & drop)",
      "Travel arrangements support",
      "Live updates to family",
      "Booking support",
    ],
    is_popular: false,
  },
];

const TRUST_POINTS = [
  { icon: Tag, title: "Subscription Free Usage", desc: "Pay only when you need assistance. No subscriptions." },
  { icon: ShieldCheck, title: "No Hidden Charges", desc: "Transparent pricing with GST clearly mentioned." },
  { icon: UserCheck, title: "Verified Professionals", desc: "Every service delivered by a trained, verified WHY PRO." },
  { icon: Clock, title: "Flexible Duration", desc: "Need more time? Extend your booking easily." },
];

export default function PricingSection() {
  const [isNight, setIsNight] = useState(false);
  const [plans, setPlans] = useState(DEFAULT_PLANS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPlans() {
      try {
        const fetched = await getPublicPricingPlans();
        if (fetched && fetched.length > 0) {
          setPlans(fetched);
        }
      } catch (err) {
        console.error("Error loading pricing plans:", err);
      } finally {
        setLoading(false);
      }
    }
    loadPlans();
  }, []);

  const handleWhatsApp = (plan) => {
    const message = `Hi! I am interested in booking the "${plan.title}" package (${plan.price}/${plan.billing_cycle || "month"}). Please share details.`;
    const link = getWhatsAppLink(message);
    window.open(link, "_blank", "noopener,noreferrer");
  };

  return (
    <>
      <section
        className={`w-full py-16 sm:py-20 px-4 sm:px-6 lg:px-8 transition-colors duration-500 ${
          isNight ? "bg-[#0B1220]" : "bg-[#F7FAFB]"
        }`}
      >
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-10 sm:mb-12">
            <span
              className={`inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wide mb-5 transition-colors duration-500 ${
                isNight ? "bg-[#F2B705] text-[#1B2A4A]" : "bg-[#0D5C4C] text-white"
              }`}
            >
              <Gift className={`w-4 h-4 ${isNight ? "text-[#1B2A4A]" : "text-[#F2B705]"}`} />
              Subscription Free Usage
            </span>

            <h2
              className={`font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-3 tracking-tight transition-colors duration-500 ${
                isNight ? "text-white" : "text-[#1B2A4A]"
              }`}
            >
              Simple, Transparent Pricing
            </h2>

            <p
              className={`text-sm sm:text-base max-w-xl mx-auto mb-8 transition-colors duration-500 ${
                isNight ? "text-gray-400" : "text-gray-500"
              }`}
            >
              Book only when you need assistance. Pay per service. No monthly commitments.
            </p>

            {/* Day / Night toggle */}
            <div
              className={`inline-flex items-center gap-3 rounded-full p-1.5 shadow-sm border transition-colors duration-500 ${
                isNight ? "bg-[#111A2E] border-[#243044]" : "bg-white border-gray-200"
              }`}
            >
              <button
                type="button"
                onClick={() => setIsNight(false)}
                className={`flex items-center gap-1.5 px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-colors ${
                  !isNight
                    ? "bg-[#0D9488] text-white shadow-sm"
                    : isNight
                    ? "text-gray-400 hover:text-white"
                    : "text-gray-500 hover:text-[#1B2A4A]"
                }`}
              >
                <Sun className="w-4 h-4" strokeWidth={2} />
                Day Rate
              </button>
              <button
                type="button"
                onClick={() => setIsNight(true)}
                className={`flex items-center gap-1.5 px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-colors ${
                  isNight ? "bg-[#F2B705] text-[#1B2A4A] shadow-sm" : "text-gray-500 hover:text-[#1B2A4A]"
                }`}
              >
                <Moon className="w-4 h-4" strokeWidth={2} />
                Night Rate
              </button>
            </div>
          </div>

          {/* Plan cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {plans.map((plan) => (
              <div
                key={plan.id || plan.title}
                className={`rounded-3xl shadow-sm border p-6 sm:p-8 flex flex-col relative transition-all duration-500 ${
                  plan.is_popular ? "border-amber-400 ring-2 ring-amber-400/20" : ""
                } ${isNight ? "bg-[#111A2E] border-[#243044]" : "bg-white border-gray-100"}`}
              >
                {plan.is_popular && (
                  <div className="absolute -top-3.5 right-6 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-bold text-xs px-3.5 py-1 rounded-full shadow flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <span>Most Popular</span>
                  </div>
                )}

                {/* Top row: title + price */}
                <div className="mb-6">
                  <h3
                    className={`text-xl font-extrabold mb-1 transition-colors duration-500 ${
                      isNight ? "text-white" : "text-[#1B2A4A]"
                    }`}
                  >
                    {plan.title}
                  </h3>
                  <p
                    className={`text-xs min-h-[32px] transition-colors duration-500 ${
                      isNight ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    {plan.description || "Comprehensive companion support & professional care."}
                  </p>

                  <div className="mt-4 flex items-baseline gap-1">
                    <span
                      className={`text-3xl sm:text-4xl font-extrabold transition-colors duration-500 ${
                        isNight ? "text-[#F2B705]" : "text-[#0D9488]"
                      }`}
                    >
                      {plan.price}
                    </span>
                    <span
                      className={`text-xs font-semibold uppercase tracking-wide transition-colors duration-500 ${
                        isNight ? "text-gray-400" : "text-gray-500"
                      }`}
                    >
                      /{plan.billing_cycle || "month"}
                    </span>
                  </div>
                </div>

                {/* Includes list */}
                <p
                  className={`text-xs font-bold uppercase tracking-wide mb-3 transition-colors duration-500 ${
                    isNight ? "text-[#F2B705]" : "text-[#0D9488]"
                  }`}
                >
                  What's Included
                </p>
                <ul className="space-y-2.5 mb-8 flex-1">
                  {(Array.isArray(plan.features) ? plan.features : []).map((feature, idx) => (
                    <li
                      key={idx}
                      className={`flex items-start gap-2.5 text-sm transition-colors duration-500 ${
                        isNight ? "text-gray-300" : "text-[#1B2A4A]"
                      }`}
                    >
                      <Check
                        className={`w-4 h-4 mt-0.5 flex-shrink-0 transition-colors duration-500 ${
                          isNight ? "text-[#F2B705]" : "text-[#0D9488]"
                        }`}
                        strokeWidth={2.5}
                      />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <button
                  type="button"
                  onClick={() => handleWhatsApp(plan)}
                  className={`mt-auto flex items-center justify-center gap-2 w-full py-3.5 rounded-full font-bold text-sm sm:text-base shadow-md transition-colors duration-500 ${
                    isNight
                      ? "bg-[#F2B705] text-[#1B2A4A] hover:bg-[#D9A404]"
                      : "bg-[#0D9488] text-white hover:bg-[#0B7C72]"
                  }`}
                >
                  Book Package Now
                  <span className="text-lg leading-none">&rarr;</span>
                </button>
              </div>
            ))}
          </div>

          {/* Trust points strip */}
          <div className="mt-12 sm:mt-16 grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {TRUST_POINTS.map((point) => (
              <div key={point.title} className="flex items-start gap-3">
                <span
                  className={`w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 transition-colors duration-500 ${
                    isNight ? "bg-[#F2B705]/15" : "bg-[#0D9488]/10"
                  }`}
                >
                  <point.icon
                    className={`w-5 h-5 transition-colors duration-500 ${
                      isNight ? "text-[#F2B705]" : "text-[#0D9488]"
                    }`}
                    strokeWidth={1.75}
                  />
                </span>
                <div>
                  <p
                    className={`text-sm font-bold leading-tight mb-0.5 transition-colors duration-500 ${
                      isNight ? "text-white" : "text-[#1B2A4A]"
                    }`}
                  >
                    {point.title}
                  </p>
                  <p
                    className={`text-xs leading-snug transition-colors duration-500 ${
                      isNight ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    {point.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <PricingPolice />
    </>
  );
}