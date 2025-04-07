package com.ham.service;


import com.ham.exception.CustomExceptions;
import com.ham.feign.appointmentfeign;
import com.ham.model.Appointment;
import com.ham.model.Consultation;
import com.ham.repo.ConsultationRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ConsultationService {
    private static final Logger logger = LoggerFactory.getLogger(ConsultationService.class);

    @Autowired
    private ConsultationRepository consultationRepository;

    @Autowired
    private appointmentfeign appointmentfeign;

    public Consultation addConsultation(int appointmentID, String notes, String prescription) {
        Appointment appointment = appointmentfeign.findAppointmentID(appointmentID).getBody();

        if (appointment == null) {
            logger.error("Appointment not found with ID: {}", appointmentID);
            throw new CustomExceptions("Appointment not found");
        }

        if ("Cancelled".equalsIgnoreCase(appointment.getStatus())) {
            throw new CustomExceptions("Consultation cannot be added as the appointment is not in 'Booked' status");
        }

        if (consultationRepository.findByAppointmentID(appointmentID).isPresent()) {
            logger.error("Consultation already exists for appointment ID: {}", appointmentID);
            throw new CustomExceptions("Consultation already exists for this appointment");
        }

        Consultation consultation = new Consultation();
        consultation.setAppointmentID(appointmentID);
        consultation.setNotes(notes);
        consultation.setPrescription(prescription);
        return consultationRepository.save(consultation);
    }

    public Optional<Consultation> getConsultationByAppointmentID(int appointmentID) {
        logger.info("Fetching consultation for appointment ID: {}", appointmentID);
        return consultationRepository.findByAppointmentID(appointmentID);
    }

    public Consultation updateConsultation(int consultationID , String notes , String prescription) {
        Consultation consultation = consultationRepository.findById(consultationID)
                .orElseThrow(() -> {
                    logger.error("Consultation not found with ID: {} to Update", consultationID);
                    return new RuntimeException("Consultation not found");
                });
        consultation.setNotes(notes);
        consultation.setPrescription(prescription);
        return consultationRepository.save(consultation);
    }
    public void deleteConsultation(int consultationID) {
        if(!consultationRepository.existsById(consultationID)) {
            logger.error("Consultation not found with ID: {}", consultationID);
            throw new RuntimeException("Consultation not found");
        }
        consultationRepository.deleteById(consultationID);
    }
}