package com.kollicon.controller;

import com.kollicon.model.ReviewModel;
import com.kollicon.service.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
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
    public ReviewModel getReview(@PathVariable Long id) {
        return reviewService.getReview(id);
    }

    @DeleteMapping("deletereview")
    public String deleteReview(@PathVariable Long id) {
        return reviewService.deleteReview(id);
    }

    @PutMapping("updatereview/{id}")
    public ReviewModel updateReview( @RequestBody ReviewModel updatedReview, @PathVariable Long id) {
        return reviewService.updateReview(updatedReview, id);
    }
}
