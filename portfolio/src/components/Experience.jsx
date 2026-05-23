import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiBriefcase, FiCalendar, FiMapPin } from 'react-icons/fi';

const experiences = [
  {
    role: 'Software Engineer',
    company: 'Neurealm (formerly GS Lab — GAVS)',
    location: 'Chennai, TN',
    period: 'Mar 2025 – Present',
    type: 'Full-time',
    logo: null,
    abbr: 'NR',
    abbrColor: '#38bdf8',
    project: 'Athenahealth – Rules 2.0 Migration',
    points: [
      'Modernized legacy Perl application by migrating to Java using Core Java Collection Framework (List, Map, Set) and Stream API.',
      'Implemented efficient data processing logic using Streams for filtering, mapping, and flatMapping operations.',
      'Achieved over 95% test coverage with comprehensive unit testing strategy for the migrated codebase.',
      'Managed Bitbucket (Git) pull requests for code reviews and branch merging, ensuring seamless team collaboration.',
      'Conducted rigorous post-migration testing to verify accuracy and system reliability.',
      'Performed root cause analysis of defects, providing actionable insights for faster issue resolution.',
    ],
    skills: ['Java', 'Spring Boot', 'Stream API', 'Bitbucket', 'Unit Testing'],
  },
  {
    role: 'Embedded System Engineer',
    company: 'Emertxe Information Technologies',
    location: 'Remote',
    period: 'Aug 2023 – Oct 2023',
    type: 'Internship · 3 mos',
    logo: '/logos/emertxe.png',
    abbr: 'EIT',
    abbrColor: '#f97316',
    project: 'Microwave Oven Simulation',
    points: [
      'Gained extensive knowledge in C language, microcontrollers, and embedded systems during the internship.',
      'Successfully executed a project simulating a microwave oven using MPLABX IDE and XC8 compiler.',
      'Conducted simulations on PICSim Lab platform, validating embedded logic and peripheral control.',
      'Strengthened understanding of real-time embedded software design principles.',
    ],
    skills: ['Embedded Systems', 'C Language', 'Microcontrollers', 'MPLABX IDE', 'PICSim Lab'],
  },
  {
    role: 'Java Developer Intern',
    company: 'Coding Raja Technologies',
    location: 'Remote',
    period: 'Sep 2023 – Sep 2023',
    type: 'Internship',
    logo: null,
    abbr: 'CRT',
    abbrColor: '#22c55e',
    project: 'Online Banking System',
    points: [
      'Developed a project on an online banking system using Core Java.',
      'Applied theoretical knowledge practically, enhancing software development skills.',
    ],
    skills: ['Java', 'Core Java', 'OOP'],
  },
];

export default function Experience() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="experience" className="py-24 px-6 bg-[#e8edf2] dark:bg-[#0b1120] transition-colors duration-300">
      <div ref={ref} className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            Work <span className="text-[#38bdf8]">Experience</span>
          </h2>
          <div className="w-20 h-1 bg-[#38bdf8] mx-auto rounded-full mb-12" />

          {/* Timeline */}
          <div className="relative">
            {/* Vertical Line */}
            <div className="absolute left-4 md:left-6 top-0 bottom-0 w-0.5 bg-[#cbd5e1] dark:bg-[#334155]" />

            <div className="space-y-12">
              {experiences.map((exp, i) => (
                <motion.div
                  key={exp.company + exp.role}
                  initial={{ opacity: 0, x: -30 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.2 + i * 0.2 }}
                  className="relative pl-12 md:pl-16"
                >
                  {/* Timeline Dot */}
                  <div className="absolute left-2.5 md:left-4.5 top-1 w-4 h-4 rounded-full bg-[#38bdf8] border-4 border-[#e8edf2] dark:border-[#0b1120] z-10" />

                  <div className="bg-[#f0f4f8] dark:bg-[#1e293b] border border-[#cbd5e1] dark:border-[#334155] rounded-xl p-6 hover:border-[#38bdf8]/40 transition-colors duration-300">
                    <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                      <div className="flex items-start gap-3">
                        {/* Company Logo / Abbr Badge */}
                        {exp.logo ? (
                          <img
                            src={exp.logo}
                            alt={exp.company}
                            className="w-12 h-12 rounded-lg object-contain border border-[#cbd5e1] dark:border-[#334155] bg-white p-1 shrink-0"
                            onError={(e) => {
                              e.target.style.display = 'none';
                              e.target.nextSibling.style.display = 'flex';
                            }}
                          />
                        ) : null}
                        <div
                          className="w-12 h-12 rounded-lg flex items-center justify-center text-xs font-bold shrink-0"
                          style={{
                            backgroundColor: `${exp.abbrColor}18`,
                            color: exp.abbrColor,
                            display: exp.logo ? 'none' : 'flex',
                          }}
                        >
                          {exp.abbr}
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-[#1e293b] dark:text-[#f8fafc]">{exp.role}</h3>
                          <p className="text-[#38bdf8] font-medium">{exp.company}</p>
                          {exp.type && (
                            <span className="text-[10px] text-[#64748b] dark:text-[#94a3b8]">{exp.type}</span>
                          )}
                        </div>
                      </div>
                      <div className="text-right text-sm text-[#64748b] dark:text-[#94a3b8]">
                        <div className="flex items-center gap-1.5 justify-end">
                          <FiCalendar className="text-[#38bdf8]" /> {exp.period}
                        </div>
                        <div className="flex items-center gap-1.5 mt-1 justify-end">
                          <FiMapPin className="text-[#38bdf8]" /> {exp.location}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 mb-4">
                      <FiBriefcase className="text-[#38bdf8] text-sm" />
                      <span className="text-sm text-[#64748b] dark:text-[#94a3b8] italic">{exp.project}</span>
                    </div>

                    <ul className="space-y-2 mb-4">
                      {exp.points.map((point, j) => (
                        <li key={j} className="flex items-start gap-2 text-[#64748b] dark:text-[#94a3b8] text-sm leading-relaxed">
                          <span className="text-[#38bdf8] mt-1.5 shrink-0">▹</span>
                          {point}
                        </li>
                      ))}
                    </ul>

                    {exp.skills && exp.skills.length > 0 && (
                      <div className="flex flex-wrap gap-2 pt-3 border-t border-[#cbd5e1]/50 dark:border-[#334155]/50">
                        {exp.skills.map((skill) => (
                          <span
                            key={skill}
                            className="text-[11px] bg-[#38bdf8]/10 text-[#38bdf8] border border-[#38bdf8]/20 rounded-full px-2.5 py-0.5"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
