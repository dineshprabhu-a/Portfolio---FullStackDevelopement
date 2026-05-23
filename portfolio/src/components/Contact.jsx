import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiSend, FiMail, FiPhone, FiMapPin } from 'react-icons/fi';
import { API_BASE, RECAPTCHA_SITE_KEY } from '../config/api';

export default function Contact() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.15 });
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle | sending | success | error
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const getRecaptchaToken = () => {
    return new Promise((resolve) => {
      if (!RECAPTCHA_SITE_KEY || !window.grecaptcha) {
        resolve('');
        return;
      }
      window.grecaptcha.ready(() => {
        window.grecaptcha
          .execute(RECAPTCHA_SITE_KEY, { action: 'contact' })
          .then(resolve)
          .catch(() => resolve(''));
      });
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    setErrorMsg('');
    try {
      const recaptchaToken = await getRecaptchaToken();
      const headers = { 'Content-Type': 'application/json' };
      if (recaptchaToken) headers['X-Recaptcha-Token'] = recaptchaToken;

      const res = await fetch(`${API_BASE}/api/contact`, {
        method: 'POST',
        headers,
        body: JSON.stringify(form),
      });
      const data = await res.json().catch(() => null);
      if (res.ok) {
        setStatus('success');
        setForm({ name: '', email: '', message: '' });
      } else {
        setStatus('error');
        setErrorMsg(data?.message || '');
      }
    } catch {
      setStatus('error');
      setErrorMsg('');
    }
  };

  const infoItems = [
    { icon: <FiMail />, label: 'Email', value: 'dineshprabhu02ece@gmail.com', href: 'mailto:dineshprabhu02ece@gmail.com', breakWord: true },
    { icon: <FiPhone />, label: 'Phone', value: '+91 9345733360', href: 'tel:+919345733360' },
    { icon: <FiMapPin />, label: 'Location', value: 'Madurai, Tamil Nadu, India', href: null },
  ];

  return (
    <section id="contact" className="py-24 px-4 sm:px-6">
      <div ref={ref} className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            Get In <span className="text-[#38bdf8]">Touch</span>
          </h2>
          <div className="w-20 h-1 bg-[#38bdf8] mx-auto rounded-full mb-4" />
          <p className="text-center text-[#64748b] dark:text-[#94a3b8] mb-12 max-w-xl mx-auto">
            I'm currently open to new opportunities. Whether you have a question or just want to say hi, feel free to reach out!
          </p>

          <div className="grid md:grid-cols-5 gap-10">
            {/* Contact Info */}
            <div className="md:col-span-2 space-y-6">
              {infoItems.map((item) => (
                <div
                  key={item.label}
                  className="flex items-start gap-4 bg-[#e2e8f0] dark:bg-[#1e293b] border border-[#cbd5e1] dark:border-[#334155] rounded-xl p-5 hover:border-[#38bdf8]/40 transition-colors duration-300"
                >
                  <div className="text-[#38bdf8] text-xl mt-0.5">{item.icon}</div>
                  <div>
                    <p className="text-[#1e293b] dark:text-[#f8fafc] font-medium text-sm">{item.label}</p>
                    {item.href ? (
                      <a href={item.href} className={`text-[#64748b] dark:text-[#94a3b8] text-sm hover:text-[#38bdf8] transition-colors ${item.breakWord ? 'break-all' : ''}`}>
                        {item.value}
                      </a>
                    ) : (
                      <p className="text-[#64748b] dark:text-[#94a3b8] text-sm">{item.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="md:col-span-3 space-y-5">
              <div>
                <label htmlFor="name" className="block text-sm text-[#64748b] dark:text-[#94a3b8] mb-2">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={form.name}
                  onChange={handleChange}
                  className="w-full bg-[#e2e8f0] dark:bg-[#1e293b] border border-[#cbd5e1] dark:border-[#334155] rounded-lg px-4 py-3 text-[#1e293b] dark:text-[#f8fafc] placeholder-[#94a3b8] dark:placeholder-[#475569] focus:border-[#38bdf8] focus:outline-none transition-colors duration-300"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm text-[#64748b] dark:text-[#94a3b8] mb-2">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  className="w-full bg-[#e2e8f0] dark:bg-[#1e293b] border border-[#cbd5e1] dark:border-[#334155] rounded-lg px-4 py-3 text-[#1e293b] dark:text-[#f8fafc] placeholder-[#94a3b8] dark:placeholder-[#475569] focus:border-[#38bdf8] focus:outline-none transition-colors duration-300"
                  placeholder="your.email@example.com"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm text-[#64748b] dark:text-[#94a3b8] mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows="5"
                  value={form.message}
                  onChange={handleChange}
                  className="w-full bg-[#e2e8f0] dark:bg-[#1e293b] border border-[#cbd5e1] dark:border-[#334155] rounded-lg px-4 py-3 text-[#1e293b] dark:text-[#f8fafc] placeholder-[#94a3b8] dark:placeholder-[#475569] focus:border-[#38bdf8] focus:outline-none transition-colors duration-300 resize-none"
                  placeholder="Your message..."
                />
              </div>

              <button
                type="submit"
                disabled={status === 'sending'}
                className="inline-flex items-center gap-2 bg-[#38bdf8] text-[#0f172a] px-8 py-3 rounded-lg font-semibold hover:bg-[#7dd3fc] transition-colors duration-300 disabled:opacity-60 cursor-pointer"
              >
                {status === 'sending' ? 'Sending...' : 'Send Message'} <FiSend />
              </button>

              {status === 'success' && (
                <p className="text-[#22c55e] text-sm mt-2">Message sent successfully! I'll get back to you soon.</p>
              )}
              {status === 'error' && (
                <p className="text-[#ef4444] text-sm mt-2">
                  {errorMsg || 'Something went wrong.'}{' '}
                  <a href="mailto:dineshprabhu02ece@gmail.com" className="underline hover:text-[#38bdf8] transition-colors">
                    Email me directly
                  </a>
                </p>
              )}
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
