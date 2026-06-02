import { useState, useEffect } from 'react';
import { Moon, Sun, Menu, X } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const { isDark, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 ${scrolled ? 'py-3 bg-gray-900/80 backdrop-blur-xl border-b border-white/10 shadow-2xl' : 'py-6 bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-2xl font-black tracking-tighter flex items-center gap-2"
          >
            <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-pink-500 rounded-lg flex items-center justify-center text-white text-base">AK</div>
            <span className="bg-gradient-to-r from-white to-purple-400 bg-clip-text text-transparent">AFRAH KABEER</span>
          </motion.div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href}
                className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white transition-colors relative group"
              >
                {link.name}
                <span className="absolute bottom-0 left-4 right-4 h-0.5 bg-gradient-to-r from-purple-600 to-pink-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
              </a>
            ))}
            <div className="h-6 w-px bg-white/10 mx-4"></div>
            <button 
              onClick={toggleTheme}
              className="p-2.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 group"
            >
              {isDark ? <Sun size={18} className="text-gray-300 group-hover:text-yellow-400 transition-colors" /> : <Moon size={18} className="text-gray-300 group-hover:text-purple-400 transition-colors" />}
            </button>
          </div>

          {/* Mobile Nav Toggle */}
          <div className="md:hidden flex items-center space-x-4">
            <button 
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-white/5 border border-white/10"
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-gray-300 hover:text-white transition-colors"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-gray-900/95 backdrop-blur-2xl border-b border-white/10 overflow-hidden"
          >
            <div className="p-4 space-y-2">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="block p-4 text-lg font-medium text-gray-300 hover:text-white hover:bg-white/5 rounded-xl transition-all"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
