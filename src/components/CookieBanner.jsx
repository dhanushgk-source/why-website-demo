import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const COOKIE_KEY = "cookieConsent";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem(COOKIE_KEY);

    if (!consent) {
      setVisible(true);
      return;
    }

    try {
      const settings = JSON.parse(consent);

      // Example: Initialize analytics only if consent is given
      if (settings.analytics) {
        // initializeGoogleAnalytics();
        // initializeMicrosoftClarity();
      }

      if (settings.marketing) {
        // initializeMetaPixel();
      }
    } catch {
      setVisible(true);
    }
  }, []);

  const saveConsent = (preferences) => {
    localStorage.setItem(COOKIE_KEY, JSON.stringify(preferences));
    setVisible(false);

    // Enable analytics only if accepted
    if (preferences.analytics) {
      // initializeGoogleAnalytics();
      // initializeMicrosoftClarity();
    }

    // Enable marketing only if accepted
    if (preferences.marketing) {
      // initializeMetaPixel();
    }
  };

  const acceptAll = () => {
    saveConsent({
      necessary: true,
      analytics: true,
      marketing: true,
      personalization: true,
      timestamp: new Date().toISOString(),
    });
  };

  const rejectOptional = () => {
    saveConsent({
      necessary: true,
      analytics: false,
      marketing: false,
      personalization: false,
      timestamp: new Date().toISOString(),
    });
  };

  if (!visible) return null;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-[10000] border-t bg-white shadow-2xl pb-[env(safe-area-inset-bottom)]"
      role="dialog"
      aria-labelledby="cookie-title"
      aria-describedby="cookie-description"
    >
      <div className="mx-auto flex max-w-7xl flex-col gap-5 px-6 py-5 md:flex-row md:items-center md:justify-between">

        {/* Text */}
        <div className="max-w-3xl">
          <h2
            id="cookie-title"
            className="mb-2 text-lg font-semibold text-[#1B2A4A]"
          >
            Cookie Preferences
          </h2>

          <p
            id="cookie-description"
            className="text-sm leading-6 text-gray-600"
          >
            We use cookies to improve your experience, remember your
            preferences, and understand how our website is used. Necessary
            cookies are always enabled. You can accept or reject optional
            cookies.
            {" "}
            <Link
              to="/cookie-notice"
              className="font-medium text-[#0D9488] underline"
            >
              Read our Cookie Notice
            </Link>
          </p>
        </div>

        {/* Buttons */}
        <div className="flex flex-col gap-3 sm:flex-row">
          <button
            onClick={rejectOptional}
            aria-label="Reject optional cookies"
            className="rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
          >
            Only Necessary Cookies
          </button>

          <button
            onClick={acceptAll}
            aria-label="Accept all cookies"
            className="rounded-lg bg-[#0D9488] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#0B7E73]"
          >
            Accept All Cookies
          </button>
        </div>

      </div>
    </div>
  );
}