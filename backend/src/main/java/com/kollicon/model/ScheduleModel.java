package com.kollicon.model;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIdentityReference;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import org.hibernate.annotations.Type;

import java.time.LocalDate;
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
    @NotBlank(message = "Title is required")
    @Column(name = "title")
    private String title;
    @Column(name = "tag_line")
    private String tagLine;

    @Column(name = "image_url")
    private String imageURL;

    @Column(name= "description", length= 3000)
    private String description;
    @Column(name = "location")
    private String location;
    @Column(name = "start_time")
    @NotNull(message = "Start date is required")
    private LocalDate start;
    @Column(name = "end_time")
    @NotNull(message = "End date is required")
    private LocalDate end;
    @Column(name = "active")
    private boolean active;

    public ScheduleModel() {
    }

    public String getImageURL() {
        return imageURL;
    }

    public void setImageURL(String imageURL) {
        this.imageURL = imageURL;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
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





