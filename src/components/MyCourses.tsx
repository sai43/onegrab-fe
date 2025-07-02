import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Loader2, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const MyCourses = () => {
  const [courses, setCourses] = useState<any[]>([]);
  const [loadingCourseId, setLoadingCourseId] = useState<number | null>(null);
  const [globalLoading, setGlobalLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("onegrab_user") || "{}").token;
    if (!token) return;

    fetch(`${import.meta.env.VITE_API_BASE_URL}/api/v1/my_courses`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
      .then(data => setCourses(data.data || []))
      .catch(() => toast.error("Failed to load courses"))
      .finally(() => setInitialLoading(false));
  }, []);

  const handleCourseClick = (slug: string, id: number) => {
    setLoadingCourseId(id);
    setGlobalLoading(true);
    setTimeout(() => {
      navigate(`/my-courses/${slug}`);
    }, 500);
  };

  if (initialLoading) {
    return (
      <div className="fixed inset-0 bg-white bg-opacity-80 flex items-center justify-center z-50">
        <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
      </div>
    );
  }

  return (
    <section id="my-courses" className="py-20 bg-gray-50 min-h-screen relative">
      <div className="container mx-auto px-4 max-w-4xl">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">MY COURSES</h2>

        <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
          {courses.map((course, index) => {
            const attributes = course.attributes;
            const id = course.id;
            const slug = attributes.course_slug;
            const thumbnail = attributes.course_thumbnail_url;
            const title = attributes.course_title;
            const description = attributes.course_short_description;
            const status = attributes.status ?? "In Progress";
            const progress = attributes.progress ?? 0;

            return (
              <motion.div
                key={id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="border-b border-gray-100 last:border-none"
              >
                <button
                  onClick={() => handleCourseClick(slug, id)}
                  className="flex flex-col sm:flex-row items-start sm:items-center w-full text-left px-5 py-4 hover:bg-gray-50 transition relative disabled:opacity-70 group"
                  disabled={loadingCourseId === id}
                >
                  <img
                    src={thumbnail}
                    alt={title}
                    className="w-12 h-12 min-w-12 rounded-md object-cover mb-3 sm:mb-0 sm:mr-4 flex-shrink-0"
                  />
                  <div className="flex-1 text-left min-w-0">
                    <div className="flex items-center justify-between flex-wrap gap-y-2">
                      <h3 className="font-bold text-gray-800 break-words">{title}</h3>
                      <span
                        className={`ml-0 sm:ml-2 px-2 py-0.5 text-xs rounded-full ${
                          status === "Completed"
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 mt-1 break-words">{description}</p>

                    <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2">
                      <div
                        className="bg-blue-500 h-1.5 rounded-full transition-all"
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="mt-2 sm:mt-0 ml-0 sm:ml-4 flex items-center space-x-2 transition-all duration-200 opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0">
                    <span className="text-blue-600 text-sm font-medium">Continue</span>
                    <ArrowRight className="w-5 h-5 text-blue-600" />
                  </div>
                </button>
              </motion.div>
            );
          })}
        </div>
      </div>

      {globalLoading && (
        <div className="fixed inset-0 bg-white bg-opacity-80 flex items-center justify-center z-50">
          <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
        </div>
      )}
    </section>
  );
};

export default MyCourses;
