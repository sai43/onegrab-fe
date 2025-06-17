import { useState, useEffect } from 'react';
import { Menu, X, UserCircle2 } from 'lucide-react';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import { Button } from './ui/button';

interface User {
  username: string;
  token: string;
}

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('onegrab_user');
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const navItems = [
    { name: 'Home', href: '#' },
    { name: 'Categories', href: '#categories' },
    { name: 'Courses', href: '#courses' },
    { name: 'About Us', href: '#about' },
    { name: 'Plans', href: '#plans' },
    { name: 'Contact Us', href: '#contact' },
  ];

  const handleLoginSuccess = (username: string, token: string) => {
    const userData = { username, token };
    setUser(userData);
    localStorage.setItem('onegrab_user', JSON.stringify(userData));
  };

  const handleSignupSuccess = (username: string, token: string) => {
    const userData = { username, token };
    setUser(userData);
    localStorage.setItem('onegrab_user', JSON.stringify(userData));
  };

  const handleLogout = async () => {
    if (!user?.token) return;

    const myHeaders = new Headers();
    myHeaders.append('Authorization', `Bearer ${user.token}`);

    try {
      await fetch('http://localhost:4343/api/v1/users/sign_out', {
        method: 'DELETE',
        headers: myHeaders,
      });
    } catch {
      // optionally handle error here
    }

    setUser(null);
    localStorage.removeItem('onegrab_user');
  };

  return (
    <>
      <header
        className={`bg-white w-[95%] mx-[3%] rounded-[10px] border-2 border-black fixed top-5 z-50 transition-all duration-300 ${
          isScrolled ? 'bg-white shadow-lg py-3' : 'bg-transparent py-4'
        }`}
      >
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

            {/* Desktop Auth Buttons or Profile */}
            <div className="hidden md:flex items-center space-x-4">
              {!user ? (
                <>
                  <Button
                    variant="ghost"
                    className="text-text-gray hover:text-text-black"
                    onClick={() => setShowLogin(true)}
                  >
                    Login
                  </Button>
                  <Button
                    className="bg-accent text-text-black hover:bg-accent-yellow transition-colors duration-200"
                    onClick={() => setShowSignup(true)}
                  >
                    Sign Up
                  </Button>
                </>
              ) : (
                <div className="flex items-center space-x-4">
                  <UserCircle2 className="w-8 h-8 text-text-black" />
                  <span className="font-semibold">{user.username}</span>
                  <button
                    onClick={handleLogout}
                    className="text-red-600 hover:text-red-800 font-semibold"
                  >
                    Logout
                  </button>
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
                  {!user ? (
                    <>
                      <Button
                        variant="ghost"
                        className="text-text-gray hover:text-text-black"
                        onClick={() => {
                          setShowLogin(true);
                          setIsMobileMenuOpen(false);
                        }}
                      >
                        Login
                      </Button>
                      <Button
                        className="bg-accent text-text-black hover:bg-accent-yellow transition-colors duration-200"
                        onClick={() => {
                          setShowSignup(true);
                          setIsMobileMenuOpen(false);
                        }}
                      >
                        Sign Up
                      </Button>
                    </>
                  ) : (
                    <div className="flex items-center space-x-4">
                      <UserCircle2 className="w-8 h-8 text-text-black" />
                      <span className="font-semibold">{user.username}</span>
                      <button
                        onClick={handleLogout}
                        className="text-red-600 hover:text-red-800 font-semibold"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Modals */}
      {showLogin && (
        <LoginForm
          onLoginSuccess={handleLoginSuccess}
          onClose={() => setShowLogin(false)}
        />
      )}
      {showSignup && (
        <SignupForm
          onSignupSuccess={handleSignupSuccess}
          onClose={() => setShowSignup(false)}
        />
      )}
    </>
  );
};

export default Header;
