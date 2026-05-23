import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiDownload, FiArrowRight, FiGithub, FiLinkedin, FiMail } from 'react-icons/fi';
import { SiLeetcode } from 'react-icons/si';
import { API_BASE } from '../config/api';

const terminalLines = [
  '> Java Backend Developer',
  '> Spring Boot Engineer',
  '> Building scalable REST APIs',
];

export default function Hero() {
  const [displayedLines, setDisplayedLines] = useState([]);
  const [currentLine, setCurrentLine] = useState(0);
  const [currentChar, setCurrentChar] = useState(0);

  useEffect(() => {
    if (currentLine >= terminalLines.length) return;

    const line = terminalLines[currentLine];
    if (currentChar < line.length) {
      const timer = setTimeout(() => {
        setDisplayedLines((prev) => {
          const updated = [...prev];
          updated[currentLine] = line.substring(0, currentChar + 1);
          return updated;
        });
        setCurrentChar((c) => c + 1);
      }, 40);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => {
        setCurrentLine((l) => l + 1);
        setCurrentChar(0);
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [currentLine, currentChar]);

  return (
    <section id="home" className="min-h-screen flex items-center pt-20 pb-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 w-full grid md:grid-cols-2 gap-8 md:gap-12 items-center">
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <p className="text-[#38bdf8] font-['JetBrains_Mono'] text-sm mb-3 tracking-wider">
            Hello, I'm
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4">
            Dineshprabhu{' '}
            <span className="text-[#38bdf8]">A</span>
          </h1>
          <p className="text-[#64748b] dark:text-[#94a3b8] text-base md:text-lg mb-6">
            Software Engineer specializing in Java & Spring Boot
          </p>

          {/* Terminal */}
          <div className="bg-[#e2e8f0] dark:bg-[#0c1322] border border-[#cbd5e1] dark:border-[#1e293b] rounded-lg p-4 mb-8 font-['JetBrains_Mono'] text-sm">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-3 h-3 rounded-full bg-[#ef4444]"></span>
              <span className="w-3 h-3 rounded-full bg-[#eab308]"></span>
              <span className="w-3 h-3 rounded-full bg-[#22c55e]"></span>
              <span className="ml-2 text-[#475569] text-xs">terminal</span>
            </div>
            <div className="space-y-1">
              {displayedLines.map((line, i) => (
                <div key={i} className="text-[#38bdf8]">
                  {line}
                  {i === currentLine && (
                    <span className="inline-block w-2 h-4 bg-[#38bdf8] ml-1 animate-pulse" />
                  )}
                </div>
              ))}
              {currentLine < terminalLines.length && displayedLines.length <= currentLine && (
                <div className="text-[#38bdf8]">
                  <span className="inline-block w-2 h-4 bg-[#38bdf8] animate-pulse" />
                </div>
              )}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-wrap gap-3 sm:gap-4">
            <a
              href="#projects"
              className="inline-flex items-center gap-2 bg-[#38bdf8] text-[#0f172a] px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg font-semibold hover:bg-[#7dd3fc] transition-colors duration-300 text-sm sm:text-base"
            >
              View Projects <FiArrowRight />
            </a>
            <a
              href={`${API_BASE}/api/resume/download`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-[#38bdf8] text-[#38bdf8] px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg font-semibold hover:bg-[#38bdf8]/10 transition-colors duration-300 text-sm sm:text-base"
            >
              Download Resume <FiDownload />
            </a>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4 mt-6">
            {[
              { icon: <FiGithub />, href: 'https://github.com/dineshprabhu-a', label: 'GitHub' },
              { icon: <FiLinkedin />, href: 'https://www.linkedin.com/in/dineshprabhu-a', label: 'LinkedIn' },
              { icon: <SiLeetcode />, href: 'https://leetcode.com/u/dineshprabhu-a', label: 'LeetCode' },
              { icon: <FiMail />, href: 'mailto:dineshprabhu02ece@gmail.com', label: 'Email' },
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                title={link.label}
                className="w-10 h-10 flex items-center justify-center rounded-full border border-[#cbd5e1] dark:border-[#334155] text-[#64748b] dark:text-[#94a3b8] hover:border-[#38bdf8] hover:text-[#38bdf8] hover:bg-[#38bdf8]/10 transition-all duration-300 text-lg"
              >
                {link.icon}
              </a>
            ))}
          </div>
        </motion.div>

        {/* Right — Code Illustration */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut', delay: 0.2 }}
          className="hidden md:flex justify-center"
        >
          <div className="relative w-80 h-80 lg:w-96 lg:h-96">
            {/* Glowing backdrop */}
            <div className="absolute inset-0 bg-[#38bdf8]/10 rounded-full blur-3xl" />
            {/* Code block illustration */}
            <div className="relative bg-[#e2e8f0] dark:bg-[#1e293b] border border-[#cbd5e1] dark:border-[#334155] rounded-2xl p-6 font-['JetBrains_Mono'] text-xs leading-relaxed shadow-2xl">
              <div className="flex items-center gap-2 mb-4">
                <span className="w-3 h-3 rounded-full bg-[#ef4444]"></span>
                <span className="w-3 h-3 rounded-full bg-[#eab308]"></span>
                <span className="w-3 h-3 rounded-full bg-[#22c55e]"></span>
                <span className="ml-2 text-[#475569]">DineshController.java</span>
              </div>
              <pre className="text-[#94a3b8]">
<span className="text-[#c084fc]">@RestController</span>{'\n'}
<span className="text-[#c084fc]">@RequestMapping</span>(<span className="text-[#fbbf24]">"/api"</span>){'\n'}
<span className="text-[#38bdf8]">public class</span> <span className="text-[#22c55e]">DineshController</span> {'{'}{'\n'}
{'\n'}
{'  '}<span className="text-[#c084fc]">@GetMapping</span>(<span className="text-[#fbbf24]">"/about"</span>){'\n'}
{'  '}<span className="text-[#38bdf8]">public</span> ResponseEntity{'<'}String{'>'}{'\n'}
{'  '}getAbout() {'{'}{'\n'}
{'    '}<span className="text-[#38bdf8]">return</span> ResponseEntity{'\n'}
{'      '}.ok(<span className="text-[#fbbf24]">"Backend Dev 🚀"</span>);{'\n'}
{'  '}{'}'}{'\n'}
{'}'}
              </pre>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
