package com.ham.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class Appointment {
    private int appointmentID;
    private int patientID;
    private int doctorID;
    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm", locale="en_US")
    private LocalDateTime timeSlot;
    private String status;
}

