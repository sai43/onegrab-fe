
import { useEffect, useState } from 'react';
import { Button } from './ui/button';

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section 
      className="min-h-screen relative flex items-center justify-center pt-16 overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(135deg, rgba(225, 202, 255, 0.85) 0%, rgba(193, 154, 255, 0.75) 100%), url('https://flex.heydenstd.com/sinau/wp-content/uploads/sites/8/2025/05/BG_30-1-WMR6JB.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Floating Illustrations */}
      <div className="absolute inset-0 pointer-events-none">
        <img 
          src="https://flex.heydenstd.com/sinau/wp-content/uploads/sites/8/2025/05/Illustrations-1-J5X9FKA.png" 
          alt="Learning illustration" 
          className={`absolute top-24 left-8 md:left-16 w-20 h-20 md:w-28 md:h-28 lg:w-32 lg:h-32 opacity-90 transition-all duration-1000 ${
            isVisible ? 'translate-y-0 opacity-90' : 'translate-y-10 opacity-0'
          }`}
          style={{ animationDelay: '0.2s' }}
        />
        <img 
          src="https://flex.heydenstd.com/sinau/wp-content/uploads/sites/8/2025/05/Illustration-2-J5X9FKA.png" 
          alt="Learning illustration" 
          className={`absolute top-32 right-8 md:right-20 w-16 h-16 md:w-24 md:h-24 lg:w-28 lg:h-28 opacity-80 transition-all duration-1000 ${
            isVisible ? 'translate-y-0 opacity-80' : 'translate-y-10 opacity-0'
          }`}
          style={{ animationDelay: '0.4s' }}
        />
        <img 
          src="https://flex.heydenstd.com/sinau/wp-content/uploads/sites/8/2025/05/Illustration-3-J5X9FKA.png" 
          alt="Learning illustration" 
          className={`absolute bottom-40 left-12 md:left-24 w-24 h-24 md:w-32 md:h-32 lg:w-36 lg:h-36 opacity-85 transition-all duration-1000 ${
            isVisible ? 'translate-y-0 opacity-85' : 'translate-y-10 opacity-0'
          }`}
          style={{ animationDelay: '0.6s' }}
        />
        <img 
          src="https://flex.heydenstd.com/sinau/wp-content/uploads/sites/8/2025/05/Illustration-4-J5X9FKA.png" 
          alt="Learning illustration" 
          className={`absolute bottom-24 right-8 md:right-16 w-20 h-20 md:w-28 md:h-28 lg:w-32 lg:h-32 opacity-90 transition-all duration-1000 ${
            isVisible ? 'translate-y-0 opacity-90' : 'translate-y-10 opacity-0'
          }`}
          style={{ animationDelay: '0.8s' }}
        />
      </div>

      <div className="container mx-auto px-4 text-center relative z-10 max-w-4xl">
        <div className={`transition-all duration-1000 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-anton text-text-black mb-8 leading-tight tracking-extra-wide">
            LEARN NEW SKILLS FROM
            <br />
            <span className="text-accent-yellow">ANYWHERE, ANYTIME</span>
            <br />
            EASILY
          </h1>
          
          <p className="text-lg md:text-xl lg:text-2xl text-text-gray mb-10 max-w-3xl mx-auto font-medium">
            Join thousands of learners who are advancing their careers with our comprehensive online courses
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-12">
            <Button 
              className="bg-accent text-text-black hover:bg-accent-yellow transition-all duration-300 px-10 py-4 text-lg font-semibold rounded-full transform hover:scale-105 shadow-lg"
              size="lg"
            >
              Start Learning Today
            </Button>
            
            <div className="flex items-center space-x-3">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-12 h-12 rounded-full bg-white border-3 border-primary shadow-md flex items-center justify-center">
                    <span className="text-sm font-bold text-primary">U{i}</span>
                  </div>
                ))}
              </div>
              <span className="text-base text-text-gray font-medium">+1,000 students</span>
            </div>
          </div>
        </div>
      </div>

      {/* Floating dots animation */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-3 h-3 bg-accent rounded-full animate-bounce opacity-60" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/3 right-1/3 w-2 h-2 bg-primary rounded-full animate-bounce opacity-70" style={{ animationDelay: '1.5s' }}></div>
        <div className="absolute bottom-1/4 left-1/3 w-4 h-4 bg-accent-yellow rounded-full animate-bounce opacity-50" style={{ animationDelay: '2s' }}></div>
      </div>
    </section>
  );
};

export default HeroSection;
