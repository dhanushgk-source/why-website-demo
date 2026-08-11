import { Link } from "react-router-dom";
import { useContactInfo, getWhatsAppLink, getPhoneLink, LOCATIONS, LOCATIONS_NOTE, WHATSAPP_CHANNEL_URL } from "../config/contact";
import { useSectionNav } from "../hooks/useSectionNav";

const COMPANION_SECTION_ID = 'Hospital-companion-section';

const scrollIds = {
  'How it Works': 'WHY-Works-section',
  'Hospital Assistance': COMPANION_SECTION_ID,
  'Travel Assistance': COMPANION_SECTION_ID,
};

const companionTabs = {
  'Hospital Assistance': 'hospital',
  'Travel Assistance': 'travel',
};

const companyRoutes = {
  'About Us': '/about',
  'Safety & Trust': '/trust and safety',
  'Careers': '/careers',
};

export default function Footer() {
  const goToSection = useSectionNav();
  const contactInfo = useContactInfo();

  const handleSectionClick = (label) => {
    const tab = companionTabs[label];
    if (tab) {
      window.dispatchEvent(new CustomEvent('why:companion-tab', { detail: { tab } }));
    }
    goToSection(scrollIds[label]);
  };

  return (
    <footer
      id="footer-section"
      className="text-white pt-20 pb-8"
      style={{
        background: "linear-gradient(180deg, #0D1B2A 0%, #132B45 55%, #0A1623 100%)",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Logo & About */}
        <div>
          <img src="/Assests/WHY_logo.png" alt="WHY Logo" className="w-40 mb-6" />

          <p className="text-base text-white/70 leading-relaxed mb-6">
            Connecting people with verified and trusted WHY PROs for compassionate care and assistance. Because every moment deserves to be shared.
          </p>

          <div className="space-y-5 text-white/70 text-base">
            {/* Phone / 24x7 Support */}
            <a href={getPhoneLink(contactInfo.phone_number)} className="group flex items-center gap-4 cursor-pointer transition">
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-white/10 transition duration-300 group-hover:bg-[#52B5BD]/25">
                <span className="text-xl transition duration-300 group-hover:text-[#6ED3C8]">
                  <img src="/Assests/icons/phone.svg" width="24" height="24" className="white-icon" alt="" />
                </span>
              </div>
              <span className="transition duration-300 group-hover:text-[#6ED3C8]">
                {contactInfo.phone_number}
                <span className="block text-xs text-white/50">{contactInfo.working_hours || "24/7 Customer Support"}</span>
              </span>
            </a>

            {/* WhatsApp */}
            <a
              href={getWhatsAppLink("Hi! I need assistance.", contactInfo.whatsapp_number)}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 cursor-pointer transition"
            >
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-white/10 transition duration-300 group-hover:bg-[#52B5BD]/25">
                <span className="text-xl transition duration-300 group-hover:text-[#6ED3C8]">
                  <img src="/Assests/icons/msg.svg" width="24" height="24" className="white-icon" alt="" />
                </span>
              </div>
              <span className="transition duration-300 group-hover:text-[#6ED3C8]">
                Book via WhatsApp                
                <span className="block text-xs text-white/50">{contactInfo.whatsapp_number}</span>
              </span>
            </a>

            {/* Email */}
            <div className="group flex items-center gap-4 cursor-pointer transition">
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-white/10 transition duration-300 group-hover:bg-[#52B5BD]/25">
                <span className="text-xl transition duration-300 group-hover:text-[#6ED3C8]">
                  <img src="/Assests/icons/mail.svg" width="24" height="24" className="white-icon" alt="" />
                </span>
              </div>
              <span className="transition duration-300 text-sm group-hover:text-[#6ED3C8]">
                {contactInfo.support_email}
              </span>
            </div>

            {/* Location */}
            <div className="group flex items-center gap-4 cursor-pointer transition">
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-white/10 transition duration-300 group-hover:bg-[#52B5BD]/25">
                <span className="text-xl transition duration-300 group-hover:text-[#6ED3C8]">
                  <img src="/Assests/icons/location.svg" width="24" height="24" className="white-icon" alt="" />
                </span>
              </div>
              <span className="transition duration-300 group-hover:text-[#6ED3C8]">
                {LOCATIONS.join(', ')}
                <span className="block text-xs text-white/50">{LOCATIONS_NOTE}</span>
              </span>
            </div>
          </div>
        </div>

        {/* Services */}
        <div>
          <h4 className="text-xl font-semibold mb-6">Services</h4>
          <ul className="space-y-4 text-white/70 text-base">
            {['Hospital Assistance', 'Travel Assistance'].map((s) => (
              <li key={s} className="flex items-start gap-3 hover:text-[#6ED3C8] transition">
                <span className="mt-2 w-2 h-2 rounded-full bg-[#52B5BD]"></span>
                {scrollIds[s] ? (
                  <button
                    onClick={() => handleSectionClick(s)}
                    className="hover:text-[#6ED3C8] transition text-left"
                  >
                    {s}
                  </button>
                ) : (
                  <span>{s}</span>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* Company */}
        <div>
          <h4 className="text-xl font-semibold mb-6">Company</h4>
          <ul className="space-y-4 text-white/70 text-base">
            {['About Us', 'How it Works', 'Safety & Trust', 'Careers'].map((s) => (
              <li key={s} className="flex items-start gap-3 hover:text-[#6ED3C8] transition">
                <span className="mt-2 w-2 h-2 rounded-full bg-[#52B5BD]"></span>
                {scrollIds[s] ? (
                  <button
                    onClick={() => handleSectionClick(s)}
                    className="hover:text-[#6ED3C8] transition text-left"
                  >
                    {s}
                  </button>
                ) : (
                  <Link
                    to={companyRoutes[s] || '/'}
                    className="hover:text-[#6ED3C8] transition"
                  >
                    {s}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* Support */}
        <div>
          <h4 className="text-xl font-semibold mb-6">Support</h4>
          <ul className="space-y-4 text-white/70 text-base">
            <li className="flex items-start gap-3 hover:text-[#6ED3C8] transition">
              <span className="mt-2 w-2 h-2 rounded-full bg-[#52B5BD]"></span>
              <a
                href={WHATSAPP_CHANNEL_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#6ED3C8] transition"
              >
                Follow WhatsApp Channel
              </a>
            </li>
            <li className="flex items-start gap-3 hover:text-[#6ED3C8] transition">
              <span className="mt-2 w-2 h-2 rounded-full bg-[#52B5BD]"></span>
              <a
                href={getWhatsAppLink("Hi! I need help from support.", contactInfo.whatsapp_number)}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#6ED3C8] transition"
              >
                Help Center
              </a>
            </li>
            <li className="flex items-start gap-3 hover:text-[#6ED3C8] transition">
              <span className="mt-2 w-2 h-2 rounded-full bg-[#52B5BD]"></span>
              <Link to="/faq" className="hover:text-[#6ED3C8] transition">FAQ</Link>
            </li>
            <li className="flex items-start gap-3 hover:text-[#6ED3C8] transition">
              <span className="mt-2 w-2 h-2 rounded-full bg-[#52B5BD]"></span>
              <Link to="/contact" className="hover:text-[#6ED3C8] transition">Contact Us</Link>
            </li>
            <li className="flex items-start gap-3 hover:text-[#6ED3C8] transition">
              <span className="mt-2 w-2 h-2 rounded-full bg-[#52B5BD]"></span>
              <Link to="/terms-user" className="hover:text-[#6ED3C8] transition">Terms & Conditions</Link>
            </li>
            <li className="flex items-start gap-3 hover:text-[#6ED3C8] transition">
              <span className="mt-2 w-2 h-2 rounded-full bg-[#52B5BD]"></span>
              <Link to="/terms-pro" className="hover:text-[#6ED3C8] transition">PRO Terms & Conditions</Link>
            </li>
            <li className="flex items-start gap-3 hover:text-[#6ED3C8] transition">
              <span className="mt-2 w-2 h-2 rounded-full bg-[#52B5BD]"></span>
              <Link to="/privacy-policy-user" className="hover:text-[#6ED3C8] transition">Privacy Policy - Customer</Link>
            </li>
            <li className="flex items-start gap-3 hover:text-[#6ED3C8] transition">
              <span className="mt-2 w-2 h-2 rounded-full bg-[#52B5BD]"></span>
              <Link to="/privacy-policy-pro" className="hover:text-[#6ED3C8] transition">Privacy Policy - PRO</Link>
            </li>
            <li className="flex items-start gap-3 hover:text-[#6ED3C8] transition">
              <span className="mt-2 w-2 h-2 rounded-full bg-[#52B5BD]"></span>
              <Link to="/cp-pro" className="hover:text-[#6ED3C8] transition">Cancellation Policy - PRO</Link>
            </li>
            <li className="flex items-start gap-3 hover:text-[#6ED3C8] transition">
              <span className="mt-2 w-2 h-2 rounded-full bg-[#52B5BD]"></span>
              <Link to="/cp-user" className="hover:text-[#6ED3C8] transition">Cancellation Policy - User</Link>
            </li>
            <li className="flex items-start gap-3 hover:text-[#6ED3C8] transition">
              <span className="mt-2 w-2 h-2 rounded-full bg-[#52B5BD]"></span>
              <Link to="/data-deletion" className="hover:text-[#6ED3C8] transition">Data Deletion Policy</Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-white/15 mt-14 pt-6">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-white/60 text-sm text-center md:text-left">
            © 2026 WHY – We Help You. All rights reserved.
            Made with{' '}
            <img src="/Assests/icons/heart.svg" width="20" height="20" className="inline white-icon" alt="heart" />{' '}
            for everyone.
          </p>

          <div className="flex items-center gap-5">
            <a href={WHATSAPP_CHANNEL_URL} target="_blank" rel="noopener noreferrer"
              title="Follow the WHY Services channel on WhatsApp"
              aria-label="Follow the WHY Services channel on WhatsApp"
              className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white text-lg transition-all duration-300 hover:bg-[#25D366] hover:scale-110 cursor-pointer">
              <i className="fab fa-whatsapp"></i>
            </a>
            <a href="https://www.facebook.com/share/1Dij6aGamA/" target="_blank" rel="noopener noreferrer"
              className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white text-lg transition-all duration-300 hover:bg-[#52B5BD] hover:scale-110 cursor-pointer">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="https://x.com/thewhyservices" target="_blank" rel="noopener noreferrer"
              className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white text-lg transition-all duration-300 hover:bg-[#52B5BD] hover:scale-110 cursor-pointer">
              <i className="fab fa-x-twitter"></i>
            </a>
            <a href="https://www.instagram.com/why.services?igsh=czR0eDViMnhtN2dw" target="_blank" rel="noopener noreferrer"
              className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white text-lg transition-all duration-300 hover:bg-[#52B5BD] hover:scale-110 cursor-pointer">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="https://www.linkedin.com/company/why-companion-services/" target="_blank" rel="noopener noreferrer"
              className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white text-lg transition-all duration-300 hover:bg-[#52B5BD] hover:scale-110 cursor-pointer">
              <i className="fab fa-linkedin-in"></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}