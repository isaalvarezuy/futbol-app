import { client } from "../axios";

export const login = async (body) => {
    console.log(body)
    const response = await client.post("/login", body);
    console.log(response);
    return response;
}