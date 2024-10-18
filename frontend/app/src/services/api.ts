import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://api.artic.edu/api",
});

const cache: Record<string, any> = {};

axiosInstance.interceptors.response.use((response) => {
  const { url } = response.config;
  if (url) cache[url] = response.data;
  return response;
});

export { axiosInstance, cache };
