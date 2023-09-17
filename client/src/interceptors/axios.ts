import axios from "axios";

axios.defaults.baseURL = "http://localhost:5000/api";

axios.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("token");

    // if the token exists, then send it with the every axios request
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

axios.interceptors.response.use(
  (resp) => resp,
  async (error) => {
    const originalRequest = error.config;

    // If axios response returns the status of  403 i.e Forbidden then send post request to refresh token
    if (error.response.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const { data } = await axios.get("/auth/refresh", {
          withCredentials: true,
        });

        sessionStorage.setItem("token", data.token);
        originalRequest.headers.Authorization = `Bearer ${data.token}`;

        return axios(originalRequest);
      } catch (refreshTokenAPIError) {
        sessionStorage.removeItem("token");
        window.location.href = "/login";

        return Promise.reject(refreshTokenAPIError);
      }
    }

    return Promise.reject(error);
  }
);
