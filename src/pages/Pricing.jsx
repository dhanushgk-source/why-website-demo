import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSectionFade } from "../hooks/useSectionFade";
import PricingPolice from "../components/WhyUnique";
import { getWhatsAppLink } from "../config/contact";
import { getPublicPricingPlans, getPublicSiteSettings } from "../services/siteService";
import {
  Gift,
  Building2,
  Car,
  Clock,
  Tag,
  ShieldCheck,
  UserCheck,
  Moon,
  Sun,
  ChevronRight,
} from "lucide-react";

// Default fallback matrix matching updated title specification
const DEFAULT_TIERS = [
  {
    id: "hosp-t1",
    service_category: "Hospital",
    tier_name: "Standard Companion Care",
    day_base: 999.0,
    day_addl: 250.0,
    day_ot: 350.0,
    night_base: 1498.5,
    night_addl: 350.0,
    night_ot: 450.0,
    badge_note: "Companion Support",
  },
  {
    id: "hosp-t2",
    service_category: "Hospital",
    tier_name: "Trained Companion Care",
    day_base: 1200.0,
    day_addl: 250.0,
    day_ot: 350.0,
    night_base: 1800.0,
    night_addl: 350.0,
    night_ot: 450.0,
    badge_note: "During App Launch",
  },
  {
    id: "hosp-t3",
    service_category: "Hospital",
    tier_name: "Skilled Nurse Care",
    day_base: 1400.0,
    day_addl: 250.0,
    day_ot: 350.0,
    night_base: 2100.0,
    night_addl: 350.0,
    night_ot: 450.0,
    badge_note: "During App Launch",
  },
  {
    id: "trav-t1",
    service_category: "Travel",
    tier_name: "Travel Companion Care",
    day_base: 999.0,
    day_addl: 250.0,
    day_ot: 350.0,
    night_base: 1498.5,
    night_addl: 350.0,
    night_ot: 450.0,
    badge_note: "Full Journey Escort",
  },
];

const TRUST_POINTS = [
  { icon: Tag, title: "Subscription Free Usage", desc: "Pay only when you need assistance. No subscriptions." },
  { icon: ShieldCheck, title: "No Hidden Charges", desc: "Transparent rates clearly listed for all services." },
  { icon: UserCheck, title: "Verified Professionals", desc: "Every service delivered by a trained, background-checked WHY PRO." },
  { icon: Clock, title: "Flexible Duration", desc: "Need more time? Extend your booking easily." },
];

export default function PricingSection() {
  const [isNight, setIsNight] = useState(false);
  const [tiers, setTiers] = useState(DEFAULT_TIERS);
  const [whatsappNum, setWhatsappNum] = useState("");

  useEffect(() => {
    async function loadData() {
      try {
        const [fetchedTiers, settings] = await Promise.all([
          getPublicPricingPlans(),
          getPublicSiteSettings(),
        ]);

        if (settings && settings.whatsapp_number) {
          setWhatsappNum(settings.whatsapp_number);
        }

        if (fetchedTiers && fetchedTiers.length > 0) {
          setTiers(fetchedTiers);
        }
      } catch (err) {
        console.error("Error loading dynamic service matrix:", err);
      }
    }
    loadData();
  }, []);

  const handleWhatsApp = (tier) => {
    const basePrice = isNight ? tier.night_base : tier.day_base;
    const rateType = isNight ? "Night Rate" : "Day Rate";
    const message = `Hi! I want to book "${tier.service_category} - ${tier.tier_name}" (${rateType}: ₹${basePrice} for first 4 hrs). Please share availability.`;
    const link = whatsappNum
      ? `https://wa.me/${whatsappNum.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(message)}`
      : getWhatsAppLink(message);
    window.open(link, "_blank", "noopener,noreferrer");
  };

  return (
    <>
      <section
        className={`w-full py-16 sm:py-20 px-4 sm:px-6 lg:px-8 transition-colors duration-500 ${
          isNight ? "bg-[#0B1220] text-white" : "bg-[#F7FAFB] text-slate-900"
        }`}
      >
        <div className="max-w-7xl mx-auto">
          {/* Top Header */}
          <div className="text-center mb-10 sm:mb-12">
            <span
              className={`inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wide mb-5 transition-colors duration-500 ${
                isNight ? "bg-[#F2B705] text-[#1B2A4A]" : "bg-[#0D5C4C] text-white"
              }`}
            >
              <Gift className={`w-4 h-4 ${isNight ? "text-[#1B2A4A]" : "text-[#F2B705]"}`} />
              Subscription Free Usage
            </span>

            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-3 tracking-tight">
              Simple, Transparent Pricing
            </h1>

            <p className={`text-sm sm:text-base max-w-xl mx-auto mb-8 ${isNight ? "text-gray-400" : "text-gray-600"}`}>
              Book only when you need assistance. Pay per service. No monthly commitments.
            </p>

            {/* Day / Night Toggle Switch */}
            <div
              className={`inline-flex items-center gap-3 rounded-full p-1.5 shadow-md border transition-colors duration-500 mb-4 ${
                isNight ? "bg-[#111A2E] border-[#243044]" : "bg-white border-gray-200"
              }`}
            >
              <button
                type="button"
                onClick={() => setIsNight(false)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all ${
                  !isNight
                    ? "bg-[#0D9488] text-white shadow-md"
                    : isNight
                    ? "text-gray-400 hover:text-white"
                    : "text-gray-500 hover:text-[#1B2A4A]"
                }`}
              >
                <Sun className="w-4 h-4" strokeWidth={2.2} />
                Day Rate (7 AM - 9 PM)
              </button>
              <button
                type="button"
                onClick={() => setIsNight(true)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all ${
                  isNight
                    ? "bg-[#F2B705] text-[#1B2A4A] shadow-md"
                    : "text-gray-500 hover:text-[#1B2A4A]"
                }`}
              >
                <Moon className="w-4 h-4" strokeWidth={2.2} />
                Night Rate (9 PM - 7 AM)
              </button>
            </div>
          </div>

          {/* Service Tier Cards Container — Clean & Sleek Auto-Centered Grid */}
          <div className="flex flex-wrap items-stretch justify-center gap-6 max-w-6xl mx-auto mb-16">
            {tiers.map((tier) => {
              const basePrice = isNight ? tier.night_base : tier.day_base;
              const addlPrice = isNight ? tier.night_addl || 350 : tier.day_addl || 250;
              const otPrice = isNight ? tier.night_ot || 450 : tier.day_ot || 350;
              const isHospital = (tier.service_category || "").toLowerCase().includes("hospital");

              return (
                <div
                  key={tier.id || tier.tier_name}
                  className={`w-full sm:w-[300px] md:w-[320px] flex-grow-0 rounded-3xl shadow-sm border p-6 flex flex-col justify-between relative transition-all duration-500 hover:shadow-xl ${
                    isNight ? "bg-[#111A2E] border-[#243044]" : "bg-white border-slate-200/90"
                  }`}
                >
                  {/* Top Badge Note */}
                  {tier.badge_note && (
                    <span className="absolute -top-3 right-5 bg-[#C5A059] text-white font-bold text-[10px] uppercase px-3 py-0.5 rounded-full shadow-sm">
                      {tier.badge_note}
                    </span>
                  )}

                  <div>
                    {/* Header icon & category */}
                    <div className="flex items-center gap-3 mb-4">
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                          isNight ? "bg-[#F2B705]/15 text-[#F2B705]" : "bg-[#0D9488]/10 text-[#0D9488]"
                        }`}
                      >
                        {isHospital ? <Building2 className="w-5 h-5" /> : <Car className="w-5 h-5" />}
                      </div>
                      <div>
                        <span className="text-[10px] uppercase font-bold tracking-widest text-[#C5A059]">
                          {tier.service_category} Assistance
                        </span>
                        <h3 className="text-base font-extrabold leading-tight">{tier.tier_name}</h3>
                      </div>
                    </div>

                    {/* Main Clean Hero Price Statement */}
                    <div
                      className={`p-5 rounded-2xl mb-4 border text-center ${
                        isNight ? "bg-[#16233B]/60 border-slate-700" : "bg-slate-50 border-slate-200/80"
                      }`}
                    >
                      <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                        Service Starts From
                      </p>
                      <div className="flex items-baseline justify-center gap-1">
                        <span
                          className={`text-3.5xl font-black text-3xl ${
                            isNight ? "text-[#F2B705]" : "text-[#0D9488]"
                          }`}
                        >
                          ₹{parseFloat(basePrice).toLocaleString("en-IN")}
                        </span>
                      </div>
                      <p className="text-xs font-semibold text-slate-500 mt-1">
                        for first 2 hours <span className="text-[10px] opacity-75">(+ 18% GST)</span>
                      </p>
                    </div>

                    {/* Minimal Extension Note */}
                    <div className="p-3 rounded-xl bg-slate-100/60 dark:bg-slate-800/40 text-center mb-6">
                      <p className="text-[11px] text-slate-500 font-medium">
                        Flexible hourly extensions:
                      </p>
                      <p className="text-xs font-bold text-slate-700 dark:text-slate-300 mt-0.5">
                        Hrs 5–8: ₹{addlPrice}/hr · Hr 9+: ₹{otPrice}/hr
                      </p>
                    </div>
                  </div>

                  {/* CTA Button */}
                  <button
                    type="button"
                    onClick={() => handleWhatsApp(tier)}
                    className={`w-full py-3.5 rounded-full font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition-all ${
                      isNight
                        ? "bg-[#F2B705] text-[#1B2A4A] hover:bg-[#D9A404]"
                        : "bg-[#0D9488] text-white hover:bg-[#0B7C72]"
                    }`}
                  >
                    <span>Book Service</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              );
            })}
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