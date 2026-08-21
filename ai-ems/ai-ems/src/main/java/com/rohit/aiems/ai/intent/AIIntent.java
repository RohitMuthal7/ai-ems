package com.rohit.aiems.ai.intent;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.HashMap;
import java.util.Map;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AIIntent {

    private IntentType intent;

    private Double confidence;

    @Builder.Default
    private Map<String, String> parameters = new HashMap<>();

}