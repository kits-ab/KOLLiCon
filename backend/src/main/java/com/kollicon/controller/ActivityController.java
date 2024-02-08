package com.kollicon.controller;

import com.kollicon.model.ActivityModel;
import com.kollicon.service.ActivityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5173")
public class ActivityController {

    @Autowired
    ActivityService activityService;

    @PostMapping("/activity")
    public ActivityModel createActivity (@RequestBody ActivityModel activity) {
        return activityService.createActivity(activity);
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
    public String deleteActivity (@PathVariable Long id) {
        activityService.deleteActivity(id);
        return "activity has been deleted";
    }
}
