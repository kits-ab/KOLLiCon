package com.kollicon.model;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIdentityReference;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;

@Entity
@Table(name = "presenter")
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id", scope = PresenterModel.class)
public class PresenterModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @NotNull(message = "name can not be empty")
    @Column(name = "name") // ENUM?
    private String name;
    @Column(name = "image")
    private String image;
    @JoinColumn(name = "activity_id", referencedColumnName = "id")
    @JsonIdentityReference(alwaysAsId = false)
    @ManyToOne(cascade = CascadeType.ALL)
    private ActivityModel activity;

    public PresenterModel() {
    }

    public long getId() {
        return id;
    }
    public void setId(long id) {
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
    public ActivityModel getActivity() {
        return activity;
    }
    public void setActivity(ActivityModel activity) {
        this.activity = activity;
    }
}
