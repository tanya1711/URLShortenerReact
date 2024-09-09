package com.example.demo.entityclass;
import java.util.List;

public class Details {
    private String userId;
    private String name;
    private String email;
    private int count;
    private int planId;
    private List<UrlDto> urls;

    // Constructor for convenience
    public Details(String userId, String name, String email, int count, int planId, List<UrlDto> urls) {
        this.userId = userId;
        this.email = email;
        this.name = name;
        this.count = count;
        this.planId = planId;
        this.urls = urls;
    }

    // Getter and Setter for userId
    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    // Getter and Setter for name
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    // Getter and Setter for email
    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    // Getter and Setter for count
    public int getCount() {
        return count;
    }

    public void setCount(int count) {
        this.count = count;
    }

    // Getter and Setter for planId
    public int getPlanId() {
        return planId;
    }

    public void setPlanId(int planId) {
        this.planId = planId;
    }

    // Getter and Setter for urls (List of UrlDto)
    public List<UrlDto> getUrls() {
        return urls;
    }

    public void setUrls(List<UrlDto> urls) {
        this.urls = urls;
    }
}
