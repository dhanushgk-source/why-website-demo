import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { getPublicSiteSettings } from "../services/siteService";
import { PHONE_DISPLAY, PHONE_TEL, WHATSAPP_NUMBER, GOOGLE_MAPS_LINK, getWhatsAppLink } from "../config/contact";
import { Phone, Mail, MessageSquare, MapPin, Navigation, Clock, ShieldCheck } from "lucide-react";

export default function Contact() {
  const [settings, setSettings] = useState({
    phone_number: PHONE_DISPLAY,
    whatsapp_number: WHATSAPP_NUMBER,
    support_email: "info@thewhyservices.com",
    office_address: "WHY Services India Private Limited, 1st Floor, No. 14/1, Balaji Krupa, 2nd Main Road, Seshadripuram, Bengaluru – 560020",
    working_hours: "24/7 Customer Support",
  });

  useEffect(() => {
    document.title = "Contact Us | WHY - Your Trusted Companion";
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

  const cleanPhoneTel = (settings.phone_number || PHONE_TEL).replace(/[^0-9+]/g, "");

  return (
    <div className="bg-slate-50 text-slate-800 min-h-screen flex flex-col">
      <Navbar />

      {/* Header Banner */}
      <section className="bg-gradient-to-r from-[#0B132B] via-[#132B45] to-[#0D1B2A] text-white py-16 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#52B5BD]/20 text-[#6ED3C8] text-xs font-bold uppercase tracking-wider mb-4 border border-[#52B5BD]/30">
            <ShieldCheck size={14} /> Official Support & Operations
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4">
            Contact WHY Services
          </h1>
          <p className="text-slate-300 text-base md:text-lg max-w-2xl mx-auto font-medium">
            Reach out to our Bengaluru operations desk for hospital navigation assistance, senior travel companion support, or general inquiries.
          </p>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="max-w-6xl mx-auto px-6 py-12 md:py-16 flex-1 w-full">
        {/* Office Address & Map Card */}
        <div className="bg-white rounded-3xl p-8 md:p-10 shadow-xl border border-slate-200/80 mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 text-[#52B5BD] text-xs font-extrabold uppercase tracking-widest">
                <MapPin size={16} /> Head Office Address
              </div>

              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-2">
                  WHY Services India Private Limited
                </h2>
                <div className="text-slate-600 text-base leading-relaxed space-y-1">
                  <p className="font-semibold text-slate-700">1st Floor, No. 14/1, Balaji Krupa, 2nd Main Road,</p>
                  <p>Seshadripuram, Bengaluru – 560020</p>
                  <p className="text-sm text-slate-500 pt-1">Karnataka, India</p>
                </div>
              </div>

              <div className="flex items-center gap-3 text-xs text-slate-500 pt-2 border-t border-slate-100">
                <Clock size={15} className="text-[#52B5BD]" />
                <span>Working Hours: <strong className="text-slate-700">{settings.working_hours}</strong></span>
              </div>

              <div>
                <a
                  href={GOOGLE_MAPS_LINK}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-[#0B132B] hover:bg-[#132B45] text-white rounded-xl font-bold text-sm transition-all shadow-md hover:shadow-lg"
                >
                  <Navigation size={16} color="#52B5BD" /> Get Map Directions
                </a>
              </div>
            </div>

            {/* Google Map Embedded Frame */}
            <div className="lg:col-span-6 w-full h-[280px] md:h-[340px] rounded-2xl overflow-hidden shadow-inner border border-slate-200">
              <iframe
                title="WHY Services India Private Limited Google Maps Location"
                src="https://maps.google.com/maps?q=WHY%20SERVICES%20INDIA%20PRIVATE%20LIMITED%2C%201st%20Floor%2C%2014%2F1%2C%202nd%20Main%20Rd%2C%20Seshadripuram%2C%20Bengaluru%2C%20Karnataka%20560020&t=&z=17&ie=UTF8&iwloc=&output=embed"
                className="w-full h-full"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>

        {/* Contact Method Cards (Clean Corporate Grid - NO Emojis) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Phone Card */}
          <div className="bg-white rounded-2xl p-7 text-center border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
            <div>
              <div className="w-14 h-14 bg-slate-100 group-hover:bg-[#52B5BD]/15 rounded-2xl flex items-center justify-center text-[#0B132B] group-hover:text-[#52B5BD] mx-auto mb-5 transition-all">
                <Phone size={26} />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-1.5">Direct Phone</h3>
              <p className="text-xs text-slate-500 mb-5 leading-relaxed">
                Speak directly with our Bengaluru support desk.
              </p>
            </div>
            <div>
              <a
                href={`tel:${cleanPhoneTel}`}
                className="inline-block w-full py-2.5 px-4 bg-slate-100 hover:bg-[#52B5BD] hover:text-[#0B132B] text-[#0B132B] font-extrabold rounded-xl text-sm transition-all"
              >
                {settings.phone_number}
              </a>
            </div>
          </div>

          {/* Email Card */}
          <div className="bg-white rounded-2xl p-7 text-center border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
            <div>
              <div className="w-14 h-14 bg-slate-100 group-hover:bg-[#52B5BD]/15 rounded-2xl flex items-center justify-center text-[#0B132B] group-hover:text-[#52B5BD] mx-auto mb-5 transition-all">
                <Mail size={26} />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-1.5">Official Email</h3>
              <p className="text-xs text-slate-500 mb-5 leading-relaxed">
                Send your queries & requests anytime.
              </p>
            </div>
            <div>
              <a
                href={`mailto:${settings.support_email}`}
                className="inline-block w-full py-2.5 px-4 bg-slate-100 hover:bg-[#52B5BD] hover:text-[#0B132B] text-[#0B132B] font-extrabold rounded-xl text-xs md:text-sm transition-all break-all"
              >
                {settings.support_email}
              </a>
            </div>
          </div>

          {/* WhatsApp Card */}
          <div className="bg-white rounded-2xl p-7 text-center border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
            <div>
              <div className="w-14 h-14 bg-slate-100 group-hover:bg-[#52B5BD]/15 rounded-2xl flex items-center justify-center text-[#0B132B] group-hover:text-[#52B5BD] mx-auto mb-5 transition-all">
                <MessageSquare size={26} />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-1.5">Book via WhatsApp</h3>
              <p className="text-xs text-slate-500 mb-5 leading-relaxed">
                Instant assistance from trained WHY PROs.
              </p>
            </div>
            <div>
              <a
                href={getWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block w-full py-2.5 px-4 bg-[#25D366] hover:bg-[#20bd5a] text-white font-extrabold rounded-xl text-sm transition-all shadow-sm"
              >
                Book via WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}