package com.kollicon.service;

import com.kollicon.model.MessageModel;
import com.kollicon.model.NotificationModel;
import com.kollicon.repository.MessageRepository;
import com.kollicon.repository.NotificationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.FileSystemResource;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.mail.javamail.MimeMessagePreparator;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.File;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
public class MessageService {

    @Autowired
    private MessageRepository messageRepository;

    @Autowired
    private NotificationRepository notificationRepository;

    @Autowired
    private JavaMailSender mailSender;

    @Transactional
    public void sendMessageWithNotifications(String title, String text, List<String> userEmails) {
        // Remove duplicates from userEmails list
        Set<String> uniqueEmails = new HashSet<>(userEmails);

        // Save the message in the database
        MessageModel message = new MessageModel();
        message.setTitle(title);
        message.setText(text);
        message = messageRepository.save(message);

        // Build HTML content once
        String htmlContent = buildHtmlContent(text, title);

        // Create notifications and send emails
        for (String email : uniqueEmails) {
            NotificationModel notification = new NotificationModel();
            notification.setMessage(message);
            notification.setUserEmail(email);
            notificationRepository.save(notification);

            sendEmail(email, title, htmlContent);
            // Add log here: Log email sent to "email"
        }
    }

    // Method to send HTML email
    private void sendEmail(String to, String subject, String htmlContent) {
        MimeMessagePreparator messagePreparator = mimeMessage -> {
            MimeMessageHelper messageHelper = new MimeMessageHelper(mimeMessage, true);

            // Set the From address with a display name
            String fromAddress = "KITS <kitscon.app@gmail.com>";
            messageHelper.setFrom(fromAddress);

            messageHelper.setTo(to);
            messageHelper.setSubject(subject);

            // Use the HTML content directly, ensuring it's only constructed once
            messageHelper.setText(htmlContent, true);  // true indicates HTML content
            FileSystemResource res = new FileSystemResource(new File("src/main/logo/Logo.png"));
            messageHelper.addInline("logoImage", res);
        };

        mailSender.send(messagePreparator);
        // Add log here: Log that email was prepared for sending to "to"
    }

    private String buildHtmlContent(String text, String subject) {
        return "<!DOCTYPE html>"
                + "<html>"
                + "<head>"
                + "<meta charset='UTF-8'>"
                + "<style>"
                + "body { font-family: Arial, sans-serif; line-height: 1.6; }"
                + "h2 { color: #cccccc; }"
                + "p { color: #cccccc;, font-size: 1.3em }"
                + ".footer { margin-top: 20px; font-size: 0.9em; color: #3D4A34; }"
                + ".footer hr { border: 0; height: 1px; background: gray; margin-bottom: 10px; }"
                + "</style>"
                + "</head>"
                + "<body>"
                + "<h2>" + subject + "</h2>"
                + "<p>" + text + "</p>"
                + "<hr>"
                + "<div class='footer'>"
                + "<p>Kungsportsavenyen 33, 411 36 Göteborg</p>"
                + "<p>070-827 74 99</p>"
                + "<p>info@kits.se</p>"
                + "<img src='cid:logoImage' style='width: 100px;'>"
                + "</div>"
                + "</body>"
                + "</html>";
    }

}
