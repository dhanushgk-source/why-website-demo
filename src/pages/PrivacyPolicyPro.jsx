import { Link } from "react-router-dom";
import Footer from "../components/Footer"

export default function PrivacyPolicyPro() {
  return (
    <div className="bg-gradient-to-b from-gray-50 to-white min-h-screen text-gray-700">
      {/* Hero */}
      <section className="py-16 text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-[#2F4A7D] mb-4">
          Privacy Policy – PRO
        </h2>

        <p className="text-gray-500 text-lg">
          Last Updated: <span className="font-semibold">February 2026</span>
        </p>
      </section>

      {/* Content */}
      <section className="max-w-4xl mx-auto px-6 pb-20">
        <div className="bg-white shadow-xl rounded-3xl p-8 md:p-12 space-y-10">

          <div>
            <p>
              This Privacy Policy applies to service professionals
              ("Pro", "Service Partner", "Vendor") who register or use
              WHY PRO platform.
            </p>

            <p className="mt-4 font-medium text-[#2F4A7D]">
              By registering as a Pro, you agree to this Privacy Policy.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-[#2F4A7D] mb-3">
              1. Information We Collect
            </h3>

            <h4 className="font-medium text-[#41D0C3] mb-2">
              A. Registration Information
            </h4>

            <ul className="list-disc pl-6 space-y-2">
              <li>Full Name</li>
              <li>Mobile Number</li>
              <li>Email Address</li>
              <li>Address / City</li>
              <li>Profile Photo</li>
              <li>Service Category & Experience Details</li>
            </ul>

            <h4 className="font-medium text-[#41D0C3] mt-6 mb-2">
              B. Verification Information
            </h4>

            <ul className="list-disc pl-6 space-y-2">
              <li>Government ID (if required)</li>
              <li>Business registration details (if applicable)</li>
              <li>Bank account details for payouts</li>
            </ul>

            <h4 className="font-medium text-[#41D0C3] mt-6 mb-2">
              C. Usage Information
            </h4>

            <ul className="list-disc pl-6 space-y-2">
              <li>Login activity</li>
              <li>Service performance data</li>
              <li>Customer ratings & reviews</li>
              <li>Device and IP information</li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-[#2F4A7D] mb-3">
              2. How We Use Pro Information
            </h3>

            <ul className="list-disc pl-6 space-y-2">
              <li>Create and manage Pro accounts</li>
              <li>Verify identity and eligibility</li>
              <li>Facilitate service bookings</li>
              <li>Process payments and earnings</li>
              <li>Improve platform performance</li>
              <li>Ensure safety, fraud prevention, and compliance</li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-[#2F4A7D] mb-3">
              3. Sharing of Information
            </h3>

            <ul className="list-disc pl-6 space-y-2">
              <li>Customer details necessary for completing services</li>
              <li>Payment partners for payout processing</li>
              <li>Verification agencies (if required)</li>
              <li>Legal authorities when required by law</li>
            </ul>

            <p className="mt-4 font-medium text-[#41D0C3]">
              We do not sell Pro personal data.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-[#2F4A7D] mb-3">
              4. Earnings & Financial Data
            </h3>

            <p>
              Bank account details are used strictly for payout processing.
              WHY does not store full financial credentials beyond what is
              necessary for secure transaction processing.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-[#2F4A7D] mb-3">
              5. Data Security
            </h3>

            <ul className="list-disc pl-6 space-y-2">
              <li>Secure servers</li>
              <li>Restricted internal access</li>
              <li>Encryption protocols</li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-[#2F4A7D] mb-3">
              6. Data Retention
            </h3>

            <p>
              Pro data may be retained for operational, legal, taxation,
              and compliance purposes even after account deactivation.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-[#2F4A7D] mb-3">
              7. Your Rights
            </h3>

            <ul className="list-disc pl-6 space-y-2">
              <li>Access your personal data</li>
              <li>Request correction</li>
              <li>Request account deactivation</li>
            </ul>

            <p className="mt-4">
              Contact:
              <span className="font-medium text-[#2F4A7D] ml-1">
                techadmin@thewhyservices.com
              </span>
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-[#2F4A7D] mb-3">
              8. Policy Updates
            </h3>

            <p>
              WHY may update this Privacy Policy periodically.
              Continued use of WHY PRO implies acceptance of changes.
            </p>
          </div>

        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}