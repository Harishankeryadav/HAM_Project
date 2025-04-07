package com.ham.controller;

import com.ham.Repo.AppointmentRepository;
import com.ham.model.Appointment;
import com.ham.service.AppointmentService;
import jakarta.ws.rs.Path;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/appointments")
@CrossOrigin(value = "http://localhost:4200")
public class AppointmentController {

    @Autowired
    private AppointmentService appointmentService;

    @Autowired
    private AppointmentRepository repo;

    @PostMapping("/book")
    public ResponseEntity<Appointment> bookAppointment(@RequestBody Appointment appointment) {
        Appointment created = appointmentService.bookAppointment(
                appointment.getPatientID(),
                appointment.getDoctorID(),
                appointment.getTimeSlot());
        return new ResponseEntity<>(created, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Appointment> findAppointment(@PathVariable int id) {
        Optional<Appointment> appointment = repo.findById(id);
        return appointment.map(value -> new ResponseEntity<>(value, HttpStatus.OK)).orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PutMapping("/update/{appointmentID}")
    public ResponseEntity<Appointment> updateAppointment(@PathVariable int appointmentID,
                                                         @RequestBody Appointment appointment) {
        Appointment updated = appointmentService.updateAppointment(appointmentID, appointment.getTimeSlot());
        return new ResponseEntity<>(updated, HttpStatus.OK);
    }

    @PutMapping("/completed/{appointmentID}")
    public ResponseEntity<Appointment> completedAppointment(@PathVariable int appointmentID) {
        Appointment updated = appointmentService.completedAppointment(appointmentID);
        return new ResponseEntity<>(updated, HttpStatus.OK);
    }

    @PutMapping("/cancel/{appointmentID}")
    public ResponseEntity<Appointment> cancelAppointment(@PathVariable int appointmentID) {
        Appointment appointment = appointmentService.cancelAppointment(appointmentID);
        return new ResponseEntity<>(appointment, HttpStatus.OK);
    }


    @GetMapping("/patient/{patientID}")
    public ResponseEntity<List<Appointment>> getAppointmentsByPatient(@PathVariable int patientID) {
        List<Appointment> appointments = appointmentService.getAppointmentsByPatientID(patientID);
        return new ResponseEntity<>(appointments, HttpStatus.OK);
    }


    @GetMapping("/doctor/{doctorID}")
    public ResponseEntity<List<Appointment>> getAppointmentsByDoctor(@PathVariable int doctorID) {
        List<Appointment> appointments = appointmentService.getAppointmentsByDoctorID(doctorID);
        return new ResponseEntity<>(appointments, HttpStatus.OK);
    }
}
