
import { useEffect, useRef, useState } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const TestimonialsSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
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

  const testimonials = [
    {
      id: 1,
      name: 'Swaroop R',
      role: 'Web Developer',
      company: 'TechCorp Inc.',
      image: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400',
      rating: 5,
      quote: "OneGrab transformed my career completely. The courses are well-structured and the instructors are amazing. I landed my dream job within 3 months of completing the web development bootcamp! The hands-on projects really prepared me for real-world challenges."
    },
    {
      id: 2,
      name: 'Mahesh G',
      role: 'UX Designer',
      company: 'Design Studio Pro',
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400',
      rating: 5,
      quote: "The UI/UX design course exceeded my expectations. The hands-on projects and feedback from instructors helped me build a portfolio that impressed employers. The community support is incredible and I'm still learning from my peers today."
    },
    {
      id: 3,
      name: 'Naveen K',
      role: 'Digital Marketer',
      company: 'Marketing Solutions Ltd.',
      image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400',
      rating: 5,
      quote: "I love how flexible OneGrab is. I could learn at my own pace while working full-time. The digital marketing strategies I learned here increased our client ROI by 300%! The instructors are industry experts who really know their stuff."
    },
    {
      id: 4,
      name: 'Abhilash M',
      role: 'Data Scientist',
      company: 'Analytics Pro',
      image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400',
      rating: 5,
      quote: "The Python for Data Science course was incredibly comprehensive. The instructors made complex concepts easy to understand, and the practical projects prepared me for real-world challenges. I got promoted within 6 months!"
    }
  ];

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    const interval = setInterval(nextTestimonial, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section ref={sectionRef} className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className={`text-center mb-20 transition-all duration-1000 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-anton text-text-black mb-6 tracking-extra-wide">
            REAL STORIES FROM OUR
            <br />
            HAPPY STUDENTS
          </h2>
          <p className="text-xl text-text-gray max-w-3xl mx-auto font-medium leading-relaxed">
            See how OneGrab has helped thousands of students achieve their career goals
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className={`relative bg-gradient-to-br from-primary/5 to-accent/5 rounded-3xl p-12 md:p-16 shadow-2xl transition-all duration-1000 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            <Quote className="w-16 h-16 text-primary/30 mb-8" />
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
              {/* Testimonial Content */}
              <div className="lg:col-span-2">
                <div className="flex justify-start mb-6">
                  {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                    <Star key={i} className="w-6 h-6 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                <blockquote className="text-2xl md:text-3xl text-text-black font-medium mb-8 leading-relaxed italic">
                  "{testimonials[currentTestimonial].quote}"
                </blockquote>

                <div className="flex items-center space-x-4">
                  <img
                    src={testimonials[currentTestimonial].image}
                    alt={testimonials[currentTestimonial].name}
                    className="w-16 h-16 rounded-full object-cover border-4 border-primary shadow-lg"
                  />
                  <div>
                    <h4 className="text-xl font-bold text-text-black">
                      {testimonials[currentTestimonial].name}
                    </h4>
                    <p className="text-text-gray font-medium">
                      {testimonials[currentTestimonial].role} at {testimonials[currentTestimonial].company}
                    </p>
                  </div>
                </div>
              </div>

              {/* Large Profile Image */}
              <div className="lg:col-span-1 flex justify-center">
                <img
                  src={testimonials[currentTestimonial].image}
                  alt={testimonials[currentTestimonial].name}
                  className="w-48 h-48 lg:w-64 lg:h-64 rounded-3xl object-cover shadow-2xl border-8 border-white"
                />
              </div>
            </div>

            {/* Navigation buttons */}
            <button
              onClick={prevTestimonial}
              className="absolute left-6 top-1/2 transform -translate-y-1/2 p-3 rounded-full bg-white shadow-lg hover:bg-primary hover:text-white transition-all duration-300"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={nextTestimonial}
              className="absolute right-6 top-1/2 transform -translate-y-1/2 p-3 rounded-full bg-white shadow-lg hover:bg-primary hover:text-white transition-all duration-300"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Dots indicator */}
          <div className="flex justify-center mt-12 space-x-3">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTestimonial(index)}
                className={`w-4 h-4 rounded-full transition-all duration-300 ${
                  index === currentTestimonial ? 'bg-primary scale-125' : 'bg-primary/30 hover:bg-primary/50'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
