// Central place for all contact details so every component stays in sync.
// Update here once and it propagates everywhere it's used.

export const PHONE_DISPLAY = '+91 90365 99439';
export const PHONE_TEL = '+919036599439'; // used in tel: links
export const WHATSAPP_NUMBER = '919090254343'; // used in wa.me links (no + or spaces)
export const APP_LINK = "";
export const WHATSAPP_LINK = "";
export const DEFAULT_WHATSAPP_MESSAGE =
  "Hi";

export function getWhatsAppLink(message = DEFAULT_WHATSAPP_MESSAGE) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export const PHONE_LINK = `tel:${PHONE_TEL}`;

// WHY currently operates only in Bengaluru.
export const LOCATIONS = ['Bengaluru'];
export const LOCATIONS_NOTE = ' coming soon.';

// Support is available around the clock, on the same number as WhatsApp.
export const SUPPORT_HOURS = '24/7 Support';
