
import { useEffect, useRef, useState } from 'react';
import { Check, Star, Crown } from 'lucide-react';
import { Button } from './ui/button';
import styles from './HeroSection.module.css';
import Testimonials from './Testimonials';

const Plans = () => {
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

  const plans = [
    {
      name: 'Starter',
      price: '₹1999',
      period: '/month',
      description: 'Perfect for beginners starting their learning journey',
      features: [
        'Access to 50+ courses',
        'Basic community support',
        'Mobile app access',
        'Course certificates',
        'Email support',
        'Basic progress tracking'
      ],
      isPopular: false,
      buttonText: 'Choose Starter',
      bgColor: 'bg-white',
      borderColor: 'border-gray-200'
    },
    {
      name: 'Pro',
      price: '₹4999',
      period: '/month',
      description: 'Most popular choice for serious learners',
      features: [
        'Access to 500+ courses',
        'Priority community support',
        'Mobile & desktop apps',
        'Verified certificates',
        'Live Q&A sessions',
        '1-on-1 mentoring',
        'Downloadable resources',
        'Advanced analytics'
      ],
      isPopular: true,
      buttonText: 'Choose Pro',
      bgColor: 'bg-primary/5',
      borderColor: 'border-primary'
    },
    {
      name: 'Master',
      price: '₹7999',
      period: '/month',
      description: 'Complete access for professionals and teams',
      features: [
        'Access to all courses',
        'VIP community support',
        'All platform features',
        'Industry-recognized certificates',
        'Weekly live sessions',
        'Personal career coach',
        'Custom learning paths',
        'Team collaboration tools',
        'Priority customer support'
      ],
      isPopular: false,
      buttonText: 'Choose Master',
      bgColor: 'bg-white',
      borderColor: 'border-gray-200'
    }
  ];

  return (
    <><section id="plans" ref={sectionRef} className={`${styles.pricingBg} py-24`}>
      <div className="container mx-auto px-4">
        <div className={`text-center mb-20 transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-anton text-text-black mb-6 tracking-extra-wide">
            FLEXIBLE PLANS FOR EVERY
            <br />
            LEARNER'S JOURNEY
          </h2>
          <p className="text-xl text-text-gray max-w-3xl mx-auto font-medium leading-relaxed">
            Choose the perfect plan that fits your learning goals and budget
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={plan.name}
              className={`relative ${plan.bgColor} rounded-3xl border-2 transition-all duration-700 hover:scale-105 ${plan.isPopular
                  ? `${plan.borderColor} shadow-2xl shadow-primary/20 transform scale-105`
                  : `${plan.borderColor} hover:border-primary/50 shadow-xl`} ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
              style={{ transitionDelay: `${index * 0.2}s` }}
            >
              {plan.isPopular && (
                <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
                  <div className="bg-primary text-white px-8 py-3 rounded-full text-sm font-bold flex items-center space-x-2 shadow-lg">
                    <Crown className="w-4 h-4 fill-current" />
                    <span>MOST POPULAR</span>
                  </div>
                </div>
              )}

              <div className="p-8">
                <div className="text-center mb-8">
                  <h3 className="text-3xl font-anton text-text-black mb-3 tracking-wide">
                    {plan.name.toUpperCase()}
                  </h3>
                  <p className="text-text-gray mb-6 leading-relaxed">
                    {plan.description}
                  </p>
                  <div className="flex items-baseline justify-center mb-2">
                    <span className="text-4xl font-bold text-text-black">
                      {plan.price}
                    </span>
                    <span className="text-xl text-text-gray ml-2">
                      {plan.period}
                    </span>
                  </div>
                  <div className="text-sm text-text-gray">
                    Billed monthly, cancel anytime
                  </div>
                </div>

                <Button
                  className={`w-full py-4 text-lg font-bold transition-all duration-300 rounded-xl ${plan.isPopular
                      ? 'bg-primary text-white hover:bg-primary-dark shadow-lg'
                      : 'bg-accent text-text-black hover:bg-accent-yellow'}`}
                >
                  {plan.buttonText}
                </Button>

                <ul className="space-y-4 mt-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start space-x-3">
                      <Check className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                      <span className="text-text-gray leading-relaxed">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <p className="text-lg text-text-gray mb-4">
            All plans include a 7-day free trial. No credit card required.
          </p>
          <p className="text-sm text-text-gray">
            ✓ Cancel anytime ✓ 30-day money-back guarantee ✓ No setup fees
          </p>
        </div>
      </div>
    </section><Testimonials /></>
  );
};

export default Plans;
