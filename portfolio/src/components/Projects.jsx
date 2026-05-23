import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { API_BASE } from '../config/api';
import { FiGithub, FiExternalLink, FiStar, FiGitBranch } from 'react-icons/fi';

const fallbackProjects = [
  {
    title: 'E-Commerce Backend System',
    description:
      'A robust RESTful backend for an e-commerce platform with user authentication, product management, cart operations, and order processing.',
    techStack: 'Java,Spring Boot,MySQL,REST API,Spring Security',
    githubUrl: 'https://github.com/dineshprabhu-a',
    demoUrl: '#',
    image: '🛒',
  },
  {
    title: 'URL Shortener Application',
    description:
      'A high-performance URL shortening service with custom aliases, click analytics, and expiration features built with Spring Boot.',
    techStack: 'Java,Spring Boot,PostgreSQL,REST API,Docker',
    githubUrl: 'https://github.com/dineshprabhu-a',
    demoUrl: '#',
    image: '🔗',
  },
  {
    title: 'Employee Management System',
    description:
      'A full-stack employee management application with CRUD operations, role-based access, department management, and reporting.',
    techStack: 'Java,Spring Boot,Hibernate,MySQL,REST API',
    githubUrl: 'https://github.com/dineshprabhu-a',
    demoUrl: '#',
    image: '👥',
  },
  {
    title: 'Secure Healthcare Communication',
    description:
      'Encrypted data transfer system for healthcare using ECDH key exchange and AES encryption. Published in IJNRD journal.',
    techStack: 'Java,JDBC,MySQL,Apache Server,Cryptography',
    githubUrl: 'https://github.com/dineshprabhu-a',
    demoUrl: '#',
    image: '🔐',
  },
];

const langColors = {
  Java: '#b07219',
  JavaScript: '#f1e05a',
  TypeScript: '#3178c6',
  Python: '#3572A5',
  HTML: '#e34c26',
  CSS: '#563d7c',
  C: '#555555',
  'C++': '#f34b7d',
  Shell: '#89e051',
  Dockerfile: '#384d54',
};

export default function Projects() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const [projects, setProjects] = useState(fallbackProjects);
  const [repos, setRepos] = useState([]);
  const [reposLoading, setReposLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('All');

  useEffect(() => {
    fetch(`${API_BASE}/api/projects`)
      .then((res) => res.ok ? res.json() : Promise.reject())
      .then((data) => { if (data.length > 0) setProjects(data); })
      .catch(() => {});

    fetch(`${API_BASE}/api/github/repos`)
      .then((res) => (res.ok ? res.json() : Promise.reject()))
      .then((data) => {
        setRepos(data);
        setReposLoading(false);
      })
      .catch(() => setReposLoading(false));
  }, []);

  const allTechs = ['All', ...new Set(projects.flatMap((p) => (p.techStack || '').split(',').map((t) => t.trim()).filter(Boolean)))];
  const filteredProjects = activeFilter === 'All' ? projects : projects.filter((p) => (p.techStack || '').split(',').map((t) => t.trim()).includes(activeFilter));

  return (
    <section id="projects" className="py-24 px-6">
      <div ref={ref} className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            Featured <span className="text-[#38bdf8]">Projects</span>
          </h2>
          <div className="w-20 h-1 bg-[#38bdf8] mx-auto rounded-full mb-8" />

          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {allTechs.map((tech) => (
              <button
                key={tech}
                onClick={() => setActiveFilter(tech)}
                className={`text-xs px-4 py-1.5 rounded-full border transition-all duration-300 cursor-pointer ${
                  activeFilter === tech
                    ? 'bg-[#38bdf8] text-[#0f172a] border-[#38bdf8] font-semibold'
                    : 'border-[#cbd5e1] dark:border-[#334155] text-[#64748b] dark:text-[#94a3b8] hover:border-[#38bdf8] hover:text-[#38bdf8]'
                }`}
              >
                {tech}
              </button>
            ))}
          </div>

          {/* Existing Featured Projects */}
          <div className="grid md:grid-cols-2 gap-6">
            {filteredProjects.map((project, i) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.12 }}
                className="group relative bg-[#e8edf2]/80 dark:bg-[#1e293b]/60 backdrop-blur-sm border border-[#cbd5e1] dark:border-[#334155] rounded-2xl overflow-hidden hover:border-[#38bdf8]/40 hover:shadow-[0_8px_40px_rgba(56,189,248,0.1)] hover:-translate-y-1 transition-all duration-400"
              >
                {/* Project Image Area */}
                <div className="h-48 bg-gradient-to-br from-[#e2e8f0] to-[#cbd5e1] dark:from-[#0f172a] dark:to-[#1e293b] flex items-center justify-center text-6xl border-b border-[#cbd5e1] dark:border-[#334155]">
                  <span className="group-hover:scale-110 transition-transform duration-300">
                    {project.image}
                  </span>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-[#1e293b] dark:text-[#f8fafc] mb-2 group-hover:text-[#38bdf8] transition-colors duration-300">
                    {project.title}
                  </h3>
                  <p className="text-[#64748b] dark:text-[#94a3b8] text-sm leading-relaxed mb-4">
                    {project.description}
                  </p>

                  {/* Tech Badges */}
                  <div className="flex flex-wrap gap-2 mb-5">
                    {(project.techStack || '').split(',').filter(Boolean).map((t) => (
                      <span
                        key={t}
                        className="text-xs bg-[#38bdf8]/10 text-[#38bdf8] border border-[#38bdf8]/20 rounded-full px-3 py-1"
                      >
                        {t.trim()}
                      </span>
                    ))}
                  </div>

                  {/* Links */}
                  <div className="flex gap-4">
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm text-[#64748b] dark:text-[#94a3b8] hover:text-[#38bdf8] transition-colors duration-300"
                    >
                      <FiGithub /> GitHub
                    </a>
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm text-[#64748b] dark:text-[#94a3b8] hover:text-[#38bdf8] transition-colors duration-300"
                    >
                      <FiExternalLink /> Live Demo
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* GitHub Repositories */}
          {(reposLoading || repos.length > 0) && (
            <div className="mt-16">
              <h3 className="text-2xl font-bold text-center mb-3">
                GitHub <span className="text-[#38bdf8]">Repositories</span>
              </h3>
              <p className="text-center text-[#64748b] dark:text-[#94a3b8] mb-8 text-sm">
                Live from my GitHub profile
              </p>

              {reposLoading ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[1, 2, 3, 4, 5, 6].map((n) => (
                    <div key={n} className="bg-[#e8edf2]/80 dark:bg-[#1e293b]/60 border border-[#cbd5e1] dark:border-[#334155] rounded-xl p-4 animate-pulse">
                      <div className="h-4 w-3/4 bg-[#cbd5e1] dark:bg-[#334155] rounded mb-3" />
                      <div className="h-3 w-1/3 bg-[#cbd5e1] dark:bg-[#334155] rounded mb-4" />
                      <div className="h-3 w-full bg-[#cbd5e1] dark:bg-[#334155] rounded mb-2" />
                      <div className="h-3 w-2/3 bg-[#cbd5e1] dark:bg-[#334155] rounded mb-4" />
                      <div className="flex gap-2 pt-3 border-t border-[#cbd5e1]/50 dark:border-[#334155]/50">
                        <div className="h-3 w-12 bg-[#cbd5e1] dark:bg-[#334155] rounded" />
                        <div className="h-3 w-12 bg-[#cbd5e1] dark:bg-[#334155] rounded" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {repos.map((repo, i) => {
                    const lang = repo.language || '';
                    const color = langColors[lang] || '#38bdf8';
                    const topics = repo.topics || [];

                    return (
                      <motion.div
                        key={repo.name}
                        initial={{ opacity: 0, y: 20 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.4, delay: 0.05 + i * 0.05 }}
                        className="group bg-[#e8edf2]/80 dark:bg-[#1e293b]/60 border border-[#cbd5e1] dark:border-[#334155] rounded-xl p-4 hover:border-[#38bdf8]/40 hover:-translate-y-1 transition-all duration-300 flex flex-col"
                      >
                        {/* Repo name + language */}
                        <div className="mb-2">
                          <a
                            href={repo.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm font-bold text-[#1e293b] dark:text-[#f8fafc] group-hover:text-[#38bdf8] transition-colors"
                          >
                            {repo.name}
                          </a>
                          {lang && (
                            <div className="flex items-center gap-1.5 mt-1">
                              <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: color }} />
                              <span className="text-xs text-[#64748b] dark:text-[#94a3b8]">{lang}</span>
                            </div>
                          )}
                        </div>

                        {/* Description */}
                        <p className="text-[#64748b] dark:text-[#94a3b8] text-xs leading-relaxed mb-3 flex-1 line-clamp-2">
                          {repo.description || 'No description provided.'}
                        </p>

                        {/* Topics */}
                        {topics.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 mb-3">
                            {topics.slice(0, 3).map((t) => (
                              <span
                                key={t}
                                className="text-[10px] bg-[#38bdf8]/10 text-[#38bdf8] border border-[#38bdf8]/20 rounded-full px-2 py-0.5"
                              >
                                {t}
                              </span>
                            ))}
                            {topics.length > 3 && (
                              <span className="text-[10px] text-[#64748b] dark:text-[#94a3b8]">+{topics.length - 3}</span>
                            )}
                          </div>
                        )}

                        {/* Footer */}
                        <div className="flex items-center justify-between pt-2 border-t border-[#cbd5e1]/50 dark:border-[#334155]/50">
                          <div className="flex items-center gap-3 text-xs text-[#64748b] dark:text-[#94a3b8]">
                            <span className="flex items-center gap-1"><FiStar className="text-[#fbbf24]" /> {repo.stars}</span>
                            <span className="flex items-center gap-1"><FiGitBranch className="text-[#22c55e]" /> {repo.forks}</span>
                          </div>
                          <a
                            href={repo.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-[#64748b] dark:text-[#94a3b8] hover:text-[#38bdf8] transition-colors flex items-center gap-1"
                          >
                            <FiGithub /> View
                          </a>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
