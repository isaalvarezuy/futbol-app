import axios from "axios";
import { useSession } from "../useSession";
const BASE_URL = import.meta.env.VITE_API_URL;

export const useAxios = () => {
  const token = useSession((state) => state.token);
  const authenticatedAxios = axios.create({
    baseURL: "http://localhost:3001/",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const client = axios.create({
    baseURL: "http://localhost:3001/",
  });
  const unauthenticatedAxios = axios.create({
    baseURL: "http://localhost:3001/",
  });

  return { client, authenticatedAxios, unauthenticatedAxios };
};
