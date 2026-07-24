// ============================================================
// Imports
// ============================================================
import { useEffect, useState, useRef, useMemo, useCallback, memo } from "react";
import {
    MapContainer,
    Marker,
    Popup,
    Tooltip,
    useMap,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// ============================================================
// Helpers
// ============================================================

// Generic debounce — used to coalesce resize events so we don't
// thrash layout state (and therefore Leaflet's invalidateSize) on
// every pixel of a drag-resize.
function debounce(fn, wait) {
    let timeoutId;
    return (...args) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => fn(...args), wait);
    };
}

// Haversine great-circle distance (km) between two lat/lon points
function distanceKm(lat1, lon1, lat2, lon2) {
    const R = 6371; // Earth radius in km
    const toRad = (d) => (d * Math.PI) / 180;
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a =
        Math.sin(dLat / 2) ** 2 +
        Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return Math.round(R * c);
}

function formatDistance(km) {
    return `${km.toLocaleString("en-IN")} km`;
}

// Deterministic color from country name
function getCountryColor(name) {
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
        hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    return COUNTRY_COLORS[Math.abs(hash) % COUNTRY_COLORS.length];
}

// ============================================================
// Icon Helpers
// ============================================================

// Single generic divIcon factory — every marker icon in this file
// (user pin, network dot, WHY Zone pulse) is built from this one
// function instead of three near-identical L.divIcon calls.
function createDivIcon({ html, size, anchor, popupAnchor, className = "" }) {
    return L.divIcon({ className, html, iconSize: size, iconAnchor: anchor, popupAnchor });
}

function buildUserLocationIcon(color) {
    return createDivIcon({
        html: `
          <div style="position:relative;width:28px;height:36px;filter:drop-shadow(0 2px 4px rgba(0,0,0,0.35));">
            <svg viewBox="0 0 24 32" width="28" height="36" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 0C6 0 1 5 1 11c0 8 11 21 11 21s11-13 11-21c0-6-5-11-11-11z"
                    fill="${color}" stroke="white" stroke-width="1.5" />
              <circle cx="12" cy="11" r="4.2" fill="white" />
            </svg>
          </div>
        `,
        size: [28, 36],
        anchor: [14, 36],
        popupAnchor: [0, -32],
    });
}

function buildCountryDotIcon(color) {
    return createDivIcon({
        html: `<span style="display:block;width:12px;height:12px;border-radius:9999px;background:${color};box-shadow:0 0 0 4px rgba(255,255,255,0.25),0 0 8px ${color};border:2px solid white;"></span>`,
        size: [12, 12],
        anchor: [6, 6],
    });
}

function buildWhyZoneIcon() {
    return createDivIcon({
        html: `
          <div style="position:relative;width:22px;height:22px;">
            <span style="position:absolute;inset:0;border-radius:9999px;background:#52B5BD;animation:whyZonePulse 2s ease-out infinite;"></span>
            <span style="position:absolute;inset:0;margin:auto;width:14px;height:14px;border-radius:9999px;background:#52B5BD;border:3px solid white;box-shadow:0 0 12px rgba(82,181,189,0.9);"></span>
          </div>
        `,
        size: [22, 22],
        anchor: [11, 11],
    });
}

// Icons never change at runtime, so build each one exactly once at
// module load and reuse the same instance across every marker that
// needs it (Leaflet icons are safe to share across markers).
const USER_ICON = buildUserLocationIcon("#2F6FED");
const COUNTRY_ICON = buildCountryDotIcon("#2F4A7D");
const WHY_ZONE_ICON = buildWhyZoneIcon();

// ============================================================
// Constants
// ============================================================

const COUNTRY_COLORS = [
    "#2D6A8F", "#3A7D6B", "#7B4F8E", "#8F5C2D", "#2D7B4F",
    "#6B2D8F", "#8F2D4F", "#4F8F2D", "#2D4F8F", "#8F7B2D",
    "#5C8F2D", "#8F2D6B", "#2D8F7B", "#6B8F2D", "#2D8F4F",
    "#8F4F2D", "#2D6B8F", "#8F2D3A", "#3A8F2D", "#2D3A8F",
    "#7B8F2D", "#8F2D7B", "#2D8F6B", "#4F2D8F", "#8F6B2D",
    "#1A5276", "#1D6B4A", "#6C3483", "#784212", "#1E8449",
    "#5B2C6F", "#922B21", "#1A7A4A", "#154360", "#7D6608",
    "#4A235A", "#78281F", "#1A5E20", "#1B2631", "#6E2F17",
];

const INDIA = { city: "India", country: "India", lat: 20.5937, lon: 78.9629 };

// The 12 countries permanently shown connected to India
const GLOBAL_NETWORK_COUNTRIES_BASE = [
    { city: "New York", country: "United States", lat: 40.7128, lon: -74.006 },
    { city: "London", country: "United Kingdom", lat: 51.5072, lon: -0.1276 },
    { city: "Toronto", country: "Canada", lat: 43.6532, lon: -79.3832 },
    { city: "Sydney", country: "Australia", lat: -33.8688, lon: 151.2093 },
    { city: "Dubai", country: "United Arab Emirates", lat: 25.2048, lon: 55.2708 },
    { city: "Singapore", country: "Singapore", lat: 1.3521, lon: 103.8198 },
    { city: "Berlin", country: "Germany", lat: 52.52, lon: 13.405 },
    { city: "Tokyo", country: "Japan", lat: 35.6762, lon: 139.6503 },
    { city: "Beijing", country: "China", lat: 39.9042, lon: 116.4074 },
    { city: "Moscow", country: "Russia", lat: 55.7558, lon: 37.6173 },
    { city: "Riyadh", country: "Saudi Arabia", lat: 24.7136, lon: 46.6753 },
    { city: "Johannesburg", country: "South Africa", lat: -26.2041, lon: 28.0473 },
];

// Precompute distance to India for each network country — computed
// once at module load since the base list never changes at runtime.
const GLOBAL_NETWORK_COUNTRIES = GLOBAL_NETWORK_COUNTRIES_BASE.map((c) => ({
    ...c,
    distanceKm: distanceKm(c.lat, c.lon, INDIA.lat, INDIA.lon),
}));

// Pool used only as a fallback when the visitor is already browsing from India
const RANDOM_WORLD_LOCATIONS = GLOBAL_NETWORK_COUNTRIES;

// Static feature copy — doesn't depend on props/state, so it lives
// outside the component (cheaper than useMemo: computed once ever,
// not once per mount).
const FEATURES = [
    {
        title: "Verified Companion Network",
        desc: "Background-Verified WHY PRO's  Launching Soon in  Bengaluru .",
        iconBg: "#E8F8F9",
        iconColor: "#52B5BD",
    },
    {
        title: "Live Visit Tracking",
        desc: "Receive live updates from your WHY PRO's arrival until the visit is completed.",
        iconBg: "#EAF0FA",
        iconColor: "#2F4A7D",
    },
    {
        title: "Hospital & Travel Assistance",
        desc: "Reliable companionship for hospital  and travel assistance.",
        iconBg: "#FDF0EC",
        iconColor: "#E07A5F",
    },
];

// Primary GeoJSON source plus a CDN mirror fallback
const GEOJSON_URL = "/data/countries.geojson";

// ============================================================
// Utility Functions
// ============================================================

function getRandomWorldLocation() {
    return RANDOM_WORLD_LOCATIONS[Math.floor(Math.random() * RANDOM_WORLD_LOCATIONS.length)];
}

function getResponsiveMapHeight() {
    if (window.innerWidth < 640) return 320;
    if (window.innerWidth < 1024) return 420;
    return 600;
}

// ============================================================
// Leaflet Components
// ============================================================

function FitBounds({ points, height }) {
    const map = useMap();
    const prevHeightRef = useRef(height);

    useEffect(() => {
        // The container height changes via React state (mobile/tablet/desktop
        // breakpoints), but Leaflet caches its own internal size and doesn't
        // know the DOM element resized unless told explicitly. Without this,
        // the map keeps using its stale size, so fitBounds miscalculates and
        // content ends up shifted/clipped (e.g. crammed at the bottom on mobile).
        // invalidateSize is a forced reflow, so it's only called when the
        // height actually changed rather than on every points update.
        const heightChanged = prevHeightRef.current !== height;
        prevHeightRef.current = height;

        const id = requestAnimationFrame(() => {
            if (heightChanged) map.invalidateSize();
            const bounds = L.latLngBounds(points.map((p) => [p.lat, p.lon]));
            map.fitBounds(bounds, { padding: [50, 50], maxZoom: 3 });
        });
        return () => cancelAnimationFrame(id);
    }, [map, points, height]);

    return null;
}

function GeoJSONLayer({ userCountry, networkCountries }) {
    const map = useMap();
    const layerRef = useRef(null);

    const networkNames = useMemo(
        () => networkCountries.map((c) => c.country.toLowerCase()),
        [networkCountries]
    );

    useEffect(() => {
        let cancelled = false;

        function styleFn(feature) {
            const name = feature.properties.ADMIN || feature.properties.name || "";
            const lower = name.toLowerCase();
            const isUserCountry = lower === userCountry.toLowerCase();
            const isIndia = lower === "india";
            const isNetworkCountry = networkNames.includes(lower);
            return {
                fillColor: isIndia
                    ? "#52B5BD"
                    : isUserCountry
                        ? "#2F4A7D"
                        : isNetworkCountry
                            ? "#5C7FA8"
                            : getCountryColor(name),
                fillOpacity: isIndia ? 0.9 : isUserCountry || isNetworkCountry ? 0.75 : 0.55,
                color: "#0d3d5c",
                weight: 0.6,
                opacity: 1,
            };
        }

        // Try each source in order; only fall through to the next on failure.
        async function loadFromSources() {
            try {
                const res = await fetch(GEOJSON_URL);

                if (!res.ok) {
                    throw new Error(`HTTP ${res.status}`);
                }

                const data = await res.json();

                if (cancelled) return;

                if (layerRef.current) {
                    layerRef.current.remove();
                }

                layerRef.current = L.geoJSON(data, {
                    style: styleFn,
                    interactive: false,
                }).addTo(map);

            } catch (err) {
                console.error("Failed to load countries.geojson", err);
            }
        }

        loadFromSources();

        return () => {
            cancelled = true;
            if (layerRef.current) layerRef.current.remove();
        };
    }, [map, userCountry, networkNames]);

    return null;
}

// Memoized — country markers are static per country object, so this
// never needs to re-render once the network list is mounted.
const NetworkCountryMarker = memo(function NetworkCountryMarker({ country }) {
    return (
        <Marker position={[country.lat, country.lon]} icon={COUNTRY_ICON}>
            <Popup>
                <div className="text-center">
                    <h3 className="font-bold text-[#2F4A7D]">{country.country}</h3>
                    <p className="text-xs text-gray-500 mb-1">Connected to your WHY Zone</p>
                    <p className="text-xs font-semibold text-[#52B5BD]">{formatDistance(country.distanceKm)} to India</p>
                </div>
            </Popup>
        </Marker>
    );
});

// ============================================================
// Animated Components
// ============================================================

// Single reusable animated dashed-line renderer — replaces the two
// near-identical AnimatedPolyline / AnimatedNetworkLines components.
// Accepts a list of line configs and drives them all off one shared
// requestAnimationFrame loop instead of one loop per line group.
function AnimatedLines({ lines }) {
    const map = useMap();
    const frameRef = useRef(null);
    const offsetRef = useRef(0);
    const linesRef = useRef([]);

    useEffect(() => {
        linesRef.current = lines.map(
            ({ positions, color, weight = 2.5, opacity = 1, dashArray = "12 14" }) =>
                L.polyline(positions, { color, weight, opacity, dashArray, dashOffset: "0" }).addTo(map)
        );

        function animate() {
            offsetRef.current -= 1;
            const offset = String(offsetRef.current);
            linesRef.current.forEach((line) => line.setStyle({ dashOffset: offset }));
            frameRef.current = requestAnimationFrame(animate);
        }
        frameRef.current = requestAnimationFrame(animate);

        return () => {
            cancelAnimationFrame(frameRef.current);
            linesRef.current.forEach((line) => line.remove());
            linesRef.current = [];
        };
    }, [map, lines]);

    return null;
}

// ============================================================
// Main Component
// ============================================================

export default function WorldMap() {
    const [user, setUser] = useState({
        city: "New York",
        country: "United States",
        lat: 40.7128,
        lon: -74.006,
    });
    const [isIndiaVisitor, setIsIndiaVisitor] = useState(false);
    const [mapHeight, setMapHeight] = useState(500);
    const [isVisible, setIsVisible] = useState(false);
    const rightPanelRef = useRef(null);

    // ---- Responsive map height (debounced resize) ----
    useEffect(() => {
        function updateHeight() {
            setMapHeight(getResponsiveMapHeight());
        }
        updateHeight();

        const debouncedUpdate = debounce(updateHeight, 150);
        window.addEventListener("resize", debouncedUpdate);
        return () => window.removeEventListener("resize", debouncedUpdate);
    }, []);

    // ---- Visitor geolocation ----
    const loadLocation = useCallback(async () => {
        try {
            const res = await fetch("https://ipwho.is/");
            const data = await res.json();
            if (!data.success) return;

            const isIndia = data.country_code === "IN" || data.country?.toLowerCase() === "india";

            if (isIndia) {
                setIsIndiaVisitor(true);
                setUser(getRandomWorldLocation());
            } else {
                const { latitude: lat, longitude: lon } = data;
                setIsIndiaVisitor(false);
                setUser({
                    city: data.city,
                    country: data.country,
                    lat,
                    lon,
                    distanceKm: distanceKm(lat, lon, INDIA.lat, INDIA.lon),
                });
            }
        } catch (err) {
            console.log(err);
        }
    }, []);

    useEffect(() => {
        loadLocation();
    }, [loadLocation]);

    // ---- Reveal-on-scroll ----
    useEffect(() => {
        const el = rightPanelRef.current;
        if (!el) return;
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.1 }
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    const innerMapHeight = mapHeight - 24;

    // ---- Derived/memoized values ----
    const allBoundsPoints = useMemo(
        () => [...GLOBAL_NETWORK_COUNTRIES, INDIA, user],
        [user]
    );

    const userDistance = useMemo(
        () => user.distanceKm ?? distanceKm(user.lat, user.lon, INDIA.lat, INDIA.lon),
        [user]
    );

    const animatedLines = useMemo(() => {
        const networkLines = GLOBAL_NETWORK_COUNTRIES.map((c) => ({
            positions: [[c.lat, c.lon], [INDIA.lat, INDIA.lon]],
            color: "#8FA9C7",
            weight: 1.5,
            opacity: 0.7,
            dashArray: "6 9",
        }));
        const userLine = {
            positions: [[user.lat, user.lon], [INDIA.lat, INDIA.lon]],
            color: "#52B5BD",
            weight: 2.5,
            opacity: 1,
            dashArray: "12 14",
        };
        return [...networkLines, userLine];
    }, [user]);

    return (
        <section className="relative w-full px-3 sm:px-6 lg:px-8 py-16 sm:py-20 overflow-hidden bg-[#F8F3EA]">

            <style>{`
              @keyframes whyZonePulse {
                0% { transform: scale(1); opacity: 0.7; }
                70% { transform: scale(2.4); opacity: 0; }
                100% { transform: scale(2.4); opacity: 0; }
              }
              .why-zone-tooltip {
                background: #1B2A4A !important;
                color: #fff !important;
                border: none !important;
                border-radius: 9999px !important;
                padding: 4px 12px !important;
                font-size: 11px !important;
                font-weight: 700 !important;
                box-shadow: 0 4px 10px rgba(0,0,0,0.2) !important;
              }
              .why-zone-tooltip::before { border-top-color: #1B2A4A !important; }
            `}</style>

            {/* Decorative blobs */}
            <div className="absolute top-0 right-0 w-72 h-72 rounded-full bg-[#F2C89F]/30 translate-x-1/3 -translate-y-1/3 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-[#F2C89F]/25 -translate-x-1/4 translate-y-1/4 pointer-events-none" />

            <div className="hidden md:grid absolute top-10 left-10 grid-cols-6 gap-2 opacity-40 pointer-events-none">
                {Array.from({ length: 24 }).map((_, i) => (
                    <span key={i} className="w-1 h-1 rounded-full bg-[#C9A96A]" />
                ))}
            </div>

            <div className="hidden md:grid absolute bottom-10 right-10 grid-cols-6 gap-2 opacity-40 pointer-events-none">
                {Array.from({ length: 24 }).map((_, i) => (
                    <span key={i} className="w-1 h-1 rounded-full bg-[#C9A96A]" />
                ))}
            </div>

            <svg
                className="hidden lg:block absolute -bottom-8 left-0 w-56 h-64 text-[#BFDAD4] opacity-70 pointer-events-none"
                viewBox="0 0 200 220"
                fill="none"
            >
                <path d="M10 210 C 40 160, 60 120, 100 60" stroke="currentColor" strokeWidth="2" />
                <ellipse cx="30" cy="180" rx="18" ry="10" fill="currentColor" opacity="0.6" transform="rotate(-35 30 180)" />
                <ellipse cx="55" cy="150" rx="20" ry="11" fill="currentColor" opacity="0.6" transform="rotate(-30 55 150)" />
                <ellipse cx="80" cy="110" rx="18" ry="10" fill="currentColor" opacity="0.6" transform="rotate(-25 80 110)" />
                <ellipse cx="95" cy="75" rx="16" ry="9" fill="currentColor" opacity="0.6" transform="rotate(-20 95 75)" />
            </svg>

            <div className="relative max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-center z-10">

                {/* LEFT — Content */}
                <div
                    ref={rightPanelRef}
                    style={{
                        opacity: isVisible ? 1 : 0,
                        transform: isVisible ? "translateY(0)" : "translateY(28px)",
                        transition: "opacity 0.6s ease, transform 0.6s ease",
                    }}
                    className="order-1 lg:order-1 flex flex-col justify-center px-1 sm:px-4 lg:px-8 xl:px-14 py-6 sm:py-8 lg:py-0"
                >
                    <span
                        className="inline-flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold mb-4 sm:mb-6 bg-white shadow-sm w-fit"
                        style={{ color: "#2F8F8A" }}
                    >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2F8F8A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="9" />
                            <path d="M2 12h20" />
                            <path d="M12 3c2.5 2.5 4 5.5 4 9s-1.5 6.5-4 9c-2.5-2.5-4-5.5-4-9s1.5-6.5 4-9z" />
                        </svg>
                        Care Beyond Borders
                    </span>

                    <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-3 sm:mb-5 tracking-tight" style={{ color: "#1B2A4A" }}>
                        Stay Close to Your Parents,
                        <br />
                        {isIndiaVisitor ? (
                            <span style={{ color: "#52B5BD" }}>
                                Wherever You Are.
                            </span>
                        ) : (
                            <span style={{ color: "#52B5BD" }}>
                                Even from {user.country}.
                            </span>
                        )}
                    </h1>

                    <p className="text-base sm:text-lg leading-relaxed mb-2 sm:mb-3" style={{ color: "#6a7f96" }}>
                        <span className="bg-[#F2C89F]/40 font-semibold px-1 rounded-sm box-decoration-clone" style={{ color: "#1a2a3a" }}>
                            Distance may separate families, but it should never separate care.
                        </span>{" "}
                        {isIndiaVisitor ? (
                            <>
                                Whether you're living abroad or in another city, <strong style={{ color: "#1a2a3a" }}>WHY</strong> connects your parents with trusted, background-verified WHY PRO's across India—keeping you informed, reassured, and connected every step of the way.
                            </>
                        ) : (
                            <>
                                Whether you're currently living in{" "}
                                <strong style={{ color: "#1a2a3a" }}>{user.city}, {user.country}</strong>, <strong style={{ color: "#1a2a3a" }}>WHY</strong> connects your parents with trusted, background-verified WHY PRO's across India—keeping you informed, reassured, and connected every step of the way.
                            </>
                        )}
                    </p>

                    <div className="space-y-3 sm:space-y-5 mb-6 sm:mb-10">
                        {FEATURES.map((f, i) => (
                            <div
                                key={f.title}
                                className="flex items-start gap-3 sm:gap-4"
                                style={{
                                    opacity: isVisible ? 1 : 0,
                                    transform: isVisible ? "translateY(0)" : "translateY(16px)",
                                    transition: `opacity 0.5s ease ${0.2 + i * 0.1}s, transform 0.5s ease ${0.2 + i * 0.1}s`,
                                }}
                            >
                                <div
                                    className="w-8 h-8 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                                    style={{ background: f.iconBg, color: f.iconColor }}
                                >
                                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                        <polyline points="20 6 9 17 4 12" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="font-semibold text-base sm:text-lg" style={{ color: "#1a2a3a" }}>{f.title}</p>
                                    <p className="text-sm sm:text-base mt-0.5" style={{ color: "#8a9ab0" }}>{f.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* RIGHT — Map */}
                <div
                    className="order-2 lg:order-2 relative rounded-[24px] sm:rounded-[35px] overflow-hidden shadow-xl"
                    style={{
                        padding: "12px",
                        height: `${mapHeight}px`,
                        background: "#1a6a9a",
                    }}
                >
                    <MapContainer
                        center={[20, 40]}
                        zoom={2}
                        attributionControl={false}
                        scrollWheelZoom={false}
                        dragging={false}
                        doubleClickZoom={false}
                        zoomControl={false}
                        touchZoom={false}
                        boxZoom={false}
                        keyboard={false}
                        tap={false}
                        style={{
                            width: "100%",
                            height: `${innerMapHeight}px`,
                            borderRadius: "22px",
                            pointerEvents: "none",
                            background: "#1a6a9a",
                        }}
                    >
                        <FitBounds points={allBoundsPoints} height={mapHeight} />
                        <GeoJSONLayer userCountry={user.country} networkCountries={GLOBAL_NETWORK_COUNTRIES} />

                        {/* 12 countries connected to India + the visitor's line, one shared animation loop */}
                        <AnimatedLines lines={animatedLines} />

                        {GLOBAL_NETWORK_COUNTRIES.map((c) => (
                            <NetworkCountryMarker key={c.country} country={c} />
                        ))}

                        {/* Personalized visitor marker */}
                        <Marker position={[user.lat, user.lon]} icon={USER_ICON}>
                            <Popup>
                                <div className="text-center">
                                    <h3 className="font-bold text-blue-600">Your Location</h3>
                                    <p>{user.city}</p>
                                    <p>{user.country}</p>
                                    <p className="text-xs font-semibold text-[#52B5BD] mt-1">{formatDistance(userDistance)} to India</p>
                                </div>
                            </Popup>
                        </Marker>

                        {/* India — the WHY Zone */}
                        <Marker position={[INDIA.lat, INDIA.lon]} icon={WHY_ZONE_ICON}>
                            <Tooltip permanent direction="top" offset={[0, -10]} className="why-zone-tooltip">
                                🇮🇳 WHY Zone
                            </Tooltip>
                            <Popup>
                                <div className="text-center">
                                    <h3 className="font-bold text-[#52B5BD]">WHY Zone</h3>
                                    <p>India</p>
                                    <p className="text-green-600 font-semibold">Companion Assigned ✓</p>
                                </div>
                            </Popup>
                        </Marker>
                    </MapContainer>

                    {/* Legend dots */}
                    <div className="absolute top-4 left-4 sm:top-6 sm:left-6 z-[999] flex items-center gap-2">
                        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl sm:rounded-2xl px-3 py-1.5 sm:px-4 sm:py-2.5 flex items-center gap-2">
                            <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#2F4A7D] shadow-[0_0_6px_#2F4A7D]"></span>
                            <span className="text-white text-[10px] sm:text-xs font-medium truncate max-w-[80px] sm:max-w-none">{user.country}</span>
                        </div>
                        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl sm:rounded-2xl px-3 py-1.5 sm:px-4 sm:py-2.5 flex items-center gap-2">
                            <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#52B5BD] shadow-[0_0_6px_#52B5BD]"></span>
                            <span className="text-white text-[10px] sm:text-xs font-medium">WHY Zone</span>
                        </div>
                    </div>

                    {/* Live Tracking Badge */}
                    <div className="hidden sm:block absolute bottom-4 left-4 sm:bottom-6 sm:left-6 z-[999] bg-white rounded-xl sm:rounded-2xl shadow-xl px-3 py-2 sm:px-5 sm:py-3">
                        <div className="flex items-center gap-2 sm:gap-3">
                            <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-green-500 animate-pulse flex-shrink-0"></span>
                            <div>
                                <p className="font-semibold text-xs sm:text-sm leading-tight" style={{ color: "#1a2a3a" }}> Live Visit Tracking</p>
                                <p className="text-[10px] sm:text-xs" style={{ color: "#8a9ab0" }}>Companion en route</p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
}