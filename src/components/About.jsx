import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const About = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const fadeUpVariants = {
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
      {/* Background Soft Purple Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-purple-900/5 rounded-full filter blur-[100px] pointer-events-none"></div>

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
              <div className="flex flex-wrap gap-2.5">
                {techTags.map((tech, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1.5 rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/5 text-slate-700 dark:text-gray-300 text-xs font-semibold tracking-wide hover:border-purple-500/20 hover:bg-purple-500/5 transition-all duration-300 cursor-default select-none"
                  >
                    {tech}
                  </span>
                ))}
              </div>
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
            className="lg:col-span-5 w-full max-w-md mx-auto"
          >
            <div className="bg-white/80 dark:bg-slate-950/40 backdrop-blur-md border border-slate-200 dark:border-white/5 rounded-[20px] p-6 md:p-8 flex flex-col gap-6 relative overflow-hidden group shadow-[0_0_40px_rgba(147,51,234,0.04)] dark:shadow-[0_0_40px_rgba(147,51,234,0.08)] hover:shadow-[0_0_50px_rgba(147,51,234,0.12)] dark:hover:shadow-[0_0_50px_rgba(147,51,234,0.18)] transition-all duration-500">
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
                <div>
                  <span className="text-purple-400">const</span>{' '}
                  <span className="text-blue-400">developer</span> = &#123;
                </div>
                <div className="pl-4">
                  <span className="text-sky-300">role</span>: <span className="text-emerald-400">"Full Stack Developer"</span>,
                </div>
                <div className="pl-4">
                  <span className="text-sky-300">frontend</span>: <span className="text-emerald-400">"React"</span>,
                </div>
                <div className="pl-4">
                  <span className="text-sky-300">backend</span>: <span className="text-emerald-400">".NET"</span>,
                </div>
                <div className="pl-4">
                  <span className="text-sky-300">database</span>: <span className="text-emerald-400">"SQL"</span>
                </div>
                <div>&#125;</div>
              </div>

              <div className="w-full border-t border-slate-200 dark:border-white/5"></div>

              {/* Feature Cards block */}
              <div className="w-full flex flex-col gap-3">
                {featureCards.map((card, idx) => (
                  <div 
                    key={idx}
                    className="p-4 rounded-xl bg-slate-100/50 dark:bg-white/5 border border-slate-200 dark:border-white/5 hover:border-purple-500/25 hover:bg-purple-500/5 transition-all duration-300 group/card flex items-center gap-4"
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
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
