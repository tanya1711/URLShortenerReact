package com.example.demo.mongorepository;

import com.example.demo.entityclass.Plan;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface PlanRepository extends MongoRepository<Plan, Integer> {
}
