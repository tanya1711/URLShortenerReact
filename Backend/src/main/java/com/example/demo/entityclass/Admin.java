package com.example.demo.entityclass;

import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "admin")
public class Admin {

    private String username;
    private String password;

    public void setPassword(String password) {
        this.password = password;
    }

    public String getPassword() {
        return password;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getUsername() {
        return username;
    }
}
