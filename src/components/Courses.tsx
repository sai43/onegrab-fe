import { useEffect, useRef, useState, useCallback } from 'react';
import { Star, Clock, Users, PlayCircle } from 'lucide-react';
import { Button } from './ui/button';
import { toast } from 'react-toastify';

interface Course {
  id: number;
  title: string;
  instructor: string;
  rating?: number;
  reviewCount?: number;
  students?: number;
  duration?: string;
  price?: string;
  originalPrice?: string;
  description: string;
  level?: string;
  image?: string;
}

const Courses = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const sectionRef = useRef<HTMLDivElement>(null);
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

  // Fetch courses
  const fetchCourses = useCallback(async () => {
    const token = localStorage.getItem('onegrab_user')
      ? JSON.parse(localStorage.getItem('onegrab_user') || '{}').token
      : null;

    if (!token) return;

    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`${apiBaseUrl}/api/v1/courses`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error('Failed to fetch courses');
      const data = await res.json();

      if (!data.courses?.data) throw new Error('Malformed response');

      const mapped = data.courses.data.map((courseObj: any) => {
        const attrs = courseObj.attributes;
        return {
          id: attrs.id,
          title: attrs.title,
          description: attrs.description,
          instructor: attrs.author_name || 'Unknown',
          rating: undefined,
          reviewCount: undefined,
          students: undefined,
          duration: attrs.duration_minutes ? `${Math.floor(attrs.duration_minutes / 60)} hours` : undefined,
          price: attrs.price || undefined,
          originalPrice: undefined,
          level: attrs.level || undefined,
          image: attrs.thumbnail_url || undefined,
        } as Course;
      });

      setCourses(mapped);
    } catch (e: any) {
      setError(e.message || 'Error loading courses');
    } finally {
      setLoading(false);
    }
  }, [apiBaseUrl]);

  // Enroll handler
  const handleEnroll = useCallback(async (courseId: number) => {
    const token = localStorage.getItem('onegrab_user')
      ? JSON.parse(localStorage.getItem('onegrab_user') || '{}').token
      : null;

    if (!token) {
      toast.error('Please login to enroll.');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`${apiBaseUrl}/api/v1/courses/${courseId}/enroll`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to enroll');

      toast.success(data.message || 'Successfully enrolled!');
    } catch (err: any) {
      toast.error(err.message || 'Error enrolling');
    } finally {
      setLoading(false);
    }
  }, [apiBaseUrl]);

  // Intersection observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.2 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => observer.disconnect();
  }, []);

  // Fetch on mount
  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  return (
    <section ref={sectionRef} id="courses" className="py-24 bg-pastel-bg">
      <div className="container mx-auto px-4">
        <div
          className={`text-center mb-20 transition-all duration-1000 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-anton text-text-black mb-6 tracking-extra-wide">
            POPULAR ONLINE COURSES ON ONEGRAB
          </h2>
          <p className="text-xl text-text-gray max-w-3xl mx-auto font-medium leading-relaxed">
            Join thousands of students in our most popular and highly-rated courses
          </p>
        </div>

        {loading && (
          <div className="text-center mb-8 text-lg text-text-gray">Loading courses...</div>
        )}
        {error && (
          <div className="text-center mb-8 text-red-600 font-semibold">{error}</div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {courses.map((course, index) => (
            <div
              key={course.id}
              className={`bg-white rounded-3xl overflow-hidden shadow-xl transition-all duration-700 hover:scale-105 hover:shadow-2xl group ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
              }`}
              style={{ transitionDelay: `${index * 0.2}s` }}
            >
              <div className="relative overflow-hidden">
                {course.image ? (
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-56 object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                ) : (
                  <div className="w-full h-56 bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-500">No Image</span>
                  </div>
                )}

                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <PlayCircle className="w-16 h-16 text-white" />
                </div>

                {course.price && (
                  <div className="absolute top-10 right-4 bg-white/95 backdrop-blur-sm rounded-full px-4 py-2">
                    <span className="text-lg font-bold text-text-black">{course.price}</span>
                    {course.originalPrice && (
                      <span className="text-sm text-text-gray line-through ml-2">{course.originalPrice}</span>
                    )}
                  </div>
                )}

                {course.level && (
                  <div className="absolute top-4 left-4 bg-accent text-text-black px-3 py-1 rounded-full text-sm font-semibold">
                    {course.level}
                  </div>
                )}
              </div>

              <div className="p-6">
                <h3 className="font-bold text-xl text-text-black mb-3 line-clamp-2 leading-tight">
                  {course.title}
                </h3>
                <p className="text-text-gray text-sm mb-4 line-clamp-2 leading-relaxed">
                  {course.description}
                </p>
                <p className="text-sm text-text-gray mb-4 font-medium">by {course.instructor}</p>

                <div className="flex items-center justify-between mb-6 text-sm">
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-bold">{course.rating ?? '-'}</span>
                    <span className="text-text-gray">({course.reviewCount ?? 0})</span>
                  </div>
                  <div className="flex items-center space-x-1 text-text-gray">
                    <Users className="w-4 h-4" />
                    <span>{course.students ?? '-'}</span>
                  </div>
                  <div className="flex items-center space-x-1 text-text-gray">
                    <Clock className="w-4 h-4" />
                    <span>{course.duration ?? '-'}</span>
                  </div>
                </div>

                <Button
                  onClick={() => handleEnroll(course.id)}
                  className="w-full bg-primary text-text-black hover:bg-primary-dark transition-colors duration-200 py-3 font-bold rounded-xl"
                  disabled={loading}
                >
                  Enroll Now
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <Button
            variant="outline"
            className="border-2 border-primary text-primary hover:bg-primary hover:text-white px-8 py-4 text-lg font-semibold rounded-xl transition-all duration-300"
            disabled={loading}
          >
            {loading ? 'Loading...' : 'View All Courses'}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Courses;
