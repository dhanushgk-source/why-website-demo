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
        title: "Trusted Caregiver Network",
        desc: "Verified caregivers across all major cities in India.",
        color: "bg-[#E8F8F9] text-[#52B5BD]",
    },
    {
        title: "Real-Time Tracking",
        desc: "Know exactly when your caregiver arrives and leaves.",
        color: "bg-blue-50 text-blue-600",
    },
    {
        title: "Hospital & Travel Assistance",
        desc: "Escort services for appointments, travel, and errands.",
        color: "bg-indigo-50 text-indigo-600",
    },
];

export default function WorldMap() {
    const [user, setUser] = useState({
        city: "New York",
        country: "United States",
        lat: 40.7128,
        lon: -74.006,
    });

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
                        setUser({
                            city: "New York",
                            country: "United States",
                            lat: 40.7128,
                            lon: -74.006,
                        });
                    } else {
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
        <section className="w-full px-3 sm:px-6 lg:px-8 py-8 sm:py-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-center">

                {/* LEFT — Map */}
                <div
                    className="relative rounded-[24px] sm:rounded-[35px] overflow-hidden"
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
                                    <h3 className="font-bold text-green-600">Parents</h3>
                                    <p>India</p>
                                    <p className="text-green-600 font-semibold">Caregiver Assigned ✓</p>
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

                    {/* Live Tracking Badge */}
                    <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 z-[999] bg-white rounded-xl sm:rounded-2xl shadow-xl px-3 py-2 sm:px-5 sm:py-3">
                        <div className="flex items-center gap-2 sm:gap-3">
                            <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-green-500 animate-pulse flex-shrink-0"></span>
                            <div>
                                <p className="font-semibold text-xs sm:text-sm leading-tight">Live Tracking</p>
                                <p className="text-[10px] sm:text-xs text-gray-500">Caregiver route active</p>
                            </div>
                        </div>
                    </div>

                    {/* Parents Info Badge */}
                    <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 z-[999] bg-white rounded-xl sm:rounded-2xl shadow-xl p-2.5 sm:p-4">
                        <h3 className="font-bold text-[#52B5BD] text-xs sm:text-sm">Parents</h3>
                        <p className="text-[10px] sm:text-xs text-gray-500">India</p>
                        <span className="text-green-600 font-semibold text-[10px] sm:text-xs">Caregiver Assigned ✓</span>
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
                    <span className="inline-flex items-center gap-2 px-3 py-1 sm:px-4 sm:py-1.5
                                     rounded-full text-[#52B5BD]
                                     text-xs sm:text-sm font-semibold mb-4 sm:mb-6
                                     border border-[#c2eaed] w-fit">
                        🌍 Distance doesn't matter
                    </span>

                    <h1 className="text-xl sm:text-3xl lg:text-4xl font-bold leading-tight mb-3 sm:mb-5 text-gray-900">
                        Care for your parents in India,
                        <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#52B5BD] to-[#2F4A7D]">
                            from {user.country}.
                        </span>
                    </h1>

                    <p className="text-sm sm:text-base text-gray-500 leading-relaxed mb-5 sm:mb-8">
                        <span className="bg-yellow-200/70 text-gray-700 font-semibold px-1 rounded-sm box-decoration-clone">
                            Distance may separate families, but it should never separate care.
                        </span>{" "}
                        Whether you're currently living in{" "}
                        <strong className="text-gray-700">{user.city}, {user.country}</strong>,
                        our trusted caregivers are always ready to support your parents across India.
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
                                <div className={`w-8 h-8 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center flex-shrink-0 ${f.color}`}>
                                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                        <polyline points="20 6 9 17 4 12" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="font-semibold text-gray-800 text-sm">{f.title}</p>
                                    <p className="text-gray-400 text-xs sm:text-sm mt-0.5">{f.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3">
                        <button className="inline-flex items-center justify-center gap-2
                                           px-5 py-3 sm:px-8 sm:py-4
                                           rounded-full bg-gradient-to-r from-[#52B5BD] to-[#2F4A7D]
                                           text-white font-semibold shadow-lg
                                           hover:shadow-xl hover:scale-[1.03] active:scale-[0.98]
                                           transition-all duration-200 text-sm sm:text-base w-full sm:w-auto">
                            Find a Trusted Caregiver
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="5" y1="12" x2="19" y2="12" />
                                <polyline points="12 5 19 12 12 19" />
                            </svg>
                        </button>
                        <button
                            onClick={() => document.getElementById("WHY-Works-section")?.scrollIntoView({ behavior: "smooth" })}
                            className="inline-flex items-center justify-center gap-2
                                       px-5 py-3 sm:px-8 sm:py-4
                                       rounded-full border border-gray-200 text-gray-600
                                       font-semibold hover:border-[#52B5BD] hover:text-[#52B5BD]
                                       transition-all duration-200 text-sm sm:text-base w-full sm:w-auto"
                        >
                            How it works
                        </button>
                    </div>
                </div>

            </div>
        </section>
    );
}       