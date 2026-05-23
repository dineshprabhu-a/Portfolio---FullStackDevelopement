import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiCode, FiCopy, FiCheck } from 'react-icons/fi';
import { API_BASE } from '../config/api';

export default function CodeSnippets() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const [snippets, setSnippets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(null);
  const [activeCategory, setActiveCategory] = useState('All');

  useEffect(() => {
    fetch(`${API_BASE}/api/snippets`)
      .then((res) => (res.ok ? res.json() : Promise.reject()))
      .then((data) => {
        setSnippets(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleCopy = (code, id) => {
    navigator.clipboard.writeText(code);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  if (!loading && snippets.length === 0) return null;

  const categories = ['All', ...new Set(snippets.map((s) => s.category).filter(Boolean))];
  const filtered = activeCategory === 'All' ? snippets : snippets.filter((s) => s.category === activeCategory);

  return (
    <section id="snippets" className="py-24 px-6">
      <div ref={ref} className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            Code <span className="text-[#38bdf8]">Snippets</span>
          </h2>
          <div className="w-20 h-1 bg-[#38bdf8] mx-auto rounded-full mb-4" />
          <p className="text-center text-[#64748b] dark:text-[#94a3b8] mb-10 max-w-xl mx-auto">
            Useful code patterns and snippets I frequently use in backend development
          </p>

          {loading ? (
            <div className="text-center text-[#64748b] dark:text-[#94a3b8]">Loading snippets...</div>
          ) : (
            <>
              {/* Category Filter */}
              <div className="flex flex-wrap justify-center gap-2 mb-10">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors duration-300 cursor-pointer ${
                      activeCategory === cat
                        ? 'bg-[#38bdf8] text-[#0f172a]'
                        : 'bg-[#e2e8f0] dark:bg-[#1e293b] text-[#64748b] dark:text-[#94a3b8] border border-[#cbd5e1] dark:border-[#334155] hover:border-[#38bdf8]/50'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Snippet Cards */}
              <div className="grid md:grid-cols-2 gap-5">
                {filtered.map((snippet, i) => (
                  <motion.div
                    key={snippet.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.1 + i * 0.08 }}
                    className="bg-[#e2e8f0] dark:bg-[#1e293b] border border-[#cbd5e1] dark:border-[#334155] rounded-xl overflow-hidden hover:border-[#38bdf8]/40 transition-colors duration-300"
                  >
                    {/* Header */}
                    <div className="flex items-center justify-between px-4 py-3 border-b border-[#cbd5e1] dark:border-[#334155]">
                      <div className="flex items-center gap-2">
                        <FiCode className="text-[#38bdf8]" />
                        <span className="text-sm font-semibold text-[#1e293b] dark:text-[#f8fafc]">
                          {snippet.title}
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-xs bg-[#38bdf8]/10 text-[#38bdf8] px-2 py-0.5 rounded">
                          {snippet.language}
                        </span>
                        <button
                          onClick={() => handleCopy(snippet.code, snippet.id)}
                          className="text-[#64748b] dark:text-[#94a3b8] hover:text-[#38bdf8] transition-colors cursor-pointer"
                          title="Copy code"
                        >
                          {copied === snippet.id ? <FiCheck className="text-[#22c55e]" /> : <FiCopy />}
                        </button>
                      </div>
                    </div>

                    {/* Code */}
                    <div className="p-4 overflow-x-auto">
                      <pre className="text-xs leading-relaxed text-[#475569] dark:text-[#94a3b8] font-['JetBrains_Mono'] whitespace-pre">
                        {snippet.code}
                      </pre>
                    </div>

                    {/* Description */}
                    {snippet.description && (
                      <div className="px-4 pb-3 border-t border-[#cbd5e1] dark:border-[#334155] pt-2">
                        <p className="text-xs text-[#64748b] dark:text-[#475569]">{snippet.description}</p>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </>
          )}
        </motion.div>
      </div>
    </section>
  );
}
