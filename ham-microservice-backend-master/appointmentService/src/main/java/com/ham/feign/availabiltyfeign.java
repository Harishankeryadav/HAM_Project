package com.ham.feign;

import com.ham.model.Availability;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.time.LocalDate;
import java.util.Optional;

@FeignClient(name="AVAILABILITY")
public interface availabiltyfeign {
    @GetMapping("/availability/doctor/{doctorID}/date/{date}")
    Optional<Availability> findByDoctorIDAndDate(@PathVariable("doctorID") int doctorID, @PathVariable("date") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date);

    @PutMapping("/availability/update/{availabilityId}")
    public ResponseEntity<Availability> updateAvailability(@PathVariable int availabilityId, @RequestBody Availability availability);

}
