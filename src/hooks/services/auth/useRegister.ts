import { z } from "zod";
import { useAxios } from "../useAxios";
import { FieldValues } from "react-hook-form";

export const useRegister = () => {
  const { unauthenticatedAxios } = useAxios();

  const register = async (body: FieldValues) => {
    console.log(body, "axios");
    const response = await unauthenticatedAxios.post("/users", body);
    return response;
  };
  return { register };
};
