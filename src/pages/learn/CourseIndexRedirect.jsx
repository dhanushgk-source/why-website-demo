import { useEffect } from "react";
import { Navigate, useParams } from "react-router-dom";
import { useLearnCourse } from "../../contexts/LearnCourseContext";

// Landing on /learn/course/:courseId with no lesson picked yet — figure out
// where the user should resume and redirect there. Priority: the lesson
// they're mid-way through, then the first not-yet-started lesson, then just
// the first lesson in the course (e.g. if everything's already complete).
export default function CourseIndexRedirect() {
  const { courseId } = useParams();
  const { tree, loading } = useLearnCourse();

  if (loading || !tree) {
    return (
      <div className="flex items-center justify-center py-32">
        <span className="w-8 h-8 rounded-full border-2 border-gray-200 border-t-[#52B5BD] animate-spin" />
      </div>
    );
  }

  const allLessons = tree.modules.flatMap((m) => m.lessons);
  const target =
    allLessons.find((l) => l.status === "in_progress") ||
    allLessons.find((l) => l.status === "not_started") ||
    allLessons[0];

  if (!target) {
    return (
      <div className="text-center py-32 text-gray-400">
        This course doesn't have any lessons yet.
      </div>
    );
  }

  return (
    <Navigate to={`/learn/course/${courseId}/lesson/${target.id}`} replace />
  );
}