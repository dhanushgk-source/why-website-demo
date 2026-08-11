import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { signInWithGoogle } from "../../config/firebase";

export default function LearnLogin() {
  const { login, loginWithFirebase } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/learn";

  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isPending, setIsPending] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const handleChange = (e) => {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
    setError("");
    setIsPending(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      setError("Please fill in all fields.");
      return;
    }
    setLoading(true);
    setIsPending(false);
    try {
      await login(form.email, form.password);
      navigate(from, { replace: true });
    } catch (err) {
      const msg =
        err.response?.data?.message ||
        err.response?.data?.error ||
        "Invalid email or password.";
      setError(msg);
      if (
        err.response?.data?.pendingApproval ||
        msg.toLowerCase().includes("pending admin approval") ||
        msg.toLowerCase().includes("pending admin verification")
      ) {
        setIsPending(true);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError("");
    setIsPending(false);
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
        navigate(from, { replace: true });
        return;
      }

      if (res?.pendingApproval) {
        setIsPending(true);
        setError(
          res.message ||
            "Your Google account has been registered and is awaiting administrator verification."
        );
      }
    } catch (err) {
      console.error("Google login error:", err);
      if (err.code === "auth/popup-closed-by-user") {
        setError("Sign-in popup was closed before completing. Please try again.");
      } else if (err.code === "auth/configuration-not-found") {
        setError("Google Sign-In is not enabled yet in your Firebase Console. Please go to Firebase Console > Authentication > Sign-in method and enable Google.");
      } else if (err.code === "auth/unauthorized-domain") {
        setError("This domain is not authorized in Firebase. Please add your domain (e.g. localhost) in Firebase Console > Authentication > Settings > Authorized domains.");
      } else {
        const msg =
          err.response?.data?.message || err.message || "Google sign in failed.";
        setError(msg);
        if (
          err.response?.data?.pendingApproval ||
          msg.toLowerCase().includes("pending admin approval") ||
          msg.toLowerCase().includes("pending admin verification")
        ) {
          setIsPending(true);
        }
      }
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#EAF6F7] via-white to-[#EEF2FF] flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-3xl shadow-xl shadow-gray-100 p-8 md:p-10">
          <div className="text-center mb-8">
            <img
              src="/Assests/WHY_logo.png"
              alt="Logo"
              className="w-12 mx-auto mb-4"
              onError={(e) => { e.currentTarget.style.display = "none"; }}
            />
            <h1 className="text-2xl font-bold text-[#0D1B3E]">Welcome Back</h1>
            <p className="text-gray-500 text-sm mt-1">
              Sign in to your learning dashboard
            </p>
          </div>

          {/* Pending Approval / Error State */}
          {error && (
            <div
              className={`text-sm px-4 py-3.5 rounded-xl border mb-5 leading-relaxed ${
                isPending
                  ? "bg-amber-50 border-amber-200 text-amber-900"
                  : "bg-red-50 border-red-200 text-red-600"
              }`}
            >
              {isPending && (
                <div className="font-bold flex items-center gap-1.5 mb-1 text-amber-900">
                  <span>⏳</span> Account Pending Verification
                </div>
              )}
              {error}
              {isPending && (
                <p className="text-xs text-amber-800 mt-2 font-medium">
                  An administrator has been notified. Once approved, you can log in immediately.
                </p>
              )}
            </div>
          )}

          {/* Google 1-Click Sign In */}
          <button
            type="button"
            onClick={handleGoogleSignIn}
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
            <span>Continue with Google</span>
          </button>

          {/* Divider */}
          <div className="flex items-center my-6">
            <div className="flex-1 border-t border-gray-200"></div>
            <span className="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">or sign in with password</span>
            <div className="flex-1 border-t border-gray-200"></div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Email address
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
                autoComplete="email"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#52B5BD] focus:ring-2 focus:ring-[#52B5BD]/20 transition text-sm"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <Link
                  to="/learn/forgot-password"
                  className="text-xs text-[#0D1B3E] hover:text-[#52B5BD] transition font-medium"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  autoComplete="current-password"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#52B5BD] focus:ring-2 focus:ring-[#52B5BD]/20 transition text-sm pr-11"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
                  tabIndex={-1}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading || googleLoading}
              className="w-full bg-[#0D1B3E] hover:bg-[#52B5BD] text-white font-semibold py-3 rounded-xl transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer shadow-md mt-2"
            >
              {loading ? (
                <>
                  <span className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                  Signing in…
                </>
              ) : (
                "Sign In"
              )}
            </button>

            <p className="text-center text-sm text-gray-500 pt-2">
              Don't have an account?{" "}
              <Link
                to="/learn/register"
                state={location.state}
                className="text-[#0D1B3E] font-semibold hover:text-[#52B5BD] transition"
              >
                Create Account
              </Link>
            </p>
          </form>
        </div>
        <p className="text-center text-sm text-gray-400 mt-6">
          <Link to="/" className="hover:text-[#52B5BD] transition-colors duration-200">
            ← Back to home
          </Link>
        </p>
      </div>
    </div>
  );
}