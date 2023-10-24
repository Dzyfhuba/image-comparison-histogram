import axios from "axios";

export const AxiosGuest = axios.create({
  baseURL: import.meta.env.VITE_APP_URL || 'http://localhost:8000'
})