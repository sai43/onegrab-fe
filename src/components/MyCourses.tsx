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
    <section id="my-courses" className="py-20 bg-gradient-to-b from-blue-50 to-white min-h-screen">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-extrabold text-gray-800 mb-10 text-center">My Courses</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((enrollment) => {
            const courseTitle = enrollment.attributes.course_title;
            const courseDescription = enrollment.attributes.course_short_description;
            const courseDuration = enrollment.attributes.course_duration;
            const courseSlug = enrollment.attributes.course_slug;
            const courseThumbnail = enrollment.attributes.course_thumbnail_url;

            return (
              <Link
                key={enrollment.id}
                to={`/my-courses/${courseSlug}`}
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 flex flex-col overflow-hidden"
              >
                <img
                  src={courseThumbnail}
                  alt={courseTitle}
                  className="w-full h-48 object-cover"
                />
                <div className="p-5 flex flex-col flex-1">
                  <h3 className="font-bold text-xl mb-2 text-gray-800">{courseTitle}</h3>
                  <p className="text-gray-600 text-sm flex-grow mb-3">{courseDescription}</p>
                  <div className="mt-auto">
                    <p className="text-xs text-gray-500 mb-1">⏱ Duration: {courseDuration ? `${courseDuration} minutes` : 'N/A'}</p>
                    <p className="text-xs text-green-600 font-medium">Status: {enrollment.attributes.status ?? "In Progress"}</p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default MyCourses;
