package com.rohit.aiems.ai.client;

import com.google.genai.Client;
import com.google.genai.errors.ClientException;
import com.google.genai.types.GenerateContentResponse;
import com.rohit.aiems.exception.AIServiceUnavailableException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

@Slf4j
@Component
@RequiredArgsConstructor
public class GeminiClient {

    private static final String MODEL_NAME =
            "gemini-3.6-flash";

    private final Client client;

    /**
     * General content generation.
     */
    public String generateContent(String prompt) {

        return callGemini(
                prompt,
                "Generating content"
        );
    }

    /**
     * Intent detection.
     */
    public String detectIntent(String prompt) {

        return callGemini(
                prompt,
                "Detecting intent"
        );
    }

    private String callGemini(
            String prompt,
            String operation
    ) {

        if (prompt == null ||
                prompt.isBlank()) {

            throw new IllegalArgumentException(
                    "Gemini prompt cannot be empty."
            );
        }

        try {

            log.debug(
                    "Gemini operation started: {}",
                    operation
            );

            GenerateContentResponse response =
                    client.models.generateContent(
                            MODEL_NAME,
                            prompt,
                            null
                    );

            if (response == null ||
                    response.text() == null ||
                    response.text().isBlank()) {

                throw new AIServiceUnavailableException(
                        "Gemini returned an empty response."
                );
            }

            log.debug(
                    "Gemini operation completed: {}",
                    operation
            );

            return response.text().trim();

        } catch (ClientException ex) {

            log.error(
                    "Gemini API request failed during: {}",
                    operation,
                    ex
            );

            String message =
                    ex.getMessage();

            if (message != null &&
                    message.contains("429")) {

                throw new AIServiceUnavailableException(
                        "Gemini quota exceeded. " +
                                "Please check your API quota or billing.",
                        ex
                );
            }

            throw new AIServiceUnavailableException(
                    "Gemini API request failed.",
                    ex
            );

        } catch (AIServiceUnavailableException ex) {

            throw ex;

        } catch (Exception ex) {

            log.error(
                    "Unexpected Gemini error during: {}",
                    operation,
                    ex
            );

            throw new AIServiceUnavailableException(
                    "Unable to communicate with Gemini AI.",
                    ex
            );
        }
    }
}