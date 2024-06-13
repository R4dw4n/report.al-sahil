import axios from "axios";
import { t } from "i18next";

export const HOST = "http://192.168.1.4:8000";
export const axiosInstance = () => {
  const header = {
    Accept: "application/json",
    Authorization: "Bearer " + localStorage.getItem("token"),
  };
  const instance = axios.create({
    baseURL: HOST + "/api",
    headers: header,
  });

  // Add a response interceptor to check for authentication errors
  instance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      // if (!error.response) {
      //   messages("error", t("error_connection"), 2);
      // } else if (
      //   error.response &&
      //   error.response.data.message === "Unauthenticated."
      // ) {
      //   // Redirect to login page or display error message
      //   window.location.href = "/login";
      //   localStorage.removeItem("token");
      //   localStorage.removeItem("permessions");
      //   localStorage.removeItem("isAdmin");
      //   localStorage.removeItem("username");
      //   localStorage.removeItem("expires_at");
      //   window.location.href = "/login";
      // } else if (error.response && error.response.status === 500) {
      //   messages("error", t("error_server"), 2);
      // }
      return Promise.reject(error);
    }
  );

  return instance;
};



