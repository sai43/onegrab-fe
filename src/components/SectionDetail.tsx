import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const SectionDetail = () => {
  const { courseId, sectionId } = useParams();
  const [section, setSection] = useState<any>(null);

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("onegrab_user") || "{}").token;
    if (!token) return;

    fetch(`${import.meta.env.VITE_API_BASE_URL}/api/v1/my_courses/${courseId}/sections/${sectionId}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
      .then(data => setSection(data.data))
      .catch(() => toast.error("Failed to load section"));
  }, [courseId, sectionId]);

  if (!section) return <div>Loading...</div>;

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold mb-4">{section.attributes.title}</h2>
        {section.relationships.lessons.data.map((lesson: any) => (
          <div key={lesson.id} className="mb-4 border p-4 rounded">
            <h3 className="font-semibold text-lg">Lesson #{lesson.id}</h3>
            <p>Check details by expanding or clicking.</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SectionDetail;
