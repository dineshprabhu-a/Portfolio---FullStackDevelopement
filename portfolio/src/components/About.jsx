import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiServer, FiDatabase, FiCode } from 'react-icons/fi';

const highlights = [
  { icon: <FiServer className="text-2xl" />, title: 'Backend Systems', desc: 'Designing robust server-side architectures with Spring Boot' },
  { icon: <FiDatabase className="text-2xl" />, title: 'Database Design', desc: 'Efficient data modeling with MySQL & PostgreSQL' },
  { icon: <FiCode className="text-2xl" />, title: 'Clean Code', desc: 'Writing maintainable, well-tested Java applications' },
];

export default function About() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section id="about" className="py-24 px-6">
      <div ref={ref} className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            About <span className="text-[#38bdf8]">Me</span>
          </h2>
          <div className="w-20 h-1 bg-[#38bdf8] mx-auto rounded-full mb-12" />

          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* Text */}
            <div>
              <p className="text-[#64748b] dark:text-[#94a3b8] leading-relaxed text-lg mb-6">
                I'm <span className="text-[#1e293b] dark:text-[#f8fafc] font-semibold">Dineshprabhu A</span>, a Software Engineer at{' '}
                <span className="text-[#38bdf8]">Neurealm (formerly GS Lab — GAVS)</span> with a passion for
                building scalable backend systems. I specialize in Java, Spring Boot, and RESTful APIs.
              </p>
              <p className="text-[#64748b] dark:text-[#94a3b8] leading-relaxed text-lg mb-6">
                Currently working on the <span className="text-[#1e293b] dark:text-[#f8fafc] font-semibold">Athenahealth – Rules 2.0 Migration</span> project,
                where I modernize legacy Perl applications by migrating them to Java. I focus on writing clean,
                well-tested code with 95%+ test coverage.
              </p>
              <p className="text-[#64748b] dark:text-[#94a3b8] leading-relaxed text-lg">
                I hold a B.E. in Electronics and Communication Engineering from{' '}
                <span className="text-[#1e293b] dark:text-[#f8fafc]">Anna University (BIT Campus)</span> with a CGPA of 8.26/10.
                I'm always eager to learn and contribute to impactful projects.
              </p>
            </div>

            {/* Highlight Cards */}
            <div className="space-y-5">
              {highlights.map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: 30 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.2 + i * 0.15 }}
                  className="flex items-start gap-4 bg-[#e2e8f0] dark:bg-[#1e293b] border border-[#cbd5e1] dark:border-[#334155] rounded-xl p-5 hover:border-[#38bdf8]/50 transition-colors duration-300"
                >
                  <div className="text-[#38bdf8] mt-1">{item.icon}</div>
                  <div>
                    <h3 className="text-[#1e293b] dark:text-[#f8fafc] font-semibold mb-1">{item.title}</h3>
                    <p className="text-[#64748b] dark:text-[#94a3b8] text-sm">{item.desc}</p>
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
