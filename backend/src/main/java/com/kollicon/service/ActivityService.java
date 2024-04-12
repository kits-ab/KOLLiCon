package com.kollicon.service;

import com.kollicon.model.*;
import com.kollicon.repository.ActivityRepository;
import com.kollicon.repository.ExternalPresenterRepository;
import com.kollicon.repository.PresenterRepository;
import com.kollicon.repository.ScheduleRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.function.Consumer;

@Service
public class ActivityService {
    @Autowired
     ActivityRepository activityRepository;
    @Autowired
    PresenterRepository presenterRepository;
    @Autowired
    ScheduleRepository scheduleRepository;
    @Autowired
    ExternalPresenterRepository externalpresenterRepository;


    public ActivityModel createActivity(ActivityModel activity) {
        ScheduleModel scheduleModel= scheduleRepository.active(true);
        if (scheduleModel == null) {
            throw new EntityNotFoundException("No active schedule found");
        } else {
            activity.setSchedule(scheduleModel);
        }

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
        updateExternalPresenters(existingActivity, updatedActivity.getExternalPresenter());

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
                // If the presenter has an id of 0, it means it's a new presenter
                if (updatedPresenter.getId() == 0) {
                    // Set the activity for the new presenter
                    updatedPresenter.setActivity(existingActivity);
                    // Save the new presenter to generate a new ID
                    presenterRepository.save(updatedPresenter);
                } else {
                    // If the presenter has a non-zero id, it's an existing presenter
                    PresenterModel existingPresenter = presenterRepository.findById(updatedPresenter.getId())
                            .orElseThrow(() -> new EntityNotFoundException("Presenter not found with id: " + updatedPresenter.getId()));
                    // Update the fields of the existing presenter if new values are provided
                    updateFieldIfNotNull(existingPresenter::setName, updatedPresenter.getName());
                    updateFieldIfNotNull(existingPresenter::setAvatarSrc, updatedPresenter.getAvatarSrc());

                    // Set the activity for the existing presenter
                    existingPresenter.setActivity(existingActivity);

                    // Save the existing presenter
                    presenterRepository.save(existingPresenter);
                }
            }
        }
    }

    private void updateExternalPresenters(ActivityModel existingActivity, List<ExternalPresenterModel> updatedExtraPresenters) {
        if (updatedExtraPresenters != null) {
            for (ExternalPresenterModel updatedExtraPresenter : updatedExtraPresenters) {
                // If the presenter has an id of 0, it means it's a new presenter
                if (updatedExtraPresenter.getId() == 0) {
                    // Set the activity for the new presenter
                    updatedExtraPresenter.setActivity(existingActivity);
                    // Save the new presenter to generate a new ID
                    externalpresenterRepository.save(updatedExtraPresenter);
                } else {
                    // If the presenter has a non-zero id, it's an existing presenter
                    ExternalPresenterModel existingPresenter = externalpresenterRepository.findById(updatedExtraPresenter.getId())
                            .orElseThrow(() -> new EntityNotFoundException("External Presenter not found with id: " + updatedExtraPresenter.getId()));
                    // Update the fields of the existing presenter if new values are provided
                    updateFieldIfNotNull(existingPresenter::setName, updatedExtraPresenter.getName());
                    updateFieldIfNotNull(existingPresenter::setAvatarSrc, updatedExtraPresenter.getAvatarSrc());

                    // Set the activity for the existing presenter
                    existingPresenter.setActivity(existingActivity);

                    // Save the existing presenter
                    externalpresenterRepository.save(existingPresenter);
                }
            }
        }
    }



    private void updateLocation(ActivityModel existingActivity, LocationModel updatedLocation) {
        if (updatedLocation != null) {
            LocationModel existingLocation = existingActivity.getLocation();

            updateFieldIfNotNull(existingLocation::setCoordinates, updatedLocation.getCoordinates());
            updateFieldIfNotNull(existingLocation::setTitle, updatedLocation.getTitle());
            updateFieldIfNotNull(existingLocation::setSubtitle, updatedLocation.getSubtitle());

            existingLocation.setActivity(existingActivity);
        }
    }

    public String deleteActivity (Long id) {
        activityRepository.deleteById(id);
        return "Activity has been deleted";
    }
}
