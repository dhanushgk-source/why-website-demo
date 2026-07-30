import { useEffect, useState } from "react";
import { Outlet, useParams } from "react-router-dom";
import { LearnCourseProvider, useLearnCourse } from "../../contexts/LearnCourseContext";
import CourseSidebar from "../../components/learn/CourseSidebar";
import LearnTopbar from "../../components/learn/LearnTopbar";

function CourseLayoutInner() {
  const { tree, loadTree } = useLearnCourse();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    loadTree();
  }, [loadTree]);

  const allLessons = tree?.modules?.flatMap((m) => m.lessons) || [];
  const completed = allLessons.filter((l) => l.status === "completed").length;
  const percent = allLessons.length ? (completed / allLessons.length) * 100 : 0;

  return (
    <div className="flex min-h-screen bg-[#F8FAFB]">
      <CourseSidebar
        mobileOpen={mobileOpen}
        onCloseMobile={() => setMobileOpen(false)}
      />
      <div className="flex-1 min-w-0 flex flex-col">
        <LearnTopbar
          onOpenMobileMenu={() => setMobileOpen(true)}
          progressPercent={percent}
        />
        <div className="flex-1 min-w-0">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default function CourseLayout() {
  const { courseId } = useParams();
  return (
    <LearnCourseProvider courseId={courseId}>
      <CourseLayoutInner />
    </LearnCourseProvider>
  );
}