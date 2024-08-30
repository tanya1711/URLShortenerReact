package com.example.demo.service;

import com.example.demo.entityclass.Plan;
import com.example.demo.mongorepository.PlanRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PlanService {

    @Autowired
    private PlanRepository planRepository;

    public Plan savePlan(Plan plan){
        return planRepository.save(plan);
    }

    public List<Plan> getPlans(){
        return planRepository.findAll();
    }
}
