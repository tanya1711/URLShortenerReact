package com.example.demo.controller;


import com.example.demo.entityclass.Plan;
import com.example.demo.entityclass.User;
import com.example.demo.service.PlanService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class PlanController {

    @Autowired
    private PlanService planService;

    @RequestMapping(method = RequestMethod.POST, value = "/addPlan")
    public ResponseEntity<Plan> addPlan(@RequestBody Plan plan) {
        planService.savePlan(plan);
        return ResponseEntity.ok(plan);
    }

    @RequestMapping(method = RequestMethod.GET, value = "/plans")
    public List<Plan> addPlan() {
        return planService.getPlans();
    }


}
