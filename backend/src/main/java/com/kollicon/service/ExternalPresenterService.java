package com.kollicon.service;

import com.kollicon.model.ExternalPresenterModel;
import com.kollicon.repository.ExternalPresenterRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ExternalPresenterService {
    @Autowired
    ExternalPresenterRepository externalPresenterRepository;


    public ExternalPresenterModel createExternalPresenter(ExternalPresenterModel externalPresenterModel) {
        return externalPresenterRepository.save(externalPresenterModel);
    }

    public ExternalPresenterModel getExternalPresenter(Long id) {
        return externalPresenterRepository.findById(id).get();
    }

    public ExternalPresenterModel updateExternalPresenter(ExternalPresenterModel presenterModel, Long id) {
        return externalPresenterRepository.findById(id)
                .map(existingPresenter -> {
                    if (presenterModel.getName() != null) existingPresenter.setName(presenterModel.getName());
                    if (presenterModel.getAvatarSrc() != null) existingPresenter.setAvatarSrc(presenterModel.getAvatarSrc());
                    return externalPresenterRepository.save(existingPresenter);
                })
                .orElse(null);
    }

    public String deleteExternalPresenter(Long id) {
        externalPresenterRepository.deleteById(id);
        return "presenter with id " + id + " has been deleted";
    }

    public List<ExternalPresenterModel> getAllExternalPresenters() {
        return externalPresenterRepository.findAll();
    }
}
