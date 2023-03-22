import { Routes } from "react-router-dom";
import Input from "@/components/Input/Input";
import RegisterForm from "@/components/RegisterForm/RegisterForm";

const LoggedOutLayout = () => {
  return (
    <div className="flex">
      <RegisterForm />
    </div>
  );
};
export default LoggedOutLayout;
