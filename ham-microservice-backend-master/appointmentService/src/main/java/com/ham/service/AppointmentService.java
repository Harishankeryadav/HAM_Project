package com.ham.service;

import com.ham.Repo.AppointmentRepository;
import com.ham.exception.CustomExceptions;
import com.ham.feign.availabiltyfeign;
import com.ham.feign.userfeign;
import com.ham.model.Appointment;
import com.ham.model.Availability;
import com.ham.model.User;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

@Service
public class AppointmentService {

    private static final Logger logger = LoggerFactory.getLogger(AppointmentService.class);

    @Autowired
    private AppointmentRepository appointmentRepository;

    @Autowired
    private userfeign userfeign;

    @Autowired
    private EmailService emailService;

    @Autowired
    private availabiltyfeign availabiltyfeign;

    public Appointment bookAppointment(int patientID, int doctorID, LocalDateTime appointmentDateTime) {
        logger.info("Booking appointment for patient ID: {} with doctor ID: {}", patientID, doctorID);

        if(!userfeign.userExistsById(doctorID)){
            logger.error("Doctor not found with ID: {}", doctorID);
            throw new CustomExceptions("Doctor not found");
        }

        if(!userfeign.userExistsById(patientID)){
            logger.error("Patient not found with ID: {}", patientID);
            throw new CustomExceptions("Patient not found");
        }

        LocalDate date = appointmentDateTime.toLocalDate();
        LocalTime timeSlot = appointmentDateTime.toLocalTime();

        Availability availability = availabiltyfeign.findByDoctorIDAndDate(doctorID, date)
                .orElseThrow(() -> new CustomExceptions("Doctor is not available on " + date));
        List<LocalTime> slots = availability.getTimeSlots();
        if (!slots.contains(timeSlot)) {
            throw new CustomExceptions("Requested time slot " + timeSlot + " is not available");
        }
        else {
            slots.remove(timeSlot);
            logger.info("Updating availability: {}", availability);
            availabiltyfeign.updateAvailability(availability.getAvailabilityID(),availability);
        }

        Appointment appointment = new Appointment();
        appointment.setPatientID(patientID);
        appointment.setDoctorID(doctorID);
        appointment.setTimeSlot(appointmentDateTime);
        appointment.setStatus("Booked");

        Optional<User> patientData = userfeign.getUserData(patientID);
        Optional<User> doctorData = userfeign.getUserData(doctorID);

        if (patientData.isEmpty()) {
            logger.info("Patient data not found for ID: " + patientID);
        }
        if (doctorData.isEmpty()) {
            logger.info("Doctor data not found for ID: " + doctorID);
        }
//        String patientEmail = patientData.get().getEmail();
//        String doctorEmail = doctorData.get().getEmail();
//
//        logger.info("Patient Email: " + patientEmail);
//        logger.info("Doctor Email: " + doctorEmail);
//
//        emailService.sendEmail(patientEmail,
//                "Appointment Confirmation ✔️☑️",
//                "Your appointment with Doctor " + doctorData.get().getName() + " is confirmed for " + timeSlot);
//        emailService.sendEmail(doctorEmail,
//                "Appointment Confirmation ✔️☑️",
//                "Your appointment with Patient " + patientData.get().getName() + " is confirmed for " + timeSlot);

        return appointmentRepository.save(appointment);
    }


    public Appointment updateAppointment(int appointmentID, LocalDateTime newAppointmentDateTime) {
        Appointment appointment = appointmentRepository.findById(appointmentID)
                .orElseThrow(() -> new CustomExceptions("Appointment not found with ID: " + appointmentID));

        LocalDate date = newAppointmentDateTime.toLocalDate();
        LocalTime newTimeSlot = newAppointmentDateTime.toLocalTime();

        Availability availability = availabiltyfeign.findByDoctorIDAndDate(appointment.getDoctorID(), date)
                .orElseThrow(() -> new CustomExceptions("Doctor is not available on " + date));
        List<LocalTime> slots = availability.getTimeSlots();
        if (!slots.contains(newTimeSlot)) {
            throw new RuntimeException("Requested new time slot " + newTimeSlot + " is not available");
        }
        LocalTime oldTimeSlot = appointment.getTimeSlot().toLocalTime();
        slots.add(oldTimeSlot);

        slots.remove(newTimeSlot);
        availability.setTimeSlots(slots);
        logger.info("Updating availability: {}", availability);
        availabiltyfeign.updateAvailability(availability.getAvailabilityID(),availability);

        appointment.setTimeSlot(newAppointmentDateTime);

//        Optional<User> patientData = userfeign.getUserData(appointment.getPatientID());
//        Optional<User> doctorData = userfeign.getUserData(appointment.getDoctorID());
//
//        String patientEmail = patientData.get().getEmail();
//        String doctorEmail = doctorData.get().getEmail();
//
//        emailService.sendEmail(patientEmail,
//                "Appointment Updated! ⭕",
//                "Your appointment with Doctor " + doctorData.get().getName() + " is updated from  " + oldTimeSlot +" to "+newAppointmentDateTime);
//        emailService.sendEmail(doctorEmail,
//                "Appointment Updated! ⭕",
//                "Your appointment with Patient " + patientData.get().getName() + " is confirmed for " + oldTimeSlot +" to "+newAppointmentDateTime);

        return appointmentRepository.save(appointment);
    }

    public Appointment completedAppointment(int appointmentID) {
        Appointment appointment = appointmentRepository.findById(appointmentID)
                .orElseThrow(() -> new CustomExceptions("Appointment not found with ID: " + appointmentID));
        if("Cancelled".equalsIgnoreCase(appointment.getStatus())) {
            throw new CustomExceptions("Can't Complete Appointment that is already completed");
        }
        appointment.setStatus("Completed");
//        Optional<User> patientData = userfeign.getUserData(appointment.getPatientID());
//        Optional<User> doctorData = userfeign.getUserData(appointment.getDoctorID());
//
//        String patientEmail = patientData.get().getEmail();
//        String doctorEmail = doctorData.get().getEmail();
//
//        emailService.sendEmail(patientEmail,
//                "Appointment completed 🙌",
//                "Your appointment with Doctor " + doctorData.get().getName() + " is Completed");
//        emailService.sendEmail(doctorEmail,
//                "Appointment Completed 🙌",
//                "Your appointment with Patient " + patientData.get().getName() + " is Completed");
        return appointmentRepository.save(appointment);
    }

    public Appointment cancelAppointment(int appointmentID) {
        Appointment appointment = appointmentRepository.findById(appointmentID)
                .orElseThrow(() -> new CustomExceptions("Appointment not found with ID: " + appointmentID));
        if("Completed".equalsIgnoreCase(appointment.getStatus())) {
            throw new CustomExceptions("Can't cancel Appointment that is already completed");
        }

        appointment.setStatus("Cancelled");

        LocalDate date = appointment.getTimeSlot().toLocalDate();
        LocalTime timeSlot = appointment.getTimeSlot().toLocalTime();
        Availability availability = availabiltyfeign.findByDoctorIDAndDate(appointment.getDoctorID(), date)
                .orElse(null);
        if (availability != null) {
            availability.getTimeSlots().add(timeSlot);
            availabiltyfeign.updateAvailability(availability.getAvailabilityID(),availability);
        }

//        Optional<User> patientData = userfeign.getUserData(appointment.getPatientID());
//        Optional<User> doctorData = userfeign.getUserData(appointment.getDoctorID());
//
//        String patientEmail = patientData.get().getEmail();
//        String doctorEmail = doctorData.get().getEmail();
//
//        emailService.sendEmail(patientEmail,
//                "Appointment Cancelled! ❌",
//                "Your appointment with Doctor " + doctorData.get().getName() +" on "+ appointment.getTimeSlot()+ " is cancelled");
//        emailService.sendEmail(doctorEmail,
//                "Appointment Cancelled! ❌",
//                "Your appointment with Patient " + patientData.get().getName() +" on "+appointment.getTimeSlot()+ " is cancelled");

        return appointmentRepository.save(appointment);
    }

    public List<Appointment> getAppointmentsByPatientID(int patientID) {
        return appointmentRepository.findByPatientID(patientID);
    }

    public List<Appointment> getAppointmentsByDoctorID(int doctorID) {
        return appointmentRepository.findByDoctorID(doctorID);
    }
}
