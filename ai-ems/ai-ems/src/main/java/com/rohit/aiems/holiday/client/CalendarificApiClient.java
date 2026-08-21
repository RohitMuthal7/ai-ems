package com.rohit.aiems.holiday.client;

import com.rohit.aiems.config.CalendarificProperties;
import com.rohit.aiems.holiday.dto.CalendarificResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestClient;

@Component
@RequiredArgsConstructor
public class CalendarificApiClient {

    private final RestClient restClient;
    private final CalendarificProperties properties;

    public CalendarificResponse getPublicHolidays(String countryCode, int year) {

        String url = properties.getBaseUrl()
                + "/holidays?api_key=" + properties.getApiKey()
                + "&country=" + countryCode
                + "&year=" + year;

        System.out.println("URL = " + url);

        return restClient.get()
                .uri(url)
                .retrieve()
                .body(CalendarificResponse.class);
    }

}