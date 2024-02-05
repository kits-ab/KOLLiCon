package com.kollicon.model;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIdentityReference;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import jakarta.persistence.*;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "schedule")
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id", scope = ScheduleModel.class)
public class ScheduleModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @Column(name = "user_id")
    private String userId;
    @OneToMany(mappedBy = "schedule", cascade = CascadeType.ALL)
    @JsonIdentityReference(alwaysAsId = false)
    private List<ActivityModel> activityId;
    @Column(name = "type") // Kanske ska var ett enum?
    private String type;
    @Column(name = "title")
    private String title;
    @Column(name = "tag_line")
    private String tagLine;
    @Column(name = "location")
    private String location;
    @Column(name = "start_time")
    private LocalDate start;
    @Column(name = "end_time")
    private LocalDate end;
    @Column(name = "active")
    private boolean active;

    public ScheduleModel() {
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
    public List<ActivityModel> getActivityId() {
        return activityId;
    }
    public void setActivityId(List<ActivityModel> activityId) {
        this.activityId = activityId;
    }
    public String getType() {
        return type;
    }
    public void setType(String type) {
        this.type = type;
    }
    public String getTitle() {
        return title;
    }
    public void setTitle(String title) {
        this.title = title;
    }
    public String getTagLine() {
        return tagLine;
    }
    public void setTagLine(String tagLine) {
        this.tagLine = tagLine;
    }
    public String getLocation() {
        return location;
    }
    public void setLocation(String location) {
        this.location = location;
    }
    public LocalDate getStart() {
        return start;
    }
    public void setStart(LocalDate start) {
        this.start = start;
    }
    public LocalDate getEnd() {
        return end;
    }
    public void setEnd(LocalDate end) {
        this.end = end;
    }
    public boolean isActive() {
        return active;
    }
    public void setActive(boolean active) {
        this.active = active;
    }
}





