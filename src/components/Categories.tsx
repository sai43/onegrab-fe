
import { useEffect, useRef, useState } from 'react';
import { BookOpen, Code, Palette, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';

const CategoriesSection = () => {
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

  const categories = [
    {
      icon: <Code className="w-16 h-16 text-primary" />,
      title: 'Programming',
      description: 'Learn coding from basics to advanced level with hands-on projects and real-world applications',
      courseCount: '120+ Courses',
      bgColor: 'bg-blue-50'
    },
    {
      icon: <Palette className="w-16 h-16 text-accent-yellow" />,
      title: 'Design',
      description: 'Master UI/UX design, graphic design, and creative tools used by professionals',
      courseCount: '85+ Courses',
      bgColor: 'bg-yellow-50'
    },
    {
      icon: <TrendingUp className="w-16 h-16 text-green-500" />,
      title: 'Business',
      description: 'Develop entrepreneurial skills and business acumen for career advancement',
      courseCount: '95+ Courses',
      bgColor: 'bg-green-50'
    },
    {
      icon: <BookOpen className="w-16 h-16 text-purple-500" />,
      title: 'Marketing',
      description: 'Digital marketing strategies that drive real results and business growth',
      courseCount: '75+ Courses',
      bgColor: 'bg-purple-50'
    }
  ];

  return (
    <section ref={sectionRef} id="categories" className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className={`text-center mb-20 transition-all duration-1000 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-anton text-text-black mb-6 tracking-extra-wide">
            EXPLORE LEARNING BY CATEGORIES
          </h2>
          <p className="text-xl text-text-gray max-w-3xl mx-auto font-medium leading-relaxed">
            Choose from our wide range of categories and start your learning journey today
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {categories.map((category, index) => (
            <Card
              key={category.title}
              className={`${category.bgColor} border-none transition-all duration-700 hover:scale-105 hover:shadow-2xl group cursor-pointer ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
              }`}
              style={{ transitionDelay: `${index * 0.2}s` }}
            >
              <CardHeader className="text-center">
                <div className="mb-4 flex justify-center transform group-hover:scale-110 transition-transform duration-300">
                  {category.icon}
                </div>
                <CardTitle className="text-2xl font-anton text-text-black tracking-wide">
                  {category.title.toUpperCase()}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription className="text-text-gray mb-6 leading-relaxed text-base">
                  {category.description}
                </CardDescription>
                <div className="text-lg font-bold text-primary">
                  {category.courseCount}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;
