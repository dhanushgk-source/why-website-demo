export default function AnnouncementBar() {
  const message =
    "Launching in Namma Bengaluru on August 30th.";

  return (
    <div className="w-full overflow-hidden bg-[#0D9488] text-white border-y border-[#0B7E73]">
      <div className="relative flex whitespace-nowrap">
        <div className="animate-marquee flex py-2">
          {Array.from({ length: 5 }).map((_, index) => (
            <span
              key={index}
              className="mx-8 text-sm md:text-base font-semibold tracking-wide"
            >
              {message}
            </span>
          ))}
        </div>

        <div
          className="animate-marquee flex py-2"
          aria-hidden="true"
        >
          {Array.from({ length: 5 }).map((_, index) => (
            <span
              key={index}
              className="mx-8 text-sm md:text-base font-semibold tracking-wide"
            >
              {message}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}