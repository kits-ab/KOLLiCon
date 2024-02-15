package com.kollicon.service;

import com.kollicon.model.ActivityModel;
import com.kollicon.model.LocationModel;
import com.kollicon.model.PresenterModel;
import com.kollicon.model.ScheduleModel;
import com.kollicon.repository.*;
import org.springframework.stereotype.Service;

import java.time.format.DateTimeFormatter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.yaml.snakeyaml.Yaml;

import java.io.FileWriter;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.*;

@Service
public class DatabaseService {

    @Autowired
    private ScheduleRepository scheduleRepository;
    @Autowired
    private ActivityRepository activityRepository;
    @Autowired
    private LocationRepository locationRepository;

    @Autowired PresenterRepository presenterRepository;

    public void generateMdFile(@PathVariable Long id) {

        String outputPath = "C:/Users/magnu/OneDrive/Skrivbord/attempt.md";

        // Select schedule from database.
        ScheduleModel scheduleModels = scheduleRepository.findById(1);

        List<Map<String, Object>> activityData = new ArrayList<>(); // Activity attributes
        Map<String, List<Map<String, Object>>> scheduleData = new HashMap<>(); // List of activities
        Map<String, Object> conferenceData = new HashMap<>(); // Conference data at top of markdown file
        ArrayList<Object> allData = new ArrayList<>(); // All of the above.

        // Declare conference data and add to allData.
        DateTimeFormatter conferenceTimeFormat = DateTimeFormatter.ISO_LOCAL_DATE;
        conferenceData.put("type", scheduleModels.getType());
        conferenceData.put("id", scheduleModels.getId());
        conferenceData.put("title", scheduleModels.getTitle());
        conferenceData.put("tagLine", scheduleModels.getTagLine());
        conferenceData.put("location", scheduleModels.getLocation());
        conferenceData.put("start", scheduleModels.getStart().format(conferenceTimeFormat));
        conferenceData.put("end", scheduleModels.getEnd().format(conferenceTimeFormat));
        conferenceData.put("image", "img/picture");
        conferenceData.put("active", scheduleModels.isActive());
        allData.add(conferenceData);

        // Select activities inside chosen schedule.
        List<ActivityModel> activityModel = activityRepository.findByScheduleId(scheduleModels.getId());

        // Iterate through all activities.
        for (ActivityModel model : activityModel) {
            LocationModel locationModel = locationRepository.findById(model.getId()).orElse(null);
            {

                // Initiate all activities attributes.
                if (locationModel != null) {

                    // Add values to attributes belonging to activity.
                    String[] coordinates = locationModel.getCoordinates().split("\\.");
                    Float latitude = Float.parseFloat(coordinates[0]);
                    Float longitude = Float.parseFloat(coordinates[1]);

                    LocalDateTime end_time = model.getEnd();
                    LocalDateTime start_time = model.getStart();

                    DateTimeFormatter activityFormat = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");

                    end_time.format(activityFormat);
                    start_time.format(activityFormat);

                    // Store all activity attributes in this list.
                    Map<String, Object> activityInformation = new HashMap<>();

                    activityInformation.put("winner", model.getWinner());
                    activityInformation.put("end", end_time.format(activityFormat));
                    activityInformation.put("start", start_time.format(activityFormat));
                    activityInformation.put("type", model.getType());
                    activityInformation.put("title", model.getTitle());
                    activityInformation.put("details", model.getDetails());

                    // List of location and coordinates attributes within activity.
                    Map<String, Object> locationInfo = new HashMap<>();
                    ArrayList<Float> coordinatesMap = new ArrayList<>();

                    coordinatesMap.add(longitude);
                    coordinatesMap.add(latitude);

                    locationInfo.put("coordinates", coordinatesMap);
                    locationInfo.put("title", locationModel.getTitle());

                    activityInformation.put("location", locationInfo);

                    // Iterate through all presenters and add to activity
                    List<PresenterModel> presenterModels = presenterRepository.findAll();
                    List<Object> presenters = new ArrayList<>();
                    for (PresenterModel value : presenterModels) {
                        if (value.getActivity().getId() == model.getId()) {
                            presenters.add(value.getName());
                        }
                    }

                    // Add all activity attributes to the activity list.
                    activityInformation.put("presenters", presenters);
                    activityData.add(activityInformation);
                }
            }
        }
        // Add all activities to the schedule.
        scheduleData.put("Schedule", activityData);
        // Add schedule to conference.
        allData.add(scheduleData);

        // Add conference to markdown file.
        Yaml yaml = new Yaml();
        String yamlDataFormat = yaml.dump(allData);
        try(FileWriter fileWriter = new FileWriter(outputPath)) {
            fileWriter.write(yamlDataFormat);
        }catch(IOException e) {
            e.getLocalizedMessage();
        }
    }
}

