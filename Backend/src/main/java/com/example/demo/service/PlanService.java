package com.example.demo.service;

import com.example.demo.entityclass.Plan;
import com.example.demo.entityclass.Url;
import com.example.demo.entityclass.User;
import com.example.demo.helper.MaxPlanIdResult;
import com.example.demo.helper.MaxUserIdResult;
import com.example.demo.mongorepository.PlanRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.aggregation.Aggregation;
import org.springframework.data.mongodb.core.aggregation.AggregationResults;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.context.annotation.ApplicationScope;

import java.util.List;
import java.util.Optional;

@Service
public class PlanService {

    @Autowired
    private PlanRepository planRepository;

    @Autowired
    MongoOperations mongoOperations;

    @Autowired
    MongoTemplate mongoTemplate;

    public Plan savePlan(Plan plan) {
        return planRepository.save(plan);
    }

    public List<Plan> getPlans() {
        return planRepository.findAll();
    }

    public void updatePlanForUser(int _id, int plan) {
        try {
            Query query = new Query(Criteria.where("userId").is(_id));
            Update update = new Update();
            update.set("planId", plan);
            mongoOperations.updateFirst(query, update, User.class);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public int getCountForPlan(int _id) {
        try {
            Optional<Plan> optionalPlan = planRepository.findByPlanId(_id);
            if (optionalPlan.isPresent()) {
                Plan plan = optionalPlan.get();
                return plan.getAllowedCounts();
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return -1;
    }

    public Integer getMaxPlanId() {
        Aggregation aggregation = Aggregation.newAggregation(
                Aggregation.group().max("planId").as("maxPlanId")
        );
        AggregationResults<MaxPlanIdResult> result = mongoTemplate.aggregate(
                aggregation, "plan", MaxPlanIdResult.class
        );
        MaxPlanIdResult maxPlanIdResult = result.getUniqueMappedResult();
        return (maxPlanIdResult != null) ? maxPlanIdResult.getMaxPlanId() : null;
    }

}
