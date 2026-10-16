package com.sojourn.backend;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.sojourn.backend.accommodation.AccommodationController;
import com.sojourn.backend.accommodation.AccommodationService;

@SpringBootTest
class BackendApplicationTests {

    @Autowired
    private AccommodationService accommodationService;

    @Test
    void contextLoads() {
        assertTrue(accommodationService != null);
    }

    @Test
    void includesDemoListingsForAllIntendedPuneLocalities() {

        List<AccommodationController.Accommodation> accommodations =
                accommodationService.getAllAccommodations();

        Set<String> actualLocalities = accommodations.stream()
        .map(stay -> stay.locality())
        .collect(Collectors.toSet());

        Set<String> expectedLocalities = Set.of(
                "Balewadi",
                "Baner",
                "Chinchwad",
                "Hadapsar",
                "Hinjawadi",
                "Kalyani Nagar",
                "Karve Nagar",
                "Katraj",
                "Kharadi",
                "Kothrud",
                "Nigdi",
                "Pimpri",
                "Pimple Saudagar",
                "Ravet",
                "Viman Nagar",
                "Wadgaon Sheri",
                "Wakad",
                "Warje"
        );

        assertEquals(18, accommodations.size());
        assertTrue(actualLocalities.containsAll(expectedLocalities));
    }

    @Test
    void filtersAccommodationsByCityTypeAndMaximumRent() {

        List<AccommodationController.Accommodation> results =
                accommodationService.searchAccommodations(
                        "Pune", null, "PG", 10000
                );

        assertEquals(5, results.size());

        assertTrue(results.stream().allMatch(stay ->
                stay.city().equalsIgnoreCase("Pune")
                        && stay.accommodationType().equalsIgnoreCase("PG")
                        && stay.monthlyRent() <= 10000
        ));
    }

    @Test
    void filtersAccommodationsByLocality() {

        List<AccommodationController.Accommodation> results =
                accommodationService.searchAccommodations(
                        null, "Hinjawadi", null, null
                );

        assertEquals(1, results.size());
        assertEquals("Hinjawadi", results.get(0).locality());
    }
}