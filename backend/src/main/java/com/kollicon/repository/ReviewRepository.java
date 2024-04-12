package com.kollicon.repository;

import com.kollicon.model.ReviewModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReviewRepository extends JpaRepository<ReviewModel, Long> {

    @Query(value = "SELECT review.* FROM presenter JOIN review ON presenter.activity_id = review.activity_id WHERE presenter.email = :presenterEmail", nativeQuery = true)
    List<ReviewModel> getReviewForPresenter(@Param("presenterEmail") String presenterEmail);

}
