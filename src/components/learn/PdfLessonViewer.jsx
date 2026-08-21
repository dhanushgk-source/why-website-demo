import { useEffect, useRef, useState, useCallback } from "react";
import { getLessonPdfBytes } from "../../services/learnService";

// Requires the "pdfjs-dist" package: npm install pdfjs-dist
//
// WHY THIS APPROACH: the backend only stores the original PDF (via Google
// Drive) and streams it whole through an unauthenticated proxy route — there
// is no server-side per-page image pipeline. Rendering the fetched PDF to a
// <canvas> in-browser means the user only ever sees pixels we drew, never a
// native PDF viewer chrome with its own "download"/"print" buttons, and there
// is no <a href>/<iframe src> pointing at a file they could "save as."
//
// HONEST LIMITATION: like any client-side viewer, this doesn't stop a
// screenshot. It stops the easy, one-click ways of saving the file.

let pdfjsLibPromise;
async function loadPdfJs() {
  if (!pdfjsLibPromise) {
    // pdfjs-dist v4+ is ESM-only — only "pdf.mjs" / "pdf.worker.min.mjs"
    // exist, there's no legacy ".js" build to fall back to. Importing the
    // worker via Vite's `?url` suffix bundles it straight from the same
    // installed package, so the worker version always matches the library
    // version (no dependency on a CDN having mirrored that exact release).
    pdfjsLibPromise = (async () => {
      const mod = await import("pdfjs-dist/build/pdf.mjs");
      const workerUrl = (await import("pdfjs-dist/build/pdf.worker.min.mjs?url")).default;
      mod.GlobalWorkerOptions.workerSrc = workerUrl;
      return mod;
    })();
  }
  return pdfjsLibPromise;
}

export default function PdfLessonViewer({
  fileId,
  initialPage,
  onProgress, // (page, numPages) => void
  watermarkLabel = "WHY · We Help You",
}) {
  const canvasRef = useRef(null);
  const pdfDocRef = useRef(null);
  const containerRef = useRef(null);
  const scrollAreaRef = useRef(null);
  const renderTaskRef = useRef(null);

  const [numPages, setNumPages] = useState(0);
  const [page, setPage] = useState(initialPage || 1);
  const [status, setStatus] = useState("loading"); // loading | ready | error

  // Load the document once.
  useEffect(() => {
    let cancelled = false;

    (async () => {
      setStatus("loading");
      try {
        if (!fileId) {
          throw new Error(
            `PdfLessonViewer received an empty fileId prop — check that the lesson's pdfFileId is set (backend column pdf_file_id) and that LessonPage is passing lesson.pdfFileId in.`
          );
        }
        const pdfjsLib = await loadPdfJs();
        const bytes = await getLessonPdfBytes(fileId);
        console.log("PdfLessonViewer: fetched", bytes.byteLength, "bytes for fileId", fileId);
        const doc = await pdfjsLib.getDocument({ data: new Uint8Array(bytes) }).promise;
        if (cancelled) return;
        pdfDocRef.current = doc;
        setNumPages(doc.numPages);
        setPage(Math.min(Math.max(initialPage || 1, 1), doc.numPages));
        setStatus("ready");
      } catch (err) {
        console.error("PdfLessonViewer failed to load PDF:", err);
        if (!cancelled) setStatus("error");
      }
    })();

    return () => {
      cancelled = true;
      pdfDocRef.current?.destroy?.();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fileId]);

  // Render whichever page is current.
  useEffect(() => {
    if (status !== "ready" || !pdfDocRef.current) return;
    let cancelled = false;

    (async () => {
      const pdfPage = await pdfDocRef.current.getPage(page);
      if (cancelled) return;

      const canvas = canvasRef.current;
      const containerWidth = scrollAreaRef.current?.clientWidth || 800;
      const baseViewport = pdfPage.getViewport({ scale: 1 });
      const scale = Math.min((containerWidth - 32) / baseViewport.width, 2);
      const viewport = pdfPage.getViewport({ scale });

      canvas.width = viewport.width;
      canvas.height = viewport.height;
      const ctx = canvas.getContext("2d");

      renderTaskRef.current?.cancel();
      const task = pdfPage.render({ canvasContext: ctx, viewport });
      renderTaskRef.current = task;
      try {
        await task.promise;
      } catch {
        // Cancelled render from a fast page flip — ignore.
      }

      onProgress?.(page, pdfDocRef.current.numPages);
      // Browsers auto-adjust scroll position ("scroll anchoring") when
      // content above the viewport resizes — e.g. swapping a small spinner
      // for a tall canvas — which can silently scroll past the top of a
      // freshly-loaded page. Force back to the top explicitly every time.
      if (scrollAreaRef.current) scrollAreaRef.current.scrollTop = 0;
    })();

    return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, status]);

  const goToPage = useCallback(
    (p) => setPage(Math.min(Math.max(p, 1), numPages || 1)),
    [numPages]
  );

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowRight") goToPage(page + 1);
      if (e.key === "ArrowLeft") goToPage(page - 1);
      const blockCombo =
        (e.ctrlKey || e.metaKey) && ["s", "p", "u"].includes(e.key.toLowerCase());
      if (blockCombo) e.preventDefault();
    };
    const el = containerRef.current;
    el?.addEventListener("keydown", handleKeyDown);
    return () => el?.removeEventListener("keydown", handleKeyDown);
  }, [page, goToPage]);

  return (
    <div
      ref={containerRef}
      tabIndex={0}
      onContextMenu={(e) => e.preventDefault()}
      className="relative w-full bg-[#0F1B2D] rounded-2xl overflow-hidden select-none outline-none focus:ring-2 focus:ring-[#52B5BD]/40"
    >
      <div
        ref={scrollAreaRef}
        style={{ overflowAnchor: "none" }}
        className="relative flex items-start justify-center min-h-[420px] max-h-[75vh] overflow-auto py-4"
      >
        {status === "loading" && (
          <span className="w-8 h-8 rounded-full border-2 border-white/30 border-t-white animate-spin" />
        )}

        {status === "error" && (
          <p className="text-white/80 text-sm px-6 text-center">
            Couldn't load this PDF. Try refreshing the page.
          </p>
        )}

        {status === "ready" && (
          <div className="relative inline-block">
            <canvas ref={canvasRef} draggable={false} className="max-w-full" />
            {watermarkLabel && (
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                <span
                  className="text-black/10 text-3xl font-bold whitespace-nowrap"
                  style={{ transform: "rotate(-28deg)" }}
                >
                  {watermarkLabel}
                </span>
              </div>
            )}
          </div>
        )}
        {status !== "ready" && <canvas ref={canvasRef} className="hidden" />}
      </div>

      <div className="flex items-center justify-between px-4 py-3 bg-[#0B1524] border-t border-white/5">
        <button
          onClick={() => goToPage(page - 1)}
          disabled={page <= 1}
          className="text-white/70 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed text-sm font-medium flex items-center gap-1 px-3 py-1.5 rounded-lg hover:bg-white/5 transition"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Prev
        </button>

        <span className="text-white/60 text-xs font-medium">
          {numPages ? `Page ${page} of ${numPages}` : "\u00A0"}
        </span>

        <button
          onClick={() => goToPage(page + 1)}
          disabled={page >= numPages}
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