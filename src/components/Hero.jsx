import React from "react";

// Tiny inline icons (no external icon package to download/parse).
// Each is a plain 24x24 stroke SVG, styled via currentColor so
// Tailwind text-color classes control them directly.
const Icon = {
  stethoscope: (p) => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...p}
    >
      <path d="M6 3v5a3 3 0 0 0 6 0V3" />
      <path d="M12 3v5a3 3 0 0 1-6 0" />
      <path d="M9 11v3a5 5 0 0 0 10 0v-1" />
      <circle cx="19" cy="12" r="2" />
    </svg>
  ),
  briefcase: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <rect x="3" y="7" width="18" height="12" rx="2" />
      <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    </svg>
  ),
  users: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <circle cx="9" cy="8" r="3" />
      <path d="M2.5 19a6.5 6.5 0 0 1 13 0" />
      <circle cx="17" cy="9" r="2.5" />
      <path d="M15.5 12.5a5 5 0 0 1 6 5" />
    </svg>
  ),
  home: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M3 11.5 12 4l9 7.5" />
      <path d="M5.5 10v9a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-9" />
      <path d="M10 20v-5h4v5" />
    </svg>
  ),
  badge: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="m8 12 2.5 2.5L16 9" />
      <path d="M12 2 4 5v6c0 5 3.5 8.5 8 11 4.5-2.5 8-6 8-11V5Z" />
    </svg>
  ),
  clock: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 3" />
    </svg>
  ),
  shield: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M12 2 4 5v6c0 5 3.5 8.5 8 11 4.5-2.5 8-6 8-11V5Z" />
    </svg>
  ),
  arrowRight: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  ),
  play: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <circle cx="12" cy="12" r="9" />
      <path d="M10 8.5 15.5 12 10 15.5Z" />
    </svg>
  ),
};

const features = [
  {
    icon: Icon.stethoscope,
    title: "Hospital Assistance",
    description: "Professional companions to assist during appointments, treatments and recovery."
  },
  {
    icon: Icon.briefcase,
    title: "Travel Companion",
    description: "Reliable assistance for local and long-distance travel with complete safety."
  },
  {
    icon: Icon.users,
    title: "Elderly Care",
    description: "Friendly, compassionate support for seniors at home and during daily activities."
  },
  {
    icon: Icon.home,
    title: "Peace of Mind",
    description: "Trusted care that keeps your loved ones safe whenever you can't be there."
  }
];

export default function CareHero() {
  return (
    <section
      className="relative min-h-[100svh] overflow-hidden flex items-center py-10 sm:py-14 lg:py-8"
      style={{ background: "#FBF3E8" }}
    >
      {/*
        ================= BACKGROUND =================
        Decorative blur/grid layers are the heaviest thing to paint on a
        first-view section, and mobile GPUs pay for every one of them.
        They're hidden below sm and only mounted on larger screens, and
        the blur radii are reduced so paint cost stays low everywhere.
      */}
      <div className="hidden sm:block absolute -top-52 -left-52 h-[550px] w-[550px] rounded-full bg-teal-100/60 blur-[90px] lg:blur-[120px]" />
      <div className="hidden sm:block absolute top-0 right-0 h-[450px] w-[450px] rounded-full bg-orange-100/60 blur-[90px] lg:blur-[120px]" />
      <div className="hidden sm:block absolute -bottom-56 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-cyan-50 blur-[100px] lg:blur-[140px]" />

      <div
        className="hidden sm:block absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "linear-gradient(#0f766e 1px, transparent 1px),linear-gradient(90deg,#0f766e 1px,transparent 1px)",
          backgroundSize: "42px 42px",
        }}
      />

      <div className="hidden sm:block absolute left-12 top-16 h-44 w-44 rounded-full border border-teal-200/30"></div>
      <div className="hidden sm:block absolute right-12 bottom-16 h-56 w-56 rounded-full border border-orange-200/30"></div>

      {/* ================= CONTAINER ================= */}

      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 sm:px-6">
        <div className="grid lg:grid-cols-2 items-center gap-10 sm:gap-12">

          {/* LEFT CONTENT */}
          <div className="max-w-xl mx-auto lg:mx-0 text-center lg:text-left">

            {/* Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-teal-200 bg-white/70 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-teal-700 shadow-sm">
              <span className="h-2 w-2 rounded-full bg-teal-500 animate-pulse" />
              Family-First Companion Care
            </div>

            <div className="mt-8 sm:mt-10 flex items-center justify-center lg:justify-start gap-4">
              <div className="h-[2px] w-12 rounded-full bg-orange-500"></div>
              <span className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">
                Trusted Companion Care
              </span>
            </div>

            {/* Heading */}
            <h1 className="mt-4 text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold leading-tight">
              Care for
              <span className="relative inline-block">
                <span
                  className="
                    bg-gradient-to-r
                    from-teal-600
                    via-cyan-500
                    to-teal-700
                    bg-clip-text
                    text-transparent"
                >
                  Your Family
                </span>
                <svg
                  className="absolute -bottom-2 sm:-bottom-3 left-0 w-full"
                  viewBox="0 0 180 12"
                  fill="none"
                >
                  <path
                    d="M3 9C40 1 140 1 177 9"
                    stroke="#F97316"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
              <span className="block">When You're Away</span>
            </h1>

            {/* Description */}
            <p className="mt-6 sm:mt-8 max-w-lg mx-auto lg:mx-0 text-base sm:text-lg leading-7 sm:leading-8 text-slate-600">
              WHY connects seniors and individuals of all ages with
              trusted companions for hospital visits, travel assistance,
              and elderly care&mdash;giving families complete peace of mind,
              wherever they are.
            </p>

            {/* CTA Buttons */}
            <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row flex-wrap justify-center lg:justify-start gap-4">
              <button className="group inline-flex items-center justify-center gap-3 rounded-full bg-orange-500 px-8 py-4 font-semibold text-white shadow-xl shadow-orange-200 transition-all duration-300 hover:-translate-y-1 hover:bg-orange-600 active:translate-y-0">
                Book a WHY PRO
                <Icon.arrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
              </button>

              <button className="inline-flex items-center justify-center gap-3 rounded-full border border-slate-200 bg-white px-8 py-4 font-semibold text-slate-700 shadow-sm transition-all duration-300 hover:border-teal-500 hover:text-teal-600">
                <Icon.play className="h-5 w-5" />
                How It Works
              </button>
            </div>

            {/* Trust strip — mobile-only compact summary, replaces the
                floating badges that don't have room on small screens */}
            <div className="mt-8 flex sm:hidden items-center justify-center gap-5 text-xs font-semibold text-slate-600">
              <span className="inline-flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                24/7 Available
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Icon.badge className="h-3.5 w-3.5 text-teal-600" />
                Verified Pros
              </span>
            </div>
          </div>

          {/* RIGHT CONTENT */}
          <div className="relative w-full max-w-2xl mx-auto">

            {/* Floating Badges — desktop/tablet only, avoids overlap and
                extra backdrop-blur compositing on small screens */}
            <div className="hidden sm:block absolute -top-6 right-6 lg:right-10 z-30 rounded-full bg-white/90 backdrop-blur-md px-5 py-2 shadow-xl border border-white">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="text-sm font-semibold text-slate-700">24/7 Available</span>
              </div>
            </div>

            <div className="hidden sm:block absolute -bottom-6 left-6 lg:left-8 z-30 rounded-full bg-white/90 backdrop-blur-md px-5 py-2 shadow-xl border border-white">
              <div className="flex items-center gap-2">
                <Icon.badge className="h-4 w-4 text-teal-600" />
                <span className="text-sm font-semibold text-slate-700">Verified Professionals</span>
              </div>
            </div>

            {/* Background Glow */}
            <div className="hidden sm:block absolute inset-0 rounded-[42px] bg-gradient-to-br from-teal-100 via-white to-orange-100 blur-2xl lg:blur-3xl opacity-80"></div>

            {/* Main Glass Container */}
            <div className="relative rounded-[28px] sm:rounded-[38px] border border-white/70 bg-white/80 sm:bg-white/60 sm:backdrop-blur-xl p-4 sm:p-6 shadow-[0_20px_50px_rgba(15,23,42,0.10)] sm:shadow-[0_30px_80px_rgba(15,23,42,0.12)]">

              {/* Decorative Dots */}
              <div className="absolute left-5 top-5 sm:left-6 sm:top-6 flex gap-2">
                <span className="h-2 w-2 rounded-full bg-teal-300"></span>
                <span className="h-2 w-2 rounded-full bg-orange-300"></span>
                <span className="h-2 w-2 rounded-full bg-slate-300"></span>
              </div>

              {/* Cards */}
              <div className="grid grid-cols-2 gap-3 sm:gap-5 mt-7 sm:mt-8">
                {features.map(({ icon: FeatureIcon, title, description }) => (
                  <div
                    key={title}
                    className="group rounded-2xl sm:rounded-3xl bg-white border border-slate-100 p-3.5 sm:p-5 shadow-md sm:shadow-lg transition-all duration-300 sm:hover:-translate-y-2 sm:hover:shadow-2xl"
                  >
                    <div className="flex h-11 w-11 sm:h-16 sm:w-16 items-center justify-center rounded-xl sm:rounded-2xl bg-gradient-to-br from-teal-100 to-cyan-50 text-teal-600 transition-all duration-300 sm:group-hover:scale-110 sm:group-hover:from-teal-500 sm:group-hover:to-teal-600 sm:group-hover:text-white">
                      <FeatureIcon className="h-5 w-5 sm:h-8 sm:w-8" />
                    </div>

                    <h3 className="mt-3 sm:mt-5 text-sm sm:text-xl font-bold text-slate-900">
                      {title}
                    </h3>

                    <p className="mt-1.5 sm:mt-3 text-xs sm:text-sm leading-5 sm:leading-6 text-slate-500">
                      {description}
                    </p>
                  </div>
                ))}
              </div>

              {/* Divider */}
              <div className="my-6 sm:my-8 border-t border-slate-200"></div>

              {/* Statistics */}
              <div className="grid grid-cols-3">
                <div className="text-center">
                  <h3 className="text-xl sm:text-3xl font-bold text-teal-600">50+</h3>
                  <p className="mt-1 text-[11px] sm:text-sm text-slate-500">Families Served</p>
                </div>

                <div className="border-x border-slate-200 text-center">
                  <h3 className="text-xl sm:text-3xl font-bold text-teal-600">100%</h3>
                  <p className="mt-1 text-[11px] sm:text-sm text-slate-500">Verified</p>
                </div>

                <div className="text-center">
                  <h3 className="text-xl sm:text-3xl font-bold text-teal-600">24/7</h3>
                  <p className="mt-1 text-[11px] sm:text-sm text-slate-500">Support</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}