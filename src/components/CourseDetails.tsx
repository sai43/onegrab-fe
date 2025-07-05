import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import SectionCard from './SectionCard';

const CourseDetails = () => {
  const { slug } = useParams();
  const [course, setCourse] = useState<any>(null);
  const [sections, setSections] = useState<any[]>([]);
  const [loadingCourse, setLoadingCourse] = useState(true);
  const [expandedSections, setExpandedSections] = useState<{ [key: string]: boolean }>({});
  const [sectionLoading, setSectionLoading] = useState<{ [key: string]: boolean }>({});

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

  const handleToggleCompleteUI = (lessonId: string) => {
    setSections((prevSections) =>
      prevSections.map((section) => ({
        ...section,
        lessons: section.lessons?.map((lesson) =>
          lesson.id === lessonId
            ? { ...lesson, isCompleted: !lesson.isCompleted }
            : lesson
        ),
      }))
    );
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
      </section>

      <section className="container mx-auto px-4 max-w-full sm:max-w-3xl md:max-w-4xl lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl">
        {sections.map((section) => {
          const completedLessons = section.lessons?.filter(l => l.isCompleted).length || 0;
          const totalLessons = section.lessons?.length || 1;
          const progressPercent = Math.round((completedLessons / totalLessons) * 100);

          return (
            <SectionCard
              key={section.id}
              section={section}
              expanded={expandedSections[section.id]}
              onToggle={handleToggleSection}
              onToggleLessonComplete={handleToggleCompleteUI}
              progressPercent={progressPercent}
              isLoading={sectionLoading[section.id]}
            />
          );
        })}
      </section>
    </>
  );
};

export default CourseDetails;
