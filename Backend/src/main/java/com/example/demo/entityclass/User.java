package com.example.demo.entityclass;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "users")
public class User {

    @Id
    private String id;
    private String name;
    private String email;
    private String password;
    private int count;
    private int plan = 0;
    // Constructors
    public User() {

    }

    public User(String name, String email, String password, int plan) {

        this.name = name;
        this.email = email;
        this.password = password;
        this.count = 0;
        this.plan = plan;
    }

    // Getters and Setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
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



    public void setPlan(int plan) {
        this.plan = plan;
    }

    public int getPlan() {
        return plan;
    }

    public void setCount(int  count) {
        this.count = count;
    }

        public int getCount() {
            return count;
        }
}
