package com.kollicon.model;

import jakarta.persistence.*;

import java.util.UUID;

@Entity
@Table(name = "review")
public class ReviewModel {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    private String user_id;

    private String review;

    private int rate;

    public ReviewModel(String user_id, String review, int rate) {
        this.user_id = user_id;
        this.review = review;
        this.rate = rate;
    }

    public ReviewModel() {
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getUser_id() {
        return user_id;
    }

    public void setUser_id(String user_id) {
        this.user_id = user_id;
    }

    public String getReview() {
        return review;
    }

    public void setReview(String review) {
        this.review = review;
    }

    public int getRate() {
        return rate;
    }

    public void setRate(int rate) {
        this.rate = rate;
    }
}
