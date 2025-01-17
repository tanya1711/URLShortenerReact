package com.example.demo.controller;

import com.example.demo.entityclass.User;
import com.example.demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
public class UserController {

    @Autowired
    private UserService userService;


    @RequestMapping(method = RequestMethod.POST, value="/signup")
    public User signup(@RequestBody User user) {
        Integer maxUserId = userService.getMaxUserId();
        user.setUserId(maxUserId+1);
        user.setPlanId(0);
        return userService.saveUser(user);
    }

    @PostMapping("/login")
    public User login(@RequestBody User loginUser) {
        Optional<User> user = userService.login(loginUser.getEmail(), loginUser.getPassword());
        if (user.isPresent()) {
            return user.get();
        } else {
            throw new RuntimeException("Invalid email or password");
        }
    }

    @RequestMapping(method = RequestMethod.GET, value = "/users")
    public List<User> getUsers(){
        return userService.getUserList();
    }
}
