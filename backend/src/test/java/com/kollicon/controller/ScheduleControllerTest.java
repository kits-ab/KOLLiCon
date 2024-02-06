package com.kollicon.controller;

import com.kollicon.model.ScheduleModel;
import com.kollicon.service.ScheduleService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

public class ScheduleControllerTest {

    @Mock
    private ScheduleService scheduleService;

    @InjectMocks
    private ScheduleController scheduleController;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testCreateSchedule() {
        ScheduleModel schedule = new ScheduleModel();
        when(scheduleService.createSchedule(schedule)).thenReturn(schedule);

        ScheduleModel result = scheduleController.createSchedule(schedule);

        assertEquals(schedule, result);
        verify(scheduleService, times(1)).createSchedule(schedule);
    }

    @Test
    public void testGetScheduleById() {
        Long id = 1L;
        ScheduleModel schedule = new ScheduleModel();
        when(scheduleService.getScheduleById(id)).thenReturn(Optional.of(schedule));

        Optional<ScheduleModel> result = scheduleController.getScheduleById(id);

        assertEquals(Optional.of(schedule), result);
        verify(scheduleService, times(2)).getScheduleById(id);
    }


    @Test
    public void testGetScheduleByIdNotFound() {
        Long id = 1L;
        when(scheduleService.getScheduleById(id)).thenReturn(Optional.empty());

        assertThrows(ResponseStatusException.class, () -> {
            scheduleController.getScheduleById(id);
        });
        verify(scheduleService, times(1)).getScheduleById(id);
    }


    @Test
    public void testUpdateSchedule() {
        Long id = 1L;
        ScheduleModel scheduleModel = new ScheduleModel();
        scheduleModel.setId(id);
        when(scheduleService.getScheduleById(scheduleModel.getId())).thenReturn(Optional.of(scheduleModel));
        when(scheduleService.updateSchedule(scheduleModel)).thenReturn(Optional.of(scheduleModel));

        Optional<ScheduleModel> result = scheduleController.updateSchedule(scheduleModel);

        assertEquals(Optional.of(scheduleModel), result);
        verify(scheduleService, times(1)).getScheduleById(scheduleModel.getId());
        verify(scheduleService, times(1)).updateSchedule(scheduleModel);
    }

    @Test
    public void testUpdateScheduleNotFound() {
        Long id = 1L;
        ScheduleModel scheduleModel = new ScheduleModel();
        scheduleModel.setId(id);
        when(scheduleService.getScheduleById(scheduleModel.getId())).thenReturn(Optional.empty());

        assertThrows(ResponseStatusException.class, () -> {
            scheduleController.updateSchedule(scheduleModel);
        });
        verify(scheduleService, times(1)).getScheduleById(scheduleModel.getId());
        verify(scheduleService, never()).updateSchedule(scheduleModel);
    }

    @Test
    public void testDeleteSchedule() {
        Long id = 1L;
        when(scheduleService.getScheduleById(id)).thenReturn(Optional.of(new ScheduleModel()));

        String result = scheduleController.deleteSchedule(id);

        assertEquals("Schedule was deleted", result);
        verify(scheduleService, times(1)).getScheduleById(id);
        verify(scheduleService, times(1)).deleteSchedule(id);
    }

    @Test
    public void testDeleteScheduleNotFound() {
        Long id = 1L;
        when(scheduleService.getScheduleById(id)).thenReturn(Optional.empty());

        assertThrows(ResponseStatusException.class, () -> {
            scheduleController.deleteSchedule(id);
        });
        verify(scheduleService, times(1)).getScheduleById(id);
        verify(scheduleService, never()).deleteSchedule(id);
    }
}