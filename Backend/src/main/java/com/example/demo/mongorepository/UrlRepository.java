package com.example.demo.mongorepository;


import com.example.demo.entityclass.Plan;
import com.example.demo.entityclass.Url;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface UrlRepository extends MongoRepository<Url, String> {
    Optional<Url> findByShortUrl(String shortUrl);
    List<Url> findByUserId(int userId);
    boolean existsByShortUrl(String shortUrl);
}

