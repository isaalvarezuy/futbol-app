import { useAxios } from "../useAxios";


export const useLogin = () => {

    const { client } = useAxios()
    const login = async (body) => {
        const response = await client.post("/login", body);
        return response;
    }
    return { login }
}