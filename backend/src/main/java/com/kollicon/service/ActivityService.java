package com.kollicon.service;

import com.kollicon.model.ActivityModel;
import com.kollicon.model.PresenterModel;
import com.kollicon.repository.ActivityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ActivityService {
    @Autowired
     ActivityRepository activityRepository;


    public ActivityModel createActivity(ActivityModel activity) {
        //Först hämtas presenter från activity och loppar igenom presenters lista sen sätter activity_id på varje enskild presenter.
        List<PresenterModel> presenters = activity.getPresenter();
        if (presenters != null) {
            for (PresenterModel presenter : presenters) {
                presenter.setActivity(activity);
            }
        }
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
