import { useState, useEffect } from 'react';
import { Moon, Sun, Menu, X } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';

const Navbar = () => {
  const { isDark, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const shouldReduceMotion = useReducedMotion();

  // Nav items configuration
  const navLinks = [
    { name: 'Home', id: 'home', href: '#' },
    { name: 'About', id: 'about', href: '#about' },
    { name: 'Skills', id: 'skills', href: '#skills' },
    { name: 'Projects', id: 'projects', href: '#projects' },
    { name: 'Contact', id: 'contact', href: '#contact' },
  ];

  // Scroll spy to highlight active section
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200; // Offset for trigger

      // Check home section
      if (window.scrollY < 300) {
        setActiveSection('home');
        return;
      }

      // Check other sections
      const sections = ['about', 'skills', 'projects', 'contact'];
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Run initially
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-5 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
      <motion.nav
        initial={{ opacity: 0, y: shouldReduceMotion ? 0 : -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-4xl bg-white/20 dark:bg-gray-950/20 border border-white/20 dark:border-white/5 shadow-sm rounded-[32px] backdrop-blur-2xl transition-all duration-500 pointer-events-auto overflow-hidden"
      >
        <div className="px-6 py-3 flex justify-between items-center">
          
          {/* LEFT: Branding name (minimalist, no icons) */}
          <a href="#" className="text-sm md:text-base font-extrabold tracking-widest text-slate-800 dark:text-white hover:text-purple-600 dark:hover:text-purple-400 transition-colors uppercase select-none">
            AFRAH KABEER
          </a>

          {/* CENTER: Desktop Menu links */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setActiveSection(link.id)}
                  className={`px-4 py-2 text-xs font-bold uppercase tracking-wider relative transition-colors duration-300 ${
                    isActive
                      ? 'text-purple-600 dark:text-purple-300'
                      : 'text-slate-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-white'
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <motion.span
                      layoutId="activeTab"
                      className="absolute bottom-0 left-4 right-4 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </a>
              );
            })}
          </div>

          {/* RIGHT: Circular Theme Toggle & Mobile Toggle */}
          <div className="flex items-center gap-3">
            {/* Theme Toggle (Circular) */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle Theme"
              className="w-10 h-10 rounded-full flex items-center justify-center bg-slate-100 hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10 border border-slate-200/50 dark:border-white/10 text-slate-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-yellow-400 transition-all duration-300"
            >
              {isDark ? <Sun size={17} /> : <Moon size={17} />}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle Menu"
              className="md:hidden w-10 h-10 rounded-full flex items-center justify-center bg-slate-100 hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10 border border-slate-200/50 dark:border-white/10 text-slate-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-white transition-all duration-300"
            >
              {isOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {/* ── MOBILE MENU ── */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="md:hidden border-t border-slate-200/50 dark:border-white/5 bg-white/70 dark:bg-gray-950/40 backdrop-blur-xl"
            >
              <div className="px-6 py-4 flex flex-col gap-2">
                {navLinks.map((link) => {
                  const isActive = activeSection === link.id;
                  return (
                    <a
                      key={link.name}
                      href={link.href}
                      onClick={() => {
                        setActiveSection(link.id);
                        setIsOpen(false);
                      }}
                      className={`px-4 py-3 rounded-2xl text-xs font-extrabold uppercase tracking-widest transition-all ${
                        isActive
                          ? 'bg-gradient-to-r from-purple-500/10 to-pink-500/10 text-purple-600 dark:text-purple-300 border border-purple-500/20'
                          : 'text-slate-600 dark:text-gray-400 hover:bg-slate-100 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-white border border-transparent'
                      }`}
                    >
                      {link.name}
                    </a>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </div>
  );
};

export default Navbar;
