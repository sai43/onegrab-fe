
import { useEffect, useRef, useState } from 'react';
import { ChevronDown } from 'lucide-react';

const FAQSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [openFAQ, setOpenFAQ] = useState<number | null>(0);
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

  const faqs = [
    {
      question: 'How do I get started with OneGrab?',
      answer: 'Getting started is easy! Simply sign up for an account, browse our course catalog, and enroll in the courses that interest you. You can start learning immediately after enrollment.'
    },
    {
      question: 'Are the certificates recognized by employers?',
      answer: 'Yes! Our certificates are industry-recognized and valued by employers worldwide. Many of our students have successfully used their OneGrab certificates to advance their careers.'
    },
    {
      question: 'Can I learn at my own pace?',
      answer: 'Absolutely! All our courses are self-paced, meaning you can learn whenever and wherever suits you best. You have lifetime access to enrolled courses.'
    },
    {
      question: 'What if I need help during my course?',
      answer: 'We provide comprehensive support through our community forums, direct instructor messaging, and customer support team. You\'re never alone in your learning journey.'
    },
    {
      question: 'Is there a money-back guarantee?',
      answer: 'Yes, we offer a 30-day money-back guarantee on all our courses. If you\'re not satisfied with your learning experience, we\'ll provide a full refund.'
    },
    {
      question: 'Can I access courses on mobile devices?',
      answer: 'Yes! Our platform is fully responsive and we also have dedicated mobile apps for iOS and Android, so you can learn on any device, anywhere.'
    },
    {
      question: 'Do you offer group or corporate discounts?',
      answer: 'Yes, we offer special pricing for teams and organizations. Contact our sales team to learn more about corporate packages and bulk discounts.'
    },
    {
      question: 'How often is the course content updated?',
      answer: 'We regularly update our course content to ensure it stays current with industry trends and best practices. Students get access to all updates at no additional cost.'
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  return (
    <section ref={sectionRef} className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left side - Image */}
          <div className={`transition-all duration-1000 ${
            isVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'
          }`}>
            <div className="sticky top-8">
              <img
                src="https://images.unsplash.com/photo-1501854140801-50d01698950b"
                alt="Happy student with questions answered"
                className="rounded-2xl shadow-2xl w-full h-[600px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-accent/20 to-transparent rounded-2xl"></div>
            </div>
          </div>

          {/* Right side - FAQ Content */}
          <div className={`transition-all duration-1000 ${
            isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'
          }`}>
            <div className="mb-12">
              <h2 className="text-4xl md:text-5xl font-anton text-text-black mb-4">
                ANSWERS TO YOUR MOST COMMON QUESTIONS
              </h2>
              <p className="text-lg text-text-gray">
                Got questions? We've got answers! Here are the most frequently asked questions about OneGrab.
              </p>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className={`border border-gray-200 rounded-xl overflow-hidden transition-all duration-700 ${
                    isVisible ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'
                  }`}
                  style={{ transitionDelay: `${index * 0.1}s` }}
                >
                  <button
                    className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-200"
                    onClick={() => toggleFAQ(index)}
                  >
                    <span className="font-semibold text-text-black pr-4">
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-text-gray transition-transform duration-200 flex-shrink-0 ${
                        openFAQ === index ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      openFAQ === index ? 'max-h-96 pb-4' : 'max-h-0'
                    }`}
                  >
                    <div className="px-6 text-text-gray leading-relaxed">
                      {faq.answer}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
