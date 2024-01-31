package com.kollicon.model;

import jakarta.persistence.*;

import java.util.UUID;

@Entity
@Table(name = "presenter")
public class PresenterModel {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    private String name;

    private String image;

    public PresenterModel(String name, String image) {
        this.name = name;
        this.image = image;
    }

    public PresenterModel() {
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }
}
