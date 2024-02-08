package com.kollicon.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIdentityReference;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDateTime;
import java.util.List;
@Entity
@Table(name = "activity")
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id", scope = ActivityModel.class)
public class ActivityModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @Column(name = "user_id")
    private String userId;
    @OneToMany(mappedBy = "activity")
    @JsonIdentityReference(alwaysAsId = false)
    private List<ReviewModel> review;
    @ManyToOne
    @JoinColumn(name = "schedule_id", referencedColumnName = "id")
    @JsonIdentityReference(alwaysAsId = true)
    private ScheduleModel schedule;
    @Column(name = "winner")
    private Boolean winner;
    @NotNull(message = "Type is required")
    @Column(name = "type")
    private String type;

    @OneToMany(mappedBy = "activity", cascade = CascadeType.ALL)
    @JsonIdentityReference(alwaysAsId = false)
    private List<PresenterModel> presenter;
    @JoinColumn(name = "location_id", referencedColumnName = "id")
    @JsonIdentityReference(alwaysAsId = false)
    @OneToOne(cascade = CascadeType.ALL)
    private LocationModel location;
    @NotNull(message = "Title is required")
    @Column(name = "title")
    private String title;
    @NotNull(message = "Details is required")
    @Column(name = "details")
    private String details;
    @NotNull(message = "Start date is required")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm", timezone = "UTC")
    @Column(name = "start_time")
    private LocalDateTime start;
    @NotNull(message = "End date is required")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm", timezone = "UTC")
    @Column(name = "end_time")
    private LocalDateTime end;

    public ActivityModel() {
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
    public List<ReviewModel> getReview() {
        return review;
    }
    public void setReview(List<ReviewModel> review) {
        this.review = review;
    }
    public ScheduleModel getSchedule() {
        return schedule;
    }
    public void setSchedule(ScheduleModel schedule) {
        this.schedule = schedule;
    }
    public Boolean getWinner() {
        return winner;
    }
    public void setWinner(Boolean winner) {
        this.winner = winner;
    }
    public String getType() {
        return type;
    }
    public void setType(String type) {
        this.type = type;
    }
    public List<PresenterModel> getPresenter() {
        return presenter;
    }
    public void setPresenter(List<PresenterModel> presenter) {
        this.presenter = presenter;
    }
    public LocationModel getLocation() {
        return location;
    }
    public void setLocation(LocationModel location) {
        this.location = location;
    }
    public String getTitle() {
        return title;
    }
    public void setTitle(String title) {
        this.title = title;
    }
    public String getDetails() {
        return details;
    }
    public void setDetails(String details) {
        this.details = details;
    }
    public LocalDateTime getStart() {
        return start;
    }
    public void setStart(LocalDateTime start) {
        this.start = start;
    }
    public LocalDateTime getEnd() {
        return end;
    }
    public void setEnd(LocalDateTime end) {
        this.end = end;
    }
}
