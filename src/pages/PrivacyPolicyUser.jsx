import { Link } from "react-router-dom";
import Footer from "../components/Footer"

export default function PrivacyPolicyUser() {
  return (
    <div className="bg-gradient-to-b from-gray-50 to-white min-h-screen text-gray-700">
      

      {/* Hero Section */}
      <section className="py-16 text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-[#2F4A7D] mb-4">
          Privacy Policy - USER
        </h2>

        <p className="text-gray-500 text-lg">
          Last Updated: <span className="font-semibold">February 2026</span>
        </p>
      </section>

      {/* Content Section */}
      <section className="max-w-4xl mx-auto px-6 pb-20">
        <div className="bg-white shadow-xl rounded-3xl p-8 md:p-12 space-y-10">

          <div>
            <p>
              WHY ("Company", "we", "our", or "us") values your privacy and is
              committed to protecting your personal information. This Privacy
              Policy explains how we collect, use, store, share, and protect
              your information when you use our website or services.
            </p>

            <p className="mt-4 font-medium text-[#2F4A7D]">
              By accessing or using our platform, you agree to this Privacy
              Policy.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-[#2F4A7D] mb-3">
              1. Information We Collect
            </h3>

            <h4 className="font-medium text-[#41D0C3] mb-2">
              A. Information You Provide
            </h4>

            <ul className="list-disc pl-6 space-y-2">
              <li>Full Name</li>
              <li>Email Address</li>
              <li>Mobile Number</li>
              <li>City / Location</li>
              <li>Information submitted through contact forms</li>
            </ul>

            <h4 className="font-medium text-[#41D0C3] mt-6 mb-2">
              B. Automatically Collected Information
            </h4>

            <ul className="list-disc pl-6 space-y-2">
              <li>IP address</li>
              <li>Device type</li>
              <li>Browser type</li>
              <li>Operating system</li>
              <li>Pages visited</li>
              <li>Date and time of access</li>
            </ul>

            <h4 className="font-medium text-[#41D0C3] mt-6 mb-2">
              C. Cookies
            </h4>

            <p>
              We use cookies to improve website performance and user experience.
              You may disable cookies through your browser settings.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-[#2F4A7D] mb-3">
              2. How We Use Your Information
            </h3>

            <ul className="list-disc pl-6 space-y-2">
              <li>Respond to inquiries</li>
              <li>Send updates about WHY services</li>
              <li>Improve website performance</li>
              <li>Ensure security and legal compliance</li>
            </ul>

            <p className="mt-4 font-medium text-[#41D0C3]">
              We do not sell your personal information.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-[#2F4A7D] mb-3">
              3. Sharing of Information
            </h3>

            <ul className="list-disc pl-6 space-y-2">
              <li>
                Trusted service providers (hosting, analytics, communication
                tools)
              </li>
              <li>Legal authorities when required by law</li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-[#2F4A7D] mb-3">
              4. Data Security
            </h3>

            <ul className="list-disc pl-6 space-y-2">
              <li>Secure hosting infrastructure</li>
              <li>Access control measures</li>
              <li>Standard encryption protocols</li>
            </ul>

            <p className="mt-4">
              While we use reasonable safeguards, no system is completely
              secure.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-[#2F4A7D] mb-3">
              5. Data Retention
            </h3>

            <p>
              We retain personal information only as long as necessary for
              operational and legal purposes.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-[#2F4A7D] mb-3">
              6. Your Rights
            </h3>

            <ul className="list-disc pl-6 space-y-2">
              <li>Request access to your data</li>
              <li>Request correction</li>
              <li>Request deletion</li>
              <li>Withdraw consent</li>
            </ul>

            <p className="mt-4">
              Contact us at:
              <span className="font-medium text-[#2F4A7D] ml-1">
                techadmin@thewhyservices.com
              </span>
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-[#2F4A7D] mb-3">
              7. Third-Party Links
            </h3>

            <p>
              Our website may contain links to third-party websites. We are not
              responsible for their privacy practices.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-[#2F4A7D] mb-3">
              8. Changes to This Policy
            </h3>

            <p>
              We may update this Privacy Policy periodically. Continued use of
              the website implies acceptance of updates.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-[#2F4A7D] mb-3">
              9. Contact Us
            </h3>

            <p>
              Email:
              <span className="font-medium text-[#2F4A7D] ml-1">
                techadmin@thewhyservices.com
              </span>
            </p>

            <p>Website: www.thewhyservices.com</p>
          </div>

        </div>
      </section>

      {/* Footer */}
      <Footer/>
    </div>
  );
}