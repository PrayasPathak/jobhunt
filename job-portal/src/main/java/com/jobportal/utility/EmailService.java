package com.jobportal.utility;

import com.jobportal.entity.OTP;
import com.jobportal.entity.User;
import com.jobportal.exception.JobPortalException;
import com.jobportal.repository.OTPRepository;
import com.jobportal.repository.UserRepository;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.security.SecureRandom;
import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class EmailService {
    private final JavaMailSender mailSender;
    private final OTPRepository otpRepository;
    private final UserRepository userRepository;

    @Async
    public void sendEmail(String email) throws MessagingException {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new JobPortalException("User not found"));
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper messageHelper = new MimeMessageHelper(message, true);
        messageHelper.setTo(email);
        messageHelper.setSubject("Your Otp Code");
        String generatedOtp = generateOtp(6);
        OTP otp = new OTP(email, generatedOtp, LocalDateTime.now());
        otpRepository.save(otp);
        messageHelper.setText(Data.getMessageBody(generatedOtp, user.getName()), true);
        mailSender.send(message);
    }

    private String generateOtp(int length) {
        StringBuilder builder = new StringBuilder();
        SecureRandom random = new SecureRandom();
        for (int i = 0; i < length; i++)
            builder.append(random.nextInt(10));
        return builder.toString();
    }
}
