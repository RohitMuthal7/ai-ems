package com.rohit.aiems.ai.service;

import com.rohit.aiems.ai.dto.AIRequest;

public interface EmployeeAIService {

    String generateResponse(
            AIRequest request
    );

}