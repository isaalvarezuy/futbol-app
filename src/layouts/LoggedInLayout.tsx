import { Routes, Route } from "react-router-dom";
;
import Dashboard from "@/components/Dashboard/Dashboard";
import Container from "@/components/Container/Container";
import TeamDetail from "@/components/TeamDetail/TeamDetail";
import Sidebar from "@/components/Sidebar/Sidebar";

const LoggedInLayout = () => {
  return (
    <div className="bg-gray-400">
      <Sidebar />
      <Container>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/detail/:id" element={<TeamDetail />} />
          <Route path="/my-team" element={<p> team</p>} />
          <Route path="/*" element={<p>404 ish</p>} />
        </Routes>
      </Container>
    </div>
  );
};

export default LoggedInLayout;
