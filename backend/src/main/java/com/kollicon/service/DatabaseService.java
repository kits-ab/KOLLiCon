package com.kollicon.service;

import com.kollicon.model.ActivityModel;
import com.kollicon.model.LocationModel;
import com.kollicon.model.PresenterModel;
import com.kollicon.model.ScheduleModel;
import com.kollicon.repository.*;
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



        String outputPath = "C:/Users/magnu/OneDrive/Skrivbord/titta.md";

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

        // Add conference data. This data goes to the top of the markdown file.
        allData.add(conferenceData);

        // Iterate through the activities of a particular schedule. (Select schedule at line 45 above)
        for(ActivityModel activityModel : activityRepository.findByScheduleId(scheduleModels.getId())) {
            // Get location of selected schedule.
                LocationModel locationModel = locationRepository.findById(activityModel.getId()).orElse(null);

            if(locationModel != null) {
                    // Divide coordinates data into latitude and longitude
                    String [] coordinates = locationModel.getCoordinates().split("\\.");
                    Float latitude = Float.parseFloat(coordinates[0]);
                    Float longitude = Float.parseFloat(coordinates[1]);

                    // Redefine end and start time of activity
                    LocalDateTime end_time = activityModel.getEnd();
                    LocalDateTime start_time = activityModel.getStart();

                    DateTimeFormatter format = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");

                    end_time.format(format);
                    start_time.format(format);

                    // Add activity data to HashMap activityInformation
                    Map<String, Object> activityInformation = new HashMap<>();
                    activityInformation.put("winner", activityModel.getWinner());
                    activityInformation.put("end",end_time.format(format));
                    activityInformation.put("start", start_time.format(format));
                    activityInformation.put("type",  activityModel.getType());
                    activityInformation.put("title", activityModel.getTitle());
                    activityInformation.put("details", activityModel.getDetails());

                    // Get all presenters
                    List<PresenterModel> presenterModels1 = presenterRepository.findByActivityId((long) activityModel.
                            getSchedule().getId());

                    // Iterate through all presenters
                int i = 0;
                for(PresenterModel presenterModel1 : presenterModels1) {
                    if(
                        presenterModel1.getActivity().getId() == scheduleModels.getId() && presenterModel1.getActivity().getPresenter().size() != i)  {
                        i++;
                        String name = presenterModel1.getName();
                        System.out.println("Name: " + name.replace(" ", "").toLowerCase());
                    }
                }

                    // Add coordinates and title to HashMap
                    List<String> presenterInfo = new ArrayList<>();
                    Map<String, Object> locationInfo = new HashMap<>();
                    ArrayList<Float> coordinatesMap = new ArrayList<>();

                    coordinatesMap.add(longitude);
                    coordinatesMap.add(latitude);

                    locationInfo.put("coordinates", coordinatesMap);
                    locationInfo.put("title", locationModel.getTitle());

                    activityInformation.put("location", locationInfo);
                    activityInformation.put("presenters", presenterInfo);

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
