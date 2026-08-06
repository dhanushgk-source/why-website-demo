import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { getPublicSiteSettings } from "../services/siteService";

export default function Contact() {
  const [settings, setSettings] = useState({
    phone_number: "+91 98765 43210",
    whatsapp_number: "+91 98765 43210",
    support_email: "support@thewhyservices.com",
    office_address: "123 Care Avenue, Chennai, Tamil Nadu, India",
    working_hours: "Mon - Sat: 9:00 AM - 7:00 PM",
  });

  useEffect(() => {
    async function loadSettings() {
      const data = await getPublicSiteSettings();
      if (data) {
        setSettings(data);
      }
    }
    loadSettings();
  }, []);

  const cleanWhatsapp = (settings.whatsapp_number || "").replace(/[^0-9]/g, "");

  return (
    <div className="bg-white text-gray-800 min-h-screen">
      <Navbar />

      <section className="max-w-4xl mx-auto px-6 md:px-16 py-12 md:py-16">
        <h2 className="text-4xl font-bold mb-10 text-[#1B2A4A]">Contact Us</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 items-center">
          <div>
            <h3 className="text-xl font-semibold mb-4 text-[#1B2A4A]">OFFICE ADDRESS</h3>

            <p className="text-gray-700 leading-relaxed text-lg whitespace-pre-line">
              {settings.office_address}
            </p>

            <p className="mt-4 text-sm text-slate-500">
              <strong>Working Hours:</strong> {settings.working_hours}
            </p>

            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(settings.office_address)}`}
              target="_blank"
              rel="noreferrer"
              className="inline-block mt-6 px-6 py-3 bg-[#1B2A4A] text-white rounded-xl hover:bg-[#0D9488] transition font-semibold shadow-md"
            >
              Get Directions
            </a>
          </div>

          <div className="w-full h-[320px] md:h-[400px] rounded-xl overflow-hidden shadow-lg border border-slate-200">
            <iframe
              title="Google Map"
              src={`https://www.google.com/maps?q=${encodeURIComponent(settings.office_address)}&output=embed`}
              className="w-full h-full"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-14">
          {/* Phone */}
          <div className="bg-white rounded-2xl shadow-md p-6 text-center border border-slate-200 hover:shadow-xl transition flex flex-col justify-between">
            <div>
              <div className="text-4xl mb-4">📞</div>
              <h3 className="text-xl font-semibold mb-2 text-[#1B2A4A]">Phone Helpline</h3>
              <p className="text-gray-600 mb-4 text-sm">Speak directly with our support team.</p>
            </div>
            <a
              href={`tel:${settings.phone_number}`}
              className="text-[#0D9488] font-bold text-lg hover:underline mt-2 inline-block"
            >
              {settings.phone_number}
            </a>
          </div>

          {/* Email */}
          <div className="bg-white rounded-2xl shadow-md p-6 text-center border border-slate-200 hover:shadow-xl transition flex flex-col justify-between">
            <div>
              <div className="text-4xl mb-4">📧</div>
              <h3 className="text-xl font-semibold mb-2 text-[#1B2A4A]">Email Support</h3>
              <p className="text-gray-600 mb-4 text-sm">Send us your questions anytime.</p>
            </div>
            <a
              href={`mailto:${settings.support_email}`}
              className="text-[#0D9488] font-bold text-base hover:underline mt-2 inline-block break-all"
            >
              {settings.support_email}
            </a>
          </div>

          {/* WhatsApp */}
          <div className="bg-white rounded-2xl shadow-md p-6 text-center border border-slate-200 hover:shadow-xl transition flex flex-col justify-between">
            <div>
              <div className="text-4xl mb-4">💬</div>
              <h3 className="text-xl font-semibold mb-2 text-[#1B2A4A]">WhatsApp Chat</h3>
              <p className="text-gray-600 mb-4 text-sm">Instant assistance & direct booking.</p>
            </div>
            <a
              href={`https://wa.me/${cleanWhatsapp}?text=Hi!%20I%20have%20an%20inquiry.`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-[#22c55e] text-white font-bold px-5 py-2.5 rounded-xl hover:bg-[#16a34a] transition text-sm shadow mt-2"
            >
              Chat on WhatsApp ({settings.whatsapp_number})
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}