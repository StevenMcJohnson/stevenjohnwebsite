import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useEffect, useContext, useState } from 'react';
import { NavContext } from '../context/NavContext';
import { ThemeContext } from '../context/ThemeContext';
import { Sun, Moon, Menu, X } from 'lucide-react';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { activeLink, setActiveLink } = useContext(NavContext);
  const { theme, setTheme } = useContext(ThemeContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Home', path: '/', type: 'page' },
    { name: 'About', path: '/#about', type: 'section' },
    { name: 'Experience', path: '/#experience', type: 'section' },
    { name: 'Skills', path: '/#skills', type: 'section' },
    { name: 'Education', path: '/#education', type: 'section' },
    { name: 'Volunteer', path: '/#volunteer', type: 'section' },
    { name: 'Rutgers', path: '/rutgers', type: 'page' },
  ];

  useEffect(() => {
    const currentPath = location.pathname + location.hash;
    
    // Don't hijack the active link if we are on a page with sections
    if (location.pathname === '/' && location.hash) {
      // The intersection observer in Home.tsx will handle this
      return;
    }

    const currentActiveLink = navLinks.find(link => link.path === currentPath) || navLinks.find(link => link.path === location.pathname);
    
    if (currentActiveLink) {
      setActiveLink(currentActiveLink.path);
    }
    setIsMenuOpen(false); // Close menu on navigation
  }, [location, setActiveLink]);


  const handleNavClick = (path: string, type: string) => {
    const [pathname, hash] = path.split('#');
    
    setActiveLink(path);

    if (type === 'page') {
      navigate(pathname);
    } else if (type === 'section') {
      if (location.pathname !== '/') {
        navigate('/#' + hash);
      } else {
        document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <div className="bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 font-sans">
      <nav className="fixed top-0 left-0 right-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm z-50 shadow-lg">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
              <Link to="/">Steven John</Link>
            </h1>
            <div className="hidden md:flex items-center space-x-6">
              {navLinks.map(link => (
                <button
                  key={link.name}
                  onClick={() => handleNavClick(link.path, link.type)}
                  className={`capitalize relative transition-colors duration-300 ${activeLink === link.path ? 'text-blue-500 dark:text-blue-400' : 'hover:text-blue-500 dark:hover:text-blue-400'}`}
                >
                  {link.name}
                  {activeLink === link.path && (
                    <motion.div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-blue-500 dark:bg-blue-400" layoutId="underline" />
                  )}
                </button>
              ))}
              <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                {theme === 'dark' ? <Sun className="text-yellow-400" /> : <Moon className="text-gray-600" />}
              </button>
            </div>
            <div className="md:hidden flex items-center">
              <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors mr-2">
                {theme === 'dark' ? <Sun className="text-yellow-400" /> : <Moon className="text-gray-600" />}
              </button>
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                {isMenuOpen ? <X /> : <Menu />}
              </button>
            </div>
          </div>
        </div>
        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div 
            className="md:hidden bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navLinks.map(link => (
                <button
                  key={link.name}
                  onClick={() => handleNavClick(link.path, link.type)}
                  className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium transition-colors duration-300 ${activeLink === link.path ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/50 dark:text-blue-300' : 'hover:bg-gray-100 dark:hover:bg-gray-800'}`}
                >
                  {link.name}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </nav>

      <main className="pt-16">{children}</main>

      <footer className="text-center border-t border-gray-200 dark:border-gray-700 pt-6 mt-8 text-gray-500">
        <p>&copy; {new Date().getFullYear()} Steven John. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default Layout; 