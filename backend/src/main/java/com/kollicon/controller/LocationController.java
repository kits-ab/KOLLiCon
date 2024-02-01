package com.kollicon.controller;


import com.kollicon.model.LocationModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class LocationController {

    @Autowired
    com.kollicon.controller.LocationService locationService;

    @PostMapping("/location")
    public LocationModel createLocation(@RequestBody LocationModel locationModel) {
        return locationService.createLocation(locationModel);
    }

    @GetMapping("/location/{id}")
    public LocationModel getLocation(@PathVariable Long id) {
        return locationService.getLocation(id);
    }

    @PutMapping("/location/update/{id}")
    public LocationModel updateLocation(@RequestBody LocationModel locationModel, @PathVariable Long id) {
        return locationService.updateLocation(locationModel, id);
    }

    @DeleteMapping("/location/delete/{id}")
    public String deleteLocation(@PathVariable Long id) {
        return locationService.deleteLocation(id);
    }
}
