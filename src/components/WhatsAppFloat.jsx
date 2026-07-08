import { useState } from 'react'
import { PHONE_DISPLAY, PHONE_LINK, getWhatsAppLink } from '../config/contact'

export default function WhatsAppFloat() {
  const [open, setOpen] = useState(false)

  return (
    <div className="fixed bottom-6 right-5 sm:right-6 z-[9998] flex flex-col items-end gap-3">
      {/* Expanded options */}
      <div
        className={`flex flex-col items-end gap-3 transition-all duration-300 ${
          open ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-3 pointer-events-none'
        }`}
      >
        <a
          href={getWhatsAppLink()}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 pl-4 pr-5 py-3 rounded-full bg-[#25D366] text-white font-semibold shadow-lg hover:scale-105 transition-transform"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
            <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.33 4.95L2 22l5.28-1.39a9.9 9.9 0 0 0 4.76 1.21h.01c5.46 0 9.91-4.45 9.91-9.91C21.96 6.45 17.5 2 12.04 2zm5.8 14.02c-.24.68-1.4 1.3-1.93 1.38-.5.08-1.12.11-1.8-.11-.42-.13-.96-.31-1.65-.6-2.9-1.25-4.8-4.15-4.94-4.34-.14-.19-1.19-1.58-1.19-3.01 0-1.43.75-2.13 1.02-2.42.27-.29.58-.36.78-.36.19 0 .39 0 .56.01.18.01.42-.07.66.5.24.58.82 2.01.9 2.15.07.15.12.32.02.51-.1.19-.15.3-.29.47-.15.16-.31.36-.44.48-.15.15-.3.31-.13.6.17.29.75 1.24 1.62 2.01 1.11.99 2.05 1.3 2.34 1.45.29.15.46.13.63-.08.17-.2.72-.84.92-1.13.19-.29.39-.24.65-.14.27.1 1.69.8 1.98.94.29.15.48.22.55.34.07.13.07.75-.17 1.42z"/>
          </svg>
          <span className="text-sm sm:text-base whitespace-nowrap">Chat on WhatsApp</span>
        </a>

        <a
          href={PHONE_LINK}
          className="flex items-center gap-3 pl-4 pr-5 py-3 rounded-full bg-[#1B2A4A] text-white font-semibold shadow-lg hover:scale-105 transition-transform"
        >
          <img src="/Assests/icons/phone.svg" width="18" height="18" className="white-icon" alt="" />
          <span className="text-sm sm:text-base whitespace-nowrap">Call 24/7: {PHONE_DISPLAY}</span>
        </a>
      </div>

      {/* Toggle button */}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? 'Close contact options' : 'Contact WHY'}
        className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#25D366] text-white shadow-xl flex items-center justify-center hover:scale-105 active:scale-95 transition-transform"
      >
        {open ? (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
            <line x1="6" y1="6" x2="18" y2="18" />
            <line x1="18" y1="6" x2="6" y2="18" />
          </svg>
        ) : (
          <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
            <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.33 4.95L2 22l5.28-1.39a9.9 9.9 0 0 0 4.76 1.21h.01c5.46 0 9.91-4.45 9.91-9.91C21.96 6.45 17.5 2 12.04 2zm5.8 14.02c-.24.68-1.4 1.3-1.93 1.38-.5.08-1.12.11-1.8-.11-.42-.13-.96-.31-1.65-.6-2.9-1.25-4.8-4.15-4.94-4.34-.14-.19-1.19-1.58-1.19-3.01 0-1.43.75-2.13 1.02-2.42.27-.29.58-.36.78-.36.19 0 .39 0 .56.01.18.01.42-.07.66.5.24.58.82 2.01.9 2.15.07.15.12.32.02.51-.1.19-.15.3-.29.47-.15.16-.31.36-.44.48-.15.15-.3.31-.13.6.17.29.75 1.24 1.62 2.01 1.11.99 2.05 1.3 2.34 1.45.29.15.46.13.63-.08.17-.2.72-.84.92-1.13.19-.29.39-.24.65-.14.27.1 1.69.8 1.98.94.29.15.48.22.55.34.07.13.07.75-.17 1.42z"/>
          </svg>
        )}
      </button>
    </div>
  )
}
