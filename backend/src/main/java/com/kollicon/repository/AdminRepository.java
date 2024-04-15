package com.kollicon.repository;

import com.kollicon.model.AdminEmails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AdminRepository extends JpaRepository<AdminEmails, Long> {
    boolean existsByEmail(String email);
}
