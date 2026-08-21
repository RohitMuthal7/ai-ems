package com.rohit.aiems.config;

import com.google.genai.Client;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class GeminiConfig {

    @Value("${google.ai.api.key:}")
    private String apiKey;

    @PostConstruct
    public void validateApiKey() {

        if (apiKey == null || apiKey.isBlank()) {

            throw new IllegalStateException(
                    "Google Gemini API Key is missing. " +
                            "Configure GOOGLE_AI_API_KEY."
            );
        }
    }

    @Bean
    public Client googleGenAIClient() {

        return Client.builder()
                .apiKey(apiKey.trim())
                .build();
    }
}