import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "https://why-website-backend.onrender.com/api";

export async function getPublicSiteSettings() {
  try {
    const res = await axios.get(`${API_URL}/settings/public`);
    return res.data?.settings || null;
  } catch (err) {
    console.error("Error fetching site settings:", err);
    return null;
  }
}

export async function getPublicPricingPlans() {
  try {
    const res = await axios.get(`${API_URL}/pricing/public`);
    return res.data?.plans || [];
  } catch (err) {
    console.error("Error fetching public pricing plans:", err);
    return [];
  }
}
