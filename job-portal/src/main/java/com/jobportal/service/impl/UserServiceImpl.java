package com.jobportal.service.impl;

import com.jobportal.dto.LoginRequest;
import com.jobportal.dto.ResponseDto;
import com.jobportal.dto.UserDto;
import com.jobportal.entity.OTP;
import com.jobportal.entity.User;
import com.jobportal.exception.JobPortalException;
import com.jobportal.repository.OTPRepository;
import com.jobportal.repository.UserRepository;
import com.jobportal.service.UserService;
import com.jobportal.utility.EmailService;
import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final EmailService emailService;
    private final OTPRepository otpRepository;

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

    @Override
    public Boolean sendOtp(String email) throws MessagingException {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new JobPortalException("User not found"));
        emailService.sendEmail(email);
        return true;
    }

    @Override
    public Boolean verifyOtp(String email, String otp) throws JobPortalException {
        OTP otpEntity = otpRepository.findById(email)
                .orElseThrow(() -> new JobPortalException("OTP is invalid or expired"));
        if (!otpEntity.getOtpCode().equals(otp))
            throw new JobPortalException("OTP is incorrect");
        return true;
    }

    @Override
    public ResponseDto changePassword(LoginRequest req) {
        User user = userRepository.findByEmail(req.getEmail())
                .orElseThrow(() -> new JobPortalException("User not found"));
        user.setPassword(passwordEncoder.encode(req.getPassword()));
        userRepository.save(user);
        return new ResponseDto("Password changed successfully");
    }

    @Scheduled(fixedRate = 60000)
    public void removeExpiredOTPs() {
        LocalDateTime expiryTme = LocalDateTime.now().minusMinutes(5);
        List<OTP> expiredOTPs = otpRepository.findByCreationTimeBefore(expiryTme);
        if (!expiredOTPs.isEmpty()) {
            otpRepository.deleteAll(expiredOTPs);
            System.out.println("Removed " + expiredOTPs.size() + " expired OTPs");
        }
    }
}
