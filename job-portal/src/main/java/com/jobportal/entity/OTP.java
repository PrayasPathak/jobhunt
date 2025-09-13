package com.jobportal.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Document(collection = "otp")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class OTP {
    @Id
    private String email;
    private String otpCode;
    private LocalDateTime creationTime;
}
