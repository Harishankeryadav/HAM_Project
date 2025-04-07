package com.ham.feign;

import com.ham.model.Appointment;
import org.springframework.boot.autoconfigure.batch.BatchTransactionManager;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name="APPOINTMENT")
public interface appointmentfeign {
    @GetMapping("appointments/{id}")
    public ResponseEntity<Appointment> findAppointmentID(@PathVariable int id);
}
