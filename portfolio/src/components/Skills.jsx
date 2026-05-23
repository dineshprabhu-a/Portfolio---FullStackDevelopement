import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  FiServer, FiDatabase, FiCloud, FiTool,
} from 'react-icons/fi';

const categories = [
  {
    title: 'Backend',
    icon: <FiServer />,
    skills: [
      { name: 'Java', level: 90 },
      { name: 'Spring Boot', level: 85 },
      { name: 'Spring MVC', level: 80 },
      { name: 'Hibernate', level: 78 },
      { name: 'REST API', level: 88 },
      { name: 'Servlet', level: 70 },
      { name: 'JDBC', level: 75 },
    ],
  },
  {
    title: 'Database',
    icon: <FiDatabase />,
    skills: [
      { name: 'MySQL', level: 85 },
      { name: 'PostgreSQL', level: 75 },
      { name: 'Oracle', level: 65 },
      { name: 'SQL', level: 88 },
    ],
  },
  {
    title: 'DevOps & Cloud',
    icon: <FiCloud />,
    skills: [
      { name: 'Docker', level: 70 },
      { name: 'Git', level: 85 },
      { name: 'GitHub', level: 90 },
      { name: 'Bitbucket', level: 65 },
      { name: 'AWS Basics', level: 55 },
    ],
  },
  {
    title: 'Tools & Others',
    icon: <FiTool />,
    skills: [
      { name: 'IntelliJ IDEA', level: 88 },
      { name: 'VS Code', level: 85 },
      { name: 'Postman', level: 90 },
      { name: 'Jira', level: 70 },
      { name: 'JavaScript', level: 65 },
      { name: 'HTML/CSS', level: 72 },
    ],
  },
];

export default function Skills() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.15 });

  return (
    <section id="skills" className="py-24 px-6 bg-[#e8edf2] dark:bg-[#0b1120] transition-colors duration-300">
      <div ref={ref} className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            Tech <span className="text-[#38bdf8]">Stack</span>
          </h2>
          <div className="w-20 h-1 bg-[#38bdf8] mx-auto rounded-full mb-12" />

          <div className="grid sm:grid-cols-2 gap-6">
            {categories.map((cat, i) => (
              <motion.div
                key={cat.title}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
                className="group bg-[#f0f4f8] dark:bg-[#1e293b] border border-[#cbd5e1] dark:border-[#334155] rounded-xl p-6 hover:border-[#38bdf8]/50 hover:shadow-[0_0_30px_rgba(56,189,248,0.08)] transition-all duration-300"
              >
                <div className="text-[#38bdf8] text-2xl mb-5 flex items-center gap-3">
                  {cat.icon}
                  <h3 className="text-[#1e293b] dark:text-[#f8fafc] text-lg font-semibold">{cat.title}</h3>
                </div>
                <div className="space-y-3">
                  {cat.skills.map((skill, j) => (
                    <div key={skill.name}>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-[#1e293b] dark:text-[#f8fafc] font-medium">{skill.name}</span>
                        <span className="text-[#64748b] dark:text-[#94a3b8]">{skill.level}%</span>
                      </div>
                      <div className="w-full h-2 bg-[#e2e8f0] dark:bg-[#0f172a] rounded-full overflow-hidden">
                        <motion.div
                          className="h-full rounded-full bg-gradient-to-r from-[#38bdf8] to-[#818cf8]"
                          initial={{ width: 0 }}
                          animate={inView ? { width: `${skill.level}%` } : { width: 0 }}
                          transition={{ duration: 1, delay: 0.2 + i * 0.1 + j * 0.05, ease: 'easeOut' }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
