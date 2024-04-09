package com.kollicon.service;

import org.springframework.stereotype.Service;
import java.util.Arrays;
import java.util.List;

@Service
public class AdminService {

    private final List<String> adminEmails = Arrays.asList(
            "patrik.nilsson@kits.se",
            "tobias.lans@kits.se",
            "alireza.h.khan@hotmail.com",
            "magnusolsson1994@hotmail.se",
            "christoffer.wallberg85@gmail.com",
            "johan_bengtsson89@outlook.com"
    );

    public boolean isAdminEmail(String email) {
        return adminEmails.contains(email);
    }
}