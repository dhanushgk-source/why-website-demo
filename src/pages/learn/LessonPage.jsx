import { useEffect, useRef, useState, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getMyLesson,
  updateMyLessonProgress,
} from "../../services/learnService";
import { useAuth } from "../../contexts/AuthContext";
import { useLearnCourse } from "../../contexts/LearnCourseContext";
import PdfLessonViewer from "../../components/learn/PdfLessonViewer";
import PptLessonViewer from "../../components/learn/PptLessonViewer";
import VideoLessonViewer from "../../components/learn/VideoLessonViewer";
import NotesLessonViewer from "../../components/learn/NotesLessonViewer";

export default function LessonPage() {
  const { courseId, lessonId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { patchLessonStatus } = useLearnCourse();

  const [lesson, setLesson] = useState(null);
  const [progress, setProgress] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [marking, setMarking] = useState(false);

  const debounceRef = useRef(null);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    setError("");

    (async () => {
      try {
        const res = await getMyLesson(lessonId);
        if (!mounted) return;
        setLesson(res.data.lesson);
        setProgress(res.data.progress);

        // Mark as opened / in-progress immediately so "continue" reflects it,
        // unless it's already completed (don't downgrade a finished lesson
        // just because the user re-opened it to review).
        if (res.data.progress?.status !== "completed") {
          updateMyLessonProgress(lessonId, {
            status: "in_progress",
            lastPage: res.data.progress?.lastPage ?? null,
          }).catch(() => {});
          patchLessonStatus(lessonId, "in_progress");
        }
      } catch (err) {
        if (mounted) {
          setError(err.response?.data?.message || "Couldn't load this lesson.");
        }
      } finally {
        if (mounted) setLoading(false);
      }
    })();

    return () => { mounted = false; };
  }, [lessonId, patchLessonStatus]);

  // Debounced page-progress save, only meaningful for PDF lessons.
  const handlePdfProgress = useCallback(
    (page) => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
      debounceRef.current = setTimeout(() => {
        updateMyLessonProgress(lessonId, { status: "in_progress", lastPage: page }).catch(() => {});
      }, 600);
    },
    [lessonId]
  );

  const handleMarkComplete = async () => {
    setMarking(true);
    try {
      await updateMyLessonProgress(lessonId, {
        status: "completed",
        lastPage: progress?.lastPage ?? null,
      });
      patchLessonStatus(lessonId, "completed");
      if (lesson?.nextLessonId) {
        navigate(`/learn/course/${courseId}/lesson/${lesson.nextLessonId}`);
      }
    } catch {
      setError("Couldn't save your progress. Please try again.");
    } finally {
      setMarking(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-32">
        <span className="w-8 h-8 rounded-full border-2 border-gray-200 border-t-[#52B5BD] animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <p className="text-red-500 bg-red-50 border border-red-200 rounded-xl px-4 py-3 inline-block">
          {error}
        </p>
      </div>
    );
  }

  if (!lesson) return null;

  return (
    <div className="max-w-4xl mx-auto px-4 lg:px-8 py-8">
      <div className="mb-5">
        <h1 className="text-xl md:text-2xl font-bold text-gray-800">{lesson.title}</h1>
        {lesson.description && (
          <p className="text-sm text-gray-500 mt-1">{lesson.description}</p>
        )}
      </div>

      {lesson.type === "pdf" && (
        <PdfLessonViewer
          fileId={lesson.pdfFileId}
          initialPage={progress?.lastPage || 1}
          onProgress={handlePdfProgress}
          watermarkLabel={user?.email}
        />
      )}

      {lesson.type === "ppt" && (
        <PptLessonViewer fileId={lesson.pptFileId} pptName={lesson.pptName} />
      )}

      {lesson.type === "video" && (
        <VideoLessonViewer fileId={lesson.videoFileId} videoUrl={lesson.videoUrl} />
      )}

      {lesson.type === "notes" && (
        <NotesLessonViewer content={lesson.notesContent} />
      )}

      <div className="flex items-center justify-between mt-6 gap-3 flex-wrap">
        <button
          disabled={!lesson.prevLessonId}
          onClick={() => navigate(`/learn/course/${courseId}/lesson/${lesson.prevLessonId}`)}
          className="text-sm font-semibold text-gray-500 hover:text-[#2F4A7D] disabled:opacity-30 disabled:cursor-not-allowed transition px-4 py-2.5 rounded-xl hover:bg-gray-100"
        >
          ← Previous lesson
        </button>

        <button
          onClick={handleMarkComplete}
          disabled={marking}
          className="text-sm font-semibold bg-[#52B5BD] hover:bg-[#2F4A7D] text-white px-6 py-2.5 rounded-xl transition disabled:opacity-60"
        >
          {marking
            ? "Saving…"
            : lesson.nextLessonId
            ? "Mark complete & continue →"
            : "Mark complete"}
        </button>
      </div>
    </div>
  );
}