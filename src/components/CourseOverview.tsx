import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const CourseOverview = () => {
  const { courseId } = useParams();
  const [course, setCourse] = useState<any>(null);

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("onegrab_user") || "{}").token;
    if (!token) return;

    fetch(`${import.meta.env.VITE_API_BASE_URL}/api/v1/my_courses/${courseId}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
      .then(data => setCourse(data.data))
      .catch(() => toast.error("Failed to load course"));
  }, [courseId]);

  if (!course) return <div>Loading...</div>;

  const sections = course.relationships.sections.data;

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-6">{course.attributes.title}</h2>
        <div className="grid grid-cols-1 gap-4">
          {sections.map((section: any) => (
            <Link
              key={section.id}
              to={`/courses/${course.id}/sections/${section.id}`}
              className="border p-4 rounded hover:bg-gray-100 transition"
            >
              Section #{section.id}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CourseOverview;
