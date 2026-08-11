// authService.js
import API from "./api";


export const registerUser = (data) => API.post("/auth/register", data);
export const loginUser    = (data) => API.post("/auth/login", data);

export const firebaseGoogleAuth = (data) => API.post("/auth/firebase", data);

export const getCurrentUser = (token) =>
  API.get("/auth/me", { headers: { Authorization: `Bearer ${token}` } });

// Learn-portal-specific self-signup — creates a `students` row too (see
// backend authController.registerStudent), NOT the shared /auth/register
// used by the careers/job-applicant signup.
export const registerStudent = (data) => API.post("/auth/register", data);

// Consumes a one-time token from an emailed setup/reset link.
export const setPassword = (token, newPassword) =>
  API.post("/auth/set-password", { token, newPassword });

// Requests a password reset link via email
export const forgotPassword = (email) =>
  API.post("/auth/forgot-password", { email });