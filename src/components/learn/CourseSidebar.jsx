import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useLearnCourse } from "../../contexts/LearnCourseContext";

const STATUS_STYLES = {
  completed: { ring: "border-[#52B5BD] bg-[#52B5BD]", icon: "check" },
  in_progress: { ring: "border-[#2F4A7D] bg-white", icon: "dot" },
  not_started: { ring: "border-gray-300 bg-white", icon: "" },
  locked: { ring: "border-gray-200 bg-gray-100", icon: "lock" },
};

function StatusIcon({ status }) {
  const s = STATUS_STYLES[status] || STATUS_STYLES.not_started;
  return (
    <span
      className={`shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center ${s.ring}`}
    >
      {s.icon === "check" && (
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
          <path
            d="M20 6L9 17l-5-5"
            stroke="white"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
      {s.icon === "dot" && (
        <span className="w-2 h-2 rounded-full bg-[#2F4A7D]" />
      )}
      {s.icon === "lock" && (
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
          <path
            d="M6 10V8a6 6 0 1112 0v2M5 10h14v10H5V10z"
            stroke="#9CA3AF"
            strokeWidth="2"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </span>
  );
}

const TYPE_LABELS = { pdf: "PDF", ppt: "PPT", video: "VIDEO", notes: "NOTES" };

function TypeBadge({ type }) {
  return (
    <span className="text-[10px] font-semibold tracking-wide text-gray-400 border border-gray-200 rounded px-1.5 py-0.5">
      {TYPE_LABELS[type] || type?.toUpperCase()}
    </span>
  );
}

export default function CourseSidebar({ mobileOpen, onCloseMobile }) {
  const { courseId, lessonId } = useParams();
  const { tree, loading, error } = useLearnCourse();
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState({});

  // Auto-expand the module containing the currently active lesson.
  useEffect(() => {
    if (!tree || !lessonId) return;
    const active = tree.modules.find((m) =>
      m.lessons.some((l) => l.id === lessonId)
    );
    if (active) {
      setExpanded((prev) => ({ ...prev, [active.id]: true }));
    }
  }, [tree, lessonId]);

  const toggleModule = (id) =>
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));

  const goToLesson = (lesson) => {
    if (lesson.status === "locked") return;
    navigate(`/learn/course/${courseId}/lesson/${lesson.id}`);
    onCloseMobile?.();
  };

  const content = (
    <div className="flex flex-col h-full">
      <div className="px-5 py-5 border-b border-gray-100">
        <Link
          to="/learn"
          className="text-xs font-semibold text-[#52B5BD] hover:text-[#2F4A7D] transition flex items-center gap-1"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <path
              d="M15 18l-6-6 6-6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          My Learning
        </Link>
        <h2 className="mt-2 font-bold text-[#2F4A7D] text-lg leading-snug">
          {tree?.title || "Course"}
        </h2>
      </div>

      <div className="flex-1 overflow-y-auto px-3 py-3">
        {loading && (
          <div className="space-y-3 px-2 py-2 animate-pulse">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-4 bg-gray-100 rounded" />
            ))}
          </div>
        )}

        {error && (
          <p className="text-sm text-red-500 px-2 py-4">{error}</p>
        )}

        {tree?.modules?.map((mod, idx) => {
          const isOpen = !!expanded[mod.id];
          const completedCount = mod.lessons.filter(
            (l) => l.status === "completed"
          ).length;

          return (
            <div key={mod.id} className="mb-1">
              <button
                onClick={() => toggleModule(mod.id)}
                className="w-full flex items-center justify-between gap-2 px-2 py-2.5 rounded-lg hover:bg-gray-50 transition text-left"
              >
                <span className="flex items-center gap-2 min-w-0">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    className={`shrink-0 text-gray-400 transition-transform duration-200 ${
                      isOpen ? "rotate-90" : ""
                    }`}
                  >
                    <path
                      d="M9 6l6 6-6 6"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span className="text-sm font-semibold text-gray-800 truncate">
                    {idx + 1}. {mod.title}
                  </span>
                </span>
                <span className="text-[11px] text-gray-400 shrink-0">
                  {completedCount}/{mod.lessons.length}
                </span>
              </button>

              {/* Tree connector + lessons */}
              <div
                className={`relative ml-[18px] pl-4 border-l border-gray-150 overflow-hidden transition-all duration-300 ${
                  isOpen ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"
                }`}
                style={{ borderColor: "#EEF1F5" }}
              >
                <ul className="py-1 space-y-0.5">
                  {mod.lessons.map((lesson) => {
                    const active = lesson.id === lessonId;
                    const locked = lesson.status === "locked";
                    return (
                      <li key={lesson.id}>
                        <button
                          disabled={locked}
                          onClick={() => goToLesson(lesson)}
                          className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-left transition ${
                            active
                              ? "bg-[#EAF6F7] text-[#2F4A7D]"
                              : locked
                              ? "text-gray-350 cursor-not-allowed opacity-60"
                              : "text-gray-600 hover:bg-gray-50"
                          }`}
                        >
                          <StatusIcon status={lesson.status} />
                          <span
                            className={`flex-1 text-sm truncate ${
                              active ? "font-semibold" : ""
                            }`}
                          >
                            {lesson.title}
                          </span>
                          <TypeBadge type={lesson.type} />
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex lg:flex-col w-[300px] shrink-0 h-screen sticky top-0 bg-white border-r border-gray-100">
        {content}
      </aside>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-40">
          <div
            className="absolute inset-0 bg-black/30"
            onClick={onCloseMobile}
          />
          <aside className="absolute left-0 top-0 h-full w-[300px] bg-white shadow-2xl">
            {content}
          </aside>
        </div>
      )}
    </>
  );
}