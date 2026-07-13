import { useEffect } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { scrollToId } from "./utils/scrollNav";

// Auth
import ProtectedRoute from "./components/auth/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";

// Layout
import Navbar from "./components/Navbar";
import CareerNavbar from "./components/CareerNavbar";
import Footer from "./components/Footer";
import StickyDownload from "./components/StickyDownload";
import CookieBanner from "./components/CookieBanner";
import WhatsAppFloat from "./components/WhatsAppFloat";
import ScrollTopBottom from "./components/ScrollTopDown";

// Home Sections
import Hero from "./components/Hero";
import ChooseExperience from "./components/ChooseExperience";
import TrustSignals from "./components/TrustSignals";
import TrustedBy from "./components/TrustedBy";
import BlogSection from "./components/Blog";
import BlogPost from "./components/BlogPost";
import ParentSection from "./components/ParentSection";
import WhatIsWhy from "./components/WhatIsWhy";
import HowWhyWorks from "./components/HowWhyWorks";
import WaitingSection from "./components/WaitingSection";
import WorldMap from "./components/WorldMap"
import TrustSafety from "./components/TrustSafety";
import CTA from "./components/CTA";
import ProNurseCare from "./components/ProNurseCare";
import TravelCompanionServices from "./components/TravelCompanion";
import HospitalAssistance from "./components/HospitalAssistance"
import TestimonialsSlideshow from "./components/TestimonialsSlideshow";
import CompanionServices from "./components/CompanionServices";
import AnnouncementBar from "./components/AnnouncementBar";
import TrustAndSafety from "./pages/TrustAndSafety";

import Contact from "./pages/Contact";
import FAQ from "./pages/FAQ";
import About from "./pages/About";
import Pricing from "./pages/Pricing"
import DataDeletion from "./pages/DataDeletion";
import PrivacyPolicyUser from "./pages/PrivacyPolicyUser";
import PrivacyPolicyPro from "./pages/PrivacyPolicyPro";
import TermsUser from "./pages/TermsUser";
import TermsPro from "./pages/TermsPro";

// Careers
import CareersLanding from "./pages/careers/CareersLanding";
import Login from "./pages/careers/Login";
import Register from "./pages/careers/Register";
import Jobs from "./pages/careers/Jobs";
import JobDetails from "./pages/careers/JobDetails";
import MyApplications from "./pages/careers/MyApplications";

// Admin
import AdminDashboard from "./pages/admin/AdminDashboard";
import ManageJobs from "./pages/admin/ManageJobs";
import CreateJob from "./pages/admin/CreateJob";
import Applications from "./pages/admin/Applications";
import EditJob from "./pages/admin/EditJob";

function Home() {
  const location = useLocation();
  const navigate = useNavigate();

  // When a Navbar/Footer link on another page (e.g. About, FAQ) sends the
  // user here to reach a homepage section, finish the job once we've
  // mounted: scroll to that section, then clear the state so a later
  // refresh/back-navigation doesn't re-trigger it.
  useEffect(() => {
    const target = location.state?.scrollTo;
    if (!target) return;

    const timer = setTimeout(() => {
      scrollToId(target);
    }, 120);

    navigate(location.pathname, { replace: true, state: {} });
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.key]);

  return (
    <>
      <AnnouncementBar/>
      <Hero />
      <WhatIsWhy />
      {/*<TrustSignals />*/}
      {/*<ChooseExperience />*/}
      {/*<TrustedBy />*/}
      <ParentSection />
      {/*<ProNurseCare />*/}
      {/*<HospitalAssistance />
      <TravelCompanionServices />*/}
      <CompanionServices />
      <HowWhyWorks />
      {/*<WaitingSection />*/}
      <WorldMap />
      {/*<TrustSafety />*/}
      {/*<BlogSection /> */}
      {/*<TestimonialsSlideshow />*/}
      <CTA />
    </>
  );
}

function AppLayout() {
  const location = useLocation();
  const { pathname } = location;
  const isCareerOrAdmin =
    pathname.startsWith("/careers") || pathname.startsWith("/admin");

  const hideGlobalLayout = [
    "/contact",
    "/faq",
    "/data-deletion",
    "/privacy-policy-user",
    "/privacy-policy-pro",
    "/terms-user",
    "/terms-pro",
  ].includes(pathname);

  // Every route change should land at the top of the new page — unless
  // we're on our way to "/" with a pending section scroll (handled by
  // Home itself), in which case jumping to 0 first would just cause a
  // visible flash before the smooth-scroll to the section kicks in.
  useEffect(() => {
    if (!location.state?.scrollTo) {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    }
  }, [pathname]);

  return (
    <div className="bg-white text-gray-800 overflow-x-hidden">
      {!hideGlobalLayout &&
        (isCareerOrAdmin ? <CareerNavbar /> : <Navbar />)}

      <div className="overflow-x-hidden">
        <Routes>

          <Route path="/contact" element={<Contact />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/pricing" element={<Pricing/>}/>
          <Route path="/trust and safety" element = {<TrustAndSafety/>}/>
          <Route path="/about" element={<About />} />
          <Route path="/data-deletion" element={<DataDeletion />} />
          <Route path="/privacy-policy-user" element={<PrivacyPolicyUser />} />
          <Route path="/privacy-policy-pro" element={<PrivacyPolicyPro />} />
          <Route path="/terms-user" element={<TermsUser />} />
          <Route path="/terms-pro" element={<TermsPro />} />


          {/* Home */}
          <Route path="/" element={<Home />} />

          {/* Blog */}
          {
            /*
            <Route path="/blog" element={<BlogSection />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            */
          }


          {/* Careers */}
          <Route path="/careers" element={<CareersLanding />} />
          <Route path="/careers/login" element={<Login />} />
          <Route path="/careers/register" element={<Register />} />
          <Route path="/careers/jobs" element={<Jobs />} />
          <Route path="/careers/jobs/:id" element={<JobDetails />} />

          {/* Protected Applicant Routes */}
          <Route
            path="/careers/my-applications"
            element={
              <ProtectedRoute>
                <MyApplications />
              </ProtectedRoute>
            }
          />

          <Route
            path="/careers/dashboard"
            element={
              <ProtectedRoute>
                <div className="min-h-screen flex items-center justify-center text-[#2F4A7D] font-semibold text-xl">
                  Dashboard — Coming Soon
                </div>
              </ProtectedRoute>
            }
          />

          {/* Admin Routes */}
          <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
          <Route path="/admin/jobs" element={<AdminRoute><ManageJobs /></AdminRoute>} />
          <Route path="/admin/jobs/create" element={<AdminRoute><CreateJob /></AdminRoute>} />
          <Route path="/admin/applications" element={<AdminRoute><Applications /></AdminRoute>} />
          <Route path="/admin/jobs/edit/:id" element={<AdminRoute><EditJob /></AdminRoute>} />
        </Routes>

        {/* Only show home-page widgets on non-career/admin routes */}
        {!isCareerOrAdmin && !hideGlobalLayout && (
          <>
            {/* <StickyDownload /> */}
            <Footer />
            <CookieBanner />
            <WhatsAppFloat />
            {/*<ScrollTopBottom />*/}
          </>
        )}
      </div>
    </div>
  );
}

export default function App() {
  return <AppLayout />;
}