package com.rohit.aiems.ai.controller;

import com.rohit.aiems.ai.dto.AIRequest;
import com.rohit.aiems.ai.dto.AIResponse;
import com.rohit.aiems.ai.service.AIService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/ai")
@RequiredArgsConstructor
@Slf4j
public class AIController {

    private final AIService aiService;

    @PostMapping("/chat")
    public ResponseEntity<AIResponse> chat(
            @Valid @RequestBody AIRequest request) {

        try {

            String response =
                    aiService.generateResponse(request);

            return ResponseEntity.ok(
                    AIResponse.builder()
                            .response(response)
                            .build()
            );

        } catch (Exception ex) {

            log.error(
                    "AI CHAT FAILED. Root cause:",
                    ex
            );

            throw ex;
        }
    }
}