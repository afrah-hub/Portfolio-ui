import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import projectsData from '../data/projects';
import { useTheme } from '../context/ThemeContext';

// ─── Animation Presets ────────────────────────────────────────────────────────

const headerVariants = {
  hidden: { opacity: 0, y: -24, scale: 0.96 },
  visible: {
    opacity: 1, y: 0, scale: 1,
    transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] },
  },
};

const dividerVariants = {
  hidden: { scaleX: 0, opacity: 0 },
  visible: {
    scaleX: 1, opacity: 1,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.15 },
  },
};

const filterContainerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.05 },
  },
};

const filterButtonVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1, scale: 1,
    transition: { type: 'spring', stiffness: 260, damping: 18 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.96 },
  visible: {
    opacity: 1, y: 0, scale: 1,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

// Lightweight interactive hover 3D tilt card component
const TiltCard = ({ children, className, style, ...props }) => {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const box = card.getBoundingClientRect();
    const x = e.clientX - box.left - box.width / 2;
    const y = e.clientY - box.top - box.height / 2;
    
    // Max 10 degrees tilt
    const factorX = -(y / (box.height / 2)) * 10;
    const factorY = (x / (box.width / 2)) * 10;
    
    setRotateX(factorX);
    setRotateY(factorY);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.div
      style={{
        ...style,
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};

const Projects = () => {
  const { isDark } = useTheme();
  const projects = projectsData;
  const [activeFilter, setActiveFilter] = useState('All');

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

  const categories = ['All', ...new Set(projects.flatMap(p => p.subcategories || []))];

  const filteredProjects = projects.filter(project => {
    if (activeFilter === 'All') return true;
    return project.subcategories && project.subcategories.includes(activeFilter);
  });

  return (
    <section id="projects" className="relative py-24 scroll-mt-24 overflow-hidden bg-slate-50 dark:bg-gray-900 text-slate-900 dark:text-white transition-colors duration-300">
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
              <pattern id="grid-3d-projects" width="80" height="80" patternUnits="userSpaceOnUse">
                <path d="M 80 0 L 0 0 0 80" fill="none" className="stroke-purple-600 dark:stroke-purple-500" strokeWidth="1.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid-3d-projects)" />
          </svg>
        </motion.div>
      </div>

      {/* Background Tech Blobs */}
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-purple-900/5 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-1/3 left-0 w-96 h-96 bg-blue-900/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* ── Section Header ── */}
        <div className="text-center mb-16">
          <motion.h2
            variants={headerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            className="text-4xl md:text-5xl font-black mb-4 tracking-tighter uppercase"
          >
            Featured <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">Projects</span>
          </motion.h2>
          
          <motion.div
            variants={dividerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            style={{ originX: 0.5 }}
            className="w-20 h-1 bg-gradient-to-r from-purple-600 to-pink-500 mx-auto rounded-full mb-6"
          />

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5, ease: 'easeOut', delay: 0.2 }}
            className="text-slate-600 dark:text-gray-400 text-base md:text-lg max-w-2xl mx-auto font-medium"
          >
            Projects I have designed and developed using modern technologies
          </motion.p>
        </div>

        {/* ── Filter Navigation ── */}
        <motion.div
          variants={filterContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          className="flex flex-wrap justify-center gap-3 mb-16"
        >
          {categories.map((category) => (
            <motion.button
              key={category}
              variants={filterButtonVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveFilter(category)}
              className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 select-none ${
                activeFilter === category
                  ? 'bg-gradient-to-r from-purple-600 to-pink-500 text-white shadow-lg shadow-purple-500/20'
                  : 'bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/5 text-slate-600 dark:text-gray-400 hover:bg-slate-200 dark:hover:bg-white/10 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        {/* ── Projects Grid ── */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <TiltCard
                key={project.id}
                layout
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                exit={{ opacity: 0, scale: 0.95 }}
                viewport={{ once: true, amount: 0.15 }}
                style={{ perspective: "1000px" }}
                className="group relative rounded-3xl bg-white dark:bg-gray-900/20 border border-slate-200 dark:border-white/5 backdrop-blur-xl shadow-2xl overflow-hidden hover:bg-slate-50 dark:hover:bg-gray-900/40 transition-all flex flex-col justify-between h-full"
              >
                {/* Project Image Panel */}
                <div className="relative h-48 sm:h-52 overflow-hidden">
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3.5 py-1.5 rounded-full bg-gray-950/70 border border-white/10 backdrop-blur-md text-[10px] font-bold text-purple-300 uppercase tracking-widest">
                      {project.category}
                    </span>
                  </div>
                  {/* Backdrop tint glow overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-950/90 via-gray-950/20 to-transparent"></div>
                </div>

                {/* Details Section */}
                <div className="p-6 sm:p-8 flex-grow flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mb-3 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors tracking-tight uppercase">
                      {project.title}
                    </h3>
                    <p className="text-slate-600 dark:text-gray-400 text-xs sm:text-sm leading-relaxed mb-6 font-medium">
                      {project.description}
                    </p>

                    {/* Features checklist */}
                    <div className="mb-6 space-y-2">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-purple-400">Core Features</p>
                      <ul className="space-y-1.5">
                        {project.features.map((feature, fIndex) => (
                          <motion.li
                            key={fIndex}
                            initial={{ opacity: 0, x: -12 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: 0.1 + fIndex * 0.05 }}
                            className="flex items-start text-xs text-slate-700 dark:text-gray-300 font-semibold"
                          >
                            <i className="fa-solid fa-circle-check text-purple-500/80 text-xs mt-0.5 mr-2"></i>
                            <span>{feature}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Tech stack badge list */}
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-purple-400 mb-3">Tech Stack</p>
                    <div className="flex flex-wrap gap-2 mb-8">
                      {project.techStack.map((tech, tIndex) => (
                        <motion.div
                          key={tIndex}
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ type: 'spring', stiffness: 300, damping: 15, delay: tIndex * 0.04 }}
                          whileHover={{
                            scale: 1.05,
                            borderColor: tech.colorCode,
                            boxShadow: `0 0 10px ${tech.colorCode}22`,
                            backgroundColor: `${tech.colorCode}0a`,
                            color: isDark ? '#ffffff' : '#1e1b4b',
                          }}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/5 text-[10px] font-bold text-slate-500 dark:text-gray-400 select-none cursor-default transition-colors duration-200"
                        >
                          <i
                            className={`${tech.icon}`}
                            style={{ color: tech.colorCode }}
                          ></i>
                          <span>{tech.name}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer Actions */}
                <div className="px-6 pb-6 sm:px-8 sm:pb-8 pt-0 mt-auto grid grid-cols-2 gap-4">
                  <motion.a
                    href={project.liveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    className="flex items-center justify-center gap-2 py-3 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-500 text-xs font-black text-white shadow-lg hover:shadow-purple-500/20 transition-all select-none uppercase tracking-wider"
                  >
                    <i className="fa-solid fa-circle-play"></i> Live Demo
                  </motion.a>
                  <motion.a
                    href={project.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    className="flex items-center justify-center gap-2 py-3 rounded-2xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/5 text-xs font-black text-slate-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-white/10 hover:border-slate-300 dark:hover:border-white/10 transition-all select-none uppercase tracking-wider"
                  >
                    <i className="fa-brands fa-github"></i> Repository
                  </motion.a>
                </div>
              </TiltCard>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
