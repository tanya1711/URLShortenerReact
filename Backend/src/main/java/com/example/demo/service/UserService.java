package com.example.demo.service;

import com.example.demo.entityclass.User;
import com.example.demo.helper.MaxUserIdResult;
import com.example.demo.mongorepository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.aggregation.Aggregation;
import org.springframework.data.mongodb.core.aggregation.AggregationResults;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;


@Service
public class UserService {

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private MongoTemplate mongoTemplate;

    public User saveUser(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    public Optional<User> login(String email, String password) {
        Optional<User> user = userRepository.findByEmail(email);
        if (user.isPresent() && passwordEncoder.matches(password, user.get().getPassword())) {
            return user;
        }
        return Optional.empty();
    }

    public void incrementCount(String email) {

        Optional<User> optionalUser = userRepository.findByEmail(email);
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            user.setCount(user.getCount() + 1);
            userRepository.save(user);
            System.out.println("Updated count for user: " + user.getName() + " to " + user.getCount());
        } else {
            System.out.println("User not found with email: " + email);
        }
    }

    public int getCountByUsername(String email) {
        Optional<User> optionalUser = userRepository.findByEmail(email);
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            return user.getCount();
        } else {
            System.out.println("User not found with email: " + email);
            return -1; // or throw an exception if you prefer
        }
    }

    public int getPlanCountByUsername(String email) {
        int planId = 0;
        Optional<User> optionalUser = userRepository.findByEmail(email);
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            planId = user.getPlanId();

        }
        return planId;
    }

    public List<User> getUserList() {
        return userRepository.findAll();
    }

    public Integer getMaxUserId() {
        Aggregation aggregation = Aggregation.newAggregation(
                Aggregation.group().max("userId").as("maxUserId")
        );
        AggregationResults<MaxUserIdResult> result = mongoTemplate.aggregate(
                aggregation, "users", MaxUserIdResult.class
        );
        MaxUserIdResult maxUserIdResult = result.getUniqueMappedResult();
        return (maxUserIdResult != null) ? maxUserIdResult.getMaxUserId() : null;
    }
}
