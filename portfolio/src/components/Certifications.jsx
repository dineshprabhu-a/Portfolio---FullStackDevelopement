import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiAward, FiX, FiExternalLink, FiCalendar } from 'react-icons/fi';

const certifications = [
  {
    title: 'Programming in Java',
    issuer: 'NPTEL - IIT Kharagpur',
    date: 'Oct 2022',
    credentialId: 'NPTEL22CS102S64561228',
    score: '84%',
    skills: ['Java', 'Object-Oriented Programming'],
    description: 'Elite certificate with consolidated score of 84%. Completed 12-week course with 25/25 in online assignments, 25/25 in programming assignments, and 34.25/50 in proctored exam.',
    image: '/certificates/java.png',
    color: '#38bdf8',
  },
  {
    title: 'Internet of Things & Applications',
    issuer: 'Asi@Connect | Faculty of CSE, PSTU',
    date: 'Mar 2023',
    skills: ['Internet of Things (IoT)'],
    image: '/certificates/iot-applications.jpg',
    color: '#22c55e',
  },
  {
    title: 'Artificial Intelligence and Machine Learning',
    issuer: 'Edunet Foundation',
    date: 'Jun 2023',
    credentialId: 'PLAN-E112D5AD3768',
    skills: ['Artificial Intelligence (AI)', 'Machine Learning'],
    image: '/certificates/ai-ml-edunet.jpg',
    color: '#c084fc',
  },
  {
    title: 'Summer Intern — Embedded Systems',
    issuer: 'NSIC Technical Services Centre',
    date: 'Jul 2023',
    type: 'training',
    location: 'Chennai, Tamil Nadu',
    skills: ['Embedded Systems', 'AI', 'IoT'],
    description: 'Explored industrial-based embedded systems merging AI and IoT technologies. Gained hands-on experience in optimizing operations, predictive maintenance, and real-time monitoring.',
    image: '/certificates/nsic.png',
    color: '#fb923c',
  },
  {
    title: 'HTML, CSS, and Javascript for Web Developers',
    issuer: 'Johns Hopkins University',
    date: 'Apr 2024',
    platform: 'Coursera',
    credentialId: 'W5XYDE5VODKRX',
    skills: ['HTML5', 'CSS3', 'JavaScript', 'Web Development', 'Responsive Design'],
    description: 'Completed comprehensive web development course covering modern HTML5, CSS3, and JavaScript fundamentals.',
    verifyUrl: 'https://coursera.org/verify/W5XYDE5VODKRX',
    image: '/certificates/htmlcssjs.png',
    color: '#3b82f6',
  },
  {
    title: 'First Class with Distinction — Typewriting English',
    issuer: 'Junior Grade, 2018',
    date: '2018',
    skills: ['Typewriting'],
    image: '/certificates/typewriting.jpg',
    color: '#a855f7',
  },
];

export default function Certifications() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const [selectedCert, setSelectedCert] = useState(null);

  return (
    <>
      <section id="certifications" className="py-24 px-6 bg-[#e8edf2] dark:bg-[#0b1120] transition-colors duration-300">
        <div ref={ref} className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
              Certifications & <span className="text-[#38bdf8]">Training</span>
            </h2>
            <div className="w-20 h-1 bg-[#38bdf8] mx-auto rounded-full mb-12" />

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {certifications.map((cert, i) => (
                <motion.div
                  key={cert.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.1 + i * 0.1 }}
                  onClick={() => setSelectedCert(cert)}
                  className="group bg-[#f0f4f8] dark:bg-[#1e293b] border border-[#cbd5e1] dark:border-[#334155] rounded-xl p-5 cursor-pointer hover:border-[#38bdf8]/50 hover:shadow-[0_4px_24px_rgba(56,189,248,0.1)] hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="flex items-start gap-3">
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                      style={{ backgroundColor: cert.color + '20' }}
                    >
                      <FiAward className="text-lg" style={{ color: cert.color }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-[#1e293b] dark:text-[#f8fafc] text-sm group-hover:text-[#38bdf8] transition-colors">
                          {cert.title}
                        </h3>
                        {cert.type === 'training' && (
                          <span className="text-[9px] bg-[#fb923c]/15 text-[#fb923c] px-1.5 py-0.5 rounded font-medium">Training</span>
                        )}
                      </div>
                      <p className="text-xs text-[#64748b] dark:text-[#94a3b8] mt-0.5">{cert.issuer}</p>
                      <div className="flex items-center gap-1 text-[10px] text-[#94a3b8] dark:text-[#475569] mt-1">
                        <FiCalendar className="text-[8px]" /> {cert.type === 'training' ? cert.date : `Issued ${cert.date}`}
                        {cert.location && <span>&middot; {cert.location}</span>}
                      </div>
                    </div>
                  </div>
                  {cert.skills && cert.skills.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {cert.skills.map((s) => (
                        <span key={s} className="text-[10px] bg-[#38bdf8]/8 text-[#38bdf8] px-2 py-0.5 rounded-full">
                          {s}
                        </span>
                      ))}
                    </div>
                  )}
                  <div className="flex items-center gap-1 mt-2 text-xs text-[#38bdf8] opacity-0 group-hover:opacity-100 transition-opacity">
                    <FiExternalLink /> View certificate
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Certificate Modal */}
      <AnimatePresence>
        {selectedCert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
            onClick={() => setSelectedCert(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', duration: 0.4 }}
              className="relative bg-[#f0f4f8] dark:bg-[#1e293b] rounded-2xl overflow-hidden max-w-3xl w-full max-h-[90vh] shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-[#cbd5e1] dark:border-[#334155]">
                <div>
                  <h3 className="font-bold text-[#1e293b] dark:text-[#f8fafc]">{selectedCert.title}</h3>
                  <p className="text-xs text-[#64748b] dark:text-[#94a3b8]">
                    {selectedCert.issuer} {selectedCert.platform && `(${selectedCert.platform})`} &middot; Issued {selectedCert.date}
                  </p>
                  {selectedCert.score && (
                    <p className="text-xs text-[#22c55e] font-semibold mt-1">
                      Score: {selectedCert.score}
                    </p>
                  )}
                  {selectedCert.credentialId && (
                    <p className="text-[10px] text-[#94a3b8] dark:text-[#475569] mt-0.5">
                      Credential ID: {selectedCert.credentialId}
                    </p>
                  )}
                  {selectedCert.verifyUrl && (
                    <a href={selectedCert.verifyUrl} target="_blank" rel="noopener noreferrer" className="text-[10px] text-[#38bdf8] hover:text-[#7dd3fc] mt-0.5 inline-flex items-center gap-1">
                      <FiExternalLink /> Verify Certificate
                    </a>
                  )}
                  {selectedCert.location && (
                    <p className="text-[10px] text-[#94a3b8] dark:text-[#475569] mt-0.5">
                      {selectedCert.location} &middot; On-site
                    </p>
                  )}
                  {selectedCert.description && (
                    <p className="text-xs text-[#64748b] dark:text-[#94a3b8] mt-2 leading-relaxed">
                      {selectedCert.description}
                    </p>
                  )}
                  {selectedCert.skills && selectedCert.skills.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {selectedCert.skills.map((s) => (
                        <span key={s} className="text-[10px] bg-[#38bdf8]/10 text-[#38bdf8] px-2 py-0.5 rounded-full">
                          {s}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                <button
                  onClick={() => setSelectedCert(null)}
                  className="text-[#64748b] dark:text-[#94a3b8] hover:text-[#38bdf8] p-2 cursor-pointer shrink-0"
                >
                  <FiX className="text-xl" />
                </button>
              </div>

              {/* Certificate Image */}
              <div className="p-4 overflow-auto max-h-[70vh] flex items-center justify-center bg-[#e2e8f0] dark:bg-[#0f172a]">
                <img
                  src={selectedCert.image}
                  alt={selectedCert.title}
                  className="max-w-full max-h-[65vh] object-contain rounded-lg"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.parentElement.innerHTML =
                      '<div class="text-center py-16 px-6"><p class="text-[#64748b] dark:text-[#94a3b8] text-lg mb-2">📄 Certificate Image</p><p class="text-[#94a3b8] dark:text-[#475569] text-sm">Place your certificate image at:</p><code class="text-[#38bdf8] text-xs mt-2 block">' +
                      selectedCert.image +
                      '</code></div>';
                  }}
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
