package com.example.demo.filter;


import com.example.demo.service.PlanService;
import com.example.demo.service.UserService;
import io.micrometer.common.lang.NonNullApi;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Base64;
import java.util.List;

@Component
@NonNullApi
public class JwtAuthenticationFilter extends OncePerRequestFilter {


    @Autowired
    private DaoAuthenticationProvider authenticationProvider;

    @Autowired
    private UserService userService;

    @Autowired
    private PlanService planService;
//    @Autowired
//    private JwtTokenService jwtTokenService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        try {
            List<String> permittedURIs = new ArrayList<>();
            permittedURIs.addAll(Arrays.asList("/signup", "/error", "/login", "/home", "/login.html", "/signUp.html","/favicon.ico","/postlogin.html","/adminLogin"));
//            if(!permittedURIs.contains(request.getRequestURI()) && !request.getRequestURI().contains("hello") ) {
                if(request.getRequestURI().contains("/shorten")) {
                System.out.println("ENTERED FILTER!!!");
                System.out.println(request.getRequestURI());
                System.out.println(request.getMethod());
                String authHeader = request.getHeader("Authorization");
                System.out.println("header " + authHeader);

                byte[] decodedBytes = Base64.getDecoder().decode(authHeader.split("Basic ")[1]);
                String decodedString = new String(decodedBytes, StandardCharsets.UTF_8);

                String[] credentials = decodedString.split(":", 2);
                String username = credentials[0];
                String password = credentials[1];

                System.out.println("Username: " + username);
                System.out.println("Password: " + password);
                Authentication authentication = authenticationProvider.authenticate(new UsernamePasswordAuthenticationToken(username, password));
                SecurityContextHolder.getContext().setAuthentication(authentication);
                System.out.println(authentication);
                if (request.getRequestURI().equals("/shorten")) {
                    int planId = userService.getPlanCountByUsername(username);
                    int count = planService.getCountForPlan(planId);
                    if (userService.getCountByUsername(username) < count) {
                        userService.incrementCount(username);
//                        response.setStatus(HttpServletResponse.SC_OK);
//                        System.out.println(response.getStatus()+" set through filter" );

//                        response.getWriter().write("Request successful.");
//                        return;

                    } else {
                        response.setStatus(HttpServletResponse.SC_FORBIDDEN);
                        response.getWriter().write("OOPs, you reached your free trial limit!");
                        response.getWriter().flush();
                        response.getWriter().close();
                        return;
                    }
                }
            }

        } catch (BadCredentialsException e) {
            System.out.println("Invalid/UserName password");
        }

        filterChain.doFilter(request, response);

    }


}