package com.jobportal.entity;

import com.jobportal.dto.ApplicantDto;
import com.jobportal.dto.JobDto;
import com.jobportal.dto.JobStatus;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.List;

@Document(collection = "jobs")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Job {
    @Id
    private String id;
    private String jobTitle;
    private String company;
    private String about;
    private List<ApplicantDto> applicantDtos;
    private String experience;
    private String jobType;
    private String location;
    private Long  packageOffered;
    private LocalDateTime postTime;
    private List<String> skillsRequired;
    private String description;
    private JobStatus jobStatus;

    public JobDto toDto(){
        return new JobDto(
                this.id,
                this.jobTitle,
                this.company,
                this.about,
                this.applicantDtos,
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
