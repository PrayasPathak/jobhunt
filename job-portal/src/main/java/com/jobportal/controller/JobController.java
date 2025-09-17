package com.jobportal.controller;

import com.jobportal.dto.JobDto;
import com.jobportal.exception.JobPortalException;
import com.jobportal.service.JobService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/jobs")
@RequiredArgsConstructor
public class JobController {
    private final JobService jobService;

    @PostMapping
    public ResponseEntity<JobDto> postJon(@Valid @RequestBody JobDto dto)throws JobPortalException {
        return ResponseEntity.status(HttpStatus.CREATED).body(jobService.postJob(dto));
    }

    @GetMapping
    public ResponseEntity<List<JobDto>> getAllJobs(){
        return ResponseEntity.ok().body(jobService.getAllJobs());
    }

    @GetMapping("/{id}")
    public ResponseEntity<JobDto> getJobById(@PathVariable String id) throws JobPortalException{
        return ResponseEntity.ok().body(jobService.getJobById(id));
    }
}
