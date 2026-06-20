import { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function CareerNavbar() {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 80);
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => { clearTimeout(timer); window.removeEventListener("scroll", onScroll); };
  }, []);

  // Close profile dropdown when clicking outside
  useEffect(() => {
    const handler = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Close mobile menu on route change
  useEffect(() => { setMenuOpen(false); setProfileOpen(false); }, [location.pathname]);

  const handleLogout = () => {
    logout();
    navigate("/careers");
  };

  const navLinks = [
    { label: "Jobs", to: "/careers/jobs" },
    ...(isAuthenticated ? [{ label: "My Applications", to: "/careers/my-applications" }] : []),
    ...(user?.role === "admin" ? [{ label: "Admin", to: "/admin" }] : []),
  ];

  const isActive = (to) => location.pathname === to || location.pathname.startsWith(to + "/");

  // Initials avatar
  const initials = user?.fullName
    ? user.fullName.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase()
    : user?.email?.[0]?.toUpperCase() ?? "U";

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-[9999]">
        <nav
          className={`
            flex items-center justify-between
            px-6 lg:px-12 h-16
            transition-all duration-500 ease-in-out
            ${visible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-6"}
            ${scrolled ? "bg-[#2F4A7D] shadow-xl" : "bg-[#2F4A7D]/95 backdrop-blur-md"}
          `}
        >
          {/* LEFT — Home icon + brand */}
          <div className="flex items-center gap-4">
            <Link
              to="/"
              title="Back to Home"
              className="flex items-center gap-2 text-white/70 hover:text-white transition-colors duration-200 group"
            >
              <span className="w-8 h-8 rounded-lg bg-white/10 group-hover:bg-white/20 flex items-center justify-center transition-colors duration-200">
                {/* Home icon */}
                <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 12L12 3l9 9" />
                  <path d="M9 21V12h6v9" />
                  <path d="M3 12v9h18V12" />
                </svg>
              </span>
              <span className="text-xs font-medium hidden sm:block">Home</span>
            </Link>

            {/* Divider */}
            <span className="text-white/20 text-lg select-none">|</span>

            {/* WHY Careers brand */}
            <Link to="/careers" className="flex items-center gap-2 group">
              <img
                src="/Assests/WHY_logo.png"
                alt="WHY"
                className="h-8 brightness-0 invert opacity-90 group-hover:opacity-100 transition-opacity"
              />
              <span className="text-white font-semibold text-sm hidden sm:block">Careers</span>
            </Link>
          </div>

          {/* CENTER — Desktop nav links */}
          <ul className="hidden lg:flex items-center gap-8">
            {navLinks.map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  className={`relative text-sm font-medium transition-colors duration-200 group
                    ${isActive(item.to) ? "text-[#52B5BD]" : "text-white/70 hover:text-white"}
                  `}
                >
                  {item.label}
                  <span
                    className={`absolute left-0 -bottom-1 h-[2px] bg-[#52B5BD] transition-all duration-300 rounded-full
                      ${isActive(item.to) ? "w-full" : "w-0 group-hover:w-full"}
                    `}
                  />
                </Link>
              </li>
            ))}
          </ul>

          {/* RIGHT — Auth section */}
          <div className="flex items-center gap-3">
            {isAuthenticated ? (
              /* User avatar + dropdown */
              <div ref={profileRef} className="relative">
                <button
                  onClick={() => setProfileOpen((v) => !v)}
                  className="flex items-center gap-2 group focus:outline-none"
                  aria-label="User menu"
                >
                  {/* Avatar circle */}
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#52B5BD] to-[#2DD4BF] flex items-center justify-center text-white font-bold text-sm shadow-lg group-hover:scale-105 transition-transform duration-200 ring-2 ring-white/20 group-hover:ring-white/40">
                    {initials}
                  </div>
                  {/* Chevron */}
                  <svg
                    width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
                    className={`text-white/60 transition-transform duration-200 hidden sm:block ${profileOpen ? "rotate-180" : ""}`}
                  >
                    <path d="m6 9 6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>

                {/* Dropdown */}
                {profileOpen && (
                  <div className="absolute right-0 top-full mt-3 w-64 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-50 animate-in">
                    {/* User info header */}
                    <div className="px-5 py-4 bg-gradient-to-br from-[#2F4A7D] to-[#3a5a97]">
                      <div className="flex items-center gap-3">
                        <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#52B5BD] to-[#2DD4BF] flex items-center justify-center text-white font-bold text-base shadow-md shrink-0">
                          {initials}
                        </div>
                        <div className="min-w-0">
                          {user?.fullName && (
                            <p className="text-white font-semibold text-sm truncate">{user.fullName}</p>
                          )}
                          {user?.email && (
                            <p className="text-white/65 text-xs truncate">{user.email}</p>
                          )}
                          {user?.role === "admin" && (
                            <span className="inline-block mt-1 text-[10px] font-semibold bg-[#52B5BD]/30 text-[#a8e6ec] px-2 py-0.5 rounded-full">
                              Admin
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Menu items */}
                    <div className="py-2">
                      <Link
                        to="/careers/my-applications"
                        className="flex items-center gap-3 px-5 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#2F4A7D] transition-colors"
                        onClick={() => setProfileOpen(false)}
                      >
                        <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" className="text-[#52B5BD]">
                          <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        My Applications
                      </Link>

                      {user?.role === "admin" && (
                        <Link
                          to="/admin"
                          className="flex items-center gap-3 px-5 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#2F4A7D] transition-colors"
                          onClick={() => setProfileOpen(false)}
                        >
                          <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" className="text-[#52B5BD]">
                            <path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                          Admin Panel
                        </Link>
                      )}

                      <div className="border-t border-gray-100 my-1" />

                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-5 py-3 text-sm text-red-500 hover:bg-red-50 transition-colors"
                      >
                        <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" className="text-red-400">
                          <path d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              /* Login / Register buttons */
              <div className="flex items-center gap-2">
                <Link
                  to="/careers/login"
                  className="text-white/80 hover:text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-white/10 transition-all duration-200"
                >
                  Sign In
                </Link>
                <Link
                  to="/careers/register"
                  className="bg-[#52B5BD] hover:bg-[#2DD4BF] text-white text-sm font-semibold px-5 py-2 rounded-full transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-0.5"
                >
                  Register
                </Link>
              </div>
            )}

            {/* Mobile hamburger */}
            <button
              className="lg:hidden text-white/80 hover:text-white ml-1 w-9 h-9 flex items-center justify-center rounded-lg hover:bg-white/10 transition-colors"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              {menuOpen ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M18 6 6 18M6 6l12 12"/></svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M4 6h16M4 12h16M4 18h16"/></svg>
              )}
            </button>
          </div>
        </nav>

        {/* Mobile menu */}
        <div className={`lg:hidden overflow-hidden transition-all duration-300 bg-[#2F4A7D] border-t border-white/10 ${menuOpen ? "max-h-80" : "max-h-0"}`}>
          <ul className="px-6 py-4 space-y-1">
            {navLinks.map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  className={`block py-2.5 px-3 rounded-lg text-sm font-medium transition-colors ${isActive(item.to) ? "bg-white/15 text-white" : "text-white/70 hover:text-white hover:bg-white/10"}`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          {!isAuthenticated && (
            <div className="px-6 pb-5 flex gap-3">
              <Link to="/careers/login" className="flex-1 text-center py-2.5 border border-white/30 text-white/80 rounded-full text-sm font-medium hover:bg-white/10 transition-colors">
                Sign In
              </Link>
              <Link to="/careers/register" className="flex-1 text-center py-2.5 bg-[#52B5BD] text-white rounded-full text-sm font-semibold hover:bg-[#2DD4BF] transition-colors">
                Register
              </Link>
            </div>
          )}

          {isAuthenticated && (
            <div className="px-6 pb-5">
              <button onClick={handleLogout} className="w-full py-2.5 border border-red-400/40 text-red-300 rounded-full text-sm font-medium hover:bg-red-400/10 transition-colors">
                Sign Out
              </button>
            </div>
          )}
        </div>
      </header>

      {/* Spacer to push content below fixed navbar */}
      <div className="h-16" />
    </>
  );
}
