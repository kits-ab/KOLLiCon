package com.kollicon.service;

import com.kollicon.model.ScheduleModel;
import com.kollicon.repository.ScheduleRepository;
import jakarta.validation.Valid;
import org.springframework.beans.BeanWrapper;
import org.springframework.beans.BeanWrapperImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.beans.BeanUtils;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.server.ResponseStatusException;

import javax.naming.NameNotFoundException;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class ScheduleService {

    final ScheduleRepository scheduleRepository;

    @Autowired
    public ScheduleService(ScheduleRepository scheduleRepository) {
        this.scheduleRepository = scheduleRepository;
    }

    public List<ScheduleModel> findAllSchedules() {
        return  scheduleRepository.findAll();
    }

    public ScheduleModel createSchedule(ScheduleModel schedule) {
            return scheduleRepository.save(schedule);
    }

    public Optional<ScheduleModel> getScheduleById(Long id) {
        return scheduleRepository.findById(id);
    }

    public void deleteSchedule(Long id) {
        scheduleRepository.deleteById(id);
    }

    // Bean wrapper hämtar alla properties som är null och sparar dessa i en lista
    // Denna lista används sedan för att kopiera över de properties som inte är null
    public Optional<ScheduleModel> updateSchedule(ScheduleModel scheduleModel) {
        return scheduleRepository.findById(scheduleModel.getId())
                .map(schedule -> {
                    BeanUtils.copyProperties(scheduleModel, schedule, getNullPropertyNames(scheduleModel));
                    return scheduleRepository.save(schedule);
                });
    }

    private String[] getNullPropertyNames(ScheduleModel source) {
        final BeanWrapper src = new BeanWrapperImpl(source);
        java.beans.PropertyDescriptor[] pds = src.getPropertyDescriptors();

        Set<String> emptyNames = new HashSet<>();
        for (java.beans.PropertyDescriptor pd : pds) {
            Object srcValue = src.getPropertyValue(pd.getName());
            if (srcValue == null) emptyNames.add(pd.getName());
        }
        String[] result = new String[emptyNames.size()];

        return emptyNames.toArray(result);
    }

}
