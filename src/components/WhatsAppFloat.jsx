import { FaWhatsapp } from 'react-icons/fa';
import { useContactInfo, getWhatsAppLink } from '../config/contact';

export default function WhatsAppFloat() {
  const contactInfo = useContactInfo();

  const handleClick = () => {
    window.open(getWhatsAppLink("Hi! I would like to book a WHY companion service.", contactInfo.whatsapp_number), '_blank', 'noopener,noreferrer');
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label="Chat on WhatsApp"
      className="group fixed bottom-6 right-5 sm:right-6 z-[9998] w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#25D366] text-white shadow-xl flex items-center justify-center hover:scale-105 active:scale-95 transition-transform duration-200"
    >
      {/* Tooltip */}
      <span
        className="pointer-events-none absolute right-full ml-3 top-1/2 -translate-y-1/2
                   whitespace-nowrap rounded-md bg-gray-900 text-white text-sm font-medium
                   px-3 py-1.5 shadow-lg opacity-0 scale-95
                   group-hover:opacity-100 group-hover:scale-100
                   group-focus-visible:opacity-100 group-focus-visible:scale-100
                   transition-all duration-200 origin-left"
      >
        Book on WhatsApp
        <span className="absolute left-full top-1/2 -translate-y-1/2 border-4 border-transparent border-l-gray-900" />
      </span>

      <FaWhatsapp className="text-[26px] sm:text-[30px]" />
    </button>
  );
}