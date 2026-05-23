package com.dineshprabhu.portfolio.controller;

import com.dineshprabhu.portfolio.service.ResumeService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/resume")
public class ResumeController {

    private final ResumeService resumeService;

    public ResumeController(ResumeService resumeService) {
        this.resumeService = resumeService;
    }

    @GetMapping("/download")
    public ResponseEntity<Resource> downloadResume(HttpServletRequest request) {
        String ip = getClientIp(request);
        String userAgent = request.getHeader("User-Agent");

        resumeService.trackDownload(ip, userAgent);
        Resource file = resumeService.getResumeFile();

        return ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_PDF)
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"Dineshprabhu_A_Resume.pdf\"")
                .body(file);
    }

    @GetMapping("/stats")
    public ResponseEntity<Map<String, Object>> getDownloadStats() {
        return ResponseEntity.ok(resumeService.getDownloadStats());
    }

    private String getClientIp(HttpServletRequest request) {
        String xForwardedFor = request.getHeader("X-Forwarded-For");
        if (xForwardedFor != null && !xForwardedFor.isEmpty()) {
            return xForwardedFor.split(",")[0].trim();
        }
        return request.getRemoteAddr();
    }
}
