package com.kollicon.service;

import com.kollicon.model.MessageModel;
import com.kollicon.model.NotificationModel;
import com.kollicon.repository.MessageRepository;
import com.kollicon.repository.NotificationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Service
public class MessageService {

    @Autowired
    private MessageRepository messageRepository;

    @Autowired
    private NotificationRepository notificationRepository;

    @Transactional
    public void sendMessageWithNotifications(String title, String text, List<String> userEmails) {
        MessageModel message = new MessageModel();
        message.setTitle(title);
        message.setText(text);
        message = messageRepository.save(message);

        for (String email : userEmails) {
            NotificationModel notification = new NotificationModel();
            notification.setMessage(message);
            notification.setUserEmail(email);
            notificationRepository.save(notification);
        }
    }
}
