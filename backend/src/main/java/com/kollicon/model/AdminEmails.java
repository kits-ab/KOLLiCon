package com.kollicon.model;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import jakarta.persistence.*;

@Entity
@Table(name = "Admin")
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id", scope = AdminEmails.class)
public class AdminEmails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id ;
    private String email ;

    public AdminEmails() {
    }
    public Long getId() {
        return id;
    }
    public String getEmail() {
        return email;
    }
}
