import { useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const About = () => {
  // Parallax mouse movements tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Spring options for ultra-smooth easing
  const springConfig = { damping: 50, stiffness: 150, mass: 0.5 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX - innerWidth / 2) / (innerWidth / 2);
      const y = (e.clientY - innerHeight / 2) / (innerHeight / 2);
      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  // Transformed values for parallax grid floor
  const gridRotateX = useTransform(smoothMouseY, [-1, 1], [50, 60]);
  const gridRotateY = useTransform(smoothMouseX, [-1, 1], [-6, 6]);

  // Card Tilt values
  const cardRotateX = useTransform(smoothMouseY, [-1, 1], [10, -10]);
  const cardRotateY = useTransform(smoothMouseX, [-1, 1], [-10, 10]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1
      }
    }
  };

  const fadeUpVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  };

  const tagContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08
      }
    }
  };

  const tagVariants = {
    hidden: { opacity: 0, scale: 0.85, y: 15 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 12 }
    }
  };

  const codeContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.4
      }
    }
  };

  const codeLineVariants = {
    hidden: { opacity: 0, x: -15 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.4, ease: "easeOut" }
    }
  };

  const featureListVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.6
      }
    }
  };

  const featureCardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
    }
  };

  const techTags = [
    'React',
    'ASP.NET Core',
    'SQL',
    'Tailwind CSS',
    'Dapper'
  ];

  const featureCards = [
    {
      num: '01',
      title: 'Projects',
      desc: 'CozyCrave • CottonHouse • GuideYu'
    },
    {
      num: '02',
      title: 'Architecture',
      desc: 'Clean and scalable backend design'
    },
    {
      num: '03',
      title: 'Experience',
      desc: 'Frontend + Backend Development'
    }
  ];

  return (
    <section id="about" className="relative py-20 scroll-mt-24 overflow-hidden bg-slate-50 dark:bg-gray-900 text-slate-900 dark:text-white transition-colors duration-300">
      {/* 3D Perspective Grid Floor */}
      <div 
        className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0"
        style={{ perspective: "1200px", perspectiveOrigin: "50% 30%" }}
      >
        <motion.div
          style={{
            rotateX: gridRotateX,
            rotateY: gridRotateY,
            transformStyle: "preserve-3d",
          }}
          className="absolute inset-x-0 -top-[20%] w-full h-[150%] origin-top opacity-[0.05] dark:opacity-[0.1] transition-opacity duration-500"
        >
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid-3d-about" width="80" height="80" patternUnits="userSpaceOnUse">
                <path d="M 80 0 L 0 0 0 80" fill="none" className="stroke-purple-600 dark:stroke-purple-500" strokeWidth="1.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid-3d-about)" />
          </svg>
        </motion.div>
      </div>

      {/* Background Animated Glow Blobs (Orbs) */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden">
        <motion.div
          animate={{
            x: [0, 40, -30, 0],
            y: [0, -50, 30, 0],
            scale: [1, 1.2, 0.9, 1],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-[10%] left-[5%] w-72 h-72 bg-purple-500/5 dark:bg-purple-600/10 rounded-full filter blur-[80px]"
        />
        <motion.div
          animate={{
            x: [0, -40, 30, 0],
            y: [0, 50, -30, 0],
            scale: [1, 0.9, 1.15, 1],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute bottom-[10%] right-[5%] w-80 h-80 bg-indigo-500/5 dark:bg-pink-500/10 rounded-full filter blur-[90px]"
        />
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"
        >
          {/* LEFT SIDE: Heading, Bio Paragraphs, Tech Tags, CTA Button */}
          <div className="lg:col-span-7 space-y-6">
            <motion.div variants={fadeUpVariants} className="space-y-3">
              <span className="text-[11px] font-extrabold uppercase tracking-widest text-purple-400/90 block">
                ABOUT ME
              </span>
              <h3 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white tracking-tight leading-tight max-w-xl">
                Building digital products with modern technologies and clean architecture.
              </h3>
            </motion.div>

            <motion.div variants={fadeUpVariants} className="space-y-4 text-slate-600 dark:text-gray-400 text-sm md:text-base leading-relaxed font-normal max-w-xl">
              <p>
                I'm Afrah Kabeer, a Full Stack Developer who transforms ideas into scalable digital experiences. 
                I build modern web applications by combining clean frontend design with powerful backend architecture.
              </p>
              <p>
                My expertise includes React, ASP.NET Core, SQL, and Dapper, allowing me to create complete end-to-end 
                solutions from user interfaces to secure APIs and databases.
              </p>
              <p>
                I enjoy solving complex problems, improving application performance, and following best practices in 
                software development. Through projects like CozyCrave, CottonHouse, and GuideYu, I focus on creating 
                applications that are practical, responsive, and built for real users.
              </p>
            </motion.div>

            {/* Currently Working With Badges */}
            <motion.div variants={fadeUpVariants} className="space-y-2">
              <span className="text-[10px] font-bold text-slate-400 dark:text-gray-500 uppercase tracking-widest block">
                Currently working with
              </span>
              <motion.div 
                variants={tagContainerVariants}
                className="flex flex-wrap gap-2.5"
              >
                {techTags.map((tech, idx) => (
                  <motion.span
                    key={idx}
                    variants={tagVariants}
                    whileHover={{ scale: 1.08, rotate: [0, -1, 1, 0], y: -2 }}
                    className="px-3 py-1.5 rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/5 text-slate-700 dark:text-gray-300 text-xs font-semibold tracking-wide hover:border-purple-500/20 dark:hover:border-purple-500/20 hover:bg-purple-500/5 dark:hover:bg-purple-500/5 transition-all duration-300 cursor-default select-none shadow-sm dark:shadow-none hover:shadow-md hover:shadow-purple-500/5"
                  >
                    {tech}
                  </motion.span>
                ))}
              </motion.div>
            </motion.div>

            {/* Explore My Work Button */}
            <motion.div variants={fadeUpVariants} className="pt-2">
              <a 
                href="#projects" 
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-purple-600/90 hover:bg-purple-600 border border-purple-500/30 text-white text-sm font-semibold tracking-wide shadow-md transition-all duration-300"
              >
                Explore My Work
                <ArrowRight size={15} />
              </a>
            </motion.div>
          </div>

          {/* RIGHT SIDE: Creative glassmorphic profile card with code-style block */}
          <motion.div
            variants={fadeUpVariants}
            style={{ perspective: "1200px", transformStyle: "preserve-3d" }}
            className="lg:col-span-5 w-full max-w-md mx-auto"
          >
            <motion.div 
              style={{
                rotateX: cardRotateX,
                rotateY: cardRotateY,
                transformStyle: "preserve-3d",
              }}
              className="bg-white/80 dark:bg-slate-950/40 backdrop-blur-md border border-slate-200 dark:border-white/5 rounded-[20px] p-6 md:p-8 flex flex-col gap-6 relative overflow-hidden group shadow-[0_0_40px_rgba(147,51,234,0.04)] dark:shadow-[0_0_40px_rgba(147,51,234,0.08)] hover:shadow-[0_0_50px_rgba(147,51,234,0.12)] dark:hover:shadow-[0_0_50px_rgba(147,51,234,0.18)] transition-all duration-500"
            >
              {/* Subtle top ambient glow strip */}
              <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-purple-500/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              {/* Profile Card Header */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-purple-600/10 to-indigo-600/10 dark:from-purple-600/20 dark:to-indigo-600/20 border border-purple-500/20 dark:border-purple-500/30 flex items-center justify-center text-slate-800 dark:text-white text-base font-bold tracking-widest select-none">
                  AK
                </div>
                <div>
                  <h4 className="text-slate-900 dark:text-white font-bold text-base tracking-tight">Afrah Kabeer</h4>
                  <p className="text-slate-500 dark:text-gray-500 text-xs font-medium mt-0.5">Full Stack Developer</p>
                </div>
              </div>

              {/* Code-Style Editor Block */}
              <div className="w-full bg-[#050314]/95 p-4 rounded-xl border border-slate-200 dark:border-white/5 font-mono text-[11px] md:text-[12px] leading-relaxed shadow-inner text-white">
                <div className="flex items-center gap-1.5 mb-2.5 border-b border-slate-200 dark:border-white/5 pb-2">
                  <span className="w-2 h-2 rounded-full bg-red-500/40"></span>
                  <span className="w-2 h-2 rounded-full bg-yellow-500/40"></span>
                  <span className="w-2 h-2 rounded-full bg-green-500/40"></span>
                  <span className="text-[10px] text-gray-500 font-semibold ml-2">developer.js</span>
                </div>
                <motion.div 
                  variants={codeContainerVariants}
                  className="space-y-0.5"
                >
                  <motion.div variants={codeLineVariants}>
                    <span className="text-purple-400">const</span>{' '}
                    <span className="text-blue-400">developer</span> = &#123;
                  </motion.div>
                  <motion.div variants={codeLineVariants} className="pl-4">
                    <span className="text-sky-300">role</span>: <span className="text-emerald-400">"Full Stack Developer"</span>,
                  </motion.div>
                  <motion.div variants={codeLineVariants} className="pl-4">
                    <span className="text-sky-300">frontend</span>: <span className="text-emerald-400">"React"</span>,
                  </motion.div>
                  <motion.div variants={codeLineVariants} className="pl-4">
                    <span className="text-sky-300">backend</span>: <span className="text-emerald-400">".NET"</span>,
                  </motion.div>
                  <motion.div variants={codeLineVariants} className="pl-4">
                    <span className="text-sky-300">database</span>: <span className="text-emerald-400">"SQL"</span>
                  </motion.div>
                  <motion.div variants={codeLineVariants} className="flex items-center">
                    <span>&#125;;</span>
                    <span className="inline-block w-[6px] h-[12px] ml-1.5 bg-pink-500 dark:bg-purple-400 animate-blink"></span>
                  </motion.div>
                </motion.div>
              </div>

              <div className="w-full border-t border-slate-200 dark:border-white/5"></div>

              {/* Feature Cards block */}
              <motion.div 
                variants={featureListVariants}
                className="w-full flex flex-col gap-3"
              >
                {featureCards.map((card, idx) => (
                  <motion.div 
                    key={idx}
                    variants={featureCardVariants}
                    whileHover={{ 
                      y: -4, 
                      scale: 1.02,
                      borderColor: "rgba(147, 51, 234, 0.3)",
                      backgroundColor: "rgba(147, 51, 234, 0.04)"
                    }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    className="p-4 rounded-xl bg-slate-100/50 dark:bg-white/5 border border-slate-200 dark:border-white/5 hover:shadow-[0_4px_20px_-4px_rgba(147,51,234,0.1)] transition-colors duration-300 group/card flex items-center gap-4 cursor-default"
                  >
                    <div className="text-xs font-bold text-purple-400 tracking-wider font-mono">
                      {card.num}
                    </div>
                    <div>
                      <div className="text-xs font-extrabold text-slate-800 dark:text-gray-300 uppercase tracking-widest">
                        {card.title}
                      </div>
                      <p className="text-slate-600 dark:text-gray-400 text-[11px] md:text-xs mt-0.5 font-medium leading-relaxed">
                        {card.desc}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
