import axios from "axios";
const BASE_URL = "http://localhost:3000/";

export const axiosGet = async (endpoint: string) => {
  const response = await axios.get(`${BASE_URL}${endpoint}`);
  return response;
};
