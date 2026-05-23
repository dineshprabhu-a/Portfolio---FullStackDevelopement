package com.dineshprabhu.portfolio.service;

import com.dineshprabhu.portfolio.entity.ResumeDownload;
import com.dineshprabhu.portfolio.repository.ResumeDownloadRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class ResumeService {

    private static final Logger logger = LoggerFactory.getLogger(ResumeService.class);

    private final ResumeDownloadRepository repository;

    @Value("${resume.file-path}")
    private String resumeFilePath;

    public ResumeService(ResumeDownloadRepository repository) {
        this.repository = repository;
    }

    public Resource getResumeFile() {
        Resource resource = new FileSystemResource(resumeFilePath);
        if (!resource.exists()) {
            throw new RuntimeException("Resume file not found at: " + resumeFilePath);
        }
        return resource;
    }

    public void trackDownload(String ipAddress, String userAgent) {
        ResumeDownload download = new ResumeDownload(ipAddress, userAgent);
        repository.save(download);
        logger.info("Resume downloaded from IP: {}", ipAddress);
    }

    public Map<String, Object> getDownloadStats() {
        Map<String, Object> stats = new HashMap<>();
        stats.put("totalDownloads", repository.count());
        return stats;
    }
}
