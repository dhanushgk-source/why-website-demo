import { Link } from "react-router-dom";
import Footer from "../components/Footer";

export default function CookieNotice() {
  return (
    <div className="bg-gradient-to-b from-gray-50 to-white min-h-screen text-gray-700 pt-10">
      
      {/* Hero Section */}
      <section className="py-16 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-[#1B2A4A] mb-4">
          Cookie Notice & Policy
        </h1>
        <p className="text-gray-500 text-lg">
          Last Updated: <span className="font-semibold">September 2026</span>
        </p>
      </section>

      {/* Content Section */}
      <section className="max-w-4xl mx-auto px-6 pb-20">
        <div className="bg-white shadow-xl rounded-3xl p-8 md:p-12 space-y-10 border border-gray-100">

          <div>
            <p className="text-base leading-relaxed">
              This Cookie Notice explains how <strong>WHY</strong> ("Company", "we", "our", or "us") uses cookies and similar tracking technologies when you visit our website (<strong>www.thewhyservices.com</strong>). It explains what these technologies are and why we use them, as well as your rights to control our use of them.
            </p>
            <p className="mt-4 font-medium text-[#1B2A4A]">
              By continuing to browse or using our website, you agree to our use of cookies as described in this Cookie Notice.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-[#1B2A4A] mb-3">
              1. What Are Cookies?
            </h3>
            <p className="text-base leading-relaxed">
              Cookies are small data text files that are placed on your computer or mobile device when you visit a website. Cookies are widely used by website owners in order to make their websites work, or to work more efficiently, as well as to provide reporting information and remember your browsing preferences.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-[#1B2A4A] mb-3">
              2. Types of Cookies We Use
            </h3>

            <div className="space-y-6">
              <div>
                <h4 className="font-semibold text-[#0D9488] mb-1">
                  A. Strictly Necessary Cookies (Always Active)
                </h4>
                <p className="text-sm text-gray-600 leading-relaxed">
                  These cookies are essential for you to browse the website and use its features, such as accessing secure areas, session handling, and saving your cookie consent preferences. Without these cookies, the website cannot function properly.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-[#0D9488] mb-1">
                  B. Performance & Analytics Cookies
                </h4>
                <p className="text-sm text-gray-600 leading-relaxed">
                  These cookies collect information about how visitors use our website, for instance, which pages visitors go to most often, and if they get error messages from web pages. These cookies help us improve how our website works and measure website performance.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-[#0D9488] mb-1">
                  C. Functionality & Personalization Cookies
                </h4>
                <p className="text-sm text-gray-600 leading-relaxed">
                  These cookies allow the website to remember choices you make (such as your preferred city/location or user preferences) and provide enhanced, more personal features.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-[#0D9488] mb-1">
                  D. Targeting & Marketing Cookies
                </h4>
                <p className="text-sm text-gray-600 leading-relaxed">
                  These cookies may be set through our site by our advertising partners to build a profile of your interests and show you relevant announcements or campaign updates on other platforms.
                </p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-[#1B2A4A] mb-3">
              3. How You Can Control Cookies
            </h3>
            <p className="text-base leading-relaxed mb-3">
              You have the right to decide whether to accept or reject optional cookies.
            </p>
            <ul className="list-disc pl-6 space-y-2 text-sm leading-relaxed">
              <li>
                <strong>On Our Website:</strong> You can manage your preferences at any time using our floating Cookie Banner choices ("Only Necessary Cookies" or "Accept All Cookies").
              </li>
              <li>
                <strong>Browser Controls:</strong> Most web browsers allow you to control cookies through their settings preferences. You can set or amend your web browser controls to accept or refuse cookies. If you choose to reject cookies, you may still use our website though your access to some functionality and areas may be restricted.
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-[#1B2A4A] mb-3">
              4. Updates to This Cookie Notice
            </h3>
            <p className="text-base leading-relaxed">
              We may update this Cookie Notice from time to time in order to reflect changes to the cookies we use or for other operational, legal, or regulatory reasons. Please re-visit this Cookie Notice regularly to stay informed about our use of cookies.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-[#1B2A4A] mb-3">
              5. Contact Us
            </h3>
            <p className="text-base leading-relaxed">
              If you have any questions about our use of cookies or other technologies, please contact us at:
            </p>
            <p className="mt-2 font-medium text-[#1B2A4A]">
              Email: <a href="mailto:info@thewhyservices.com" className="text-[#0D9488] underline">info@thewhyservices.com</a>
            </p>
            {/* <p className="text-sm text-gray-500 mt-1">Website: www.thewhyservices.com</p> */}
          </div>

          <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
            <Link to="/" className="text-sm font-semibold text-[#0D9488] hover:underline">
              ← Return to Home Page
            </Link>
            <Link to="/privacy-policy-user" className="text-sm font-semibold text-[#1B2A4A] hover:underline">
              Customer Privacy Policy →
            </Link>
          </div>

        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
