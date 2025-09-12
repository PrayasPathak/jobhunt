package com.jobportal.exception;

public class JobPortalException extends RuntimeException {
  private static final long serialVersionUUID = 1L;

  public JobPortalException(String message) {
    super(message);
  }
}
