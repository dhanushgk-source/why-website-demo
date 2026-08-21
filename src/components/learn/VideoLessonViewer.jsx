import { getLessonVideoUrl } from "../../services/learnService";

function formatYouTubeEmbedUrl(url) {
  if (!url) return "";
  let clean = url.trim();
  const match = clean.match(/(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
  if (match && match[1]) {
    return `https://www.youtube-nocookie.com/embed/${match[1]}?autoplay=0&rel=0&modestbranding=1`;
  }
  return clean;
}

export default function VideoLessonViewer({ fileId, videoUrl }) {
  const isYouTube = videoUrl && (videoUrl.includes("youtube.com") || videoUrl.includes("youtu.be"));

  if (isYouTube) {
    const embedUrl = formatYouTubeEmbedUrl(videoUrl);
    return (
      <div className="w-full bg-black rounded-2xl overflow-hidden aspect-video shadow-xl relative">
        <iframe
          src={embedUrl}
          title="Video Lesson"
          className="w-full h-full border-0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    );
  }

  const src = videoUrl || getLessonVideoUrl(fileId);
  return (
    <div className="w-full bg-black rounded-2xl overflow-hidden shadow-xl">
      <video
        key={src}
        src={src}
        controls
        controlsList="nodownload noremoteplayback"
        disablePictureInPicture
        onContextMenu={(e) => e.preventDefault()}
        className="w-full max-h-[75vh]"
      />
    </div>
  );
}