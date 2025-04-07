package com.ham.repo;

import com.ham.model.Consultation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ConsultationRepository extends JpaRepository<Consultation, Integer> {
    Optional<Consultation> findByAppointmentID(int appointmentID);
}