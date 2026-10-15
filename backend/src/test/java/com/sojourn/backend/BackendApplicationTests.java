package com.sojourn.backend;

import static org.junit.jupiter.api.Assertions.assertTrue;

import java.util.Set;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.sojourn.backend.accommodation.AccommodationController;

@SpringBootTest
class BackendApplicationTests {
	@Autowired
	private AccommodationController accommodationController;

	@Test
	void contextLoads() {
	}

	@Test
	void includesDemoListingsForAllIntendedPuneLocalities() {
		var localities = new java.util.HashSet<String>();
		for (var accommodation : accommodationController.getAccommodations()) {
			localities.add(accommodation.locality());
		}

		assertTrue(localities.containsAll(Set.of(
				"Hinjawadi", "Wakad", "Kothrud", "Viman Nagar", "Baner", "Karve Nagar",
				"Wadgaon Sheri", "Pimpri", "Hadapsar", "Kharadi", "Kalyani Nagar",
				"Pimple Saudagar", "Balewadi", "Warje", "Katraj", "Chinchwad", "Nigdi", "Ravet")));
	}

}
