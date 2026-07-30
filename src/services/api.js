import axios from "axios";

// Every service file in this project calls paths like "/jobs", "/admin/jobs",
// "/auth/login" etc. assuming the API's /api prefix is already part of the
// base URL. VITE_API_BASE_URL should therefore be set to just the backend's
// origin (e.g. "https://why-website-backend.onrender.com"), NOT including
// "/api" — this is where that prefix gets added, once, for every request.
const rawBase = import.meta.env.VITE_API_BASE_URL || "";
const API = axios.create({
  baseURL: `${rawBase.replace(/\/+$/, "")}/api`,
});

// Attach the stored token to every outgoing request automatically.
// Existing calls that already pass an explicit Authorization header
// (see jobService.js / authService.js) are unaffected — this only fills
// the header in when it isn't already set.
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token && !config.headers?.Authorization) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;