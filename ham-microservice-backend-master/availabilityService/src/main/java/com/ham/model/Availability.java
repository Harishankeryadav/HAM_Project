package com.ham.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Entity
@Table(name = "Availability")
@Data
public class Availability {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int availabilityID;

    @NotNull(message = "Doctor cannot be null")
    private int doctorID;

    @NotNull(message = "Date cannot be null")
    @FutureOrPresent(message="Availability date Must be today or in the future")
    private LocalDate date;

    @ElementCollection
    @CollectionTable(name="availability_timeslots", joinColumns=@JoinColumn(name="availabilityID"))
    @Column(name="timeSlot")
    @JsonFormat(pattern="HH:mm", locale="en_US")
    private List<LocalTime> timeSlots;
}
