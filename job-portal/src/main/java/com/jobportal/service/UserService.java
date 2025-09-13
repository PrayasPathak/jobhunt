package com.jobportal.service;

import com.jobportal.dto.LoginRequest;
import com.jobportal.dto.UserDto;
import com.jobportal.exception.JobPortalException;
import jakarta.mail.MessagingException;

public interface UserService {
  UserDto register(UserDto dto);

  UserDto login(LoginRequest request);

    Boolean sendOtp(String email) throws MessagingException;

  Boolean verifyOtp(String email, String otp) throws JobPortalException;
}
