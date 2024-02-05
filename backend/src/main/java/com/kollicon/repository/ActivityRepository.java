package com.kollicon.repository;

import com.kollicon.model.ActivityModel;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ActivityRepository extends JpaRepository<ActivityModel, Long> {

}
