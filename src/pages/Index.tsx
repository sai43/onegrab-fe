
import Header from '../components/Header';
import HeroSection from '../components/Hero';
import CategoriesSection from '../components/Categories';
import Courses from '../components/Courses';
import About from '../components/About';
import Plans from '../components/Plans';
import Testimonials from '../components/Testimonials';
import ContactUs from '@/components/Contact';
import Footer from '../components/Footer';
import Blog from '@/components/Blog';

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <HeroSection />
      <CategoriesSection />
      <Courses />
      <Plans />
      <Blog />
      <Testimonials />
      <About />
      <ContactUs />
      <Footer />
    </div>
  );
};

export default Index;
