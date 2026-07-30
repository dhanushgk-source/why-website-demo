import { createContext, useCallback, useContext, useState } from "react";
import { getMyTrainingTree } from "../services/learnService";

const LearnCourseContext = createContext(null);

export function LearnCourseProvider({ courseId, children }) {
  const [tree, setTree] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadTree = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const res = await getMyTrainingTree(courseId);
      setTree(res.data);
    } catch (err) {
      setError(
        err.response?.data?.message || "Couldn't load this course's lessons."
      );
    } finally {
      setLoading(false);
    }
  }, [courseId]);

  // Locally patch a lesson's status the instant the user finishes it,
  // so the sidebar checkmark updates without waiting for a refetch.
  const patchLessonStatus = useCallback((lessonId, status) => {
    setTree((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        modules: prev.modules.map((m) => ({
          ...m,
          lessons: m.lessons.map((l) =>
            l.id === lessonId ? { ...l, status } : l
          ),
        })),
      };
    });
  }, []);

  return (
    <LearnCourseContext.Provider
      value={{ courseId, tree, loading, error, loadTree, patchLessonStatus }}
    >
      {children}
    </LearnCourseContext.Provider>
  );
}

export const useLearnCourse = () => {
  const ctx = useContext(LearnCourseContext);
  if (!ctx) {
    throw new Error("useLearnCourse must be used inside <LearnCourseProvider>");
  }
  return ctx;
};