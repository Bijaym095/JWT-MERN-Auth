import axios from "axios";

const accessToken: string | null = sessionStorage.getItem("token");

axios.defaults.baseURL = "http://localhost:5000/api";
axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;

let refresh = false;

axios.interceptors.response.use(
  (resp) => resp,
  async (error) => {
    // If axios response returns the status of  403 i.e Forbidden then send post request to refresh token
    if (error.response.status === 403 && !refresh) {
      refresh = true;

      const refreshResponse = await axios.get("/auth/refresh", {
        withCredentials: true,
      });

      // If the post request to refreshtoken is success then update the access token in session storage
      if (refreshResponse.status === 200) {
        const newAccessToken = refreshResponse.data.token;

        // Update the access token in session storage and Axios headers
        sessionStorage.setItem("token", newAccessToken);
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${newAccessToken}`;

        return axios(error.config);
      }
    }

    // If axios returns the response status of 401 i.e No acess token then logout the user
    if (error.response.status === 401) {
      sessionStorage.removeItem("token");
      window.location.href = "/login";
    }

    refresh = false;

    return Promise.reject(error);
  }
);
