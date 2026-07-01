import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiServer, FiDatabase, FiCode } from 'react-icons/fi';

const highlights = [
  { icon: <FiServer className="text-2xl" />, title: 'Rules Engine Modernization', desc: 'Migrating legacy Perl rules applications to Java-based systems' },
  { icon: <FiDatabase className="text-2xl" />, title: 'Schema & Integration', desc: 'Designing multi-scope schemas and REST APIs for rule authoring and lifecycle management' },
  { icon: <FiCode className="text-2xl" />, title: 'Observability & Quality', desc: 'Building metrics logging pipelines with Grafana and maintaining 95%+ unit test coverage' },
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
                <span className="text-[#38bdf8]">Neurealm (formerly GS Lab — GAVS)</span> with experience modernizing enterprise rules platforms.
                I specialize in Core Java, Spring Boot, Stream API, and building clean, maintainable backend systems.
              </p>
              <p className="text-[#64748b] dark:text-[#94a3b8] leading-relaxed text-lg mb-6">
                On the Athenahealth Rules Engine Modernization project, I migrated legacy Perl applications to Java, developed a Java-based DSL engine,
                and built rule authoring and lifecycle REST APIs with strong observability backed by Grafana.
              </p>
              <p className="text-[#64748b] dark:text-[#94a3b8] leading-relaxed text-lg">
                I hold a B.E. in Electronics and Communication Engineering from{' '}
                <span className="text-[#1e293b] dark:text-[#f8fafc]">Anna University (BIT Campus)</span> with a CGPA of 8.26/10.
                I enjoy solving problems, designing robust systems, and writing well-tested code.
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
