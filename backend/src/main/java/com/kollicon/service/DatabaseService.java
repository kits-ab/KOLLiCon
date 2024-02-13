package com.kollicon.service;

import com.kollicon.model.ActivityModel;
import com.kollicon.model.LocationModel;
import com.kollicon.model.ScheduleModel;
import com.kollicon.repository.ActivityRepository;
import com.kollicon.repository.LocationRepository;
import com.kollicon.repository.ScheduleRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
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

    public void generateMdFile(@PathVariable Long id) {

        String outputPath = "C:/Users/magnu/OneDrive/Skrivbord/again.md";

        ScheduleModel scheduleModels = scheduleRepository.findById(1);
        Map<String, List<Map<String, Object>>> scheduleData = new HashMap<>();
        List<Map<String, Object>> activityData = new ArrayList<>();

        ArrayList<Object> allData = new ArrayList<>();

        DateTimeFormatter conferenceTimeFormat = DateTimeFormatter.ofPattern("yyyy-MM-dd ");
        LocalDate conferenceStartTime = scheduleModels.getStart();
        LocalDate conferenceEndTime = scheduleModels.getEnd();

        Map<String, Object> conferenceData = new HashMap<>();
        conferenceData.put("type", scheduleModels.getType());
        conferenceData.put("id", scheduleModels.getId());
        conferenceData.put("title", scheduleModels.getTitle());
        conferenceData.put("tagLine", scheduleModels.getTagLine());
        conferenceData.put("location", scheduleModels.getLocation());
        conferenceData.put("start", scheduleModels.getStart().format(conferenceTimeFormat));
        conferenceData.put("end", conferenceEndTime);
        conferenceData.put("image", null);
        conferenceData.put("active", scheduleModels.isActive());
        allData.add(conferenceData);

        for(ActivityModel activityModel : activityRepository.findByScheduleId(scheduleModels.getId())) {
                LocationModel locationModel = locationRepository.findById(activityModel.getId()).orElse(null);

                if(locationModel != null) {
                    String [] coordinates = locationModel.getCoordinates().split("\\.");
                    Float latitude = Float.parseFloat(coordinates[0]);
                    Float longitude = Float.parseFloat(coordinates[1]);

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

// Stoppa in en hashmap med scheduele data först.
// Då får du två stycken hasmaps inuti arraylist