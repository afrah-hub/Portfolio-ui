import { motion } from 'framer-motion';
import { ArrowRight, Mail, MapPin, ExternalLink, Download } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background Blobs with enhanced purple/pink gradients */}
      <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-600/30 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
      <div className="absolute top-0 -right-4 w-72 h-72 bg-pink-500/30 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-20 w-72 h-72 bg-purple-400/30 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-purple-600 font-semibold tracking-wider uppercase mb-4 dark:text-purple-400">Welcome to my space</h2>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Hola!<br /> I'm <br /><span className="gradient-text">Afrah Kabeer</span>
            </h1>
            <p className="text-xl text-purple-600 font-bold mb-2 dark:text-purple-400">
              Full Stack Developer
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-lg leading-relaxed">
              I build scalable web experiences that combine clean design with powerful engineering.
            </p>
            
            <div className="flex flex-wrap gap-6 items-center">
              <a href="#contact" className="btn-primary flex items-center gap-2">
                Contact Me <ArrowRight size={20} />
              </a>
              <div className="flex space-x-6">
              <a href="https://github.com/afrah-hub" target="_blank" rel="noopener noreferrer" 
                 className="p-3 bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-full hover:bg-purple-500/10 dark:hover:bg-purple-500/20 hover:border-purple-500/30 dark:hover:border-purple-500/50 transition-all duration-300">
                <i className="fa-brands fa-github text-slate-700 dark:text-white text-xl"></i>
              </a>
              <a href="https://www.linkedin.com/in/afrah-tk-a3525a379/" target="_blank" rel="noopener noreferrer"
                 className="p-3 bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-full hover:bg-purple-500/10 dark:hover:bg-purple-500/20 hover:border-purple-500/30 dark:hover:border-purple-500/50 transition-all duration-300">
                <i className="fa-brands fa-linkedin text-slate-700 dark:text-white text-xl"></i>
              </a>
              <a href="https://www.instagram.com/afrahbinthkabeer/" target="_blank" rel="noopener noreferrer"
                 className="p-3 bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-full hover:bg-purple-500/10 dark:hover:bg-purple-500/20 hover:border-purple-500/30 dark:hover:border-purple-500/50 transition-all duration-300">
                <i className="fa-brands fa-instagram text-slate-700 dark:text-white text-xl"></i>
              </a>
            </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative w-full max-w-[240px] sm:max-w-xs md:max-w-none mx-auto mt-8 md:mt-0"
          >
            <div className="w-full aspect-square rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-900/40 backdrop-blur-xl p-2 rotate-3 hover:rotate-0 transition-transform duration-500 shadow-2xl border border-slate-200 dark:border-purple-500/20">
               <img 
                 src="https://firebasestorage.googleapis.com/v0/b/dodaymessenger-2c64d.firebasestorage.app/o/profile_images%2Fafrah.jpeg?alt=media&token=942a43ec-5685-482d-90b0-758bb674bb37" 
                 alt="Afrah Kabeer" 
                 className="w-full h-full object-cover rounded-xl"
               />
            </div>
            {/* Floating Badge */}
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute -bottom-4 -right-4 md:-bottom-6 md:-right-6 bg-white/80 dark:bg-slate-900/60 backdrop-blur-xl px-4 py-2 md:px-6 md:py-3 rounded-2xl border border-slate-200 dark:border-purple-500/30 flex items-center gap-2 shadow-xl"
            >
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-xs md:text-sm font-bold truncate text-slate-800 dark:text-white">Available for Hire</span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
