import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  MapPin,
} from 'lucide-react';
import Newsletter from './Newsletter';

const Footer = () => {
  const companyLinks = [
    { name: 'About Us', href: '#about' },
    { name: 'Careers', href: '#careers' },
    { name: 'Press', href: '#press' },
    { name: 'Blog', href: '#blog' },
    { name: 'Partnerships', href: '#partnerships' },
  ];

  const courseLinks = [
    { name: 'Digital Marketing', href: '#digital-marketing' },
    { name: 'Web Development', href: '#web-development' },
    { name: 'UI/UX Design', href: '#ui-ux' },
    { name: 'Graphic Design', href: '#graphic-design' },
    { name: 'Business', href: '#business' },
  ];

  const resourceLinks = [
    { name: 'Blog / Articles', href: '#blog-articles' },
    { name: 'Detail Guides', href: '#detail-guides' },
    { name: 'FAQs', href: '#faqs' },
    { name: 'Help Center', href: '#help-center' },
    { name: 'Certificates', href: '#certificates' },
  ];

  const supportLinks = [
    { name: 'Contact Support', href: '#contact-support' },
    { name: 'Privacy Policy', href: '#privacy-policy' },
    { name: 'Terms of Service', href: '#terms' },
    { name: 'Refund Policy', href: '#refund-policy' },
    { name: 'Accessibility', href: '#accessibility' },
  ];

  const socialLinks = [
    { icon: <Facebook className="w-5 h-5" />, href: '#facebook', name: 'Facebook' },
    { icon: <Twitter className="w-5 h-5" />, href: '#twitter', name: 'Twitter' },
    { icon: <Instagram className="w-5 h-5" />, href: '#instagram', name: 'Instagram' },
    { icon: <Linkedin className="w-5 h-5" />, href: '#linkedin', name: 'LinkedIn' },
  ];

  return (
    <footer className="bg-[#121212] text-white pt-16 pb-10">
      <Newsletter />

      <div className="container mx-auto px-6 mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 gap-6">
        {/* Brand */}
        <div className="col-span-1 md:col-span-2">
          <h3 className="text-2xl font-anton font-bold tracking-wide mb-6">OneGrab</h3>
          <p className="text-gray-400 leading-relaxed max-w-sm">
            OneGrab is an online learning platform that makes education accessible, practical, and fun.
          </p>

          <div className="mt-6 space-y-3 text-gray-400">
            <div className="flex items-center space-x-3">
              <Mail className="w-5 h-5 text-yellow-400" />
              <span>hello@onegrab.com</span>
            </div>
            <div className="flex items-center space-x-3">
              <Phone className="w-5 h-5 text-yellow-400" />
              <span>(+91) 8919 6695 15</span>
            </div>
            <div className="flex items-center space-x-3">
              <MapPin className="w-5 h-5 text-yellow-400" />
              <span>#7, AP-NGO-Home, Main Road,<br/> Parvathipuram, AP-535501.</span>
            </div>
          </div>
        </div>

        {/* Columns */}
        <div>
          <h4 className="text-lg font-semibold mb-4 text-yellow-400">Company</h4>
          <ul className="space-y-2 text-gray-400">
            {companyLinks.map((link) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  className="hover:text-yellow-400 transition-colors duration-200"
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-lg font-semibold mb-4 text-yellow-400">Online Course</h4>
          <ul className="space-y-2 text-gray-400">
            {courseLinks.map((link) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  className="hover:text-yellow-400 transition-colors duration-200"
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-lg font-semibold mb-4 text-yellow-400">Resources</h4>
          <ul className="space-y-2 text-gray-400">
            {resourceLinks.map((link) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  className="hover:text-yellow-400 transition-colors duration-200"
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-lg font-semibold mb-4 text-yellow-400">Support</h4>
          <ul className="space-y-2 text-gray-400">
            {supportLinks.map((link) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  className="hover:text-yellow-400 transition-colors duration-200"
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom */}
      <div className="mt-16 border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center">
        <div className="text-gray-500 text-sm mb-4 md:mb-0">
          &copy; {new Date().getFullYear()} Onegrab. All rights reserved.
        </div>

        <div className="flex space-x-4">
          {socialLinks.map(({ icon, href, name }) => (
            <a
              key={name}
              href={href}
              aria-label={name}
              className="bg-gray-800 p-2 rounded-full hover:bg-yellow-400 hover:text-black transition transform duration-200"
            >
              {icon}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
