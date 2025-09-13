package com.jobportal.controller;

import com.jobportal.dto.LoginRequest;
import com.jobportal.dto.ResponseDto;
import com.jobportal.dto.UserDto;
import com.jobportal.exception.JobPortalException;
import com.jobportal.service.UserService;
import jakarta.mail.MessagingException;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Pattern;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    @PostMapping("/register")
    public ResponseEntity<UserDto> registerUser(@Valid @RequestBody UserDto dto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(userService.register(dto));
    }

    @PostMapping("/login")
    public ResponseEntity<UserDto> loginUser(@Valid @RequestBody LoginRequest request) {
        return ResponseEntity.ok(userService.login(request));
    }

    @PostMapping("/sendOtp/{email}")
    public ResponseEntity<ResponseDto> sendOtp(
            @PathVariable @Email(message = "Invalid email address") String email) throws MessagingException {
        userService.sendOtp(email);
        return ResponseEntity.ok()
                .body(new ResponseDto("Otp sent to your email. Please enter the otp to complete registration"));
    }

    @GetMapping("/verifyOtp/{email}/{otp}")
    public ResponseEntity<ResponseDto> verifyOtp(
            @PathVariable @Email(message = "Email is invalid") String email,
            @PathVariable @Pattern(regexp = "^[0-9]{6}$", message = "OTP in invalid") String otp) throws JobPortalException {
        userService.verifyOtp(email, otp);
        return ResponseEntity.ok()
                .body(new ResponseDto("Otp has been verified"));
    }
}
