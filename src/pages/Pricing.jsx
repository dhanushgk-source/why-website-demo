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
  Sparkles,
  ChevronRight,
  Zap,
} from "lucide-react";

// Default fallback matrix matching user's exact specification
const DEFAULT_TIERS = [
  {
    id: "hosp-t1",
    service_category: "Hospital",
    tier_name: "Tier 1 — Companion",
    day_base: 999.0,
    day_addl: 250.0,
    day_ot: 350.0,
    night_base: 1498.5,
    night_addl: 350.0,
    night_ot: 450.0,
    badge_note: "Standard Companion",
  },
  {
    id: "hosp-t2",
    service_category: "Hospital",
    tier_name: "Tier 2 — Trained/Semi-Skilled",
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
    tier_name: "Tier 3 — Skilled Nurse",
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
    tier_name: "Single Tier — Companion",
    day_base: 999.0,
    day_addl: 250.0,
    day_ot: 350.0,
    night_base: 1498.5,
    night_addl: 350.0,
    night_ot: 450.0,
    badge_note: "Same rates as Hospital Tier 1",
  },
];

const TRUST_POINTS = [
  { icon: Tag, title: "Subscription Free Usage", desc: "Pay only when you need assistance. No subscriptions." },
  { icon: ShieldCheck, title: "No Hidden Charges", desc: "Transparent base, additional & OT rates clearly listed." },
  { icon: UserCheck, title: "Verified Professionals", desc: "Every service delivered by a trained, background-checked WHY PRO." },
  { icon: Clock, title: "Flexible Hourly Extension", desc: "Easily extend your duration from 4h up to full day." },
];

export default function PricingSection() {
  const [isNight, setIsNight] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All"); // "All" | "Hospital" | "Travel"
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
    const message = `Hi! I want to book "${tier.service_category} - ${tier.tier_name}" (${rateType} Base: ₹${basePrice} for first 4 hrs). Please share availability.`;
    const link = whatsappNum
      ? `https://wa.me/${whatsappNum.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(message)}`
      : getWhatsAppLink(message);
    window.open(link, "_blank", "noopener,noreferrer");
  };

  const filteredTiers =
    activeCategory === "All"
      ? tiers
      : tiers.filter((t) => (t.service_category || "").toLowerCase() === activeCategory.toLowerCase());

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

            <p className={`text-sm sm:text-base max-w-2xl mx-auto mb-8 ${isNight ? "text-gray-400" : "text-gray-600"}`}>
              Clear, itemized pricing for Hospital & Travel Assistance. Base rates cover <strong>first 4 hours</strong>, followed by transparent hourly additional and overtime rates.
            </p>

            {/* Day / Night Toggle Switch */}
            <div
              className={`inline-flex items-center gap-3 rounded-full p-1.5 shadow-md border transition-colors duration-500 mb-8 ${
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

            {/* Category Filters */}
            <div className="flex items-center justify-center gap-2 flex-wrap">
              {["All", "Hospital", "Travel"].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition ${
                    activeCategory === cat
                      ? "bg-[#16233B] text-[#E8C580] shadow-sm"
                      : isNight
                      ? "bg-slate-800/70 text-gray-300 hover:bg-slate-800"
                      : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
                  }`}
                >
                  {cat === "All" ? "All Services" : `${cat} Assistance`}
                </button>
              ))}
            </div>
          </div>

          {/* Service Tier Cards Container — Auto-Centered Flexbox Layout */}
          <div className="flex flex-wrap items-stretch justify-center gap-6 max-w-6xl mx-auto mb-16">
            {filteredTiers.map((tier) => {
              const basePrice = isNight ? tier.night_base : tier.day_base;
              const addlPrice = isNight ? tier.night_addl : tier.day_addl;
              const otPrice = isNight ? tier.night_ot : tier.day_ot;
              const isHospital = (tier.service_category || "").toLowerCase().includes("hospital");

              return (
                <div
                  key={tier.id || tier.tier_name}
                  className={`w-full sm:w-[320px] md:w-[340px] flex-grow-0 rounded-3xl shadow-sm border p-6 flex flex-col justify-between relative transition-all duration-500 hover:shadow-xl ${
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
                    <div className="flex items-center gap-3 mb-3">
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

                    {/* Base Rate Box */}
                    <div
                      className={`p-4 rounded-2xl mb-4 border ${
                        isNight ? "bg-[#16233B]/60 border-slate-700" : "bg-slate-50 border-slate-200/80"
                      }`}
                    >
                      <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">
                        Base Rate (First 4 Hours)
                      </p>
                      <div className="flex items-baseline gap-1">
                        <span
                          className={`text-3xl font-black ${
                            isNight ? "text-[#F2B705]" : "text-[#0D9488]"
                          }`}
                        >
                          ₹{parseFloat(basePrice).toLocaleString("en-IN")}
                        </span>
                        <span className="text-xs text-slate-500 font-semibold">+ GST</span>
                      </div>
                    </div>

                    {/* Hourly Tier Breakdown List */}
                    <div className="space-y-2.5 mb-6 text-xs">
                      <div className="flex items-center justify-between p-2 rounded-lg bg-slate-100/50 dark:bg-slate-800/40">
                        <span className="font-semibold text-slate-500 flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-[#C5A059]" />
                          First 4 Hours (Base)
                        </span>
                        <span className="font-extrabold text-slate-800 dark:text-slate-200">
                          ₹{parseFloat(basePrice).toLocaleString("en-IN")}
                        </span>
                      </div>

                      <div className="flex items-center justify-between p-2 rounded-lg bg-slate-100/50 dark:bg-slate-800/40">
                        <span className="font-semibold text-slate-500 flex items-center gap-1.5">
                          <Zap className="w-3.5 h-3.5 text-blue-500" />
                          Hours 5–8 (Addl)
                        </span>
                        <span className="font-extrabold text-slate-800 dark:text-slate-200">
                          ₹{parseFloat(addlPrice)}/hr
                        </span>
                      </div>

                      <div className="flex items-center justify-between p-2 rounded-lg bg-slate-100/50 dark:bg-slate-800/40">
                        <span className="font-semibold text-slate-500 flex items-center gap-1.5">
                          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                          Hour 9+ (Overtime)
                        </span>
                        <span className="font-extrabold text-slate-800 dark:text-slate-200">
                          ₹{parseFloat(otPrice)}/hr
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* CTA Button */}
                  <button
                    type="button"
                    onClick={() => handleWhatsApp(tier)}
                    className={`w-full py-3 rounded-full font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition-all ${
                      isNight
                        ? "bg-[#F2B705] text-[#1B2A4A] hover:bg-[#D9A404]"
                        : "bg-[#0D9488] text-white hover:bg-[#0B7C72]"
                    }`}
                  >
                    <span>Book {tier.service_category}</span>
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