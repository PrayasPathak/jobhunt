package com.jobportal.service;

import com.jobportal.dto.ProfileDto;

public interface ProfileService {
    String createProfile(String userId, String email);

    ProfileDto getProfile(String id);

    ProfileDto updateProfile(ProfileDto req);

    ProfileDto getProfileByUserId(String userId);

    ProfileDto getProfileByEmail(String email);

}
