import { useState, useEffect } from 'react';
import { Menu, X, UserCircle2 } from 'lucide-react';
import { Button } from './ui/button';
import SignupForm from './SignupForm';
import LoginForm from './LoginForm';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', href: '#' },
    { name: 'Categories', href: '#categories' },
    { name: 'Courses', href: '#courses' },
    { name: 'About Us', href: '#about' },
    { name: 'Contact Us', href: '#contact' },
  ];

  const handleSignupSuccess = (username) => {
    setUsername(username);
    setIsLoggedIn(true);
  };

  const handleLoginSuccess = (username) => {
    setUsername(username);
    setIsLoggedIn(true);
  };

  return (
    <>
      <header className={`bg-white w-[95%] mx-[3%] rounded-[10px] border-2 border-black fixed top-5 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-lg py-3' : 'bg-transparent py-4'
      }`}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center">
              <h1 className="text-2xl font-anton font-bold text-text-black tracking-extra-wide">
                ONEGRAB
              </h1>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-text-gray hover:text-text-black transition-colors duration-200 font-medium"
                >
                  {item.name}
                </a>
              ))}
            </nav>

            {/* Desktop Auth Buttons */}
            <div className="hidden md:flex items-center space-x-4">
              {!isLoggedIn ? (
                <>
                  <Button
                    onClick={() => setIsLoginOpen(true)}
                    variant="ghost"
                    className="text-text-gray hover:text-text-black"
                  >
                    Login
                  </Button>
                  <Button
                    onClick={() => setIsSignupOpen(true)}
                    className="bg-accent text-text-black hover:bg-accent-yellow transition-colors duration-200"
                  >
                    Sign Up
                  </Button>
                </>
              ) : (
                <div className="flex items-center space-x-2 cursor-pointer">
                  <UserCircle2 className="w-8 h-8 text-text-black" />
                  <span className="font-semibold">{username}</span>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6 text-text-black" />
              ) : (
                <Menu className="h-6 w-6 text-text-black" />
              )}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden mt-4 pb-4 border-t border-gray-200">
              <nav className="flex flex-col space-y-4 mt-4">
                {navItems.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="text-text-gray hover:text-text-black transition-colors duration-200 font-medium"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.name}
                  </a>
                ))}
                <div className="flex flex-col space-y-2 pt-4 border-t border-gray-200">
                  {!isLoggedIn ? (
                    <>
                      <Button
                        onClick={() => setIsLoginOpen(true)}
                        variant="ghost"
                        className="text-text-gray hover:text-text-black"
                      >
                        Login
                      </Button>
                      <Button
                        onClick={() => setIsSignupOpen(true)}
                        className="bg-accent text-text-black hover:bg-accent-yellow transition-colors duration-200"
                      >
                        Sign Up
                      </Button>
                    </>
                  ) : (
                    <div className="flex items-center space-x-2 cursor-pointer">
                      <UserCircle2 className="w-8 h-8 text-text-black" />
                      <span className="font-semibold">{username}</span>
                    </div>
                  )}
                </div>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Signup Modal */}
      {isSignupOpen && (
        <SignupForm
          onClose={() => setIsSignupOpen(false)}
          onSignupSuccess={handleSignupSuccess}
        />
      )}

      {/* Login Modal */}
      {isLoginOpen && (
        <LoginForm
          onClose={() => setIsLoginOpen(false)}
          onLoginSuccess={handleLoginSuccess}
        />
      )}
    </>
  );
};

export default Header;
