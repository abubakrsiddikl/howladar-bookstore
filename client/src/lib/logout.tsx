import { axiosSecure } from "./axios";

export const logout = async () => {
  try {
    const res = await axiosSecure.post("/auth/logout");
    return res.data;
  } catch (error) {
    console.error("Logout failed", error);
  }
};
