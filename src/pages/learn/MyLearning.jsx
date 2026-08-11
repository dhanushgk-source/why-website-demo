import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  getMyTrainings,
  getCourseCatalog,
  requestCourseEnrollment,
} from "../../services/learnService";
import { useAuth } from "../../contexts/AuthContext";
import { getMyCertificates } from "../../services/certificateService";

function CourseCard({ course, certificate }) {
  const percent = course.totalLessons
    ? Math.round((course.completedLessons / course.totalLessons) * 100)
    : 0;
  const started = course.completedLessons > 0;
  const completed = course.totalLessons > 0 && course.completedLessons >= course.totalLessons;
  const hasLessons = Boolean(course.resumeLessonId);
  const resumeHref = `/learn/course/${course.id}/lesson/${course.resumeLessonId}`;

  return (
    <div className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden flex flex-col">
      <div className="h-36 bg-gradient-to-br from-[#0D1B3E] to-[#52B5BD] relative overflow-hidden">
        {course.coverImage ? (
          <img
            src={course.coverImage}
            alt={course.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-white/80 font-semibold text-sm p-4 text-center">
            {course.title}
          </div>
        )}
        {completed && (
          <span className="absolute top-3 right-3 bg-amber-400 text-amber-950 font-bold text-xs px-2.5 py-1 rounded-full shadow-sm flex items-center gap-1">
            🏆 Completed
          </span>
        )}
      </div>

      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-bold text-gray-800 mb-1 line-clamp-2">{course.title}</h3>
        <p className="text-xs text-gray-400 mb-4">
          {course.completedLessons}/{course.totalLessons} lessons complete
        </p>

        <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden mb-4">
          <div
            className={`h-full rounded-full transition-all duration-500 ${completed ? "bg-amber-400" : "bg-[#52B5BD]"}`}
            style={{ width: `${percent}%` }}
          />
        </div>

        {completed && certificate ? (
          <Link
            to={`/learn/certificate/${certificate.id}`}
            className="mt-auto text-center text-sm font-semibold bg-amber-500 hover:bg-amber-600 text-white py-2.5 rounded-xl transition-colors duration-300 flex items-center justify-center gap-1.5 shadow-sm"
          >
            🏆 View Certificate
          </Link>
        ) : hasLessons ? (
          <Link
            to={resumeHref}
            className="mt-auto text-center text-sm font-semibold bg-[#0D1B3E] hover:bg-[#52B5BD] text-white py-2.5 rounded-xl transition-colors duration-300"
          >
            {started ? "Continue where you left off" : "Start Course"}
          </Link>
        ) : (
          <span className="mt-auto text-center text-sm font-semibold bg-gray-100 text-gray-400 py-2.5 rounded-xl cursor-not-allowed">
            No lessons yet
          </span>
        )}
      </div>
    </div>
  );
}

function CatalogCard({ course, onRequest, requesting }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden flex flex-col">
      <div className="h-40 bg-gradient-to-br from-[#0D1B3E] to-[#52B5BD] relative overflow-hidden">
        {course.coverImage ? (
          <img
            src={course.coverImage}
            alt={course.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-white/80 font-semibold text-sm p-4 text-center">
            {course.title}
          </div>
        )}
        {course.category && (
          <span className="absolute top-3 left-3 bg-black/60 backdrop-blur-sm text-white font-medium text-[11px] px-2.5 py-1 rounded-full uppercase tracking-wider">
            {course.category}
          </span>
        )}
      </div>

      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-bold text-gray-800 text-base mb-1.5 line-clamp-2">{course.title}</h3>
        {course.description && (
          <p className="text-xs text-gray-500 mb-4 line-clamp-2 leading-relaxed">
            {course.description}
          </p>
        )}

        <div className="flex items-center gap-4 text-xs text-gray-400 mb-5">
          <span className="flex items-center gap-1">
            <span>📖</span> {course.totalLessons || 0} Lessons
          </span>
          {course.duration && (
            <span className="flex items-center gap-1">
              <span>⏱️</span> {course.duration} Hours
            </span>
          )}
        </div>

        <div className="mt-auto pt-2">
          {course.isEnrolled ? (
            <div className="w-full text-center text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 py-2.5 rounded-xl flex items-center justify-center gap-1.5">
              <span>✓</span> Enrolled & Active
            </div>
          ) : course.isRequested ? (
            <div className="w-full text-center text-xs font-bold bg-amber-50 text-amber-800 border border-amber-200 py-2.5 rounded-xl flex items-center justify-center gap-1.5">
              <span>⏳</span> Request Pending Approval
            </div>
          ) : (
            <button
              onClick={() => onRequest(course.id)}
              disabled={requesting === course.id}
              className="w-full text-center text-xs font-bold bg-[#0D1B3E] hover:bg-[#52B5BD] text-white py-2.5 rounded-xl transition duration-200 shadow-sm flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
            >
              {requesting === course.id ? (
                <>
                  <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Submitting Request…
                </>
              ) : (
                <>
                  <span>➕</span> Request Course Enrollment
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default function MyLearning() {
  const { user, logout } = useAuth();
  const [courses, setCourses] = useState([]);
  const [catalog, setCatalog] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [isStudent, setIsStudent] = useState(true);
  const [loading, setLoading] = useState(true);
  const [catalogLoading, setCatalogLoading] = useState(false);
  const [error, setError] = useState("");
  const [requestMsg, setRequestMsg] = useState("");
  const [requestingId, setRequestingId] = useState(null);
  const [activeTab, setActiveTab] = useState("courses"); // 'courses' | 'catalog' | 'certificates'

  const loadData = async () => {
    try {
      const [resTrainings, resCerts] = await Promise.all([
        getMyTrainings(),
        getMyCertificates().catch(() => ({ data: { certificates: [] } })),
      ]);
      setCourses(resTrainings.data.trainings || []);
      setIsStudent(resTrainings.data.isStudent !== false);
      setCertificates(resCerts.data.certificates || []);
    } catch (err) {
      setError(err.response?.data?.message || "Couldn't load your courses.");
    } finally {
      setLoading(false);
    }
  };

  const loadCatalog = async () => {
    setCatalogLoading(true);
    try {
      const res = await getCourseCatalog();
      if (res.data?.success) {
        setCatalog(res.data.catalog || []);
      }
    } catch (err) {
      console.error("Failed to load catalog:", err);
    } finally {
      setCatalogLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    if (activeTab === "catalog") {
      loadCatalog();
    }
  }, [activeTab]);

  const handleEnrollmentRequest = async (trainingId) => {
    setRequestingId(trainingId);
    setRequestMsg("");
    try {
      const res = await requestCourseEnrollment(trainingId);
      if (res.data?.success) {
        setRequestMsg(res.data.message || "Enrollment request submitted successfully!");
        setCatalog((prev) =>
          prev.map((c) =>
            c.id === trainingId
              ? { ...c, isRequested: true, enrollmentStatus: "requested" }
              : c
          )
        );
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to submit enrollment request.");
    } finally {
      setRequestingId(null);
    }
  };

  const inProgress = courses.find((c) => c.completedLessons > 0 && c.completedLessons < c.totalLessons);

  const getInitials = (name) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();
  };

  return (
    <div className="min-h-screen bg-[#F8FAFB]">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 shadow-sm sticky top-0 z-20">
        <div className="max-w-6xl mx-auto px-4 lg:px-8 py-4 flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-[#52B5BD] uppercase tracking-wide">WHY Learning Management Portal</p>
            <h1 className="text-xl md:text-2xl font-bold text-[#0D1B3E] mt-0.5">
              Welcome{user?.fullName ? `, ${user.fullName.split(" ")[0]}` : ""}
            </h1>
          </div>

          {/* User Profile & Logout */}
          <div className="flex items-center gap-3 md:gap-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#0D1B3E] to-[#52B5BD] text-white font-bold text-sm flex items-center justify-center shadow-sm">
                {getInitials(user?.fullName)}
              </div>
              <div className="hidden md:block text-left">
                <p className="text-xs font-bold text-gray-800 line-clamp-1">{user?.fullName || "Student Account"}</p>
                <p className="text-[11px] text-gray-400 line-clamp-1">{user?.email}</p>
              </div>
            </div>

            <button
              onClick={logout}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors border border-red-100 cursor-pointer"
              title="Sign out of your account"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                <polyline points="16 17 21 12 16 7"></polyline>
                <line x1="21" y1="12" x2="9" y2="12"></line>
              </svg>
              <span>Logout</span>
            </button>
          </div>
        </div>

        {/* Section Navigation Tabs */}
        <div className="max-w-6xl mx-auto px-4 lg:px-8 flex items-center gap-8 border-t border-gray-100 text-sm font-semibold pt-3 overflow-x-auto">
          <button
            onClick={() => setActiveTab("courses")}
            className={`pb-3 flex items-center gap-2 border-b-2 transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === "courses"
                ? "border-[#0D1B3E] text-[#0D1B3E] font-bold"
                : "border-transparent text-gray-400 hover:text-gray-600"
            }`}
          >
            <span>📚 My Enrolled Courses</span>
            <span className={`text-xs px-2 py-0.5 rounded-full ${activeTab === "courses" ? "bg-[#0D1B3E]/10 text-[#0D1B3E]" : "bg-gray-100 text-gray-500"}`}>
              {courses.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab("catalog")}
            className={`pb-3 flex items-center gap-2 border-b-2 transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === "catalog"
                ? "border-[#52B5BD] text-[#0D1B3E] font-bold"
                : "border-transparent text-gray-400 hover:text-gray-600"
            }`}
          >
            <span>🔍 Explore & Request Courses</span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
              Catalog
            </span>
          </button>

          <button
            onClick={() => setActiveTab("certificates")}
            className={`pb-3 flex items-center gap-2 border-b-2 transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === "certificates"
                ? "border-amber-500 text-amber-900 font-bold"
                : "border-transparent text-gray-400 hover:text-gray-600"
            }`}
          >
            <span>🏆 My Certificates</span>
            <span className={`text-xs px-2 py-0.5 rounded-full ${activeTab === "certificates" ? "bg-amber-100 text-amber-900" : "bg-gray-100 text-gray-500"}`}>
              {certificates.length}
            </span>
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 lg:px-8 py-8 space-y-8">
        {requestMsg && (
          <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm px-4 py-3 rounded-xl flex items-center justify-between shadow-sm">
            <span className="flex items-center gap-2">
              <span>✓</span> {requestMsg}
            </span>
            <button onClick={() => setRequestMsg("")} className="text-emerald-600 hover:text-emerald-900 font-bold text-xs">
              ✕
            </button>
          </div>
        )}

        {error && (
          <p className="text-sm text-red-500 bg-red-50 border border-red-200 rounded-xl px-4 py-3">
            {error}
          </p>
        )}

        {/* TAB 1: ENROLLED COURSES SECTION */}
        {activeTab === "courses" && (
          <>
            {loading ? (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-64 rounded-2xl bg-white border border-gray-100 animate-pulse" />
                ))}
              </div>
            ) : (
              <>
                {inProgress && (
                  <Link
                    to={`/learn/course/${inProgress.id}/lesson/${inProgress.resumeLessonId}`}
                    className="block rounded-2xl bg-gradient-to-r from-[#0D1B3E] to-[#1C2541] text-white p-6 md:p-8 hover:shadow-xl transition-shadow duration-300 relative overflow-hidden"
                  >
                    <p className="text-amber-300 text-xs font-semibold uppercase tracking-wide mb-2">
                      Pick up where you left off
                    </p>
                    <h2 className="text-xl md:text-2xl font-bold mb-4">{inProgress.title}</h2>
                    <span className="inline-flex items-center gap-2 text-sm font-semibold bg-amber-400 text-amber-950 px-5 py-2.5 rounded-xl shadow-md">
                      Continue lesson →
                    </span>
                  </Link>
                )}

                {courses.length === 0 ? (
                  <div className="text-center py-16 bg-white rounded-2xl border border-gray-100 p-8">
                    <div className="w-14 h-14 rounded-2xl bg-[#EAF6F7] flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl">📚</span>
                    </div>
                    <h3 className="font-bold text-gray-800 text-base mb-1">No Active Courses Yet</h3>
                    <p className="text-gray-400 text-sm max-w-sm mx-auto mb-6">
                      You haven't been enrolled in any courses yet. Explore our course catalog and request access to start learning!
                    </p>
                    <button
                      onClick={() => setActiveTab("catalog")}
                      className="bg-[#0D1B3E] hover:bg-[#52B5BD] text-white font-semibold px-5 py-2.5 rounded-xl text-xs transition duration-200 shadow-sm cursor-pointer"
                    >
                      Browse Course Catalog →
                    </button>
                  </div>
                ) : (
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {courses.map((c) => (
                      <CourseCard
                        key={c.id}
                        course={c}
                        certificate={certificates.find((cert) => cert.training_id === c.id)}
                      />
                    ))}
                  </div>
                )}
              </>
            )}
          </>
        )}

        {/* TAB 2: EXPLORE COURSE CATALOG */}
        {activeTab === "catalog" && (
          <div>
            <div className="mb-6">
              <h2 className="text-lg font-bold text-[#0D1B3E]">Available Training Programs</h2>
              <p className="text-xs text-gray-500 mt-1">
                Browse our curriculum and submit enrollment requests. Once approved by an administrator, courses will unlock in your learning dashboard.
              </p>
            </div>

            {catalogLoading ? (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-64 rounded-2xl bg-white border border-gray-100 animate-pulse" />
                ))}
              </div>
            ) : catalog.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-2xl border border-gray-100 p-8">
                <p className="text-gray-400 text-sm">No training courses currently published.</p>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {catalog.map((c) => (
                  <CatalogCard
                    key={c.id}
                    course={c}
                    onRequest={handleEnrollmentRequest}
                    requesting={requestingId}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 3: CERTIFICATES SECTION */}
        {activeTab === "certificates" && (
          <div>
            <div className="mb-6">
              <h2 className="text-lg font-bold text-[#0D1B3E]">Your Official Certifications</h2>
              <p className="text-xs text-gray-500 mt-1">
                Certificates automatically generated upon achieving 100% completion on training courses.
              </p>
            </div>

            {certificates.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-2xl border border-gray-100 p-8">
                <div className="w-14 h-14 rounded-2xl bg-amber-50 flex items-center justify-center mx-auto mb-4 text-2xl">
                  🏆
                </div>
                <h3 className="font-bold text-gray-800 text-base mb-1">No Certificates Earned Yet</h3>
                <p className="text-gray-400 text-sm max-w-sm mx-auto">
                  Complete all modules and lessons in an enrolled training course to earn your verified WHY Certificate of Completion.
                </p>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {certificates.map((cert) => (
                  <div
                    key={cert.id}
                    className="bg-white rounded-2xl border border-amber-200 shadow-sm p-6 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-bold bg-amber-100 text-amber-800 px-2.5 py-1 rounded-full">
                          Verified Certificate
                        </span>
                        <span className="text-[11px] text-gray-400 font-mono">
                          {cert.certificate_number}
                        </span>
                      </div>
                      <h3 className="font-bold text-gray-800 text-base mb-2">
                        {cert.training_title || "Training Certification"}
                      </h3>
                      <p className="text-xs text-gray-400">
                        Issued on {new Date(cert.issued_at).toLocaleDateString()}
                      </p>
                    </div>

                    <Link
                      to={`/learn/certificate/${cert.id}`}
                      className="mt-6 text-center text-xs font-bold bg-amber-500 hover:bg-amber-600 text-white py-2.5 rounded-xl transition duration-200 shadow-sm flex items-center justify-center gap-1.5"
                    >
                      <span>🏆</span> View / Download Certificate
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}