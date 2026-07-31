import { useState } from "react";

const CONTENT_TYPES = [
  { value: "video", label: "Video" },
  { value: "pdf", label: "PDF" },
  { value: "notes", label: "Notes" },
];

export default function LessonForm({ initial, busy, onSubmit, onCancel }) {
  const [title, setTitle] = useState(initial?.title || "");
  const [description, setDescription] = useState(initial?.description || "");
  const [durationMinutes, setDurationMinutes] = useState(initial?.duration_minutes || "");
  const [contentType, setContentType] = useState(initial?.content_type || "video");
  const [videoSource, setVideoSource] = useState(initial?.video_url ? "url" : "upload");
  const [videoFile, setVideoFile] = useState(null);
  const [videoUrl, setVideoUrl] = useState(initial?.video_url || "");
  const [pdfFile, setPdfFile] = useState(null);
  const [pdfFileName, setPdfFileName] = useState(initial?.pdf_name || "");
  const [notesContent, setNotesContent] = useState(initial?.notes_content || "");

  function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("content_type", contentType);
    if (durationMinutes) formData.append("duration_minutes", durationMinutes);

    if (contentType === "video") {
      if (videoSource === "upload" && videoFile) {
        formData.append("video", videoFile);
      } else if (videoSource === "url" && videoUrl) {
        formData.append("video_url", videoUrl);
      }
    } else if (contentType === "pdf" && pdfFile) {
      formData.append("pdf", pdfFile);
    } else if (contentType === "notes") {
      formData.append("notes_content", notesContent);
    }

    onSubmit(formData);
  }

  return (
    <form id="lesson-form" onSubmit={handleSubmit}>
      <div className="field">
        <label htmlFor="lesson-title">Lesson title</label>
        <input
          id="lesson-title"
          type="text"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Greeting Customers"
        />
      </div>

      <div className="field-row">
        <div className="field">
          <label htmlFor="lesson-type">Content type</label>
          <select id="lesson-type" value={contentType} onChange={(e) => setContentType(e.target.value)}>
            {CONTENT_TYPES.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>
        </div>
        <div className="field">
          <label htmlFor="lesson-duration">Duration (min)</label>
          <input
            id="lesson-duration"
            type="number"
            min="0"
            value={durationMinutes}
            onChange={(e) => setDurationMinutes(e.target.value)}
            placeholder="10"
          />
        </div>
      </div>

      {contentType === "video" && (
        <div className="field">
          <label>Video source</label>
          <div className="flex gap-12" style={{ marginBottom: 10 }}>
            <label style={{ display: "flex", alignItems: "center", gap: 6, fontWeight: 400 }}>
              <input
                type="radio"
                name="video-source"
                checked={videoSource === "upload"}
                onChange={() => setVideoSource("upload")}
              />
              Upload file
            </label>
            <label style={{ display: "flex", alignItems: "center", gap: 6, fontWeight: 400 }}>
              <input
                type="radio"
                name="video-source"
                checked={videoSource === "url"}
                onChange={() => setVideoSource("url")}
              />
              YouTube / Vimeo link
            </label>
          </div>

          {videoSource === "upload" ? (
            <input
              type="file"
              accept="video/*"
              onChange={(e) => setVideoFile(e.target.files[0] || null)}
            />
          ) : (
            <input
              type="url"
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
              placeholder="https://youtube.com/watch?v=…"
            />
          )}
        </div>
      )}

      {contentType === "pdf" && (
        <div className="field">
          <label htmlFor="lesson-pdf">PDF file</label>
          <input
            id="lesson-pdf"
            type="file"
            accept="application/pdf"
            onChange={(e) => {
              const f = e.target.files[0];
              setPdfFile(f || null);
              setPdfFileName(f?.name || "");
            }}
          />
          {pdfFileName && <p className="hint" style={{ marginTop: 6 }}>{pdfFileName}</p>}
        </div>
      )}

      {contentType === "notes" && (
        <div className="field">
          <label htmlFor="lesson-notes">Notes content</label>
          <textarea
            id="lesson-notes"
            rows={6}
            value={notesContent}
            onChange={(e) => setNotesContent(e.target.value)}
            placeholder="Write the lesson content…"
          />
        </div>
      )}

      <div className="field" style={{ marginBottom: 0 }}>
        <label htmlFor="lesson-description">Short description (optional)</label>
        <textarea
          id="lesson-description"
          rows={2}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Shown to students before they open the lesson"
        />
      </div>

      {onCancel && (
        <div style={{ display: "flex", justifyContent: "flex-end", gap: 10, marginTop: 20 }}>
          <button type="button" className="btn btn-outline" onClick={onCancel} disabled={busy}>
            Cancel
          </button>
          <button type="submit" className="btn btn-primary" disabled={busy}>
            {busy ? "Saving…" : initial ? "Save changes" : "Add lesson"}
          </button>
        </div>
      )}
    </form>
  );
}
