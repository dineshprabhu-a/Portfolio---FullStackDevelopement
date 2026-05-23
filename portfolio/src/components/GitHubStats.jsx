import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiGithub, FiStar, FiGitBranch, FiUsers, FiCode } from 'react-icons/fi';
import { API_BASE } from '../config/api';

export default function GitHubStats() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.15 });
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE}/api/github/stats`)
      .then((res) => (res.ok ? res.json() : Promise.reject()))
      .then((data) => {
        if (!data.error) setStats(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (!stats && !loading) return null;

  const statCards = stats
    ? [
        { icon: <FiGithub />, label: 'Public Repos', value: stats.publicRepos },
        { icon: <FiStar />, label: 'Total Stars', value: stats.totalStars },
        { icon: <FiGitBranch />, label: 'Total Forks', value: stats.totalForks },
        { icon: <FiUsers />, label: 'Followers', value: stats.followers },
      ]
    : [];

  return (
    <section id="github" className="py-24 px-6 bg-[#e8edf2] dark:bg-[#0b1120] transition-colors duration-300">
      <div ref={ref} className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            GitHub <span className="text-[#38bdf8]">Activity</span>
          </h2>
          <div className="w-20 h-1 bg-[#38bdf8] mx-auto rounded-full mb-12" />

          {loading ? (
            <div className="text-center text-[#64748b] dark:text-[#94a3b8]">Loading GitHub stats...</div>
          ) : (
            <>
              {/* Stat Cards */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
                {statCards.map((card, i) => (
                  <motion.div
                    key={card.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.1 + i * 0.1 }}
                    className="bg-[#f0f4f8] dark:bg-[#1e293b] border border-[#cbd5e1] dark:border-[#334155] rounded-xl p-5 text-center hover:border-[#38bdf8]/50 transition-colors duration-300"
                  >
                    <div className="text-[#38bdf8] text-2xl mb-2 flex justify-center">{card.icon}</div>
                    <div className="text-2xl font-bold text-[#1e293b] dark:text-[#f8fafc]">{card.value}</div>
                    <div className="text-xs text-[#64748b] dark:text-[#94a3b8] mt-1">{card.label}</div>
                  </motion.div>
                ))}
              </div>

              {/* Top Languages */}
              {stats.topLanguages && stats.topLanguages.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  className="bg-[#f0f4f8] dark:bg-[#1e293b] border border-[#cbd5e1] dark:border-[#334155] rounded-xl p-6"
                >
                  <h3 className="text-lg font-semibold text-[#1e293b] dark:text-[#f8fafc] mb-4 flex items-center gap-2">
                    <FiCode className="text-[#38bdf8]" /> Top Languages
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {stats.topLanguages.map((lang, i) => {
                      const colors = ['#38bdf8', '#22c55e', '#fbbf24', '#c084fc', '#f472b6'];
                      return (
                        <div key={lang.name} className="flex items-center gap-2">
                          <span
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: colors[i % colors.length] }}
                          />
                          <span className="text-sm text-[#64748b] dark:text-[#94a3b8]">
                            {lang.name}
                          </span>
                          <span className="text-xs text-[#94a3b8] dark:text-[#475569]">
                            ({lang.count} repos)
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              )}

              {/* Profile Link */}
              {stats.profileUrl && (
                <div className="text-center mt-8">
                  <a
                    href={stats.profileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-[#38bdf8] hover:text-[#7dd3fc] font-medium transition-colors duration-300"
                  >
                    <FiGithub /> View Full GitHub Profile
                  </a>
                </div>
              )}
            </>
          )}
        </motion.div>
      </div>
    </section>
  );
}
