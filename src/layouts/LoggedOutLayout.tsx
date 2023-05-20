import LoginForm from "@/components/LoginForm/LoginForm";
import { Route, Routes } from "react-router-dom";

const LoggedOutLayout = () => {
  return (
    <div>
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/*" element={<p>404 ish</p>} />
      </Routes>
    </div>
  );
};
export default LoggedOutLayout;
