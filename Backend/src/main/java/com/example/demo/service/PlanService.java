package com.example.demo.service;

import com.example.demo.entityclass.Plan;
import com.example.demo.entityclass.User;
import com.example.demo.mongorepository.PlanRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.context.annotation.ApplicationScope;

import java.util.List;

@Service
public class PlanService {

    @Autowired
    private PlanRepository planRepository;

    @Autowired
    MongoOperations mongoOperations;

    public Plan savePlan(Plan plan){
        return planRepository.save(plan);
    }

    public List<Plan> getPlans(){
        return planRepository.findAll();
    }

    public void updatePlanForUser(String _id, int plan){
        try {
            Query query = new Query(Criteria.where("id").is(_id));
            Update update = new Update();
            update.set("isPaid", plan);
            mongoOperations.updateFirst(query, update, User.class);
        }
        catch (Exception e){
            e.printStackTrace();
        }
    }
}
