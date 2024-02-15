package com.kollicon.controller;

import com.kollicon.model.ExternalPresenterModel;
import com.kollicon.service.ExternalPresenterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class ExternalPresenterController {
    @Autowired
    ExternalPresenterService externalPresenterService;

    @PostMapping("/external-presenter")
    public ExternalPresenterModel createPresenter(@RequestBody ExternalPresenterModel externalPresenterModel) {
        return externalPresenterService.createExternalPresenter(externalPresenterModel);
    }

    @GetMapping("/external-presenter/{id}")
    public ExternalPresenterModel getPresenter(@PathVariable Long id) {
        return externalPresenterService.getExternalPresenter(id);
    }

    @PutMapping("external-/presenter/update/{id}")
    public ExternalPresenterModel updatePresenter(@RequestBody ExternalPresenterModel externalPresenterModel, @PathVariable Long id) {
        return externalPresenterService.updateExternalPresenter(externalPresenterModel, id);
    }

    @DeleteMapping("/external-presenter/delete/{id}")
    public String deletePresenter(@PathVariable Long id) {
        return externalPresenterService.deleteExternalPresenter(id);
    }

    @GetMapping("/external-presenters")
    public List<ExternalPresenterModel> getAllPresenters() {
        return externalPresenterService.getAllExternalPresenters();
    }
}
