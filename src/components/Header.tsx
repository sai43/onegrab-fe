import { useState, useEffect } from 'react';
import { Menu, X, UserCircle2 } from 'lucide-react';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import { Button } from './ui/button';
import { Link } from 'react-router-dom';

interface User {
  id: number;
  first_name: string | null;
  last_name: string | null;
  username: string;
  email: string;
  phone: string;
}

interface StoredUserData {
  user: User;
  token: string;
}

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [loadingLogout, setLoadingLogout] = useState(false);  // Added
  const [userData, setUserData] = useState<StoredUserData | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const stored = localStorage.getItem('onegrab_user');
    if (stored) {
      try {
        const parsed: StoredUserData = JSON.parse(stored);
        setUserData(parsed);
      } catch {
        localStorage.removeItem('onegrab_user');
      }
    }
  }, []);

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Categories', href: '/categories' },
    { name: 'Courses', href: '/courses' },
    { name: 'Plans', href: '/plans' },
    { name: 'Blog', href: '/blog' },
    { name: 'About Us', href: '/about' },
    { name: 'Contact Us', href: '/contact' },
  ];

  const handleLoginSuccess = (user: User, token: string) => {
    const data = { user, token };
    setUserData(data);
    localStorage.setItem('onegrab_user', JSON.stringify(data));
  };

  const handleSignupSuccess = (user: User, token: string) => {
    const data = { user, token };
    setUserData(data);
    localStorage.setItem('onegrab_user', JSON.stringify(data));
  };

  const handleLogout = async () => {
    if (!userData?.token) return;

    setLoadingLogout(true);

    const backendUrl = import.meta.env.VITE_API_BASE_URL;

    try {
      await fetch(`${backendUrl}/api/v1/users/logout`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${userData.token}` },
      });
    } catch {
      // optionally handle error here
    }

    setUserData(null);
    localStorage.removeItem('onegrab_user');
    setLoadingLogout(false);
  };

  return (
    <>
      <header
        className={`bg-white w-[92%] mx-[3%] rounded-[10px] border-2 border-black fixed top-5 z-50 transition-all duration-300 ${
          isScrolled ? 'bg-white shadow-lg py-2' : 'bg-transparent py-2'
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Link to="/" aria-label="Go to homepage">
                <h1 className="text-2xl font-anton font-bold text-text-black tracking-extra-wide cursor-pointer">
                  ONEGRAB
                </h1>
              </Link>
            </div>

            <nav className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="text-text-gray hover:text-text-black transition-colors duration-200 font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            <div className="hidden md:flex items-center space-x-4">
              {!userData ? (
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
                  <span className="font-semibold">{userData.user.username}</span>
                  <button
                    onClick={handleLogout}
                    disabled={loadingLogout}
                    className={`text-red-600 font-semibold ${
                      loadingLogout ? 'cursor-not-allowed opacity-50' : 'hover:text-red-800'
                    }`}
                  >
                    {loadingLogout ? 'Logging out...' : 'Logout'}
                  </button>
                </div>
              )}
            </div>

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

          {isMobileMenuOpen && (
            <div className="md:hidden mt-4 pb-4 border-t border-gray-200">
              <nav className="flex flex-col space-y-4 mt-4">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className="text-text-gray hover:text-text-black transition-colors duration-200 font-medium"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
                <div className="flex flex-col space-y-2 pt-4 border-t border-gray-200">
                  {!userData ? (
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
                      <span className="font-semibold">{userData.user.username}</span>
                      <button
                        onClick={handleLogout}
                        disabled={loadingLogout}
                        className={`text-red-600 font-semibold ${
                          loadingLogout ? 'cursor-not-allowed opacity-50' : 'hover:text-red-800'
                        }`}
                      >
                        {loadingLogout ? 'Logging out...' : 'Logout'}
                      </button>
                    </div>
                  )}
                </div>
              </nav>
            </div>
          )}
        </div>
      </header>

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
