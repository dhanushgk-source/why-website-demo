// authService.js
import API from "./api";


export const registerUser = (data) => API.post("/auth/register", data);
export const loginUser    = (data) => API.post("/auth/login", data);

export const firebaseGoogleAuth = async (data) => {
  try {
    return await API.post("/auth/firebase", data);
  } catch (err) {
    if (err.response?.status === 404) {
      // Graceful fallback while Render finishes deploying the new /api/auth/firebase endpoint
      try {
        const regRes = await API.post("/auth/register-student", {
          fullName: data.fullName || data.email.split("@")[0],
          email: data.email,
          phone: data.phone || "",
          department: data.department || "",
          password: `GoogleAuth#${data.firebaseUid || data.email}`,
        });
        return regRes;
      } catch (regErr) {
        if (
          regErr.response?.data?.message?.toLowerCase().includes("email already exists") ||
          regErr.response?.status === 400
        ) {
          return await API.post("/auth/login", {
            email: data.email,
            password: `GoogleAuth#${data.firebaseUid || data.email}`,
          });
        }
        throw regErr;
      }
    }
    throw err;
  }
};

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