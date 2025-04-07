package com.ham.model;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import lombok.Data;

@Data
public class User {
    private int userID;
    private String name;
    private String role;
    private String email;
    private String phone;
    private String password;
}
