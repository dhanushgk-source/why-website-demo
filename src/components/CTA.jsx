import { useSectionFade } from '../hooks/useSectionFade';
import { useContactInfo, getPhoneLink, getWhatsAppLink, WHATSAPP_CHANNEL_URL } from '../config/contact';

export default function CTA() {
  const sectionRef = useSectionFade();
  const contactInfo = useContactInfo();

  return (
    <section
      ref={sectionRef}
      id="cta-section"
      className="relative overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #F8F3EA 0%, #52B5BD 18%, #2F4A7D 100%)',
        padding: '120px 20px',
        textAlign: 'center',
      }}
    >
      {/* Decorative blobs */}
      <div className="absolute top-0 left-0 w-72 h-72 rounded-full bg-white/10 -translate-x-1/3 -translate-y-1/3 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-white/10 translate-x-1/4 translate-y-1/4 pointer-events-none" />

      {/* Decorative dot grid - top right */}
      <div className="hidden md:grid absolute top-14 right-14 grid-cols-6 gap-2 opacity-30 pointer-events-none">
        {Array.from({ length: 24 }).map((_, i) => (
          <span key={i} className="w-1 h-1 rounded-full bg-white" />
        ))}
      </div>

      {/* Decorative dot grid - bottom left */}
      <div className="hidden md:grid absolute bottom-14 left-14 grid-cols-6 gap-2 opacity-30 pointer-events-none">
        {Array.from({ length: 24 }).map((_, i) => (
          <span key={i} className="w-1 h-1 rounded-full bg-white" />
        ))}
      </div>

      <div className="relative max-w-5xl mx-auto z-10">
        {/* Badge pill */}
        <span className="fade-inner inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold mb-8 bg-white/15 backdrop-blur-sm border border-white/25 text-white">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11z" />
            <polyline points="9 12 11 14 15 10" />
          </svg>
          Join the WHY family
        </span>

        {/* Heading */}
        <h2 className="fade-inner font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight tracking-tight text-white">
          Companion for <span className="text-[#FFE8D1]">Seniors and Families</span> <br />
          should feel <span className="text-[#FFE8D1]">safe</span>
        </h2>

        {/* Divider with heart */}
        <div className="fade-inner flex items-center justify-center gap-3 mb-10">
          <span className="w-10 h-px bg-white/40" />
          <svg width="16" height="16" viewBox="0 0 24 24" fill="#F2711F" stroke="none">
            <path d="M12 21s-6.7-4.3-9.3-8.1C.8 10 1.5 6.6 4.3 5c2.2-1.3 4.9-.7 6.4 1.2.4.5 1.1.5 1.5 0C13.7 4.3 16.4 3.7 18.6 5c2.8 1.6 3.5 5 1.6 7.9C18.7 16.7 12 21 12 21z" />
          </svg>
          <span className="w-10 h-px bg-white/40" />
        </div>

        {/* Buttons */}
        <div className="fade-inner flex flex-wrap justify-center items-center gap-4 sm:gap-6">
          <a
            href={getWhatsAppLink("Hi! I would like to contact WHY Support.", contactInfo.whatsapp_number)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-8 py-4 rounded-full bg-white/10 backdrop-blur-sm border border-white/25 text-white font-semibold transition duration-300 hover:scale-105 hover:bg-white/20"
          >
            <img src="/Assests/icons/msg.svg" className="white-icon" width="20" alt="" />
            Contact WHY Support
          </a>

          <a
            href={WHATSAPP_CHANNEL_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-8 py-4 rounded-full bg-[#25D366] text-white font-semibold shadow-lg transition duration-300 hover:scale-105 hover:bg-[#20bd5a]"
          >
            <i className="fab fa-whatsapp text-xl"></i>
            Follow WhatsApp Channel
          </a>
        </div>

        {/* Subtext */}
        <div className="fade-inner mt-6 text-white/70 text-sm">
          Available on Android and iOS · 24/7 Support:{' '}
          <a href={getPhoneLink(contactInfo.phone_number)} className="text-white font-semibold hover:underline">
            {contactInfo.phone_number}
          </a>{' '}
          · Launching Soon in Bengaluru and Chennai
        </div>
      </div>
    </section>
  );
}