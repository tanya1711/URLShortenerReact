package com.example.demo.entityclass;

import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "admin")
public class Admin {

    private String email;
    private String password;

    public void setPassword(String password) {
        this.password = password;
    }

    public String getPassword() {
        return password;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getEmail() {
        return email;
    }
}
