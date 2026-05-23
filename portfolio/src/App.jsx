import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import SoftSkills from './components/SoftSkills';
import Education from './components/Education';
import Projects from './components/Projects';
import GitHubStats from './components/GitHubStats';
import CodeSnippets from './components/CodeSnippets';
import Certifications from './components/Certifications';
import Achievements from './components/Achievements';
import Experience from './components/Experience';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ScrollProgress from './components/ScrollProgress';
import BackToTop from './components/BackToTop';
import ChatBot from './components/ChatBot';
import { usePageTracker } from './hooks/useAnalytics';

function App() {
  usePageTracker();

  return (
    <div className="min-h-screen bg-[#f0f4f8] dark:bg-[#0f172a] text-[#1e293b] dark:text-[#f8fafc] transition-colors duration-300">
      <ScrollProgress />
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <SoftSkills />
      <Education />
      <Projects />
      <GitHubStats />
      <CodeSnippets />
      <Certifications />
      <Achievements />
      <Experience />
      <Contact />
      <Footer />
      <BackToTop />
      <ChatBot />
    </div>
  );
}

export default App;
