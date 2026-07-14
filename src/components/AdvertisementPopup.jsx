import { useEffect, useState } from "react";
import { X, Sparkles, ArrowRight } from "lucide-react";
import { getAdvertisements } from "../services/advertisementService";
import "../styles/advertisement.css";

const SHOWN_ADS_KEY = "why_shown_ad_ids";

function getShownAdIds() {
  try {
    const raw = sessionStorage.getItem(SHOWN_ADS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function markAdAsShown(id) {
  try {
    const shown = getShownAdIds();

    if (!shown.includes(id)) {
      sessionStorage.setItem(
        SHOWN_ADS_KEY,
        JSON.stringify([...shown, id])
      );
    }
  } catch {
    // sessionStorage unavailable (private mode, etc) — fail silently
  }
}

// Preloads a single image and resolves once it's actually loaded in the
// browser cache. Resolves (doesn't reject) even on error so one broken
// image url can't block anything downstream.
function preloadImage(url) {
  return new Promise((resolve) => {
    if (!url) {
      resolve({ url, ok: false });
      return;
    }
    const img = new Image();
    img.onload = () => resolve({ url, ok: true });
    img.onerror = () => resolve({ url, ok: false });
    img.src = url;
  });
}

export default function AdvertisementPopup() {
  const [loading, setLoading] = useState(true);
  const [ads, setAds] = useState([]);
  const [index, setIndex] = useState(0);
  const [open, setOpen] = useState(false);
  const [closing, setClosing] = useState(false);
  // Tracks which ad image_urls have finished preloading, so we only
  // render an <img> once its src is actually cache-ready.
  const [readyUrls, setReadyUrls] = useState(() => new Set());

  const ad = ads[index] || null;
  const adReady = ad ? readyUrls.has(ad.image_url) : false;

  useEffect(() => {
    loadAdvertisements();
  }, []);

  // Once the current ad's image is ready, start preloading the *next*
  // one in the background so it's ready by the time the user advances.
  useEffect(() => {
    const next = ads[index + 1];
    if (next?.image_url) {
      preloadImage(next.image_url).then(({ url, ok }) => {
        if (ok) {
          setReadyUrls((prev) => new Set(prev).add(url));
        }
      });
    }
  }, [index, ads]);

  function handleClose() {
    setClosing(true);

    if (ad) {
      markAdAsShown(ad.id);
    }

    setTimeout(() => {
      setClosing(false);

      if (index < ads.length - 1) {
        // Show the next unseen ad in the list
        setIndex((prev) => prev + 1);
      } else {
        setOpen(false);
      }
    }, 250);
  }

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  async function loadAdvertisements() {
    try {
      const result = await getAdvertisements();
      const shownIds = getShownAdIds();

      const unseen = result.filter(
        (item) => !shownIds.includes(item.id)
      );

      if (unseen.length > 0) {
        // Only block on the FIRST ad's image so the popup appears quickly.
        const first = unseen[0];
        const { ok } = await preloadImage(first.image_url);

        if (ok) {
          setReadyUrls((prev) => new Set(prev).add(first.image_url));
        }

        setAds(unseen); // Backend already returns priority order
        setIndex(0);
        setOpen(true);
      }
    } catch (err) {
      console.error("Advertisement Error:", err);
    } finally {
      setLoading(false);
    }
  }

  // Don't render the popup at all until we have an ad AND its image is ready.
  if (loading || !open || !ad || !adReady) return null;

  return (
    <div
      className={`ad-overlay ${closing ? "ad-overlay--closing" : ""}`}
      onClick={handleClose}
    >
      <div
        key={ad.id}
        className={`ad-frame ${closing ? "ad-frame--closing" : ""}`}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="ad-close" onClick={handleClose} aria-label="Close">
          <X size={20} />
        </button>

        <div className="ad-popup">
          <div className="ad-media">
            <img src={ad.image_url} alt={ad.title} className="ad-image" />
            <span className="ad-badge">
              <Sparkles size={13} />
              {ad.badge || "Special Offer"}
            </span>
          </div>

          <div className="ad-content">
            <h2>{ad.title}</h2>

            {ad.subtitle && <h4>{ad.subtitle}</h4>}

            <p>{ad.description}</p>

            {ad.button_link && (
              <a
                href={ad.button_link}
                target="_blank"
                rel="noreferrer"
                className="ad-button"
              >
                <span>{ad.button_text || "Learn More"}</span>
                <ArrowRight size={18} className="ad-button-icon" />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}