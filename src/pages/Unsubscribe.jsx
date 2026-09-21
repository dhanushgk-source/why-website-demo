import React, { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";

export default function Unsubscribe() {
  const [searchParams] = useSearchParams();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null); // { success: boolean, message: string }

  useEffect(() => {
    const urlEmail = searchParams.get("email");
    if (urlEmail) {
      setEmail(urlEmail);
    }
  }, [searchParams]);

  const handleUnsubscribe = async (e) => {
    if (e) e.preventDefault();
    if (!email || !email.trim()) {
      setStatus({ success: false, message: "Please enter a valid email address." });
      return;
    }

    setLoading(true);
    setStatus(null);

    try {
      const response = await fetch("/api/blog/unsubscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setStatus({
          success: true,
          message: data.message || "You have been unsubscribed successfully. Your email has been removed from our database.",
        });
      } else {
        setStatus({
          success: false,
          message: data.message || "Failed to unsubscribe. Please check your email or try again.",
        });
      }
    } catch (err) {
      console.error("Unsubscribe error:", err);
      setStatus({
        success: false,
        message: "Network error occurred while unsubscribing. Please try again later.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-slate-800/90 backdrop-blur-md rounded-2xl p-8 border border-slate-700/60 shadow-2xl">
        <div className="text-center mb-6">
          <Link to="/" className="inline-block mb-4">
            <span className="text-2xl font-black text-white tracking-tight">
              WHY <span className="text-[#52B5BD]">- We Help You</span>
            </span>
          </Link>
          <div className="text-xs uppercase tracking-widest text-[#52B5BD] font-bold">
            YOUR TRUSTED COMPANION
          </div>
          <h1 className="text-xl font-bold text-white mt-4">
            Newsletter Unsubscribe
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            We're sorry to see you go. Enter your email below to unsubscribe from WHY Services updates.
          </p>
        </div>

        {status?.success ? (
          <div className="bg-emerald-950/60 border border-emerald-500/40 rounded-xl p-5 text-center">
            <div className="w-12 h-12 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-3">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-lg font-bold text-emerald-400 mb-1">Successfully Unsubscribed</h2>
            <p className="text-sm text-emerald-200/90 leading-relaxed mb-4">
              {status.message}
            </p>
            <p className="text-xs text-slate-400 mb-4">
              Your record has been completely deleted from our backend subscriber list.
            </p>
            <Link
              to="/newsletter"
              className="inline-block px-5 py-2.5 bg-slate-700 hover:bg-slate-600 text-white rounded-lg text-xs font-semibold transition"
            >
              Back to WHY Newsletter
            </Link>
          </div>
        ) : (
          <form onSubmit={handleUnsubscribe} className="space-y-4">
            {status && !status.success && (
              <div className="bg-rose-950/60 border border-rose-500/40 rounded-lg p-3 text-xs text-rose-300">
                {status.message}
              </div>
            )}

            <div>
              <label htmlFor="unsubscribe-email" className="block text-xs font-semibold text-slate-300 mb-1.5">
                Subscriber Email Address
              </label>
              <input
                id="unsubscribe-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full px-4 py-3 bg-slate-900/80 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-[#52B5BD] text-sm"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-gradient-to-r from-rose-600 to-red-700 hover:from-rose-500 hover:to-red-600 text-white font-bold rounded-xl transition shadow-lg shadow-rose-950/50 disabled:opacity-50 text-sm flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Processing Unsubscribe...</span>
                </>
              ) : (
                <span>Unsubscribe & Remove My Data</span>
              )}
            </button>

            <div className="text-center pt-2">
              <Link to="/newsletter" className="text-xs text-slate-400 hover:text-[#52B5BD] transition">
                Changed your mind? Return to Newsletter page
              </Link>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
