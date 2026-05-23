package com.dineshprabhu.portfolio.service;

import com.dineshprabhu.portfolio.dto.ContactRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class ContactService {

    private static final Logger logger = LoggerFactory.getLogger(ContactService.class);

    private final JavaMailSender mailSender;

    @Value("${portfolio.contact.recipient}")
    private String recipientEmail;

    public ContactService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    public void sendContactEmail(ContactRequest request) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(recipientEmail);
            message.setSubject("Portfolio Contact: " + request.getName());
            message.setText(
                "New message from your portfolio website:\n\n" +
                "Name: " + request.getName() + "\n" +
                "Email: " + request.getEmail() + "\n\n" +
                "Message:\n" + request.getMessage()
            );
            message.setReplyTo(request.getEmail());

            mailSender.send(message);
            logger.info("Contact email sent successfully from: {}", request.getEmail());
        } catch (Exception e) {
            logger.error("Failed to send contact email: {}", e.getMessage());
            throw new RuntimeException("Failed to send email. Please try again later.");
        }
    }
}
