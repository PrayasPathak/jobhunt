package com.jobportal.service.impl;

import com.jobportal.dto.ProfileDto;
import com.jobportal.entity.Profile;
import com.jobportal.exception.JobPortalException;
import com.jobportal.repository.ProfileRepository;
import com.jobportal.repository.UserRepository;
import com.jobportal.service.ProfileService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

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

        Profile updatedProfile = profileRepository.save(existingProfile);
        return updatedProfile.toDto();
    }
}
