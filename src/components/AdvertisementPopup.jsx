import { useEffect, useState } from "react";
import { X } from "lucide-react";
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
// browser cache.
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
  const [readyUrls, setReadyUrls] = useState(() => new Set());

  const ad = ads[index] || null;
  const adReady = ad ? readyUrls.has(ad.image_url) : false;

  useEffect(() => {
    loadAdvertisements();
  }, []);

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

  function handleClose(e) {
    if (e) e.stopPropagation();
    setClosing(true);

    if (ad) {
      markAdAsShown(ad.id);
    }

    setTimeout(() => {
      setClosing(false);
      if (index < ads.length - 1) {
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
        (item) => !shownIds.includes(item.id) && item.image_url
      );

      if (unseen.length > 0) {
        const first = unseen[0];
        const { ok } = await preloadImage(first.image_url);

        if (ok) {
          setReadyUrls((prev) => new Set(prev).add(first.image_url));
        }

        setAds(unseen);
        setIndex(0);
        setOpen(true);
      }
    } catch (err) {
      console.error("Advertisement Error:", err);
    } finally {
      setLoading(false);
    }
  }

  if (loading || !open || !ad || !adReady) return null;

  const ImageContent = (
    <img
      src={ad.image_url}
      alt={ad.title || "Advertisement"}
      className="ad-image-pure"
    />
  );

  return (
    <div
      className={`ad-overlay ${closing ? "ad-overlay--closing" : ""}`}
      onClick={handleClose}
    >
      <div
        key={ad.id}
        className={`ad-frame-pure ${closing ? "ad-frame-pure--closing" : ""}`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="ad-close-btn"
          onClick={handleClose}
          aria-label="Close Advertisement"
        >
          <X size={20} />
        </button>

        <div className="ad-image-container">
          {ad.button_link ? (
            <a
              href={ad.button_link}
              target="_blank"
              rel="noreferrer"
              className="ad-link-wrapper"
              title={ad.title || "Click to open link"}
            >
              {ImageContent}
            </a>
          ) : (
            ImageContent
          )}
        </div>
      </div>
    </div>
  );
}