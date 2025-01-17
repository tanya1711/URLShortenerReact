package com.example.demo.service;

import com.example.demo.entityclass.*;
import com.example.demo.mongorepository.DetailsRepository;
import com.example.demo.mongorepository.PlanRepository;
import com.example.demo.mongorepository.UrlRepository;
import com.example.demo.mongorepository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class DetailsService {

    @Autowired
    private UrlRepository urlRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PlanRepository planRepository;

    public Optional<Details> getCombinedDataByUserId(int userId) {
        Optional<User> user = userRepository.findByUserId(userId);
        List<Url> urlList = urlRepository.findByUserId(userId);
        Optional<Plan> plan;

        if (user.isPresent() && !urlList.isEmpty()) {
            int userId1 = user.get().getUserId();
            String userId2 = String.valueOf(userId1);
            String name = user.get().getName();
            String email = user.get().getEmail();
            int count = user.get().getCount();
            int planId = user.get().getPlanId();
            plan = planRepository.findByPlanId(planId);
            String planName = plan.get().getPlanName();
            int allowedCounts = plan.get().getAllowedCounts();
            // Create a list of UrlDto objects containing longUrl and shortUrl
            List<UrlDto> urls = urlList.stream()
                    .map(url -> new UrlDto(url.getOriginalUrl(), url.getShortUrl(), url.getClickCount(), url.getBrowserClicks(), url.getAndroidClicks(), url.getIosClicks()))  // Assuming Url has getLongUrl() and getShortenedUrl()
                    .collect(Collectors.toList());

            // Create and return Details object
            Details combinedData = new Details(userId2,name,email,count,planId,planName,allowedCounts,urls);
            return Optional.of(combinedData);
        }
        return Optional.empty();
    }
}
