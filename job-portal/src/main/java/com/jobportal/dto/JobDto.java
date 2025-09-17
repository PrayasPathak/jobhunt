package com.jobportal.dto;

import com.jobportal.entity.Job;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class JobDto {
    private String id;
    private String jobTitle;
    private String company;
    private String about;
    private List<ApplicantDto> applicants;
    private String experience;
    private String jobType;
    private String location;
    private Long packageOffered;
    private LocalDateTime postTime;
    private List<String> skillsRequired;
    private String description;
    private JobStatus jobStatus;

    public Job toEntity() {
        return new Job(
                this.id,
                this.jobTitle,
                this.company,
                this.about,
                this.applicants != null ? this.applicants.stream().map(ApplicantDto::toEntity).toList() : null,
                this.experience,
                this.jobType,
                this.location,
                this.packageOffered,
                this.postTime,
                this.skillsRequired,
                this.description,
                this.jobStatus);
    }
}
