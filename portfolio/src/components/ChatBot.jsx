import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiSend, FiUser } from 'react-icons/fi';
import { BsChatDotsFill, BsRobot } from 'react-icons/bs';

const knowledge = [
  {
    patterns: ['hi', 'hello', 'hey', 'hola', 'good morning', 'good evening', 'howdy', 'greetings', 'sup', 'yo'],
    response: "Hey there! 👋 I'm Dineshprabhu's portfolio assistant. I can tell you about his skills, experience, projects, education, or how to contact him. What would you like to know?",
  },
  {
    patterns: ['your name', 'who are you', 'who is this', 'whose portfolio', 'about you', 'about him', 'tell me about', 'introduce', 'who is dinesh'],
    response: "This is the portfolio of **Dineshprabhu A**, a Software Engineer specializing in Java & Spring Boot, currently working at Neurealm (formerly GS Lab — GAVS). He brings 1+ year of experience migrating legacy rules platforms to Java and building DSL-based backend systems.",
  },
  {
    patterns: ['skill', 'tech', 'technolog', 'stack', 'what do you know', 'programming', 'language', 'what can', 'java', 'spring', 'tool', 'proficien'],
    response: "Dineshprabhu's core skills include:\n\n🔹 **Languages**: Java, JavaScript, SQL, Perl, HTML/CSS\n🔹 **Frameworks & Technologies**: Spring, Spring Boot, Spring MVC, Spring Data JPA, Hibernate, Servlets, JDBC, React\n🔹 **Tools & Platforms**: Git, GitHub, Bitbucket, Jira, Postman, Grafana, OpenSearch, IntelliJ IDEA, Windsurf, MySQL\n\nHe is experienced in OOP, Stream API, REST API design, DSL design, schema design, and writing well-tested code."
  },
  {
    patterns: ['experience', 'work', 'job', 'company', 'career', 'current role', 'where do you work', 'neurealm', 'gavs', 'years of exp', 'how long', 'how many year'],
    response: "Dineshprabhu's work experience:\n\n🏢 **Software Engineer @ Neurealm (formerly GS Lab — GAVS)** (Mar 2025 – Present)\n📍 Chennai, TN | Full-time\n\n→ Migrated 15,000+ business rules from Perl to Java using Collections and Stream API\n→ Developed a Java-based DSL engine with 20+ operators and syntax/semantic validation\n→ Built REST APIs for rule authoring, version history, dark-launch deployment, and rollback\n→ Integrated claim-level metrics with Grafana for runtime monitoring\n→ Maintained 95%+ unit test coverage and managed Bitbucket PR workflows",
  },
  {
    patterns: ['education', 'college', 'university', 'degree', 'stud', 'qualification', 'cgpa', 'gpa', 'anna university', 'bit campus', 'ece', 'branch', 'stream'],
    response: "🎓 **B.E. in Electronics & Communication Engineering**\nAnna University — BIT Campus, Tiruchirappalli\n**CGPA: 8.26 / 10** (2020–2024)\n\nFirst Class with Distinction!",
  },
  {
    patterns: ['sslc', '10th', '10 mark', 'tenth', 'secondary school', 'high school mark'],
    response: "🏫 **SSLC (10th Standard)**\nGovernment High School, Tamil Nadu (2018)\n\nHighlights:\n✍️ First Class with Distinction in **Typewriting English** (Junior Grade)",
  },
  {
    patterns: ['hsc', '12th', '12 mark', 'twelfth', 'higher secondary', 'plus two', '+2'],
    response: "📚 **Higher Secondary (HSC / 12th)**\nGovernment Higher Secondary School, Tamil Nadu (2018–2020)\n\nSubjects: Mathematics, Physics, Computer Science",
  },
  {
    patterns: ['mark', 'score', 'percentage', 'result', 'grade', 'academic'],
    response: "📊 Academic Results:\n\n🎓 **B.E. ECE** — CGPA: **8.26/10** (Anna University BIT Campus)\n📚 **HSC (12th)** — Government Higher Secondary School\n🏫 **SSLC (10th)** — Government High School\n✍️ **Typewriting** — First Class with Distinction\n🏅 **NPTEL Java** — **84% Elite** (IIT Kharagpur)",
  },
  {
    patterns: ['project', 'built', 'develop', 'created', 'portfolio project', 'github', 'repo', 'repositor'],
    response: "Some key projects:\n\n🔹 **Portfolio Website** — Full-stack React + Spring Boot with admin dashboard, GitHub integration, PWA support & chatbot\n🔹 **Secure Healthcare Communication** — Research project using ECDH Key Exchange & AES Encryption\n\nCheck out more on GitHub: github.com/dineshprabhu-a",
  },
  {
    patterns: ['certif', 'nptel', 'coursera', 'course', 'certified', 'certificate'],
    response: "📜 Certifications:\n\n🔹 **NPTEL - Programming in Java** (IIT Kharagpur) — 84% Elite\n🔹 **HTML, CSS & JS for Web Devs** (Johns Hopkins / Coursera)\n🔹 **AI & Machine Learning** (Edunet Foundation)\n🔹 **IoT & Applications** (Asi@Connect)\n🔹 **Embedded Systems** (NSIC, Chennai)",
  },
  {
    patterns: ['contact', 'email', 'phone', 'reach', 'hire', 'connect', 'linkedin', 'how to contact', 'mail', 'number', 'call'],
    response: "You can reach Dineshprabhu at:\n\n📧 **Email**: dineshprabhu02ece@gmail.com\n📱 **Phone**: +91 9345733360\n🔗 **LinkedIn**: linkedin.com/in/dineshprabhu-a\n💻 **GitHub**: github.com/dineshprabhu-a\n🏆 **LeetCode**: leetcode.com/u/dineshprabhu-a\n📍 **Location**: Madurai, Tamil Nadu, India\n\nOr use the Contact form on this page!",
  },
  {
    patterns: ['achiev', 'award', 'publication', 'research', 'paper', 'ijnrd', 'nss', 'volunteer'],
    response: "🏆 Key Achievements:\n\n📄 **Research Publication** — Published in IJNRD on \"Secure Healthcare Communication using ECDH Key Exchange and AES Encryption\"\n🏅 **NPTEL Elite** — 84% in Programming in Java (IIT Kharagpur)\n✍️ **Typewriting** — First Class with Distinction\n🤝 **NSS Volunteer** — Community service & environmental drives",
  },
  {
    patterns: ['resume', 'cv', 'download'],
    response: "You can download Dineshprabhu's resume by clicking the **\"Download Resume\"** button in the Hero section at the top of this page! 📄",
  },
  {
    patterns: ['available', 'hiring', 'open to work', 'freelance', 'opportunit', 'looking for', 'salary', 'offer', 'interest'],
    response: "Dineshprabhu is currently working as a **Software Engineer at Neurealm** but is always open to discussing interesting opportunities. Feel free to reach out via the Contact section or email at dineshprabhu02ece@gmail.com! 🚀",
  },
  {
    patterns: ['location', 'where', 'city', 'based', 'from', 'live', 'address', 'place', 'hometown'],
    response: "📍 Dineshprabhu is from **Madurai, Tamil Nadu, India** and currently working in **Chennai**.",
  },
  {
    patterns: ['hobby', 'hobbies', 'interest', 'free time', 'fun', 'like to do', 'passion'],
    response: "Outside of coding, Dineshprabhu is interested in:\n\n💻 Building side projects & exploring new tech\n📖 Reading about system design & architecture\n🏆 Solving problems on LeetCode\n🤝 Volunteering (NSS Camp participant)\n📝 Writing research papers",
  },
  {
    patterns: ['strength', 'strong', 'best at', 'good at', 'specializ'],
    response: "Dineshprabhu's key strengths:\n\n🔹 **Java Backend Development** — Core Java, Spring Boot, REST APIs\n🔹 **Problem Solving** — Strong analytical and debugging skills\n🔹 **Test-Driven Development** — 95%+ code coverage at work\n🔹 **Quick Learner** — Self-taught web dev, embedded systems, and more\n🔹 **Team Collaboration** — Git workflows, code reviews, Jira",
  },
  {
    patterns: ['age', 'old', 'born', 'dob', 'birth'],
    response: "Dineshprabhu graduated in 2024 with a B.E. degree. For more personal details, feel free to reach out directly! 😊",
  },
  {
    patterns: ['salary', 'ctc', 'package', 'pay', 'compensation'],
    response: "Salary details are confidential. For any professional discussions, please reach out directly via email at **dineshprabhu02ece@gmail.com** or through the Contact form! 💼",
  },
  {
    patterns: ['thank', 'helpful', 'great', 'awesome', 'nice', 'cool', 'good', 'perfect', 'wonderful'],
    response: "You're welcome! 😊 If you have any other questions about Dineshprabhu's profile, feel free to ask. You can also scroll through the portfolio sections or reach out via the Contact form!",
  },
  {
    patterns: ['bye', 'goodbye', 'see you', 'later', 'quit', 'exit', 'close'],
    response: "Thanks for visiting! 👋 Feel free to come back anytime. Don't forget to check out the projects and reach out if you'd like to connect!",
  },
];

const quickReplies = [
  { label: '💼 Experience', value: 'Tell me about experience' },
  { label: '🛠️ Skills', value: 'What are your skills?' },
  { label: '🎓 Education', value: 'Tell me about education' },
  { label: '📧 Contact', value: 'How to contact?' },
  { label: '📜 Certifications', value: 'Show certifications' },
  { label: '🚀 Projects', value: 'What projects have you built?' },
];

function getBotResponse(input) {
  const lower = input.toLowerCase().trim();
  const words = lower.split(/\s+/);

  // Score each knowledge entry by how many patterns match
  let bestMatch = null;
  let bestScore = 0;

  for (const entry of knowledge) {
    let score = 0;
    for (const pattern of entry.patterns) {
      // Check if input contains the pattern OR any word starts with the pattern
      if (lower.includes(pattern)) {
        score += pattern.length; // longer matches score higher
      } else if (words.some((w) => w.startsWith(pattern) || pattern.startsWith(w))) {
        score += pattern.length * 0.5;
      }
    }
    if (score > bestScore) {
      bestScore = score;
      bestMatch = entry;
    }
  }

  if (bestMatch && bestScore > 0) {
    return bestMatch.response;
  }

  return "I'm not sure about that 🤔 Try asking about:\n\n🔹 **Skills** — tech stack & proficiency\n🔹 **Experience** — work history & internships\n🔹 **Projects** — what he's built\n🔹 **Education** — college, SSLC, HSC marks\n🔹 **Certifications** — NPTEL, Coursera, etc.\n🔹 **Contact** — email, phone, LinkedIn";
}

function formatMessage(text) {
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\n/g, '<br />');
}

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      from: 'bot',
      text: "Hey! 👋 I'm Dineshprabhu's portfolio assistant. Ask me anything about his skills, experience, or projects!",
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const sendMessage = (text) => {
    if (!text.trim()) return;
    const userMsg = { from: 'user', text: text.trim() };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const botReply = { from: 'bot', text: getBotResponse(text) };
      setMessages((prev) => [...prev, botReply]);
      setIsTyping(false);
    }, 600 + Math.random() * 600);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage(input);
  };

  return (
    <>
      {/* Floating Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#38bdf8] text-[#0f172a] rounded-full shadow-lg shadow-[#38bdf8]/30 flex items-center justify-center text-2xl cursor-pointer hover:bg-[#7dd3fc] transition-colors"
            aria-label="Open chat"
          >
            <BsChatDotsFill />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="fixed bottom-6 right-6 z-50 w-[360px] max-w-[calc(100vw-2rem)] h-[520px] max-h-[calc(100vh-3rem)] bg-[#f0f4f8] dark:bg-[#1e293b] border border-[#cbd5e1] dark:border-[#334155] rounded-2xl shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-[#38bdf8] px-4 py-3 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-[#0f172a]/20 rounded-full flex items-center justify-center text-sm text-white">
                  <BsRobot />
                </div>
                <div>
                  <p className="text-[#0f172a] font-semibold text-sm">Portfolio Assistant</p>
                  <p className="text-[#0f172a]/60 text-[10px]">Ask me anything</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-[#0f172a]/70 hover:text-[#0f172a] text-lg cursor-pointer p-1"
                aria-label="Close chat"
              >
                <FiX />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`flex items-end gap-1.5 max-w-[85%] ${msg.from === 'user' ? 'flex-row-reverse' : ''}`}>
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] shrink-0 ${
                        msg.from === 'user'
                          ? 'bg-[#38bdf8]/20 text-[#38bdf8]'
                          : 'bg-[#c084fc]/20 text-[#c084fc]'
                      }`}
                    >
                      {msg.from === 'user' ? <FiUser /> : <BsRobot />}
                    </div>
                    <div
                      className={`rounded-2xl px-3.5 py-2.5 text-[13px] leading-relaxed ${
                        msg.from === 'user'
                          ? 'bg-[#38bdf8] text-[#0f172a] rounded-br-sm'
                          : 'bg-[#e2e8f0] dark:bg-[#0f172a] text-[#1e293b] dark:text-[#f8fafc] rounded-bl-sm'
                      }`}
                      dangerouslySetInnerHTML={{ __html: formatMessage(msg.text) }}
                    />
                  </div>
                </div>
              ))}

              {/* Typing Indicator */}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="flex items-end gap-1.5">
                    <div className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] shrink-0 bg-[#c084fc]/20 text-[#c084fc]">
                      <BsRobot />
                    </div>
                    <div className="bg-[#e2e8f0] dark:bg-[#0f172a] rounded-2xl rounded-bl-sm px-4 py-3 flex gap-1">
                      <span className="w-2 h-2 bg-[#94a3b8] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-2 h-2 bg-[#94a3b8] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-2 h-2 bg-[#94a3b8] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Replies */}
            {messages.length <= 1 && (
              <div className="px-4 pb-2 flex flex-wrap gap-1.5 shrink-0">
                {quickReplies.map((q) => (
                  <button
                    key={q.label}
                    onClick={() => sendMessage(q.value)}
                    className="text-[11px] bg-[#38bdf8]/10 text-[#38bdf8] border border-[#38bdf8]/20 rounded-full px-3 py-1 hover:bg-[#38bdf8]/20 transition-colors cursor-pointer"
                  >
                    {q.label}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <form onSubmit={handleSubmit} className="px-3 py-3 border-t border-[#cbd5e1] dark:border-[#334155] shrink-0">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask me anything..."
                  className="flex-1 bg-[#e2e8f0] dark:bg-[#0f172a] border border-[#cbd5e1] dark:border-[#334155] rounded-full px-4 py-2 text-sm text-[#1e293b] dark:text-[#f8fafc] placeholder-[#94a3b8] focus:border-[#38bdf8] focus:outline-none transition-colors"
                />
                <button
                  type="submit"
                  disabled={!input.trim()}
                  className="w-9 h-9 bg-[#38bdf8] text-[#0f172a] rounded-full flex items-center justify-center hover:bg-[#7dd3fc] transition-colors disabled:opacity-40 cursor-pointer shrink-0"
                >
                  <FiSend className="text-sm" />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
