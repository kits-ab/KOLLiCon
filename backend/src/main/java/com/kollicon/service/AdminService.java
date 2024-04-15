package com.kollicon.service;

import com.kollicon.repository.AdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AdminService {

        @Autowired
        private AdminRepository adminRepository;

        public boolean isAdminEmail(String email) {
            return adminRepository.existsByEmail(email);
        }
    }