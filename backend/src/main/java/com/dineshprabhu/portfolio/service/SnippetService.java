package com.dineshprabhu.portfolio.service;

import com.dineshprabhu.portfolio.entity.CodeSnippet;
import com.dineshprabhu.portfolio.repository.CodeSnippetRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SnippetService {

    private final CodeSnippetRepository repository;

    public SnippetService(CodeSnippetRepository repository) {
        this.repository = repository;
    }

    public List<CodeSnippet> getAllSnippets() {
        return repository.findAllByOrderByCreatedAtDesc();
    }

    public List<CodeSnippet> getByCategory(String category) {
        return repository.findByCategory(category);
    }

    public List<CodeSnippet> getByLanguage(String language) {
        return repository.findByLanguage(language);
    }

    public CodeSnippet getById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Snippet not found with id: " + id));
    }

    public CodeSnippet create(CodeSnippet snippet) {
        return repository.save(snippet);
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }
}
