package com.kollicon.controller;

import com.kollicon.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@Validated
public class AdminController {

    @Autowired
    private AdminService adminService;

    @GetMapping("/admin/email/{email}")
    public boolean isAdminEmail(@PathVariable @Validated String email) {
        return adminService.isAdminEmail(email);
    }
}
