import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowLeft, FiUsers, FiDownload, FiGithub, FiCode, FiFolder, FiRefreshCw, FiTrash2, FiPlus, FiActivity, FiLayout, FiSun, FiMoon, FiLock, FiLogOut } from 'react-icons/fi';
import { useTheme } from '../context/ThemeContext';
import { API_BASE, ADMIN_USERNAME, ADMIN_PASSWORD } from '../config/api';

const portfolioSections = [
  { name: 'Hero', id: 'home', desc: 'Name, typing animation, resume download CTA' },
  { name: 'About', id: 'about', desc: 'Bio, company, education highlights' },
  { name: 'Skills', id: 'skills', desc: 'Backend, Database, DevOps, Tools categories' },
  { name: 'Soft Skills', id: 'soft-skills', desc: 'Time Management, Team Player, Problem Solving' },
  { name: 'Education', id: 'education', desc: 'B.E. ECE (BIT Campus), HSC, SSLC timeline' },
  { name: 'Projects', id: 'projects', desc: 'Dynamic from API with fallback (CRUD via API)' },
  { name: 'GitHub Stats', id: 'github', desc: 'Live GitHub profile stats with fallback' },
  { name: 'Code Snippets', id: 'snippets', desc: 'Code samples with category filter + copy' },
  { name: 'Certifications', id: 'certifications', desc: '6 certs with clickable modal viewer' },
  { name: 'Activities', id: 'activities', desc: 'NSS Camp Volunteer' },
  { name: 'Experience', id: 'experience', desc: 'Neurealm + Coding Raja timeline' },
  { name: 'Contact', id: 'contact', desc: 'Form → backend API → email' },
];

export default function AdminDashboard() {
  const { darkMode, toggleTheme } = useTheme();
  const [isAuthenticated, setIsAuthenticated] = useState(() => sessionStorage.getItem('admin_auth') === 'true');
  const [loginForm, setLoginForm] = useState({ username: '', password: '' });
  const [loginError, setLoginError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    if (loginForm.username === ADMIN_USERNAME && loginForm.password === ADMIN_PASSWORD) {
      sessionStorage.setItem('admin_auth', 'true');
      setIsAuthenticated(true);
      setLoginError('');
    } else {
      setLoginError('Invalid username or password');
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('admin_auth');
    setIsAuthenticated(false);
  };

  const [activeTab, setActiveTab] = useState('overview');
  const [analytics, setAnalytics] = useState(null);
  const [resumeStats, setResumeStats] = useState(null);
  const [githubStats, setGithubStats] = useState(null);
  const [projects, setProjects] = useState([]);
  const [snippets, setSnippets] = useState([]);
  const [loading, setLoading] = useState({});
  const [health, setHealth] = useState(null);

  const fetchData = (key, url, setter) => {
    setLoading((prev) => ({ ...prev, [key]: true }));
    fetch(url)
      .then((res) => (res.ok ? res.json() : Promise.reject(res.statusText)))
      .then((data) => setter(data))
      .catch((err) => console.error(`Failed to fetch ${key}:`, err))
      .finally(() => setLoading((prev) => ({ ...prev, [key]: false })));
  };

  useEffect(() => {
    fetchData('health', `${API_BASE}/api/health`, setHealth);
    fetchData('analytics', `${API_BASE}/api/analytics`, setAnalytics);
    fetchData('resume', `${API_BASE}/api/resume/stats`, setResumeStats);
    fetchData('github', `${API_BASE}/api/github/stats`, setGithubStats);
    fetchData('projects', `${API_BASE}/api/projects`, setProjects);
    fetchData('snippets', `${API_BASE}/api/snippets`, setSnippets);
  }, []);

  const refresh = (key) => {
    const map = {
      analytics: [`${API_BASE}/api/analytics`, setAnalytics],
      resume: [`${API_BASE}/api/resume/stats`, setResumeStats],
      github: [`${API_BASE}/api/github/stats`, setGithubStats],
      projects: [`${API_BASE}/api/projects`, setProjects],
      snippets: [`${API_BASE}/api/snippets`, setSnippets],
    };
    if (map[key]) fetchData(key, map[key][0], map[key][1]);
  };

  const refreshAll = () => {
    Object.keys({ analytics: 1, resume: 1, github: 1, projects: 1, snippets: 1 }).forEach(refresh);
  };

  const deleteProject = (id) => {
    if (!confirm('Delete this project?')) return;
    fetch(`${API_BASE}/api/projects/${id}`, { method: 'DELETE' }).then(() => refresh('projects'));
  };

  const deleteSnippet = (id) => {
    if (!confirm('Delete this snippet?')) return;
    fetch(`${API_BASE}/api/snippets/${id}`, { method: 'DELETE' }).then(() => refresh('snippets'));
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: <FiLayout /> },
    { id: 'analytics', label: 'Analytics', icon: <FiActivity /> },
    { id: 'resume', label: 'Resume', icon: <FiDownload /> },
    { id: 'github', label: 'GitHub', icon: <FiGithub /> },
    { id: 'projects', label: 'Projects', icon: <FiFolder /> },
    { id: 'snippets', label: 'Snippets', icon: <FiCode /> },
  ];

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#f0f4f8] dark:bg-[#0f172a] text-[#1e293b] dark:text-[#f8fafc] flex items-center justify-center px-6">
        <div className="w-full max-w-sm">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-[#38bdf8]/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <FiLock className="text-[#38bdf8] text-2xl" />
            </div>
            <h1 className="text-2xl font-bold">
              Admin <span className="text-[#38bdf8]">Login</span>
            </h1>
            <p className="text-sm text-[#64748b] dark:text-[#94a3b8] mt-1">Enter credentials to access the dashboard</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm text-[#64748b] dark:text-[#94a3b8] mb-1.5">Username</label>
              <input
                type="text"
                value={loginForm.username}
                onChange={(e) => setLoginForm({ ...loginForm, username: e.target.value })}
                className="w-full bg-[#e2e8f0] dark:bg-[#1e293b] border border-[#cbd5e1] dark:border-[#334155] rounded-lg px-4 py-2.5 text-[#1e293b] dark:text-[#f8fafc] focus:border-[#38bdf8] focus:outline-none transition-colors"
                placeholder="Username"
                autoFocus
                required
              />
            </div>
            <div>
              <label className="block text-sm text-[#64748b] dark:text-[#94a3b8] mb-1.5">Password</label>
              <input
                type="password"
                value={loginForm.password}
                onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                className="w-full bg-[#e2e8f0] dark:bg-[#1e293b] border border-[#cbd5e1] dark:border-[#334155] rounded-lg px-4 py-2.5 text-[#1e293b] dark:text-[#f8fafc] focus:border-[#38bdf8] focus:outline-none transition-colors"
                placeholder="Password"
                required
              />
            </div>

            {loginError && (
              <p className="text-[#ef4444] text-sm text-center">{loginError}</p>
            )}

            <button
              type="submit"
              className="w-full bg-[#38bdf8] text-[#0f172a] py-2.5 rounded-lg font-semibold hover:bg-[#7dd3fc] transition-colors cursor-pointer"
            >
              Sign In
            </button>
          </form>

          <div className="text-center mt-6">
            <Link to="/" className="text-sm text-[#64748b] dark:text-[#94a3b8] hover:text-[#38bdf8] transition-colors">
              <FiArrowLeft className="inline mr-1" /> Back to Portfolio
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f0f4f8] dark:bg-[#0f172a] text-[#1e293b] dark:text-[#f8fafc] transition-colors duration-300">
      {/* Header */}
      <header className="bg-[#e8edf2] dark:bg-[#1e293b] border-b border-[#cbd5e1] dark:border-[#334155] px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              to="/"
              className="flex items-center gap-2 text-[#64748b] dark:text-[#94a3b8] hover:text-[#38bdf8] transition-colors"
            >
              <FiArrowLeft /> Back to Portfolio
            </Link>
            <h1 className="text-xl font-bold">
              Admin <span className="text-[#38bdf8]">Dashboard</span>
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={refreshAll}
              className="text-[#64748b] dark:text-[#94a3b8] hover:text-[#38bdf8] p-2 transition-colors cursor-pointer"
              title="Refresh all data"
            >
              <FiRefreshCw />
            </button>
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-[#dbe2eb] dark:bg-[#334155] text-[#64748b] dark:text-[#94a3b8] hover:text-[#38bdf8] transition-colors cursor-pointer"
              aria-label="Toggle theme"
            >
              {darkMode ? <FiSun /> : <FiMoon />}
            </button>
            <span
              className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full ${
                health ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${health ? 'bg-green-500' : 'bg-red-500'}`} />
              {health ? 'Backend Online' : 'Backend Offline'}
            </span>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 text-xs text-[#64748b] dark:text-[#94a3b8] hover:text-[#ef4444] transition-colors cursor-pointer px-2 py-1"
              title="Logout"
            >
              <FiLogOut /> Logout
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-6">
        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-[#38bdf8] text-[#0f172a]'
                  : 'bg-[#e2e8f0] dark:bg-[#1e293b] text-[#64748b] dark:text-[#94a3b8] border border-[#cbd5e1] dark:border-[#334155] hover:border-[#38bdf8]/50'
              }`}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div>
            <h2 className="text-lg font-semibold mb-4">Portfolio Overview</h2>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-[#e2e8f0] dark:bg-[#1e293b] border border-[#cbd5e1] dark:border-[#334155] rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-[#38bdf8]">{portfolioSections.length}</div>
                <div className="text-xs text-[#64748b] dark:text-[#94a3b8] mt-1">Sections</div>
              </div>
              <div className="bg-[#e2e8f0] dark:bg-[#1e293b] border border-[#cbd5e1] dark:border-[#334155] rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-[#22c55e]">{projects.length}</div>
                <div className="text-xs text-[#64748b] dark:text-[#94a3b8] mt-1">Projects</div>
              </div>
              <div className="bg-[#e2e8f0] dark:bg-[#1e293b] border border-[#cbd5e1] dark:border-[#334155] rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-[#fbbf24]">{snippets.length}</div>
                <div className="text-xs text-[#64748b] dark:text-[#94a3b8] mt-1">Snippets</div>
              </div>
              <div className="bg-[#e2e8f0] dark:bg-[#1e293b] border border-[#cbd5e1] dark:border-[#334155] rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-[#c084fc]">{resumeStats?.totalDownloads ?? 0}</div>
                <div className="text-xs text-[#64748b] dark:text-[#94a3b8] mt-1">Resume Downloads</div>
              </div>
            </div>

            {/* Frontend Sections */}
            <div className="bg-[#e2e8f0] dark:bg-[#1e293b] border border-[#cbd5e1] dark:border-[#334155] rounded-xl p-5 mb-6">
              <h3 className="font-semibold mb-3">Frontend Sections ({portfolioSections.length})</h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {portfolioSections.map((section, i) => (
                  <div
                    key={section.id}
                    className="flex items-start gap-3 bg-[#f0f4f8] dark:bg-[#0f172a] border border-[#cbd5e1]/50 dark:border-[#334155]/50 rounded-lg p-3"
                  >
                    <span className="text-xs font-bold text-[#38bdf8] bg-[#38bdf8]/10 w-6 h-6 rounded flex items-center justify-center shrink-0">
                      {i + 1}
                    </span>
                    <div>
                      <h4 className="text-sm font-semibold">{section.name}</h4>
                      <p className="text-[10px] text-[#64748b] dark:text-[#94a3b8] mt-0.5">{section.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Tech Stack */}
            <div className="bg-[#e2e8f0] dark:bg-[#1e293b] border border-[#cbd5e1] dark:border-[#334155] rounded-xl p-5 mb-6">
              <h3 className="font-semibold mb-3">Tech Stack</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="text-xs text-[#64748b] dark:text-[#94a3b8] font-medium mb-2 uppercase tracking-wider">Frontend</h4>
                  <div className="flex flex-wrap gap-2">
                    {['React 19', 'Vite', 'Tailwind CSS v4', 'Framer Motion', 'React Router', 'React Icons'].map((t) => (
                      <span key={t} className="text-xs bg-[#38bdf8]/10 text-[#38bdf8] px-2.5 py-1 rounded-full">{t}</span>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-xs text-[#64748b] dark:text-[#94a3b8] font-medium mb-2 uppercase tracking-wider">Backend</h4>
                  <div className="flex flex-wrap gap-2">
                    {['Spring Boot 3.2', 'Java 17', 'Spring Data JPA', 'H2 Database', 'Spring Cache', 'REST APIs'].map((t) => (
                      <span key={t} className="text-xs bg-[#22c55e]/10 text-[#22c55e] px-2.5 py-1 rounded-full">{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Features */}
            <div className="bg-[#e2e8f0] dark:bg-[#1e293b] border border-[#cbd5e1] dark:border-[#334155] rounded-xl p-5">
              <h3 className="font-semibold mb-3">Features</h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2 text-sm">
                {[
                  '🌗 Dark / Light Mode',
                  '📊 Visitor Analytics',
                  '📄 Resume Download Tracker',
                  '🐙 GitHub Stats Integration',
                  '💻 Code Snippets Showcase',
                  '🎓 Education Timeline',
                  '📜 Certifications Modal Viewer',
                  '🏗️ Projects CRUD API',
                  '📱 Fully Responsive',
                  '🔝 Back to Top + Scroll Progress',
                  '🔗 Active Nav Highlight',
                  '🛡️ 404 Not Found Page',
                  '⚙️ Admin Dashboard (this page!)',
                  '🔒 reCAPTCHA Ready (disabled)',
                ].map((f) => (
                  <div key={f} className="flex items-center gap-2 text-[#64748b] dark:text-[#94a3b8] py-1">
                    {f}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Visitor Analytics</h2>
              <button onClick={() => refresh('analytics')} className="text-[#38bdf8] hover:text-[#7dd3fc] cursor-pointer">
                <FiRefreshCw className={loading.analytics ? 'animate-spin' : ''} />
              </button>
            </div>

            {analytics ? (
              <>
                {/* Stat Cards */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
                  {[
                    { label: 'Total Visits', value: analytics.totalVisits, color: 'text-[#38bdf8]' },
                    { label: 'Unique Visitors', value: analytics.uniqueVisitors, color: 'text-[#22c55e]' },
                    { label: 'Visits (24h)', value: analytics.visitsLast24h, color: 'text-[#fbbf24]' },
                    { label: 'Unique (24h)', value: analytics.uniqueVisitorsLast24h, color: 'text-[#f472b6]' },
                    { label: 'Visits (7d)', value: analytics.visitsLast7d, color: 'text-[#c084fc]' },
                    { label: 'Unique (7d)', value: analytics.uniqueVisitorsLast7d, color: 'text-[#fb923c]' },
                  ].map((stat) => (
                    <div
                      key={stat.label}
                      className="bg-[#e2e8f0] dark:bg-[#1e293b] border border-[#cbd5e1] dark:border-[#334155] rounded-xl p-4 text-center"
                    >
                      <div className={`text-2xl font-bold ${stat.color}`}>{stat.value ?? '-'}</div>
                      <div className="text-xs text-[#64748b] dark:text-[#94a3b8] mt-1">{stat.label}</div>
                    </div>
                  ))}
                </div>

                {/* Section Views */}
                {analytics.sectionViews && Object.keys(analytics.sectionViews).length > 0 && (
                  <div className="bg-[#e2e8f0] dark:bg-[#1e293b] border border-[#cbd5e1] dark:border-[#334155] rounded-xl p-5">
                    <h3 className="font-semibold mb-3">Section Views</h3>
                    <div className="space-y-2">
                      {Object.entries(analytics.sectionViews)
                        .sort((a, b) => b[1] - a[1])
                        .map(([section, count]) => {
                          const max = Math.max(...Object.values(analytics.sectionViews));
                          const pct = max > 0 ? (count / max) * 100 : 0;
                          return (
                            <div key={section} className="flex items-center gap-3">
                              <span className="text-sm w-24 text-[#64748b] dark:text-[#94a3b8] capitalize">{section}</span>
                              <div className="flex-1 bg-[#cbd5e1]/30 dark:bg-[#334155]/50 rounded-full h-5 overflow-hidden">
                                <div
                                  className="bg-[#38bdf8] h-full rounded-full transition-all duration-500"
                                  style={{ width: `${pct}%` }}
                                />
                              </div>
                              <span className="text-sm font-medium w-10 text-right">{count}</span>
                            </div>
                          );
                        })}
                    </div>
                  </div>
                )}
              </>
            ) : (
              <p className="text-[#64748b] dark:text-[#94a3b8]">{loading.analytics ? 'Loading...' : 'No analytics data yet.'}</p>
            )}
          </div>
        )}

        {/* Resume Tab */}
        {activeTab === 'resume' && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Resume Downloads</h2>
              <button onClick={() => refresh('resume')} className="text-[#38bdf8] hover:text-[#7dd3fc] cursor-pointer">
                <FiRefreshCw className={loading.resume ? 'animate-spin' : ''} />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-[#e2e8f0] dark:bg-[#1e293b] border border-[#cbd5e1] dark:border-[#334155] rounded-xl p-6 text-center">
                <FiDownload className="text-[#38bdf8] text-4xl mx-auto mb-3" />
                <div className="text-4xl font-bold text-[#38bdf8]">{resumeStats?.totalDownloads ?? '-'}</div>
                <div className="text-sm text-[#64748b] dark:text-[#94a3b8] mt-2">Total Downloads</div>
              </div>
              <div className="bg-[#e2e8f0] dark:bg-[#1e293b] border border-[#cbd5e1] dark:border-[#334155] rounded-xl p-6">
                <h3 className="font-semibold mb-3">Quick Actions</h3>
                <a
                  href={`${API_BASE}/api/resume/download`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#38bdf8] text-[#0f172a] px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#7dd3fc] transition-colors"
                >
                  <FiDownload /> Test Download
                </a>
                <p className="text-xs text-[#64748b] dark:text-[#94a3b8] mt-3">
                  API: <code className="bg-[#0f172a]/10 dark:bg-[#f8fafc]/10 px-1.5 py-0.5 rounded text-[#38bdf8]">GET /api/resume/stats</code>
                </p>
              </div>
            </div>
          </div>
        )}

        {/* GitHub Tab */}
        {activeTab === 'github' && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">GitHub Stats</h2>
              <button onClick={() => refresh('github')} className="text-[#38bdf8] hover:text-[#7dd3fc] cursor-pointer">
                <FiRefreshCw className={loading.github ? 'animate-spin' : ''} />
              </button>
            </div>

            {githubStats ? (
              <>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  {[
                    { label: 'Public Repos', value: githubStats.publicRepos },
                    { label: 'Total Stars', value: githubStats.totalStars },
                    { label: 'Total Forks', value: githubStats.totalForks },
                    { label: 'Followers', value: githubStats.followers },
                  ].map((stat) => (
                    <div
                      key={stat.label}
                      className="bg-[#e2e8f0] dark:bg-[#1e293b] border border-[#cbd5e1] dark:border-[#334155] rounded-xl p-4 text-center"
                    >
                      <div className="text-2xl font-bold text-[#38bdf8]">{stat.value ?? '-'}</div>
                      <div className="text-xs text-[#64748b] dark:text-[#94a3b8] mt-1">{stat.label}</div>
                    </div>
                  ))}
                </div>

                {githubStats.topLanguages && (
                  <div className="bg-[#e2e8f0] dark:bg-[#1e293b] border border-[#cbd5e1] dark:border-[#334155] rounded-xl p-5 mb-4">
                    <h3 className="font-semibold mb-3">Top Languages</h3>
                    <div className="flex flex-wrap gap-3">
                      {githubStats.topLanguages.map((lang, i) => {
                        const colors = ['#38bdf8', '#22c55e', '#fbbf24', '#c084fc', '#f472b6'];
                        return (
                          <span
                            key={lang.name}
                            className="px-3 py-1.5 rounded-full text-sm font-medium"
                            style={{ backgroundColor: colors[i % colors.length] + '20', color: colors[i % colors.length] }}
                          >
                            {lang.name} ({lang.count})
                          </span>
                        );
                      })}
                    </div>
                  </div>
                )}

                {githubStats.error && (
                  <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700 rounded-xl p-4 text-sm text-yellow-700 dark:text-yellow-400">
                    Using fallback data. Set <code>GITHUB_TOKEN</code> env variable for live stats.
                  </div>
                )}

                <div className="bg-[#e2e8f0] dark:bg-[#1e293b] border border-[#cbd5e1] dark:border-[#334155] rounded-xl p-4">
                  <h3 className="font-semibold mb-2">Raw API Response</h3>
                  <pre className="text-xs text-[#64748b] dark:text-[#94a3b8] overflow-x-auto font-['JetBrains_Mono'] whitespace-pre-wrap">
                    {JSON.stringify(githubStats, null, 2)}
                  </pre>
                </div>
              </>
            ) : (
              <p className="text-[#64748b] dark:text-[#94a3b8]">{loading.github ? 'Loading...' : 'Failed to load.'}</p>
            )}
          </div>
        )}

        {/* Projects Tab */}
        {activeTab === 'projects' && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Projects ({projects.length})</h2>
              <button onClick={() => refresh('projects')} className="text-[#38bdf8] hover:text-[#7dd3fc] cursor-pointer">
                <FiRefreshCw className={loading.projects ? 'animate-spin' : ''} />
              </button>
            </div>

            <div className="space-y-3">
              {projects.map((p) => (
                <div
                  key={p.id}
                  className="bg-[#e2e8f0] dark:bg-[#1e293b] border border-[#cbd5e1] dark:border-[#334155] rounded-xl p-4 flex items-start justify-between gap-4"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xl">{p.image}</span>
                      <h3 className="font-semibold">{p.title}</h3>
                      {p.featured && (
                        <span className="text-xs bg-[#38bdf8]/10 text-[#38bdf8] px-2 py-0.5 rounded">Featured</span>
                      )}
                    </div>
                    <p className="text-sm text-[#64748b] dark:text-[#94a3b8] mb-2">{p.description}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {(p.techStack || '').split(',').filter(Boolean).map((t) => (
                        <span key={t} className="text-xs bg-[#38bdf8]/10 text-[#38bdf8] px-2 py-0.5 rounded">
                          {t.trim()}
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-3 mt-2 text-xs text-[#64748b] dark:text-[#94a3b8]">
                      <span>ID: {p.id}</span>
                      <span>Order: {p.displayOrder}</span>
                      {p.githubUrl && (
                        <a href={p.githubUrl} target="_blank" rel="noopener noreferrer" className="text-[#38bdf8] hover:underline">
                          GitHub
                        </a>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={() => deleteProject(p.id)}
                    className="text-red-400 hover:text-red-500 p-2 cursor-pointer"
                    title="Delete project"
                  >
                    <FiTrash2 />
                  </button>
                </div>
              ))}
              {projects.length === 0 && (
                <p className="text-[#64748b] dark:text-[#94a3b8]">{loading.projects ? 'Loading...' : 'No projects found.'}</p>
              )}
            </div>
          </div>
        )}

        {/* Snippets Tab */}
        {activeTab === 'snippets' && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Code Snippets ({snippets.length})</h2>
              <button onClick={() => refresh('snippets')} className="text-[#38bdf8] hover:text-[#7dd3fc] cursor-pointer">
                <FiRefreshCw className={loading.snippets ? 'animate-spin' : ''} />
              </button>
            </div>

            <div className="space-y-3">
              {snippets.map((s) => (
                <div
                  key={s.id}
                  className="bg-[#e2e8f0] dark:bg-[#1e293b] border border-[#cbd5e1] dark:border-[#334155] rounded-xl overflow-hidden"
                >
                  <div className="flex items-center justify-between px-4 py-3 border-b border-[#cbd5e1] dark:border-[#334155]">
                    <div className="flex items-center gap-2">
                      <FiCode className="text-[#38bdf8]" />
                      <span className="font-semibold text-sm">{s.title}</span>
                      <span className="text-xs bg-[#38bdf8]/10 text-[#38bdf8] px-2 py-0.5 rounded">{s.language}</span>
                      {s.category && (
                        <span className="text-xs bg-[#22c55e]/10 text-[#22c55e] px-2 py-0.5 rounded">{s.category}</span>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-[#64748b] dark:text-[#94a3b8]">ID: {s.id}</span>
                      <button
                        onClick={() => deleteSnippet(s.id)}
                        className="text-red-400 hover:text-red-500 cursor-pointer"
                        title="Delete snippet"
                      >
                        <FiTrash2 />
                      </button>
                    </div>
                  </div>
                  <pre className="p-4 text-xs text-[#475569] dark:text-[#94a3b8] font-['JetBrains_Mono'] overflow-x-auto whitespace-pre">
                    {s.code}
                  </pre>
                  {s.description && (
                    <div className="px-4 pb-3 text-xs text-[#64748b] dark:text-[#475569]">{s.description}</div>
                  )}
                </div>
              ))}
              {snippets.length === 0 && (
                <p className="text-[#64748b] dark:text-[#94a3b8]">{loading.snippets ? 'Loading...' : 'No snippets found.'}</p>
              )}
            </div>
          </div>
        )}

        {/* API Reference Footer */}
        <div className="mt-10 bg-[#e2e8f0] dark:bg-[#1e293b] border border-[#cbd5e1] dark:border-[#334155] rounded-xl p-5">
          <h3 className="font-semibold mb-3">Developer API Reference</h3>
          <div className="grid md:grid-cols-2 gap-2 text-xs font-['JetBrains_Mono']">
            {[
              ['GET', '/api/health', 'Health check'],
              ['GET', '/api/analytics', 'Visitor analytics'],
              ['POST', '/api/analytics/track', 'Track a visit'],
              ['GET', '/api/resume/stats', 'Download count'],
              ['GET', '/api/resume/download', 'Download PDF'],
              ['GET', '/api/github/stats', 'GitHub stats'],
              ['GET', '/api/projects', 'List projects'],
              ['POST', '/api/projects', 'Create project'],
              ['PUT', '/api/projects/{id}', 'Update project'],
              ['DELETE', '/api/projects/{id}', 'Delete project'],
              ['GET', '/api/snippets', 'List snippets'],
              ['POST', '/api/snippets', 'Create snippet'],
              ['DELETE', '/api/snippets/{id}', 'Delete snippet'],
              ['POST', '/api/contact', 'Send contact email'],
            ].map(([method, url, desc]) => (
              <div key={url + method} className="flex items-center gap-2 py-1">
                <span
                  className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                    method === 'GET'
                      ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                      : method === 'POST'
                      ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                      : method === 'PUT'
                      ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                      : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                  }`}
                >
                  {method}
                </span>
                <span className="text-[#38bdf8]">{url}</span>
                <span className="text-[#64748b] dark:text-[#94a3b8]">— {desc}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
