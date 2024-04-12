package com.kollicon.controller;

import com.kollicon.model.ReviewModel;
import com.kollicon.service.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/")
public class ReviewController {

    @Autowired
    ReviewService reviewService;

    @PostMapping("review/create")
    public ReviewModel createReview(@RequestBody ReviewModel reviewModel) {
        return reviewService.createReview(reviewModel);
    }

    @GetMapping("review")
    public List<ReviewModel> getReviewForPresenter(@RequestParam String presenterEmail) {
        return reviewService.getReviewsForPresenter(presenterEmail);
    }

    @GetMapping("review/{id}")
    public ReviewModel getReview(@PathVariable Long id) {
        return reviewService.getReview(id);
    }

    @DeleteMapping("review/delete/{id}")
    public String deleteReview(@PathVariable Long id) {
        return reviewService.deleteReview(id);
    }

    @PutMapping("review/update/{id}")
    public ReviewModel updateReview(@RequestBody ReviewModel updatedReview, @PathVariable Long id) {
        return reviewService.updateReview(updatedReview, id);
    }

    @GetMapping("reviews")
    public List<ReviewModel> getAllReviews() {
        return reviewService.getAllReviews();
    }
}
