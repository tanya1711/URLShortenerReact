package com.example.demo.entityclass;


import jakarta.annotation.Generated;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "plan")
public class Plan {

    @Id
    private int planId;
    private String planName;
    private int allowedCounts;

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

    public void setAllowedCounts(int allowedCounts) {
        this.allowedCounts = allowedCounts;
    }

    public int getAllowedCounts() {
        return allowedCounts;
    }
}
