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

  if (!course) return <p>Loading...</p>;

  const { attributes } = course;

  return (
    <section className="py-10">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-4">{attributes.title}</h1>
        <p className="mb-4">{attributes.description}</p>
        <img
          src={attributes.thumbnail_url}
          alt={attributes.title}
          className="w-full max-h-80 object-cover rounded mb-6"
        />

        {sections.map((section: any) => (
          <div key={section.id} className="border rounded mb-4">
            <details>
              <summary className="cursor-pointer font-semibold p-3 bg-gray-100 hover:bg-gray-200">
                {section.attributes.title}
              </summary>
              <div className="p-3">
                <p className="mb-2 text-gray-600">{section.attributes.description}</p>

                {section.lessons.map((lesson: any) => (
                  <div key={lesson.id} className="border rounded mb-2 p-3">
                    <h4 className="font-medium">{lesson.attributes.title}</h4>
                    <p className="text-sm text-gray-500 mb-1">Duration: {lesson.attributes.duration} min</p>

                    <ul className="list-disc list-inside">
                      {lesson.topics.map((topic: any) => (
                        <li key={topic.id}>{topic.attributes.title}</li>
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
