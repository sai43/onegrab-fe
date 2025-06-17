
import { useEffect, useRef, useState } from 'react';
import { Star, Clock, Users, PlayCircle } from 'lucide-react';
import { Button } from './ui/button';

const PopularCoursesSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const courses = [
    {
      id: 1,
      image: 'https://ik.imagekit.io/x5lc68m0o/computer.jpg',
      title: 'Complete Web Development Bootcamp',
      instructor: 'Sai Ch',
      rating: 4.9,
      reviewCount: 234,
      students: 1234,
      duration: '40 hours',
      price: '₹7k',
      originalPrice: '₹12k',
      description: 'Learn HTML, CSS, JavaScript, React, and Node.js from scratch',
      level: 'Beginner to Advanced'
    },
    {
      id: 2,
      image: 'https://ik.imagekit.io/x5lc68m0o/datascience.jpg',
      title: 'Python for Data Science',
      instructor: 'Sai Ch',
      rating: 4.9,
      reviewCount: 289,
      students: 1567,
      duration: '50 hours',
      price: '₹9k',
      originalPrice: '₹15k',
      description: 'Master Python programming and data analysis techniques',
      level: 'Intermediate to Advanced'
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158',
      title: 'UI/UX Design Masterclass',
      instructor: 'Kishore R',
      rating: 4.8,
      reviewCount: 189,
      students: 987,
      duration: '35 hours',
      price: '₹5k',
      originalPrice: '₹12k',
      description: 'Master the principles of user interface and user experience design',
      level: 'Intermediate'
    },
    {
      id: 4,
      image: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7',
      title: 'Digital Marketing Strategy',
      instructor: 'Benny B',
      rating: 4.7,
      reviewCount: 156,
      students: 756,
      duration: '25 hours',
      price: '₹5k',
      originalPrice: '₹10k',
      description: 'Build effective digital marketing campaigns that convert',
      level: 'Beginner'
    }
  ];

  return (
    <section ref={sectionRef} id="courses" className="py-24 bg-pastel-bg">
      <div className="container mx-auto px-4">
        <div className={`text-center mb-20 transition-all duration-1000 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-anton text-text-black mb-6 tracking-extra-wide">
            POPULAR ONLINE COURSES ON ONEGRAB
          </h2>
          <p className="text-xl text-text-gray max-w-3xl mx-auto font-medium leading-relaxed">
            Join thousands of students in our most popular and highly-rated courses
          </p>
        </div>

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
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-56 object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <PlayCircle className="w-16 h-16 text-white" />
                </div>
                <div className="absolute top-10 right-4 bg-white/95 backdrop-blur-sm rounded-full px-4 py-2">
                  <span className="text-lg font-bold text-text-black">{course.price}</span>
                  <span className="text-sm text-text-gray line-through ml-2">{course.originalPrice}</span>
                </div>
                <div className="absolute top-4 left-4 bg-accent text-text-black px-3 py-1 rounded-full text-sm font-semibold">
                  {course.level}
                </div>
              </div>

              <div className="p-6">
                <h3 className="font-bold text-xl text-text-black mb-3 line-clamp-2 leading-tight">
                  {course.title}
                </h3>
                <p className="text-text-gray text-sm mb-4 line-clamp-2 leading-relaxed">
                  {course.description}
                </p>
                <p className="text-sm text-text-gray mb-4 font-medium">
                  by {course.instructor}
                </p>

                <div className="flex items-center justify-between mb-6 text-sm">
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-bold">{course.rating}</span>
                    <span className="text-text-gray">({course.reviewCount})</span>
                  </div>
                  <div className="flex items-center space-x-1 text-text-gray">
                    <Users className="w-4 h-4" />
                    <span>{course.students}</span>
                  </div>
                  <div className="flex items-center space-x-1 text-text-gray">
                    <Clock className="w-4 h-4" />
                    <span>{course.duration}</span>
                  </div>
                </div>

                <Button className="w-full bg-primary text-text-black hover:bg-primary-dark transition-colors duration-200 py-3 font-bold rounded-xl">
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
          >
            View All Courses
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PopularCoursesSection;
