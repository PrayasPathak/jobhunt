package com.jobportal.repository;

import com.jobportal.entity.OTP;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OTPRepository extends MongoRepository<OTP, String> {
}
