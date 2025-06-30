import React, { useEffect, useState } from 'react';

const LessonBlock = ({ lessonId, token }: { lessonId: string; token: string }) => {
  const [lesson, setLesson] = useState<any>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;

    fetch(`${import.meta.env.VITE_API_BASE_URL}/api/v1/lessons/${lessonId}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
      .then(data => setLesson(data.data))
      .catch(() => console.error("Failed to load lesson"));
  }, [open, lessonId, token]);

  if (!lesson) return (
    <button
      onClick={() => setOpen(!open)}
      className="w-full text-left bg-white px-4 py-2 border rounded mb-2"
    >
      Load Lesson
    </button>
  );

  const topics = lesson.relationships.topics.data;

  return (
    <div className="mb-2">
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left bg-white px-4 py-2 border rounded"
      >
        {lesson.attributes.title}
      </button>

      {open && (
        <div className="pl-4 mt-2">
          {topics.map((topic) => (
            <div key={topic.id} className="bg-gray-50 px-3 py-1 rounded mb-1">
              {topic.attributes ? topic.attributes.title : "Topic"}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LessonBlock;
