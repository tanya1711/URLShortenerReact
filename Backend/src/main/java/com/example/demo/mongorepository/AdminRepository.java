package com.example.demo.mongorepository;

import com.example.demo.entityclass.Admin;
import com.example.demo.entityclass.User;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface AdminRepository extends MongoRepository<Admin, String> {
    Optional<Admin> findByEmail(String email);

}
