package com.kollicon.model;
import jakarta.persistence.*;

@Entity
@Table(name = "Notification")
public class NotificationModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "message_id", nullable = false)
    private MessageModel message;
    @Column(name = "user_email")
    private String userEmail;
    @Column(name = "read")
    private boolean read;

    public NotificationModel() {
    }

    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public MessageModel getMessage() {
        return message;
    }
    public void setMessage(MessageModel message) {
        this.message = message;
    }
    public String getUserEmail() {
        return userEmail;
    }
    public void setUserEmail(String userEmail) {
        this.userEmail = userEmail;
    }
    public boolean isRead() {
        return read;
    }
    public void setRead(boolean read) {
        this.read = read;
    }
}