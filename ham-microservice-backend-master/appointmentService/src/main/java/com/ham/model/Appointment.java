package com.ham.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import java.time.LocalDateTime;

@Entity
@Table(name = "Appointment")
@Data
public class Appointment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int appointmentID;

    @NotNull(message = "Patient cannot be null")
    private int patientID;

    @NotNull(message = "Doctor cannot be null")
    private int doctorID;

    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm", locale="en_US")
    @NotNull(message = "Time slot cannot be null")
    @Future(message="Appointment time must be in the future not in past")
    private LocalDateTime timeSlot;

    @NotEmpty(message = "Status cannot be empty")
    private String status;
}
