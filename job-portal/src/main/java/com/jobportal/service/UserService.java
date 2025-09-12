package com.jobportal.service;

import com.jobportal.dto.LoginRequest;
import com.jobportal.dto.UserDto;

public interface UserService {
  UserDto register(UserDto dto);

  UserDto login(LoginRequest request);
}
