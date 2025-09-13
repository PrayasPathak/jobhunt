package com.jobportal.controller;

import com.jobportal.dto.ProfileDto;
import com.jobportal.service.ProfileService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/profiles")
@RequiredArgsConstructor
public class ProfileController {
    private final ProfileService profileService;

    @GetMapping("/{profileId}")
    public ResponseEntity<ProfileDto> getProfile(@PathVariable String profileId) {
        return ResponseEntity.ok().body(profileService.getProfile(profileId));
    }

    @PutMapping("/update")
    public ResponseEntity<ProfileDto> updateProfile(@RequestBody ProfileDto dto) {
        return ResponseEntity.ok().body(profileService.updateProfile(dto));
    }
}
