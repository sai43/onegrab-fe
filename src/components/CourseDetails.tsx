import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import RichContent from './RichContent';

const CourseDetails = () => {
  const { slug } = useParams();
  const [course, setCourse] = useState<any>(null);
  const [sections, setSections] = useState<any[]>([]);
  const [loadingCourse, setLoadingCourse] = useState(true);
  const [sectionLoading, setSectionLoading] = useState<{ [key: string]: boolean }>({});
  const [expandedSections, setExpandedSections] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("onegrab_user") || "{}").token;
    if (!token) return;

    setLoadingCourse(true);

    fetch(`${import.meta.env.VITE_API_BASE_URL}/api/v1/my_courses/${slug}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
      .then(data => {
        if (!data || !data.data || !data.included) {
          toast.error("Unexpected API structure");
          return;
        }

        const sectionsData = data.included.filter(i => i.type === 'section');
        setCourse(data.data);
        setSections(sectionsData);
      })
      .catch(() => toast.error("Failed to load course details"))
      .finally(() => setLoadingCourse(false));
  }, [slug]);

  const handleToggleSection = (sectionId: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }));

    if (!expandedSections[sectionId]) {
      loadSectionDetails(sectionId);
    }
  };

  const loadSectionDetails = (sectionId: string) => {
    const token = JSON.parse(localStorage.getItem("onegrab_user") || "{}").token;
    if (!token) return;

    setSectionLoading((prev) => ({ ...prev, [sectionId]: true }));

    fetch(`${import.meta.env.VITE_API_BASE_URL}/api/v1/my_courses/${slug}/sections/${sectionId}?nocache=${import.meta.env.VITE_SECTION_API_CACHE}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
      .then(data => {
        if (!data || !data.data || !data.included) {
          toast.error("Failed to load section details");
          return;
        }

        const lessonsIncluded = data.included.filter(i => i.type === 'lesson');
        const topicsIncluded = data.included.filter(i => i.type === 'topic');

        const lessons = data.data.relationships.lessons.data.map(lessonRef => {
          const lesson = lessonsIncluded.find(l => l.id === lessonRef.id);
          const topics = lesson.relationships.topics.data.map(topicRef =>
            topicsIncluded.find(t => t.id === topicRef.id)
          );
          return { ...lesson, topics };
        });

        setSections((prevSections) =>
          prevSections.map((s) =>
            s.id === sectionId ? { ...s, lessons } : s
          )
        );
      })
      .catch(() => toast.error("Failed to load section details"))
      .finally(() => {
        setSectionLoading((prev) => ({ ...prev, [sectionId]: false }));
      });
  };

  if (loadingCourse || !course) {
    return (
      <div className="flex flex-col items-center justify-center py-20 space-y-4">
        <div className="animate-spin h-10 w-10 border-4 border-indigo-600 border-t-transparent rounded-full"></div>
        <p className="text-gray-500 text-center text-sm">Fetching course content... hang tight! 🚀</p>
      </div>
    );
  }

  const { attributes } = course;

  return (
    <>
      {/* Hero header */}
      <section className="relative bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-16 md:py-20 lg:py-24 rounded-b-3xl shadow-lg mb-8">
        <div className="container mx-auto px-4 max-w-full sm:max-w-3xl md:max-w-4xl lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">{attributes.title} 🚀</h1>
          <p className="max-w-xl mx-auto text-base md:text-lg opacity-90">{attributes.description}</p>
          <div className="mt-4 inline-flex gap-2 justify-center flex-wrap">
            <span className="bg-white text-indigo-600 px-3 py-1 rounded-full text-xs font-medium">Frontend</span>
            <span className="bg-white text-purple-600 px-3 py-1 rounded-full text-xs font-medium">Intermediate</span>
            <span className="bg-yellow-400 text-gray-800 px-3 py-1 rounded-full text-xs font-medium animate-pulse">🔥 Popular</span>
          </div>
        </div>

        {/* Shape divider (optional, can remove if not needed) */}
        <div className="absolute bottom-0 w-full overflow-hidden leading-none rotate-180">
          <svg viewBox="0 0 500 150" preserveAspectRatio="none" className="w-full h-20 text-white fill-current">
            <path d="M0.00,49.98 C150.00,150.00 349.67,-49.98 500.00,49.98 L500.00,150.00 L0.00,150.00 Z"></path>
          </svg>
        </div>
      </section>

      <section className="container mx-auto px-4 max-w-full sm:max-w-3xl md:max-w-4xl lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl">
        {sections.map(section => (
          <div
            key={section.id}
            className="bg-gradient-to-r from-gray-50 to-white rounded-xl shadow-md mb-5 transition-transform transform hover:-translate-y-1 hover:shadow-xl"
          >
            <button
              onClick={() => handleToggleSection(section.id)}
              aria-expanded={expandedSections[section.id] || false}
              className="w-full text-left flex justify-between items-center p-4 font-semibold text-gray-800 focus:outline-none"
            >
              <div className="flex items-center gap-2">
                <span className="text-xl">📂</span>
                <span>{section.attributes.title}</span>
              </div>
              <svg
                className={`w-5 h-5 ml-2 transition-transform duration-300 ${
                  expandedSections[section.id] ? "rotate-180" : ""
                }`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {expandedSections[section.id] && (
              <div className="p-4 border-t border-gray-100 bg-white transition-all duration-500 ease-in-out">
                <p className="text-gray-600 mb-3 italic">{section.attributes.description}</p>

                {sectionLoading[section.id] ? (
                  <div className="flex items-center space-x-2">
                    <div className="animate-spin h-5 w-5 border-2 border-indigo-600 border-t-transparent rounded-full"></div>
                    <span className="text-gray-500 text-sm">Loading lessons...</span>
                  </div>
                ) : (
                  section.lessons?.map(lesson => (
                    <div key={lesson.id} className="bg-gray-50 rounded-lg p-4 mb-4 border border-gray-200 hover:shadow-lg transition duration-300">
                      <h4 className="font-semibold text-lg mb-1 flex items-center gap-2">📖 {lesson.attributes.title}</h4>
                      <p className="text-sm text-gray-500 mb-3">⏱ Duration: {lesson.attributes.duration ?? 'N/A'} min</p>

                      {lesson.topics.map(topic => (
                        <div key={topic.id} className="bg-white rounded-md p-4 mb-3 shadow-sm border transition-all duration-500 hover:border-indigo-500">
                          <h5 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">📝 {topic.attributes.title}</h5>
                          <RichContent
                            content={topic.attributes.content}
                            notes={topic.attributes.notes}
                          />
                        </div>
                      ))}
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        ))}
      </section>
    </>
  );
};

export default CourseDetails;
