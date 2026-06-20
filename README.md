# WHY Landing Site — React

A modern React conversion of the WHY landing page, built with Vite and Tailwind CSS.

## 🚀 Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## 📦 Build for Production

```bash
npm run build
npm run preview
```

## 🗂️ Project Structure

src/

├── main.jsx                        # App entry point

├── App.jsx                         # Root component

├── index.css                       # Global styles

├── hooks/

│   └── useSectionFade.js           # IntersectionObserver fade hook

├── components/

│   ├── Navbar.jsx                  # Sticky navbar + mobile menu

│   ├── Hero.jsx                    # Hero section

│   ├── ChooseExperience.jsx        # Experience selector cards

│   ├── TrustSignals.jsx            # Trust signal icons

│   ├── TrustedBy.jsx               # Animated stat counters

│   ├── ParentSection.jsx           # Parent help grid

│   ├── WhatIsWhy.jsx               # What is WHY section

│   ├── HowWhyWorks.jsx             # 5-step timeline

│   ├── WaitingSection.jsx          # Phone mockup + features

│   ├── Services.jsx                # Services grid

│   ├── TrustSafety.jsx             # Safety timeline

│   ├── WhyDifferent.jsx            # WHY vs Others toggle

│   ├── CTA.jsx                     # Call to action

│   ├── StickyDownload.jsx          # Fixed download widget

│   ├── Footer.jsx                  # Footer

│   └── CookieBanner.jsx            # Cookie consent

├── pages/

│   └── careers/                    # Careers section pages

├── services/

│   ├── api.js                      # Centralized axios instance

│   ├── authService.js              # Auth API calls

│   ├── jobService.js               # Jobs API calls

│   ├── adminService.js             # Admin API calls

│   └── uploadService.js            # Resume upload API calls

└── contexts/

└── AuthContext.jsx             # Auth state management

## 🛠️ Tech Stack

- ⚛️ React + Vite
- 🎨 Tailwind CSS
- 🔗 Axios
- 🔐 JWT Authentication

## 📝 Notes

- All assets live in `public/Assests/`
- API base URL is configured via `.env` using `VITE_API_BASE_URL`
- Never commit `.env` to version control