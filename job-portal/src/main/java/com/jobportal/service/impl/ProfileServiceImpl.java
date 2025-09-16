package com.jobportal.service.impl;

import com.jobportal.dto.Experience;
import com.jobportal.dto.ProfileDto;
import com.jobportal.entity.Profile;
import com.jobportal.exception.JobPortalException;
import com.jobportal.repository.ProfileRepository;
import com.jobportal.repository.UserRepository;
import com.jobportal.service.ProfileService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ProfileServiceImpl implements ProfileService {
    private final ProfileRepository profileRepository;
    private final UserRepository userRepository;

    @Override
    public String createProfile(String userId, String email) {
        Profile profile = new Profile();
        profile.setUserId(userId);
        profile.setEmail(email);
        profile.setSkills(new ArrayList<>());
        profile.setExperiences(new ArrayList<>());
        profile.setCertifications(new ArrayList<>());

        profile = profileRepository.save(profile);
        return profile.getId();
    }

    @Override
    public ProfileDto getProfile(String id) {
        return profileRepository.findById(id)
                .orElseThrow(() -> new JobPortalException("Profile not found"))
                .toDto();
    }

    @Override
    public ProfileDto updateProfile(ProfileDto dto) {
        Profile existingProfile = profileRepository.findById(dto.getId())
                .orElseThrow(() -> new JobPortalException("Profile not found"));

        existingProfile.setJobTitle(dto.getJobTitle());
        existingProfile.setCompany(dto.getCompany());
        existingProfile.setLocation(dto.getLocation());
        existingProfile.setAbout(dto.getAbout());
        existingProfile.setSkills(dto.getSkills());
        existingProfile.setExperiences(dto.getExperiences());
        existingProfile.setCertifications(dto.getCertifications());

        List<Experience> existingExperiences = existingProfile.getExperiences();
        List<Experience> incomingExperiences = dto.getExperiences();

        List<Experience> mergedExperiences = new ArrayList<>();

        for (int i = 0; i < incomingExperiences.size(); i++) {
            Experience newExp = incomingExperiences.get(i);
            Experience oldExp = (existingExperiences != null && i < existingExperiences.size())
                    ? existingExperiences.get(i)
                    : new Experience();
            Experience merged = new Experience(
                    newExp.getTitle() != null ? newExp.getTitle() : oldExp.getTitle(),
                    newExp.getCompany() != null ? newExp.getCompany() : oldExp.getCompany(),
                    newExp.getLocation() != null ? newExp.getLocation() : oldExp.getLocation(),
                    newExp.getStartDate() != null ? newExp.getStartDate() : oldExp.getStartDate(),
                    newExp.getEndDate() != null ? newExp.getEndDate() : oldExp.getEndDate(),
                    newExp.getWorking() != null ? newExp.getWorking() : oldExp.getWorking(),
                    newExp.getDescription() != null ? newExp.getDescription() : oldExp.getDescription()
            );
            mergedExperiences.add(merged);
        }
        existingProfile.setExperiences(mergedExperiences);


        Profile updatedProfile = profileRepository.save(existingProfile);
        return updatedProfile.toDto();
    }
}
