import { useAxios } from "../useAxios";


export const useLogin = () => {

    const { unauthenticatedAxios } = useAxios()
    const login = async (body) => {
        const response = await unauthenticatedAxios.post("/login", body);
        return response;
    }
    return { login }
}