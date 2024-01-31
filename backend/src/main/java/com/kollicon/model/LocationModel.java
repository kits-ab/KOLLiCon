package com.kollicon.model;

import jakarta.persistence.*;
import java.util.UUID;

@Entity
@Table(name = "location")
public class LocationModel {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    private String coordinates;

    private String title;

    public LocationModel(String coordinates, String title) {
        this.coordinates = coordinates;
        this.title = title;
    }

    public LocationModel() {
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
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
}
