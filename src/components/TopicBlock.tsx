import React from 'react';
import RichContent from './RichContent';

const TopicBlock = ({ topic }: any) => {
  if (!topic || !topic.attributes) {
    return (
      <div className="bg-white rounded-md p-4 mb-3 border shadow-sm">
        <p className="text-gray-500 italic">Topic data unavailable.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-md p-4 mb-3 shadow-sm border-l-4 border-indigo-500 transition hover:border-indigo-600">
      <h5 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
        {topic.attributes?.title ?? "Untitled Topic"}
      </h5>

      <RichContent
        content={topic.attributes?.content}
        notes={topic.attributes?.notes}
      />
    </div>
  );
};

export default TopicBlock;
