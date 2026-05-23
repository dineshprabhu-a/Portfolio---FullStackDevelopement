package com.dineshprabhu.portfolio.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "visitor_logs")
public class VisitorLog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "ip_address")
    private String ipAddress;

    private String userAgent;

    private String page;

    private String section;

    @Column(name = "visited_at")
    private LocalDateTime visitedAt;

    @PrePersist
    protected void onCreate() {
        visitedAt = LocalDateTime.now();
    }

    public VisitorLog() {}

    public VisitorLog(String ipAddress, String userAgent, String page, String section) {
        this.ipAddress = ipAddress;
        this.userAgent = userAgent;
        this.page = page;
        this.section = section;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getIpAddress() { return ipAddress; }
    public void setIpAddress(String ipAddress) { this.ipAddress = ipAddress; }

    public String getUserAgent() { return userAgent; }
    public void setUserAgent(String userAgent) { this.userAgent = userAgent; }

    public String getPage() { return page; }
    public void setPage(String page) { this.page = page; }

    public String getSection() { return section; }
    public void setSection(String section) { this.section = section; }

    public LocalDateTime getVisitedAt() { return visitedAt; }
    public void setVisitedAt(LocalDateTime visitedAt) { this.visitedAt = visitedAt; }
}
