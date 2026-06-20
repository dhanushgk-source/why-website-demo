import { Link } from "react-router-dom";

export default function TermsUser() {
  return (
    <div className="bg-gradient-to-b from-gray-50 to-white min-h-screen text-gray-700">
      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex justify-start">
            <Link to="/">
              <img
                src="/Assests/WHY_logo.png"
                alt="WHY logo"
                className="h-14 hover:-translate-y-0.5 hover:shadow-lg transition duration-300"
              />
            </Link>
          </div>

          <Link
            to="/"
            className="text-sm text-[#2F4A7D] hover:text-[#41D0C3] transition"
          >
            ← Back to Home
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-[#2F4A7D] mb-4">
          Terms & Conditions
        </h2>

        <p className="text-gray-500 text-lg">
          Last Updated: <span className="font-semibold">February 2026</span>
        </p>
      </section>

      {/* Content Section */}
      <section className="max-w-4xl mx-auto px-6 pb-20">
        <div className="bg-white shadow-xl rounded-3xl p-8 md:p-12 space-y-10">

          <div>
            <h3 className="text-xl font-semibold text-[#2F4A7D] mb-3">
              1. About WHY
            </h3>
            <p>
              WHY is an informational and promotional platform that introduces
              users to the concept of companionship and service facilitation.
              The website provides general information about the WHY platform,
              its vision, and upcoming services.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-[#2F4A7D] mb-3">
              2. Website Usage
            </h3>

            <ul className="list-disc pl-6 space-y-2">
              <li>
                This website is intended for informational purposes only.
              </li>
              <li>
                Accessing this website does not create any user account or
                contractual obligation.
              </li>
              <li>
                Content provided is subject to change without notice.
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-[#2F4A7D] mb-3">
              3. No Account or Service Commitment
            </h3>

            <ul className="list-disc pl-6 space-y-2">
              <li>No user registration is required.</li>
              <li>Viewing this website does not guarantee service access.</li>
              <li>
                Future services may be governed by separate terms.
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-[#2F4A7D] mb-3">
              4. Accuracy of Information
            </h3>

            <p>
              While we strive to keep information accurate and updated, WHY does
              not guarantee completeness or correctness. Content may be modified
              or removed at any time.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-[#2F4A7D] mb-3">
              5. Intellectual Property
            </h3>

            <p>
              All content including text, graphics, logos, and designs belong
              to WHY. Unauthorized copying or commercial use is strictly
              prohibited.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-[#2F4A7D] mb-3">
              6. Third-Party Links
            </h3>

            <p>
              This website may contain external links. WHY is not responsible
              for the content or policies of third-party websites.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-[#2F4A7D] mb-3">
              7. Limitation of Liability
            </h3>

            <p>
              WHY shall not be liable for any direct or indirect damages arising
              from use of this website. Usage is entirely at the visitor's own
              risk.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-[#2F4A7D] mb-3">
              8. Changes to Terms
            </h3>

            <p>
              WHY reserves the right to update these Terms at any time.
              Continued use after changes implies acceptance of revised terms.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-[#2F4A7D] mb-3">
              9. Governing Law
            </h3>

            <p>
              These Terms & Conditions shall be governed by the laws of India.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-[#2F4A7D] mb-3">
              10. Contact Information
            </h3>

            <p>
              Email:
              <span className="font-medium text-[#2F4A7D] ml-1">
                techadmin@thewhyservices.com
              </span>
            </p>

            <p>Location: India</p>
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