import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiAward, FiBookOpen, FiStar } from 'react-icons/fi';

const achievements = [
  {
    icon: <FiBookOpen />,
    title: 'Research Publication — IJNRD',
    description:
      'Published a research paper on "Secure Healthcare Communication using ECDH Key Exchange and AES Encryption" in the International Journal of Novel Research and Development (IJNRD).',
    type: 'Publication',
    color: '#c084fc',
  },
  {
    icon: <FiAward />,
    title: 'First Class with Distinction — Typewriting',
    description:
      'Achieved First Class with Distinction in Junior Grade Typewriting English examination (2018).',
    type: 'Certification',
    color: '#fbbf24',
  },
  {
    icon: <FiStar />,
    title: 'NPTEL Elite Certification — Programming in Java (84%)',
    description:
      'Achieved Elite certification with 84% consolidated score from IIT Kharagpur. Perfect scores in online (25/25) and programming assignments (25/25), with 34.25/50 in proctored exam.',
    type: 'Elite Certification',
    color: '#38bdf8',
  },
  {
    icon: <FiAward />,
    title: 'NSS Camp Volunteer',
    description:
      'Participated as a volunteer in the NSS Special Camp, contributing to community service activities including environmental awareness drives and rural development initiatives.',
    type: 'Volunteering',
    color: '#22c55e',
  },
];

export default function Achievements() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="achievements" className="py-24 px-6 bg-[#e8edf2] dark:bg-[#0b1120] transition-colors duration-300">
      <div ref={ref} className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            Achievements & <span className="text-[#38bdf8]">Awards</span>
          </h2>
          <div className="w-20 h-1 bg-[#38bdf8] mx-auto rounded-full mb-12" />

          <div className="grid md:grid-cols-2 gap-6">
            {achievements.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 25 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
                className="group relative bg-[#f0f4f8] dark:bg-[#1e293b]/60 border border-[#cbd5e1] dark:border-[#334155] rounded-xl p-6 hover:border-[#38bdf8]/40 hover:-translate-y-1 transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div
                    className="w-12 h-12 rounded-lg flex items-center justify-center text-xl shrink-0"
                    style={{ backgroundColor: `${item.color}15`, color: item.color }}
                  >
                    {item.icon}
                  </div>
                  <div>
                    <span
                      className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full mb-2 inline-block"
                      style={{ backgroundColor: `${item.color}15`, color: item.color }}
                    >
                      {item.type}
                    </span>
                    <h3 className="text-base font-bold text-[#1e293b] dark:text-[#f8fafc] mt-1 group-hover:text-[#38bdf8] transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-[#64748b] dark:text-[#94a3b8] text-sm leading-relaxed mt-2">
                      {item.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
