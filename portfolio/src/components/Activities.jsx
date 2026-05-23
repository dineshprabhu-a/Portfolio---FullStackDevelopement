import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiHeart, FiMapPin, FiCalendar } from 'react-icons/fi';

const activities = [
  {
    title: 'NSS Camp Volunteer',
    organization: 'National Service Scheme',
    location: 'Nadupatti, Tiruchirappalli, TN',
    period: 'College',
    description:
      'Participated in a week-long NSS camp in Nadupatti, Trichy, engaging in student tutoring, mentoring, tree planting, and campus cleaning. Contributed to community welfare and promoted social awareness through active involvement.',
    highlights: ['Student Tutoring', 'Mentoring', 'Tree Planting', 'Campus Cleaning', 'Community Welfare'],
    icon: '🇮🇳',
  },
];

export default function Activities() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.15 });

  return (
    <section id="activities" className="py-24 px-6">
      <div ref={ref} className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            Extra <span className="text-[#38bdf8]">Activities</span>
          </h2>
          <div className="w-20 h-1 bg-[#38bdf8] mx-auto rounded-full mb-12" />

          <div className="space-y-6">
            {activities.map((activity, i) => (
              <motion.div
                key={activity.title}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.15 + i * 0.15 }}
                className="bg-[#e2e8f0] dark:bg-[#1e293b] border border-[#cbd5e1] dark:border-[#334155] rounded-xl p-6 hover:border-[#38bdf8]/40 transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="text-4xl">{activity.icon}</div>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-3 mb-2">
                      <h3 className="text-lg font-bold text-[#1e293b] dark:text-[#f8fafc]">{activity.title}</h3>
                      <span className="text-xs bg-[#38bdf8]/10 text-[#38bdf8] px-2.5 py-0.5 rounded-full font-medium">
                        {activity.organization}
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-4 text-xs text-[#64748b] dark:text-[#94a3b8] mb-3">
                      <span className="flex items-center gap-1">
                        <FiMapPin className="text-[#38bdf8]" /> {activity.location}
                      </span>
                    </div>

                    <p className="text-sm text-[#64748b] dark:text-[#94a3b8] leading-relaxed mb-4">
                      {activity.description}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {activity.highlights.map((h) => (
                        <span
                          key={h}
                          className="text-xs bg-[#22c55e]/10 text-[#22c55e] border border-[#22c55e]/20 rounded-full px-3 py-1"
                        >
                          {h}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
