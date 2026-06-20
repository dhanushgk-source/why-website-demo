const benefits = [
  {
    emoji: "📚",
    title: "Learning Budget",
    description: "Annual budget for courses, books, and conferences. We invest in your growth.",
  },
  {
    emoji: "🏡",
    title: "Remote Friendly",
    description: "Flexible work-from-home options for most roles. Output matters, not location.",
  },
  {
    emoji: "💰",
    title: "Competitive Pay",
    description: "Market-aligned salaries benchmarked regularly, plus performance bonuses.",
  },
  {
    emoji: "🤝",
    title: "Real Impact",
    description: "Work that touches real families — not just metrics on a dashboard.",
  },
  {
    emoji: "🌱",
    title: "Career Growth",
    description: "Clear growth tracks. Promotions based on impact, not tenure.",
  },
  {
    emoji: "💙",
    title: "Supportive Culture",
    description: "Small team, open culture. Everyone's voice matters from day one.",
  },
];

export default function Benefits() {
  return (
    <section className="bg-[#F8FEFF] py-24 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-[#52B5BD] text-sm font-semibold tracking-widest uppercase">
            Perks & Benefits
          </span>
          <h2 className="text-[#2F4A7D] font-bold mt-3 mb-4 text-3xl md:text-4xl">
            Employee Benefits
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            We take care of our people so they can take care of what matters most.
          </p>
        </div>

        {/* Benefits grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {benefits.map((item) => (
            <div
              key={item.title}
              className="bg-white rounded-2xl p-6 border border-gray-100 hover:border-[#52B5BD]/40 hover:shadow-md transition-all duration-300"
            >
              <div className="text-3xl mb-4">{item.emoji}</div>
              <h3 className="text-[#2F4A7D] font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>

        {/* Bottom accent bar */}
        <div className="mt-14 flex items-center justify-center gap-3">
          <div className="h-px flex-1 bg-gray-200 max-w-xs" />
          <span className="text-[#52B5BD] text-sm font-medium px-4">
            + more perks added as we grow
          </span>
          <div className="h-px flex-1 bg-gray-200 max-w-xs" />
        </div>
      </div>
    </section>
  );
}