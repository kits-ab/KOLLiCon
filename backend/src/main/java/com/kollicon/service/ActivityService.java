package com.kollicon.service;

import com.kollicon.model.ActivityModel;
import com.kollicon.repository.ActivityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ActivityService {
    @Autowired
     ActivityRepository activityRepository;

    public ActivityModel createActivity (ActivityModel activity) {
        return activityRepository.save(activity);
    }

    public ActivityModel getActivityById (Long id) {
        return activityRepository.findById(id).get();
    }

    public ActivityModel updateActivity (ActivityModel activity) {
        return activityRepository.save(activity);
    }

    public String deleteActivity (Long id) {
        activityRepository.deleteById(id);
        return "Activity has been deleted";
    }

}
