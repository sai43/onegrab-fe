
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import CategoriesSection from '../components/CategoriesSection';
import PopularCoursesSection from '../components/PopularCoursesSection';
import BenefitsSection from '../components/BenefitsSection';
import PricingSection from '../components/PricingSection';
import TestimonialsSection from '../components/TestimonialsSection';
import FAQSection from '../components/FAQSection';
import NewsletterSection from '../components/NewsletterSection';
import Footer from '../components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <HeroSection />
      <CategoriesSection />
      <PopularCoursesSection />
      <BenefitsSection />
      <PricingSection />
      <TestimonialsSection />
      <FAQSection />
      <NewsletterSection />
      <Footer />
    </div>
  );
};

export default Index;
