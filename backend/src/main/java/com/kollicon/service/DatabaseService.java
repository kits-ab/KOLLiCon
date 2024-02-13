package com.kollicon.service;

import com.kollicon.model.ActivityModel;
import com.kollicon.model.LocationModel;
import com.kollicon.model.ScheduleModel;
import com.kollicon.repository.ActivityRepository;
import com.kollicon.repository.LocationRepository;
import com.kollicon.repository.ScheduleRepository;
import org.springframework.stereotype.Service;
import java.time.format.DateTimeFormatter;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.yaml.snakeyaml.Yaml;

import java.io.FileWriter;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
@Service
public class DatabaseService {

    @Autowired
    private ScheduleRepository scheduleRepository;

    @Autowired
    private ActivityRepository activityRepository;

    @Autowired
    private LocationRepository locationRepository;

    public void generateMdFile() {

        String outputPath = "C:/Users/magnu/OneDrive/Skrivbord/yolo.md";

        List<ScheduleModel> scheduleModels = scheduleRepository.findAll();

        Map<String, List<Map<String, Object>>> scheduleData = new HashMap<>();

        for(ScheduleModel scheduleModel : scheduleModels) {
            List<Map<String, Object>> activityData = new ArrayList<>();

            for(ActivityModel activityModel : activityRepository.findByScheduleId(scheduleModel.getId())) {
                LocationModel locationModel = locationRepository.findById(activityModel.getId()).orElse(null);

                if(locationModel != null) {
                    String [] coordinates = locationModel.getCoordinates().split("\\.");
                    Float latitude = Float.parseFloat("-" + coordinates[0]);
                    Float longitude = Float.parseFloat("-" + coordinates[1]);

                    LocalDateTime end_time = activityModel.getEnd();
                    LocalDateTime start_time = activityModel.getStart();

                    DateTimeFormatter format = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");
                    end_time.format(format);
                    start_time.format(format);

                    Map<String, Object> activityInformation = new HashMap<>();
                    activityInformation.put("winner", activityModel.getWinner());
                    activityInformation.put("end",end_time.format(format));
                    activityInformation.put("start", start_time.format(format));
                    activityInformation.put("type",  activityModel.getType());
                    activityInformation.put("title", activityModel.getTitle());
                    activityInformation.put("details", activityModel.getDetails());

                    Map<String, Object> locationInfo = new HashMap<>();
                    ArrayList<Float> coordinatesMap = new ArrayList<>();

                    coordinatesMap.add(longitude);
                    coordinatesMap.add(latitude);

                    locationInfo.put("coordinates", coordinatesMap);
                    locationInfo.put("title", locationModel.getTitle());

                    activityInformation.put("location", locationInfo);

                    activityData.add(activityInformation);
                }
            }

            scheduleData.put("Schedule", activityData);
        }

        Yaml yaml = new Yaml();
        String yamlDataFormat = yaml.dump(scheduleData);

        try(FileWriter fileWriter = new FileWriter(outputPath)) {
            fileWriter.write(yamlDataFormat);
        }catch(IOException e) {
            e.getLocalizedMessage();
        }
    }
}
