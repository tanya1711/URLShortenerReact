package com.example.demo.mongorepository;

import com.example.demo.entityclass.Plan;
import com.example.demo.entityclass.User;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface PlanRepository extends MongoRepository<Plan, Integer> {
    public Optional<Plan> findByPlanId(int planId);
}
