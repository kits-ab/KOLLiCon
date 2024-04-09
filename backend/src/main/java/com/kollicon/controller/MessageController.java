package com.kollicon.controller;

import com.kollicon.requests.SendMessageRequest;
import com.kollicon.service.MessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/messages")
public class MessageController {

    @Autowired
    private MessageService messageService;

    @PostMapping("/send")
    public void sendMessage(@RequestBody SendMessageRequest request) {
        messageService.sendMessageWithNotifications(request.getTitle(), request.getText(), request.getUserEmails());
    }
}