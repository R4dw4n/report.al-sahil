import { axiosInstance } from "../axiosInstance"

export const loginService = {
  login: (data) => {
    return axiosInstance().post('/login', data)
  },
  logout: () => {
    return axiosInstance().post('/logout')
  },
}