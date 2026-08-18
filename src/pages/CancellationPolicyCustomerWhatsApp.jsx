export default function CancellationPolicyCustomerWhatsApp() {
  return (
    <div className="bg-[#F7F3EA]/50 min-h-screen text-slate-700 font-sans antialiased">
      {/* Hero Header */}
      <section className="py-10 sm:py-14 text-center px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          <span className="inline-block text-[11px] uppercase tracking-widest font-bold text-[#52B5BD] bg-[#52B5BD]/10 px-3 py-1 rounded-full mb-2.5">
            WHY Services India Private Limited
          </span>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#1B2A4A] tracking-tight mb-2">
            Cancellation &amp; Refund Policy
          </h1>
          <p className="text-xs sm:text-sm font-semibold text-[#2F4A7D] mb-1">
            Customer / User Policy (V2)
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
              Customer Cancellation &amp; Reschedule Terms
            </h2>
            <p className="text-slate-700 text-xs sm:text-sm">
              We understand that schedules may change. This policy explains the terms, applicable fees, reschedule limits, and refund timelines when cancelling or rescheduling a booking placed through WHY Companion Services.
            </p>
          </div>

          {/* 1. Cancellation Policy Breakdown */}
          <div className="space-y-4">
            <h3 className="text-base sm:text-lg font-bold text-[#1B2A4A]">
              1. Cancellation Fee Structure
            </h3>

            <div className="space-y-3">
              {/* Tier 1 */}
              <div className="p-4 rounded-2xl border border-slate-100 bg-slate-50/70">
                <div className="flex items-center justify-between mb-1.5">
                  <h4 className="font-bold text-slate-800 text-xs sm:text-sm">
                    Before Four (4) Hours of Scheduled Service Start
                  </h4>
                  <span className="text-[11px] font-bold text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                    Free / 100% Refund
                  </span>
                </div>
                <p className="text-xs text-slate-600">
                  No cancellation charges will be applicable if the booking is cancelled before four (4) hours of the scheduled service start. Any payment made will be fully refunded in accordance with WHY&apos;s refund policy.
                </p>
              </div>

              {/* Tier 2 */}
              <div className="p-4 rounded-2xl border border-amber-100 bg-amber-50/40">
                <div className="flex items-center justify-between mb-1.5">
                  <h4 className="font-bold text-slate-800 text-xs sm:text-sm">
                    Within Four (4) Hours (Before PRO Starts Travelling)
                  </h4>
                  <span className="text-[11px] font-bold text-amber-700 bg-amber-100 px-2.5 py-0.5 rounded-full">
                    ₹300 Fee
                  </span>
                </div>
                <p className="text-xs text-slate-600 mb-1.5">
                  If a customer cancels the booking within four (4) hours of the scheduled service start time and before the PRO starts for the appointment, a <strong>₹300 cancellation fee</strong> will apply.
                </p>
                <p className="text-[11px] text-amber-800 bg-amber-100/60 p-2 rounded-lg">
                  <strong>Emergency Waiver:</strong> In verified emergency or exceptional circumstances, WHY may waive up to ₹200 of the cancellation fee at its discretion. If a waiver is approved, the customer will be charged the remaining booking amount.
                </p>
              </div>

              {/* Tier 3 */}
              <div className="p-4 rounded-2xl border border-orange-100 bg-orange-50/40">
                <div className="flex items-center justify-between mb-1.5">
                  <h4 className="font-bold text-slate-800 text-xs sm:text-sm">
                    After the PRO Starts Travelling (En Route)
                  </h4>
                  <span className="text-[11px] font-bold text-orange-700 bg-orange-100 px-2.5 py-0.5 rounded-full">
                    ₹600 Fee
                  </span>
                </div>
                <p className="text-xs text-slate-600 mb-1.5">
                  If a customer cancels the booking after the assigned PRO starts travelling to the service location, a <strong>₹600 cancellation fee</strong> will apply.
                </p>
                <p className="text-[11px] text-orange-800 bg-orange-100/60 p-2 rounded-lg">
                  <strong>Emergency Waiver:</strong> WHY may waive up to ₹400 of the cancellation fee in verified emergency or exceptional circumstances at its discretion.
                </p>
              </div>

              {/* Tier 4 */}
              <div className="p-4 rounded-2xl border border-red-100 bg-red-50/40">
                <div className="flex items-center justify-between mb-1.5">
                  <h4 className="font-bold text-slate-800 text-xs sm:text-sm">
                    After the PRO Reaches the Pickup Location
                  </h4>
                  <span className="text-[11px] font-bold text-red-700 bg-red-100 px-2.5 py-0.5 rounded-full">
                    30% Cancellation Charge
                  </span>
                </div>
                <p className="text-xs text-slate-600">
                  If a customer cancels the booking after the assigned PRO has reached the pickup location, the entire <strong>30% cancellation charge</strong> shall apply. No waiver or reduction shall be provided, as the PRO has already arrived and service resources have been committed.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-100 border border-slate-200 text-xs font-medium text-slate-700">
                Once the Service has commenced, any cancellation request must be made through WHY Customer Support and cannot be initiated through the WHY App.
              </div>
            </div>
          </div>

          {/* 2. Rescheduling Policy */}
          <div className="space-y-3 pt-2 border-t border-slate-100">
            <h3 className="text-base sm:text-lg font-bold text-[#1B2A4A]">
              2. Rescheduling Policy
            </h3>

            <div className="space-y-2.5">
              <div className="p-4 rounded-2xl border border-slate-100 bg-slate-50/60">
                <h4 className="font-bold text-slate-800 text-xs sm:text-sm mb-1">
                  1. Free Reschedule Entitlement &amp; Limits
                </h4>
                <p className="text-xs text-slate-600">
                  Each customer is eligible for up to <strong>three (3) free reschedules</strong>. Any reschedule request beyond the third free reschedule shall be treated as a cancellation of the existing booking and the creation of a new booking, subject to the applicable cancellation policy and charges.
                </p>
              </div>

              <div className="p-4 rounded-2xl border border-slate-100 bg-slate-50/60">
                <h4 className="font-bold text-slate-800 text-xs sm:text-sm mb-1">
                  2. Quarterly Reset of Free Reschedules
                </h4>
                <p className="text-xs text-slate-600">
                  Each customer shall receive three (3) free reschedules at the beginning of every calendar quarter. The free reschedule entitlement automatically resets to three (3) at the start of each new calendar quarter. Unused free reschedules from previous quarters do not carry forward.
                </p>
              </div>
            </div>
          </div>

          {/* 3. Refund Policy */}
          <div className="space-y-2 pt-2 border-t border-slate-100">
            <h3 className="text-base sm:text-lg font-bold text-[#1B2A4A]">
              3. Refund Processing
            </h3>
            <p className="text-slate-700 text-xs sm:text-sm">
              Approved refunds shall normally be processed within <strong>seven (7) to ten (10) business days</strong> to the original payment method. Refunds apply when WHY cancels the booking, if a duplicate/incorrect billing occurs, or if the booked service cannot be delivered due directly to WHY&apos;s fault.
            </p>
          </div>

          <div className="text-center pt-5 border-t border-slate-100 text-xs text-slate-400 font-medium">
            WHY Companion Services · We Help You · WHY Services India Private Limited
          </div>

        </div>
      </main>
    </div>
  );
}
