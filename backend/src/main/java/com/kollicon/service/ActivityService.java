package com.kollicon.service;

import com.kollicon.model.ActivityModel;
import com.kollicon.model.LocationModel;
import com.kollicon.model.PresenterModel;
import com.kollicon.repository.ActivityRepository;
import com.kollicon.repository.PresenterRepository;
import jakarta.persistence.EntityNotFoundException;
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
    @Autowired
    PresenterRepository presenterRepository;


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

    private PresenterModel getPresenterById(Long id) {
        return presenterRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Presenter not found with id: " + id));
    }

    public ActivityModel updateActivity(ActivityModel updatedActivity) {
        ActivityModel existingActivity = getActivityById(updatedActivity.getId());

        // Uppdatera fälten om inte nulla
        existingActivity.setTitle(updatedActivity.getTitle());
        existingActivity.setType(updatedActivity.getType());
        existingActivity.setDetails(updatedActivity.getDetails());
        existingActivity.setStart(updatedActivity.getStart());
        existingActivity.setEnd(updatedActivity.getEnd());
        existingActivity.setWinner(updatedActivity.getWinner());

        // uppdatera presenters
        updatePresenters(existingActivity, updatedActivity.getPresenter());

        // uppdatera location
        updateLocation(existingActivity, updatedActivity.getLocation());

        return activityRepository.save(existingActivity);
    }

    private void updatePresenters(ActivityModel existingActivity, List<PresenterModel> updatedPresenters) {
        if (updatedPresenters != null) {
            updatedPresenters.forEach(updatedPresenter -> {
                PresenterModel existingPresenter = getPresenterById(updatedPresenter.getId());

                // uppdatera fälten om inte nulla
                existingPresenter.setName(updatedPresenter.getName());
                existingPresenter.setImage(updatedPresenter.getImage());

                existingPresenter.setActivity(existingActivity);
                presenterRepository.save(existingPresenter);
            });
        }
    }

    private void updateLocation(ActivityModel existingActivity, LocationModel updatedLocation) {
        if (updatedLocation != null) {
            LocationModel existingLocation = existingActivity.getLocation();

            // Update location fields if not null
            existingLocation.setCoordinates(updatedLocation.getCoordinates());
            existingLocation.setTitle(updatedLocation.getTitle());

            existingLocation.setActivity(existingActivity);
        }
    }

    public String deleteActivity (Long id) {
        activityRepository.deleteById(id);
        return "Activity has been deleted";
    }
}
