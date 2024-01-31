package com.kollicon.service;

import com.kollicon.model.ReviewModel;
import com.kollicon.repository.ReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ReviewService {

    @Autowired
    private ReviewRepository reviewRepository;

    public ReviewModel createReview(ReviewModel reviewModel) {
        return reviewRepository.save(reviewModel);
    }

    public ReviewModel getReview(String id) {
        return reviewRepository.findById(id).get();
    }

    public ReviewModel updateReview(ReviewModel reviewModel, String id) {
        return reviewRepository.save(reviewModel);
    }

    public String deleteReview(String id) {
        reviewRepository.deleteById(id);
        return "Review with id " + id + " has been deleted";
    }
}
