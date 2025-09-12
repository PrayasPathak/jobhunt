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
