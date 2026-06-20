import { useNavigate } from "react-router-dom";

export default function CareerCTA() {
  const navigate = useNavigate();

  return (
    <section className="bg-[#2F4A7D] py-24 px-6 relative overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute top-0 left-1/4 w-72 h-72 rounded-full bg-[#52B5BD] opacity-10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-56 h-56 rounded-full bg-[#2DD4BF] opacity-10 blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-2xl mx-auto text-center">
        <span className="text-[#52B5BD] text-sm font-semibold tracking-widest uppercase mb-4 block">
          Join the team
        </span>

        <h2
          className="text-white font-bold leading-tight mb-5"
          style={{ fontSize: "clamp(1.9rem, 4vw, 3rem)" }}
        >
          Ready to make an impact?
        </h2>

        <p className="text-white/65 text-lg mb-10 max-w-lg mx-auto leading-relaxed">
          Join WHY and help us build the services that give families
          certainty — and elders the dignity they deserve.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => navigate("/careers/jobs")}
            className="bg-[#52B5BD] hover:bg-[#2DD4BF] text-white font-semibold px-8 py-3.5 rounded-full transition-all duration-300 shadow-lg hover:shadow-[#52B5BD]/40 hover:-translate-y-0.5"
          >
            Browse Jobs
          </button>
          <a
            href="mailto:techadmin@thewhyservices.com?subject=Careers%20Enquiry"
            className="border border-white/30 hover:border-white/70 text-white/80 hover:text-white font-semibold px-8 py-3.5 rounded-full transition-all duration-300 inline-block"
          >
            Contact Us
          </a>
        </div>

        {/* Micro trust line */}
        <p className="text-white/35 text-xs mt-10">
          We're an equal opportunity team. Everyone is welcome.
        </p>
      </div>
    </section>
  );
}