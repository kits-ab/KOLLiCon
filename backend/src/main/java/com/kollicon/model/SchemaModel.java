package com.kollicon.model;

import jakarta.persistence.*;

import java.util.Date;
import java.util.UUID;

@Entity
public class SchemaModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private UUID id;

    @Column(name = "user_id")
    private String userId;

/*    @Column(name = "activity_id") -- Bortkommenterad tills activity är klar
    private List<Activity> activityId;*/

    @Column(name = "type") // Kanske ska var ett enum?
    private String type;

    @Column(name = "title")
    private String title;

    @Column(name = "tag_line")
    private String tagLine;

    @Column(name = "location")
    private String location;

    @Column(name = "start")
    private Date start;

    @Column(name = "end")
    private Date end;

    @Column(name = "active")
    private boolean active;

    public SchemaModel() {
    }

    public SchemaModel(UUID id, String userId, String type, String title, String tagLine, String location,
                       Date start, Date end, boolean active) {
        this.id = id;
        this.userId = userId;
        this.type = type;
        this.title = title;
        this.tagLine = tagLine;
        this.location = location;
        this.start = start;
        this.end = end;
        this.active = active;
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

    public Date getStart() {
        return start;
    }

    public void setStart(Date start) {
        this.start = start;
    }

    public Date getEnd() {
        return end;
    }

    public void setEnd(Date end) {
        this.end = end;
    }

    public boolean isActive() {
        return active;
    }

    public void setActive(boolean active) {
        this.active = active;
    }
}





