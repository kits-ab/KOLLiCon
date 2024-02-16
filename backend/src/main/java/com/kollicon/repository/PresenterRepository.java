package com.kollicon.repository;


import com.kollicon.model.PresenterModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PresenterRepository extends JpaRepository<PresenterModel, Long> {

    PresenterModel findById(int i);
    List<PresenterModel> findByActivityId(Long activityId);

}
