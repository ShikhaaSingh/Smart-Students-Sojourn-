package com.sojourn.backend.accommodation;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/accommodations")
public class AccommodationController {

	private static final List<Accommodation> ACCOMMODATIONS = List.of(
			new Accommodation(
					1,
					"Campus Corner PG",
					"Pune",
					"Hinjawadi",
					"PG",
					8500,
					"Demo student accommodation with a shared lounge. Sample listing only; not verified or currently available.",
					List.of("Meals included", "Wi-Fi", "Study lounge")),
			new Accommodation(
					2,
					"Green Door Hostel",
					"Pune",
					"Wakad",
					"Hostel",
					7800,
					"Demo hostel accommodation with shared spaces and laundry. Sample listing only; not verified or currently available.",
					List.of("Common room", "Laundry", "Wi-Fi")),
			new Accommodation(
					3,
					"Kothrud Study Stay",
					"Pune",
					"Kothrud",
					"PG",
					9400,
					"Demo student accommodation with a study-friendly shared space. Sample listing only; not verified or currently available.",
					List.of("Home-style meals", "Power backup", "Wi-Fi"))
	);

	@GetMapping
	public List<Accommodation> getAccommodations() {
		return ACCOMMODATIONS;
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