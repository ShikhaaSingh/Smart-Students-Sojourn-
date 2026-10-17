
package com.sojourn.backend.accommodation;

import java.util.ArrayList;
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

    public List<AccommodationController.Accommodation> getAllAccommodations() {
        return searchAccommodations(null, null, null, null);
    }

    public List<AccommodationController.Accommodation> searchAccommodations(
            String city,
            String locality,
            String type,
            Integer maxRent) {

        StringBuilder sql = new StringBuilder("""
                SELECT id, name, city, locality, accommodation_type,
                       monthly_rent, description, amenities
                FROM accommodations
                WHERE 1 = 1
                """);

        List<Object> params = new ArrayList<>();

        if (city != null && !city.isBlank()) {
            sql.append(" AND LOWER(city) = LOWER(?)");
            params.add(city.trim());
        }

        if (locality != null && !locality.isBlank()) {
            sql.append(" AND LOWER(locality) = LOWER(?)");
            params.add(locality.trim());
        }

        if (type != null && !type.isBlank()) {
            sql.append(" AND LOWER(accommodation_type) = LOWER(?)");
            params.add(type.trim());
        }

        if (maxRent != null) {
            sql.append(" AND monthly_rent <= ?");
            params.add(maxRent);
        }

        sql.append(" ORDER BY id");

        return jdbcTemplate.query(
                sql.toString(),
                (rs, rowNum) -> {
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
                },
                params.toArray()
        );
    }
}
