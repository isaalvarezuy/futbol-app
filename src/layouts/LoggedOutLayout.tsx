import LoginForm from "@/components/LoginForm/LoginForm";
import RegisterForm from "@/components/RegisterForm/RegisterForm";
import { Route, Routes } from "react-router-dom";

const LoggedOutLayout = () => {
  return (
    <div className="grid h-screen  grid-cols-12">
      <section className="col-span-6 flex w-full items-center px-32">
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/*" element={<p>404 ish desde log out</p>} />
        </Routes>
      </section>
      <section className="col-span-6 bg-red-100 h-full"></section>
    </div>
  );
};
export default LoggedOutLayout;
