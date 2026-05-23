import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiClock, FiUsers, FiZap } from 'react-icons/fi';

const softSkills = [
  {
    icon: <FiClock />,
    title: 'Time Management',
    description: 'Prioritizing tasks effectively, meeting deadlines consistently, and balancing multiple responsibilities with organized planning.',
    color: '#38bdf8',
  },
  {
    icon: <FiUsers />,
    title: 'Team Player',
    description: 'Collaborating with cross-functional teams, communicating ideas clearly, and contributing to shared goals with a positive attitude.',
    color: '#22c55e',
  },
  {
    icon: <FiZap />,
    title: 'Problem Solving',
    description: 'Analyzing complex issues systematically, breaking down problems into manageable parts, and delivering efficient solutions.',
    color: '#fbbf24',
  },
];

export default function SoftSkills() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.15 });

  return (
    <section id="soft-skills" className="py-24 px-6">
      <div ref={ref} className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            Soft <span className="text-[#38bdf8]">Skills</span>
          </h2>
          <div className="w-20 h-1 bg-[#38bdf8] mx-auto rounded-full mb-12" />

          <div className="grid md:grid-cols-3 gap-6">
            {softSkills.map((skill, i) => (
              <motion.div
                key={skill.title}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.15 + i * 0.15 }}
                className="group bg-[#e2e8f0] dark:bg-[#1e293b] border border-[#cbd5e1] dark:border-[#334155] rounded-xl p-6 text-center hover:border-[#38bdf8]/40 hover:-translate-y-1 transition-all duration-300"
              >
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-4 text-2xl transition-transform duration-300 group-hover:scale-110"
                  style={{ backgroundColor: skill.color + '15', color: skill.color }}
                >
                  {skill.icon}
                </div>
                <h3 className="text-lg font-bold text-[#1e293b] dark:text-[#f8fafc] mb-2 group-hover:text-[#38bdf8] transition-colors">
                  {skill.title}
                </h3>
                <p className="text-sm text-[#64748b] dark:text-[#94a3b8] leading-relaxed">
                  {skill.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
