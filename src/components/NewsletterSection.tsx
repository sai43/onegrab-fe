
import { useEffect, useRef, useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';

const NewsletterSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState('');
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Newsletter subscription:', email);
    setEmail('');
    // Add newsletter subscription logic here
  };

  return (
    <section ref={sectionRef} className="py-20 bg-pastel-bg">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left side - Content */}
          <div className={`transition-all duration-1000 ${
            isVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'
          }`}>
            <h2 className="text-4xl md:text-5xl font-anton text-text-black mb-6">
              SUBSCRIBE TODAY FOR SMARTER LEARNING
            </h2>
            <p className="text-lg text-text-gray mb-8 leading-relaxed">
              Join our newsletter and get the latest updates on new courses, exclusive discounts, 
              learning tips, and industry insights delivered straight to your inbox.
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 mb-6">
              <Input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-6 py-4 text-lg border-2 border-gray-200 rounded-xl focus:border-primary transition-colors duration-200"
                required
              />
              <Button
                type="submit"
                className="bg-accent text-text-black hover:bg-accent-yellow transition-all duration-300 px-8 py-4 text-lg font-semibold rounded-xl transform hover:scale-105"
              >
                Subscribe Now
              </Button>
            </form>

            <div className="flex items-center space-x-4 text-sm text-text-gray">
              <span>✓ No spam, unsubscribe anytime</span>
              <span>✓ Weekly learning tips</span>
            </div>
          </div>

          {/* Right side - Illustration */}
          <div className={`transition-all duration-1000 ${
            isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'
          }`}>
            <div className="relative">
              <img
                src="https://flex.heydenstd.com/sinau/wp-content/uploads/sites/8/2025/05/Illustrations-1-J5X9FKA.png"
                alt="Newsletter subscription illustration"
                className="w-full max-w-md mx-auto"
              />
              
              {/* Floating elements */}
              <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-accent rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
              <div className="absolute top-1/3 right-1/4 w-3 h-3 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.5s' }}></div>
              <div className="absolute bottom-1/3 left-1/3 w-2 h-2 bg-accent-yellow rounded-full animate-bounce" style={{ animationDelay: '1s' }}></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;
