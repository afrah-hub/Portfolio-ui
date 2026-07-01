import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getProjects } from '../services/api';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeFilter, setActiveFilter] = useState('All');

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await getProjects();
        setProjects(response.data);
      } catch (err) {
        console.error("Error fetching projects:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const categories = ['All', ...new Set(projects.flatMap(p => p.subcategories || []))];

  const filteredProjects = projects.filter(project => {
    if (activeFilter === 'All') return true;
    return project.subcategories && project.subcategories.includes(activeFilter);
  });

  if (loading) {
    return (
      <section id="projects" className="relative py-24 overflow-hidden bg-gray-950 text-white">
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <h2 className="text-4xl md:text-5xl font-black mb-4 tracking-tighter uppercase">
            Featured <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">Projects</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-purple-600 to-pink-500 mx-auto rounded-full mb-16"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-pulse">
            {[1, 2, 3].map((n) => (
              <div key={n} className="rounded-3xl bg-gray-900/20 border border-white/5 p-8 flex flex-col justify-between h-[500px]">
                <div className="bg-white/5 rounded-2xl h-48 w-full mb-6"></div>
                <div className="h-6 bg-white/5 rounded w-3/4 mb-4"></div>
                <div className="h-4 bg-white/5 rounded w-full mb-3"></div>
                <div className="h-4 bg-white/5 rounded w-5/6 mb-6"></div>
                <div className="h-20 bg-white/5 rounded-2xl w-full mb-6"></div>
                <div className="grid grid-cols-2 gap-4 mt-auto">
                  <div className="h-10 bg-white/5 rounded-xl"></div>
                  <div className="h-10 bg-white/5 rounded-xl"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="projects" className="relative py-24 overflow-hidden bg-gray-950 text-white">
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <h2 className="text-4xl md:text-5xl font-black mb-4 tracking-tighter uppercase">
            Featured <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">Projects</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-purple-600 to-pink-500 mx-auto rounded-full mb-16"></div>
          <div className="p-8 rounded-3xl bg-red-950/20 border border-red-500/20 text-red-400">
            <p className="font-bold">Failed to load projects</p>
            <p className="text-sm mt-2">{error.message || "Unknown error occurred"}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="projects" className="relative py-24 overflow-hidden bg-gray-950 text-white">
      {/* Background ambient radial glows */}
      <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-purple-900/5 rounded-full blur-[130px] pointer-events-none"></div>
      <div className="absolute bottom-1/3 left-1/4 w-[500px] h-[500px] bg-pink-900/5 rounded-full blur-[130px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-black mb-4 tracking-tighter uppercase">
            Featured <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">Projects</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-purple-600 to-pink-500 mx-auto rounded-full mb-6"></div>
          <p className="text-gray-400 text-base md:text-lg max-w-2xl mx-auto font-medium">
            Projects I have designed and developed using modern technologies
          </p>
        </motion.div>

        {/* Filter Navigation */}
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveFilter(category)}
              className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 select-none ${activeFilter === category
                  ? 'bg-gradient-to-r from-purple-600 to-pink-500 text-white shadow-lg shadow-purple-500/20'
                  : 'bg-white/5 border border-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
                }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="group relative rounded-3xl bg-gray-900/20 border border-white/5 backdrop-blur-xl shadow-2xl overflow-hidden hover:bg-gray-900/40 transition-colors flex flex-col justify-between h-full"
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
                    <h3 className="text-xl sm:text-2xl font-black text-white mb-3 group-hover:text-purple-400 transition-colors tracking-tight uppercase">
                      {project.title}
                    </h3>
                    <p className="text-gray-400 text-xs sm:text-sm leading-relaxed mb-6 font-medium">
                      {project.description}
                    </p>

                    {/* Features checklist */}
                    <div className="mb-6 space-y-2">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-purple-400">Core Features</p>
                      <ul className="space-y-1.5">
                        {project.features.map((feature, fIndex) => (
                          <li key={fIndex} className="flex items-start text-xs text-gray-300 font-semibold">
                            <i className="fa-solid fa-circle-check text-purple-500/80 text-xs mt-0.5 mr-2"></i>
                            <span>{feature}</span>
                          </li>
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
                          whileHover={{
                            scale: 1.05,
                            borderColor: tech.colorCode,
                            boxShadow: `0 0 10px ${tech.colorCode}22`,
                            backgroundColor: `${tech.colorCode}0a`,
                            color: '#ffffff'
                          }}
                          transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 border border-white/5 text-[10px] font-bold text-gray-400 select-none cursor-default transition-colors duration-200"
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
                  <a
                    href={project.liveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 py-3 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-500 text-xs font-black text-white shadow-lg hover:shadow-purple-500/20 active:scale-95 transition-all select-none uppercase tracking-wider"
                  >
                    <i className="fa-solid fa-circle-play"></i> Live Demo
                  </a>
                  <a
                    href={project.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 py-3 rounded-2xl bg-white/5 border border-white/5 text-xs font-black text-gray-300 hover:text-white hover:bg-white/10 hover:border-white/10 active:scale-95 transition-all select-none uppercase tracking-wider"
                  >
                    <i className="fa-brands fa-github"></i> Repository
                  </a>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
