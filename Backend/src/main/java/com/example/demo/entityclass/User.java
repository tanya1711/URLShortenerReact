package com.example.demo.entityclass;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "users")
public class User {

    @Id
    private String id;
    private int userId;
    private String name;
    private String email;
    private String password;
    private int count;
    private int planId = 0;

    // Constructors
    public User() {

    }

    public User(String name, String email, String password, int planId, int userId) {
        this.userId = userId;
        this.name = name;
        this.email = email;
        this.password = password;
        this.count = 0;
        this.planId = planId;
    }

    // Getters and Setters

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public int getUserId() {
        return userId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }


    public void setPlanId(int planId) {
        this.planId = planId;
    }

    public int getPlanId() {
        return planId;
    }

    public void setCount(int count) {
        this.count = count;
    }

    public int getCount() {
        return count;
    }
}
