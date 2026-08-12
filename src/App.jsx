import { useEffect, Suspense, lazy, useRef, useState } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { scrollToId } from "./utils/scrollNav";

// Auth
import ProtectedRoute from "./components/auth/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";

// Layout (eager - needed immediately)
import Navbar from "./components/Navbar";
import CareerNavbar from "./components/CareerNavbar";
import Footer from "./components/Footer";
import CookieBanner from "./components/CookieBanner";
import WhatsAppFloat from "./components/WhatsAppFloat";

// Home Sections (eager - above the fold)
import Hero from "./components/Hero";
import AnnouncementBar from "./components/AnnouncementBar";
import WhatIsWhy from "./components/WhatIsWhy";
import ParentSection from "./components/ParentSection";
import CompanionServices from "./components/CompanionServices";
import HowWhyWorks from "./components/HowWhyWorks";
import CTA from "./components/CTA";
import AdvertisementPopup from "./components/AdvertisementPopup";

// Lazy load all pages
const Contact = lazy(() => import("./pages/Contact"));
const FAQ = lazy(() => import("./pages/FAQ"));
const About = lazy(() => import("./pages/About"));
const Pricing = lazy(() => import("./pages/Pricing"));
const TrustAndSafety = lazy(() => import("./pages/TrustAndSafety"));
const DataDeletion = lazy(() => import("./pages/DataDeletion"));
const PrivacyPolicyUser = lazy(() => import("./pages/PrivacyPolicyUser"));
const PrivacyPolicyPro = lazy(() => import("./pages/PrivacyPolicyPro"));
const TermsUser = lazy(() => import("./pages/TermsUser"));
const TermsPro = lazy(() => import("./pages/TermsPro"));
const CancellationPolicyPro = lazy(() => import("./pages/Cancellationpolicypro"));
const CancellationPolicyUser = lazy(() => import("./pages/Cancellationpolicyuser"));

// Lazy load Careers pages
const CareersLanding = lazy(() => import("./pages/careers/CareersLanding"));
const Login = lazy(() => import("./pages/careers/Login"));
const Register = lazy(() => import("./pages/careers/Register"));
const Jobs = lazy(() => import("./pages/careers/Jobs"));
const JobDetails = lazy(() => import("./pages/careers/JobDetails"));
const MyApplications = lazy(() => import("./pages/careers/MyApplications"));

// Lazy load Learn pages
const LearnLogin = lazy(() => import("./pages/learn/LearnLogin"));
const LearnRegister = lazy(() => import("./pages/learn/LearnRegister"));
const ForgotPassword = lazy(() => import("./pages/learn/ForgotPassword"));
const SetPassword = lazy(() => import("./pages/learn/SetPassword"));
const MyLearning = lazy(() => import("./pages/learn/MyLearning"));
const CourseLayout = lazy(() => import("./pages/learn/CourseLayout"));
const CourseIndexRedirect = lazy(() => import("./pages/learn/CourseIndexRedirect"));
const LessonPage = lazy(() => import("./pages/learn/LessonPage"));
const CertificateView = lazy(() => import("./pages/learn/CertificateView"));

// Lazy load Admin pages
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard"));
const ManageJobs = lazy(() => import("./pages/admin/ManageJobs"));
const CreateJob = lazy(() => import("./pages/admin/CreateJob"));
const Applications = lazy(() => import("./pages/admin/Applications"));
const EditJob = lazy(() => import("./pages/admin/EditJob"));

// Lazy load WorldMap with IntersectionObserver
const WorldMapLazy = lazy(() => import("./components/WorldMap"));

// Skeleton placeholder for WorldMap
const WorldMapSkeleton = () => (
  <div className="w-full py-12 bg-gray-50">
    <div className="max-w-7xl mx-auto px-4">
      <div className="animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-64 mx-auto mb-4"></div>
        <div className="h-4 bg-gray-200 rounded w-96 mx-auto mb-8"></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="h-64 bg-gray-200 rounded-lg"></div>
          <div className="h-64 bg-gray-200 rounded-lg"></div>
          <div className="h-64 bg-gray-200 rounded-lg"></div>
        </div>
      </div>
    </div>
  </div>
);

// Lazy loaded WorldMap wrapper with IntersectionObserver
function LazyWorldMap() {
  const [shouldLoad, setShouldLoad] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShouldLoad(true);
            observer.disconnect();
          }
        });
      },
      {
        rootMargin: '200px',
        threshold: 0.01
      }
    );

    observer.observe(containerRef.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div ref={containerRef}>
      {shouldLoad ? (
        <Suspense fallback={<WorldMapSkeleton />}>
          <WorldMapLazy />
        </Suspense>
      ) : (
        <WorldMapSkeleton />
      )}
    </div>
  );
}

function Home() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const target = location.state?.scrollTo;
    if (!target) return;

    const timer = setTimeout(() => {
      scrollToId(target);
    }, 120);

    navigate(location.pathname, { replace: true, state: {} });
    return () => clearTimeout(timer);
  }, [location.key]);

  return (
    <>
      <AnnouncementBar />
      <Hero />
      <AdvertisementPopup />
      <WhatIsWhy />
      <ParentSection />
      <CompanionServices />
      <HowWhyWorks />
      <LazyWorldMap />
      <CTA />
    </>
  );
}

// Loading fallback for lazy-loaded pages
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="flex flex-col items-center gap-4">
      <div className="w-12 h-12 border-4 border-teal-200 border-t-teal-600 rounded-full animate-spin"></div>
      <p className="text-slate-500 text-sm">Loading...</p>
    </div>
  </div>
);

function AppLayout() {
  const location = useLocation();
  const { pathname } = location;
  const isCareerOrAdmin =
    pathname.startsWith("/careers") || pathname.startsWith("/admin");

  const isLearn = pathname.startsWith("/learn");

  const hideGlobalLayout =
    ["/contact", "/faq"].includes(pathname) || isLearn;

  const hideFooterOnly = [
    "/data-deletion",
    "/privacy-policy-user",
    "/privacy-policy-pro",
    "/terms-user",
    "/terms-pro",
    "/cp-pro",
    "/cp-user",
  ].includes(pathname);

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
        <Suspense fallback={<PageLoader />}>
          <Routes>
            {/* Public Pages - Lazy Loaded */}
            <Route path="/contact" element={<Contact />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/trust-and-safety" element={<TrustAndSafety />} />
            <Route path="/trust and safety" element={<TrustAndSafety />} />
            <Route path="/trust%20and%20safety" element={<TrustAndSafety />} />
            <Route path="/safety" element={<TrustAndSafety />} />
            <Route path="/about" element={<About />} />
            
            {/* Legal Pages - Lazy Loaded */}
            <Route path="/data-deletion" element={<DataDeletion />} />
            <Route path="/privacy-policy-user" element={<PrivacyPolicyUser />} />
            <Route path="/privacy-policy-pro" element={<PrivacyPolicyPro />} />
            <Route path="/terms-user" element={<TermsUser />} />
            <Route path="/terms-pro" element={<TermsPro />} />
            <Route path="/cp-pro" element={<CancellationPolicyPro />} />
            <Route path="/cp-user" element={<CancellationPolicyUser />} />

            {/* Home - Eager */}
            <Route path="/" element={<Home />} />

            {/* Careers - Lazy Loaded */}
            <Route path="/careers" element={<CareersLanding />} />
            <Route path="/careers/login" element={<Login />} />
            <Route path="/careers/register" element={<Register />} />
            <Route path="/careers/jobs" element={<Jobs />} />
            <Route path="/careers/jobs/:id" element={<JobDetails />} />

            {/* Protected Applicant Routes - Lazy Loaded */}
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

            {/* Learn Portal - Lazy Loaded */}
            <Route path="/learn/login" element={<LearnLogin />} />
            <Route path="/learn/register" element={<LearnRegister />} />
            <Route path="/learn/forgot-password" element={<ForgotPassword />} />
            <Route path="/learn/set-password" element={<SetPassword />} />
            <Route path="/learn/certificate/:certificateId" element={<CertificateView />} />

            <Route
              path="/learn"
              element={
                <ProtectedRoute redirectTo="/learn/login">
                  <MyLearning />
                </ProtectedRoute>
              }
            />

            <Route
              path="/learn/course/:courseId"
              element={
                <ProtectedRoute redirectTo="/learn/login">
                  <CourseLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<CourseIndexRedirect />} />
              <Route path="lesson/:lessonId" element={<LessonPage />} />
            </Route>

            {/* Admin Routes - Lazy Loaded */}
            <Route 
              path="/admin" 
              element={
                <AdminRoute>
                  <AdminDashboard />
                </AdminRoute>
              } 
            />
            <Route 
              path="/admin/jobs" 
              element={
                <AdminRoute>
                  <ManageJobs />
                </AdminRoute>
              } 
            />
            <Route 
              path="/admin/jobs/create" 
              element={
                <AdminRoute>
                  <CreateJob />
                </AdminRoute>
              } 
            />
            <Route 
              path="/admin/applications" 
              element={
                <AdminRoute>
                  <Applications />
                </AdminRoute>
              } 
            />
            <Route 
              path="/admin/jobs/edit/:id" 
              element={
                <AdminRoute>
                  <EditJob />
                </AdminRoute>
              } 
            />
          </Routes>
        </Suspense>

        {/* Only show home-page widgets on non-career/admin routes */}
        {!isCareerOrAdmin && !hideGlobalLayout && (
          <>
            {!hideFooterOnly && <Footer />}
            <CookieBanner />
            <WhatsAppFloat />
          </>
        )}
      </div>
    </div>
  );
}

export default function App() {
  return <AppLayout />;
}