import { useSectionFade } from "../hooks/useSectionFade";

export default function CareWithoutBorders() {
    const sectionRef = useSectionFade();

    const features = [
        {
            color: "bg-teal-100 text-teal-700",
            title: "Book in minutes",
            desc: "Instant access to vetted caregivers, any time",
        },
        {
            color: "bg-blue-100 text-blue-700",
            title: "Live GPS tracking",
            desc: "Follow every step during hospital visits",
        },
        {
            color: "bg-orange-100 text-orange-700",
            title: "Instant notifications",
            desc: "Updates sent straight to your phone",
        },
        {
            color: "bg-purple-100 text-purple-700",
            title: "Trusted professionals",
            desc: "Background-checked for every journey",
        },
    ];

    const stats = [
        { value: "500+", label: "Caregivers" },
        { value: "4.9★", label: "Avg rating" },
        { value: "<15 min", label: "Booking time" },
    ];

    const toPercent = (lon, lat) => ({
        left: `${((lon + 180) / 360) * 100}%`,
        top: `${((90 - lat) / 180) * 100}%`,
    });

    const youPos = toPercent(-10.5, 35.5);   // London
    const indiaPos = toPercent(65.9, -1.5); // India center

    return (
        <section
            ref={sectionRef}
            className="bg-gradient-to-b from-white to-gray-50 overflow-hidden"
        >
            <div className="flex flex-col lg:grid lg:grid-cols-2 min-h-[600px]">

                {/* MAP PANEL */}
                <div className="relative flex items-center justify-center
                                h-[280px] sm:h-[380px] lg:min-h-[600px]
                                bg-gradient-to-br from-white to-gray-50 overflow-hidden">

                    {/* Responsive map wrapper — fills the panel on mobile, fixed size on desktop */}
                    <div className="relative w-full h-full lg:w-[950px] lg:h-[650px] lg:flex-shrink-0">

                        {/* World Map */}
                        <img
                            src="/Assests/WorldMap.png"
                            alt="World map showing caregiver connection between London and India"
                            draggable={false}
                            className="w-full h-full object-cover lg:object-contain select-none pointer-events-none"
                        />

                        {/* Live Badge */}
                        <div className="absolute top-3 left-3 sm:top-5 sm:left-5 lg:top-8 lg:left-8
                                        flex items-center gap-2 bg-white rounded-full
                                        px-3 py-1.5 sm:px-5 sm:py-2
                                        shadow-lg text-xs sm:text-sm font-semibold text-gray-700 z-30">
                            <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-green-500 animate-pulse" />
                            Live Tracking
                        </div>

                        {/* YOU Pin — hidden on xs, visible from sm up */}
                        <div
                            className="absolute z-20 hidden sm:flex flex-col items-center"
                            style={{
                                left: youPos.left,
                                top: youPos.top,
                                transform: "translate(-50%, -100%)",
                            }}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="#2563EB"
                                className="w-7 h-7 sm:w-9 sm:h-9 lg:w-10 lg:h-10 drop-shadow-2xl"
                            >
                                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5A2.5 2.5 0 1112 6a2.5 2.5 0 010 5.5z" />
                            </svg>
                            <span className="mt-1 bg-white px-2 py-0.5 rounded-full shadow-lg text-[9px] sm:text-xs font-semibold text-blue-700 whitespace-nowrap">
                                You (London)
                            </span>
                        </div>

                        {/* Parents Pin — hidden on xs, visible from sm up */}
                        <div
                            className="absolute z-20 hidden sm:flex flex-col items-center"
                            style={{
                                left: indiaPos.left,
                                top: indiaPos.top,
                                transform: "translate(-50%, -100%)",
                            }}
                        >
                            <div className="relative">
                                <div className="absolute inset-0 rounded-full bg-teal-400 animate-ping opacity-25 scale-[2.3]" />
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="#14B8A6"
                                    className="w-8 h-8 sm:w-10 sm:h-10 lg:w-11 lg:h-11 drop-shadow-2xl relative"
                                >
                                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5A2.5 2.5 0 1112 6a2.5 2.5 0 010 5.5z" />
                                </svg>
                            </div>
                            <span className="mt-1 bg-teal-600 text-white px-2 py-0.5 rounded-full shadow-lg text-[9px] sm:text-xs font-semibold whitespace-nowrap">
                                Parents — India
                            </span>
                            <span className="mt-0.5 bg-white border border-teal-100 text-teal-700 px-2 py-0.5 rounded-full shadow text-[8px] sm:text-[10px] font-semibold whitespace-nowrap">
                                Caregiver Assigned ✓
                            </span>
                        </div>

                        {/* Stats bar — always visible */}
                        <div className="absolute left-3 right-3 bottom-3 sm:left-5 sm:right-5 sm:bottom-5 lg:left-8 lg:right-8 lg:bottom-8">
                            <div className="bg-white/90 backdrop-blur-md rounded-xl sm:rounded-2xl border border-gray-100 shadow-xl grid grid-cols-3 divide-x divide-gray-100">
                                {stats.map((s) => (
                                    <div key={s.label} className="py-3 sm:py-4 lg:py-5 text-center">
                                        <p className="text-base sm:text-xl lg:text-2xl font-bold text-gray-900">
                                            {s.value}
                                        </p>
                                        <p className="text-[10px] sm:text-xs text-gray-400 mt-0.5">
                                            {s.label}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* RIGHT — Content */}
                <div className="fade-inner flex flex-col justify-center
                                py-10 px-5
                                sm:py-12 sm:px-8
                                lg:py-16 lg:px-14">

                    <span className="inline-flex items-center gap-2 px-3 py-1 sm:px-4 sm:py-1.5
                                     rounded-full bg-teal-50 text-teal-700
                                     text-xs sm:text-sm font-semibold mb-4 sm:mb-6
                                     border border-teal-100 w-fit">
                        🌍 Distance doesn't matter
                    </span>

                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight mb-4 sm:mb-5 text-gray-900">
                        Care for your parents in India,
                        <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4DBAB8] to-[#0077CC]">
                            from anywhere in the world.
                        </span>
                    </h2>

                    <p className="text-sm sm:text-base text-gray-500 leading-relaxed mb-6 sm:mb-8">
                        <span className="bg-yellow-200/70 text-gray-700 font-semibold px-1 rounded-sm box-decoration-clone">
                            Distance may separate families, but it should never separate care.
                        </span>{" "}
                        Whether you're working abroad or living in another city, we let you arrange
                        trusted caregivers for your parents across India. From hospital visits to
                        travel assistance and real-time tracking, we make sure your loved ones
                        receive the care they deserve while you stay informed every step of the way.
                    </p>

                    <div className="space-y-4 sm:space-y-5 mb-8 sm:mb-10">
                        {features.map((f) => (
                            <div key={f.title} className="flex items-start gap-3 sm:gap-4">
                                <div className={`w-9 h-9 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center flex-shrink-0 ${f.color}`}>
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                        <polyline points="20 6 9 17 4 12" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="font-semibold text-gray-800 text-sm">{f.title}</p>
                                    <p className="text-gray-400 text-sm mt-0.5">{f.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3">
                        <button className="inline-flex items-center justify-center gap-2
                                           px-6 py-3.5 sm:px-8 sm:py-4
                                           rounded-full bg-gradient-to-r from-[#4DBAB8] to-[#0077CC]
                                           text-white font-semibold shadow-lg
                                           hover:shadow-xl hover:scale-[1.03] active:scale-[0.98]
                                           transition-all duration-200 text-sm sm:text-base">
                            Book a caregiver in India
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="5" y1="12" x2="19" y2="12" />
                                <polyline points="12 5 19 12 12 19" />
                            </svg>
                        </button>
                        <button className="inline-flex items-center justify-center gap-2
                                           px-6 py-3.5 sm:px-8 sm:py-4
                                           rounded-full border border-gray-200 text-gray-600
                                           font-semibold hover:border-teal-300 hover:text-teal-700
                                           transition-all duration-200 text-sm sm:text-base">
                            How it works
                        </button>
                    </div>

                </div>
            </div>
        </section>
    );
}