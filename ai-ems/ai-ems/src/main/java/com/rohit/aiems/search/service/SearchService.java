package com.rohit.aiems.search.service;

import com.rohit.aiems.search.dto.SearchResponse;

public interface SearchService {

    SearchResponse search(String keyword);

}