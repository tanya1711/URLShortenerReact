package com.example.demo.controller;


import com.example.demo.entityclass.Plan;
import com.example.demo.entityclass.User;
import com.example.demo.service.PlanService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

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

    @PostMapping("/updatePlan")
    public ResponseEntity<Map<String, String>> updatePlan(@RequestBody Map<String, String> request) {
        try {
            System.out.println(request);
            String userId = request.get("userId");
            String planId = request.get("planId");
            planService.updatePlanForUser(userId, Integer.parseInt(planId));
        }
        catch (Exception e){
            e.printStackTrace();
        }
        return ResponseEntity.ok(null);
    }


}
