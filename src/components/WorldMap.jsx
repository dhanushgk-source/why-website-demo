import { useEffect, useState, useRef } from "react";
import {
    MapContainer,
    Marker,
    Popup,
    useMap,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Markers
const blueIcon = new L.Icon({
    iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png",
    shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
    iconSize: [28, 44],
    iconAnchor: [14, 44],
});

const greenIcon = new L.Icon({
    iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png",
    shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
    iconSize: [28, 44],
    iconAnchor: [14, 44],
});

// Deterministic color from country name
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

function getCountryColor(name) {
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
        hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    return COUNTRY_COLORS[Math.abs(hash) % COUNTRY_COLORS.length];
}

// Pool of world locations used when the visitor is browsing from India —
// a random one is picked so the map points somewhere different each time.
const RANDOM_WORLD_LOCATIONS = [
    { city: "New York", country: "United States", lat: 40.7128, lon: -74.006 },
    { city: "London", country: "United Kingdom", lat: 51.5072, lon: -0.1276 },
    { city: "Toronto", country: "Canada", lat: 43.6532, lon: -79.3832 },
    { city: "Sydney", country: "Australia", lat: -33.8688, lon: 151.2093 },
    { city: "Dubai", country: "United Arab Emirates", lat: 25.2048, lon: 55.2708 },
    { city: "Singapore", country: "Singapore", lat: 1.3521, lon: 103.8198 },
    { city: "Berlin", country: "Germany", lat: 52.52, lon: 13.405 },
    { city: "Auckland", country: "New Zealand", lat: -36.8485, lon: 174.7633 },
    { city: "Tokyo", country: "Japan", lat: 35.6762, lon: 139.6503 },
    { city: "Paris", country: "France", lat: 48.8566, lon: 2.3522 },
    { city: "San Francisco", country: "United States", lat: 37.7749, lon: -122.4194 },
    { city: "Muscat", country: "Oman", lat: 23.588, lon: 58.3829 },
];

function getRandomWorldLocation() {
    return RANDOM_WORLD_LOCATIONS[Math.floor(Math.random() * RANDOM_WORLD_LOCATIONS.length)];
}

function FitBounds({ user, india }) {
    const map = useMap();
    useEffect(() => {
        map.fitBounds(
            [[user.lat, user.lon], [india.lat, india.lon]],
            { padding: [60, 60], maxZoom: 4 }
        );
    }, [map, user, india]);
    return null;
}

function AnimatedPolyline({ positions }) {
    const map = useMap();
    const frameRef = useRef(null);
    const offsetRef = useRef(0);

    useEffect(() => {
        const line = L.polyline(positions, {
            color: "#52B5BD",
            weight: 2.5,
            opacity: 1,
            dashArray: "12 14",
            dashOffset: "0",
        }).addTo(map);

        function animate() {
            offsetRef.current -= 1;
            line.setStyle({ dashOffset: String(offsetRef.current) });
            frameRef.current = requestAnimationFrame(animate);
        }
        frameRef.current = requestAnimationFrame(animate);

        return () => {
            cancelAnimationFrame(frameRef.current);
            line.remove();
        };
    }, [map, positions]);

    return null;
}

function GeoJSONLayer({ userCountry }) {
    const map = useMap();
    const layerRef = useRef(null);

    useEffect(() => {
        fetch("https://raw.githubusercontent.com/datasets/geo-countries/master/data/countries.geojson")
            .then((r) => r.json())
            .then((data) => {
                if (layerRef.current) layerRef.current.remove();
                const layer = L.geoJSON(data, {
                    style: (feature) => {
                        const name = feature.properties.ADMIN || feature.properties.name || "";
                        const isUserCountry = name.toLowerCase() === userCountry.toLowerCase();
                        const isIndia = name.toLowerCase() === "india";
                        return {
                            fillColor: isIndia
                                ? "#52B5BD"
                                : isUserCountry
                                ? "#2F4A7D"
                                : getCountryColor(name),
                            fillOpacity: isIndia || isUserCountry ? 0.85 : 0.65,
                            color: "#0d3d5c",
                            weight: 0.6,
                            opacity: 1,
                        };
                    },
                    interactive: false,
                }).addTo(map);
                layerRef.current = layer;
            })
            .catch(console.error);

        return () => {
            if (layerRef.current) layerRef.current.remove();
        };
    }, [map, userCountry]);

    return null;
}

const features = [
    {
        title: "Verified Companion Network",
        desc: "Background-verified companions available across major cities in India.",
        iconBg: "#E8F8F9",
        iconColor: "#52B5BD",
    },
    {
        title: "Live Visit Tracking",
        desc: "Receive live updates from arrival to visit completion.",
        iconBg: "#EAF0FA",
        iconColor: "#2F4A7D",
    },
    {
        title: "Hospital, Travel & Daily Support",
        desc: "Reliable companionship for appointments, travel, errands, and everyday assistance.",
        iconBg: "#FDF0EC",
        iconColor: "#E07A5F",
    },
];

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

    // Responsive map height
    useEffect(() => {
        function updateHeight() {
            if (window.innerWidth < 640) {
                setMapHeight(320);
            } else if (window.innerWidth < 1024) {
                setMapHeight(420);
            } else {
                setMapHeight(600);
            }
        }
        updateHeight();
        window.addEventListener("resize", updateHeight);
        return () => window.removeEventListener("resize", updateHeight);
    }, []);

    useEffect(() => {
        async function loadLocation() {
            try {
                const res = await fetch("https://ipwho.is/");
                const data = await res.json();
                if (data.success) {
                    const isIndia =
                        data.country_code === "IN" ||
                        data.country?.toLowerCase() === "india";

                    if (isIndia) {
                        // Visitor is already in India — point to a random
                        // location anywhere else in the world instead.
                        setIsIndiaVisitor(true);
                        setUser(getRandomWorldLocation());
                    } else {
                        setIsIndiaVisitor(false);
                        setUser({
                            city: data.city,
                            country: data.country,
                            lat: data.latitude,
                            lon: data.longitude,
                        });
                    }
                }
            } catch (err) {
                console.log(err);
            }
        }
        loadLocation();
    }, []);

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

    const india = { city: "India", country: "India", lat: 20.5937, lon: 78.9629 };
    const innerMapHeight = mapHeight - 24; // subtract 12px padding top + bottom

    return (
        <section className="relative w-full px-3 sm:px-6 lg:px-8 py-16 sm:py-20 overflow-hidden bg-[#F8F3EA]">

            {/* Decorative blobs */}
            <div className="absolute top-0 right-0 w-72 h-72 rounded-full bg-[#F2C89F]/30 translate-x-1/3 -translate-y-1/3 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-[#F2C89F]/25 -translate-x-1/4 translate-y-1/4 pointer-events-none" />

            {/* Decorative dot grid - top left */}
            <div className="hidden md:grid absolute top-10 left-10 grid-cols-6 gap-2 opacity-40 pointer-events-none">
                {Array.from({ length: 24 }).map((_, i) => (
                    <span key={i} className="w-1 h-1 rounded-full bg-[#C9A96A]" />
                ))}
            </div>

            {/* Decorative dot grid - bottom right */}
            <div className="hidden md:grid absolute bottom-10 right-10 grid-cols-6 gap-2 opacity-40 pointer-events-none">
                {Array.from({ length: 24 }).map((_, i) => (
                    <span key={i} className="w-1 h-1 rounded-full bg-[#C9A96A]" />
                ))}
            </div>

            {/* Decorative leaf branch - bottom left */}
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

                {/* LEFT — Map */}
                <div
                    className="relative rounded-[24px] sm:rounded-[35px] overflow-hidden shadow-xl"
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
                        <FitBounds user={user} india={india} />
                        <GeoJSONLayer userCountry={user.country} />
                        <AnimatedPolyline positions={[[user.lat, user.lon], [india.lat, india.lon]]} />

                        <Marker position={[user.lat, user.lon]} icon={blueIcon}>
                            <Popup>
                                <div className="text-center">
                                    <h3 className="font-bold text-blue-600">Your Location</h3>
                                    <p>{user.city}</p>
                                    <p>{user.country}</p>
                                </div>
                            </Popup>
                        </Marker>

                        <Marker position={[india.lat, india.lon]} icon={greenIcon}>
                            <Popup>
                                <div className="text-center">
                                    <h3 className="font-bold text-green-600">Your Family</h3>
                                    <p>India</p>
                                    <p className="text-green-600 font-semibold">Companion Assigned ✓</p>
                                </div>
                            </Popup>
                        </Marker>
                    </MapContainer>

                    {/* Legend dots — smaller on mobile */}
                    <div className="absolute top-4 left-4 sm:top-6 sm:left-6 z-[999] flex items-center gap-2">
                        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl sm:rounded-2xl px-3 py-1.5 sm:px-4 sm:py-2.5 flex items-center gap-2">
                            <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#2F4A7D] shadow-[0_0_6px_#2F4A7D]"></span>
                            <span className="text-white text-[10px] sm:text-xs font-medium truncate max-w-[80px] sm:max-w-none">{user.country}</span>
                        </div>
                        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl sm:rounded-2xl px-3 py-1.5 sm:px-4 sm:py-2.5 flex items-center gap-2">
                            <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#52B5BD] shadow-[0_0_6px_#52B5BD]"></span>
                            <span className="text-white text-[10px] sm:text-xs font-medium">India</span>
                        </div>
                    </div>

                    {/* Live Tracking Badge — hidden on mobile, shown from sm breakpoint up */}
                    <div className="hidden sm:block absolute bottom-4 left-4 sm:bottom-6 sm:left-6 z-[999] bg-white rounded-xl sm:rounded-2xl shadow-xl px-3 py-2 sm:px-5 sm:py-3">
                        <div className="flex items-center gap-2 sm:gap-3">
                            <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-green-500 animate-pulse flex-shrink-0"></span>
                            <div>
                                <p className="font-semibold text-xs sm:text-sm leading-tight" style={{ color: "#1a2a3a" }}> Live Visit Tracking</p>
                                <p className="text-[10px] sm:text-xs" style={{ color: "#8a9ab0" }}>Companion en route</p>
                            </div>
                        </div>
                    </div>

                    {/* Parents Info Badge — hidden on mobile, shown from sm breakpoint up */}
                    <div className="hidden sm:block absolute bottom-4 right-4 sm:bottom-6 sm:right-6 z-[999] bg-white rounded-xl sm:rounded-2xl shadow-xl p-2.5 sm:p-4">
                        <h3 className="font-bold text-xs sm:text-sm" style={{ color: "#52B5BD" }}>Your Family</h3>
                        <p className="text-[10px] sm:text-xs" style={{ color: "#8a9ab0" }}>India</p>
                        <span className="text-green-600 font-semibold text-[10px] sm:text-xs">Companion Assigned ✓</span>
                    </div>
                </div>

               {/* RIGHT — Content */}
                <div
                    ref={rightPanelRef}
                    style={{
                        opacity: isVisible ? 1 : 0,
                        transform: isVisible ? "translateY(0)" : "translateY(28px)",
                        transition: "opacity 0.6s ease, transform 0.6s ease",
                    }}
                    className="flex flex-col justify-center px-1 sm:px-4 lg:px-8 xl:px-14 py-6 sm:py-8 lg:py-0"
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

                    <p className="text-base sm:text-lg leading-relaxed mb-5 sm:mb-8" style={{ color: "#6a7f96" }}>
                        <span className="bg-[#F2C89F]/40 font-semibold px-1 rounded-sm box-decoration-clone" style={{ color: "#1a2a3a" }}>
                            Distance may separate families, but it should never separate care.
                        </span>{" "}
                        {isIndiaVisitor ? (
                            <>
                                Whether you're living abroad or in another city, <strong style={{ color: "#1a2a3a" }}>WHY</strong> connects your parents with trusted, background-verified companions across India—keeping you informed, reassured, and connected every step of the way.
                            </>
                        ) : (
                            <>
                                Whether you're currently living in{" "}
                                <strong style={{ color: "#1a2a3a" }}>{user.city}, {user.country}</strong>, <strong style={{ color: "#1a2a3a" }}>WHY</strong> connects your parents with trusted, background-verified companions across India—keeping you informed, reassured, and connected every step of the way.
                            </>
                        )}
                    </p>

                    <div className="space-y-3 sm:space-y-5 mb-6 sm:mb-10">
                        {features.map((f, i) => (
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

            </div>
        </section>
    );
}