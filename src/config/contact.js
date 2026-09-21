import { useState, useEffect } from "react";
import { getPublicSiteSettings } from "../services/siteService";

// Default fallbacks
export const DEFAULT_PHONE_DISPLAY = "+91 9090254343";
export const DEFAULT_WHATSAPP_NUMBER = "+91 9090254343";
export const GOOGLE_MAPS_LINK = "https://share.google/g8MAgRPtwOigUkoSp";
export const DEFAULT_WHATSAPP_MESSAGE = "Hello! Can I get more info on this?";

export const WHATSAPP_BOOKING_URL = `https://api.whatsapp.com/send/?phone=919090254343&text=${encodeURIComponent(DEFAULT_WHATSAPP_MESSAGE)}&type=phone_number&app_absent=0`;
export const WHATSAPP_CHANNEL_URL = "https://whatsapp.com/channel/0029VbCzkTQEquiLs2wYHC2H";

export const SOCIAL_LINKS = {
  facebook: "https://www.facebook.com/share/1Dij6aGamA/",
  twitter: "https://x.com/thewhyservices",
  instagram: "https://www.instagram.com/why.services?igsh=czR0eDViMnhtN2dw",
  linkedin: "https://www.linkedin.com/company/why-companion-services/",
  youtube: "https://youtube.com/@whyservicesofficial?si=34EsY37BgjsC1TZB",
  whatsappBooking: WHATSAPP_BOOKING_URL,
};

export const APP_LINK = "";
export const ANDROID_APP_LINK = "";
export const IOS_APP_LINK = "";

let cachedSettings = {
  phone_number: DEFAULT_PHONE_DISPLAY,
  whatsapp_number: DEFAULT_WHATSAPP_NUMBER,
  support_email: "info@thewhyservices.com",
  office_address: "WHY Services India Private Limited, 1st Floor, No. 14/1, Balaji Krupa, 2nd Main Road, Seshadripuram, Bengaluru – 560020",
  working_hours: "24/7 Support",
};

let listeners = [];

export async function fetchContactDetails() {
  try {
    const data = await getPublicSiteSettings();
    if (data) {
      cachedSettings = {
        phone_number: data.phone_number || cachedSettings.phone_number,
        whatsapp_number: data.whatsapp_number || cachedSettings.whatsapp_number,
        support_email: data.support_email || cachedSettings.support_email,
        office_address: data.office_address || cachedSettings.office_address,
        working_hours: data.working_hours || cachedSettings.working_hours,
      };
      listeners.forEach((fn) => fn(cachedSettings));
    }
  } catch (err) {
    console.error("Error fetching contact settings:", err);
  }
  return cachedSettings;
}

// Initial fetch on app import
fetchContactDetails();

export function useContactInfo() {
  const [info, setInfo] = useState(cachedSettings);

  useEffect(() => {
    fetchContactDetails().then(setInfo);
    listeners.push(setInfo);
    return () => {
      listeners = listeners.filter((fn) => fn !== setInfo);
    };
  }, []);

  return info;
}

// Static exports for backwards compatibility
export const PHONE_DISPLAY = DEFAULT_PHONE_DISPLAY;
export const PHONE_TEL = `+${DEFAULT_PHONE_DISPLAY.replace(/[^0-9]/g, "")}`;
export const WHATSAPP_NUMBER = DEFAULT_WHATSAPP_NUMBER;
export const PHONE_LINK = `tel:${PHONE_TEL}`;

export function getWhatsAppLink(message = DEFAULT_WHATSAPP_MESSAGE, overrideNum = null) {
  const num = (overrideNum || cachedSettings.whatsapp_number || DEFAULT_WHATSAPP_NUMBER).replace(/[^0-9]/g, "");
  return `https://api.whatsapp.com/send/?phone=${num}&text=${encodeURIComponent(DEFAULT_WHATSAPP_MESSAGE)}&type=phone_number&app_absent=0`;
}

export function getPhoneLink(overridePhone = null) {
  const num = (overridePhone || cachedSettings.phone_number || DEFAULT_PHONE_DISPLAY).replace(/[^0-9+]/g, "");
  return `tel:${num}`;
}

export const LOCATIONS = ["Bengaluru"];
export const LOCATIONS_NOTE = "coming soon.";
export const SUPPORT_HOURS = "24/7 Support";
