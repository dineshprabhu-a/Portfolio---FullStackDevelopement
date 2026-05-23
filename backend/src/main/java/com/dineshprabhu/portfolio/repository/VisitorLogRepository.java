package com.dineshprabhu.portfolio.repository;

import com.dineshprabhu.portfolio.entity.VisitorLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.time.LocalDateTime;

public interface VisitorLogRepository extends JpaRepository<VisitorLog, Long> {

    long count();

    @Query("SELECT COUNT(DISTINCT v.ipAddress) FROM VisitorLog v")
    long countUniqueVisitors();

    long countByVisitedAtAfter(LocalDateTime after);

    @Query("SELECT COUNT(DISTINCT v.ipAddress) FROM VisitorLog v WHERE v.visitedAt > :after")
    long countUniqueVisitorsAfter(LocalDateTime after);

    long countBySection(String section);
}
