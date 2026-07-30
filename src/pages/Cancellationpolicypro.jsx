import { Link } from "react-router-dom";
import Footer from "../components/Footer"

export default function CancellationPolicyPro() {
  return (
    <div className="bg-gradient-to-b from-gray-50 to-white min-h-screen text-gray-700">
      

      {/* Hero */}
      <section className="py-16 text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-[#2F4A7D] mb-4">
          Cancellation Policy – PRO
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
              1. PRO Cancels the Booking More Than Twenty-Four (24) Hours Before the Service Starts
            </h3>

            <p>
              If a PRO cancels an accepted booking more than twenty-four
              (24) hours before the scheduled service start time, no
              penalty will be imposed. However, the PRO must notify WHY
              Operations immediately to enable the timely assignment of a
              replacement PRO and minimize any inconvenience to the
              customer.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-[#2F4A7D] mb-3">
              2. PRO Cancels the Booking – Four (4) Hours Before the Service Starts
            </h3>

            <p>
              If a PRO cancels an accepted booking four (4) hours before
              the scheduled service start, a penalty of{" "}
              <span className="font-medium text-[#41D0C3]">₹200</span>{" "}
              will be imposed. The PRO must immediately inform WHY
              Operations to enable the assignment of a replacement PRO.
              Repeated last-minute cancellations may result in
              disciplinary action, including reduced booking priority or
              temporary suspension.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-[#2F4A7D] mb-3">
              3. PRO Cancels the Booking Within Four (4) Hours Before the Service Starts
            </h3>

            <p>
              If a PRO cancels an accepted booking within four (4) hours
              before the scheduled service start, a penalty of{" "}
              <span className="font-medium text-[#41D0C3]">₹500</span>{" "}
              will be imposed. The PRO must immediately notify WHY
              Operations to facilitate the assignment of a replacement
              PRO. Repeated last-minute cancellations may affect the
              PRO's performance rating and may result in disciplinary
              action, including temporary suspension or reduced booking
              priority.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-[#2F4A7D] mb-3">
              4. PRO Cancels the Booking After Starting the Journey to the Customer (En Route)
            </h3>

            <p>
              If a PRO cancels an accepted booking after starting the
              journey to the customer's pickup location (en route), a
              penalty of{" "}
              <span className="font-medium text-[#41D0C3]">₹1,000</span>{" "}
              will be imposed. The PRO must immediately notify WHY
              Operations to enable alternative arrangements for the
              customer. Such cancellations are considered serious and may
              affect the PRO's performance rating, future booking
              opportunities, and may result in disciplinary action.
            </p>
          </div>

          <div>
            <p className="font-medium text-[#2F4A7D]">
              Once the trip has commenced, any cancellation request must
              be made through WHY Customer Support and cannot be
              initiated through the WHY App.
            </p>
          </div>

        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}