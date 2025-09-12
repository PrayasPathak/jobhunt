package com.jobportal.utility;

import com.jobportal.exception.JobPortalException;
import jakarta.validation.ConstraintViolation;
import jakarta.validation.ConstraintViolationException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.LocalDateTime;
import java.util.stream.Collectors;

@RestControllerAdvice
@Slf4j
public class ExceptionControllerAdvice {

  @ExceptionHandler(JobPortalException.class)
  public ResponseEntity<ErrorInfo> handleJobPortalException(JobPortalException e) {
    log.info("Handling Job Portal exception: ");
    ErrorInfo error = new ErrorInfo(
        e.getMessage(),
        HttpStatus.INTERNAL_SERVER_ERROR.value(),
        LocalDateTime.now());
    return ResponseEntity.badRequest().body(error);
  }

  @ExceptionHandler({ MethodArgumentNotValidException.class, ConstraintViolationException.class })
  public ResponseEntity<ErrorInfo> validatorExceptionHandler(Exception e) {
    log.info("Handling Validation exception: ");
    String message = "";
    if (e instanceof MethodArgumentNotValidException manvException) {
      message = manvException.getAllErrors()
          .stream()
          .map(ObjectError::getDefaultMessage)
          .collect(Collectors.joining(", "));
    } else {
      ConstraintViolationException cvException = (ConstraintViolationException) e;
      message = cvException.getConstraintViolations()
          .stream()
          .map(ConstraintViolation::getMessage)
          .collect(Collectors.joining(", "));
    }
    ErrorInfo error = new ErrorInfo(
        message,
        HttpStatus.BAD_REQUEST.value(),
        LocalDateTime.now());
    return ResponseEntity.badRequest().body(error);
  }

  @ExceptionHandler(Exception.class)
  public ResponseEntity<ErrorInfo> handleException(Exception e) {
    log.info("Handling Exception: ");
    ErrorInfo error = new ErrorInfo(
        e.getMessage(),
        HttpStatus.INTERNAL_SERVER_ERROR.value(),
        LocalDateTime.now());
    return ResponseEntity.internalServerError().body(error);
  }
}
