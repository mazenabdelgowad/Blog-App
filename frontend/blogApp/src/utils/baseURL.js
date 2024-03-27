import axios from "axios";

const request = axios.create({
  baseURL: "https://blog-app-api-seven.vercel.app/",
});

export const BASE_URL = "https://blog-app-api-seven.vercel.app/";

export default request;
