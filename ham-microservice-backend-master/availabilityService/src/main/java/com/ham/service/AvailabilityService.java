package com.ham.service;

import com.ham.exception.CustomExceptions;
import com.ham.feign.userServiceFeign;
import com.ham.model.Availability;
import com.ham.repo.AvailabilityRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;
import java.util.Optional;


@Service
public class AvailabilityService {

    private static final Logger logger = LoggerFactory.getLogger(AvailabilityService.class);

    @Autowired
    private AvailabilityRepository availabilityRepository;

    @Autowired
    private userServiceFeign userFeign;

    public Availability createAvailability(Availability availability) {
        int doctorId = availability.getDoctorID();
        logger.info("Creating availability for doctor ID: {}", doctorId);

        if(!userFeign.userExistsById(doctorId)){
            logger.error("Doctor not found with ID: {}", doctorId);
            throw new CustomExceptions("Doctor not found");
        }

        return availabilityRepository.save(availability);
    }

    public Availability updateAvailability(int availabilityId, @RequestBody Availability updatedAvailability) {
        Availability existing = availabilityRepository.findById(availabilityId)
                .orElseThrow(() -> new CustomExceptions("Availability not found with id: " + availabilityId));
        existing.setDate(updatedAvailability.getDate());
        existing.setTimeSlots(updatedAvailability.getTimeSlots());
        return availabilityRepository.save(existing);
    }


    public List<Availability> getAvailabilityByDoctorID(int doctorID) {
        return availabilityRepository.findByDoctorID(doctorID);
    }

    public void deleteAvailabilityById(int availabilityID) {
        availabilityRepository.deleteById(availabilityID);
    }

}