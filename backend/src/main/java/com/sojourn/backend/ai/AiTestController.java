package com.sojourn.backend.ai;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.sojourn.backend.accommodation.AccommodationService;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/ai")
public class AiTestController {

    private final GeminiService geminiService;
    private final AccommodationService accommodationService;
    private final ObjectMapper objectMapper;

    public AiTestController(
            GeminiService geminiService,
            AccommodationService accommodationService,
            ObjectMapper objectMapper) {
        this.geminiService = geminiService;
        this.accommodationService = accommodationService;
        this.objectMapper = objectMapper;
    }

    @GetMapping("/test")
    public Map<String, String> testGemini() throws Exception {
        String answer = geminiService.generateText(
                "Explain in one short sentence what a student "
                        + "accommodation assistant does."
        );

        return Map.of("message", answer);
    }

    @GetMapping("/search-criteria")
    public Map<String, String> extractSearchCriteria(
            @RequestParam String message) throws Exception {

        String criteria =
                geminiService.extractSearchCriteria(message);

        return Map.of("criteria", criteria);
    }

    @GetMapping("/search")
    public Map<String, Object> searchAccommodationsWithAI(
            @RequestParam String message) throws Exception {

        if (message == null || message.isBlank()) {
            throw new IllegalArgumentException(
                    "Please enter your accommodation requirements."
            );
        }

        if (message.length() > 1000) {
            throw new IllegalArgumentException(
                    "Search message must be 1000 characters or fewer."
            );
        }

        String criteriaJson =
                geminiService.extractSearchCriteria(message);

        JsonNode criteriaNode = objectMapper.readTree(criteriaJson);

        if (!criteriaNode.isObject()) {
            throw new IllegalStateException(
                    "AI returned invalid search criteria."
            );
        }

        Map<String, Object> criteria = objectMapper.convertValue(
                criteriaNode,
                new TypeReference<Map<String, Object>>() {}
        );

        String city = getText(criteriaNode, "city");
        String locality = getText(criteriaNode, "locality");
        String type = getText(criteriaNode, "type");
        Integer maxRent = getInteger(criteriaNode, "maxRent");

        if (maxRent != null && maxRent < 0) {
            throw new IllegalArgumentException(
                    "Maximum rent cannot be negative."
            );
        }

        if (maxRent != null && maxRent > 10000000) {
            throw new IllegalArgumentException(
                    "Maximum rent is outside the supported range."
            );
        }

        List<String> amenities = new ArrayList<>();
        JsonNode amenitiesNode = criteriaNode.path("amenities");

        if (amenitiesNode.isArray()) {
            for (JsonNode amenity : amenitiesNode) {
                if (amenity.isTextual()
                        && !amenity.asText().isBlank()) {
                    amenities.add(amenity.asText().trim());
                }
            }
        }

        // Accept only accommodation types supported by the application.
        if (type != null) {
            if (type.equalsIgnoreCase("PG")) {
                type = "PG";
            } else if (type.equalsIgnoreCase("HOSTEL")) {
                type = "Hostel";
            } else if (type.equalsIgnoreCase("Shared room")) {
                type = "Shared room";
            } else {
                type = null;
            }
        }

        var results = accommodationService.searchAccommodations(
                city,
                locality,
                type,
                maxRent,
                amenities
        );

        Map<String, Object> response = new LinkedHashMap<>();
        response.put(
                "message",
                results.isEmpty()
                        ? "No matching accommodations found in the database."
                        : "Matching accommodations found."
        );
        response.put("criteria", criteria);
        response.put("count", results.size());
        response.put("accommodations", results);

        return response;
    }

    private String getText(JsonNode node, String field) {
        JsonNode value = node.path(field);

        if (value.isMissingNode()
                || value.isNull()
                || !value.isTextual()
                || value.asText().isBlank()) {
            return null;
        }

        return value.asText().trim();
    }

    private Integer getInteger(JsonNode node, String field) {
        JsonNode value = node.path(field);

        if (value.isMissingNode() || value.isNull()) {
            return null;
        }

        if (!value.isIntegralNumber()
                || !value.canConvertToInt()) {
            return null;
        }

        return value.intValue();
    }
}
