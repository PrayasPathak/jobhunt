import axiosInstance from "./axiosInstance";

export const postJob = async (job: any) => {
  return axiosInstance
    .post("/api/jobs", job)
    .then((res) => res.data)
    .catch((error) => {
      throw error;
    });
};

export const getAllJobs = async () => {
  return axiosInstance
    .get("/api/jobs")
    .then((res) => res.data)
    .catch((err) => {
      throw err;
    });
};

export const getJobById = async (jobId: string) => {
  return axiosInstance
    .get(`/api/jobs/${jobId}`)
    .then((res) => res.data)
    .catch((error) => {
      throw error;
    });
};

export const applyJob = async (id: string, applicant: any) => {
  return axiosInstance
    .post(`/api/jobs/apply/${id}`, applicant)
    .then((res) => res.data)
    .catch((error) => {
      throw error;
    });
};
