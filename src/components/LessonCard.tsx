import React from 'react';
import TopicBlock from './TopicBlock';

const LessonCard = ({ lesson, onToggleComplete }: any) => {
  if (!lesson) return null;

  const topics = lesson.topics?.filter(Boolean) ?? [];

  return (
    <div className="bg-gray-50 rounded-lg p-4 mb-5 border border-gray-200 shadow-sm transition hover:shadow-md">
      <div className="flex justify-between items-center mb-2">
        <h4 className="font-semibold text-lg">
          {lesson.attributes?.title ?? "Untitled Lesson"}
        </h4>
        <button
          onClick={() => onToggleComplete(lesson.id)}
          className={`text-xs px-3 py-1 rounded ${
            lesson.isCompleted ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700'
          }`}
        >
          {lesson.isCompleted ? 'Completed' : 'Mark Complete'}
        </button>
      </div>

      <p className="text-sm text-gray-500 mb-3">
        ⏱ Duration: {lesson.attributes?.duration ?? 'N/A'} min
      </p>

      {topics.length > 0 ? (
        topics.map((topic: any) => (
          <TopicBlock key={topic.id} topic={topic} />
        ))
      ) : (
        <p className="text-gray-400 italic">No topics available for this lesson.</p>
      )}
    </div>
  );
};

export default LessonCard;
