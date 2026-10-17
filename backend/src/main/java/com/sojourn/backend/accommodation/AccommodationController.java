
package com.sojourn.backend.accommodation;

import java.util.List;

import jakarta.validation.constraints.Min;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/api/accommodations")
public class AccommodationController {

    private final AccommodationService accommodationService;

    public AccommodationController(AccommodationService accommodationService) {
        this.accommodationService = accommodationService;
    }

    @GetMapping
    public List<Accommodation> getAccommodations(
            @RequestParam(required = false) String city,
            @RequestParam(required = false) String locality,
            @RequestParam(name = "type", required = false) String type,
            @RequestParam(required = false)
            @Min(value = 0, message = "Maximum rent cannot be negative")
            Integer maxRent) {

        return accommodationService.searchAccommodations(
                city,
                locality,
                type,
                maxRent
        );
    }

    public record Accommodation(
            long id,
            String name,
            String city,
            String locality,
            String accommodationType,
            int monthlyRent,
            String description,
            List<String> amenities) {
    }
}
