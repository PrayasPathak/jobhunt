package com.jobportal.controller;

import com.jobportal.dto.LoginRequest;
import com.jobportal.dto.UserDto;
import com.jobportal.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
}
