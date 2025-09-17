package com.jobportal.entity;


import com.jobportal.dto.ApplicantDto;
import com.jobportal.dto.ApplicationStatus;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.Base64;

@Document(collection = "applicants")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Applicant {
    private String applicantTd;
    private String name;
    private String email;
    private String phone;
    private String github;
    private byte[] resume;
    private String coverLetter;
    private LocalDateTime timestamp;
    private ApplicationStatus applicationStatus;

    public ApplicantDto toDto() {
        return new ApplicantDto(
                this.applicantTd,
                this.name,
                this.email,
                this.phone,
                this.github,
                this.resume != null ? Base64.getEncoder().encodeToString(this.resume) : null,
                this.coverLetter,
                this.timestamp,
                this.applicationStatus);
    }
}
