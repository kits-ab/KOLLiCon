package com.kollicon.service;

import com.kollicon.model.ActivityModel;
import com.kollicon.model.LocationModel;
import com.kollicon.model.PresenterModel;
import com.kollicon.model.ScheduleModel;
import com.kollicon.repository.*;
import org.springframework.cglib.core.Local;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
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

        ScheduleModel scheduleModels = scheduleRepository.findById(1);
        PresenterModel presenterModel = presenterRepository.findById(1);

        ArrayList<Object> allData = new ArrayList<>(); // Contains all the other lists
        Map<String, Object> conferenceData = new HashMap<>(); // Contains conference data.
        Map<String, List<Map<String, Object>>> scheduleData = new HashMap<>(); // Contains schedule data
        List<Map<String, Object>> activityData = new ArrayList<>(); // Contains activity data

        DateTimeFormatter conferenceTimeFormat = DateTimeFormatter.ISO_LOCAL_DATE;

        // Declare conference data.
        conferenceData.put("type", scheduleModels.getType());
        conferenceData.put("id", scheduleModels.getId());
        conferenceData.put("title", scheduleModels.getTitle());
        conferenceData.put("tagLine", scheduleModels.getTagLine());
        conferenceData.put("location", scheduleModels.getLocation());
        conferenceData.put("start", scheduleModels.getStart().format(conferenceTimeFormat));
        conferenceData.put("end", scheduleModels.getEnd().format(conferenceTimeFormat));
        conferenceData.put("image", presenterModel.getAvatarSrc());
        conferenceData.put("active", scheduleModels.isActive());

        allData.add(conferenceData);

        List<ActivityModel> activityModel = activityRepository.findByScheduleId(scheduleModels.getId());


        for (ActivityModel model : activityModel) {
            LocationModel locationModel = locationRepository.findById(model.getId()).orElse(null);
            {

                if (locationModel != null) {
                    String[] coordinates = locationModel.getCoordinates().split("\\.");
                    Float latitude = Float.parseFloat(coordinates[0]);
                    Float longitude = Float.parseFloat(coordinates[1]);

                    LocalDateTime end_time = model.getEnd();
                    LocalDateTime start_time = model.getStart();

                    DateTimeFormatter activityFormat = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");

                    end_time.format(activityFormat);
                    start_time.format(activityFormat);

                    Map<String, Object> activityInformation = new HashMap<>();
                    List<PresenterModel> presenterModels = presenterRepository.findAll();

                    activityInformation.put("winner", model.getWinner());
                    activityInformation.put("end", end_time.format(activityFormat));
                    activityInformation.put("start", start_time.format(activityFormat));
                    activityInformation.put("type", model.getType());
                    activityInformation.put("title", model.getTitle());
                    activityInformation.put("details", model.getDetails());

                    Map<String, Object> locationInfo = new HashMap<>();
                    ArrayList<Float> coordinatesMap = new ArrayList<>();

                    coordinatesMap.add(longitude);
                    coordinatesMap.add(latitude);

                    locationInfo.put("coordinates", coordinatesMap);
                    locationInfo.put("title", locationModel.getTitle());

                    activityInformation.put("location", locationInfo);

                    List<Object> presenters = new ArrayList<>();

                    for (PresenterModel value : presenterModels) {
                        if (value.getActivity().getId() == model.getId()) {
                            presenters.add(value.getName());
                        }
                    }

                    activityInformation.put("presenters", presenters);
                    activityData.add(activityInformation);
                }
            }
        }

        scheduleData.put("Schedule", activityData);
        allData.add(scheduleData);

        Yaml yaml = new Yaml();
        String yamlDataFormat = yaml.dump(allData);
        try(FileWriter fileWriter = new FileWriter(outputPath)) {
            fileWriter.write(yamlDataFormat);
        }catch(IOException e) {
            e.getLocalizedMessage();
        }
    }
}

