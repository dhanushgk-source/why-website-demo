import {
  BookOpen,
  House,
  Wallet,
  Handshake,
  TrendingUp,
  HeartHandshake,
} from "lucide-react";

const benefits = [
  {
    icon: BookOpen,
    title: "Learning Budget",
    description:
      "Annual budget for courses, books, and conferences. We invest in your growth.",
  },
  {
    icon: House,
    title: "Remote Friendly",
    description:
      "Flexible work-from-home options for most roles. Output matters, not location.",
  },
  {
    icon: Wallet,
    title: "Competitive Pay",
    description:
      "Market-aligned salaries benchmarked regularly, plus performance bonuses.",
  },
  {
    icon: Handshake,
    title: "Real Impact",
    description:
      "Work that touches real families — not just metrics on a dashboard.",
  },
  {
    icon: TrendingUp,
    title: "Career Growth",
    description:
      "Clear growth tracks. Promotions based on impact, not tenure.",
  },
  {
    icon: HeartHandshake,
    title: "Supportive Culture",
    description:
      "Small team, open culture. Everyone's voice matters from day one.",
  },
];

export default function Benefits() {
  return (
    <section className="bg-[#F8FEFF] py-24 px-6">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-[#52B5BD] text-sm font-semibold tracking-[0.25em] uppercase">
            Perks & Benefits
          </span>
          <h2 className="text-[#2F4A7D] font-bold mt-4 mb-5 text-3xl md:text-5xl font-Manrope">
            Employee Benefits
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-lg">
            We take care of our people so they can take care of what matters
            most. Enjoy meaningful work, continuous learning, and a culture
            built around trust and growth.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {benefits.map((item) => {
            const Icon = item.icon; // ← capital I, treated as a stable component reference
            return (
              <div
                key={item.title}
                className="group bg-white rounded-3xl p-8 border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
              >
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#52B5BD]/15 to-[#2F4A7D]/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Icon size={30} className="text-[#52B5BD]" strokeWidth={2.2} />
                </div>
                <h3 className="text-[#2F4A7D] text-xl font-semibold mb-3 font-Manrope">
                  {item.title}
                </h3>
                <p className="text-gray-500 leading-7">{item.description}</p>
              </div>
            );
          })}
        </div>

        {/* Bottom Divider */}
        <div className="mt-16 flex items-center justify-center gap-4">
          <div className="h-px bg-gray-200 flex-1 max-w-xs" />
          <span className="text-[#52B5BD] font-medium whitespace-nowrap">
            + More benefits as we grow
          </span>
          <div className="h-px bg-gray-200 flex-1 max-w-xs" />
        </div>

      </div>
    </section>
  );
}