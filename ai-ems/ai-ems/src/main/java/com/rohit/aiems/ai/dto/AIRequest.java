package com.rohit.aiems.ai.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
public class AIRequest {

    @NotBlank(
            message = "Prompt cannot be empty"
    )
    private String prompt;

    private List<AIMessage> messages =
            new ArrayList<>();
}