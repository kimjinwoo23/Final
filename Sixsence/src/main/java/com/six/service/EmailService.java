package com.six.service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.scheduling.annotation.Async;

import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import java.util.logging.Level;
import java.util.logging.Logger;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender emailSender;

    private static final Logger logger = Logger.getLogger(EmailService.class.getName());

    @Async
    public void sendSimpleMessage(String to, String subject, String text) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(to);
            message.setSubject(subject);
            message.setText(text);
            emailSender.send(message);
            logger.info("Email sent to: " + to);
        } catch (MailException e) {
            logger.log(Level.SEVERE, "Failed to send email to: " + to, e);
        }
    }

    @Async
    public void sendHtmlMessage(String to, String subject, String htmlContent) {
        try {
            MimeMessage message = emailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true);
            helper.setTo(to);
            helper.setSubject(subject);
            helper.setText(htmlContent, true); // true indicates it's HTML
            emailSender.send(message);
            logger.info("HTML email sent to: " + to);
        } catch (MessagingException e) {
            logger.log(Level.SEVERE, "Failed to send HTML email to: " + to, e);
        }
    }
}