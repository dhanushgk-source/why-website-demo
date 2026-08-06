import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { getPublicSiteSettings } from "../services/siteService";
import { PHONE_DISPLAY, PHONE_TEL, WHATSAPP_NUMBER } from "../config/contact";

export default function Contact() {
  const [settings, setSettings] = useState({
    phone_number: PHONE_DISPLAY,
    whatsapp_number: WHATSAPP_NUMBER,
    support_email: "support@whyservices.in",
    office_address: "Ground Floor, 14/1,\nBalajikrupa 2nd Main Road,\nSeshadripuram,\nBengaluru North,\nBengaluru – 560020,\nKarnataka",
    working_hours: "24/7 Support",
  });

  useEffect(() => {
    async function loadSettings() {
      const data = await getPublicSiteSettings();
      if (data) {
        setSettings((prev) => ({
          ...prev,
          phone_number: data.phone_number || prev.phone_number,
          whatsapp_number: data.whatsapp_number || prev.whatsapp_number,
          support_email: data.support_email || prev.support_email,
          office_address: data.office_address || prev.office_address,
          working_hours: data.working_hours || prev.working_hours,
        }));
      }
    }
    loadSettings();
  }, []);

  const cleanWhatsapp = (settings.whatsapp_number || WHATSAPP_NUMBER).replace(/[^0-9]/g, "");
  const cleanPhoneTel = (settings.phone_number || PHONE_TEL).replace(/[^0-9+]/g, "");

  return (
    <div className="bg-white text-gray-800 min-h-screen">
      <Navbar />

      <section className="max-w-4xl mx-auto px-6 md:px-16 py-12 md:py-16">
        <h2 className="text-4xl font-bold mb-10">Contact Us</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 items-center">
          <div>
            <h3 className="text-xl font-semibold mb-4">OFFICE ADDRESS</h3>

            <p className="text-gray-700 leading-relaxed text-lg">
              Ground Floor, 14/1,
              <br />
              Balajikrupa 2nd Main Road,
              <br />
              Seshadripuram,
              <br />
              Bengaluru North,
              <br />
              Bengaluru – 560020,
              <br />
              Karnataka
            </p>

            <a
              href="https://www.google.com/maps?q=Ground%20Floor,%2014/1,%20Balajikrupa%202nd%20Main%20Road,%20Seshadripuram,%20Bangalore%20560020"
              target="_blank"
              rel="noreferrer"
              className="inline-block mt-6 px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition"
            >
              Get Directions
            </a>
          </div>

          <div className="w-full h-[320px] md:h-[400px] rounded-xl overflow-hidden shadow-lg border border-slate-200">
            <iframe
              title="Google Map"
              src="https://www.google.com/maps?q=Ground%20Floor,%2014/1,%20Balajikrupa%202nd%20Main%20Road,%20Seshadripuram,%20Bangalore%20560020&output=embed"
              className="w-full h-full"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          {/* Phone */}
          <div className="bg-white rounded-2xl shadow-md p-6 text-center border hover:shadow-xl transition">
            <div className="text-4xl mb-4">📞</div>
            <h3 className="text-xl font-semibold mb-2">Phone</h3>
            <p className="text-gray-600 mb-4">Speak directly with our support team.</p>
            <a
              href={`tel:${cleanPhoneTel}`}
              className="text-[#52B5BD] font-semibold hover:underline"
            >
              {settings.phone_number}
            </a>
          </div>

          {/* Email */}
          <div className="bg-white rounded-2xl shadow-md p-6 text-center border hover:shadow-xl transition">
            <div className="text-4xl mb-4">📧</div>
            <h3 className="text-xl font-semibold mb-2">Email</h3>
            <p className="text-gray-600 mb-4">Send us your questions anytime.</p>
            <a
              href={`mailto:${settings.support_email}`}
              className="text-[#52B5BD] font-semibold hover:underline break-all"
            >
              {settings.support_email}
            </a>
          </div>

          {/* WhatsApp */}
          <div className="bg-white rounded-2xl shadow-md p-6 text-center border hover:shadow-xl transition">
            <div className="text-4xl mb-4">💬</div>
            <h3 className="text-xl font-semibold mb-2">WhatsApp</h3>
            <p className="text-gray-600 mb-4">Chat with us for instant assistance.</p>
            <a
              href={`https://wa.me/${cleanWhatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#52B5BD] font-semibold hover:underline"
            >
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}