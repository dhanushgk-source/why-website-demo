export default function CancellationPolicyProWhatsApp() {
  return (
    <div className="bg-[#F7F3EA]/50 min-h-screen text-slate-700 font-sans antialiased">
      {/* Hero Header */}
      <section className="py-10 sm:py-14 text-center px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          <span className="inline-block text-[11px] uppercase tracking-widest font-bold text-[#52B5BD] bg-[#52B5BD]/10 px-3 py-1 rounded-full mb-2.5">
            WHY Services India Private Limited
          </span>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#1B2A4A] tracking-tight mb-2">
            PRO Cancellation Policy
          </h1>
          <p className="text-xs sm:text-sm font-semibold text-[#2F4A7D] mb-1">
            Service Partner Guidelines (V2)
          </p>
          <p className="text-[11px] sm:text-xs text-slate-500 font-medium">
            GSTIN: 29AAECW3570A1ZF · Registered Office: Seshadripuram, Bengaluru, Karnataka 560020
          </p>
        </div>
      </section>

      {/* Content Container */}
      <main className="max-w-3xl mx-auto px-4 sm:px-6 pb-20">
        <div className="bg-white shadow-lg rounded-3xl p-5 sm:p-8 md:p-12 space-y-8 border border-slate-200/70 leading-relaxed text-sm sm:text-[15px]">

          {/* Overview Note */}
          <div className="p-4 sm:p-5 rounded-2xl bg-[#52B5BD]/10 border border-[#52B5BD]/20">
            <h2 className="text-base sm:text-lg font-bold text-[#1B2A4A] mb-1.5">
              WHY Pro Assignment Cancellation Rules
            </h2>
            <p className="text-slate-700 text-xs sm:text-sm">
              Timely service delivery is critical for our seniors and customers. When a PRO accepts a booking, resources are committed. This policy outlines penalties and operational procedures for cancellations made by WHY Pros.
            </p>
          </div>

          {/* Policy Tiers */}
          <div className="space-y-4">
            <h3 className="text-base sm:text-lg font-bold text-[#1B2A4A]">
              Penalty Breakdown by Cancellation Timing
            </h3>

            <div className="space-y-3">
              {/* Tier 1 */}
              <div className="p-4 rounded-2xl border border-slate-100 bg-slate-50/70">
                <div className="flex items-center justify-between mb-1.5">
                  <h4 className="font-bold text-slate-800 text-xs sm:text-sm">
                    1. Cancels More Than Twenty-Four (24) Hours Before Service Starts
                  </h4>
                  <span className="text-[11px] font-bold text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                    No Penalty
                  </span>
                </div>
                <p className="text-xs text-slate-600">
                  If a PRO cancels an accepted booking more than twenty-four (24) hours before the scheduled service start time, <strong>no penalty will be imposed</strong>. However, the PRO must notify WHY Operations immediately to enable the timely assignment of a replacement PRO and minimize any inconvenience to the customer.
                </p>
              </div>

              {/* Tier 2 */}
              <div className="p-4 rounded-2xl border border-amber-100 bg-amber-50/40">
                <div className="flex items-center justify-between mb-1.5">
                  <h4 className="font-bold text-slate-800 text-xs sm:text-sm">
                    2. Cancels Four (4) Hours Before Service Starts
                  </h4>
                  <span className="text-[11px] font-bold text-amber-700 bg-amber-100 px-2.5 py-0.5 rounded-full">
                    ₹200 Penalty
                  </span>
                </div>
                <p className="text-xs text-slate-600">
                  If a PRO cancels an accepted booking four (4) hours before the scheduled service start, a penalty of <strong>₹200</strong> will be imposed. The PRO must immediately inform WHY Operations to enable the assignment of a replacement PRO. Repeated last-minute cancellations may result in disciplinary action, including reduced booking priority or temporary suspension.
                </p>
              </div>

              {/* Tier 3 */}
              <div className="p-4 rounded-2xl border border-orange-100 bg-orange-50/40">
                <div className="flex items-center justify-between mb-1.5">
                  <h4 className="font-bold text-slate-800 text-xs sm:text-sm">
                    3. Cancels Within Four (4) Hours Before Service Starts
                  </h4>
                  <span className="text-[11px] font-bold text-orange-700 bg-orange-100 px-2.5 py-0.5 rounded-full">
                    ₹500 Penalty
                  </span>
                </div>
                <p className="text-xs text-slate-600">
                  If a PRO cancels an accepted booking within four (4) hours before the scheduled service start, a penalty of <strong>₹500</strong> will be imposed. The PRO must immediately notify WHY Operations to facilitate the assignment of a replacement PRO. Repeated last-minute cancellations may affect the PRO&apos;s performance rating and may result in disciplinary action, including temporary suspension or reduced booking priority.
                </p>
              </div>

              {/* Tier 4 */}
              <div className="p-4 rounded-2xl border border-red-100 bg-red-50/40">
                <div className="flex items-center justify-between mb-1.5">
                  <h4 className="font-bold text-slate-800 text-xs sm:text-sm">
                    4. Cancels After Starting the Journey (En Route)
                  </h4>
                  <span className="text-[11px] font-bold text-red-700 bg-red-100 px-2.5 py-0.5 rounded-full">
                    ₹1,000 Penalty
                  </span>
                </div>
                <p className="text-xs text-slate-600">
                  If a PRO cancels an accepted booking after starting the journey to the customer&apos;s pickup location (En route), a penalty of <strong>₹1,000</strong> will be imposed. The PRO must immediately notify WHY Operations to enable alternative arrangements for the customer. Such cancellations are considered serious and may affect the PRO&apos;s performance rating, future booking opportunities, and may result in disciplinary action.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-100 border border-slate-200 text-xs font-medium text-slate-700">
                Once the Service has commenced, any cancellation request must be made through WHY Customer Support and cannot be initiated through the WHY App.
              </div>
            </div>
          </div>

          <div className="text-center pt-5 border-t border-slate-100 text-xs text-slate-400 font-medium">
            WHY Companion Services · We Help You · WHY Services India Private Limited
          </div>

        </div>
      </main>
    </div>
  );
}
