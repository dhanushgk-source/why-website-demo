// learnService.js
// Calls the backend's real student-facing LMS routes (mounted at /api/me,
// see backend src/routes/myLearningRoutes.js + controllers/myLearningController.js)
// plus the existing lesson asset proxy routes for streaming pdf/ppt/video files.

import API from "./api";

// ---- student auth methods -----------------------------------------------
export const firebaseAuth = (data) => API.post("/auth/firebase", data);
export const registerStudent = (data) => API.post("/auth/register-student", data);
export const loginStudent = (data) => API.post("/auth/login", data);

// ---- student-facing data (all require a logged-in user) ------------------

// -> { success, isStudent, trainings: [{ id, title, description, coverImage,
//        totalLessons, completedLessons, resumeLessonId }] }
export const getMyTrainings = () => API.get("/me/trainings");

// -> { success, catalog: [{ id, title, description, category, duration, coverImage, totalLessons, isEnrolled, isRequested, enrollmentStatus }] }
export const getCourseCatalog = () => API.get("/me/catalog");

// -> { success, message }
export const requestCourseEnrollment = (trainingId) => API.post(`/me/courses/${trainingId}/request`);

// -> { success, courseId, title, modules: [{ id, title, lessons: [
//        { id, title, type: 'video'|'pdf'|'ppt'|'notes', durationMinutes, status }
//      ]}]}
export const getMyTrainingTree = (trainingId) =>
  API.get(`/me/trainings/${trainingId}/tree`);

// -> { success, lesson: { id, courseId, moduleId, title, description, type,
//        durationMinutes, videoUrl, videoFileId, pdfFileId, pdfName,
//        pptFileId, pptName, notesContent, prevLessonId, nextLessonId },
//      progress: { status, lastPage } }
export const getMyLesson = (lessonId) => API.get(`/me/lessons/${lessonId}`);

// body: { status: 'in_progress' | 'completed', lastPage?: number }
export const updateMyLessonProgress = (lessonId, data) =>
  API.put(`/me/lessons/${lessonId}/progress`, data);

// ---- raw asset URLs --------------------------------------------------------
// These hit the backend's UNAUTHENTICATED proxy routes directly (not through
// the `API` axios instance) because they're consumed by <video>/<iframe>/
// fetch-as-blob rather than XHR calls that could carry an Authorization
// header. See backend src/routes/lessonAssetRoutes.js.
//
// Known limitation (flagged to the team, not solved here): these routes have
// no auth or enrollment check today — anyone with a fileId can stream the
// raw file. Tightening that would mean adding a lightweight signed-URL or
// short-lived-token scheme to lessonAssetRoutes.js, which is a backend change
// beyond this pass.

const API_ORIGIN = (import.meta.env.VITE_API_BASE_URL || "").replace(/\/+$/, "");

export const getLessonPdfUrl = (fileId) => `${API_ORIGIN}/api/lessons/pdf/${fileId}`;
export const getLessonPptUrl = (fileId) => `${API_ORIGIN}/api/lessons/ppt/${fileId}`;
export const getLessonVideoUrl = (fileId) => `${API_ORIGIN}/api/lessons/video/${fileId}`;

// Fetches the raw PDF bytes as a blob so pdf.js can render it to canvas
// page-by-page in <PdfLessonViewer>, without ever exposing a plain <a href>
// or <iframe src> the user could "save as" directly.
// Fetches the raw PDF bytes so pdf.js can render them to canvas page-by-page
// in <PdfLessonViewer>, without ever exposing a plain <a href> or
// <iframe src> the user could "save as" directly. Returning raw bytes (rather
// than a blob: object URL) so we can pass `{ data }` straight into
// pdfjsLib.getDocument() — blob: URLs route through pdf.js's network-stream
// code path, which has proven finicky; passing bytes directly sidesteps that
// entirely and is the more standard in-browser usage pattern anyway.
export const getLessonPdfBytes = async (fileId) => {
  const url = getLessonPdfUrl(fileId);
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Couldn't load the PDF (HTTP ${res.status} from ${url})`);
  }
  return res.arrayBuffer();
};