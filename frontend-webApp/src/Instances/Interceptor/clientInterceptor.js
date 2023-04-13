import { useEffect } from "react";
import { axiosPrivateClient } from "../axiosInstance";

const useAxiosInstanceClient = () => {
  useEffect(() => {
    const requestIntercept = axiosPrivateClient.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"])
          config.headers["Authorization"] = `Bearer ${localStorage.getItem(
            "jwtClient"
          )}`;
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseIntercept = axiosPrivateClient.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config;
        if (error?.response?.status === 403 && !prevRequest?.sent) {
          prevRequest.sent = true;
          return axiosPrivateClient(prevRequest);
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosPrivateClient.interceptors.request.eject(requestIntercept);
      axiosPrivateClient.interceptors.response.eject(responseIntercept);
    };
  }, []);

  return axiosPrivateClient;
};

export default useAxiosInstanceClient;
