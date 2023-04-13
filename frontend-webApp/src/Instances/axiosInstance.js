import axios from "axios";
import { CLIENT_BACKEND_PORT, USER_BACKEND_PORT } from "../Config/URL";

export const axiosPrivateClient = axios.create({
  baseURL: `${CLIENT_BACKEND_PORT}`,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export const axiosPrivateUser = axios.create({
  baseURL: `${USER_BACKEND_PORT}`,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});