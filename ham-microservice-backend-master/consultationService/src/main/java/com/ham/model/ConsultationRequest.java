package com.ham.model;

import lombok.Data;

@Data
public class ConsultationRequest {
    private int appointmentID;
    private String notes;
    private String prescription;

}