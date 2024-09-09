package com.example.demo.entityclass;

public class UrlDto {
    private String longUrl;
    private String shortUrl;

    // Constructor
    public UrlDto(String longUrl, String shortUrl) {
        this.longUrl = longUrl;
        this.shortUrl = shortUrl;
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
}
