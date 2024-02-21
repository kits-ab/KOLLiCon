package com.kollicon.repository;

import com.kollicon.model.ScheduleModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DatabaseRepository extends JpaRepository<ScheduleModel, Long> {


}
