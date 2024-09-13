package com.example.demo.entityclass;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "urls")
public class Url {

    @Id
    private String id;
    private String originalUrl;
    private String shortUrl;
    private int userId;
    private int clickCount;
    private int browserClicks;
    private int androidClicks;
    private int iosClicks;
    // Getters and Setters

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getOriginalUrl() {
        return originalUrl;
    }

    public void setOriginalUrl(String originalUrl) {
        this.originalUrl = originalUrl;
    }

    public String getShortUrl() {
        return shortUrl;
    }

    public void setShortUrl(String shortUrl) {
        this.shortUrl = shortUrl;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public int getUserId() {
        return userId;
    }

    public void setClickCount(int clickCount) {
        this.clickCount = clickCount;
    }

    public int getClickCount() {
        return clickCount;
    }

    public void setAndroidClicks(int androidClicks) {
        this.androidClicks = androidClicks;
    }

    public int getAndroidClicks() {
        return androidClicks;
    }

    public void setBrowserClicks(int browserClicks) {
        this.browserClicks = browserClicks;
    }

    public int getBrowserClicks() {
        return browserClicks;
    }

    public void setIosClicks(int iosClicks) {
        this.iosClicks = iosClicks;
    }

    public int getIosClicks() {
        return iosClicks;
    }
}
