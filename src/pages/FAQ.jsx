import { Link } from "react-router-dom";
import { useState } from "react";
import { PHONE_DISPLAY, PHONE_LINK, getWhatsAppLink, LOCATIONS, LOCATIONS_NOTE } from "../config/contact";

const FAQS = [
  {
    q: "Who can book?",
    a: "Anyone 18+ can book, for whoever needs care — your parents, a recovering family member, or anyone who needs a caring hand.",
  },
  {
    q: "Where do you operate?",
    a: `Currently across ${LOCATIONS.join(", ")}. ${LOCATIONS_NOTE}`,
  },
  {
    q: "How do I reach WHY for support?",
    a: `Our support team is available 24/7 — WhatsApp or call us anytime at ${PHONE_DISPLAY}.`,
  },
  {
    q: "How do I pay?",
    a: "Secure your booking with only 30% upfront — pay the remaining amount only after a safe and successful journey. Pay securely by card or UPI, international cards welcome. Money flows only through WHY, never directly to the WHY PRO.",
  },
  {
    q: "Are WHY PROs verified?",
    a: "Yes — every WHY PRO passes 6-point checks (identity, criminal & court records, references, health, WHY training, insurance), and you can verify any WHY PRO live via their QR page.",
  },
  {
    q: "Do I need a subscription?",
    a: "No. There is no subscription and no lock-in — you pay only when you book.",
  },
];

function FAQItem({ item, isOpen, onClick }) {
  return (
    <div className="bg-white shadow-md rounded-2xl overflow-hidden">
      <button
        onClick={onClick}
        className="w-full flex items-center justify-between gap-4 text-left px-6 py-5"
      >
        <span className="font-semibold text-[#2F4A7D] text-base sm:text-lg">
          {item.q}
        </span>
        <span
          className={`text-[#41D0C3] flex-shrink-0 transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        >
          ▾
        </span>
      </button>
      <div
        className={`grid transition-all duration-300 ease-in-out ${
          isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <p className="px-6 pb-5 text-gray-600 leading-relaxed">{item.a}</p>
        </div>
      </div>
    </div>
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

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
      <section className="py-16 text-center px-6">
        <h2 className="text-4xl md:text-5xl font-bold text-[#2F4A7D] mb-4">
          Frequently Asked Questions
        </h2>

        <p className="text-gray-500 text-lg max-w-2xl mx-auto">
          Can't find what you're looking for?{" "}
          <a
            href={getWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-[#2F4A7D] underline decoration-[#25D366] underline-offset-4"
          >
            WhatsApp us
          </a>{" "}
          or{" "}
          <a
            href={PHONE_LINK}
            className="font-semibold text-[#2F4A7D] underline decoration-[#41D0C3] underline-offset-4"
          >
            call {PHONE_DISPLAY}
          </a>{" "}
          — we're here 24/7.
        </p>
      </section>

      {/* Content Section */}
      <section className="max-w-3xl mx-auto px-6 pb-20 space-y-4">
        {FAQS.map((item, i) => (
          <FAQItem
            key={item.q}
            item={item}
            isOpen={openIndex === i}
            onClick={() => setOpenIndex(openIndex === i ? -1 : i)}
          />
        ))}
      </section>

      {/* Footer */}
      <footer className="bg-[#2F4A7D] text-white py-6 text-center">
        <p className="text-sm opacity-80">© 2026 WHY. All Rights Reserved.</p>
      </footer>
    </div>
  );
}
