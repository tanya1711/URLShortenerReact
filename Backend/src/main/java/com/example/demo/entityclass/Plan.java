package com.example.demo.entityclass;


import jakarta.annotation.Generated;
import org.springframework.data.annotation.Id;

public class Plan {

    @Id
    private int planId;
    private String planName;

    public void setPlanId(int planId) {
        this.planId = planId;
    }

    public int getPlanId() {
        return planId;
    }

    public void setPlanName(String planName) {
        this.planName = planName;
    }

    public String getPlanName() {
        return planName;
    }
}
