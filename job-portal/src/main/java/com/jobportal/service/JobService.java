package com.jobportal.service;

import com.jobportal.dto.JobDto;
import com.jobportal.exception.JobPortalException;
import jakarta.validation.Valid;

import java.util.List;

public interface JobService {

    JobDto postJob(@Valid JobDto dto) throws JobPortalException;

    List<JobDto> getAllJobs();

    JobDto getJobById(String id) throws JobPortalException;
}
