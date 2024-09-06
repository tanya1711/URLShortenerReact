package com.example.demo.service;

import com.example.demo.entityclass.Url;
import com.example.demo.mongorepository.UrlRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class UrlService {

    @Autowired
    private UrlRepository urlRepository;

    public Url shortenUrl(String originalUrl, int userId) {
        String shortUrl;
        do {
            shortUrl = generateShortUrl();
        } while (urlRepository.existsByShortUrl(shortUrl));
        Url url = new Url();
        url.setOriginalUrl(originalUrl);
        url.setShortUrl("hello"+shortUrl);
        url.setUserId(userId);
        return urlRepository.save(url);
    }

    public Url shortenCustomUrl(String originalUrl, String customUrl, int userId) {
         if(!urlRepository.existsByShortUrl(customUrl)) {
             Url url = new Url();
             url.setOriginalUrl(originalUrl);
             url.setShortUrl(customUrl);
             url.setUserId(userId);
             return urlRepository.save(url);
         }
         return null;
    }

    private String generateShortUrl() {
        return UUID.randomUUID().toString().substring(0, 6);
    }

    public Optional<Url> getOriginalUrl(String shortUrl) {
        return urlRepository.findByShortUrl(shortUrl);
    }

    public List<Url> getURLList(int userId){
        return  urlRepository.findByUserId(userId);
    }
}
