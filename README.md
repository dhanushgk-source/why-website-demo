# WHY Landing Site – React

This is the React conversion of the WHY landing page.

## Getting Started

```bash
npm install
npm run dev
```

Then open http://localhost:5173

## Build for Production

```bash
npm run build
npm run preview
```

## Project Structure

```
src/
├── main.jsx                  # App entry point
├── App.jsx                   # Root component — assembles all sections
├── index.css                 # Global styles (from original style.css)
├── hooks/
│   └── useSectionFade.js     # Shared IntersectionObserver fade hook
└── components/
    ├── Navbar.jsx             # Sticky navbar + mobile menu
    ├── Hero.jsx               # Hero section
    ├── ChooseExperience.jsx   # 3-card experience section
    ├── TrustSignals.jsx       # 4 trust signal icons
    ├── TrustedBy.jsx          # Animated stat counters
    ├── ParentSection.jsx      # "When parents need help" grid
    ├── WhatIsWhy.jsx          # 3-card "What is WHY" section
    ├── HowWhyWorks.jsx        # 5-step timeline
    ├── WaitingSection.jsx     # Phone mockup + feature list
    ├── Services.jsx           # 6-card services grid
    ├── TrustSafety.jsx        # Alternating timeline safety section
    ├── WhyDifferent.jsx       # WHY vs Others tab toggle
    ├── CTA.jsx                # Call to action section
    ├── StickyDownload.jsx     # Fixed right-side download widget
    ├── Footer.jsx             # Footer with links and social icons
    └── CookieBanner.jsx       # Cookie consent banner
```

## Notes

- All Tailwind classes and CSS are preserved exactly from the original.
- Assets live in `public/Assests/` (matching original path).
- JavaScript logic (scroll observer, counter, tab toggle, cookie) is converted to React hooks and state.
