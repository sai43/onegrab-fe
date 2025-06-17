
import { useEffect, useRef, useState } from 'react';
import { CheckCircle, Clock, Globe, Award, Users, BookOpen } from 'lucide-react';
import { Button } from './ui/button';

const About = () => {
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

  const benefits = [
    {
      icon: <Clock className="w-10 h-10 text-primary" />,
      title: 'Learn at Your Own Pace',
      description: 'Access courses 24/7 and learn whenever it suits your schedule. No deadlines, no pressure.'
    },
    {
      icon: <Globe className="w-10 h-10 text-accent-yellow" />,
      title: 'Global Community',
      description: 'Connect with learners and instructors from around the world. Share knowledge and grow together.'
    },
    {
      icon: <Award className="w-10 h-10 text-green-500" />,
      title: 'Certified Learning',
      description: 'Earn industry-recognized certificates upon completion to boost your career prospects.'
    },
    {
      icon: <Users className="w-10 h-10 text-blue-500" />,
      title: 'Expert Instructors',
      description: 'Learn from industry professionals with years of real-world experience and expertise.'
    },
    {
      icon: <BookOpen className="w-10 h-10 text-purple-500" />,
      title: 'Comprehensive Content',
      description: 'Access to extensive learning materials, projects, and resources for complete mastery.'
    }
  ];

  return (
    <section ref={sectionRef} id="about" className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center max-w-7xl mx-auto">
          {/* Left side - Image */}
          <div className={`transition-all duration-1000 ${
            isVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'
          }`}>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1506744038136-46273834b3fb"
                alt="Learning platform benefits"
                className="rounded-3xl shadow-2xl w-full h-[600px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/30 to-transparent rounded-3xl"></div>
              
              {/* Floating stats */}
              <div className="absolute top-8 right-8 bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-xl">
                <div className="text-3xl font-bold text-primary mb-1">1000+</div>
                <div className="text-sm text-text-gray">Happy Students</div>
              </div>
              
              <div className="absolute bottom-8 left-8 bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-xl">
                <div className="text-3xl font-bold text-accent-yellow mb-1">98%</div>
                <div className="text-sm text-text-gray">Success Rate</div>
              </div>
            </div>
          </div>

          {/* Right side - Content */}
          <div className={`transition-all duration-1000 ${
            isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'
          }`}>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-anton text-text-black mb-8 tracking-extra-wide leading-tight">
              BETTER LEARNING START WITH RIGHT PLATFORM
            </h2>
            <p className="text-xl text-text-gray mb-12 leading-relaxed font-medium">
              We provide the best online learning experience with cutting-edge technology, 
              expert instructors, and a supportive community to help you achieve your goals.
            </p>

            <div className="space-y-8 mb-12">
              {benefits.map((benefit, index) => (
                <div
                  key={benefit.title}
                  className={`flex items-start space-x-6 transition-all duration-700 ${
                    isVisible ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'
                  }`}
                  style={{ transitionDelay: `${index * 0.2}s` }}
                >
                  <div className="flex-shrink-0 p-4 bg-gray-50 rounded-2xl shadow-md">
                    {benefit.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-text-black mb-3">
                      {benefit.title}
                    </h3>
                    <p className="text-text-gray leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <Button 
              className="bg-accent text-text-black hover:bg-accent-yellow transition-all duration-300 px-10 py-4 text-lg font-bold transform hover:scale-105 rounded-xl shadow-lg"
              size="lg"
            >
              Learn More About Us
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
