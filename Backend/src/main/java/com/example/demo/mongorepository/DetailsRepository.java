package com.example.demo.mongorepository;

import com.example.demo.entityclass.Url;
import com.example.demo.entityclass.User;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface DetailsRepository {
    public interface UrlRepository extends MongoRepository<Url, String> {
    }

    public interface UserRepository extends MongoRepository<User, String>{
    }
}
