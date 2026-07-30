import { Link } from "react-router-dom";
import Footer from "../components/Footer"

export default function TermsPro() {
  return (
    <div className="bg-gradient-to-b from-gray-50 to-white min-h-screen text-gray-700">
      {/* Hero */}
      <section className="py-16 text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-[#2F4A7D] mb-4">
          WHY Pro App – Terms & Conditions
        </h2>

        <p className="text-gray-500 text-lg">
          Last Updated: <span className="font-semibold">February 2026</span>
        </p>
      </section>

      {/* Content */}
      <section className="max-w-4xl mx-auto px-6 pb-20">
        <div className="bg-white shadow-xl rounded-3xl p-8 md:p-12 space-y-10">

          <div>
            <h3 className="text-xl font-semibold text-[#2F4A7D] mb-3">
              1. About WHY Pro App
            </h3>
            <p>
              The WHY Pro App is a digital platform that enables service
              providers to receive service requests, manage tasks, and interact
              within the WHY ecosystem.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-[#2F4A7D] mb-3">
              2. Pro Eligibility
            </h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                You must be legally eligible to provide services as per
                applicable laws.
              </li>
              <li>
                Information submitted during onboarding must be accurate.
              </li>
              <li>
                WHY may approve, reject, or suspend Pro access at its discretion.
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-[#2F4A7D] mb-3">
              3. Independent Service Provider Relationship
            </h3>

            <ul className="list-disc pl-6 space-y-2">
              <li>
                Pros access the Pro App to view and respond to service requests.
              </li>
              <li>
                The platform facilitates service discovery and coordination.
              </li>
              <li>
                The scope of participation may evolve over time.
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-[#2F4A7D] mb-3">
              4. Pro Responsibilities
            </h3>

            <ul className="list-disc pl-6 space-y-2">
              <li>Deliver services professionally and respectfully.</li>
              <li>Follow platform guidelines and safety protocols.</li>
              <li>Maintain accurate availability and service status.</li>
              <li>Avoid harassment, misconduct, or illegal activity.</li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-[#2F4A7D] mb-3">
              5. Background Verification & Compliance
            </h3>

            <ul className="list-disc pl-6 space-y-2">
              <li>WHY may conduct basic verification checks.</li>
              <li>Verification does not guarantee continued access.</li>
              <li>
                Required documents must remain valid when applicable.
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-[#2F4A7D] mb-3">
              6. Payments & Earnings
            </h3>

            <ul className="list-disc pl-6 space-y-2">
              <li>Earnings-related information may be displayed in the app.</li>
              <li>
                Payment features may be enabled as the platform evolves.
              </li>
              <li>
                Fee or payout details will be communicated through the platform.
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-[#2F4A7D] mb-3">
              7. Cancellations & Penalties
            </h3>

            <p>
              Repeated cancellations, no-shows, or poor ratings may result in
              penalties or access restrictions.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-[#2F4A7D] mb-3">
              8. Code of Conduct
            </h3>

            <ul className="list-disc pl-6 space-y-2">
              <li>Misrepresent identity or qualifications</li>
              <li>Engage in abusive or unsafe behavior</li>
              <li>Bypass the platform for personal benefit</li>
              <li>Share user data outside the platform</li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-[#2F4A7D] mb-3">
              9. Limitation of Liability
            </h3>

            <p>
              Use of the Pro App is at the Pro's own discretion and risk.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-[#2F4A7D] mb-3">
              10. Suspension & Termination
            </h3>

            <ul className="list-disc pl-6 space-y-2">
              <li>Violation of Terms</li>
              <li>Safety or operational concerns</li>
              <li>Critical situations without prior notice</li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-[#2F4A7D] mb-3">
              11. Intellectual Property
            </h3>

            <p>
              All Pro App content, software, and branding belong to WHY and may
              not be misused.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-[#2F4A7D] mb-3">
              12. Changes to Terms
            </h3>

            <p>
              WHY may update these Terms from time to time. Continued usage
              implies acceptance.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-[#2F4A7D] mb-3">
              13. Governing Law
            </h3>

            <p>
              These Terms are governed by the laws of India.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-[#2F4A7D] mb-3">
              14. Contact
            </h3>

            <p>
              Email:
              <span className="font-medium text-[#2F4A7D] ml-1">
                support@whyservices.com
              </span>
            </p>

            <p>Location: India</p>
          </div>

        </div>
      </section>

      {/* Footer */}
      <Footer/>
    </div>
  );
}