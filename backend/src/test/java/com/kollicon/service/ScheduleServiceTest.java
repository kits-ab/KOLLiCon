package com.kollicon.service;

import com.kollicon.model.ScheduleModel;
import com.kollicon.repository.ScheduleRepository;
import com.kollicon.service.ScheduleService;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.time.LocalDate;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertInstanceOf;
import static org.mockito.Mockito.*;
import com.kollicon.model.ScheduleModel;

public class ScheduleServiceTest {

    @Mock
    private ScheduleRepository scheduleRepository;

    @InjectMocks
    private ScheduleService scheduleService;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testCreateSchedule() {
        ScheduleModel schedule = new ScheduleModel();
        when(scheduleRepository.save(schedule)).thenReturn(schedule);

        ScheduleModel result = scheduleService.createSchedule(schedule);

        assertEquals(schedule, result);
        verify(scheduleRepository, times(1)).save(schedule);
        System.out.println(scheduleRepository.getReferenceById(schedule.getId()));

    }

    @Test
    public void testGetScheduleById() {
        Long id = 1L;
        ScheduleModel schedule = new ScheduleModel();
        when(scheduleRepository.findById(id)).thenReturn(Optional.of(schedule));

        Optional<ScheduleModel> result = scheduleService.getScheduleById(id);

        assertEquals(Optional.of(schedule), result);
        verify(scheduleRepository, times(1)).findById(id);
    }


    @Test
    public void testDeleteSchedule() {
        Long id = 1L;
        ScheduleModel scheduleModel = new ScheduleModel();
        scheduleModel.setId(id);
        when(scheduleRepository.findById(id)).thenReturn(Optional.of(scheduleModel));
        scheduleService.deleteSchedule(id);

        verify(scheduleRepository, times(1)).deleteById(id);
    }

    @Test
    public void testUpdateSchedule() {
        Long id = 1L;
        ScheduleModel scheduleModel = new ScheduleModel();
        scheduleModel.setId(id);
        ScheduleModel existingSchedule = new ScheduleModel();
        existingSchedule.setId(id);
        when(scheduleRepository.findById(id)).thenReturn(Optional.of(existingSchedule));
        when(scheduleRepository.save(existingSchedule)).thenReturn(existingSchedule);

        Optional<ScheduleModel> result = scheduleService.updateSchedule(scheduleModel);

        assertEquals(Optional.of(existingSchedule), result);
        verify(scheduleRepository, times(1)).findById(id);
        verify(scheduleRepository, times(1)).save(existingSchedule);
    }

}