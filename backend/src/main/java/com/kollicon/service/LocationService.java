package com.kollicon.controller;

import com.kollicon.model.LocationModel;
import com.kollicon.repository.LocationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class LocationService {

    @Autowired
    LocationRepository locationRepository;

    public LocationModel createLocation(LocationModel locationModel) {
        return locationRepository.save(locationModel);
    }

    public LocationModel getLocation(Long id) {
        return locationRepository.findById(id).get();
    }

    public LocationModel updateLocation(LocationModel updateLocation, Long id) {
        return locationRepository.findById(id)
                .map(existingLocation -> {
                    if (updateLocation.getCoordinates() != null) existingLocation.setCoordinates(updateLocation.getCoordinates());
                    if (updateLocation.getTitle() != null) existingLocation.setTitle(updateLocation.getTitle());
                    return locationRepository.save(existingLocation);
                })
                .orElse(null);
    }


    public String deleteLocation(Long id) {
        return "location with id " + id + " has been deleted";
    }
}
