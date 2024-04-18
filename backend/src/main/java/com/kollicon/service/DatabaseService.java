package com.kollicon.service;

import com.kollicon.model.ActivityModel;
import com.kollicon.model.PresenterModel;
import com.kollicon.model.ScheduleModel;
import com.kollicon.repository.ActivityRepository;
import com.kollicon.repository.PresenterRepository;
import com.kollicon.repository.ScheduleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.yaml.snakeyaml.DumperOptions;
import org.yaml.snakeyaml.Yaml;

import java.util.*;
import java.time.format.DateTimeFormatter;

@Service
public class DatabaseService {

    @Autowired
    private ScheduleRepository scheduleRepository;
    @Autowired
    ActivityRepository activityRepository;

    @Autowired
    PresenterRepository presenterRepository;

    private String generatedYamlObject;


    // Put schedule data inside LinkedHashMap.
    public void handleSchedule(Long id) {

        Map<String, Object> ScheduleData = new LinkedHashMap();

        Optional<ScheduleModel> scheduleModelOptional = scheduleRepository.findById(id);
        ScheduleModel scheduleModel =
                scheduleModelOptional.orElseThrow(() -> new NoSuchElementException("Schedule not found!"));

        DateTimeFormatter conferenceTimeFormat = DateTimeFormatter.ofPattern("yyyy-MM-dd");

        ScheduleData.put("type", scheduleModel.getType());
        ScheduleData.put("id", scheduleModel.getId());
        ScheduleData.put("title", scheduleModel.getTitle());
        ScheduleData.put("tagLine", scheduleModel.getTagLine());
        ScheduleData.put("location", scheduleModel.getLocation());
        ScheduleData.put("start", scheduleModel.getStart().format(conferenceTimeFormat));
        ScheduleData.put("end", scheduleModel.getEnd().format(conferenceTimeFormat));
        ScheduleData.put("image", "img/picture");
        ScheduleData.put("active", scheduleModel.isActive());

        handleActivity(scheduleModel, ScheduleData);
    }

    // Handle activity data.
    public void handleActivity(ScheduleModel scheduleModel, Map<String, Object> ScheduleData) {

        List<ActivityModel> activityModel = activityRepository.findByScheduleId(scheduleModel.getId());
        List<Map<String, Object>> activities = new ArrayList<>();

        for (ActivityModel model : activityModel) {

            Map<String, Object> activityMap = new HashMap<>();
            DateTimeFormatter activityFormat = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");

            activityMap.put("winner", model.getWinner());
            activityMap.put("start", model.getStart().format(activityFormat));
            activityMap.put("end", model.getEnd().format(activityFormat));
            if(!model.getDetails().isEmpty()) {
                activityMap.put("details", model.getDetails());
            }
            activityMap.put("title", model.getTitle());
            activityMap.put("type", model.getType());

            // HandleLocation method call.
            if(!model.getLocation().getCoordinates().isEmpty())
                activityMap.put("location", handleLocation(model));

            // Handlepresenter method call
            handlePresenters(activityMap, activities, model);
        }

        ScheduleData.put("schema", activities);
        String scheduleDescription = scheduleModel.getDescription();
        generateMdFile(scheduleDescription, ScheduleData);
    }

    // Handle location data
    public Map<String, Object> handleLocation(ActivityModel model) {
        List<Double> storeCoordinatesInThisList = new ArrayList<>();
        Map<String, Object> addCoordinatesToThisMapFromList = new HashMap<>();

        String[] coordinates = model.getLocation().getCoordinates().split(",");
        double latitude = Double.parseDouble(coordinates[0]);
        double longitude = Double.parseDouble(coordinates[1]);

        storeCoordinatesInThisList.add(latitude);
        storeCoordinatesInThisList.add(longitude);
        addCoordinatesToThisMapFromList.put("coordinates", storeCoordinatesInThisList);
        addCoordinatesToThisMapFromList.put("title", model.getLocation().getTitle());

        return addCoordinatesToThisMapFromList;
    }

    // Handle presenter data
    public void handlePresenters(Map<String, Object> activityMap, List<Map<String, Object>> activities,
                                 ActivityModel model) {

        List<PresenterModel> allPresenters = presenterRepository.findAll();
        List<Object> selectedPresenter = new ArrayList<>();

        for (PresenterModel allPresenter : allPresenters) {
            if (model.getId() == allPresenter.getActivity().getId()) {
                selectedPresenter.add(allPresenter.getName().toLowerCase().replaceAll(" ", ""));
                activityMap.put("presenters", selectedPresenter);
            }
        }
        activities.add(activityMap);
    }

    // Generate yaml object.
    public void generateMdFile(String scheduleDescription,  Map<String, Object> scheduleData) {
        DumperOptions options = new DumperOptions();
        options.setDefaultFlowStyle(DumperOptions.FlowStyle.BLOCK);

        Yaml yaml = new Yaml(options);
        String yamlDataFormat = yaml.dump(scheduleData);

        yamlDataFormat = "---\n" + yamlDataFormat + "---\n\n" + scheduleDescription;
        generatedYamlObject = yamlDataFormat;
    }

    public String getGeneratedYamlObject() {
        return generatedYamlObject;
    }

    public String getTitle(Long id) {
        return scheduleRepository.findById(id).get().getTitle();
    }
}
