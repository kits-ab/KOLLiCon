package com.kollicon.controller;

import com.kollicon.model.PresenterModel;
import com.kollicon.service.PresenterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class PresenterController {


    @Autowired
    PresenterService presenterService;

    @PostMapping("/presenter")
    public PresenterModel createPresenter(@RequestBody PresenterModel presenterModel) {
        return presenterService.createPresenter(presenterModel);
    }

    @GetMapping("/presenter/{id}")
    public PresenterModel getPresenter(@PathVariable Long id) {
        return presenterService.getPresenter(id);
    }

    @PutMapping("/presenter/update/{id}")
    public PresenterModel updatePresenter(@RequestBody PresenterModel presenterModel, @PathVariable Long id) {
        return presenterService.updatePresenter(presenterModel, id);
    }

    @DeleteMapping("/presenter/delete/{id}")
    public String deletePresenter(@PathVariable Long id) {
        return presenterService.deletePresenter(id);
    }

}
