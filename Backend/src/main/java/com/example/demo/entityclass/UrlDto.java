package com.example.demo.entityclass;

public class UrlDto {
    private String longUrl;
    private String shortUrl;
    private int clickCount;
    private  int browserClicks;
    private  int androidClicks;
    private  int iosClicks;

    // Constructor
    public UrlDto(String longUrl, String shortUrl, int clickCount, int browserClicks, int androidClicks, int iosClicks) {
        this.longUrl = longUrl;
        this.shortUrl = shortUrl;
        this.clickCount = clickCount;
        this.browserClicks = browserClicks;
        this.androidClicks = androidClicks;
        this.iosClicks = iosClicks;
    }

    // Getter for longUrl
    public String getLongUrl() {
        return longUrl;
    }

    // Setter for longUrl
    public void setLongUrl(String longUrl) {
        this.longUrl = longUrl;
    }

    // Getter for shortUrl
    public String getShortUrl() {
        return shortUrl;
    }

    // Setter for shortUrl
    public void setShortUrl(String shortUrl) {
        this.shortUrl = shortUrl;
    }

    // Getter for shortUrl
    public int getClickCount() {
        return clickCount;
    }

    // Setter for shortUrl
    public void setClickCount(int clickCount) {
        this.clickCount = clickCount    ;
    }

    public int getBrowserClicks() {
        return browserClicks;
    }

    // Setter for shortUrl
    public void setBrowserClicks(int browserClicks) {
        this.browserClicks = browserClicks    ;
    }

    public int getAndroidClicks() {
        return androidClicks;
    }

    // Setter for shortUrl
    public void setAndroidClicks(int androidClicks) {
        this.androidClicks = androidClicks    ;
    }

    public int getIosClicks() {
        return iosClicks;
    }

    // Setter for shortUrl
    public void setIosClicks(int iosClicks) {
        this.iosClicks = iosClicks    ;
    }
}
