import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { registerStudent } from "../../services/authService";
import { signInWithGoogle } from "../../config/firebase";
import { useAuth } from "../../contexts/AuthContext";

export default function LearnRegister() {
  const location = useLocation();
  const navigate = useNavigate();
  const { loginWithFirebase } = useAuth();

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    department: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submittedName, setSubmittedName] = useState("");

  const handleChange = (e) => {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
    setErrors((p) => ({ ...p, [e.target.name]: "" }));
    setApiError("");
  };

  const validate = () => {
    const errs = {};
    if (!form.fullName.trim()) errs.fullName = "Full name is required.";
    if (!form.email.trim()) errs.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = "Enter a valid email.";
    if (!form.password) errs.password = "Password is required.";
    else if (form.password.length < 6)
      errs.password = "Password must be at least 6 characters.";
    if (form.password !== form.confirmPassword)
      errs.confirmPassword = "Passwords do not match.";
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError("");
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    setLoading(true);
    try {
      await registerStudent({
        fullName: form.fullName,
        email: form.email,
        phone: form.phone,
        department: form.department,
        password: form.password,
      });
      setSubmittedName(form.fullName);
      setSubmitted(true);
    } catch (err) {
      setApiError(err.response?.data?.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
    setApiError("");
    setGoogleLoading(true);
    try {
      const { user, idToken } = await signInWithGoogle();
      const res = await loginWithFirebase({
        email: user.email,
        fullName: user.displayName,
        photoUrl: user.photoURL,
        firebaseUid: user.uid,
      });

      if (res?.token) {
        // If already verified/active, go straight to learn portal
        navigate("/learn", { replace: true });
        return;
      }

      // If pending approval
      setSubmittedName(user.displayName || user.email);
      setSubmitted(true);
    } catch (err) {
      console.error("Google sign up error:", err);
      if (err.code === "auth/popup-closed-by-user") {
        setApiError("Sign-up popup was closed before completing. Please try again.");
      } else if (err.code === "auth/configuration-not-found") {
        setApiError("Google Sign-In is not enabled yet in your Firebase Console. Please go to Firebase Console > Authentication > Sign-in method and enable Google.");
      } else if (err.code === "auth/unauthorized-domain") {
        setApiError("This domain is not authorized in Firebase. Please add your domain in Firebase Console > Authentication > Settings > Authorized domains.");
      } else {
        setApiError(err.response?.data?.message || err.message || "Google sign-up failed.");
      }
    } finally {
      setGoogleLoading(false);
    }
  };

  const inputClass = (name) =>
    `w-full px-4 py-3 rounded-xl border transition text-sm focus:outline-none focus:ring-2 focus:ring-[#52B5BD]/20 ${
      errors[name]
        ? "border-red-400 focus:border-red-400"
        : "border-gray-200 focus:border-[#52B5BD]"
    }`;

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#EAF6F7] via-white to-[#EEF2FF] flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8 md:p-10 text-center">
          <div className="w-16 h-16 rounded-full bg-amber-100 border-2 border-amber-300 text-amber-700 flex items-center justify-center mx-auto mb-4 text-3xl shadow-inner">
            ⏳
          </div>
          <h1 className="text-2xl font-bold text-[#0D1B3E] mb-2">Registration Submitted!</h1>
          <p className="text-gray-600 text-sm mb-6 leading-relaxed">
            Thank you <strong>{submittedName}</strong>! Your student account has been registered successfully.
          </p>
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 text-left mb-6 text-xs text-amber-900 leading-relaxed">
            <p className="font-bold mb-1.5 flex items-center gap-1.5">
              <span>📋</span> What happens next:
            </p>
            <p className="mb-1">1. An administrator will verify and approve your student profile.</p>
            <p className="mb-1">2. Once verified, sign in to your dashboard using Google or your password.</p>
            <p>3. You can then explore the course catalog and submit enrollment requests for the courses you wish to take!</p>
          </div>
          <Link
            to="/learn/login"
            className="w-full inline-block bg-[#0D1B3E] hover:bg-[#52B5BD] text-white font-bold py-3 rounded-xl transition shadow-md text-sm"
          >
            ← Return to Sign In
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#EAF6F7] via-white to-[#EEF2FF] flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-lg">
        <div className="bg-white rounded-3xl shadow-xl shadow-gray-100 p-8 md:p-10">
          <div className="text-center mb-8">
            <img
              src="/Assests/WHY_logo.png"
              alt="Logo"
              className="w-12 mx-auto mb-4"
              onError={(e) => { e.currentTarget.style.display = "none"; }}
            />
            <h1 className="text-2xl font-bold text-[#0D1B3E]">Create Student Account</h1>
            <p className="text-gray-500 text-sm mt-1">Join the WHY Learning & Caregiver Training Portal</p>
          </div>

          {apiError && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-xl mb-5">
              {apiError}
            </div>
          )}

          {/* Google 1-Click Sign Up */}
          <button
            type="button"
            onClick={handleGoogleSignUp}
            disabled={googleLoading || loading}
            className="w-full flex items-center justify-center gap-3 py-3.5 px-4 bg-white border border-gray-300 rounded-xl font-semibold text-gray-700 shadow-sm hover:bg-gray-50 hover:border-gray-400 transition duration-200 disabled:opacity-60 cursor-pointer"
          >
            {googleLoading ? (
              <span className="w-5 h-5 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
            ) : (
              <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
              </svg>
            )}
            <span>Sign up with Google</span>
          </button>

          {/* Divider */}
          <div className="flex items-center my-6">
            <div className="flex-1 border-t border-gray-200"></div>
            <span className="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">or with email</span>
            <div className="flex-1 border-t border-gray-200"></div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Full Name *</label>
              <input
                type="text"
                name="fullName"
                value={form.fullName}
                onChange={handleChange}
                placeholder="e.g. Priya Ramesh"
                autoComplete="name"
                className={inputClass("fullName")}
              />
              {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Email Address *</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="priya@example.com"
                autoComplete="email"
                className={inputClass("email")}
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="+91 98765 43210"
                  autoComplete="tel"
                  className={inputClass("phone")}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Role / Department</label>
                <input
                  type="text"
                  name="department"
                  value={form.department}
                  onChange={handleChange}
                  placeholder="e.g. Caregiver, Nurse"
                  className={inputClass("department")}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Password *</label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Min. 6 characters"
                autoComplete="new-password"
                className={inputClass("password")}
              />
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Confirm Password *</label>
              <input
                type="password"
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
                placeholder="••••••••"
                autoComplete="new-password"
                className={inputClass("confirmPassword")}
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading || googleLoading}
              className="w-full bg-[#0D1B3E] hover:bg-[#52B5BD] text-white font-semibold py-3 rounded-xl transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-4 shadow-md cursor-pointer"
            >
              {loading ? (
                <>
                  <span className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                  Submitting Registration…
                </>
              ) : (
                "Submit Registration for Verification"
              )}
            </button>

            <p className="text-center text-sm text-gray-500 pt-2">
              Already registered?{" "}
              <Link
                to="/learn/login"
                state={location.state}
                className="text-[#0D1B3E] font-semibold hover:text-[#52B5BD] transition"
              >
                Sign In
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}