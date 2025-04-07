package com.ham.model;


import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class Availability {
    @JsonProperty("availabilityID")
    private int availabilityID;
    @JsonProperty("doctorID")
    private int doctorID;
    @JsonFormat(pattern = "yyyy-MM-dd")
    @JsonProperty("date")
    private LocalDate date;
    @JsonProperty("timeSlots")
    @JsonFormat(pattern="HH:mm", locale="en_US")
    private List<LocalTime> timeSlots;
}