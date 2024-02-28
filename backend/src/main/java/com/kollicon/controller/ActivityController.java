package com.kollicon.controller;

import com.kollicon.model.ActivityModel;
import com.kollicon.repository.ActivityRepository;
import com.kollicon.service.ActivityService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/api")
@Validated
public class ActivityController {

    @Autowired
    ActivityService activityService;
    @Autowired
    private ActivityRepository activityRepository;

    @PostMapping("/activity")
    public ResponseEntity<ActivityModel> createActivity(@Valid @RequestBody ActivityModel activity) {
        ActivityModel createdActivity = activityService.createActivity(activity);
        return new ResponseEntity<>(createdActivity, HttpStatus.CREATED);
    }
    @GetMapping("/activity/{id}")
    public ActivityModel getActivity (@PathVariable Long id) {
        return activityService.getActivityById(id);
    }
    @PutMapping("/activity/update")
    public ActivityModel updateActivity (@RequestBody ActivityModel activity) {
        return activityService.updateActivity(activity);
    }
    @DeleteMapping("/activity/delete/{id}")
    public String deleteActivity(@PathVariable Long id) {
        if (!activityRepository.existsById(id)) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, "Activity with id " + id + " not found");
        }
        activityService.deleteActivity(id);
        return "Activity has been deleted";
    }
}
