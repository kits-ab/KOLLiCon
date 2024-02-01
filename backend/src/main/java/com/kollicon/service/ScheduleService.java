package com.kollicon.service;

import com.kollicon.model.ScheduleModel;
import com.kollicon.repository.ScheduleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ScheduleService {

    @Autowired
    private ScheduleRepository scheduleRepository;


    public ScheduleModel createSchedule(ScheduleModel schedule) {
        return scheduleRepository.save(schedule);

    }

    public Optional<ScheduleModel> getScheduleById(Long id) {
        return scheduleRepository.findById(id);
    }

    public ScheduleModel updateSchedule(ScheduleModel scheduleModel) {
        return scheduleRepository.save(scheduleModel);
    }

    public void deleteSchedule(Long id) {
        scheduleRepository.deleteById(id);
    }
}
