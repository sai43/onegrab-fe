import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const MyCourses = () => {
  const [courses, setCourses] = useState<any[]>([]);

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("onegrab_user") || "{}").token;
    if (!token) return;

    fetch(`${import.meta.env.VITE_API_BASE_URL}/api/v1/my_courses`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
      .then(data => setCourses(data.data || []))
      .catch(() => toast.error("Failed to load courses"));
  }, []);

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8">My Courses</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {courses.map((enrollment) => {
            const courseTitle = enrollment.attributes.course_title;
            const courseDescription = enrollment.attributes.course_short_description;
            const courseDuration = enrollment.attributes.course_duration;
            const courseId = enrollment.relationships.course.data.id;
            const courseSlug = enrollment.attributes.course_slug;

            return (
              <Link
                key={enrollment.id}
                to={`/my-courses/${courseSlug}`}
                className="border p-4 rounded-lg shadow hover:shadow-lg transition"
              >
                <img
                    src={enrollment.attributes.course_thumbnail_url}
                    alt={courseTitle}
                    className="w-full h-40 object-cover rounded mb-3"
                />
                <h3 className="font-semibold text-xl mb-2">{courseTitle}</h3>
                <p className="text-gray-700 mb-1">{courseDescription}</p>
                <p className="text-sm text-gray-500">Duration: {courseDuration ? `${courseDuration} minutes` : 'N/A'}</p>
                <p className="text-sm text-gray-500">Status: {enrollment.attributes.status ?? "In Progress"}</p>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default MyCourses;
