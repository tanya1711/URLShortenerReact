package com.example.demo.service;

import com.example.demo.entityclass.Admin;
import com.example.demo.entityclass.User;
import com.example.demo.mongorepository.AdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AdminService {

    @Autowired
    private AdminRepository adminRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public Optional<Admin> adminLogin(String email, String password) {
        System.out.println(adminRepository.findAll().get(0).getEmail());
        Optional<Admin> admin = adminRepository.findByEmail(email);
        if (admin.isPresent()) {
            return admin;
        }
        return Optional.empty();
    }

}
