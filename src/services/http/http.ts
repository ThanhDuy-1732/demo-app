import axios, { AxiosError, AxiosInstance, AxiosResponse } from "axios";

export const http = (): AxiosInstance => {
  const instance = axios.create({
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    baseURL: process.env.NEXT_PUBLIC_API_URL,
  });

  instance.interceptors.request.use((config) => {
    config.headers.setContentType("application/json");
    
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      config.headers.setAuthorization(`Bearer ${accessToken}`);
    }

    return config;
  });

  const responseStatusOK = (response: AxiosResponse) => response;
  const responseStatusFailure = (error: AxiosError<{ message: string }>) => {
    console.log(error);
    throw new Error(error.response?.data?.message || '');
  }

  instance.interceptors.response.use(response => responseStatusOK(response), error => responseStatusFailure(error))

  return instance;
};
