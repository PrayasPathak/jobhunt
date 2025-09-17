package com.jobportal.service.impl;

import com.jobportal.dto.ApplicantDto;
import com.jobportal.dto.ApplicationStatus;
import com.jobportal.dto.JobDto;
import com.jobportal.dto.JobStatus;
import com.jobportal.entity.Applicant;
import com.jobportal.entity.Job;
import com.jobportal.exception.JobPortalException;
import com.jobportal.repository.JobRepository;
import com.jobportal.service.JobService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class JobServiceImpl implements JobService {
    private final JobRepository jobRepository;

    @Override
    public JobDto postJob(JobDto dto) throws JobPortalException {
        Job job = dto.toEntity();
        job.setPostTime(LocalDateTime.now());
        job.setJobStatus(JobStatus.OPEN);
        return jobRepository.save(job).toDto();
    }

    @Override
    public List<JobDto> getAllJobs() {
        return jobRepository.findAll()
                .stream()
                .map(Job::toDto).toList();
    }

    @Override
    public JobDto getJobById(String id) throws JobPortalException {
        return jobRepository.findById(id)
                .orElseThrow(() -> new JobPortalException("Job not found"))
                .toDto();
    }

    @Override
    public void applyJob(String id, ApplicantDto dto) throws JobPortalException {
        Job job = jobRepository.findById(id).orElseThrow(() -> new JobPortalException("Job not found"));
        List<Applicant> applicants = job.getApplicants();
        if(applicants == null)
            applicants = new ArrayList<>();
        if(applicants.stream().filter((x) -> x.getApplicantTd() == dto.getApplicantTd()).toList().size()>0)
            throw new JobPortalException("Job applied already");
        dto.setApplicationStatus(ApplicationStatus.APPLIED);
        applicants.add(dto.toEntity());
        job.setApplicants(applicants);
        job = jobRepository.save(job);
    }
}
