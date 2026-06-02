import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FileCode, 
  Palette, 
  Braces, 
  Wind, 
  Atom, 
  Code
} from 'lucide-react';
import api from '../services/api';

const skillIcons = {
  'HTML': FileCode,
  'CSS': Palette,
  'JavaScript': Braces,
  'Tailwind CSS': Wind,
  'React': Atom,
  'C#': Code
};

const Skills = () => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await api.get('/skills');
        setSkills(response.data);
      } catch (error) {
        console.error('Error fetching skills:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchSkills();
  }, []);

  const getSkillLevel = (percentage) => {
    if (percentage >= 90) return "Expert";
    if (percentage >= 80) return "Advanced";
    return "Intermediate";
  };

  return (
    <section id="skills" className="py-20 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            My <span className="text-purple-600">Technical Skills</span>
          </h2>
          <div className="w-20 h-1.5 bg-purple-600 mx-auto rounded-full"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            A comprehensive overview of my technical expertise and proficiency across various domains and frameworks.
          </p>
        </motion.div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {skills.map((skill, index) => {
              const Icon = skillIcons[skill.name] || Code;
              return (
                <motion.div
                  key={skill.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  whileHover={{ y: -10 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="relative group p-8 rounded-2xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
                >
                  {/* Glassmorphic Overlay Effect on Hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-600/5 to-pink-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  {/* Background Glow */}
                  <div className="absolute -right-4 -top-4 w-24 h-24 bg-purple-600/10 rounded-full blur-3xl group-hover:bg-purple-600/20 transition-colors"></div>
                  
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-6">
                      <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-xl">
                        <Icon className="w-8 h-8 text-purple-600" />
                      </div>
                      <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300 border border-purple-200 dark:border-purple-800">
                        {getSkillLevel(skill.percentage)}
                      </span>
                    </div>

                    <h3 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white group-hover:text-purple-600 transition-colors">
                      {skill.name}
                    </h3>

                    <div className="flex justify-between items-center mb-3">
                      <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Mastery</span>
                      <span className="text-sm font-bold text-purple-600">{skill.percentage}%</span>
                    </div>

                    {/* Progress Bar Container */}
                    <div className="h-2.5 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden shadow-inner">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.percentage}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        className="h-full bg-gradient-to-r from-purple-600 via-purple-500 to-pink-500 rounded-full relative shadow-lg"
                      >
                        {/* Animated Shimmer Effect */}
                        <div className="absolute inset-0 bg-white/20 skew-x-[-20deg] animate-pulse"></div>
                      </motion.div>
                    </div>

                    <div className="mt-6 flex items-center text-xs text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors">
                      <Code className="w-3 h-3 mr-1" />
                      <span>Used in {skill.name === 'C#' ? 'Backend' : 'Frontend'} Development</span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default Skills;
