import { Routes, Route, useLocation } from "react-router-dom";

// Auth
import ProtectedRoute from "./components/auth/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";

// Layout
import Navbar from "./components/Navbar";
import CareerNavbar from "./components/CareerNavbar";
import Footer from "./components/Footer";
import StickyDownload from "./components/StickyDownload";
import CookieBanner from "./components/CookieBanner";

// Home Sections
import Hero from "./components/Hero";
import ChooseExperience from "./components/ChooseExperience";
import TrustSignals from "./components/TrustSignals";
import TrustedBy from "./components/TrustedBy";
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

import Contact from "./pages/Contact";
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
  return (
    <>
      <Hero />
      <WhatIsWhy />
      <TrustSignals />
      <ChooseExperience />
      <TrustedBy />
      <ParentSection />
      {/*<ProNurseCare />*/}
      <HospitalAssistance/>
      <TravelCompanionServices />
      <HowWhyWorks />
      <WaitingSection />
      <WorldMap/>
      <TrustSafety />
      <CTA />
    </>
  );
}

function AppLayout() {
  const { pathname } = useLocation();
  const isCareerOrAdmin =
    pathname.startsWith("/careers") || pathname.startsWith("/admin");

  const hideGlobalLayout = [
    "/contact",
    "/data-deletion",
    "/privacy-policy-user",
    "/privacy-policy-pro",
    "/terms-user",
    "/terms-pro",
  ].includes(pathname);

  return (
    <div className="bg-white text-gray-800 overflow-x-hidden">
      {!hideGlobalLayout &&
        (isCareerOrAdmin ? <CareerNavbar /> : <Navbar />)}

      <div className="overflow-x-hidden">
        <Routes>

          <Route path="/contact" element={<Contact />} />
          <Route path="/data-deletion" element={<DataDeletion />} />
          <Route path="/privacy-policy-user" element={<PrivacyPolicyUser />} />
          <Route path="/privacy-policy-pro" element={<PrivacyPolicyPro />} />
          <Route path="/terms-user" element={<TermsUser />} />
          <Route path="/terms-pro" element={<TermsPro />} />


          {/* Home */}
          <Route path="/" element={<Home />} />

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
            <StickyDownload />
            <Footer />
            <CookieBanner />
          </>
        )}
      </div>
    </div>
  );
}

export default function App() {
  return <AppLayout />;
}
