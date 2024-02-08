package com.kollicon.model;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIdentityReference;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

@Entity
@Table(name = "location")
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id", scope = LocationModel.class)
public class LocationModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @NotNull(message = "coordinates can not be empty")
    @Column(name = "coordinates")
    private String coordinates;
    @NotNull(message = "title can not be empty")
    @Column(name = "title")
    private String title;
    @OneToOne(mappedBy = "location")
    @JsonIdentityReference(alwaysAsId = true)
    private ActivityModel activity;

    public LocationModel() {
    }

    public long getId() {
        return id;
    }
    public void setId(long id) {
        this.id = id;
    }
    public String getCoordinates() {
        return coordinates;
    }
    public void setCoordinates(String coordinates) {
        this.coordinates = coordinates;
    }
    public String getTitle() {
        return title;
    }
    public void setTitle(String title) {
        this.title = title;
    }
    public ActivityModel getActivity() {
        return activity;
    }
    public void setActivity(ActivityModel activity) {
        this.activity = activity;
    }
}
