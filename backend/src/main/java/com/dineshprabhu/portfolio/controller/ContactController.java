package com.dineshprabhu.portfolio.controller;

import com.dineshprabhu.portfolio.dto.ApiResponse;
import com.dineshprabhu.portfolio.dto.ContactRequest;
import com.dineshprabhu.portfolio.service.ContactService;
import com.dineshprabhu.portfolio.service.RecaptchaService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class ContactController {

    private final ContactService contactService;
    private final RecaptchaService recaptchaService;

    public ContactController(ContactService contactService, RecaptchaService recaptchaService) {
        this.contactService = contactService;
        this.recaptchaService = recaptchaService;
    }

    @PostMapping("/contact")
    public ResponseEntity<ApiResponse> submitContactForm(
            @Valid @RequestBody ContactRequest request,
            @RequestHeader(value = "X-Recaptcha-Token", required = false) String recaptchaToken) {
        // Verify reCAPTCHA (skipped if disabled in config)
        if (!recaptchaService.verify(recaptchaToken)) {
            return ResponseEntity.badRequest()
                    .body(ApiResponse.error("reCAPTCHA verification failed. Please try again."));
        }

        try {
            contactService.sendContactEmail(request);
            return ResponseEntity.ok(ApiResponse.success("Message sent successfully!"));
        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                    .body(ApiResponse.error("Mail service is not configured. Please email me directly at dineshprabhu02ece@gmail.com"));
        }
    }

    @GetMapping("/health")
    public ResponseEntity<ApiResponse> healthCheck() {
        return ResponseEntity.ok(ApiResponse.success("Portfolio backend is running!"));
    }
}
