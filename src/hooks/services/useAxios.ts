import axios from "axios";
const BASE_URL = import.meta.env.VITE_API_URL;

export const useAxios = () => {
  const client = axios.create({
    baseURL: "http://localhost:3001/",
  });

  return { client };
};
