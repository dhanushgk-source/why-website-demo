import { useNavigate } from "react-router-dom";

export default function CareerHero() {
  const navigate = useNavigate();

  return (
    <section className="relative overflow-hidden bg-[#2F4A7D] min-h-[92vh] flex items-center justify-center">
      {/* Subtle radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 40%, rgba(82,181,189,0.18) 0%, transparent 70%)",
        }}
      />

      {/* Floating decorative circles */}
      <div className="absolute top-16 left-10 w-40 h-40 rounded-full bg-[#52B5BD] opacity-10 blur-2xl" />
      <div className="absolute bottom-20 right-12 w-56 h-56 rounded-full bg-[#2DD4BF] opacity-8 blur-3xl" />

      <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
        {/* Eyebrow */}
        <span className="inline-block text-[#52B5BD] text-sm font-semibold tracking-widest uppercase mb-6 border border-[#52B5BD]/40 px-4 py-1.5 rounded-full">
          WHY Careers
        </span>

        {/* Headline */}
        <h1
          className="text-white font-bold leading-tight mb-6"
          style={{ fontSize: "clamp(2.2rem, 5vw, 3.5rem)" }}
        >
          Build something that{" "}
          <span className="text-[#52B5BD]">actually matters.</span>
        </h1>

        {/* Sub-copy */}
        <p className="text-white/70 text-lg max-w-xl mx-auto mb-10 leading-relaxed">
          Join the team behind India's most trusted companionship platform —
          and help real families feel safe, supported, and never alone.
        </p>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => navigate("/careers/jobs")}
            className="bg-[#52B5BD] hover:bg-[#2DD4BF] text-white font-semibold px-8 py-3.5 rounded-full transition-all duration-300 shadow-lg hover:shadow-[#52B5BD]/40 hover:-translate-y-0.5"
          >
            Browse Open Positions
          </button>
          <button
            onClick={() =>
              document
                .getElementById("why-join-us")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="border border-white/30 hover:border-white/70 text-white/80 hover:text-white font-semibold px-8 py-3.5 rounded-full transition-all duration-300"
          >
            Learn More
          </button>
        </div>

        {/* Trust badges */}
        <div className="mt-14 flex flex-wrap justify-center gap-6 text-white/50 text-sm">
          {["Mission-driven work", "Admin-verified environment", "Chennai & Remote"].map(
            (badge) => (
              <span key={badge} className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#52B5BD] inline-block" />
                {badge}
              </span>
            )
          )}
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M0 80L48 69.3C96 59 192 37 288 32C384 27 480 37 576 48C672 59 768 69 864 64C960 59 1056 37 1152 32C1248 27 1344 37 1392 42.7L1440 48V80H1392C1344 80 1248 80 1152 80C1056 80 960 80 864 80C768 80 672 80 576 80C480 80 384 80 288 80C192 80 96 80 48 80H0Z"
            fill="#ffffff"
          />
        </svg>
      </div>
    </section>
  );
}