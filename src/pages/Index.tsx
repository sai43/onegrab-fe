
import Header from '../components/Header';
import HeroSection from '../components/Hero';
import CategoriesSection from '../components/Categories';
import PopularCoursesSection from '../components/Courses';
import BenefitsSection from '../components/About';
import PricingSection from '../components/Plans';
import TestimonialsSection from '../components/Testimonials';
import ContactUs from '@/components/Contact';
import Footer from '../components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <HeroSection />
      <CategoriesSection />
      <PopularCoursesSection />
      <PricingSection />
      <TestimonialsSection />
      <BenefitsSection />
      <ContactUs />
      <Footer />
    </div>
  );
};

export default Index;
