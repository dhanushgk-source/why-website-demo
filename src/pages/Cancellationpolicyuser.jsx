import { Link } from "react-router-dom";

export default function CancellationPolicyUser() {
  return (
    <div className="bg-gradient-to-b from-gray-50 to-white min-h-screen text-gray-700">
      

      {/* Hero */}
      <section className="py-16 text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-[#2F4A7D] mb-4">
          Cancellation Policy - USER
        </h2>

        <p className="text-gray-500 text-lg">
          Last Updated: <span className="font-semibold">July 2026</span>
        </p>
      </section>

      {/* Content */}
      <section className="max-w-4xl mx-auto px-6 pb-20">
        <div className="bg-white shadow-xl rounded-3xl p-8 md:p-12 space-y-10">

          <div>
            <h3 className="text-xl font-semibold text-[#2F4A7D] mb-3">
              1. Customer Cancels Before a PRO Accepts the Request
            </h3>

            <p>
              No cancellation charges will be applicable if the booking is
              cancelled before four (4) hours of the scheduled service start.
              Any payment made will be fully refunded in accordance with
              WHY's refund policy.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-[#2F4A7D] mb-3">
              2. Customer Cancels Within Four (4) Hours Before the Service Starts
            </h3>

            <p>
              If a customer cancels the booking within four (4) hours before
              the scheduled service start, a{" "}
              <span className="font-medium text-[#41D0C3]">
                30% cancellation fee
              </span>{" "}
              will apply. In verified emergency or exceptional
              circumstances, WHY may waive up to 20% of the cancellation
              fee at its discretion. If a waiver is approved, the customer
              will be charged the remaining 10% of the booking amount as
              the cancellation fee.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-[#2F4A7D] mb-3">
              3. Customer Cancels Before the PRO Starts Travelling (Before En Route)
            </h3>

            <p>
              If a customer cancels the booking before the assigned PRO
              starts travelling to the service location, a{" "}
              <span className="font-medium text-[#41D0C3]">
                30% cancellation fee
              </span>{" "}
              will apply. WHY may waive up to 20% of the cancellation fee
              in verified emergency or exceptional circumstances, at its
              discretion. If a waiver is approved, the customer will be
              charged the remaining 10% of the booking amount as the
              cancellation fee.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-[#2F4A7D] mb-3">
              4. Customer Cancels After the PRO Reaches the Pickup Location
            </h3>

            <p>
              If a customer cancels the booking after the assigned PRO has
              reached the customer's pickup location, a{" "}
              <span className="font-medium text-[#41D0C3]">
                30% cancellation fee
              </span>{" "}
              will apply. WHY may, at its discretion, waive up to 20% of
              the cancellation fee in cases of verified emergencies or
              exceptional circumstances. If a waiver is approved, the
              customer will be liable to pay the remaining applicable
              cancellation charge.
            </p>
          </div>

          <div>
            <p className="font-medium text-[#2F4A7D]">
              Once the trip has started, any cancellation request must be
              made through WHY Customer Support and cannot be initiated
              through the WHY App.
            </p>
          </div>

        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#2F4A7D] text-white py-6 text-center">
        <p className="text-sm opacity-80">
          © 2026 WHY. All Rights Reserved.
        </p>
      </footer>
    </div>
  );
}