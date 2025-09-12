package com.jobportal.dto;

import com.jobportal.entity.User;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserDto {
  private String id;
  @NotBlank(message = "Name is required")
  private String name;

  @NotBlank(message = "Email is required")
  @Email(message = "Email is invalid")
  private String email;

  @Size(min = 8, message = "Password must be at least 8 characters long")
  @Pattern(regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[*&^%$#@!()]).{8,}$", message = "Password must be at least 8 characters and include at least 1 lowercase, 1 uppercase, 1 digit, and 1 special characters")
  @NotBlank(message = "Password is required")
  private String password;

  private AccountType accountType;

  public User toEntity() {
    return User.builder()
        .id(this.id)
        .name(this.name)
        .email(this.email)
        .password(this.password)
        .accountType(this.accountType)
        .build();
  }
}
