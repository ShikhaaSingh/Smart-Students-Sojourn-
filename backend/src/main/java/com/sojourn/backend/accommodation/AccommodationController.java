package com.sojourn.backend.accommodation;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
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
					List.of("Home-style meals", "Power backup", "Wi-Fi")),
			new Accommodation(4, "Common Ground Rooms", "Pune", "Viman Nagar", "Shared room", 9800,
					"Demo shared accommodation. Sample listing only; not verified or currently available.", List.of("Shared kitchen", "Housekeeping", "Wi-Fi")),
			new Accommodation(5, "Baner Grove Living", "Pune", "Baner", "PG", 14500,
					"Demo student accommodation. Sample listing only; not verified or currently available.", List.of("Meals included", "Gym access", "Wi-Fi")),
			new Accommodation(6, "Karve Nagar House", "Pune", "Karve Nagar", "Hostel", 7200,
					"Demo hostel accommodation. Sample listing only; not verified or currently available.", List.of("24/7 security", "Laundry", "Common room")),
			new Accommodation(7, "Wadgaon Sheri Student House", "Pune", "Wadgaon Sheri", "Shared room", 8900,
					"Demo shared accommodation. Sample listing only; not verified or currently available.", List.of("Shared kitchen", "Study area", "Wi-Fi")),
			new Accommodation(8, "Pimpri Corner PG", "Pune", "Pimpri", "PG", 7600,
					"Demo student accommodation. Sample listing only; not verified or currently available.", List.of("Meals included", "Laundry", "Power backup")),
			new Accommodation(9, "Hadapsar Green Stay", "Pune", "Hadapsar", "Hostel", 8200,
					"Demo hostel accommodation. Sample listing only; not verified or currently available.", List.of("Common room", "24/7 security", "Wi-Fi")),
			new Accommodation(10, "Kharadi Shared Living", "Pune", "Kharadi", "Shared room", 11800,
					"Demo shared accommodation. Sample listing only; not verified or currently available.", List.of("Desk space", "Housekeeping", "Wi-Fi")),
			new Accommodation(11, "Kalyani Nagar House", "Pune", "Kalyani Nagar", "PG", 15800,
					"Demo student accommodation. Sample listing only; not verified or currently available.", List.of("Meals included", "Gym access", "Housekeeping")),
			new Accommodation(12, "Pimple Saudagar Hostel", "Pune", "Pimple Saudagar", "Hostel", 6900,
					"Demo hostel accommodation. Sample listing only; not verified or currently available.", List.of("Common room", "Laundry", "Study area")),
			new Accommodation(13, "Balewadi Grove Rooms", "Pune", "Balewadi", "Shared room", 13200,
					"Demo shared accommodation. Sample listing only; not verified or currently available.", List.of("Shared kitchen", "Cleaning", "Study lounge")),
			new Accommodation(14, "Warje Student PG", "Pune", "Warje", "PG", 9200,
					"Demo student accommodation. Sample listing only; not verified or currently available.", List.of("Home-style meals", "Power backup", "Wi-Fi")),
			new Accommodation(15, "Katraj Corner Hostel", "Pune", "Katraj", "Hostel", 6400,
					"Demo hostel accommodation. Sample listing only; not verified or currently available.", List.of("24/7 security", "Common room", "Laundry")),
			new Accommodation(16, "Chinchwad Study Stay", "Pune", "Chinchwad", "Shared room", 10400,
					"Demo shared accommodation. Sample listing only; not verified or currently available.", List.of("Study desk", "Shared kitchen", "Wi-Fi")),
			new Accommodation(17, "Nigdi Willow House", "Pune", "Nigdi", "PG", 8600,
					"Demo student accommodation. Sample listing only; not verified or currently available.", List.of("Meals included", "Housekeeping", "Wi-Fi")),
			new Accommodation(18, "Ravet Shared Nest", "Pune", "Ravet", "Shared room", 9700,
					"Demo shared accommodation. Sample listing only; not verified or currently available.", List.of("Shared kitchen", "Desk space", "Power backup"))
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