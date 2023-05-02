import axios from "axios";
const BASE_URL = import.meta.env.VITE_API_URL;

export const client = axios.create({
  baseURL: "http://localhost:3001/",
});

export const axiosGet = async (endpoint: string) => {
  const response = await axios.get(`${BASE_URL}${endpoint}`);
  return response;
};
export const axiosPost = async (endpoint: string, body: FormData) => {
  const response = await axios.post(`${BASE_URL}${endpoint}`, body, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response;
};
