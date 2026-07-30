import { useEffect, useRef, useState, useCallback } from "react";
import { getLessonPageBlobUrl } from "../../services/learnService";

// NOTE ON "NO DOWNLOAD":
// This viewer never loads the source .pdf/.pptx in the browser. The backend
// pre-renders each slide/page to a JPEG, and we request one page at a time
// as an object URL. There's no <a download>, no file picker, no visible file
// path — clicking, dragging, and right-click-save are disabled. That said,
// no client-side technique can stop a determined user from taking a
// screenshot; this is a practical deterrent for casual reuse, not DRM.

export default function SecureDocViewer({
  lessonId,
  totalPages,
  page,
  onPageChange,
  watermarkLabel,
}) {
  const [imgUrl, setImgUrl] = useState(null);
  const [loadingPage, setLoadingPage] = useState(true);
  const [error, setError] = useState("");
  const containerRef = useRef(null);
  const currentUrlRef = useRef(null);

  const loadPage = useCallback(async (p) => {
    setLoadingPage(true);
    setError("");
    try {
      const url = await getLessonPageBlobUrl(lessonId, p);
      // Revoke the previous blob URL once the new one is ready.
      if (currentUrlRef.current) URL.revokeObjectURL(currentUrlRef.current);
      currentUrlRef.current = url;
      setImgUrl(url);
    } catch (err) {
      setError("Couldn't load this page. Try again in a moment.");
    } finally {
      setLoadingPage(false);
    }
  }, [lessonId]);

  useEffect(() => {
    loadPage(page);
    return () => {
      if (currentUrlRef.current) URL.revokeObjectURL(currentUrlRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, lessonId]);

  // Keyboard navigation + block common "save" shortcuts while focused here.
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const handleKeyDown = (e) => {
      if (e.key === "ArrowRight") onPageChange(Math.min(page + 1, totalPages));
      if (e.key === "ArrowLeft") onPageChange(Math.max(page - 1, 1));
      const blockCombo =
        (e.ctrlKey || e.metaKey) && ["s", "p", "u"].includes(e.key.toLowerCase());
      if (blockCombo) e.preventDefault();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [page, totalPages, onPageChange]);

  return (
    <div
      ref={containerRef}
      tabIndex={0}
      onContextMenu={(e) => e.preventDefault()}
      className="relative w-full bg-[#0F1B2D] rounded-2xl overflow-hidden select-none outline-none focus:ring-2 focus:ring-[#52B5BD]/40"
    >
      <div className="relative flex items-center justify-center min-h-[420px] max-h-[75vh]">
        {loadingPage && (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="w-8 h-8 rounded-full border-2 border-white/30 border-t-white animate-spin" />
          </div>
        )}

        {error && !loadingPage && (
          <div className="text-center px-6">
            <p className="text-white/80 text-sm mb-3">{error}</p>
            <button
              onClick={() => loadPage(page)}
              className="text-xs font-semibold text-white bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg transition"
            >
              Retry
            </button>
          </div>
        )}

        {imgUrl && !error && (
          <img
            src={imgUrl}
            alt={`Slide ${page} of ${totalPages}`}
            draggable={false}
            onDragStart={(e) => e.preventDefault()}
            className={`max-h-[75vh] max-w-full object-contain transition-opacity duration-200 ${
              loadingPage ? "opacity-0" : "opacity-100"
            }`}
          />
        )}

        {/* Transparent overlay defeats simple drag-to-save / right panel save */}
        <div className="absolute inset-0" />

        {/* Watermark deterrent */}
        {watermarkLabel && (
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <span
              className="text-white/10 text-3xl font-bold whitespace-nowrap"
              style={{ transform: "rotate(-28deg)" }}
            >
              {watermarkLabel}
            </span>
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between px-4 py-3 bg-[#0B1524] border-t border-white/5">
        <button
          onClick={() => onPageChange(Math.max(page - 1, 1))}
          disabled={page <= 1}
          className="text-white/70 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed text-sm font-medium flex items-center gap-1 px-3 py-1.5 rounded-lg hover:bg-white/5 transition"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Prev
        </button>

        <span className="text-white/60 text-xs font-medium">
          Page {page} of {totalPages}
        </span>

        <button
          onClick={() => onPageChange(Math.min(page + 1, totalPages))}
          disabled={page >= totalPages}
          className="text-white/70 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed text-sm font-medium flex items-center gap-1 px-3 py-1.5 rounded-lg hover:bg-white/5 transition"
        >
          Next
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </div>
  );
}
