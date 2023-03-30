import axios from "axios";

export const makeRequest = axios.create({
  baseURL: "https://ev-tracking-production.up.railway.app/",
  withCredentials: true,
});