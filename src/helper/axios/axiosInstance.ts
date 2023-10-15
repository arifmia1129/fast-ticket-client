import { LOCAL_STORAGE_KEYS } from "@/constants/localStorageKeys";
import { createNewAccessToken, storeToken } from "@/services/auth.service";
import { ICustomResponse } from "@/types";
import { getFromLocalStorage } from "@/utils/local-store";
import axios from "axios";
import { getBaseUrl } from "../config/envConfig";

const axiosInstance = axios.create({
  baseURL: getBaseUrl(),
  timeout: 1000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
  function (config) {
    const accessToken = getFromLocalStorage(LOCAL_STORAGE_KEYS.ACCESS_TOKEN);

    if (accessToken) {
      config.headers.Authorization = accessToken;
    }
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// @ts-ignore
axiosInstance.interceptors.response.use(
  // @ts-ignore
  function (response) {
    return response;
  },
  async function (error) {
    const config = error.config;

    if (error.response.status === 403 && !config.sent) {
      config.sent = true;
      const res = await createNewAccessToken();
      const accessToken = res.data.data.accessToken;
      config.headers["Authorization"] = accessToken;
      storeToken(accessToken);
      return axiosInstance(config);
    } else {
      return Promise.reject(error);
    }
  }
);

export default axiosInstance;
