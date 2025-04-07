package com.ham.repo;

import com.ham.model.Availability;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface AvailabilityRepository extends JpaRepository <Availability, Integer> {
 List<Availability> findByDoctorID(int doctorId);
Optional<Availability> findByDoctorIDAndDate(int doctor, LocalDate date);

}