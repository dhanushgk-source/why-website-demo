import axios from "axios";

const API_URL =
  import.meta.env.VITE_API_URL ||
  "https://why-backend-demo.vercel.app/api";

export async function getAdvertisements() {
  const response = await axios.get(`${API_URL}/ads`, {
    params: { public: true },
  });

  return response.data.data || [];
}