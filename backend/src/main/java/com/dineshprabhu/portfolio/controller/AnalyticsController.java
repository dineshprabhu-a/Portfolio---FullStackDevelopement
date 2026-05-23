package com.dineshprabhu.portfolio.controller;

import com.dineshprabhu.portfolio.service.AnalyticsService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/analytics")
public class AnalyticsController {

    private final AnalyticsService analyticsService;

    public AnalyticsController(AnalyticsService analyticsService) {
        this.analyticsService = analyticsService;
    }

    @PostMapping("/track")
    public ResponseEntity<Map<String, String>> trackVisit(
            @RequestBody Map<String, String> body,
            HttpServletRequest request) {

        String ip = getClientIp(request);
        String userAgent = request.getHeader("User-Agent");
        String page = body.getOrDefault("page", "/");
        String section = body.getOrDefault("section", "home");

        analyticsService.trackVisit(ip, userAgent, page, section);
        return ResponseEntity.ok(Map.of("status", "tracked"));
    }

    @GetMapping
    public ResponseEntity<Map<String, Object>> getAnalytics() {
        return ResponseEntity.ok(analyticsService.getAnalytics());
    }

    private String getClientIp(HttpServletRequest request) {
        String xForwardedFor = request.getHeader("X-Forwarded-For");
        if (xForwardedFor != null && !xForwardedFor.isEmpty()) {
            return xForwardedFor.split(",")[0].trim();
        }
        return request.getRemoteAddr();
    }
}
