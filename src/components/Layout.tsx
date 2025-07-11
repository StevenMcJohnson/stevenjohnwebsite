import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useEffect, useContext } from 'react';
import { NavContext } from '../context/NavContext';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { activeLink, setActiveLink } = useContext(NavContext);

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

  return (
    <div className="bg-gray-900 text-gray-200 font-sans">
      <nav className="fixed top-0 left-0 right-0 bg-gray-900/80 backdrop-blur-sm z-50 shadow-lg">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-2xl font-bold text-white">
              <Link to="/">Steven John</Link>
            </h1>
            <div className="hidden md:flex space-x-6">
              {navLinks.map(link => (
                <button
                  key={link.name}
                  onClick={() => handleNavClick(link.path, link.type)}
                  className={`capitalize relative transition-colors duration-300 ${activeLink === link.path ? 'text-blue-400' : 'hover:text-blue-400'}`}
                >
                  {link.name}
                  {activeLink === link.path && (
                    <motion.div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-blue-400" layoutId="underline" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      <main>{children}</main>

      <footer className="text-center border-t border-gray-700 pt-6 mt-8 text-gray-500">
        <p>&copy; {new Date().getFullYear()} Steven John. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default Layout; 