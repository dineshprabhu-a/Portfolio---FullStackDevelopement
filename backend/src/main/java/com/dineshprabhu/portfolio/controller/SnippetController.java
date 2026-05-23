package com.dineshprabhu.portfolio.controller;

import com.dineshprabhu.portfolio.entity.CodeSnippet;
import com.dineshprabhu.portfolio.service.SnippetService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/snippets")
public class SnippetController {

    private final SnippetService snippetService;

    public SnippetController(SnippetService snippetService) {
        this.snippetService = snippetService;
    }

    @GetMapping
    public ResponseEntity<List<CodeSnippet>> getAllSnippets(
            @RequestParam(required = false) String category,
            @RequestParam(required = false) String language) {

        if (category != null) {
            return ResponseEntity.ok(snippetService.getByCategory(category));
        }
        if (language != null) {
            return ResponseEntity.ok(snippetService.getByLanguage(language));
        }
        return ResponseEntity.ok(snippetService.getAllSnippets());
    }

    @GetMapping("/{id}")
    public ResponseEntity<CodeSnippet> getSnippetById(@PathVariable Long id) {
        return ResponseEntity.ok(snippetService.getById(id));
    }

    @PostMapping
    public ResponseEntity<CodeSnippet> createSnippet(@RequestBody CodeSnippet snippet) {
        return ResponseEntity.ok(snippetService.create(snippet));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSnippet(@PathVariable Long id) {
        snippetService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
