import axiosInstance from "./axiosInstance";

export const registerUser = async (user: any) => {
  return axiosInstance
    .post("/api/users/register", user)
    .then((res) => res.data)
    .catch((error) => {
      throw error;
    });
};

export const loginUser = async (data: any) => {
  return axiosInstance
    .post("/api/users/login", data)
    .then((res) => res.data)
    .catch((error) => {
      throw error;
    });
};

export const sendOtp = async (email: string) => {
  return axiosInstance
    .post("/api/users/sendOtp", email)
    .then((res) => res.data)
    .catch((error) => {
      throw error;
    });
};

export const verifyOtp = async (email: string, otp: string) => {
  return axiosInstance
    .get(`/api/users/verifyOtp/${email}/${otp}`)
    .then((res) => res.data)
    .catch((error) => {
      throw error;
    });
};

export const changePassword = async (email: string, password: string) => {};
