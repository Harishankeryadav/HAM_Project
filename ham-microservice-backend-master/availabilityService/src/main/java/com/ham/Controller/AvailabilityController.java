package com.ham.Controller;

import com.ham.model.Availability;
import com.ham.repo.AvailabilityRepository;
import com.ham.service.AvailabilityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(value = "http://localhost:4200")
@RequestMapping("/availability")
public class AvailabilityController {

    @Autowired
    private AvailabilityService availabilityService;

    @Autowired
    private AvailabilityRepository availabilityRepository;

    @GetMapping("/doctor/{doctorID}/date/{date}")
    public Optional<Availability> findByDoctorIDAndDate(@PathVariable int doctorID, @PathVariable @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {
        return availabilityRepository.findByDoctorIDAndDate(doctorID, date);
    }

    @PostMapping("/create")
    public ResponseEntity<Availability> createAvailability(@RequestBody Availability availability) {
        Availability created = availabilityService.createAvailability(availability);
        return new ResponseEntity<>(created, HttpStatus.CREATED);
    }

    @PutMapping("/update/{availabilityId}")
    public ResponseEntity<Availability> updateAvailability(@PathVariable int availabilityId,
                                                           @RequestBody Availability availability) {
        Availability updated = availabilityService.updateAvailability(availabilityId, availability);
        return new ResponseEntity<>(updated, HttpStatus.OK);
    }

    @GetMapping("/doctor/{doctorId}")
    public ResponseEntity<List<Availability>> getAvailabilityofdoctor(@PathVariable int doctorId) {
        List<Availability> availabilities = availabilityService.getAvailabilityByDoctorID(doctorId);
        return new ResponseEntity<>(availabilities, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteAvailability(@PathVariable int id) {
        availabilityService.deleteAvailabilityById(id);
        return ResponseEntity.noContent().build();
    }

}