package com.ham.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Entity
@Table(name = "Consultation")
@Data
public class Consultation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int consultationID;

    @NotNull(message = "Appointment cannot be null")
    private int appointmentID;

    private String notes;

    private String prescription;
}