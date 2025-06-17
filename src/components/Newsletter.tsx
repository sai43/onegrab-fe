import { useEffect, useRef, useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';

const Newsletter = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState('');
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => observer.disconnect();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Newsletter subscription:', email);
    setEmail('');
    // Implement actual subscription logic here
  };

  return (
    <section
      ref={sectionRef}
      className="bg-[#d4f0f0] rounded-xl py-12 px-8 max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-10"
    >
      {/* Left side */}
      <div
        className={`flex-1 transition-transform duration-1000 ${
          isVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'
        }`}
      >
        <h2 className="text-4xl font-extrabold text-text-black mb-4 leading-tight">
          SUBSCRIBE TODAY FOR SMARTER LEARNING
        </h2>
        <p className="text-text-gray mb-6 max-w-md">
          Join our mailing list to get the latest course updates, exclusive tips, and special offers delivered straight to your inbox every single.
        </p>

        <form onSubmit={handleSubmit} className="flex max-w-md gap-4">
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="rounded-lg py-3 px-4 text-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:outline-none flex-grow"
          />
          <Button
            type="submit"
            className="bg-[#f9e79f] text-black font-semibold px-6 py-3 rounded-lg hover:bg-[#f7d54c] transition"
          >
            SUBSCRIBE
          </Button>
        </form>
      </div>

      {/* Right side illustration */}
      <div
        className={`flex-1 transition-transform duration-1000 ${
          isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'
        }`}
      >
        <img
          src="https://ik.imagekit.io/x5lc68m0o/onegrab/IL-1.png"
          alt="Subscribe illustration"
          className="w-full max-w-sm mx-auto"
          loading="lazy"
          decoding="async"
        />
      </div>
    </section>
  );
};

export default Newsletter;
