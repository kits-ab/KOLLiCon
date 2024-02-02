package com.kollicon.model;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIdentityReference;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import jakarta.persistence.*;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

@Entity
@Table(name = "review")
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id", scope = ReviewModel.class)
public class ReviewModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @Column(name = "user_id")
    private String userId;
    @NotNull(message = "review can not be empty")
    @Column(name = "review")
    private String review;
    @Min(value = 1, message = "Rating must not be less than 0")
    @Max(value = 5, message = "Rating must not be more than 5")
    @Column(name = "rate")
    private int rate;
    @JoinColumn(name = "activity_id", referencedColumnName = "id")
    @JsonIdentityReference(alwaysAsId = false)
    @ManyToOne
    private ActivityModel activity;

    public ReviewModel() {
    }

    public long getId() {
        return id;
    }
    public void setId(long id) {
        this.id = id;
    }
    public String getUserId() {
        return userId;
    }
    public void setUserId(String userId) {
        this.userId = userId;
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
    public ActivityModel getActivity() {
        return activity;
    }
    public void setActivity(ActivityModel activity) {
        this.activity = activity;
    }
}
