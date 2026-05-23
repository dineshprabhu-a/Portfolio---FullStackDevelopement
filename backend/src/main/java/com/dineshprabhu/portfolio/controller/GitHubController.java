package com.dineshprabhu.portfolio.controller;

import com.dineshprabhu.portfolio.service.GitHubService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/github")
public class GitHubController {

    private final GitHubService gitHubService;

    public GitHubController(GitHubService gitHubService) {
        this.gitHubService = gitHubService;
    }

    @GetMapping("/stats")
    public ResponseEntity<Map<String, Object>> getGitHubStats() {
        return ResponseEntity.ok(gitHubService.getGitHubStats());
    }

    @GetMapping("/repos")
    public ResponseEntity<List<Map<String, Object>>> getGitHubRepos() {
        return ResponseEntity.ok(gitHubService.getGitHubRepos());
    }
}
