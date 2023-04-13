import { useEffect } from "react";
import { axiosPrivateUser } from "../axiosInstance";

const useAxiosInstanceUser = () => {
  useEffect(() => {
    const requestIntercept = axiosPrivateUser.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"])
          config.headers["Authorization"] = `Bearer ${localStorage.getItem(
            "jwtUser"
          )}`;
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseIntercept = axiosPrivateUser.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config;
        if (error?.response?.status === 403 && !prevRequest?.sent) {
          prevRequest.sent = true;
          return axiosPrivateUser(prevRequest);
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosPrivateUser.interceptors.request.eject(requestIntercept);
      axiosPrivateUser.interceptors.response.eject(responseIntercept);
    };
  }, []);

  return axiosPrivateUser;
};

export default useAxiosInstanceUser;
