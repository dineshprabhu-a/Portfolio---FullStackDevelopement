import { Link } from 'react-router-dom';
import { FiGithub, FiLinkedin, FiMail, FiHeart } from 'react-icons/fi';

const socialLinks = [
  { icon: <FiGithub />, href: 'https://github.com/dineshprabhu-a', label: 'GitHub' },
  { icon: <FiLinkedin />, href: 'https://www.linkedin.com/in/dineshprabhu-a/', label: 'LinkedIn' },
  { icon: <FiMail />, href: 'mailto:dineshprabhu02ece@gmail.com', label: 'Email' },
];

export default function Footer() {
  return (
    <footer className="border-t border-[#cbd5e1] dark:border-[#1e293b] py-8 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
        <p className="text-[#64748b] dark:text-[#94a3b8] text-sm font-['JetBrains_Mono']">
          &lt;DP /&gt;
        </p>

        <div className="flex items-center gap-5">
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.label}
              className="text-[#64748b] dark:text-[#94a3b8] text-xl hover:text-[#38bdf8] transition-colors duration-300"
            >
              {link.icon}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <p className="text-[#94a3b8] dark:text-[#475569] text-xs flex items-center gap-1">
            Built with <FiHeart className="text-[#38bdf8] text-sm" /> using React + Spring Boot
          </p>
          <Link
            to="/admin"
            className="text-[#94a3b8]/50 dark:text-[#475569]/50 text-[10px] hover:text-[#38bdf8] transition-colors"
          >
            admin
          </Link>
        </div>
      </div>
    </footer>
  );
}
