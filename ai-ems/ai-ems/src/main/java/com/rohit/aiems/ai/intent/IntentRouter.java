package com.rohit.aiems.ai.intent;

import com.rohit.aiems.ai.dto.AIRequest;
import com.rohit.aiems.auth.entity.User;

public interface IntentRouter {

    String route(
            AIIntent intent,
            User user,
            AIRequest request
    );

}