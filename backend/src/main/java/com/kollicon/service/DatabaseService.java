package com.kollicon.service;

import com.kollicon.model.ActivityModel;
import com.kollicon.model.LocationModel;
import com.kollicon.model.PresenterModel;
import com.kollicon.model.ScheduleModel;
import com.kollicon.repository.ActivityRepository;
import com.kollicon.repository.LocationRepository;
import com.kollicon.repository.PresenterRepository;
import com.kollicon.repository.ScheduleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import org.yaml.snakeyaml.DumperOptions;
import org.yaml.snakeyaml.Yaml;

import java.io.FileWriter;
import java.io.IOException;
import java.util.*;
import java.time.format.DateTimeFormatter;

@Service
public class DatabaseService {

    @Autowired
    private ScheduleRepository scheduleRepository;
    @Autowired
    ActivityRepository activityRepository;
    @Autowired
    LocationRepository locationRepository;
    @Autowired
    PresenterRepository presenterRepository;

    private String generatedYamlObject;

    public void generateMdFile(@PathVariable Long id) {

        String outputPath = "C:\\Users\\magnu\\OneDrive\\Skrivbord\\alireza.md";
        Map<String, Object> ScheduleData = new LinkedHashMap ();

        // Get schedule
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


        // Iterate through activities
        List<ActivityModel> activityModel = activityRepository.findByScheduleId(scheduleModel.getId());

        List<Map<String, Object>> activities = new ArrayList<>();

        for (ActivityModel model : activityModel) {

            Map<String, Object> activityMap = new HashMap<>();
            DateTimeFormatter activityFormat = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");

            activityMap.put("winner", model.getWinner());
            activityMap.put("start", model.getStart().format(activityFormat));
            activityMap.put("end", model.getEnd().format(activityFormat));
            activityMap.put("details", model.getDetails());
            activityMap.put("title", model.getTitle());
            activityMap.put("type", model.getType());

            List<Double> storeCoordinatesInThisList = new ArrayList<>();
            Map<String, Object> addCoordinatesToThisMapFromList = new HashMap<>();


            if(!model.getLocation().getCoordinates().isEmpty() && !model.getLocation().getTitle().isEmpty() && !model.getLocation().getSubtitle().isEmpty()) {
                String[] coordinates = model.getLocation().getCoordinates().split(",");
                double latitude = Double.parseDouble(coordinates[0]);
                double longitude = Double.parseDouble(coordinates[1]);

                storeCoordinatesInThisList.add(latitude);
                storeCoordinatesInThisList.add(longitude);
                addCoordinatesToThisMapFromList.put("coordinates", storeCoordinatesInThisList);
                addCoordinatesToThisMapFromList.put("title", model.getLocation().getTitle());

                activityMap.put("location", addCoordinatesToThisMapFromList);
            }
            // Kolla nu om presenters finns i aktiviteten
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

        ScheduleData.put("schema", activities);

        String scheduleDescription = scheduleModel.getDescription();

        // YAML DOCUMENTATION
        DumperOptions options = new DumperOptions();
        options.setDefaultFlowStyle(DumperOptions.FlowStyle.BLOCK);

        Yaml yaml = new Yaml(options);
        String yamlDataFormat = yaml.dump(ScheduleData);

        yamlDataFormat = "---\n" + yamlDataFormat + "---\n\n" + scheduleDescription;
        generatedYamlObject = yamlDataFormat;

        try(FileWriter fileWriter = new FileWriter(outputPath)) {
            fileWriter.write(yamlDataFormat);
        }catch(IOException e) {
            e.getLocalizedMessage();
        }
    }

    public String getGeneratedYamlObject() {
        return generatedYamlObject;
    }

    public String getTitle(Long id) {
        return scheduleRepository.findById(id).get().getTitle();
    }
}
