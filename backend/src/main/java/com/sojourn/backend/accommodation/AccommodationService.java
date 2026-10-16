
package com.sojourn.backend.accommodation;

import java.util.Arrays;
import java.util.List;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

@Service
public class AccommodationService {

    private final JdbcTemplate jdbcTemplate;

    public AccommodationService(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    // Fetches accommodation listings from MySQL.
    public List<AccommodationController.Accommodation> getAllAccommodations() {
        return searchAccommodations(null, null, null, null);
    }

    // Fetches database records and applies the optional search filters.
    public List<AccommodationController.Accommodation> searchAccommodations(
            String city,
            String locality,
            String type,
            Integer maxRent) {

        String sql = """
                SELECT id, name, city, locality, accommodation_type,
                       monthly_rent, description, amenities
                FROM accommodations
                ORDER BY id
                """;

        List<AccommodationController.Accommodation> accommodations =
                jdbcTemplate.query(sql, (rs, rowNum) -> {
                    String amenitiesText = rs.getString("amenities");

                    List<String> amenities =
                            amenitiesText == null || amenitiesText.isBlank()
                                    ? List.of()
                                    : Arrays.stream(amenitiesText.split(","))
                                            .map(item -> item.strip())
                                            .filter(item -> !item.isEmpty())
                                            .toList();

                    return new AccommodationController.Accommodation(
                            rs.getLong("id"),
                            rs.getString("name"),
                            rs.getString("city"),
                            rs.getString("locality"),
                            rs.getString("accommodation_type"),
                            rs.getInt("monthly_rent"),
                            rs.getString("description"),
                            amenities
                    );
                });

        return accommodations.stream()
                .filter(stay -> city == null || city.isBlank()
                        || stay.city().equalsIgnoreCase(city.trim()))
                .filter(stay -> locality == null || locality.isBlank()
                        || stay.locality().equalsIgnoreCase(locality.trim()))
                .filter(stay -> type == null || type.isBlank()
                        || stay.accommodationType().equalsIgnoreCase(type.trim()))
                .filter(stay -> maxRent == null
                        || stay.monthlyRent() <= maxRent)
                .toList();
    }
}
