import { Mail, ArrowUp } from 'lucide-react';

const Footer = () => {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
      <footer className="relative py-12 overflow-hidden">
        {/* Background Decorative Element */}
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-12">
            <div className="text-center md:text-left">
              <h3 className="text-2xl font-bold bg-gradient-to-r from-white to-purple-400 bg-clip-text text-transparent mb-2">
                Afrah Kabeer
              </h3>
              <p className="text-gray-400 max-w-xs">
                Aspiring Full Stack Web Developer building modern digital experiences.
              </p>
            </div>

            <div className="flex flex-col items-center md:items-end gap-6">
              <div className="flex space-x-6">
                <a href="https://github.com/afrah-hub" target="_blank" rel="noopener noreferrer" 
                   className="w-10 h-10 flex items-center justify-center bg-white/5 border border-white/10 rounded-full hover:bg-purple-500/20 hover:border-purple-500/50 transition-all duration-300">
                  <i className="fa-brands fa-github text-white"></i>
                </a>
                <a href="https://www.linkedin.com/in/afrah-tk-a3525a379/" target="_blank" rel="noopener noreferrer"
                   className="w-10 h-10 flex items-center justify-center bg-white/5 border border-white/10 rounded-full hover:bg-purple-500/20 hover:border-purple-500/50 transition-all duration-300">
                  <i className="fa-brands fa-linkedin text-white"></i>
                </a>
                <a href="https://www.instagram.com/afrahbinthkabeer/" target="_blank" rel="noopener noreferrer"
                   className="w-10 h-10 flex items-center justify-center bg-white/5 border border-white/10 rounded-full hover:bg-purple-500/20 hover:border-purple-500/50 transition-all duration-300">
                  <i className="fa-brands fa-instagram text-white"></i>
                </a>
                <a href="mailto:afrahbinthkabeer@gmail.com" 
                   className="w-10 h-10 flex items-center justify-center bg-white/5 border border-white/10 rounded-full hover:bg-purple-500/20 hover:border-purple-500/50 transition-all duration-300">
                  <Mail className="w-5 h-5 text-white" />
                </a>
              </div>
              
              <button onClick={scrollToTop} className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors group">
                Back to top <ArrowUp className="w-4 h-4 group-hover:-translate-y-1 transition-transform" />
              </button>
            </div>
          </div>

          <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
            <p>© {new Date().getFullYear()} Afrah Kabeer. All rights reserved.</p>
            <div className="flex space-x-8">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    );
};

export default Footer;
