import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import PulseLine from "./PulseLine";
import { Megaphone } from "lucide-react";
import { IconOverview, IconJobs, IconApplications, IconTeam, IconOrders, IconStudents, IconTraining, IconLogout, IconMenu } from "./icons";


const NAV_ITEMS = [
  { to: "/", label: "Overview", icon: IconOverview, end: true },
  { to: "/jobs", label: "Job postings", icon: IconJobs },
  { to: "/applications", label: "Applications", icon: IconApplications },
  { to: "/team", label: "Team", icon: IconTeam },
  { to: "/students", label: "Students", icon: IconStudents },
  { to: "/trainings", label: "Training programs", icon: IconTraining },
  {
    to: "/advertisements",
    label: "Advertisements",
    icon: Megaphone, 
  },
];

export default function AppLayout() {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);

  const initials = (user?.fullName || user?.email || "A")
    .split(" ")
    .map((s) => s[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div className="app-shell">
      <div className="mobile-topbar">
        <span className="mark">
          WHY <span style={{ color: "var(--brass)" }}>Admin</span>
        </span>
        <button onClick={() => setOpen(true)} aria-label="Open menu">
          <IconMenu width={18} height={18} />
        </button>
      </div>

      {open && <div className="sidebar-scrim" onClick={() => setOpen(false)} />}

      <aside className={`sidebar ${open ? "open" : ""}`}>
        <div className="sidebar-brand">
          <div className="mark">
            WHY <span>Admin</span>
          </div>
          <div className="sub">Care operations console</div>
        </div>
        <div className="sidebar-pulse">
          <PulseLine />
        </div>
        <nav className="sidebar-nav">
          {NAV_ITEMS.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              onClick={() => setOpen(false)}
              className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}
            >
              <Icon width={17} height={17} />
              {label}
            </NavLink>
          ))}
        </nav>
        <div className="sidebar-footer">
          <div className="user-chip">
            <div className="initials">{initials}</div>
            <div className="who">
              <div className="name">{user?.fullName || user?.email}</div>
              <div className="role">{user?.role}</div>
            </div>
          </div>
          <button className="logout-btn" onClick={logout}>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
              <IconLogout width={14} height={14} /> Sign out
            </span>
          </button>
        </div>
      </aside>

      <div className="main-area">
        <div className="page">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
