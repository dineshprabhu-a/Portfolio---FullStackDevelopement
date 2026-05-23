import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowUp } from 'react-icons/fi';

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          onClick={scrollToTop}
          className="fixed bottom-24 right-6 z-40 w-11 h-11 rounded-full bg-[#38bdf8] text-[#0f172a] shadow-lg shadow-[#38bdf8]/25 flex items-center justify-center hover:bg-[#7dd3fc] transition-colors cursor-pointer"
          aria-label="Back to top"
        >
          <FiArrowUp className="text-lg" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
