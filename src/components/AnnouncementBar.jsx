export default function AnnouncementBar() {
  return (
    <div className="w-full overflow-hidden bg-gradient-to-r from-[#0D9488] via-[#0F766E] to-[#0D9488] text-white border-y border-[#0B7E73] py-2.5 shadow-sm">
      <div className="relative flex whitespace-nowrap">
        <div className="animate-marquee flex items-center">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="flex items-center">
              <span className="mx-6 text-sm md:text-base font-semibold tracking-wide flex items-center gap-2.5">
                <span className="bg-[#F2C89F] text-[#1B2A4A] text-xs font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow-sm">
                  Special Offer
                </span>
                <span>
                  <strong>PRE Booking Opens from 19th August</strong> — PRE Book and get{" "}
                  <span className="text-[#F2C89F] font-bold underline decoration-wavy underline-offset-2">
                    25% OFF!
                  </span>
                </span>
              </span>

              <span className="text-white/40 mx-3 text-sm">✦</span>

              <span className="mx-6 text-sm md:text-base font-medium tracking-wide flex items-center gap-2">
                <span>🚀 Launching in Namma Bengaluru on August 30th</span>
              </span>

              <span className="text-white/40 mx-3 text-sm">✦</span>
            </div>
          ))}
        </div>

        <div className="animate-marquee flex items-center" aria-hidden="true">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="flex items-center">
              <span className="mx-6 text-sm md:text-base font-semibold tracking-wide flex items-center gap-2.5">
                <span className="bg-[#F2C89F] text-[#1B2A4A] text-xs font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow-sm">
                  Special Offer
                </span>
                <span>
                  <strong>PRE Booking Opens from 19th August</strong> — PRE Book and get{" "}
                  <span className="text-[#F2C89F] font-bold underline decoration-wavy underline-offset-2">
                    25% OFF!
                  </span>
                </span>
              </span>

              <span className="text-white/40 mx-3 text-sm">✦</span>

              <span className="mx-6 text-sm md:text-base font-medium tracking-wide flex items-center gap-2">
                <span>🚀 Launching in Namma Bengaluru on August 30th</span>
              </span>

              <span className="text-white/40 mx-3 text-sm">✦</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}