package com.ham.controller;

import com.ham.model.Consultation;
import com.ham.model.ConsultationRequest;
import com.ham.service.ConsultationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/consultations")
@CrossOrigin(value = "http://localhost:4200")
public class ConsultationController {
    @Autowired
    private ConsultationService consultationService;

    @PostMapping("/add")
    public ResponseEntity<Consultation> addConsultation(@RequestBody ConsultationRequest consultationRequest) {
        Consultation consultation = consultationService.addConsultation(
                consultationRequest.getAppointmentID(),
                consultationRequest.getNotes(),
                consultationRequest.getPrescription()
        );

        return new ResponseEntity<>(consultation, HttpStatus.CREATED);
    }

    @GetMapping("/appointment/{appointmentID}")
    public ResponseEntity<Consultation> getConsultationByAppointmentID(@PathVariable int appointmentID) {
        Optional<Consultation> consultation = consultationService.getConsultationByAppointmentID(appointmentID);
        return consultation.map(ResponseEntity::ok).orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }
    @PutMapping("/update/{consultationID}")
    public ResponseEntity<Consultation> updateConsultation(
            @PathVariable int consultationID,
            @RequestParam String notes,
            @RequestParam String prescription){

        Consultation updatedConsultation = consultationService.updateConsultation(consultationID, notes, prescription);
        return new ResponseEntity<>(updatedConsultation , HttpStatus.OK);
    }
    @DeleteMapping("/delete/{consultationID}")
    public ResponseEntity<Void> deleteConsultation(@PathVariable int consultationID){
        consultationService.deleteConsultation(consultationID);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
