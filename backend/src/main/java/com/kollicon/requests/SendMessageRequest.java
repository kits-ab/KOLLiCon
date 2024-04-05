package com.kollicon.requests;

import java.util.List;

public class SendMessageRequest {
    private String title;
    private String text;
    private List<String> userEmails;

    public String getTitle() {
        return title;
    }
    public void setTitle(String title) {
        this.title = title;
    }
    public String getText() {
        return text;
    }
    public void setText(String text) {
        this.text = text;
    }
    public List<String> getUserEmails() {
        return userEmails;
    }
    public void setUserEmails(List<String> userEmails) {
        this.userEmails = userEmails;
    }
}
