package com.kollicon.repository;

import com.kollicon.model.ScheduleModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ScheduleRepository extends JpaRepository<ScheduleModel, Long> {
    ScheduleModel findById(int i);

    ScheduleModel active(boolean b);

    List <ScheduleModel> findAll();

}
