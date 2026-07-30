export default function NotesLessonViewer({ content }) {
  return (
    <div className="w-full bg-white rounded-2xl border border-gray-100 p-6 md:p-8">
      <div className="prose prose-sm max-w-none text-gray-700 whitespace-pre-wrap leading-relaxed">
        {content || "No notes were added for this lesson."}
      </div>
    </div>
  );
}