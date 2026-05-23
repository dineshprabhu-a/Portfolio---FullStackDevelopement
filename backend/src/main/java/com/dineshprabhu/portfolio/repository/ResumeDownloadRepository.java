package com.dineshprabhu.portfolio.repository;

import com.dineshprabhu.portfolio.entity.ResumeDownload;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ResumeDownloadRepository extends JpaRepository<ResumeDownload, Long> {
    long count();
}
