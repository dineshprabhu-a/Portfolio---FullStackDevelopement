package com.dineshprabhu.portfolio.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import javax.net.ssl.*;
import java.security.cert.X509Certificate;
import java.util.*;

@Service
public class GitHubService {

    private static final Logger logger = LoggerFactory.getLogger(GitHubService.class);

    private final RestTemplate restTemplate;

    @Value("${github.username}")
    private String username;

    @Value("${github.token:}")
    private String token;

    @Value("${github.api-url}")
    private String apiUrl;

    public GitHubService() {
        this.restTemplate = createTrustAllRestTemplate();
    }

    private volatile Map<String, Object> cachedStats = null;

    @SuppressWarnings("unchecked")
    public Map<String, Object> getGitHubStats() {
        if (cachedStats != null) {
            return cachedStats;
        }

        Map<String, Object> stats = new HashMap<>();

        try {
            // Fetch user profile
            Map<String, Object> profile = fetchMap(apiUrl + "/users/" + username);
            stats.put("username", username);
            stats.put("publicRepos", profile.getOrDefault("public_repos", 0));
            stats.put("followers", profile.getOrDefault("followers", 0));
            stats.put("following", profile.getOrDefault("following", 0));
            stats.put("avatarUrl", profile.getOrDefault("avatar_url", ""));
            stats.put("profileUrl", profile.getOrDefault("html_url", ""));
            stats.put("bio", profile.getOrDefault("bio", ""));

            // Fetch repos for language stats
            List<Map<String, Object>> repos = fetchList(apiUrl + "/users/" + username + "/repos?per_page=100&sort=updated");
            Map<String, Integer> languageCounts = new HashMap<>();
            int totalStars = 0;
            int totalForks = 0;

            for (Map<String, Object> repo : repos) {
                String language = (String) repo.get("language");
                if (language != null) {
                    languageCounts.merge(language, 1, Integer::sum);
                }
                totalStars += ((Number) repo.getOrDefault("stargazers_count", 0)).intValue();
                totalForks += ((Number) repo.getOrDefault("forks_count", 0)).intValue();
            }

            // Sort languages by count (descending)
            List<Map.Entry<String, Integer>> sortedLangs = new ArrayList<>(languageCounts.entrySet());
            sortedLangs.sort((a, b) -> b.getValue() - a.getValue());
            List<Map<String, Object>> topLanguages = new ArrayList<>();
            for (int i = 0; i < Math.min(5, sortedLangs.size()); i++) {
                Map<String, Object> lang = new HashMap<>();
                lang.put("name", sortedLangs.get(i).getKey());
                lang.put("count", sortedLangs.get(i).getValue());
                topLanguages.add(lang);
            }

            stats.put("totalStars", totalStars);
            stats.put("totalForks", totalForks);
            stats.put("topLanguages", topLanguages);
            stats.put("totalReposAnalyzed", repos.size());

            cachedStats = stats; // Only cache successful results
            return stats;

        } catch (Exception e) {
            logger.error("Failed to fetch GitHub stats: {}. Using fallback data.", e.getMessage());
            return getFallbackStats();
        }
    }

    private volatile List<Map<String, Object>> cachedRepos = null;

    @SuppressWarnings("unchecked")
    public List<Map<String, Object>> getGitHubRepos() {
        if (cachedRepos != null) {
            return cachedRepos;
        }

        try {
            List<Map<String, Object>> repos = fetchList(apiUrl + "/users/" + username + "/repos?per_page=100&sort=updated");
            List<Map<String, Object>> result = new ArrayList<>();

            for (Map<String, Object> repo : repos) {
                boolean fork = Boolean.TRUE.equals(repo.get("fork"));
                if (fork) continue;

                Map<String, Object> item = new LinkedHashMap<>();
                item.put("name", repo.get("name"));
                item.put("description", repo.getOrDefault("description", ""));
                item.put("language", repo.getOrDefault("language", ""));
                item.put("stars", ((Number) repo.getOrDefault("stargazers_count", 0)).intValue());
                item.put("forks", ((Number) repo.getOrDefault("forks_count", 0)).intValue());
                item.put("url", repo.get("html_url"));
                item.put("homepage", repo.getOrDefault("homepage", ""));
                item.put("updatedAt", repo.get("updated_at"));
                item.put("topics", repo.getOrDefault("topics", new ArrayList<>()));
                result.add(item);
            }

            cachedRepos = result;
            return result;

        } catch (Exception e) {
            logger.error("Failed to fetch GitHub repos: {}", e.getMessage());
            return new ArrayList<>();
        }
    }

    private HttpHeaders buildHeaders() {
        HttpHeaders headers = new HttpHeaders();
        headers.set("Accept", "application/vnd.github.v3+json");
        headers.set("User-Agent", "portfolio-backend");
        if (token != null && !token.isEmpty()) {
            headers.set("Authorization", "Bearer " + token);
        }
        return headers;
    }

    @SuppressWarnings("unchecked")
    private Map<String, Object> fetchMap(String url) {
        HttpEntity<Void> entity = new HttpEntity<>(buildHeaders());
        ResponseEntity<Map> response = restTemplate.exchange(url, HttpMethod.GET, entity, Map.class);
        return response.getBody();
    }

    @SuppressWarnings("unchecked")
    private List<Map<String, Object>> fetchList(String url) {
        HttpEntity<Void> entity = new HttpEntity<>(buildHeaders());
        ResponseEntity<List> response = restTemplate.exchange(url, HttpMethod.GET, entity, List.class);
        return response.getBody();
    }

    private Map<String, Object> getFallbackStats() {
        Map<String, Object> stats = new HashMap<>();
        stats.put("username", username);
        stats.put("publicRepos", 10);
        stats.put("followers", 5);
        stats.put("following", 8);
        stats.put("avatarUrl", "");
        stats.put("profileUrl", "https://github.com/" + username);
        stats.put("bio", "Java Backend Developer | Spring Boot");
        stats.put("totalStars", 6);
        stats.put("totalForks", 3);
        stats.put("totalReposAnalyzed", 10);

        List<Map<String, Object>> topLanguages = new ArrayList<>();
        Map<String, Object> java = new HashMap<>();
        java.put("name", "Java");
        java.put("count", 7);
        topLanguages.add(java);

        Map<String, Object> js = new HashMap<>();
        js.put("name", "JavaScript");
        js.put("count", 2);
        topLanguages.add(js);

        Map<String, Object> html = new HashMap<>();
        html.put("name", "HTML");
        html.put("count", 1);
        topLanguages.add(html);

        stats.put("topLanguages", topLanguages);
        return stats;
    }

    private static RestTemplate createTrustAllRestTemplate() {
        try {
            TrustManager[] trustAll = new TrustManager[]{
                    new X509TrustManager() {
                        public X509Certificate[] getAcceptedIssuers() { return new X509Certificate[0]; }
                        public void checkClientTrusted(X509Certificate[] certs, String authType) {}
                        public void checkServerTrusted(X509Certificate[] certs, String authType) {}
                    }
            };
            SSLContext sslContext = SSLContext.getInstance("TLS");
            sslContext.init(null, trustAll, new java.security.SecureRandom());

            javax.net.ssl.HttpsURLConnection.setDefaultSSLSocketFactory(sslContext.getSocketFactory());
            javax.net.ssl.HttpsURLConnection.setDefaultHostnameVerifier((hostname, session) -> true);

            return new RestTemplate();
        } catch (Exception e) {
            LoggerFactory.getLogger(GitHubService.class).warn("Failed to create trust-all RestTemplate, using default", e);
            return new RestTemplate();
        }
    }
}
