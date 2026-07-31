const common = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  viewBox: "0 0 24 24",
};

export const IconOverview = (p) => (
  <svg {...common} {...p}>
    <rect x="3" y="3" width="7" height="9" rx="1.5" />
    <rect x="14" y="3" width="7" height="5" rx="1.5" />
    <rect x="14" y="12" width="7" height="9" rx="1.5" />
    <rect x="3" y="16" width="7" height="5" rx="1.5" />
  </svg>
);

export const IconJobs = (p) => (
  <svg {...common} {...p}>
    <rect x="3" y="7" width="18" height="13" rx="2" />
    <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    <path d="M3 12h18" />
  </svg>
);

export const IconApplications = (p) => (
  <svg {...common} {...p}>
    <path d="M6 3h9l5 5v13a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z" />
    <path d="M14 3v5h5" />
    <path d="M8 13h8M8 17h5" />
  </svg>
);

export const IconTeam = (p) => (
  <svg {...common} {...p}>
    <circle cx="9" cy="8" r="3.2" />
    <path d="M2.5 20a6.5 6.5 0 0 1 13 0" />
    <circle cx="17.5" cy="8.5" r="2.5" />
    <path d="M15.8 13.2a6.5 6.5 0 0 1 5.7 6.8" />
  </svg>
);

export const IconOrders = (p) => (
  <svg {...common} {...p}>
    <path d="M4 7h16l-1.5 12.2a1.5 1.5 0 0 1-1.5 1.3H7a1.5 1.5 0 0 1-1.5-1.3L4 7Z" />
    <path d="M8 7V5.5a4 4 0 0 1 8 0V7" />
  </svg>
);

export const IconStudents = (p) => (
  <svg {...common} {...p}>
    <circle cx="12" cy="8" r="3.5" />
    <path d="M4.5 20a7.5 7.5 0 0 1 15 0" />
    <path d="M9 8.5h6" />
  </svg>
);

export const IconTraining = (p) => (
  <svg {...common} {...p}>
    <path d="M2 8.5 12 4l10 4.5-10 4.5-10-4.5Z" />
    <path d="M6 10.6V16c0 1.7 2.7 3 6 3s6-1.3 6-3v-5.4" />
    <path d="M20 9v6" />
  </svg>
);

export const IconLogout = (p) => (
  <svg {...common} {...p}>
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
    <path d="M16 17l5-5-5-5" />
    <path d="M21 12H9" />
  </svg>
);

export const IconPlus = (p) => (
  <svg {...common} {...p}>
    <path d="M12 5v14M5 12h14" />
  </svg>
);

export const IconMenu = (p) => (
  <svg {...common} {...p}>
    <path d="M3 6h18M3 12h18M3 18h18" />
  </svg>
);

export const IconSearch = (p) => (
  <svg {...common} {...p}>
    <circle cx="11" cy="11" r="7" />
    <path d="M21 21l-4-4" />
  </svg>
);
