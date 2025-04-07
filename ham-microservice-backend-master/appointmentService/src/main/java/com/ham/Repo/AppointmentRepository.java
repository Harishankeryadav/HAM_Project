package com.ham.Repo;

import com.ham.model.Appointment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AppointmentRepository extends JpaRepository<Appointment, Integer> {
    List<Appointment> findByPatientID(int patientID);
    List<Appointment> findByDoctorID(int doctorID);
}