import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX, FiSun, FiMoon } from 'react-icons/fi';
import { useTheme } from '../context/ThemeContext';

const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Education', href: '#education' },
  { name: 'Projects', href: '#projects' },
  { name: 'Certifications', href: '#certifications' },
  { name: 'Achievements', href: '#achievements' },
  { name: 'Experience', href: '#experience' },
  { name: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const { darkMode, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);

      const sections = navLinks.map((l) => l.href.replace('#', ''));
      let current = 'home';
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 120) {
          current = id;
        }
      }
      setActiveSection(current);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#f0f4f8]/90 dark:bg-[#0f172a]/90 backdrop-blur-md shadow-lg shadow-black/10 dark:shadow-black/20'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <a href="#home" className="text-xl font-bold text-[#38bdf8] font-['JetBrains_Mono']">
          &lt;DP /&gt;
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          <ul className="flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  className={`text-sm transition-colors duration-300 ${activeSection === link.href.replace('#', '') ? 'text-[#38bdf8] font-medium' : 'text-[#64748b] dark:text-[#94a3b8] hover:text-[#38bdf8]'}`}
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg bg-[#e2e8f0] dark:bg-[#1e293b] text-[#64748b] dark:text-[#94a3b8] hover:text-[#38bdf8] transition-colors duration-300 cursor-pointer"
            aria-label="Toggle theme"
          >
            {darkMode ? <FiSun className="text-lg" /> : <FiMoon className="text-lg" />}
          </button>
        </div>

        {/* Mobile Toggle */}
        <div className="flex md:hidden items-center gap-3">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg bg-[#e2e8f0] dark:bg-[#1e293b] text-[#64748b] dark:text-[#94a3b8] hover:text-[#38bdf8] transition-colors duration-300 cursor-pointer"
            aria-label="Toggle theme"
          >
            {darkMode ? <FiSun /> : <FiMoon />}
          </button>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="text-[#1e293b] dark:text-[#f8fafc] text-2xl cursor-pointer"
          >
            {mobileOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#f0f4f8]/95 dark:bg-[#0f172a]/95 backdrop-blur-md border-t border-[#dbe2eb] dark:border-[#1e293b]"
          >
            <ul className="flex flex-col items-center gap-6 py-6">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={`transition-colors duration-300 ${activeSection === link.href.replace('#', '') ? 'text-[#38bdf8] font-medium' : 'text-[#64748b] dark:text-[#94a3b8] hover:text-[#38bdf8]'}`}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
