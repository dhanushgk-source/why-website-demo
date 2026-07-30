import { getLessonVideoUrl } from "../../services/learnService";

export default function VideoLessonViewer({ fileId, videoUrl }) {
  const src = videoUrl || getLessonVideoUrl(fileId);
  return (
    <div className="w-full bg-black rounded-2xl overflow-hidden">
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