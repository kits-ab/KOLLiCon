package com.kollicon.repository;

import com.kollicon.model.ActivityModel;
import com.kollicon.model.ScheduleModel;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ActivityRepository extends JpaRepository<ActivityModel, Long> {

    List<ActivityModel> findByScheduleId(Long scheduleId);


}
