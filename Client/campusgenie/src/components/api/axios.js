import axios from "axios";


const axiosInstance = axios.create({
    baseURL: "http://127.0.0.1:8000/api/",
  });

  axiosInstance.interceptors.request.use((config) => {
    console.log("Request Interceptor", config);
    return config;
  });

  axiosInstance.interceptors.response.use(
    (response) => {
      console.log("Response Interceptor", response);
      return response;
    },
    (error) => {
      console.error("Response Interceptor error", error);
      return Promise.reject(error);
    }
  );
  
export async function API(path, request, method, params, headers = {}) {
    return axiosInstance({
      data: request,
      url: path,
      method: method,
      params :params,
      headers: headers,
    }).then((res) => {
      if (res) {
        return res.data;
      } else {
        console.error('this is error');
        throw Object.assign(new Error('Invalid Response'), { code: 402 });
      }
    });
  }