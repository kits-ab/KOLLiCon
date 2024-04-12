package com.kollicon.service;

import com.kollicon.model.MessageModel;
import com.kollicon.model.NotificationModel;
import com.kollicon.repository.MessageRepository;
import com.kollicon.repository.NotificationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

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
        // Save the message in the database
        MessageModel message = new MessageModel();
        message.setTitle(title);
        message.setText(text);
        message = messageRepository.save(message);

        // Create notifications and send emails
        for (String email : userEmails) {
            NotificationModel notification = new NotificationModel();
            notification.setMessage(message);
            notification.setUserEmail(email);
            notificationRepository.save(notification);

            sendEmail(email, title, text);
        }
    }

    // Method to send email
    private void sendEmail(String to, String subject, String text) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("KITS");
        message.setTo(to);
        message.setSubject(subject);
        message.setText(text);
        mailSender.send(message);
    }
}
