package com.kollicon.service;

import com.kollicon.model.PresenterModel;
import com.kollicon.model.ReviewModel;
import com.kollicon.repository.PresenterRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.swing.text.html.Option;
import java.util.List;
import java.util.Optional;

@Service
public class PresenterService {


    @Autowired
    PresenterRepository presenterRepository;


    public PresenterModel createPresenter(PresenterModel presenterModel) {
        return presenterRepository.save(presenterModel);
    }

    public PresenterModel getPresenter(Long id) {
        return presenterRepository.findById(id).get();
    }

    public PresenterModel updatePresenter(PresenterModel presenterModel, Long id) {
        return presenterRepository.findById(id)
                .map(existingPresenter -> {
                    if (presenterModel.getName() != null) existingPresenter.setName(presenterModel.getName());
                    if (presenterModel.getImage() != null) existingPresenter.setImage(presenterModel.getImage());
                    return presenterRepository.save(existingPresenter);
                })
                .orElse(null);
    }

    public String deletePresenter(Long id) {
        return "presenter with id " + id + " has been deleted";
    }

    public List<PresenterModel> getAllPresenters() {
        return presenterRepository.findAll();
    }
}
