// SectionAccordion.tsx
import React, { useState } from 'react';

const SectionAccordion = ({ section }: { section: any }) => {
  const [isOpen, setIsOpen] = useState(false);

  const lessons = section.relationships.lessons.data;

  return (
    <div className="border rounded mb-2">
      <button
        className="w-full p-4 text-left font-semibold bg-gray-100 hover:bg-gray-200"
        onClick={() => setIsOpen(!isOpen)}
      >
        {section.attributes.title}
      </button>
      {isOpen && (
        <div className="p-4 bg-white">
          {lessons.length > 0 ? (
            <ul className="space-y-2">
              {lessons.map((lesson: any) => (
                <li key={lesson.id} className="border p-2 rounded">
                  {lesson.attributes.title}
                  {/* Optionally: Render topics too */}
                </li>
              ))}
            </ul>
          ) : (
            <p>No lessons available</p>
          )}
        </div>
      )}
    </div>
  );
};

export default SectionAccordion;
