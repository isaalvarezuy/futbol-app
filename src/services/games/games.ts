import { client } from "../axios";

export const addGame = async (body: any) => {
  const response = await client.post("/games", body);
  console.log(response);
  return response;
};
