package com.kollicon.model;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIdentityReference;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
@Entity
@Table(name = "external_presenter")
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id", scope = ExternalPresenterModel.class)
public class ExternalPresenterModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @NotNull(message = "name can not be empty")
    @Column(name = "name") // ENUM?
    private String name;
    @Column(name = "image")
    private String AvatarSrc;
    @JoinColumn(name = "activity_id", referencedColumnName = "id")
    @JsonIdentityReference(alwaysAsId = false)
    @ManyToOne
    private ActivityModel activity;

    public ExternalPresenterModel() {
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
    public String getAvatarSrc() {
        return AvatarSrc;
    }
    public void setAvatarSrc(String avatarSrc) {
        AvatarSrc = avatarSrc;
    }
    public ActivityModel getActivity() {
        return activity;
    }
    public void setActivity(ActivityModel activity) {
        this.activity = activity;
    }
}
