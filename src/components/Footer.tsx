
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';
import NewsletterSection from './NewsletterSection';

const Footer = () => {
  const companyLinks = [
    { name: 'About Us', href: '#about' },
    { name: 'Careers', href: '#careers' },
    { name: 'Press', href: '#press' },
    { name: 'Blog', href: '#blog' },
    { name: 'Partnerships', href: '#partnerships' }
  ];

  const courseLinks = [
    { name: 'Web Development', href: '#web-dev' },
    { name: 'Data Science', href: '#data-science' },
    { name: 'Design', href: '#design' },
    { name: 'Business', href: '#business' },
    { name: 'Marketing', href: '#marketing' }
  ];

  const resourceLinks = [
    { name: 'Help Center', href: '#help' },
    { name: 'Course Catalog', href: '#catalog' },
    { name: 'Student Stories', href: '#stories' },
    { name: 'Learning Paths', href: '#paths' },
    { name: 'Certificates', href: '#certificates' }
  ];

  const supportLinks = [
    { name: 'Contact Support', href: '#support' },
    { name: 'Privacy Policy', href: '#privacy' },
    { name: 'Terms of Service', href: '#terms' },
    { name: 'Refund Policy', href: '#refund' },
    { name: 'Accessibility', href: '#accessibility' }
  ];

  const socialLinks = [
    { icon: <Facebook className="w-5 h-5" />, href: '#facebook', name: 'Facebook' },
    { icon: <Twitter className="w-5 h-5" />, href: '#twitter', name: 'Twitter' },
    { icon: <Instagram className="w-5 h-5" />, href: '#instagram', name: 'Instagram' },
    { icon: <Linkedin className="w-5 h-5" />, href: '#linkedin', name: 'LinkedIn' }
  ];

  return (
    <><NewsletterSection />
    <footer id="contact" className="bg-text-black text-white">
      <div className="container mx-auto px-4 py-16">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 mb-12">
          {/* Brand section */}
          <div className="lg:col-span-2">
            <h3 className="text-3xl font-anton font-bold mb-4 tracking-extra-wide">
              ONEGRAB
            </h3>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Empowering learners worldwide with high-quality online education.
              Join thousands of students who are advancing their careers with OneGrab.
            </p>

            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-gray-300">
                <Mail className="w-5 h-5 text-primary" />
                <span>hello@onegrab.com</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-300">
                <Phone className="w-5 h-5 text-primary" />
                <span>+91 8919669515</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-300">
                <MapPin className="w-5 h-5 text-primary" />
                <span>Shop #7, APNGO Home, Near District Court, Parvathipuram, AP-535501.</span>
              </div>
            </div>
          </div>

          {/* Company links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-primary">Company</h4>
            <ul className="space-y-2">
              {companyLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-300 hover:text-primary transition-colors duration-200"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Course links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-primary">Online Courses</h4>
            <ul className="space-y-2">
              {courseLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-300 hover:text-primary transition-colors duration-200"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resource links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-primary">Resources</h4>
            <ul className="space-y-2">
              {resourceLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-300 hover:text-primary transition-colors duration-200"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-primary">Support</h4>
            <ul className="space-y-2">
              {supportLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-300 hover:text-primary transition-colors duration-200"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Social media and bottom section */}
        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            {/* Social media links */}
            <div className="flex items-center space-x-4 mb-4 md:mb-0">
              <span className="text-gray-300 mr-2">Follow us:</span>
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="p-2 bg-gray-800 rounded-full hover:bg-primary hover:text-text-black transition-all duration-200 transform hover:scale-110"
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>

            {/* Copyright */}
            <div className="text-gray-400 text-center md:text-right">
              <p>&copy; 2024 OneGrab. All rights reserved.</p>
            </div>
          </div>
        </div>
      </div>
    </footer></>
  );
};

export default Footer;
