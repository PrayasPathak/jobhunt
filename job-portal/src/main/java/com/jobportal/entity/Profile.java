package com.jobportal.entity;

import com.jobportal.dto.Certification;
import com.jobportal.dto.Experience;
import com.jobportal.dto.ProfileDto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Base64;
import java.util.List;

@Document(collection = "profiles")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Profile {
    @Id
    private String id;
    private String userId;
    private String email;
    private String jobTitle;
    private String company;
    private String location;
    private String about;
    private byte[] picture;
    private List<String> skills;
    private List<Experience> experiences;
    private List<Certification> certifications;
    private List<String> savedJobs;

    public ProfileDto toDto() {
        return new ProfileDto(
                this.id,
                this.userId,
                this.email,
                this.jobTitle,
                this.company,
                this.location,
                this.about,
                this.picture != null ? Base64.getEncoder().encodeToString(this.picture) : null,
                this.skills,
                this.experiences,
                this.certifications,
                this.savedJobs
        );
    }
}
