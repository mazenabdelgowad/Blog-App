import axios from "axios";

const request = axios.create({
  baseURL: "blog-app-api-seven.vercel.app",
});

export const BASE_URL = "blog-app-api-seven.vercel.app";

export default request;
