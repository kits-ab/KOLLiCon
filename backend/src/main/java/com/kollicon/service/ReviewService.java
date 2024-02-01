package com.kollicon.service;


import com.kollicon.model.ReviewModel;
import com.kollicon.repository.ReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.swing.text.html.Option;
import java.util.Optional;

@Service
public class ReviewService {

    @Autowired
    ReviewRepository reviewRepository;

    public ReviewModel createReview(ReviewModel reviewModel) {
        return reviewRepository.save(reviewModel);
    }

    public ReviewModel getReview(Long id) {
        return reviewRepository.findById(id).get();
    }

    public String deleteReview(Long id) {
        return "Review with id " + id + " has been deleted!";
    }

    public ReviewModel updateReview(ReviewModel updatedReview, Long id) {
        Optional<ReviewModel> existingReviewOptional = reviewRepository.findById(id);

        if (existingReviewOptional.isPresent()) {
            ReviewModel existingReview = existingReviewOptional.get();

            if (updatedReview.getUserId() != null) {
                existingReview.setUserId(updatedReview.getUserId());
            }

            if (updatedReview.getReview() != null) {
                existingReview.setReview(updatedReview.getReview());
            }

            if (updatedReview.getRate() > -1) {
                existingReview.setRate(updatedReview.getRate());
            }

            return reviewRepository.save(existingReview);
        } else {
            return null;
        }
    }

}
