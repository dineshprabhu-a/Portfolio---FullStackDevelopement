package com.dineshprabhu.portfolio.service;

import com.dineshprabhu.portfolio.entity.VisitorLog;
import com.dineshprabhu.portfolio.repository.VisitorLogRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@Service
public class AnalyticsService {

    private final VisitorLogRepository repository;

    public AnalyticsService(VisitorLogRepository repository) {
        this.repository = repository;
    }

    public void trackVisit(String ipAddress, String userAgent, String page, String section) {
        VisitorLog log = new VisitorLog(ipAddress, userAgent, page, section);
        repository.save(log);
    }

    public Map<String, Object> getAnalytics() {
        Map<String, Object> stats = new HashMap<>();

        stats.put("totalVisits", repository.count());
        stats.put("uniqueVisitors", repository.countUniqueVisitors());

        // Last 24 hours
        LocalDateTime last24h = LocalDateTime.now().minusHours(24);
        stats.put("visitsLast24h", repository.countByVisitedAtAfter(last24h));
        stats.put("uniqueVisitorsLast24h", repository.countUniqueVisitorsAfter(last24h));

        // Last 7 days
        LocalDateTime last7d = LocalDateTime.now().minusDays(7);
        stats.put("visitsLast7d", repository.countByVisitedAtAfter(last7d));
        stats.put("uniqueVisitorsLast7d", repository.countUniqueVisitorsAfter(last7d));

        // Section popularity
        Map<String, Long> sectionStats = new HashMap<>();
        String[] sections = {"home", "about", "skills", "projects", "experience", "contact"};
        for (String s : sections) {
            sectionStats.put(s, repository.countBySection(s));
        }
        stats.put("sectionViews", sectionStats);

        return stats;
    }
}
