import { useState } from "react";
import { getLessonPptUrl } from "../../services/learnService";

// WHY THIS APPROACH: .pptx has no native browser renderer, and the backend
// doesn't convert slides to images/pdf at upload time. The pragmatic option
// with zero new backend work is Microsoft's Office Online viewer, embedded
// via iframe, pointed at the backend's existing (public) ppt proxy URL.
//
// HONEST LIMITATION: this is view-in-page, not true DRM. The Office viewer
// generally doesn't surface a one-click "Save as" the way a raw file link
// would, but a determined user can still find ways to get at the source —
// same as the PDF viewer, this deters casual reuse, it doesn't prevent it.
// If you need something stronger later, converting each slide to a JPEG at
// upload time (e.g. with LibreOffice) and reusing the same canvas approach
// as PdfLessonViewer would close this gap.

export default function PptLessonViewer({ fileId, pptName }) {
  const [loaded, setLoaded] = useState(false);
  const [errored, setErrored] = useState(false);

  const sourceUrl = getLessonPptUrl(fileId);
  const viewerUrl = `https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(
    sourceUrl
  )}`;

  return (
    <div className="relative w-full bg-[#0F1B2D] rounded-2xl overflow-hidden">
      <div
        onContextMenu={(e) => e.preventDefault()}
        className="relative w-full aspect-[16/10] bg-[#0B1524]"
      >
        {!loaded && !errored && (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="w-8 h-8 rounded-full border-2 border-white/30 border-t-white animate-spin" />
          </div>
        )}

        {errored && (
          <div className="absolute inset-0 flex items-center justify-center px-6 text-center">
            <p className="text-white/80 text-sm">
              Couldn't load this slide deck. Try refreshing the page.
            </p>
          </div>
        )}

        <iframe
          title={pptName || "Lesson slides"}
          src={viewerUrl}
          onLoad={() => setLoaded(true)}
          onError={() => setErrored(true)}
          className={`w-full h-full border-0 transition-opacity duration-300 ${
            loaded ? "opacity-100" : "opacity-0"
          }`}
          sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
        />
      </div>
      <div className="px-4 py-2.5 bg-[#0B1524] border-t border-white/5">
        <p className="text-white/40 text-xs">{pptName || "Slides"}</p>
      </div>
    </div>
  );
}