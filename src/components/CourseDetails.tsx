import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

const CourseDetails = () => {
  const { slug } = useParams();
  const [course, setCourse] = useState(null);
  const [sections, setSections] = useState([]);

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("onegrab_user") || "{}").token;
    if (!token) return;

    fetch(`${import.meta.env.VITE_API_BASE_URL}/api/v1/my_courses/${slug}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
      .then(data => {
        const includedMap = { section: {}, lesson: {}, topic: {} };

        data.included.forEach((item) => {
          includedMap[item.type][item.id] = item;
        });

        const sections = data.data.relationships.sections.data.map((sectionRef) => {
          const section = includedMap.section[sectionRef.id];
          const lessons = section.relationships.lessons.data.map((lessonRef) => {
            const lesson = includedMap.lesson[lessonRef.id];
            const topics = lesson.relationships.topics.data.map((topicRef) => includedMap.topic[topicRef.id]);
            return { ...lesson, topics };
          });
          return { ...section, lessons };
        });

        setCourse(data.data);
        setSections(sections);
      })
      .catch(() => toast.error("Failed to load course details"));
  }, [slug]);

  if (!course) {
    return (
      <div className="flex flex-col items-center justify-center py-20 space-y-4">
        <svg
          className="animate-spin h-10 w-10 text-indigo-600"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
          ></path>
        </svg>
        <p className="text-gray-500 text-center text-sm">
          Fetching course content... hang tight! 🚀
        </p>
      </div>
    );
  }


  const { attributes } = course;

  return (
    <section id="course-details" className="py-20 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 max-w-5xl">
        <h1 className="text-4xl font-bold text-gray-800 mb-3">{attributes.title}</h1>
        <p className="text-gray-600 mb-5">{attributes.description}</p>
        <img
          src={attributes.thumbnail_url}
          alt={attributes.title}
          className="w-full rounded-xl shadow-lg mb-10 object-cover max-h-96"
        />

        {sections.map((section) => (
          <div key={section.id} className="bg-white rounded-lg shadow-md mb-6 overflow-hidden">
            <details className="group">
              <summary className="flex justify-between items-center cursor-pointer p-4 bg-gradient-to-r from-indigo-50 to-purple-50 font-semibold text-gray-800 group-open:bg-gradient-to-r group-open:from-purple-100 group-open:to-indigo-50 transition-colors">
                {section.attributes.title}
                <span className="ml-2 text-gray-500 group-open:rotate-180 transition-transform">&#9660;</span>
              </summary>
              <div className="p-4 border-t border-gray-100">
                <p className="text-gray-600 mb-3 italic">{section.attributes.description}</p>

                {section.lessons.map((lesson) => (
                  <div key={lesson.id} className="bg-gray-50 rounded-lg p-4 mb-5 border border-gray-200">
                    <h4 className="font-semibold text-lg mb-1">{lesson.attributes.title}</h4>
                    <p className="text-sm text-gray-500 mb-3">⏱ Duration: {lesson.attributes.duration ?? 'N/A'} min</p>

                    {lesson.topics.map((topic) => {
                      const contentBody = topic.attributes.content;
                      const notesBody = topic.attributes.notes;
                      const finalContent = contentBody || notesBody || 'Content coming soon 🚧';

                      // Check if starts with < to decide HTML vs MD
                      const isHtml = finalContent.trim().startsWith('<');

                      return (
                        <div key={topic.id} className="bg-white rounded-md p-4 mb-4 shadow-sm border">
                          <h5 className="font-semibold text-gray-800 mb-2">{topic.attributes.title}</h5>

                          <div className="prose max-w-none text-gray-700">
                            {isHtml ? (
                              <div dangerouslySetInnerHTML={{ __html: finalContent }} />
                            ) : (
                              <ReactMarkdown
                                components={{
                                  code({ node, inline, className, children, ...props }) {
                                    const match = /language-(\w+)/.exec(className || '');
                                    return !inline && match ? (
                                      <SyntaxHighlighter
                                        style={oneDark}
                                        language={match[1]}
                                        PreTag="div"
                                        {...props}
                                      >
                                        {String(children).replace(/\n$/, '')}
                                      </SyntaxHighlighter>
                                    ) : (
                                      <code className={className} {...props}>{children}</code>
                                    );
                                  }
                                }}
                              >
                                {finalContent}
                              </ReactMarkdown>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>
            </details>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CourseDetails;
