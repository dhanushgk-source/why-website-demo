import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getMyTrainings } from "../../services/learnService";
import { useAuth } from "../../contexts/AuthContext";

function CourseCard({ course }) {
  const percent = course.totalLessons
    ? Math.round((course.completedLessons / course.totalLessons) * 100)
    : 0;
  const started = course.completedLessons > 0;
  const hasLessons = Boolean(course.resumeLessonId);
  const resumeHref = `/learn/course/${course.id}/lesson/${course.resumeLessonId}`;

  return (
    <div className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden flex flex-col">
      <div className="h-36 bg-gradient-to-br from-[#2F4A7D] to-[#52B5BD] relative overflow-hidden">
        {course.coverImage ? (
          <img
            src={course.coverImage}
            alt={course.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-white/80 font-semibold text-sm">
            {course.title}
          </div>
        )}
      </div>

      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-bold text-gray-800 mb-1 line-clamp-2">{course.title}</h3>
        <p className="text-xs text-gray-400 mb-4">
          {course.completedLessons}/{course.totalLessons} lessons complete
        </p>

        <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden mb-4">
          <div
            className="h-full bg-[#52B5BD] rounded-full transition-all duration-500"
            style={{ width: `${percent}%` }}
          />
        </div>

        {hasLessons ? (
          <Link
            to={resumeHref}
            className="mt-auto text-center text-sm font-semibold bg-[#2F4A7D] hover:bg-[#52B5BD] text-white py-2.5 rounded-xl transition-colors duration-300"
          >
            {started ? "Continue where you left off" : "Start course"}
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

export default function MyLearning() {
  const { user } = useAuth();
  const [courses, setCourses] = useState([]);
  const [isStudent, setIsStudent] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await getMyTrainings();
        if (mounted) {
          setCourses(res.data.trainings || []);
          setIsStudent(res.data.isStudent !== false);
        }
      } catch (err) {
        if (mounted)
          setError(err.response?.data?.message || "Couldn't load your courses.");
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, []);

  const inProgress = courses.find((c) => c.completedLessons > 0 && c.completedLessons < c.totalLessons);

  return (
    <div className="min-h-screen bg-[#F8FAFB]">
      <header className="bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 lg:px-8 py-6 flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-[#52B5BD] uppercase tracking-wide">My Learning</p>
            <h1 className="text-2xl font-bold text-[#2F4A7D] mt-1">
              Welcome back{user?.fullName ? `, ${user.fullName.split(" ")[0]}` : ""}
            </h1>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 lg:px-8 py-8">
        {inProgress && (
          <Link
            to={`/learn/course/${inProgress.id}/lesson/${inProgress.resumeLessonId}`}
            className="block mb-8 rounded-2xl bg-gradient-to-r from-[#2F4A7D] to-[#3E6BA8] text-white p-6 md:p-8 hover:shadow-xl transition-shadow duration-300"
          >
            <p className="text-white/70 text-xs font-semibold uppercase tracking-wide mb-2">
              Pick up where you left off
            </p>
            <h2 className="text-xl md:text-2xl font-bold mb-4">{inProgress.title}</h2>
            <span className="inline-flex items-center gap-2 text-sm font-semibold bg-white text-[#2F4A7D] px-4 py-2 rounded-xl">
              Continue lesson
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </Link>
        )}

        {loading && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-64 rounded-2xl bg-white border border-gray-100 animate-pulse" />
            ))}
          </div>
        )}

        {error && !loading && (
          <p className="text-sm text-red-500 bg-red-50 border border-red-200 rounded-xl px-4 py-3">
            {error}
          </p>
        )}

        {!loading && !error && isStudent && courses.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-400">You're not enrolled in any courses yet.</p>
          </div>
        )}

        {!loading && !error && !isStudent && (
          <div className="text-center py-20 max-w-md mx-auto">
            <div className="w-14 h-14 rounded-2xl bg-[#EAF6F7] flex items-center justify-center mx-auto mb-4">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M12 6v6l4 2" stroke="#52B5BD" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="12" cy="12" r="9" stroke="#52B5BD" strokeWidth="2" />
              </svg>
            </div>
            <p className="text-gray-600 font-medium mb-1">No courses assigned yet</p>
            <p className="text-gray-400 text-sm">
              Your account is created, but you haven't been enrolled in a course yet.
              Reach out to your administrator to get access.
            </p>
          </div>
        )}

        {!loading && !error && isStudent && courses.length > 0 && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {courses.map((c) => (
              <CourseCard key={c.id} course={c} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}