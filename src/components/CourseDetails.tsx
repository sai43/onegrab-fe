import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const CourseDetails = () => {
  const { slug } = useParams();
  const [course, setCourse] = useState<any>(null);
  const [sections, setSections] = useState<any[]>([]);

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("onegrab_user") || "{}").token;
    if (!token) return;

    fetch(`${import.meta.env.VITE_API_BASE_URL}/api/v1/my_courses/${slug}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
      .then(data => {
        const includedMap: any = { section: {}, lesson: {}, topic: {} };

        data.included.forEach((item: any) => {
          includedMap[item.type][item.id] = item;
        });

        const sections = data.data.relationships.sections.data.map((sectionRef: any) => {
          const section = includedMap.section[sectionRef.id];
          const lessons = section.relationships.lessons.data.map((lessonRef: any) => {
            const lesson = includedMap.lesson[lessonRef.id];
            const topics = lesson.relationships.topics.data.map((topicRef: any) => includedMap.topic[topicRef.id]);
            return {
              ...lesson,
              topics,
            };
          });
          return {
            ...section,
            lessons,
          };
        });

        setCourse(data.data);
        setSections(sections);
      })
      .catch(() => toast.error("Failed to load course details"));
  }, [slug]);

  if (!course) return <p className="text-center py-10 text-gray-500">Loading...</p>;

  const { attributes } = course;

  return (
    <section id="course-details" className="py-24 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 max-w-6xl">
        <h1 className="text-4xl font-bold text-gray-800 mb-3">{attributes.title}</h1>
        <p className="text-gray-600 mb-5">{attributes.description}</p>
        <img
          src={attributes.thumbnail_url}
          alt={attributes.title}
          className="w-full rounded-xl shadow-lg mb-10 object-cover max-h-96"
        />

        {sections.map((section: any) => (
          <div
            key={section.id}
            className="bg-white rounded-lg shadow-md mb-6 overflow-hidden"
          >
            <details className="group">
              <summary className="flex justify-between items-center cursor-pointer p-4 bg-gradient-to-r from-indigo-50 to-purple-50 font-semibold text-gray-800 group-open:bg-gradient-to-r group-open:from-purple-100 group-open:to-indigo-50 transition-colors">
                {section.attributes.title}
                <span className="ml-2 text-gray-500 group-open:rotate-180 transition-transform">&#9660;</span>
              </summary>
              <div className="p-4 border-t border-gray-100">
                <p className="text-gray-600 mb-3 italic">{section.attributes.description}</p>

                {section.lessons.map((lesson: any) => (
                  <div
                    key={lesson.id}
                    className="bg-gray-50 rounded-lg p-4 mb-3 border border-gray-200"
                  >
                    <h4 className="font-semibold text-lg mb-1">{lesson.attributes.title}</h4>
                    <p className="text-sm text-gray-500 mb-2">⏱ Duration: {lesson.attributes.duration} min</p>
                    <ul className="list-disc list-inside text-gray-700">
                      {lesson.topics.map((topic: any) => (
                        <li key={topic.id} className="hover:text-indigo-600 transition-colors">{topic.attributes.title}</li>
                      ))}
                    </ul>
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
