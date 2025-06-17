import { useEffect, useState } from 'react';
import { Button } from './ui/button';
import styles from './HeroSection.module.css';
import { Image } from '@imagekit/react';

const floatingImages = [
  {
    src: 'IL-1.png',
    alt: 'Learning illustration 1',
    // larger size and adjusted position
    positionClasses: 'absolute top-20 left-8 md:left-16 w-28 h-28 md:w-36 md:h-36 lg:w-44 lg:h-44 opacity-90',
    animationDelay: '0.2s',
  },
  {
    src: 'IL-2.png',
    alt: 'Learning illustration 2',
    // larger size and adjusted position
    positionClasses: 'absolute top-32 right-10 md:right-24 w-28 h-28 md:w-36 md:h-36 lg:w-44 lg:h-44 opacity-80',
    animationDelay: '0.4s',
  },
  {
    src: 'IL-3.png',
    alt: 'Learning illustration 3',
    positionClasses: 'absolute bottom-36 left-12 md:left-28 w-28 h-28 md:w-36 md:h-36 lg:w-44 lg:h-44 opacity-85',
    animationDelay: '0.6s',
  },
  {
    src: 'IL-4.png',
    alt: 'Learning illustration 4',
    positionClasses: 'absolute bottom-24 right-10 md:right-20 w-28 h-28 md:w-36 md:h-36 lg:w-44 lg:h-44 opacity-90',
    animationDelay: '0.8s',
  },
];


const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section
      className={`${styles.heroBg} min-h-screen relative flex pt-20 items-center justify-center overflow-hidden`}
    >
      {/* Floating Illustrations */}
      <div className="absolute inset-0 pointer-events-none z-10 top-20">
        {floatingImages.map(({ src, alt, positionClasses, animationDelay }, index) => (
          <Image
          urlEndpoint="https://ik.imagekit.io/x5lc68m0o/"
          src={src}
          width={500}
          height={500}
          key={index}
          className={`${positionClasses} transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
          alt={alt}
          style={{ animationDelay }}
          loading="lazy"
          decoding="async"
          />
        ))}
      </div>


      <div className="container mx-auto px-4 text-center relative z-20 max-w-4xl">
        <div
          className={`transition-all duration-1000 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
        >
          {/* Banner aligned to L character */}
          <div className="relative inline-block mb-8" style={{ lineHeight: 1 }}>
            <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-anton text-text-black leading-tight tracking-extra-wide uppercase">
              LEARN NEW SKILLS FROM
              <br />
              <span className="text-text-black">ANYWHERE, ANYTIME EASILY</span>
            </h1>
            <div
              className="absolute top-[0] left-0 -rotate-12 bg-[#BBF0F4] px-4 py-1 rounded-sm shadow-md text-sm font-semibold text-black select-none"
              style={{ fontFamily: "'Poppins', sans-serif", transformOrigin: 'left center' }}
            >
              OneGrab Online
            </div>
          </div>

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
                {["S1.jpg","S2.jpg","S3.jpg"].map((src, i) => (
                  <div
                    key={i}
                    className="w-12 h-12 rounded-full bg-white border-3 border-primary shadow-md overflow-hidden"
                  >
                <Image
                  urlEndpoint="https://ik.imagekit.io/x5lc68m0o/"
                  src={src}
                  key={i}
                  className="bject-cover w-full h-full"
                  alt={`Student ${i}`}
                  loading="lazy"
                  decoding="async"
                />
                </div>
                ))}
              </div>
              <span className="text-base text-text-gray font-medium">+1,000 students</span>
            </div>


          </div>
        </div>
      </div>

      {/* Floating dots animation */}
      <div className="absolute inset-0 pointer-events-none z-10">
        <div
          className="absolute top-1/4 left-1/4 w-3 h-3 bg-accent rounded-full animate-bounce opacity-60"
          style={{ animationDelay: '1s' }}
        />
        <div
          className="absolute top-1/3 right-1/3 w-2 h-2 bg-primary rounded-full animate-bounce opacity-70"
          style={{ animationDelay: '1.5s' }}
        />
        <div
          className="absolute bottom-1/4 left-1/3 w-4 h-4 bg-accent-yellow rounded-full animate-bounce opacity-50"
          style={{ animationDelay: '2s' }}
        />
      </div>
    </section>
  );
};

export default HeroSection;
