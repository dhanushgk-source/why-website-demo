import { useState, useEffect } from "react";
import { getPublicSiteSettings } from "../services/siteService";

// Default fallbacks
export const DEFAULT_PHONE_DISPLAY = "+91 90365 99439";
export const DEFAULT_WHATSAPP_NUMBER = "919090254343";
export const WHATSAPP_CHANNEL_URL = "https://whatsapp.com/channel/0029VbCzkTQEquiLs2wYHC2H";
export const APP_LINK = "";
export const ANDROID_APP_LINK = "";
export const IOS_APP_LINK = "";
export const DEFAULT_WHATSAPP_MESSAGE = "Hi! I would like to inquire about WHY companion services.";

let cachedSettings = {
  phone_number: DEFAULT_PHONE_DISPLAY,
  whatsapp_number: DEFAULT_WHATSAPP_NUMBER,
  support_email: "support@whyservices.in",
  office_address: "Ground Floor, 14/1, Balajikrupa 2nd Main Road, Seshadripuram, Bengaluru North, Bengaluru – 560020, Karnataka",
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
  return `https://wa.me/${num}?text=${encodeURIComponent(message)}`;
}

export function getPhoneLink(overridePhone = null) {
  const num = (overridePhone || cachedSettings.phone_number || DEFAULT_PHONE_DISPLAY).replace(/[^0-9+]/g, "");
  return `tel:${num}`;
}

export const LOCATIONS = ["Bengaluru"];
export const LOCATIONS_NOTE = " coming soon.";
export const SUPPORT_HOURS = "24/7 Support";
