package com.dineshprabhu.portfolio.repository;

import com.dineshprabhu.portfolio.entity.CodeSnippet;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface CodeSnippetRepository extends JpaRepository<CodeSnippet, Long> {
    List<CodeSnippet> findByCategory(String category);
    List<CodeSnippet> findByLanguage(String language);
    List<CodeSnippet> findAllByOrderByCreatedAtDesc();
}
