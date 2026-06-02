import { motion } from 'framer-motion';
import { Briefcase, GraduationCap, Rocket, Code, Layout, Lightbulb, CheckCircle } from 'lucide-react';

const About = () => {
  const stats = [
    { label: 'Projects Built', value: '3+' },
    { label: 'Tech Stack', value: 'React | .NET | SQL' },
    { label: 'Focus', value: 'Scalable Web Apps' },
  ];

  const featureCards = [
    {
      title: 'Full Stack Expertise',
      description: 'Designing and developing complete web solutions from frontend interfaces to backend APIs using React and .NET.',
      icon: <Rocket className="text-purple-400" size={24} />,
      color: 'purple'
    },
    {
      title: 'User-Centric Design',
      description: 'Creating responsive and intuitive user experiences with a focus on usability and performance.',
      icon: <Layout className="text-pink-400" size={24} />,
      color: 'pink'
    },
    {
      title: 'Problem Solving',
      description: 'Applying analytical thinking and technical skills to solve real-world problems through efficient software solutions.',
      icon: <Lightbulb className="text-purple-400" size={24} />,
      color: 'purple'
    }
  ];

  return (
    <section id="about" className="relative py-24 overflow-hidden bg-gray-50 dark:bg-[#030014]">
      {/* Background Blobs */}
      <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-600/10 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
      <div className="absolute top-0 -right-4 w-72 h-72 bg-pink-500/10 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl font-black mb-4 tracking-tighter text-gray-900 dark:text-white">
            ABOUT <span className="gradient-text">ME</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-600 to-pink-500 mx-auto rounded-full"></div>
        </motion.div>

        <div className="grid lg:grid-cols-[1.2fr_1fr] gap-16 items-start">
          {/* LEFT SIDE: Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="space-y-6">
              <h3 className="text-4xl font-bold text-gray-900 dark:text-white leading-tight">
                I'm <span className="text-purple-500">Afrah Kabeer</span>, Full Stack Developer crafting modern web applications.
              </h3>
              <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed max-w-2xl font-medium">
                I specialize in building high-performance, full-stack applications that seamlessly bridge the gap between design and scalable engineering. 
                With deep expertise in <span className="text-purple-500 font-bold">React</span> and <span className="text-pink-500 font-bold">Tailwind CSS</span> for the frontend, 
                and <span className="text-purple-400 font-bold">ASP.NET Core (.NET)</span> with <span className="text-pink-400 font-bold">SQL</span> for the backend, 
                I focus on delivering robust digital solutions that are both technically sound and user-centric.
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed max-w-2xl font-medium">
                My approach is rooted in clean code, architectural integrity, and scalability. Leveraging my background in 
                <span className="text-purple-400 font-bold"> Commerce with Computer Application</span>, 
                I bring a strategic, analytical perspective to software development, ensuring every line of code solves a real-world problem effectively.
              </p>
            </div>

            {/* Info Badges */}
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-purple-500/15 border border-purple-500/30 shadow-lg">
                <Rocket size={18} className="text-purple-300" />
                <span className="text-sm font-bold text-white tracking-wide">Role: Full Stack Developer</span>
              </div>
              <div className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-pink-500/15 border border-pink-500/30 shadow-lg">
                <GraduationCap size={18} className="text-pink-300" />
                <span className="text-sm font-bold text-white tracking-wide">Background: Commerce</span>
              </div>
            </div>

            {/* Mini Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-10 border-t border-white/10">
              {stats.map((stat, i) => (
                <div key={i} className="group cursor-default">
                  <h4 className="text-2xl font-black text-white group-hover:text-purple-400 transition-colors uppercase tracking-tighter">{stat.value}</h4>
                  <p className="text-[11px] uppercase tracking-[0.2em] text-gray-500 font-black mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* RIGHT SIDE: Philosophy & Cards */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-12"
          >
            <div>
              <h4 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">My Philosophy</h4>
              <div className="relative p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm overflow-hidden group shadow-2xl">
                <div className="absolute top-0 right-0 w-32 h-32 bg-purple-600/10 rounded-full blur-3xl group-hover:bg-purple-600/20 transition-colors duration-500"></div>
                <p className="text-xl text-gray-700 dark:text-gray-200 leading-relaxed italic font-semibold relative z-10">
                  "I build software that is not only functional but also scalable, maintainable, and user-focused."
                </p>
              </div>
            </div>

            {/* Feature Cards */}
            <div className="space-y-6">
              {featureCards.map((card, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.02, x: 10 }}
                  className="group relative p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-purple-500/40 transition-all duration-300 shadow-xl overflow-hidden"
                >
                   {/* Card Glow Effect */}
                  <div className={`absolute -right-4 -top-4 w-32 h-32 bg-${card.color}-500/5 rounded-full blur-3xl group-hover:bg-${card.color}-500/15 transition-colors duration-500`}></div>
                  
                  <div className="flex gap-6 relative z-10">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center border border-white/10 group-hover:border-${card.color}-500/30 transition-all duration-500 shadow-inner`}>
                      <div className="group-hover:scale-110 transition-transform duration-500">
                        {card.icon}
                      </div>
                    </div>
                    <div className="flex-1">
                      <h5 className="text-lg font-bold text-white mb-2 uppercase tracking-tighter group-hover:text-purple-400 transition-colors">{card.title}</h5>
                      <p className="text-gray-100 text-sm leading-relaxed font-medium opacity-90 group-hover:opacity-100 transition-opacity whitespace-pre-line">{card.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
