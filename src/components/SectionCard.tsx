import React from 'react';
import LessonCard from './LessonCard';

const SectionCard = ({ section, expanded, onToggle, onToggleLessonComplete, progressPercent, isLoading }) => {
  return (
    <div className="bg-gradient-to-r from-gray-50 to-white rounded-xl shadow-md mb-5 transition-transform transform hover:-translate-y-1 hover:shadow-xl">
      <button
        onClick={() => onToggle(section.id)}
        aria-expanded={expanded}
        className="w-full text-left flex justify-between items-center p-4 font-semibold text-gray-800 focus:outline-none"
      >
        <div className="flex items-center gap-2">
          <span className="text-xl">📂</span>
          <span>{section.attributes.title}</span>
        </div>
        <svg
          className={`w-5 h-5 ml-2 transition-transform duration-300 ${expanded ? "rotate-180" : ""}`}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {expanded && (
        <div className="p-4 border-t border-gray-100 bg-white transition-all duration-500 ease-in-out">
          <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
            <div
              className="bg-green-500 h-2.5 rounded-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>
          <p className="text-xs text-gray-500 mb-3">{progressPercent}% completed</p>
          <p className="text-gray-600 mb-3 italic">{section.attributes.description}</p>

          {isLoading ? (
            <div className="flex items-center space-x-2">
              <div className="animate-spin h-5 w-5 border-2 border-indigo-600 border-t-transparent rounded-full"></div>
              <span className="text-gray-500 text-sm">Loading lessons...</span>
            </div>
          ) : (
            section.lessons?.map((lesson, index) => (
              <LessonCard
                key={lesson.id || `${lesson.attributes.title}-${index}`}
                lesson={lesson}
                onToggleComplete={onToggleLessonComplete}
              />
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default SectionCard;
