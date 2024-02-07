package com.kollicon.repository;


import com.kollicon.model.PresenterModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PresenterRepository extends JpaRepository<PresenterModel, Long> {
}
