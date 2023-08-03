import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: "http://127.0.0.1:8000/api/",
});

axiosInstance.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem('access_token');
  const refreshToken = localStorage.getItem('refresh_token');

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  // If the access token has expired, try to refresh it using the refresh token
  if (config.url !== 'signin/' && refreshToken) {
    const decodedToken = decodeToken(accessToken);
    if (decodedToken && decodedToken.exp < Date.now() / 1000) {
      return axios.post(baseURL+'signin/', { refresh: refreshToken })
        .then((response) => {
          const newAccessToken = response.data.access;
          localStorage.setItem('access_token', newAccessToken);
          config.headers.Authorization = `Bearer ${newAccessToken}`;
          return config;
        })
        .catch(() => {
          // If the refresh token has also expired, log the user out
          localStorage.removeItem('access_token');
          localStorage.removeItem('refresh_token');
          // redirect to login page
        });
    }
  }

  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401 && error.response.data.code === 'token_not_valid') {
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      // redirect to login page
    }

    return Promise.reject(error);
  }
);

function decodeToken(token) {
  if (!token) {
    return null;
  }

  try {
    const [, payload] = token.split('.');
    const decoded = JSON.parse(atob(payload));
    return decoded;
  } catch (e) {
    return null;
  }
}
