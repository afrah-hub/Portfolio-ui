import { motion, useReducedMotion, useMotionValue, useSpring } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const Hero = () => {
  const { isDark } = useTheme();
  const shouldReduceMotion = useReducedMotion();

  // Mouse coordinates tracking for parallax glow movement
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 30, stiffness: 100 };
  const glowX = useSpring(mouseX, springConfig);
  const glowY = useSpring(mouseY, springConfig);

  const handleMouseMove = (e) => {
    if (shouldReduceMotion) return;
    const { clientX, clientY, currentTarget } = e;
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    const x = ((clientX - left - width / 2) / (width / 2)) * 20; // max 20px
    const y = ((clientY - top - height / 2) / (height / 2)) * 20; // max 20px
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  // Floating variants for the photo card
  const floatAnimate = shouldReduceMotion ? {} : {
    y: [0, -12, 0],
    rotate: [-1, 1, -1]
  };

  const floatTransition = shouldReduceMotion ? {} : {
    y: {
      duration: 5,
      repeat: Infinity,
      ease: "easeInOut"
    },
    rotate: {
      duration: 5,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  // Easing preset
  const easeOutExpo = [0.16, 1, 0.3, 1];

  return (
    <section 
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-white dark:bg-gray-900 transition-colors duration-500"
    >
      {/* Background Blobs shifting based on cursor movement */}
      <motion.div 
        style={{ x: glowX, y: glowY }}
        className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0"
      >
        <div className="absolute top-[-10%] left-[-5%] w-[450px] h-[450px] bg-purple-600/10 dark:bg-purple-500/15 rounded-full filter blur-[100px] animate-drift-1"></div>
        <div className="absolute top-[10%] right-[-5%] w-[450px] h-[450px] bg-pink-500/10 dark:bg-indigo-600/15 rounded-full filter blur-[100px] animate-drift-2"></div>
        <div className="absolute bottom-[-10%] left-[15%] w-[450px] h-[450px] bg-blue-400/10 dark:bg-cyan-500/15 rounded-full filter blur-[100px] animate-drift-3"></div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          
          {/* LEFT SIDE: Content animations */}
          <div>
            {/* Welcome Text */}
            <motion.h2 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: easeOutExpo, delay: 0.1 }}
              className="text-purple-600 font-semibold tracking-wider uppercase mb-4 dark:text-purple-400"
            >
              Welcome to my space
            </motion.h2>

            {/* Heading text (Animate word by word / line by line) */}
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              <motion.span
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, ease: easeOutExpo, delay: 0.2 }}
                className="inline-block origin-left"
              >
                Hola!
              </motion.span>
              <br />
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: easeOutExpo, delay: 0.35 }}
                className="inline-block text-slate-800 dark:text-white"
              >
                I'm
              </motion.span>
              <br />
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: easeOutExpo, delay: 0.45 }}
                className="gradient-text animate-gradient-x bg-gradient-to-r from-purple-600 via-pink-500 to-blue-500 dark:from-purple-400 dark:via-cyan-400 dark:to-indigo-400 bg-[length:200%_auto] inline-block py-1"
              >
                Afrah Kabeer
              </motion.span>
            </h1>

            {/* Job Title */}
            <motion.p 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: easeOutExpo, delay: 0.6 }}
              className="text-xl text-purple-600 font-bold mb-2 dark:text-purple-400"
            >
              Full Stack Developer
            </motion.p>

            {/* Description */}
            <motion.p 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: easeOutExpo, delay: 0.7 }}
              className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-lg leading-relaxed"
            >
              I build scalable web experiences that combine clean design with powerful engineering.
            </motion.p>
            
            {/* Button and Social Icons */}
            <div className="flex flex-wrap gap-6 items-center">
              <motion.a 
                href="#contact" 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: easeOutExpo, delay: 0.8 }}
                whileHover={{ 
                  y: -5,
                  boxShadow: isDark
                    ? "0 15px 30px -5px rgba(168, 85, 247, 0.4), 0 0 15px rgba(6, 182, 212, 0.15)"
                    : "0 15px 30px -5px rgba(168, 85, 247, 0.25), 0 0 15px rgba(236, 72, 153, 0.1)",
                }}
                whileTap={{ scale: 0.95 }}
                className="group px-8 py-3 rounded-full bg-gradient-to-r from-purple-600 via-pink-500 to-purple-600 bg-[length:200%_100%] hover:bg-[100%_0%] text-white font-bold transition-all duration-500 flex items-center gap-2 shadow-lg shadow-purple-500/20"
              >
                Contact Me 
                <ArrowRight className="group-hover:translate-x-1.5 transition-transform duration-300" size={20} />
              </motion.a>

              <div className="flex space-x-6">
                {[
                  { href: "https://github.com/afrah-hub", icon: "fa-brands fa-github" },
                  { href: "https://www.linkedin.com/in/afrah-tk-a3525a379/", icon: "fa-brands fa-linkedin" },
                  { href: "https://www.instagram.com/afrahbinthkabeer/", icon: "fa-brands fa-instagram" }
                ].map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: easeOutExpo, delay: 0.9 + index * 0.1 }}
                    whileHover={{
                      y: -5,
                      rotate: 5,
                      scale: 1.08,
                      boxShadow: "0 0 15px rgba(168, 85, 247, 0.25)"
                    }}
                    whileTap={{ scale: 0.95 }}
                    className="p-3 bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-full hover:bg-gradient-to-tr hover:from-purple-600/10 hover:to-pink-500/10 dark:hover:from-purple-500/20 dark:hover:to-pink-500/20 hover:border-purple-500/30 dark:hover:border-purple-500/50 text-slate-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-all duration-300"
                  >
                    <i className={`${social.icon} text-xl`}></i>
                  </motion.a>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT SIDE: Profile Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ 
              opacity: 1, 
              scale: 1,
              ...floatAnimate
            }}
            transition={{ 
              duration: 0.8,
              ease: easeOutExpo,
              ...floatTransition
            }}
            whileHover={{
              scale: 1.03,
              boxShadow: isDark
                ? "0 25px 50px -12px rgba(168, 85, 247, 0.45), 0 0 35px rgba(6, 182, 212, 0.25)"
                : "0 25px 50px -12px rgba(168, 85, 247, 0.25), 0 0 25px rgba(236, 72, 153, 0.2)",
            }}
            className="relative w-full max-w-[240px] sm:max-w-xs md:max-w-none mx-auto mt-8 md:mt-0 p-[2px] rounded-3xl overflow-hidden cursor-pointer group"
          >
            {/* Rotating gradient border */}
            <div className="absolute inset-[-50%] bg-hero-glow-conic animate-spin-slow pointer-events-none opacity-80 group-hover:opacity-100 transition-opacity duration-300"></div>

            {/* Inner frame */}
            <div className="relative w-full aspect-square bg-slate-50/95 dark:bg-slate-950/80 backdrop-blur-xl p-2 rounded-[22px] border border-white/20 dark:border-white/5 transition-all duration-500">
               <img 
                 src="https://firebasestorage.googleapis.com/v0/b/dodaymessenger-2c64d.firebasestorage.app/o/profile_images%2Fafrah.jpeg?alt=media&token=942a43ec-5685-482d-90b0-758bb674bb37" 
                 alt="Afrah Kabeer" 
                 className="w-full h-full object-cover rounded-xl"
               />
            </div>
            
            {/* Floating Badge */}
            <motion.div 
              className="absolute -bottom-4 -right-4 md:-bottom-6 md:-right-6 bg-white/80 dark:bg-slate-900/60 backdrop-blur-xl px-4 py-2 md:px-6 md:py-3 rounded-2xl border border-slate-200/30 dark:border-purple-500/30 flex items-center gap-2 shadow-xl animate-float-badge"
            >
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse-scale"></div>
              <span className="text-xs md:text-sm font-bold truncate text-slate-800 dark:text-white">Available for Hire</span>
            </motion.div>
          </motion.div>

        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 pointer-events-none select-none z-10">
        <div className="w-6 h-10 rounded-full border-2 border-slate-300 dark:border-gray-700 flex justify-center p-1.5 backdrop-blur-sm">
          <motion.div 
            animate={shouldReduceMotion ? {} : {
              y: [0, 12, 0],
              opacity: [1, 0.1, 1]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="w-1 h-2 rounded-full bg-purple-600 dark:bg-purple-400"
          />
        </div>
        <span className="text-[9px] uppercase tracking-widest text-slate-400 dark:text-gray-500 font-extrabold font-mono">
          Scroll
        </span>
      </div>

    </section>
  );
};

export default Hero;
