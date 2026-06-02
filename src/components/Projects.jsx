import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Code, Database, Layout } from 'lucide-react';
import { getProjects } from '../services/api';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await getProjects();
        setProjects(response.data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  return (
    <section id="projects" className="py-20 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="container mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            Featured <span className="text-purple-600">Projects</span>
          </h2>
          <div className="w-20 h-1.5 bg-purple-600 mx-auto rounded-full"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            A selection of my recent works, including web applications and UI clones.
          </p>
        </motion.div>

        {loading ? (
          <div className="flex justify-center py-20">
             <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {projects.map((project, index) => (
              <motion.div
                key={project.id || index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -10 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative group bg-white dark:bg-gray-800 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl border border-gray-100 dark:border-gray-700 transition-all duration-500 flex flex-col h-full"
              >
                {/* Project Image Overlay */}
                <div className="relative h-56 overflow-hidden">
                  <img 
                    src={project.imageUrl || "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80"} 
                    alt={project.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                    <div className="flex gap-4">
                      {project.githubLink && (
                        <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="p-2 bg-white/10 border border-white/10 rounded-full hover:bg-purple-500/20 hover:border-purple-500/50 transition-all duration-300">
                          <i className="fa-brands fa-github text-white text-sm"></i>
                        </a>
                      )}
                      {project.liveLink && (
                        <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="p-2 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/40 transition-colors">
                          <ExternalLink size={20} />
                        </a>
                      )}
                    </div>
                  </div>
                </div>

                <div className="p-8 flex-grow">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="p-1.5 bg-purple-100 dark:bg-purple-900/30 rounded-lg text-purple-600 dark:text-purple-400">
                      {project.title.includes('API') || project.title.includes('server') ? <Database size={16} /> : <Layout size={16} />}
                    </span>
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                      {project.title.includes('Clone') ? 'Web Architecture' : 'Full Stack Development'}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white group-hover:text-purple-600 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-6 line-clamp-3">
                    {project.description}
                  </p>
                </div>

                <div className="px-8 pb-8 flex items-center justify-between mt-auto">
                    <a 
                      href={project.githubLink} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-sm font-bold text-gray-900 dark:text-white flex items-center gap-2 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                    >
                      <Code size={18} /> View Code
                    </a>
                    <div className="h-px flex-grow mx-4 bg-gray-100 dark:bg-gray-700"></div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;
