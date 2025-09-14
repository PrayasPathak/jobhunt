import axiosInstance from "./axiosInstance";

export const getProfile = async (profileId: string) => {
  return axiosInstance
    .get(`/api/profiles/${profileId}`)
    .then((res) => res.data)
    .catch((error) => {
      throw error;
    });
};

export const updateProfile = async (profile: any) => {
  return axiosInstance
    .put("/api/profiles/update", profile)
    .then((res) => res.data)
    .catch((error) => {
      throw error;
    });
};
