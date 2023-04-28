import { Routes, Route } from "react-router-dom";

import Dashboard from "@/components/Dashboard/Dashboard";
import Container from "@/components/Container/Container";
import TeamDetail from "@/components/TeamDetail/TeamDetail";
import Sidebar from "@/components/Sidebar/Sidebar";
import { useQuery } from "react-query";
import { getPlayers, getTeams } from "@/services";
import { ToastContainer } from "react-toastify";
import { useStore } from "@/hooks/useStore";

const LoggedInLayout = () => {
  const updateTeams = useStore((state) => state.updateTeams);

  const { data } = useQuery({
    queryKey: ["get-teams"],
    queryFn: getTeams,
    onSuccess: (data) => {
      updateTeams(data);
    },
  });
  const { data: players } = useQuery(["get-players"], getPlayers);
  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <Container>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/detail/:id" element={<TeamDetail />} />
          <Route path="/my-team" element={<p> team</p>} />
          <Route path="/*" element={<p>404 ish</p>} />
        </Routes>
        <ToastContainer />
      </Container>
    </div>
  );
};

export default LoggedInLayout;
