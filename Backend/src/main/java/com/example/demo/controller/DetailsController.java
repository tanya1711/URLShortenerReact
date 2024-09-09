package com.example.demo.controller;

import com.example.demo.entityclass.Details;
import com.example.demo.service.DetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
public class DetailsController {

    @Autowired
    private DetailsService detailsService;

    @GetMapping("/details/{userId}")
    public ResponseEntity<Details> getCombinedDataByUserId(@PathVariable int userId) {
        Optional<Details> combinedData = detailsService.getCombinedDataByUserId(userId);

        return combinedData.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

}
