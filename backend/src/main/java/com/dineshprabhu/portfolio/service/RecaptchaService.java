package com.dineshprabhu.portfolio.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Map;

@Service
public class RecaptchaService {

    private static final Logger logger = LoggerFactory.getLogger(RecaptchaService.class);

    @Value("${recaptcha.secret}")
    private String secretKey;

    @Value("${recaptcha.verify-url}")
    private String verifyUrl;

    @Value("${recaptcha.enabled}")
    private boolean enabled;

    private final RestTemplate restTemplate = new RestTemplate();

    @SuppressWarnings("unchecked")
    public boolean verify(String token) {
        if (!enabled) {
            logger.info("reCAPTCHA verification is disabled, skipping...");
            return true;
        }

        if (token == null || token.isEmpty()) {
            logger.warn("reCAPTCHA token is empty");
            return false;
        }

        try {
            String url = verifyUrl + "?secret=" + secretKey + "&response=" + token;
            ResponseEntity<Map> response = restTemplate.postForEntity(url, null, Map.class);
            Map<String, Object> body = response.getBody();

            if (body != null) {
                boolean success = (boolean) body.getOrDefault("success", false);
                double score = ((Number) body.getOrDefault("score", 0.0)).doubleValue();
                logger.info("reCAPTCHA verification: success={}, score={}", success, score);
                return success && score >= 0.5;
            }
        } catch (Exception e) {
            logger.error("reCAPTCHA verification failed: {}", e.getMessage());
        }

        return false;
    }
}
