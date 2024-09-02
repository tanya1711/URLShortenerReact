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
    private Integer count;
    private Object isPaid; // Changed from int to boolean

    // Constructors
    public User() {
    }

    public User(String name, String email, String password, Boolean isPaid) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.count = 0;
        this.isPaid = isPaid;
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

    public Integer getCount() {
        return count;
    }

    public void setCount(Integer count) {
        this.count = count;
    }

    public Object isPaid() { // Updated to boolean getter
        return isPaid;
    }

    public void setPaid(Object isPaid) { // Updated to boolean setter
        this.isPaid = isPaid;
    }
}
