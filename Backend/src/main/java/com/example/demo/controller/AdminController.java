package com.example.demo.controller;

import com.example.demo.entityclass.Admin;
import com.example.demo.entityclass.User;
import com.example.demo.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
public class AdminController {

    @Autowired
    private AdminService adminService;

    @PostMapping("/adminLogin")
    public Admin loginAdmin(@RequestBody Admin loginAdmin) {
        Optional<Admin> user = adminService.adminLogin(loginAdmin.getEmail(), loginAdmin.getPassword());
        if (user.isPresent()) {
            return user.get();
        } else {
            throw new RuntimeException("Invalid username");
        }
    }

}
