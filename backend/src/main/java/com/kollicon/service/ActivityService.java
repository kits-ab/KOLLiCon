package com.kollicon.service;

import com.kollicon.model.*;
import com.kollicon.repository.ActivityRepository;
import com.kollicon.repository.PresenterRepository;
import com.kollicon.repository.ScheduleRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.function.Consumer;

@Service
public class ActivityService {
    @Autowired
     ActivityRepository activityRepository;
    @Autowired
    PresenterRepository presenterRepository;
    @Autowired
    ScheduleRepository scheduleRepository;


    public ActivityModel createActivity(ActivityModel activity) {
        ScheduleModel scheduleModel= scheduleRepository.findById(1);
        activity.setSchedule(scheduleModel);
        //Först hämtas presenter från activity och loppar igenom presenters lista sen sätter activity_id på varje enskild presenter.
        List<PresenterModel> presenters = activity.getPresenter();
        if (presenters != null) {
            for (PresenterModel presenter : presenters) {
                presenter.setActivity(activity);

            }
        }
        List<ExternalPresenterModel> externalPresenters = activity.getExternalPresenter();
        if (externalPresenters != null) {
            for (ExternalPresenterModel ExternalPresenterModel : externalPresenters) {
                ExternalPresenterModel.setActivity(activity);

            }
        }
        return activityRepository.save(activity);
    }

    public ActivityModel getActivityById(Long id) {
        return activityRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Activity not found with id: " + id));
    }

    public ActivityModel updateActivity(ActivityModel updatedActivity) {
        ActivityModel existingActivity = activityRepository.findById(updatedActivity.getId())
                .orElseThrow(() -> new EntityNotFoundException("Activity not found with id: " + updatedActivity.getId()));

        updateFieldIfNotNull(existingActivity::setTitle, updatedActivity.getTitle());
        updateFieldIfNotNull(existingActivity::setType, updatedActivity.getType());
        updateFieldIfNotNull(existingActivity::setDetails, updatedActivity.getDetails());
        updateFieldIfNotNull(existingActivity::setStart, updatedActivity.getStart());
        updateFieldIfNotNull(existingActivity::setEnd, updatedActivity.getEnd());
        updateFieldIfNotNull(existingActivity::setWinner, updatedActivity.getWinner());

        updatePresenters(existingActivity, updatedActivity.getPresenter());

        updateLocation(existingActivity, updatedActivity.getLocation());

        return activityRepository.save(existingActivity);
    }

    private <T> void updateFieldIfNotNull(Consumer<T> updateFunction, T updatedValue) {
        if (updatedValue != null) {
            updateFunction.accept(updatedValue);
        }
    }

    private void updatePresenters(ActivityModel existingActivity, List<PresenterModel> updatedPresenters) {
        if (updatedPresenters != null) {
            for (PresenterModel updatedPresenter : updatedPresenters) {
                PresenterModel existingPresenter = presenterRepository.findById(updatedPresenter.getId())
                        .orElseThrow(() -> new EntityNotFoundException("Presenter not found with id: " + updatedPresenter.getId()));

                updateFieldIfNotNull(existingPresenter::setName, updatedPresenter.getName());
                updateFieldIfNotNull(existingPresenter::setAvatarSrc, updatedPresenter.getAvatarSrc());

                existingPresenter.setActivity(existingActivity);

                presenterRepository.save(existingPresenter);
            }
        }
    }

    private void updateLocation(ActivityModel existingActivity, LocationModel updatedLocation) {
        if (updatedLocation != null) {
            LocationModel existingLocation = existingActivity.getLocation();

            updateFieldIfNotNull(existingLocation::setCoordinates, updatedLocation.getCoordinates());
            updateFieldIfNotNull(existingLocation::setTitle, updatedLocation.getTitle());

            existingLocation.setActivity(existingActivity);
        }
    }

    public String deleteActivity (Long id) {
        activityRepository.deleteById(id);
        return "Activity has been deleted";
    }
}
