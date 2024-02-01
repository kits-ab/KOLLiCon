package com.kollicon.controller;

import com.kollicon.model.ScheduleModel;
import com.kollicon.service.ScheduleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api")
public class ScheduleController {

    @Autowired
    private ScheduleService scheduleService;

    @PostMapping("/schedule/post")
    public ScheduleModel createSchedule(@RequestBody ScheduleModel schedule) {
        return scheduleService.createSchedule(schedule);
    }

    @GetMapping("/schedule/get/{id}")
    public Optional<ScheduleModel> getScheduleById(@PathVariable Long id){
        return scheduleService.getScheduleById(id);
    }

    @PutMapping("/schedule/update")
    public ScheduleModel updateSchedule(@RequestBody ScheduleModel scheduleModel){
        return scheduleService.updateSchedule(scheduleModel);
    }

    @DeleteMapping("/schedule/delete/{id}")
    public String deleteSchedule(@PathVariable Long id) {
        scheduleService.deleteSchedule(id);
        return "Schedule was deleted";
        }




}
