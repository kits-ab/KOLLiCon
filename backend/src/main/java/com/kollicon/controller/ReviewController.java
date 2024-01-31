package com.kollicon.controller;

import com.kollicon.model.ReviewModel;
import com.kollicon.repository.ReviewRepository;
import com.kollicon.service.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/")
public class ReviewController {

    @Autowired
    ReviewService reviewService;

    @PostMapping("createreview")
    public ReviewModel createReview(@RequestBody ReviewModel reviewModel) {
        return reviewService.createReview(reviewModel);
    }

    @GetMapping("getreview/{id}")
    public ReviewModel getReview(@PathVariable String id) {
        return reviewService.getReview(id);
    }

    @PutMapping("updatereview/{id}")
    public ReviewModel updateReview(@RequestBody ReviewModel reviewModel, @PathVariable String id) {
        return reviewService.updateReview(reviewModel, id);
    }

    @DeleteMapping("deletereview/{id}")
    public String deleteReview(@PathVariable String id) {
        return reviewService.deleteReview(id);
    }
}
