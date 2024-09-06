package com.example.demo.dto;

public class URLInputDTO {

    public String longUrl;

    public String customUrl;

    public  int userId;

    public void setLongUrl(String longUrl) {
        this.longUrl = longUrl;
    }

    public String getLongUrl() {
        return longUrl;
    }

    public void setCustomUrl(String customUrl) {
        this.customUrl = customUrl;
    }

    public String getCustomUrl() {
        return customUrl;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public int getUserId() {
        return userId;
    }
}
