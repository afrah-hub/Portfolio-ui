import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

const skillCategories = [
  {
    title: 'Frontend Development',
    description: 'Building interactive, user-friendly, and responsive user interfaces.',
    icon: 'fa-solid fa-desktop',
    gradient: 'from-purple-600/20 to-pink-500/20',
    borderColor: 'group-hover:border-purple-500/30',
    glowColor: 'rgba(147, 51, 234, 0.15)',
    skills: [
      { name: 'HTML5', icon: 'fa-brands fa-html5', colorCode: '#e34f26' },
      { name: 'CSS3', icon: 'fa-brands fa-css3-alt', colorCode: '#1572b6' },
      { name: 'JavaScript (ES6+)', icon: 'fa-brands fa-js', colorCode: '#f7df1e' },
      { name: 'React.js', icon: 'fa-brands fa-react', colorCode: '#61dafb' },
      { name: 'JSX', icon: 'fa-solid fa-code', colorCode: '#00d8ff' },
      { name: 'Component Architecture', icon: 'fa-solid fa-cubes', colorCode: '#a855f7' },
      { name: 'Responsive Web Design', icon: 'fa-solid fa-mobile-screen-button', colorCode: '#10b981' },
      { name: 'Bootstrap', icon: 'fa-brands fa-bootstrap', colorCode: '#7952b3' },
    ],
  },
  {
    title: 'Backend Development',
    description: 'Developing high-performance APIs and robust business logic.',
    icon: 'fa-solid fa-gears',
    gradient: 'from-violet-600/20 to-indigo-500/20',
    borderColor: 'group-hover:border-violet-500/30',
    glowColor: 'rgba(124, 58, 237, 0.15)',
    skills: [
      { name: 'C#', icon: 'fa-solid fa-hashtag', colorCode: '#a270ff' },
      { name: 'ASP.NET Core Web API', icon: 'fa-solid fa-network-wired', colorCode: '#512bd4' },
      { name: '.NET', icon: 'fa-solid fa-cubes-split', colorCode: '#512bd4' },
      { name: 'Entity Framework Core', icon: 'fa-solid fa-circle-nodes', colorCode: '#ec4899' },
      { name: 'Dapper', icon: 'fa-solid fa-bolt', colorCode: '#f59e0b' },
      { name: 'REST API Development', icon: 'fa-solid fa-cloud-arrow-up', colorCode: '#06b6d4' },
      { name: 'API Auth & Auth', icon: 'fa-solid fa-shield-halved', colorCode: '#14b8a6' },
      { name: 'JWT Authentication', icon: 'fa-solid fa-key', colorCode: '#d97706' },
    ],
  },
  {
    title: 'Database & Storage',
    description: 'Designing data schemas and managing query stores.',
    icon: 'fa-solid fa-database',
    gradient: 'from-blue-600/20 to-cyan-500/20',
    borderColor: 'group-hover:border-blue-500/30',
    glowColor: 'rgba(59, 130, 246, 0.15)',
    skills: [
      { name: 'Microsoft SQL Server', icon: 'fa-solid fa-database', colorCode: '#cc292b' },
      { name: 'SQL Queries', icon: 'fa-solid fa-terminal', colorCode: '#3b82f6' },
      { name: 'Database Design', icon: 'fa-solid fa-sitemap', colorCode: '#10b981' },
      { name: 'CRUD Operations', icon: 'fa-solid fa-floppy-disk', colorCode: '#f59e0b' },
      { name: 'Entity Relationships', icon: 'fa-solid fa-chart-simple', colorCode: '#6366f1' },
    ],
  },
  {
    title: 'Cloud & DevOps',
    description: 'Containerizing services and deploying cloud-hosted systems.',
    icon: 'fa-solid fa-cloud',
    gradient: 'from-sky-600/20 to-blue-500/20',
    borderColor: 'group-hover:border-sky-500/30',
    glowColor: 'rgba(14, 165, 233, 0.15)',
    skills: [
      { name: 'Docker', icon: 'fa-brands fa-docker', colorCode: '#2496ed' },
      { name: 'Microsoft Azure', icon: 'fa-brands fa-microsoft', colorCode: '#0078d4' },
      { name: 'AWS', icon: 'fa-brands fa-aws', colorCode: '#ff9900' },
      { name: 'Cloud Deployment', icon: 'fa-solid fa-cloud-arrow-up', colorCode: '#0ea5e9' },
      { name: 'Containerization', icon: 'fa-solid fa-box-archive', colorCode: '#d97706' },
    ],
  },
  {
    title: 'Tools & Platforms',
    description: 'Configuring professional toolchains and version workflows.',
    icon: 'fa-solid fa-screwdriver-wrench',
    gradient: 'from-rose-600/20 to-orange-500/20',
    borderColor: 'group-hover:border-rose-500/30',
    glowColor: 'rgba(244, 63, 94, 0.15)',
    skills: [
      { name: 'VS Code', icon: 'fa-solid fa-laptop-code', colorCode: '#007acc' },
      { name: 'Visual Studio', icon: 'fa-solid fa-code-compare', colorCode: '#c738e3' },
      { name: 'Git', icon: 'fa-brands fa-git-alt', colorCode: '#f05032' },
      { name: 'GitHub', icon: 'fa-brands fa-github', colorCode: '#e5e7eb' },
      { name: 'Postman', icon: 'fa-solid fa-paper-plane', colorCode: '#ff6c37' },
      { name: 'Swagger / OpenAPI', icon: 'fa-solid fa-book', colorCode: '#85ea2d' },
      { name: 'Trello', icon: 'fa-brands fa-trello', colorCode: '#0079bf' },
      { name: 'Figma', icon: 'fa-brands fa-figma', colorCode: '#f24e1e' },
    ],
  },
  {
    title: 'Development Concepts',
    description: 'Adhering to standard software architectures and practices.',
    icon: 'fa-solid fa-brain',
    gradient: 'from-emerald-600/20 to-teal-500/20',
    borderColor: 'group-hover:border-emerald-500/30',
    glowColor: 'rgba(16, 185, 129, 0.15)',
    skills: [
      { name: 'OOP', icon: 'fa-solid fa-circle-dot', colorCode: '#f97316' },
      { name: 'MVC Architecture', icon: 'fa-solid fa-network-wired', colorCode: '#10b981' },
      { name: 'API Integration', icon: 'fa-solid fa-link', colorCode: '#3b82f6' },
      { name: 'Debugging', icon: 'fa-solid fa-bug-slash', colorCode: '#ef4444' },
      { name: 'Version Control (Git)', icon: 'fa-solid fa-code-branch', colorCode: '#eab308' },
    ],
  },
];

const Skills = () => {
  const { isDark } = useTheme();

  return (
    <section id="skills" className="relative py-24 scroll-mt-24 overflow-hidden bg-white dark:bg-gray-900 text-slate-900 dark:text-white transition-colors duration-300">
      {/* Background soft glowing tech blobs */}
      <div className="absolute top-1/4 left-1/4 w-[450px] h-[450px] bg-purple-900/5 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[450px] h-[450px] bg-blue-900/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* ── Section Heading ── */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: -24, scale: 0.96 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl md:text-5xl font-black mb-4 tracking-tighter uppercase"
          >
            Technical <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">Skills</span>
          </motion.h2>

          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            whileInView={{ scaleX: 1, opacity: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            style={{ originX: 0.5 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
            className="w-20 h-1 bg-gradient-to-r from-purple-600 to-pink-500 mx-auto rounded-full mb-6"
          />

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5, ease: 'easeOut', delay: 0.2 }}
            className="text-slate-600 dark:text-gray-400 text-base md:text-lg max-w-2xl mx-auto font-medium"
          >
            Technologies and tools I use to build scalable applications
          </motion.p>
        </div>

        {/* ── Categories Grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 35, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: (index % 3) * 0.08 }}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className="group relative p-8 rounded-3xl bg-slate-50 dark:bg-gray-900/20 border border-slate-200 dark:border-white/5 backdrop-blur-xl transition-all duration-300 shadow-2xl hover:bg-slate-100/50 dark:hover:bg-gray-900/40 flex flex-col justify-between"
            >
              {/* Subtle Glowing Aura */}
              <div
                className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none blur-xl"
                style={{
                  background: `radial-gradient(circle at 50% 10%, ${category.glowColor} 0%, transparent 60%)`,
                }}
              ></div>

              <div>
                {/* Category Header */}
                <div className="flex items-center gap-4 mb-6">
                  <motion.div
                    initial={{ scale: 0, rotate: -30 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    viewport={{ once: true }}
                    transition={{ type: 'spring', stiffness: 280, damping: 18, delay: (index % 3) * 0.08 + 0.1 }}
                    className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${category.gradient} border border-white/10 flex items-center justify-center shadow-lg`}
                  >
                    <i className={`${category.icon} text-lg text-white`}></i>
                  </motion.div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight uppercase group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                      {category.title}
                    </h3>
                  </div>
                </div>

                <p className="text-slate-600 dark:text-gray-400 text-xs mb-8 leading-relaxed font-medium">
                  {category.description}
                </p>

                {/* Brand-Colored Tactile Chips */}
                <div className="flex flex-wrap gap-3">
                  {category.skills.map((skill, sIndex) => (
                    <motion.div
                      key={sIndex}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{
                        type: 'spring',
                        stiffness: 300,
                        damping: 16,
                        delay: (index % 3) * 0.08 + 0.15 + sIndex * 0.03,
                      }}
                      whileHover={{
                        scale: 1.05,
                        borderColor: skill.colorCode,
                        boxShadow: `0 0 15px ${skill.colorCode}22`,
                        backgroundColor: `${skill.colorCode}0a`,
                        color: isDark ? '#ffffff' : '#1e1b4b',
                      }}
                      className="flex items-center gap-2.5 px-3.5 py-2 rounded-2xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/5 cursor-default transition-all text-slate-700 dark:text-gray-300 duration-200 select-none"
                    >
                      <i
                        className={`${skill.icon} text-sm`}
                        style={{ color: skill.colorCode }}
                      ></i>
                      <span className="text-xs font-semibold">
                        {skill.name}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
