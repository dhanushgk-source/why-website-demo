const reasons = [
  {
    icon: (
      <svg width="28" height="28" fill="none" viewBox="0 0 24 24">
        <path
          d="M12 21C12 21 3 14.5 3 8.5C3 5.42 5.42 3 8.5 3C10.24 3 11.91 3.81 13 5.08C14.09 3.81 15.76 3 17.5 3C20.58 3 23 5.42 23 8.5C23 14.5 12 21 12 21Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    title: "Meaningful Work",
    description:
      "Every task you build directly supports elders living with more independence and families with real peace of mind.",
  },
  {
    icon: (
      <svg width="28" height="28" fill="none" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
        <path
          d="M12 7V12L15 15"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    ),
    title: "Flexible Opportunities",
    description:
      "We trust our people. Work arrangements that fit your life — remote, hybrid, or on-ground roles available.",
  },
  {
    icon: (
      <svg width="28" height="28" fill="none" viewBox="0 0 24 24">
        <path
          d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    title: "Trusted Platform",
    description:
      "WHY is admin-supervised, background-verified, and built with care. You'll be part of a team that holds itself to a higher standard.",
  },
  {
    icon: (
      <svg width="28" height="28" fill="none" viewBox="0 0 24 24">
        <path
          d="M22 12H18L15 21L9 3L6 12H2"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    title: "Career Growth",
    description:
      "We're growing fast. Early joiners get real ownership, skill development, and room to move into leadership as we scale.",
  },
];

export default function WhyJoinUs() {
  return (
    <section id="why-join-us" className="bg-white py-24 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-[#52B5BD] text-sm font-semibold tracking-widest uppercase">
            Why WHY
          </span>
          <h2 className="text-[#2F4A7D] font-bold mt-3 mb-4 text-3xl md:text-4xl">
            Why work with us?
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            We're not just another startup. We're building something that
            improves real lives — and we want people who care about that.
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {reasons.map((item) => (
            <div
              key={item.title}
              className="group border border-gray-100 rounded-2xl p-8 hover:border-[#52B5BD]/50 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-default"
            >
              <div className="w-12 h-12 rounded-xl bg-[#52B5BD]/10 flex items-center justify-center text-[#52B5BD] mb-5 group-hover:bg-[#52B5BD] group-hover:text-white transition-colors duration-300">
                {item.icon}
              </div>
              <h3 className="text-[#2F4A7D] font-semibold text-lg mb-2">
                {item.title}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}