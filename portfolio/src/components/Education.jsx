import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiBook, FiCalendar, FiMapPin, FiAward } from 'react-icons/fi';

const education = [
  {
    degree: 'B.E. in Electronics and Communication Engineering',
    institution: 'Anna University — BIT Campus',
    location: 'Tiruchirappalli, Tamil Nadu',
    period: '2020 – 2024',
    grade: 'CGPA: 8.26 / 10',
    icon: '🎓',
    color: '#38bdf8',
    highlights: ['First Class with Distinction', 'Core Java', 'Embedded Systems', 'IoT Projects'],
  },
  {
    degree: 'Higher Secondary (HSC)',
    institution: 'Government Higher Secondary School',
    location: 'Tamil Nadu',
    period: '2018 – 2020',
    grade: '',
    icon: '📚',
    color: '#22c55e',
    highlights: ['Mathematics', 'Physics', 'Computer Science'],
  },
  {
    degree: 'Secondary School (SSLC)',
    institution: 'Government High School',
    location: 'Tamil Nadu',
    period: '2018',
    grade: '',
    icon: '🏫',
    color: '#fbbf24',
    highlights: ['First Class with Distinction — Typewriting English'],
  },
];

export default function Education() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="education" className="py-24 px-6">
      <div ref={ref} className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            My <span className="text-[#38bdf8]">Education</span>
          </h2>
          <div className="w-20 h-1 bg-[#38bdf8] mx-auto rounded-full mb-12" />

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-4 md:left-6 top-0 bottom-0 w-0.5 bg-[#cbd5e1] dark:bg-[#334155]" />

            <div className="space-y-10">
              {education.map((edu, i) => (
                <motion.div
                  key={edu.degree}
                  initial={{ opacity: 0, x: -30 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.2 + i * 0.15 }}
                  className="relative pl-12 md:pl-16"
                >
                  {/* Timeline dot */}
                  <div
                    className="absolute left-2 md:left-3.5 top-1 w-5 h-5 rounded-full border-4 border-[#f0f4f8] dark:border-[#0f172a] z-10 flex items-center justify-center text-[10px]"
                    style={{ backgroundColor: edu.color }}
                  />

                  <div className="bg-[#e2e8f0] dark:bg-[#1e293b] border border-[#cbd5e1] dark:border-[#334155] rounded-xl p-5 hover:border-[#38bdf8]/40 transition-all duration-300">
                    <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xl">{edu.icon}</span>
                          <h3 className="text-lg font-bold text-[#1e293b] dark:text-[#f8fafc]">{edu.degree}</h3>
                        </div>
                        <p className="text-sm text-[#38bdf8] font-medium mt-0.5">{edu.institution}</p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-4 text-xs text-[#64748b] dark:text-[#94a3b8] mb-3">
                      <span className="flex items-center gap-1">
                        <FiCalendar className="text-[#38bdf8]" /> {edu.period}
                      </span>
                      <span className="flex items-center gap-1">
                        <FiMapPin className="text-[#38bdf8]" /> {edu.location}
                      </span>
                      {edu.grade && (
                        <span className="flex items-center gap-1">
                          <FiAward className="text-[#38bdf8]" /> {edu.grade}
                        </span>
                      )}
                    </div>

                    {edu.highlights && edu.highlights.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {edu.highlights.map((h) => (
                          <span
                            key={h}
                            className="text-[10px] border rounded-full px-2.5 py-0.5"
                            style={{ borderColor: edu.color + '40', color: edu.color, backgroundColor: edu.color + '10' }}
                          >
                            {h}
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
