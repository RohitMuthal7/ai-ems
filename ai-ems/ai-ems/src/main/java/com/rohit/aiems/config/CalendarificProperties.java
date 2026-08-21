package com.rohit.aiems.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import jakarta.annotation.PostConstruct;
import lombok.Getter;

@Getter
@Component
public class CalendarificProperties {

    @Value("${calendarific.api.key}")
    private String apiKey;

    @Value("${calendarific.base-url}")
    private String baseUrl;

    @PostConstruct
    public void init() {
        System.out.println("API KEY = " + apiKey);
        System.out.println("BASE URL = " + baseUrl);
    }
}