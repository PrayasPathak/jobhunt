package com.jobportal.service.impl;

import com.jobportal.dto.LoginRequest;
import com.jobportal.dto.UserDto;
import com.jobportal.entity.User;
import com.jobportal.exception.JobPortalException;
import com.jobportal.repository.UserRepository;
import com.jobportal.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
  private final UserRepository userRepository;
  private final PasswordEncoder passwordEncoder;

  @Override
  public UserDto register(UserDto dto) {
    Optional<User> optUser = userRepository.findByEmail(dto.getEmail());
    if (optUser.isPresent())
      throw new JobPortalException("User already exists with the provided email");
    User user = dto.toEntity();
    user.setPassword(passwordEncoder.encode(dto.getPassword()));
    return userRepository.save(user).toDto();
  }

  @Override
  public UserDto login(LoginRequest request) {
    User user = userRepository.findByEmail(request.getEmail())
        .orElseThrow(() -> new JobPortalException("User not found"));
    if (!passwordEncoder.matches(request.getPassword(), user.getPassword()))
      throw new JobPortalException("Invalid username or password");
    return user.toDto();
  }
}
